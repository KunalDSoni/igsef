import type { Disclosure, IdentityField } from "./types";

/**
 * Corporate Disclosures.
 *
 * Every identity field below is `null`. This is not an oversight and must not be
 * "helpfully" filled in:
 *
 * - `Requirement.md` §3.1 and `content.md` §12.4 block the legal name, CIN,
 *   incorporation date, status, legal form, registrar, activity, registered
 *   office and directors until the Certificate of Incorporation and current MCA
 *   master data have been checked and signed off.
 * - Candidate values exist in the brief and in `research-notes.md`. They are
 *   discovery material with secondary corroboration only, and they are
 *   deliberately absent from this file, from the browser bundle and from the
 *   generated HTML.
 * - The `MR` segment of the candidate registration number must never be
 *   "corrected" to `MH` by inference (`project-controls.md`, QA §2).
 *
 * To publish: populate `value` and `lastChecked` from the approved authoritative
 * document, then set `features.corporateDisclosures` to true. The page, its
 * footer identity block and every "View corporate disclosures" link activate
 * together.
 */
export const identityFields: IdentityField[] = [
  {
    label: "Registered name",
    value: null,
    requiredSource: "Certificate of Incorporation and current MCA master data",
    lastChecked: null,
  },
  {
    label: "Corporate identity number",
    value: null,
    requiredSource: "Certificate of Incorporation or the current MCA service",
    lastChecked: null,
  },
  {
    label: "Incorporated",
    value: null,
    requiredSource: "Certificate of Incorporation",
    lastChecked: null,
  },
  {
    label: "Status",
    value: null,
    requiredSource: "Current MCA master data",
    lastChecked: null,
  },
  {
    label: "Legal form and category",
    value: null,
    requiredSource: "Certificate, licence, Memorandum and Articles, MCA master data",
    lastChecked: null,
  },
  {
    label: "Registrar",
    value: null,
    requiredSource: "Current MCA master data",
    lastChecked: null,
  },
  {
    label: "Principal activity and objects",
    value: null,
    requiredSource: "MCA activity classification and approved object clauses",
    lastChecked: null,
  },
  {
    label: "Registered office",
    value: null,
    requiredSource: "Current MCA master data or filing",
    lastChecked: null,
  },
  {
    label: "Directors and key officers",
    value: null,
    requiredSource: "Current MCA data plus internal approval for publication",
    lastChecked: null,
  },
];

/**
 * Documents and policies (content.md §12.6). Nothing is held or approved yet, so
 * every row reports its real state rather than being hidden — a visitor doing due
 * diligence learns more from an honest "verification required" list than from an
 * empty page.
 */
export const disclosureDocuments: Disclosure[] = [
  {
    id: "doc-incorporation",
    title: "Certificate of Incorporation",
    category: "Legal identity",
    plainSummary:
      "The document that establishes the foundation's registration, legal name, and date of incorporation.",
    issuer: null,
    effectiveDate: null,
    reviewDate: null,
    document: null,
    status: "Verification required",
    owner: "Corporate-data approver",
  },
  {
    id: "doc-constitution",
    title: "Memorandum and Articles of Association",
    category: "Legal identity",
    plainSummary:
      "The constitutional documents that set out the foundation's objects and internal rules.",
    issuer: null,
    effectiveDate: null,
    reviewDate: null,
    document: null,
    status: "Verification required",
    owner: "Corporate-data approver",
  },
  {
    id: "doc-annual-report",
    title: "Annual report and financial statements",
    category: "Report",
    plainSummary:
      "Annual reporting will begin after the first approved delivery cycle. No reporting period has been completed.",
    issuer: null,
    effectiveDate: null,
    reviewDate: null,
    document: null,
    status: "Not held",
    owner: "Executive sponsor",
  },
  {
    id: "doc-privacy",
    title: "Privacy Notice",
    category: "Policy",
    plainSummary: "How the foundation handles personal information supplied through this website.",
    issuer: null,
    effectiveDate: null,
    reviewDate: null,
    document: null,
    status: "Verification required",
    owner: "Legal/privacy reviewer",
  },
  {
    id: "doc-grievance",
    title: "Grievance and complaints process",
    category: "Governance",
    plainSummary: "How to raise a concern or complaint and how the foundation responds to it.",
    issuer: null,
    effectiveDate: null,
    reviewDate: null,
    document: null,
    status: "Verification required",
    owner: "Legal/privacy reviewer",
  },
  {
    id: "doc-safeguarding",
    title: "Child safeguarding policy",
    category: "Policy",
    plainSummary:
      "Required before any approved work involving children or vulnerable participants begins.",
    issuer: null,
    effectiveDate: null,
    reviewDate: null,
    document: null,
    status: "Not held",
    owner: "Legal/privacy reviewer",
  },
];

/** True only when every identity field has an approved value and check date. */
export function identityIsComplete(): boolean {
  return identityFields.every((f) => f.value !== null && f.lastChecked !== null);
}

export const verifiedIdentityFields = (): IdentityField[] =>
  identityFields.filter((f) => f.value !== null);
