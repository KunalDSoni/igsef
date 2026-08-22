import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/content/CtaBand";
import { FocusAreaCard } from "@/components/content/FocusAreaCard";
import { HomeHero } from "@/components/content/HomeHero";
import { MissionStrip } from "@/components/content/MissionStrip";
import { PathwayCard } from "@/components/content/PathwayCard";
import { PathwayMark } from "@/components/graphics/PathwayMark";
import { ProcessSteps } from "@/components/content/ProcessSteps";
import { TrustPanel } from "@/components/content/TrustPanel";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Grid } from "@/components/ui/Grid";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { features } from "@/config/features";
import { primaryAction } from "@/config/cta";
import { cta, routes } from "@/config/site";
import { focusAreas } from "@/content/focus-areas";
import { homeCopy } from "@/content/copy";
import { publishedUpdates } from "@/content/updates";
import { buildMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata: Metadata = buildMetadata({
  title: "Indo-Global Skills & Edu Foundation | Education & Skills",
  description:
    "Building practical, inclusive pathways across education, future-ready skills, institutions, industry, and communities in India.",
  path: "/",
});

/** The three ideas the narrative section restates visually. */
const whyPoints = [
  {
    title: "Knowledge needs application",
    body: "Learning matters most when someone can use it in study, work, enterprise, or daily life.",
  },
  {
    title: "Institutions need signal",
    body: "Educators and providers need clearer ways to hear what learners and workplaces actually need.",
  },
  {
    title: "Opportunity needs a route",
    body: "A capable person still needs a visible, navigable path to the opportunity in front of them.",
  },
];

export default function HomePage() {
  const primary = primaryAction();
  const updates = publishedUpdates();
  const showUpdates = features.updates && updates.length > 0;

  return (
    <>
      <HomeHero />

      <MissionStrip items={homeCopy.missionStrip} label="What guides our work" />

      {/* ------------------------------------------------------ why we exist */}
      <Section tone="canvas" aria-labelledby="why-heading">
        <Container>
          <div className={styles.whyGrid}>
            <div>
              <SectionIntro
                eyebrow={homeCopy.why.eyebrow}
                heading={homeCopy.why.h2}
                headingId="why-heading"
              />
              <p className={styles.whyBody}>{homeCopy.why.body}</p>
            </div>

            <div className={styles.whyVisual}>
              <PathwayMark className={styles.whyMark} variant="converge" />
              <ul className={styles.whyList}>
                {whyPoints.map((point) => (
                  <li key={point.title} className={styles.whyItem}>
                    <span className={styles.whyDot} aria-hidden="true" />
                    <span>
                      <strong className={styles.whyItemTitle}>{point.title}</strong>
                      <span className={styles.whyItemBody}>{point.body}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------- focus areas */}
      <Section tone="surface" aria-labelledby="focus-heading" divided>
        <Container>
          <SectionIntro
            heading={homeCopy.focus.h2}
            headingId="focus-heading"
            lead={homeCopy.focus.intro}
            actions={
              <ButtonLink href={cta.focusAreas.href} variant="secondary">
                {cta.focusAreas.label}
              </ButtonLink>
            }
          />
          <Grid min="pillars">
            {focusAreas.map((focusArea, index) => (
              <FocusAreaCard key={focusArea.id} focusArea={focusArea} index={index} />
            ))}
          </Grid>
        </Container>
      </Section>

      {/* -------------------------------------------------------- how we work */}
      <Section tone="canvas" aria-labelledby="how-heading">
        <Container>
          <SectionIntro heading={homeCopy.howWeWork.h2} headingId="how-heading" />
          <ProcessSteps steps={homeCopy.howWeWork.steps} />
        </Container>
      </Section>

      {/* ---------------------------------------------------- audience routes */}
      <Section tone="surface" aria-labelledby="pathways-heading" divided>
        <Container>
          <SectionIntro heading={homeCopy.pathways.h2} headingId="pathways-heading" />
          <Grid min="sm">
            <PathwayCard
              audience={homeCopy.pathways.items[0].audience}
              body={homeCopy.pathways.items[0].body}
              surface="mint"
              icon="learner"
              action={
                <ButtonLink href={cta.programmeStatus.href} variant="tertiary" withArrow>
                  {cta.programmeStatus.label}
                </ButtonLink>
              }
            />
            <PathwayCard
              audience={homeCopy.pathways.items[1].audience}
              body={homeCopy.pathways.items[1].body}
              surface="lavender"
              icon="institution"
              action={
                <ButtonLink href={routes.partner} variant="tertiary" withArrow>
                  Explore institutional collaboration
                </ButtonLink>
              }
            />
            <PathwayCard
              audience={homeCopy.pathways.items[2].audience}
              body={homeCopy.pathways.items[2].body}
              surface="yellow"
              icon="employer"
              action={
                <ButtonLink href={routes.partner} variant="tertiary" withArrow>
                  Explore industry collaboration
                </ButtonLink>
              }
            />
            <PathwayCard
              audience={homeCopy.pathways.items[3].audience}
              body={homeCopy.pathways.items[3].body}
              surface="cream"
              icon="funder"
              action={
                <ButtonLink href={routes.partner} variant="tertiary" withArrow>
                  Explore funding collaboration
                </ButtonLink>
              }
            />
          </Grid>
        </Container>
      </Section>

      {/*
        Updates module. Hidden entirely until an approved item exists — the Home
        page must not carry an empty content well (project-controls.md §3).
      */}
      {showUpdates ? (
        <Section tone="canvas" aria-labelledby="updates-heading">
          <Container>
            <SectionIntro
              heading={homeCopy.updates.h2}
              headingId="updates-heading"
              actions={
                <ButtonLink href={routes.updates} variant="secondary">
                  View all updates
                </ButtonLink>
              }
            />
            <Grid>
              {updates.slice(0, 3).map((update) => (
                <EmptyState key={update.id} title={update.title}>
                  <p>{update.summary}</p>
                </EmptyState>
              ))}
            </Grid>
          </Container>
        </Section>
      ) : null}

      {/* --------------------------------------------------------- commitments */}
      <Section tone="canvas" aria-labelledby="trust-heading" divided={!showUpdates}>
        <Container>
          <TrustPanel
            intro={
              <>
                <SectionIntro
                  eyebrow="Accountability"
                  heading={homeCopy.transparency.h2}
                  headingId="trust-heading"
                />
                <p className={styles.trustIntroBody}>{homeCopy.transparency.support}</p>
                <div className={styles.trustActions}>
                  {/*
                    "View corporate disclosures" ships only once verified
                    identity content exists. Until then the honest alternative is
                    the About page, which states the verification position.
                  */}
                  {features.corporateDisclosures ? (
                    <ButtonLink href={cta.disclosures.href} variant="secondary">
                      {cta.disclosures.label}
                    </ButtonLink>
                  ) : (
                    <ButtonLink href={routes.about} variant="secondary">
                      Read how we work and what we publish
                    </ButtonLink>
                  )}
                </div>
              </>
            }
            commitments={homeCopy.transparency.commitments}
          />
        </Container>
      </Section>

      <CtaBand
        heading={homeCopy.finalCta.h2}
        body={homeCopy.finalCta.body}
        headingId="home-cta-heading"
        actions={
          <>
            <ButtonLink href={primary.href} size="large" onDark withArrow>
              {primary.label}
            </ButtonLink>
            <ButtonLink href={routes.about} variant="tertiary" onDark>
              {homeCopy.finalCta.secondaryLabel}
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
