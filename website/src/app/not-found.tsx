import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PathwayMark } from "@/components/graphics/PathwayMark";
import { ButtonLink } from "@/components/ui/Button";
import { features } from "@/config/features";
import { cta, routes } from "@/config/site";
import { notFoundCopy } from "@/content/copy";
import styles from "./not-found.module.css";

/**
 * Branded 404 (FR-005).
 *
 * Keeps the global header and footer, offers Home, Focus Areas and Contact, and
 * offers Updates only when that page has approved content. No joke about being
 * lost and no childish illustration.
 */
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Section tone="canvas" aria-labelledby="notfound-heading">
      <Container>
        <div className={styles.layout}>
          <div className={styles.content}>
            <p className={styles.eyebrow}>{notFoundCopy.eyebrow}</p>
            <h1 id="notfound-heading" className={styles.title}>
              {notFoundCopy.h1}
            </h1>
            <p className={styles.body}>{notFoundCopy.body}</p>

            <div className={styles.actions}>
              <ButtonLink href={routes.home} size="large" withArrow>
                {notFoundCopy.primaryLabel}
              </ButtonLink>
              <ButtonLink href={cta.focusAreas.href} size="large" variant="secondary">
                {cta.focusAreas.label}
              </ButtonLink>
            </div>

            <nav aria-label="Other pages" className={styles.moreNav}>
              <p className={styles.moreLabel}>Other places to look</p>
              <ul className={styles.moreList}>
                <li>
                  <a href={routes.about}>About the foundation</a>
                </li>
                <li>
                  <a href={routes.partner}>Partner with us</a>
                </li>
                <li>
                  <a href={routes.contact}>Contact</a>
                </li>
                {features.updates ? (
                  <li>
                    <a href={routes.updates}>Updates and resources</a>
                  </li>
                ) : null}
              </ul>
            </nav>
          </div>

          <div className={styles.visual} aria-hidden="true">
            <PathwayMark className={styles.mark} variant="open" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
