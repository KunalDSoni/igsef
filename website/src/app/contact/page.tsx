import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/content/PageHero";
import { EnquiryForm } from "@/components/form/EnquiryForm";
import { ButtonLink } from "@/components/ui/Button";
import { DefinitionList, DefinitionRow } from "@/components/ui/DefinitionList";
import { Notice } from "@/components/ui/Notice";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { features } from "@/config/features";
import { cta, routes } from "@/config/site";
import { contactCopy } from "@/content/copy";
import { ENQUIRY_TYPES } from "@/lib/enquiry/schema";
import { settings } from "@/content/settings";
import { resolveEnquiryMode } from "@/lib/enquiry/mode";
import { buildMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Contact the foundation about partnerships, programmes, media, governance, accessibility, or general enquiries.",
  path: routes.contact,
});

export default function ContactPage() {
  const mode = resolveEnquiryMode();
  const hasContactDetails =
    features.publicContactDetails &&
    (settings.publicEmail || settings.publicPhone || settings.publicAddress);

  return (
    <>
      <PageHero eyebrow={contactCopy.hero.eyebrow} title={contactCopy.hero.h1} decor="open">
        <p className={styles.lead}>{contactCopy.hero.lead}</p>
      </PageHero>

      <Section tone="canvas" aria-labelledby="enquiry-heading">
        <Container width="wide">
          <div className={styles.grid}>
            {/* Guidance first in the DOM, so it also comes first on mobile. */}
            <div className={styles.aside}>
              <SectionIntro
                heading="Before you write"
                headingId="guidance-heading"
                headingLevel="h2"
              />

              <div className={styles.asideBlock}>
                <h3 className={styles.asideHeading}>Choose the right enquiry type</h3>
                <p className={styles.asideBody}>
                  Your choice decides who receives the enquiry. These are the categories available:
                </p>
                <ul className={styles.typeList}>
                  {ENQUIRY_TYPES.map((type) => (
                    <li key={type.value}>{type.label}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.asideBlock}>
                <h3 className={styles.asideHeading}>Please do not send</h3>
                <ul className={styles.dontList}>
                  <li>Identity documents or government identification numbers</li>
                  <li>Bank, payment, or income information</li>
                  <li>Education records, certificates, or CVs</li>
                  <li>Health, disability, or caste information</li>
                  <li>Any information about a child</li>
                </ul>
                <p className={styles.asideBody}>
                  We do not need any of this to answer an enquiry, and we do not want to hold it.
                </p>
              </div>

              {hasContactDetails ? (
                <div className={styles.asideBlock}>
                  <h3 className={styles.asideHeading}>Other ways to reach us</h3>
                  <DefinitionList>
                    {settings.publicEmail ? (
                      <DefinitionRow term="Email">
                        <a href={`mailto:${settings.publicEmail}`}>{settings.publicEmail}</a>
                      </DefinitionRow>
                    ) : null}
                    {settings.publicPhone ? (
                      <DefinitionRow term="Phone">
                        <a href={`tel:${settings.publicPhone.replace(/\s+/g, "")}`}>
                          {settings.publicPhone}
                        </a>
                      </DefinitionRow>
                    ) : null}
                    {settings.publicAddress ? (
                      <DefinitionRow term="Address">{settings.publicAddress}</DefinitionRow>
                    ) : null}
                  </DefinitionList>
                </div>
              ) : (
                /*
                 * No monitored public address, phone number or postal address has
                 * been approved (content.md §18). Publishing one that nobody
                 * watches would be worse than publishing none.
                 */
                <div className={styles.asideBlock}>
                  <Notice tone="neutral" title="No public email or phone number yet">
                    <p>
                      We have not published a public email address, phone number or office address.
                      We will add them once each one is approved and monitored by a named owner, so
                      that anything sent to them actually reaches someone.
                    </p>
                  </Notice>
                </div>
              )}
            </div>

            <div>
              <SectionIntro
                heading={contactCopy.enquiry.h2}
                headingId="enquiry-heading"
                headingLevel="h2"
              />
              <EnquiryForm
                mode={mode}
                responseSla={features.publishedSla ? settings.responseSla : null}
                alternativeEmail={features.publicContactDetails ? settings.publicEmail : null}
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="surface" aria-labelledby="elsewhere-heading" divided>
        <Container>
          <SectionIntro
            heading="Looking for something else?"
            headingId="elsewhere-heading"
            lead="These pages answer the questions we are asked most often."
            actions={
              <>
                <ButtonLink href={cta.focusAreas.href} variant="secondary">
                  {cta.focusAreas.label}
                </ButtonLink>
                <ButtonLink href={routes.about} variant="secondary">
                  About the foundation
                </ButtonLink>
                <ButtonLink href={routes.partner} variant="secondary">
                  Partnership routes
                </ButtonLink>
              </>
            }
          />
        </Container>
      </Section>
    </>
  );
}
