/**
 * Site-level configuration.
 *
 * Nothing here may contain an unverified corporate fact. The legal name is the
 * name supplied in the brief and used throughout `content.md`; the *registered*
 * legal name, CIN, incorporation date, registered office and directors are
 * blocked until authoritative MCA documents are approved and are therefore
 * modelled in `src/content/disclosures.ts`, not here.
 */

/** Deployment stage. Anything other than `production` is treated as staging. */
export type SiteStage = "staging" | "production";

const rawStage = process.env.NEXT_PUBLIC_SITE_STAGE?.trim().toLowerCase();

export const stage: SiteStage = rawStage === "production" ? "production" : "staging";

/**
 * Staging builds are never indexable. This is deliberately the default: a build
 * only becomes indexable when someone explicitly sets the stage *and* a real
 * canonical origin, which cannot happen by accident.
 */
export const isProduction = stage === "production";

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

/**
 * Canonical origin. No domain has been approved or verified for the foundation,
 * so there is no hard-coded production fallback — an unset value keeps the build
 * on localhost and, combined with `isProduction`, keeps it out of search.
 */
export const siteUrl = (rawSiteUrl && rawSiteUrl.replace(/\/+$/, "")) || "http://localhost:3000";

/** True only when a real canonical origin has been supplied for a production build. */
export const hasCanonicalOrigin = Boolean(rawSiteUrl) && isProduction;

export const site = {
  /** Full name, used on first and formal mention (content.md §3). */
  legalNameWorking: "Indo-Global Skills & Edu Foundation",
  /**
   * Wordmark lines. A short name or acronym must not be launched before
   * trademark, domain and confusion checks are complete (design.md §3.1), so the
   * mark is the full name set typographically across two lines.
   */
  wordmark: { lead: "Indo-Global", trail: "Skills & Edu Foundation" },
  brandLine: "Practical learning. Stronger pathways.",
  description:
    "Indo-Global Skills & Edu Foundation aims to develop inclusive education and skills initiatives that connect learning with capability and opportunity.",
  locale: "en-IN",
  htmlLang: "en-IN",
  /** Used for the copyright line. */
  establishedYear: 2026,
} as const;

export const routes = {
  home: "/",
  about: "/about",
  focusAreas: "/focus-areas",
  focusAreaStatus: "/focus-areas#status",
  partner: "/partner-with-us",
  partnerEnquiry: "/partner-with-us#enquiry",
  updates: "/updates",
  contact: "/contact",
  contactEnquiry: "/contact#enquiry",
  corporateDisclosures: "/corporate-disclosures",
  privacy: "/privacy",
  terms: "/terms",
  accessibility: "/accessibility",
} as const;

/**
 * Canonical CTA labels and destinations (project-controls.md §3).
 * Components must reference these rather than repeating literals, so a label or
 * destination change happens in exactly one place.
 */
export const cta = {
  partnership: { label: "Discuss a partnership", href: routes.partnerEnquiry },
  focusAreas: { label: "Explore focus areas", href: routes.focusAreas },
  programmeStatus: { label: "View programme status", href: routes.focusAreaStatus },
  disclosures: { label: "View corporate disclosures", href: routes.corporateDisclosures },
  focusAreaDetail: { label: "View focus area" },
  sendEnquiry: { label: "Send enquiry" },
} as const;
