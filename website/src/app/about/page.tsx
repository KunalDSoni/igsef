import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/content/CtaBand";
import { PageHero } from "@/components/content/PageHero";
import { PathwayMark } from "@/components/graphics/PathwayMark";
import { ProcessSteps } from "@/components/content/ProcessSteps";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Grid";
import { Notice } from "@/components/ui/Notice";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { features } from "@/config/features";
import { primaryAction } from "@/config/cta";
import { cta, routes } from "@/config/site";
import { aboutCopy, homeCopy } from "@/content/copy";
import { teamMembers } from "@/content/team";
import { buildMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Learn about the foundation's proposed mission, values, approach, and commitment to transparent education and skills work.",
  path: routes.about,
});

const publishedTeam = teamMembers.filter((member) => member.active);

export default function AboutPage() {
  const primary = primaryAction();

  return (
    <>
      <PageHero
        eyebrow={aboutCopy.hero.eyebrow}
        title={aboutCopy.hero.h1}
        lead={aboutCopy.hero.lead}
        decor="open"
      />

      {/* ---------------------------------------------------- mission / vision */}
      <Section tone="canvas" aria-labelledby="purpose-heading">
        <Container>
          <h2 id="purpose-heading" className="visually-hidden">
            Our mission and vision
          </h2>
          <div className={styles.splitCards}>
            <Card surface="lavender" className={styles.statement}>
              <p className={styles.statementLabel}>{aboutCopy.mission.label}</p>
              <p className={styles.statementBody}>{aboutCopy.mission.body}</p>
              <PathwayMark className={styles.statementMark} variant="converge" />
            </Card>
            <Card surface="mint" className={styles.statement}>
              <p className={styles.statementLabel}>{aboutCopy.vision.label}</p>
              <p className={styles.statementBody}>{aboutCopy.vision.body}</p>
              <PathwayMark className={styles.statementMark} variant="open" />
            </Card>
          </div>
        </Container>
      </Section>

      {/* ----------------------------------------------------------- why we are */}
      <Section tone="surface" aria-labelledby="why-heading" divided>
        <Container>
          <div className={styles.narrative}>
            <SectionIntro
              eyebrow="Why we are here"
              heading={aboutCopy.why.h2}
              headingId="why-heading"
            />
            <p className={styles.narrativeBody}>{aboutCopy.why.body}</p>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------- values */}
      <Section tone="canvas" aria-labelledby="values-heading">
        <Container>
          <SectionIntro eyebrow="Values" heading={aboutCopy.values.h2} headingId="values-heading" />
          <Grid>
            {aboutCopy.values.items.map((value) => (
              <Card key={value.title} surface="white">
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueBody}>{value.body}</p>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* ------------------------------------------------------------ approach */}
      <Section tone="surface" aria-labelledby="approach-heading" divided>
        <Container>
          <SectionIntro
            eyebrow="Approach"
            heading={aboutCopy.approach.h2}
            headingId="approach-heading"
            lead={aboutCopy.approach.intro}
          />
          <ProcessSteps steps={homeCopy.howWeWork.steps} />
        </Container>
      </Section>

      {/* -------------------------------------------------------- current status */}
      <Section tone="canvas" aria-labelledby="status-heading">
        <Container width="wide">
          <div className={styles.statusGrid}>
            <div>
              <SectionIntro
                eyebrow="Status"
                heading={aboutCopy.status.h2}
                headingId="status-heading"
              />
              <p className={styles.narrativeBody}>{aboutCopy.status.body}</p>
              <div className={styles.statusActions}>
                <ButtonLink href={cta.programmeStatus.href} variant="secondary">
                  {cta.programmeStatus.label}
                </ButtonLink>
              </div>
            </div>

            <Notice tone="info" title={aboutCopy.accountability.h2}>
              <p>{aboutCopy.accountability.quote}</p>
            </Notice>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------- leadership (gated P1) */}
      <Section tone="surface" aria-labelledby="leadership-heading" divided>
        <Container width="wide">
          <SectionIntro
            eyebrow="Governance"
            heading={aboutCopy.leadershipPending.h2}
            headingId="leadership-heading"
          />

          {features.leadership && publishedTeam.length > 0 ? (
            <Grid>
              {publishedTeam.map((member) => (
                <Card key={member.id} surface="white">
                  <h3 className={styles.valueTitle}>{member.title}</h3>
                  <p className={styles.memberRole}>{member.role}</p>
                  {member.bio.map((paragraph, index) => (
                    <p key={index} className={styles.valueBody}>
                      {paragraph}
                    </p>
                  ))}
                </Card>
              ))}
            </Grid>
          ) : (
            /*
             * No profile has been approved for publication. Rather than an empty
             * grid or a placeholder card, the page states the position and what
             * has to happen first.
             */
            <div className={styles.governanceNote}>
              <p className={styles.narrativeBody}>{aboutCopy.leadershipPending.body}</p>
              <p className={styles.narrativeBody}>
                Our registered legal identity, registrar details and governance documents are being
                checked against authoritative incorporation records. We will publish them, with the
                date each was last verified, rather than repeat details from third-party sources.
              </p>
              {features.corporateDisclosures ? (
                <div className={styles.statusActions}>
                  <ButtonLink href={cta.disclosures.href} variant="secondary">
                    {cta.disclosures.label}
                  </ButtonLink>
                </div>
              ) : null}
            </div>
          )}
        </Container>
      </Section>

      <CtaBand
        heading={aboutCopy.cta.h2}
        body="Tell us what you are trying to achieve. A short initial enquiry is enough to start a useful conversation."
        headingId="about-cta-heading"
        actions={
          <>
            <ButtonLink href={primary.href} size="large" onDark withArrow>
              {primary.label}
            </ButtonLink>
            <ButtonLink href={cta.focusAreas.href} variant="tertiary" onDark>
              {cta.focusAreas.label}
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
