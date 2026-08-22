import "server-only";

import { isEnquiryDeliveryConfigured, isEnquiryTestMode } from "@/config/features";
import { isProduction } from "@/config/site";
import type { EnquiryInput, EnquiryResultCode } from "./schema";

/**
 * Enquiry delivery adapter.
 *
 * The boundary between the site and whatever service eventually receives an
 * enquiry. It exists so the form can be built, tested and reviewed now while
 * real delivery stays switched off until the operational decisions in
 * `project-controls.md` §7 and §8 are made: provider, routing owner per enquiry
 * type, response SLA, retention period, deletion method, incident contact and
 * the accidental-child-data procedure.
 *
 * Three states, and no fourth:
 *
 * 1. **Not configured** (the shipped state). `ENQUIRY_ENDPOINT` is absent, so
 *    the route reports `delivery_not_configured` and the UI shows an honest
 *    unavailable message. Nothing is stored, queued or transmitted.
 * 2. **Test mode.** `ENQUIRY_TEST_MODE=true` resolves the success path without
 *    contacting a provider, so automated tests can exercise it. Refused in
 *    production builds — a demo success must never be shown to a real visitor.
 * 3. **Configured.** A real endpoint is present and the enquiry is posted to it.
 *
 * `server-only` guarantees this module cannot be pulled into a client bundle,
 * so `ENQUIRY_ENDPOINT` and `ENQUIRY_API_KEY` stay on the server.
 */

export interface DeliveryResult {
  code: EnquiryResultCode;
  reference?: string;
  testMode?: boolean;
}

/** How long to wait for the provider before reporting a timeout. */
const REQUEST_TIMEOUT_MS = 8_000;

/**
 * The payload sent to the provider.
 *
 * Field values are carried in the body, never in the URL, never in a query
 * string and never in a notification subject line. The `subjectLine` is built
 * from the routing category alone so that a mail client preview cannot leak the
 * enquirer's words (QA checklist §7, "Routing and storage").
 */
function buildPayload(input: EnquiryInput) {
  return {
    enquiryType: input.enquiryType,
    subjectLine: `Website enquiry: ${input.enquiryType}`,
    name: input.name,
    email: input.email,
    organisation: input.organisation || null,
    role: input.role || null,
    subject: input.subject,
    message: input.message,
    adultConfirmation: input.adultConfirmation,
    receivedAt: new Date().toISOString(),
    source: "website-enquiry-form",
  };
}

export async function deliverEnquiry(input: EnquiryInput): Promise<DeliveryResult> {
  if (isEnquiryTestMode()) {
    if (isProduction) {
      // A production build must never resolve a mocked success.
      return { code: "delivery_not_configured" };
    }
    return { code: "accepted", reference: "TEST-MODE-NO-DELIVERY", testMode: true };
  }

  if (!isEnquiryDeliveryConfigured()) {
    return { code: "delivery_not_configured" };
  }

  const endpoint = process.env.ENQUIRY_ENDPOINT!.trim();
  const apiKey = process.env.ENQUIRY_API_KEY?.trim();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        ...(apiKey ? { authorization: `Bearer ${apiKey}` } : {}),
      },
      body: JSON.stringify(buildPayload(input)),
      signal: controller.signal,
      cache: "no-store",
    });

    if (!response.ok) {
      // Status only. The response body may echo submitted values, so it is not
      // read, logged or surfaced.
      return { code: "provider_unavailable" };
    }

    const reference = await readReference(response);
    return reference ? { code: "accepted", reference } : { code: "accepted" };
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return { code: "provider_timeout" };
    }
    return { code: "provider_unavailable" };
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Extracts a provider reference if one is offered. Anything that is not a short
 * opaque string is discarded rather than shown to the visitor.
 */
async function readReference(response: Response): Promise<string | undefined> {
  try {
    const data: unknown = await response.json();
    if (data && typeof data === "object" && "reference" in data) {
      const reference = (data as { reference: unknown }).reference;
      if (typeof reference === "string" && /^[A-Za-z0-9-]{4,32}$/.test(reference)) {
        return reference;
      }
    }
  } catch {
    // A provider that returns no JSON is fine; the submission was still accepted.
  }
  return undefined;
}
