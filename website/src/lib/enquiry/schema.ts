/**
 * Enquiry form contract.
 *
 * Shared by the browser and the server route so both validate identically. The
 * server never trusts the client result — it re-runs `validateEnquiry` on the
 * parsed body before anything else happens.
 *
 * Field set is fixed by `project-controls.md` §6.1 and FR-010/FR-011:
 * enquiry type, name, email, optional organisation and role, subject, message,
 * and an adult self-attestation. Phone is absent. Date of birth is prohibited.
 * Nothing here collects identity documents, financial data, health, caste,
 * education records or information about children.
 */

/** Routing categories (content.md §11.3). Values are stable identifiers. */
export const ENQUIRY_TYPES = [
  { value: "partnership", label: "Partnership" },
  { value: "programme-information", label: "Programme information" },
  { value: "media-research", label: "Media or research" },
  { value: "governance", label: "Governance and disclosures" },
  { value: "accessibility", label: "Accessibility" },
  { value: "privacy", label: "Privacy or data request" },
  { value: "general", label: "General" },
] as const;

export type EnquiryTypeValue = (typeof ENQUIRY_TYPES)[number]["value"];

export const ENQUIRY_TYPE_VALUES: readonly string[] = ENQUIRY_TYPES.map((t) => t.value);

/** The honeypot field name. A real visitor never sees or fills this. */
export const HONEYPOT_FIELD = "organisation_website";

export interface EnquiryInput {
  enquiryType: string;
  name: string;
  email: string;
  organisation: string;
  role: string;
  subject: string;
  message: string;
  adultConfirmation: boolean;
  /** Honeypot value. Non-empty means a bot filled a hidden field. */
  honeypot: string;
}

export type EnquiryField = Exclude<keyof EnquiryInput, "honeypot">;

/** Field errors keyed by field name. */
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

export const LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  organisation: { max: 160 },
  role: { max: 120 },
  subject: { min: 3, max: 150 },
  message: { min: 20, max: 3000 },
} as const;

/** Field order drives the error-summary order and focus target sequence. */
export const FIELD_ORDER: EnquiryField[] = [
  "enquiryType",
  "name",
  "email",
  "organisation",
  "role",
  "subject",
  "message",
  "adultConfirmation",
];

/**
 * Conservative email check. Deliberately permissive about the local part —
 * over-strict patterns reject valid addresses — while rejecting shapes that are
 * certainly wrong.
 */
const EMAIL_PATTERN = /^[^\s@,;:<>()[\]\\]+@[^\s@.]+(\.[^\s@.]+)+$/;

/** Control characters that have no place in a submitted text field. */
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

/**
 * Normalises a submitted string: strips control characters, collapses runs of
 * whitespace, trims. Applied before validation and before delivery so length
 * limits mean the same thing on both sides.
 */
export function normaliseText(value: unknown, { multiline = false } = {}): string {
  if (typeof value !== "string") return "";
  const withoutControls = value.replace(CONTROL_CHARS, "");
  const collapsed = multiline
    ? withoutControls
        .replace(/\r\n/g, "\n")
        .replace(/[ \t]+/g, " ")
        .replace(/\n{3,}/g, "\n\n")
    : withoutControls.replace(/\s+/g, " ");
  return collapsed.trim();
}

/** Parses an unknown request body into the input shape without validating it. */
export function parseEnquiryBody(body: Record<string, unknown>): EnquiryInput {
  return {
    enquiryType: normaliseText(body.enquiryType),
    name: normaliseText(body.name),
    email: normaliseText(body.email).toLowerCase(),
    organisation: normaliseText(body.organisation),
    role: normaliseText(body.role),
    subject: normaliseText(body.subject),
    message: normaliseText(body.message, { multiline: true }),
    adultConfirmation: body.adultConfirmation === true || body.adultConfirmation === "on",
    honeypot: normaliseText(body[HONEYPOT_FIELD]),
  };
}

/**
 * Validates a parsed enquiry. Messages say what is wrong and what to do, in
 * plain language, and never echo the submitted value back.
 */
export function validateEnquiry(input: EnquiryInput): EnquiryErrors {
  const errors: EnquiryErrors = {};

  if (!input.enquiryType) {
    errors.enquiryType = "Choose what you would like to discuss.";
  } else if (!ENQUIRY_TYPE_VALUES.includes(input.enquiryType)) {
    errors.enquiryType = "Choose one of the listed enquiry types.";
  }

  if (!input.name) {
    errors.name = "Enter your name.";
  } else if (input.name.length < LIMITS.name.min) {
    errors.name = "Enter your name using at least 2 characters.";
  } else if (input.name.length > LIMITS.name.max) {
    errors.name = `Shorten your name to ${LIMITS.name.max} characters or fewer.`;
  }

  if (!input.email) {
    errors.email = "Enter an email address so we can reply.";
  } else if (input.email.length > LIMITS.email.max) {
    errors.email = "Enter a shorter email address.";
  } else if (!EMAIL_PATTERN.test(input.email)) {
    errors.email = "Enter an email address in the format name@example.com.";
  }

  if (input.organisation.length > LIMITS.organisation.max) {
    errors.organisation = `Shorten the organisation name to ${LIMITS.organisation.max} characters or fewer.`;
  }

  if (input.role.length > LIMITS.role.max) {
    errors.role = `Shorten your role to ${LIMITS.role.max} characters or fewer.`;
  }

  if (!input.subject) {
    errors.subject = "Enter a subject.";
  } else if (input.subject.length < LIMITS.subject.min) {
    errors.subject = "Enter a subject using at least 3 characters.";
  } else if (input.subject.length > LIMITS.subject.max) {
    errors.subject = `Shorten the subject to ${LIMITS.subject.max} characters or fewer.`;
  }

  if (!input.message) {
    errors.message = "Tell us how we can help.";
  } else if (input.message.length < LIMITS.message.min) {
    errors.message = `Add a little more detail — at least ${LIMITS.message.min} characters.`;
  } else if (input.message.length > LIMITS.message.max) {
    errors.message = `Shorten your message to ${LIMITS.message.max} characters or fewer.`;
  }

  if (!input.adultConfirmation) {
    errors.adultConfirmation = "Confirm that you are 18 or older before sending this enquiry.";
  }

  return errors;
}

export function hasErrors(errors: EnquiryErrors): boolean {
  return Object.keys(errors).length > 0;
}

/** Human-readable field labels, used by the error summary. */
export const FIELD_LABELS: Record<EnquiryField, string> = {
  enquiryType: "What would you like to discuss?",
  name: "Your name",
  email: "Work or personal email",
  organisation: "Organisation",
  role: "Your role",
  subject: "Subject",
  message: "How can we help?",
  adultConfirmation: "Confirm that you are 18 or older",
};

/**
 * Outcome codes returned to the browser. Codes only — never the submitted
 * values — so nothing personal can reach a log, a URL or an analytics event.
 */
export type EnquiryResultCode =
  | "accepted"
  | "validation_failed"
  | "delivery_not_configured"
  | "rate_limited"
  | "provider_unavailable"
  | "provider_timeout"
  | "rejected";

export interface EnquiryResponse {
  code: EnquiryResultCode;
  errors?: EnquiryErrors;
  /** Present only when the provider issues one. */
  reference?: string;
  /** True when the response came from a mocked test/demo adapter. */
  testMode?: boolean;
}
