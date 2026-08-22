import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/content/LegalPage";
import { features } from "@/config/features";
import { routes } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

/**
 * Terms of Use — draft.
 *
 * States the informational nature of the site and the absence of any guarantee,
 * and names the clauses counsel still has to supply. Governing law and
 * jurisdiction are deliberately not asserted: that is a legal decision, not a
 * drafting one. `noindex` until approved.
 */

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use",
  description: "The terms that apply to using this website.",
  path: routes.terms,
  indexable: features.legalPagesApproved,
});

const sections: LegalSection[] = [
  {
    id: "purpose",
    heading: "Purpose of this website",
    body: (
      <>
        <p>
          This website is informational. It describes what Indo-Global Skills &amp; Edu Foundation
          intends to work on and how to start a conversation with us.
        </p>
        <p>
          It is not an offer, an application process, an admission route, or a commitment to deliver
          any programme. Where a page describes proposed work, it is a plan and not a service that
          is currently available.
        </p>
      </>
    ),
  },
  {
    id: "no-guarantee",
    heading: "No guarantee of employment, admission, or certification",
    body: (
      <p>
        Nothing on this website guarantees employment, admission, promotion, funding, or any
        third-party certification. If an approved programme ever offers a specific commitment, that
        commitment will be stated explicitly on the page for that programme.
      </p>
    ),
  },
  {
    id: "accuracy",
    heading: "Accuracy and corrections",
    body: (
      <>
        <p>
          We aim to keep this website accurate and to show when time-sensitive information was last
          reviewed. Some information is still being verified against source documents, and where
          that is the case the page says so rather than publishing an unverified value.
        </p>
        <p>
          If you find something inaccurate, please tell us through the{" "}
          <Link href={routes.contact}>enquiry form</Link>. We correct material errors and, where
          appropriate, note the correction.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    heading: "Acceptable use",
    body: (
      <p>
        Please do not use this website to attempt unauthorised access, to disrupt its operation, to
        send automated or bulk submissions, or to submit unlawful content. Submissions are rate
        limited to protect the service.
      </p>
    ),
  },
  {
    id: "intellectual-property",
    heading: "Intellectual property",
    body: (
      <p>
        The text and graphics on this website belong to the foundation unless stated otherwise. The
        two typefaces used here are licensed under the SIL Open Font License. The visual design is
        an original adaptation built for this website.
      </p>
    ),
  },
  {
    id: "external-links",
    heading: "External links",
    body: (
      <p>
        Where this website links to another organisation, we do not control that website and are not
        responsible for its content. A link is not an endorsement, an affiliation, or a partnership.
      </p>
    ),
  },
  {
    id: "no-affiliation",
    heading: "Similar names",
    body: (
      <p>
        Indo-Global Skills &amp; Edu Foundation is an independent organisation. A similar name does
        not indicate an affiliation with any college, summit, foundation, trust, company, or
        government initiative unless this website identifies a documented partnership explicitly.
      </p>
    ),
  },
  {
    id: "outstanding",
    heading: "What still needs to be confirmed",
    body: (
      <>
        <p>The approved version of these terms will additionally cover:</p>
        <ul>
          <li>liability and disclaimer wording appropriate under Indian law;</li>
          <li>governing law and jurisdiction;</li>
          <li>how programme-specific terms take precedence where they exist;</li>
          <li>the notice period and method for changes to these terms;</li>
          <li>a named contact for legal correspondence.</li>
        </ul>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Use"
      lead="The terms that apply when you use this website."
      effectiveDate={null}
      draft={!features.legalPagesApproved}
      sections={sections}
    />
  );
}
