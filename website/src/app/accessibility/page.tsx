import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/content/LegalPage";
import { features } from "@/config/features";
import { routes } from "@/config/site";
import { settings } from "@/content/settings";
import { buildMetadata } from "@/lib/seo";

/**
 * Accessibility Statement.
 *
 * Honest by construction: it states the target, what has actually been tested,
 * what has not, and what is outstanding. It does not claim conformance — an
 * automated pass and an internal keyboard review are not an independent audit,
 * and `Requirement.md` NFR-A09 is explicit that automated tooling alone is not
 * acceptance evidence.
 */

export const metadata: Metadata = buildMetadata({
  title: "Accessibility",
  description:
    "Our accessibility target for this website, what has been tested, known limitations, and how to ask for help.",
  path: routes.accessibility,
});

/** The date the internal assessment described below was carried out. */
const ASSESSMENT_DATE = "2026-08-22";

const sections: LegalSection[] = [
  {
    id: "commitment",
    heading: "Our commitment",
    body: (
      <>
        <p>
          We want everyone to be able to read this website and use everything on it, including
          people who navigate by keyboard, use a screen reader, magnify the page, or prefer reduced
          motion.
        </p>
        <p>
          Our target is the Web Content Accessibility Guidelines version 2.2, Level AA. That is a
          target we design and build against, not a certification we hold.
        </p>
      </>
    ),
  },
  {
    id: "what-we-have-done",
    heading: "What we have done",
    body: (
      <>
        <p>The following were built in deliberately and checked during development:</p>
        <ul>
          <li>a skip link to the main content on every page;</li>
          <li>
            a visible focus indicator on every interactive element, which is never removed without a
            replacement;
          </li>
          <li>
            navigation, menus, disclosures and form controls built from native HTML elements, so
            they work with a keyboard and report their state correctly;
          </li>
          <li>
            a mobile menu that traps focus while open, closes with the Escape key, and returns focus
            to the button that opened it;
          </li>
          <li>
            status, error and success messages conveyed in words and shapes as well as colour;
          </li>
          <li>
            form fields with permanently visible labels, plain-language error messages, and an error
            summary that receives focus when a submission fails;
          </li>
          <li>touch targets of at least 44 by 44 pixels;</li>
          <li>
            page content that reflows to a 320-pixel-wide screen and to 200% zoom without loss of
            content or horizontal scrolling;
          </li>
          <li>
            decorative graphics hidden from assistive technology, and no information carried by an
            image, a colour, a hover state or an animation alone;
          </li>
          <li>
            respect for the reduced-motion setting: with it on, the only decorative animation on the
            site stops.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-tested",
    heading: "How this was tested",
    body: (
      <>
        <p>
          As of {ASSESSMENT_DATE}, the website was checked with an automated accessibility scanner
          on every page template, and manually with keyboard-only navigation, at 200% zoom, at a
          320-pixel viewport width, and with the reduced-motion preference enabled.
        </p>
        <p>
          This is an internal assessment carried out by the team that built the website. It is a
          starting point, not an audit.
        </p>
      </>
    ),
  },
  {
    id: "limitations",
    heading: "Known limitations",
    body: (
      <>
        <p>We would rather tell you what has not been done than imply that everything has:</p>
        <ul>
          <li>
            No independent accessibility review has taken place. One is required before this website
            is published.
          </li>
          <li>
            No testing with people who use assistive technology day to day has taken place yet.
          </li>
          <li>
            Screen-reader testing has been limited to inspection of names, roles, states and
            structure. A full pass with more than one screen reader and browser combination is
            outstanding.
          </li>
          <li>
            This website is available in English only. Hindi and Marathi have been planned for but
            not built.
          </li>
          <li>
            No documents are published yet. When they are, each one will either be accessible or be
            accompanied by an equivalent web page.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "getting-help",
    heading: "If something does not work for you",
    body: (
      <>
        {features.publicContactDetails && settings.accessibilityEmail ? (
          <p>
            Email{" "}
            <a href={`mailto:${settings.accessibilityEmail}`}>{settings.accessibilityEmail}</a> with
            the address of the page and a description of the problem, and we will respond.
          </p>
        ) : (
          <>
            <p>
              We have not yet published a monitored accessibility contact address. Until we do, use
              the <Link href={routes.contact}>enquiry form</Link> and choose “Accessibility” as the
              enquiry type.
            </p>
            <p>
              The enquiry form is not yet connected to a delivery provider, so we cannot honestly
              promise a response today. A monitored contact route and a published response time are
              among the items that must be in place before this website is launched.
            </p>
          </>
        )}
        <p>
          If you need information from this website in a different format, ask us and we will
          provide it.
        </p>
      </>
    ),
  },
  {
    id: "review",
    heading: "Review",
    body: (
      <p>
        This statement was prepared on {ASSESSMENT_DATE}. It will be reviewed when an independent
        assessment is completed, and after any significant change to the website.
      </p>
    ),
  },
];

export default function AccessibilityPage() {
  return (
    <LegalPage
      eyebrow="Accessibility"
      title="Accessibility statement"
      lead="What we are aiming for, what we have tested, what we know is not finished, and how to tell us if something does not work."
      effectiveDate={ASSESSMENT_DATE}
      draft={false}
      sections={sections}
    />
  );
}
