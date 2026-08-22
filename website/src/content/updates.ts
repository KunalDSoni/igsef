import { type UpdateRecord, isPublishable } from "./types";

/**
 * Updates & Resources.
 *
 * Deliberately empty. No update has been written, evidenced and approved, and
 * `content.md` §18 lists "First verified update/resource" as a missing P0 input.
 * The listing route therefore renders the approved empty state and stays out of
 * navigation until `features.updates` is enabled (project-controls.md §2).
 *
 * Adding the first record: append it here with `editorialState: "Approved"`,
 * then flip `features.updates` to `true`. Both steps are required — the flag
 * controls navigation and indexing, the record controls what is rendered.
 */
export const updates: UpdateRecord[] = [];

/** Approved, unexpired updates, newest first. */
export function publishedUpdates(now: Date = new Date()): UpdateRecord[] {
  return updates
    .filter((u) => isPublishable(u, u.expiryDate, now))
    .sort((a, b) => b.publishedDate.localeCompare(a.publishedDate));
}

/**
 * Approved records whose expiry date has passed. These remain reachable for
 * reference and render the "Closed" state from `content.md` §15, but never
 * appear in the listing or the sitemap.
 */
export function expiredUpdates(now: Date = new Date()): UpdateRecord[] {
  return updates.filter(
    (u) =>
      u.editorialState === "Approved" &&
      u.expiryDate !== null &&
      new Date(u.expiryDate).getTime() < now.getTime(),
  );
}

/** Any approved record, current or expired — used to resolve a detail route. */
export function findPublishedOrExpiredUpdate(slug: string): UpdateRecord | undefined {
  return updates.find((u) => u.slug === slug && u.editorialState === "Approved");
}

export function featuredUpdate(now: Date = new Date()): UpdateRecord | undefined {
  return publishedUpdates(now).find((u) => u.featured);
}

export function hasApprovedUpdate(now: Date = new Date()): boolean {
  return publishedUpdates(now).length > 0;
}
