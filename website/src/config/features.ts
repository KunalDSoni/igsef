/**
 * Publication gates.
 *
 * Every gate below corresponds to a real, unresolved external dependency
 * recorded in `project-controls.md` and `NEEDS_CLIENT_INPUT.md`. Flipping one to
 * `true` is a publication decision, not a code tidy-up: read the note attached to
 * it first and make sure the approval it names actually exists.
 *
 * Gates are plain constants rather than environment variables so that the state
 * of the site is reviewable in version control and cannot drift between
 * environments. The single exception is enquiry delivery, which depends on a
 * server-side secret and is therefore derived from the environment.
 */

export interface FeatureGates {
  /**
   * Updates & Resources in navigation, the Home module and search.
   * Gate: at least one approved update exists (project-controls.md §2).
   * The route itself stays reachable and `noindex` with an approved empty state.
   */
  updates: boolean;
  /**
   * Corporate Disclosures content and every link to it.
   * Gate: Certificate of Incorporation and current MCA master data verified and
   * signed off by the corporate-data approver (content.md §12.4).
   */
  corporateDisclosures: boolean;
  /**
   * Leadership/Team section on About.
   * Gate: names, roles, biographies, photograph consent and approval (P1).
   */
  leadership: boolean;
  /**
   * Partner logos / named relationships.
   * Gate: signed, documented relationships. No partner exists yet.
   */
  partners: boolean;
  /**
   * A public email address, phone number or postal address anywhere on the site,
   * including the form's alternative-contact route and the footer.
   * Gate: operations confirms a monitored public contact (content.md §18).
   */
  publicContactDetails: boolean;
  /**
   * Whether the legal pages carry approved wording. While `false` they render
   * with a visible draft notice and stay `noindex`.
   * Gate: legal/privacy review (implementation-plan.md §3.4).
   */
  legalPagesApproved: boolean;
  /**
   * Analytics dispatch. Off by default; the adapter only ever forwards the
   * approved event/property dictionary and never personal or free-text values.
   * Gate: analytics owner, consent design and retention decisions.
   */
  analytics: boolean;
  /**
   * A cookie/consent choice UI. Required only if a non-essential tracker is
   * enabled. Showing one while the site sets no optional storage would be a
   * performative banner, which `content.md` §16 prohibits.
   */
  consentUi: boolean;
  /**
   * Response-time commitments ("we aim to acknowledge within two business
   * days"). Gate: an owner who can actually meet the SLA (content.md §9.4).
   */
  publishedSla: boolean;
}

export const features: FeatureGates = {
  updates: false,
  corporateDisclosures: false,
  leadership: false,
  partners: false,
  publicContactDetails: false,
  legalPagesApproved: false,
  analytics: false,
  consentUi: false,
  publishedSla: false,
};

/**
 * Enquiry delivery.
 *
 * The form UI, validation and server route always exist. Delivery is only
 * *configured* when a provider endpoint is present in the server environment.
 * When it is not, the route accepts nothing and the UI shows an honest
 * unavailable state rather than faking a successful submission.
 *
 * Read on the server only — `ENQUIRY_ENDPOINT` is not a `NEXT_PUBLIC_` variable
 * and must never be exposed to the browser bundle.
 */
export function isEnquiryDeliveryConfigured(): boolean {
  return Boolean(process.env.ENQUIRY_ENDPOINT?.trim());
}

/**
 * Test/demo mode for the enquiry adapter.
 *
 * When enabled the adapter resolves without contacting any provider so that
 * automated tests can exercise the success path. It is refused in production
 * builds (see `src/lib/enquiry/adapter.ts`) so a demo success can never be shown
 * to a real visitor.
 */
export function isEnquiryTestMode(): boolean {
  return process.env.ENQUIRY_TEST_MODE?.trim() === "true";
}
