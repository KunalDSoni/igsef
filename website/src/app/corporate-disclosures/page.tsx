import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/content/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { DefinitionList, DefinitionRow, PendingRow } from "@/components/ui/DefinitionList";
import { Notice } from "@/components/ui/Notice";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { features } from "@/config/features";
import { routes } from "@/config/site";
import { disclosureDocuments, identityFields } from "@/content/disclosures";
import { disclosuresCopy } from "@/content/copy";
import { buildMetadata } from "@/lib/seo";
import styles from "./page.module.css";

/**
 * Corporate Disclosures.
 *
 * Blocked, unlinked and `noindex` until verified identity fields exist
 * (project-controls.md §10). The route stays reachable so the corporate-data
 * approver can review the layout, but:
 *
 * - it is absent from the header, the footer and the sitemap;
 * - it is `noindex, nofollow` regardless of build stage;
 * - it carries an unmistakable internal-preview banner;
 * - every identity value is genuinely absent from the rendered HTML.
 *
 * Enabling `features.corporateDisclosures` removes the banner, adds the footer
 * link and the sitemap entry, and makes the page indexable in a production build.
 */

export const metadata: Metadata = buildMetadata({
  title: "Corporate Disclosures",
  description:
    "The foundation's legal identity, registrations, governance information, policies, and public reporting.",
  path: routes.corporateDisclosures,
  indexable: features.corporateDisclosures,
});

const statusTone = {
  Verified: "success",
  "Verification required": "warning",
  "Not held": "neutral",
  Superseded: "neutral",
} as const;

export default function CorporateDisclosuresPage() {
  const verified = features.corporateDisclosures;

  return (
    <>
      <PageHero
        eyebrow={disclosuresCopy.hero.eyebrow}
        title={disclosuresCopy.hero.h1}
        lead={disclosuresCopy.hero.lead}
        decor="converge"
      />

      <Section tone="canvas" aria-labelledby="identity-heading">
        <Container width="wide">
          {!verified ? (
            <div className={styles.blockedBanner} data-print-hide>
              <Notice tone="internal" title="This page is not published">
                <p>
                  It is not linked from the website, is excluded from search engines and the
                  sitemap, and is reachable only by direct address. It exists so the corporate-data
                  approver can review the layout before any fact is published.
                </p>
                <p>
                  Every field below is empty on purpose. The registered name, registration number,
                  incorporation date, status, legal form, registrar, activity, registered office and
                  directors will be published only after they have been checked against the
                  Certificate of Incorporation and current official company records and signed off.
                  Candidate values from third-party sources are deliberately not shown here.
                </p>
              </Notice>
            </div>
          ) : null}

          <SectionIntro
            heading="Legal identity"
            headingId="identity-heading"
            lead="Each field is published from an authoritative source document and shows the date it was last checked."
          />

          <DefinitionList>
            {identityFields.map((field) =>
              field.value ? (
                <DefinitionRow key={field.label} term={field.label}>
                  {field.value}
                  {field.lastChecked ? (
                    <span className={styles.checked}> · Last checked {field.lastChecked}</span>
                  ) : null}
                </DefinitionRow>
              ) : (
                <PendingRow key={field.label} term={field.label} source={field.requiredSource} />
              ),
            )}
          </DefinitionList>

          <div className={styles.earlyNote}>
            <Notice tone="info" title="Reporting">
              <p>{disclosuresCopy.earlyStageNote}</p>
            </Notice>
          </div>
        </Container>
      </Section>

      <Section tone="surface" aria-labelledby="documents-heading" divided>
        <Container width="wide">
          <SectionIntro
            heading="Documents and policies"
            headingId="documents-heading"
            lead="Each row shows its current state. We list items that are not yet held so you can see what is outstanding rather than what is simply missing."
          />

          <ul className={styles.documentList}>
            {disclosureDocuments.map((doc) => (
              <li key={doc.id} className={styles.documentRow}>
                <div className={styles.documentMain}>
                  <h3 className={styles.documentTitle}>{doc.title}</h3>
                  <p className={styles.documentSummary}>{doc.plainSummary}</p>
                  <p className={styles.documentMeta}>
                    <span className={styles.documentCategory}>{doc.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>Owner: {doc.owner}</span>
                    {doc.effectiveDate ? (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>Effective {doc.effectiveDate}</span>
                      </>
                    ) : null}
                  </p>
                </div>

                <div className={styles.documentAction}>
                  <span className={`${styles.documentStatus} ${styles[statusTone[doc.status]]}`}>
                    {doc.status}
                  </span>
                  {doc.document ? (
                    <ButtonLink href={doc.document.href} variant="tertiary" external>
                      Download {doc.title} ({doc.document.fileType}, {doc.document.fileSize})
                    </ButtonLink>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="canvas" aria-labelledby="corrections-heading">
        <Container width="wide">
          <SectionIntro
            heading="Report an error"
            headingId="corrections-heading"
            lead="If anything on this website is inaccurate, tell us and we will correct it."
            actions={
              <ButtonLink href={routes.contact} variant="secondary">
                Send a correction request
              </ButtonLink>
            }
          />
        </Container>
      </Section>
    </>
  );
}
