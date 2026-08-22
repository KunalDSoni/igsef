import { NextResponse } from "next/server";
import { deliverEnquiry } from "@/lib/enquiry/adapter";
import { checkRateLimit } from "@/lib/enquiry/rate-limit";
import {
  type EnquiryResponse,
  hasErrors,
  parseEnquiryBody,
  validateEnquiry,
} from "@/lib/enquiry/schema";

/**
 * Enquiry submission endpoint.
 *
 * Order of checks is deliberate — the cheapest and least revealing first:
 *
 *   honeypot → rate limit → validation → delivery
 *
 * Nothing submitted is ever written to a log, an error message, a URL, a
 * redirect or a response body. Responses carry an outcome code and, on
 * validation failure, per-field messages that describe the rule rather than
 * repeating the value.
 */

export const runtime = "nodejs";
/** Never cached: this route has side effects and must not be prerendered. */
export const dynamic = "force-dynamic";

function json(body: EnquiryResponse, status: number, headers?: HeadersInit) {
  return NextResponse.json(body, {
    status,
    headers: { "cache-control": "no-store", ...headers },
  });
}

/**
 * Best-effort client address for rate limiting. Only ever passed to the hashing
 * limiter; it is not stored or logged.
 *
 * `x-forwarded-for` is client-supplied unless a trusted proxy overwrites it.
 * Confirm that the chosen host does so before relying on this as a security
 * control; the honeypot and the provider's own protections do not depend on it.
 */
function clientAddress(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export async function POST(request: Request) {
  let raw: Record<string, unknown>;

  try {
    const parsed: unknown = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return json({ code: "rejected" }, 400);
    }
    raw = parsed as Record<string, unknown>;
  } catch {
    return json({ code: "rejected" }, 400);
  }

  const input = parseEnquiryBody(raw);

  /*
   * Honeypot. A filled hidden field means an automated submission. The response
   * is a plain rejection with no hint about why, so a bot cannot learn the
   * field's purpose by probing.
   */
  if (input.honeypot.length > 0) {
    return json({ code: "rejected" }, 400);
  }

  const limit = checkRateLimit(clientAddress(request));
  if (!limit.allowed) {
    return json({ code: "rate_limited" }, 429, {
      "retry-after": String(limit.retryAfterSeconds),
    });
  }

  /* Server-side validation. The client's result is never trusted. */
  const errors = validateEnquiry(input);
  if (hasErrors(errors)) {
    return json({ code: "validation_failed", errors }, 422);
  }

  const result = await deliverEnquiry(input);

  switch (result.code) {
    case "accepted":
      return json(
        { code: "accepted", reference: result.reference, testMode: result.testMode },
        200,
      );
    case "delivery_not_configured":
      /* 503: the service is genuinely unavailable, and saying so honestly is
         the point. The visitor is never shown a fake success. */
      return json({ code: "delivery_not_configured" }, 503);
    case "provider_timeout":
      return json({ code: "provider_timeout" }, 504);
    default:
      return json({ code: "provider_unavailable" }, 502);
  }
}

/** Anything other than POST is not supported on this route. */
export async function GET() {
  return json({ code: "rejected" }, 405, { allow: "POST" });
}
