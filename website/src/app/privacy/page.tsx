import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/content/LegalPage";
import { features } from "@/config/features";
import { routes } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

/**
 * Privacy Notice — draft.
 *
 * Written to describe what this website actually does today, which is very
 * little: it collects nothing, sets no cookie of its own, loads no third-party
 * script and runs no analytics. The sections that will need counsel's wording
 * are named rather than guessed at, and the page stays `noindex` until legal
 * review signs it off (`features.legalPagesApproved`).
 */

export const metadata: Metadata = buildMetadata({
  title: "Privacy Notice",
  description:
    "How the foundation handles personal information supplied through this website, and what the website currently collects.",
  path: routes.privacy,
  indexable: features.legalPagesApproved,
});

const sections: LegalSection[] = [
  {
    id: "what-this-covers",
    heading: "What this notice covers",
    body: (
      <>
        <p>
          This notice describes how Indo-Global Skills &amp; Edu Foundation handles personal
          information provided through this website. It does not cover any other service, and it
          does not cover information you send us by other means.
        </p>
        <p>
          A reviewed and approved version will replace this draft before the website begins
          collecting any personal information.
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    heading: "What this website collects today",
    body: (
      <>
        <p>
          <strong>Nothing.</strong> The enquiry form on this website is not connected to a delivery
          provider, so it cannot accept or transmit a submission. No enquiry is received, stored or
          forwarded.
        </p>
        <p>
          The website has no user accounts, no newsletter, no donation or payment facility, no
          learner-interest capture and no application process.
        </p>
      </>
    ),
  },
  {
    id: "when-the-form-opens",
    heading: "What we will collect when the enquiry form opens",
    body: (
      <>
        <p>When the form is switched on, it will ask for:</p>
        <ul>
          <li>the type of enquiry you are making, so it reaches the right person;</li>
          <li>your name and email address, so we can reply;</li>
          <li>your organisation and role, if you choose to give them;</li>
          <li>a subject and your message.</li>
        </ul>
        <p>
          It will also ask you to confirm that you are 18 or older. That confirmation is a policy
          statement, not proof of age.
        </p>
        <p>
          The form does not ask for a phone number, a date of birth, government identification, bank
          or payment details, income, caste, disability or health information, education records, or
          a CV — and it never will. Please do not send any of that, or any information about a
          child, in the message field.
        </p>
      </>
    ),
  },
  {
    id: "cookies-and-storage",
    heading: "Cookies, storage, and third-party services",
    body: (
      <>
        <p>
          This website sets no cookies of its own and stores nothing in your browser to identify or
          track you.
        </p>
        <p>
          It runs no analytics, no advertising pixels, no session recording, no chat widget and no
          embedded map. Fonts are served from this website, not from a third-party font service, so
          loading a page does not tell anyone else that you visited.
        </p>
        <p>
          Because no optional tracker is in use, this website shows no cookie consent banner. A
          banner offering a choice that does not exist would be misleading. If an optional service
          is ever introduced, we will publish the details here and provide a genuine choice with
          equally easy accept and reject options.
        </p>
      </>
    ),
  },
  {
    id: "outstanding",
    heading: "What still needs to be confirmed",
    body: (
      <>
        <p>
          Before the enquiry form opens, the following must be decided, approved and published here:
        </p>
        <ul>
          <li>
            the service provider that will receive and store enquiries, and where it operates;
          </li>
          <li>how long an enquiry is kept, and how it is deleted;</li>
          <li>who inside the foundation can read enquiries;</li>
          <li>how to ask for access to, correction of, or deletion of your information;</li>
          <li>the contact route for a privacy question, complaint or grievance;</li>
          <li>how we respond if information about a child is sent to us by mistake.</li>
        </ul>
        <p>
          These are being worked through with legal advice under the applicable Indian data
          protection law as it is in force at the time the form opens.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    heading: "Contacting us about privacy",
    body: (
      <>
        <p>
          No monitored privacy contact address has been published yet. Once one is approved it will
          appear here and on the <Link href={routes.contact}>contact page</Link>.
        </p>
        <p>
          In the meantime, the enquiry form includes a “Privacy or data request” category, which
          will route to the named privacy owner as soon as the form is operational.
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Notice"
      lead="How we handle personal information provided through this website — and what this website currently collects, which is nothing."
      effectiveDate={null}
      draft={!features.legalPagesApproved}
      sections={sections}
    />
  );
}
