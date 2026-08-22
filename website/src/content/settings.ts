import type { GlobalSettings } from "./types";

/**
 * Global Settings (Requirement.md §12.1).
 *
 * Every contact field is `null`. `content.md` §18 lists "Public email, phone,
 * address disclosure, SLAs, form-routing owners" as a missing P0 input, and
 * publishing an unmonitored address would create a service failure rather than a
 * contact route. Components read these values and omit the relevant block
 * entirely rather than rendering an empty label or a placeholder.
 *
 * `socialLinks` is empty because no profile is owned or verified. The QA
 * checklist explicitly prohibits empty social icons and unowned profiles.
 */
export const settings: GlobalSettings = {
  publicEmail: null,
  publicPhone: null,
  publicAddress: null,
  grievanceEmail: null,
  accessibilityEmail: null,
  socialLinks: [],
  announcement: null,
  /* The default social card is generated at build time by
     `src/app/opengraph-image.tsx`, so no static asset is referenced here. Set
     this only if an approved, rights-cleared image should override it. */
  defaultSocialImage: null,
  responseSla: null,
};

/** True when at least one monitored public contact route has been approved. */
export function hasPublicContactRoute(): boolean {
  return Boolean(settings.publicEmail || settings.publicPhone);
}
