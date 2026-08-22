/**
 * Typed content model.
 *
 * These types mirror the CMS collections required by `Requirement.md` §12.1 and
 * the controlled vocabulary in §12.2. The local records in this directory are a
 * stand-in for a headless CMS or Framer CMS: the field names and value sets are
 * deliberately the ones an editor will see there, so a later migration is a
 * transport change rather than a remodelling exercise.
 *
 * Two rules are enforced by the type system rather than left to discipline:
 *
 * 1. `Draft` is an internal editorial state and can never be a public programme
 *    status (`PublicStatus` excludes it).
 * 2. Evidence for a claim is referenced by opaque `claimIds` only. Source
 *    documents, signatures, private contacts and approval notes stay in the
 *    restricted evidence register and must never enter this layer.
 */

/* -------------------------------------------------------------- vocabulary */

/** Requirement.md §12.2 — audience taxonomy. */
export const AUDIENCES = [
  "Learner",
  "Educator",
  "Institution",
  "Employer",
  "CSR/Funder",
  "NGO",
  "Public/Media",
] as const;
export type Audience = (typeof AUDIENCES)[number];

/** Requirement.md §12.2 — content types for Updates & Resources. */
export const CONTENT_TYPES = [
  "Update",
  "Insight",
  "Event",
  "Report",
  "Policy",
  "Opportunity",
] as const;
export type ContentType = (typeof CONTENT_TYPES)[number];

/**
 * project-controls.md §4.1 — the exact public status values.
 * `Draft` is intentionally absent: it is an editorial state only.
 */
export const PUBLIC_STATUSES = [
  "Proposed",
  "In development",
  "Pilot",
  "Open",
  "In delivery",
  "Completed",
  "Paused",
  "Archived",
] as const;
export type PublicStatus = (typeof PUBLIC_STATUSES)[number];

/** Editorial state. Only `Approved` records may be published. */
export const EDITORIAL_STATES = ["Draft", "In review", "Approved", "Expired", "Withdrawn"] as const;
export type EditorialState = (typeof EDITORIAL_STATES)[number];

/**
 * Controlled geography list — not free text, so that duplicates such as
 * "Maharashtra" / "maharashtra, India" cannot accumulate. No geography has been
 * board-approved yet, so the list is intentionally minimal.
 */
export const GEOGRAPHIES = ["India", "To be confirmed"] as const;
export type Geography = (typeof GEOGRAPHIES)[number];

/** Language identifiers reserved for future Hindi/Marathi parity. */
export const LANGUAGES = ["en", "hi", "mr"] as const;
export type Language = (typeof LANGUAGES)[number];

export const DELIVERY_MODES = ["Online", "In person", "Hybrid", "To be confirmed"] as const;
export type DeliveryMode = (typeof DELIVERY_MODES)[number];

/* ------------------------------------------------------------ shared parts */

/**
 * An image plus its alternative text. `alt: null` marks the image decorative;
 * a non-empty string describes purpose and context. There is no third state,
 * so an editor cannot leave alt text simply unspecified.
 */
export interface ContentImage {
  src: string;
  alt: string | null;
  width: number;
  height: number;
}

/** Per-record SEO fields (Requirement.md §12.1, FR-040). */
export interface SeoFields {
  title: string;
  description: string;
  /** Omit to inherit the shared social image. */
  socialImage?: ContentImage;
}

/** Fields every publishable record carries, whatever the collection. */
export interface RecordBase {
  /** Stable identifier, independent of slug changes. */
  id: string;
  title: string;
  /** Lowercase, hyphenated. Validated by unit test. */
  slug: string;
  /** 20–35 words (content.md §10.4). */
  summary: string;
  /** Accountable owner role. Never a personal email address. */
  owner: string;
  editorialState: EditorialState;
  /** ISO date the record must next be re-checked (FR-021). */
  reviewDate: string;
  /** Opaque evidence references only — never the evidence itself. */
  claimIds: string[];
  seo: SeoFields;
}

/* ------------------------------------------------------------- collections */

/** Focus Area / Programme (Requirement.md §12.1). */
export interface FocusArea extends RecordBase {
  /** Short label used on cards and chips. */
  cardTitle: string;
  status: PublicStatus;
  audiences: Audience[];
  geography: Geography;
  deliveryMode: DeliveryMode;
  /** Full description paragraphs. Empty while only a pillar summary is approved. */
  body: string[];
  /** ISO dates, when an approved schedule exists. */
  startDate: string | null;
  endDate: string | null;
  /** Plain-language eligibility. `null` until an approved brief exists. */
  eligibility: string | null;
  /** Exact fee, "No participant fee", or `null` when undecided. */
  costStatement: string | null;
  image: ContentImage | null;
  /**
   * Whether a detail route exists for this record. False keeps the card CTA
   * hidden — no card may link to an unwritten page (project-controls.md §3).
   */
  hasApprovedDetail: boolean;
  /** Surface token used for the card face. */
  surface: "lavender" | "mint" | "yellow" | "white";
}

/** Update / Resource (Requirement.md §12.1). */
export interface UpdateRecord extends RecordBase {
  type: ContentType;
  body: string[];
  author: string;
  publishedDate: string;
  updatedDate: string | null;
  /** Date after which the item is no longer current. `null` = does not expire. */
  expiryDate: string | null;
  topics: string[];
  relatedFocusAreaId: string | null;
  image: ContentImage | null;
  download: {
    label: string;
    href: string;
    fileType: string;
    /** Human-readable, e.g. "1.2 MB" — shown in the link text (FR-033). */
    fileSize: string;
  } | null;
  featured: boolean;
}

/** FAQ (Requirement.md §12.1). */
export interface Faq {
  id: string;
  question: string;
  /** Paragraphs. */
  answer: string[];
  category: string;
  order: number;
  owner: string;
  reviewDate: string;
  /** Gate name from `features.ts` that must be true before this FAQ appears. */
  requiresFeature?: keyof import("@/config/features").FeatureGates;
}

/** Disclosure (Requirement.md §12.1, §10.7). */
export interface Disclosure {
  id: string;
  title: string;
  category: "Legal identity" | "Registration" | "Policy" | "Report" | "Governance";
  /** Plain-language summary shown to visitors. */
  plainSummary: string;
  issuer: string | null;
  effectiveDate: string | null;
  reviewDate: string | null;
  document: { href: string; fileType: string; fileSize: string } | null;
  /**
   * `Verified` items may be published; everything else renders as a labelled
   * pending row so a visitor can see what is outstanding rather than seeing a
   * gap they cannot interpret.
   */
  status: "Verified" | "Verification required" | "Not held" | "Superseded";
  owner: string;
}

/** A single field in the legal identity table (content.md §12.4). */
export interface IdentityField {
  label: string;
  /** Populated only from an approved authoritative source. `null` until then. */
  value: string | null;
  requiredSource: string;
  lastChecked: string | null;
}

/** Team Member — P1, collection disabled (Requirement.md §12.1). */
export interface TeamMember extends RecordBase {
  role: string;
  bio: string[];
  photo: ContentImage | null;
  displayOrder: number;
  active: boolean;
}

/** Partner — conditional, collection disabled until real partners exist. */
export interface Partner {
  id: string;
  name: string;
  relationshipType: string;
  logo: ContentImage | null;
  url: string | null;
  consentReference: string;
  activeFrom: string | null;
  activeTo: string | null;
  owner: string;
}

/** Global Settings (Requirement.md §12.1). */
export interface GlobalSettings {
  /** `null` while no monitored public address has been approved. */
  publicEmail: string | null;
  publicPhone: string | null;
  publicAddress: string | null;
  grievanceEmail: string | null;
  accessibilityEmail: string | null;
  /** Owned profiles only. An empty list renders no social row at all. */
  socialLinks: { label: string; href: string }[];
  /** Factual, time-bound announcement. `null` = no announcement bar. */
  announcement: { text: string; href: string; expires: string } | null;
  defaultSocialImage: ContentImage | null;
  /** Response-time commitment, shown only when `features.publishedSla`. */
  responseSla: string | null;
}

/* ---------------------------------------------------------------- helpers */

/** A record is publishable only when it is approved and not expired. */
export function isPublishable(
  record: { editorialState: EditorialState },
  expiryDate?: string | null,
  now: Date = new Date(),
): boolean {
  if (record.editorialState !== "Approved") return false;
  if (expiryDate && new Date(expiryDate).getTime() < now.getTime()) return false;
  return true;
}

/** True when a dated item has passed its expiry date. */
export function isExpired(expiryDate: string | null, now: Date = new Date()): boolean {
  if (!expiryDate) return false;
  return new Date(expiryDate).getTime() < now.getTime();
}
