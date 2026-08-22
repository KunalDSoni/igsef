/**
 * Shared formatting helpers.
 *
 * A fixed `en-IN` locale and an explicit UTC time zone keep dates identical on
 * the server and in the browser, so a prerendered page never hydrates with a
 * different string than it was built with.
 */

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** Formats an ISO date as `12 August 2026` (content.md §3). */
export function formatDate(isoDate: string): string {
  return dateFormatter.format(new Date(isoDate));
}
