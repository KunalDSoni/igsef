import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/content/PageHero";
import { AccordionItem, AccordionList } from "@/components/ui/Accordion";
import { ProcessSteps } from "@/components/content/ProcessSteps";
import { EnquiryForm } from "@/components/form/EnquiryForm";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardFooter } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Notice } from "@/components/ui/Notice";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { features } from "@/config/features";
import { cta, routes } from "@/config/site";
import { partnerCopy } from "@/content/copy";
import { publishedFaqs } from "@/content/faqs";
import { settings } from "@/content/settings";
import { resolveEnquiryMode } from "@/lib/enquiry/mode";
import { buildMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata: Metadata = buildMetadata({
  title: "Partner With Us",
  description:
    "Explore collaboration with the foundation as an education institution, employer, industry body, NGO, CSR team, or funder.",
  path: routes.partner,
});

const surfaces = ["lavender", "mint", "yellow", "cream"] as const;

export default function PartnerPage() {
  const mode = resolveEnquiryMode();
  /* Funding, donation and foreign-contribution questions belong with the
     partnership audience rather than on the focus-areas page. */
  const faqs = publishedFaqs().filter(
    (faq) => faq.category === "Partnership" || faq.category === "Funding",
  );

  return (
    <>
      <PageHero
        eyebrow={partnerCopy.hero.eyebrow}
        title={partnerCopy.hero.h1}
        lead={partnerCopy.hero.lead}
        decor="converge"
        actions={
          /* On this page the anchor is honest: it scrolls to the enquiry
             section, which states plainly whether enquiries can be received. */
          <ButtonLink href="#enquiry" withArrow>
            Go to the enquiry form
          </ButtonLink>
        }
      />

      {/* ---------------------------------------------------- partnership routes */}
      <Section tone="canvas" aria-labelledby="routes-heading">
        <Container>
          <SectionIntro
            heading={partnerCopy.routes.h2}
            headingId="routes-heading"
            lead={partnerCopy.routes.intro}
          />
          <Grid min="pillars">
            {partnerCopy.routes.items.map((item, index) => (
              <Card key={item.title} surface={surfaces[index % surfaces.length]}>
                <h3 className={styles.routeTitle}>{item.title}</h3>
                <p className={styles.routeBody}>{item.body}</p>
                {"note" in item && item.note ? (
                  <CardFooter>
                    <p className={styles.routeNote}>{item.note}</p>
                  </CardFooter>
                ) : null}
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* ------------------------------------------------------------- process */}
      <Section tone="surface" aria-labelledby="process-heading" divided>
        <Container>
          <SectionIntro heading={partnerCopy.process.h2} headingId="process-heading" />
          <ProcessSteps steps={partnerCopy.process.steps} />
          {/*
            The response-time commitment is published only when an owner can
            actually meet it (content.md §9.4). Until then the page says what it
            can honestly say instead.
          */}
          {features.publishedSla && settings.responseSla ? (
            <p className={styles.slaNote}>
              We aim to acknowledge partnership enquiries within {settings.responseSla}.
            </p>
          ) : (
            <p className={styles.slaNote}>
              We have not yet published a response-time commitment. We will add one here once a
              named owner is in place for each enquiry type.
            </p>
          )}
        </Container>
      </Section>

      {/* ---------------------------------------------------------- governance */}
      <Section tone="canvas" aria-labelledby="governance-heading">
        <Container width="wide">
          <div className={styles.governanceGrid}>
            <div>
              <SectionIntro
                eyebrow="Due diligence"
                heading={partnerCopy.governance.h2}
                headingId="governance-heading"
              />
              <p className={styles.governanceBody}>
                {features.corporateDisclosures
                  ? partnerCopy.governance.body
                  : partnerCopy.governance.pendingBody}
              </p>
              {features.corporateDisclosures ? (
                <div className={styles.governanceActions}>
                  <ButtonLink href={cta.disclosures.href} variant="secondary">
                    {cta.disclosures.label}
                  </ButtonLink>
                </div>
              ) : null}
            </div>

            <Notice tone="info" title="What we can tell you today">
              <p>
                We are newly established. No programme is in delivery, no results have been
                measured, and we hold no partner, funder, accreditation or government relationship.
                If any of that changes, it will be published here with its evidence.
              </p>
            </Notice>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------ FAQ */}
      <Section tone="canvas" aria-labelledby="partner-faq-heading">
        <Container width="wide">
          <SectionIntro heading="Questions partners ask" headingId="partner-faq-heading" />
          <AccordionList>
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.id}
                id={faq.id}
                question={faq.question}
                defaultOpen={index === 0}
              >
                {faq.answer.map((paragraph, answerIndex) => (
                  <p key={answerIndex}>{paragraph}</p>
                ))}
              </AccordionItem>
            ))}
          </AccordionList>
        </Container>
      </Section>

      {/* -------------------------------------------------------------- enquiry */}
      <Section tone="surface" id="enquiry-section" aria-labelledby="enquiry-heading" divided>
        <Container width="wide">
          <div className={styles.enquiryGrid}>
            <div>
              <SectionIntro
                eyebrow="Get in touch"
                heading={partnerCopy.enquiry.h2}
                headingId="enquiry-heading"
                lead="Tell us what you are trying to achieve. A short initial enquiry is enough — we will come back to you about the right next step."
              />
              <div className={styles.enquiryAside}>
                <h3 className={styles.asideHeading}>Helpful to include</h3>
                <ul className={styles.asideList}>
                  <li>The kind of organisation you represent</li>
                  <li>What you are trying to change or improve</li>
                  <li>Who the work would be for</li>
                  <li>Where you are based or would deliver</li>
                  <li>What a useful next step would look like for you</li>
                </ul>
                <p className={styles.asideNote}>
                  Please do not send budgets, identity documents, learner records, or any
                  information about a child.
                </p>
              </div>
            </div>

            <EnquiryForm
              mode={mode}
              defaultEnquiryType="partnership"
              responseSla={features.publishedSla ? settings.responseSla : null}
              alternativeEmail={features.publicContactDetails ? settings.publicEmail : null}
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
