import { features } from "./features";
import { cta, routes } from "./site";

export interface Action {
  label: string;
  href: string;
}

/**
 * The site-wide primary action.
 *
 * `project-controls.md` §3 permits the label "Discuss a partnership" pointing at
 * `/partner-with-us#enquiry` **only after form routing and the response SLA
 * pass**. Neither exists yet, so every primary call to action resolves to an
 * honest alternative that still leads somewhere useful: the partnership page,
 * which explains the routes and the current position.
 *
 * Every call to action on the site routes through this function, so the label
 * and destination flip everywhere at once when the gate opens — there is no
 * second place to remember to update.
 */
export function primaryAction(): Action {
  if (features.publishedSla) {
    return { label: cta.partnership.label, href: cta.partnership.href };
  }
  return { label: "Explore partnership routes", href: routes.partner };
}

/** True when the canonical enquiry call to action is permitted. */
export function partnershipCtaEnabled(): boolean {
  return features.publishedSla;
}
