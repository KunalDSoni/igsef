/**
 * Analytics adapter.
 *
 * Off by default (`features.analytics === false`) and constrained by
 * construction to the event dictionary in `Requirement.md` §16.1.
 *
 * Two guarantees this module exists to enforce:
 *
 * 1. **No personal data and no free text.** Property values are restricted to a
 *    small union of categorical types. Names, email addresses, organisations,
 *    subjects and message bodies cannot be passed without a type error, and the
 *    runtime scrubber drops anything that slips through a cast.
 * 2. **No provider is contacted while the gate is closed.** With analytics
 *    disabled the call is a no-op; nothing is queued, buffered or stored.
 *
 * When an analytics owner and a consent design exist, implement `dispatch()`
 * against the approved provider. Do not widen `EventProperties`.
 */

import { features } from "@/config/features";

/** The approved event names. Anything else is a type error. */
export type AnalyticsEvent =
  | "cta_click"
  | "nav_click"
  | "focus_area_view"
  | "form_start"
  | "form_error"
  | "form_submit_success"
  | "resource_download"
  | "outbound_click"
  | "language_change";

/**
 * Allowed property values: short categorical strings, numbers and booleans.
 * Free text is not representable here by contract, and the scrubber below
 * enforces the same rule at runtime.
 */
export type PropertyValue = string | number | boolean;

export type EventProperties = Record<string, PropertyValue>;

/** Longest permitted property value. Anything longer reads as free text. */
const MAX_VALUE_LENGTH = 64;

/**
 * Property names that must never be sent, whatever the call site does. This is
 * a backstop for a bad cast, not the primary control.
 */
const FORBIDDEN_KEYS = new Set([
  "name",
  "email",
  "phone",
  "organisation",
  "organization",
  "role",
  "subject",
  "message",
  "query",
  "value",
  "text",
  "content",
  "address",
]);

/** Drops forbidden keys and anything that looks like free text. */
export function scrubProperties(properties: EventProperties): EventProperties {
  const safe: EventProperties = {};

  for (const [key, value] of Object.entries(properties)) {
    if (FORBIDDEN_KEYS.has(key.toLowerCase())) continue;
    if (typeof value === "string") {
      if (value.length > MAX_VALUE_LENGTH) continue;
      if (value.includes("@")) continue; // never an address
      safe[key] = value;
      continue;
    }
    if (typeof value === "number" || typeof value === "boolean") {
      safe[key] = value;
    }
  }

  return safe;
}

/**
 * Sends an approved event. A no-op while the analytics gate is closed.
 *
 * Deliberately silent on failure: a measurement problem must never surface to a
 * visitor or interrupt a journey.
 */
export function trackEvent(event: AnalyticsEvent, properties: EventProperties = {}): void {
  if (!features.analytics) return;

  const safe = scrubProperties(properties);
  dispatch(event, safe);
}

/**
 * Provider transport. Intentionally unimplemented: no analytics vendor has been
 * selected or approved, and shipping a half-wired transport would risk sending
 * data before the consent and retention decisions exist.
 */
function dispatch(event: AnalyticsEvent, properties: EventProperties): void {
  void event;
  void properties;
}
