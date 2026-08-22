import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/content/CtaBand";
import { FocusAreaCard } from "@/components/content/FocusAreaCard";
import { PageHero } from "@/components/content/PageHero";
import { AccordionItem, AccordionList } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Grid } from "@/components/ui/Grid";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { StatusChip } from "@/components/ui/StatusChip";
import { primaryAction } from "@/config/cta";
import { cta, routes } from "@/config/site";
import { focusAreas, hasOpenProgramme } from "@/content/focus-areas";
import { publishedFaqs } from "@/content/faqs";
import { focusAreasCopy } from "@/content/copy";
import { PUBLIC_STATUSES } from "@/content/types";
import { buildMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata: Metadata = buildMetadata({
  title: "Focus Areas",
  description:
    "Explore the foundation's proposed focus across future-ready skills, educator capacity, education–industry pathways, and inclusive access.",
  path: routes.focusAreas,
});

/**
 * Plain-language definitions for the controlled status vocabulary. Every value
 * in `PUBLIC_STATUSES` has an entry, so the legend cannot fall out of step with
 * the vocabulary a record can actually carry.
 */
const statusMeanings: Record<(typeof PUBLIC_STATUSES)[number], string> = {
  Proposed: "A direction under consideration. Nothing is being delivered and nothing is open.",
  "In development":
    "An approved initiative that is being designed. It is not open to participants.",
  Pilot: "A small first version running with a limited group to test the design.",
  Open: "Complete eligibility, dates, and application information are available now.",
  "In delivery": "Running with participants who have already been selected.",
  Completed: "Finished. Any results are published with their definition and reporting period.",
  Paused: "Temporarily stopped. The page explains why and what happens next.",
  Archived: "Kept for reference only. It is not running and will not reopen in this form.",
};

export default function FocusAreasPage() {
  const primary = primaryAction();
  const faqs = publishedFaqs().filter((faq) => faq.category !== "Funding");
  const openProgrammeExists = hasOpenProgramme();

  return (
    <>
      <PageHero
        eyebrow={focusAreasCopy.hero.eyebrow}
        title={focusAreasCopy.hero.h1}
        lead={focusAreasCopy.hero.lead}
        decor="step"
        actions={
          <ButtonLink href="#status" variant="secondary">
            {cta.programmeStatus.label}
          </ButtonLink>
        }
      />

      {/* -------------------------------------------------------- focus cards */}
      <Section tone="canvas" aria-labelledby="areas-heading">
        <Container>
          <SectionIntro
            heading="Our proposed focus areas"
            headingId="areas-heading"
            lead="All four are working drafts. Each carries a published status that we update as work moves from proposal to design to delivery."
          />
          <Grid min="pillars">
            {focusAreas.map((focusArea, index) => (
              <FocusAreaCard key={focusArea.id} focusArea={focusArea} index={index} />
            ))}
          </Grid>
        </Container>
      </Section>

      {/* ------------------------------------------------------ status section */}
      <Section tone="surface" id="status" aria-labelledby="status-heading" divided>
        <Container>
          <SectionIntro
            eyebrow="Programme status"
            heading={focusAreasCopy.statusExplainer.h2}
            headingId="status-heading"
            lead={focusAreasCopy.statusExplainer.intro}
          />

          <dl className={styles.statusList}>
            {PUBLIC_STATUSES.map((status) => (
              <div key={status} className={styles.statusRow}>
                <dt className={styles.statusTerm}>
                  <StatusChip status={status} />
                </dt>
                <dd className={styles.statusMeaning}>{statusMeanings[status]}</dd>
              </div>
            ))}
          </dl>

          <div className={styles.currentStatus}>
            <h3 className={styles.currentStatusHeading}>What is available right now</h3>
            {openProgrammeExists ? (
              <Grid>
                {focusAreas
                  .filter((focusArea) => focusArea.status === "Open")
                  .map((focusArea, index) => (
                    <FocusAreaCard
                      key={focusArea.id}
                      focusArea={focusArea}
                      index={index}
                      headingLevel="h4"
                    />
                  ))}
              </Grid>
            ) : (
              /*
               * content.md §7.5. No "Apply now" button appears here — an apply
               * action that led to a general contact form would misrepresent
               * what happens next.
               */
              <EmptyState
                title={focusAreasCopy.noOpenProgramme.title}
                headingLevel="h4"
                actions={
                  <ButtonLink href={routes.partner} variant="secondary">
                    Explore partnership routes
                  </ButtonLink>
                }
              >
                <p>{focusAreasCopy.noOpenProgramme.body}</p>
              </EmptyState>
            )}
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------------- delivery principles */}
      <Section tone="canvas" aria-labelledby="principles-heading">
        <Container>
          <div className={styles.principlesGrid}>
            <SectionIntro
              eyebrow="Delivery principles"
              heading={focusAreasCopy.principles.h2}
              headingId="principles-heading"
              lead="Before we invite anyone to take part in an initiative, its page will answer all of these."
            />
            <Card surface="cream">
              <ul className={styles.principleList}>
                {focusAreasCopy.principles.items.map((item) => (
                  <li key={item} className={styles.principleItem}>
                    <svg
                      className={styles.principleTick}
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        d="m4 10.4 4 4 8-8.6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </Section>

      {/* ----------------------------------------------------------------- FAQ */}
      <Section tone="surface" aria-labelledby="faq-heading" divided>
        <Container width="wide">
          <SectionIntro heading={focusAreasCopy.faq.h2} headingId="faq-heading" />
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

      <CtaBand
        heading={focusAreasCopy.cta.h2}
        body="If a focus area matches something your institution, organisation or team is working on, we would like to hear about it."
        headingId="focus-cta-heading"
        actions={
          <ButtonLink href={primary.href} size="large" onDark withArrow>
            {primary.label}
          </ButtonLink>
        }
      />
    </>
  );
}
