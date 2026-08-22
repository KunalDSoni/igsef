import { Container } from "@/components/layout/Container";
import { HeroPathways } from "@/components/graphics/HeroPathways";
import { ButtonLink } from "@/components/ui/Button";
import { primaryAction } from "@/config/cta";
import { cta } from "@/config/site";
import { homeCopy } from "@/content/copy";
import styles from "./HomeHero.module.css";

/**
 * The three focal modules restate the pathway the copy describes: learning to
 * capability to opportunity. They are labelled text, not statistics — there is
 * no number anywhere in this hero, by design.
 */
const focalSteps = [
  { node: "01", title: "Learning", meta: "Relevant, practical, inclusive" },
  { node: "02", title: "Capability", meta: "Skills people can actually use" },
  { node: "03", title: "Opportunity", meta: "Work, study, enterprise" },
];

export function HomeHero() {
  const primary = primaryAction();

  return (
    <div className={`${styles.hero} on-dark`}>
      <HeroPathways />
      <Container>
        <div className={styles.inner}>
          <div className={styles.content}>
            <p className={styles.eyebrow}>{homeCopy.hero.eyebrow}</p>
            <h1 className={styles.title}>{homeCopy.hero.h1}</h1>
            <p className={styles.body}>{homeCopy.hero.body}</p>

            <div className={styles.actions}>
              <ButtonLink href={cta.focusAreas.href} size="large" onDark withArrow>
                {cta.focusAreas.label}
              </ButtonLink>
              <ButtonLink href={primary.href} size="large" variant="secondary" onDark>
                {primary.label}
              </ButtonLink>
            </div>

            <p className={styles.status}>
              <svg
                className={styles.statusIcon}
                viewBox="0 0 20 20"
                aria-hidden="true"
                focusable="false"
              >
                <circle
                  cx="10"
                  cy="10"
                  r="8.6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="M10 5.6v4.8l3 1.8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              {homeCopy.hero.statusNote}
            </p>
          </div>

          <div className={styles.focal} aria-hidden="true">
            {focalSteps.map((step) => (
              <div key={step.node} className={styles.focalCard}>
                <span className={styles.focalNode}>{step.node}</span>
                <span className={styles.focalLabel}>
                  <span className={styles.focalTitle}>{step.title}</span>
                  <span className={styles.focalMeta}>{step.meta}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
