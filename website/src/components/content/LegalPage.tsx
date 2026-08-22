import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/content/PageHero";
import { Notice } from "@/components/ui/Notice";
import { Prose } from "@/components/ui/Prose";
import { formatDate } from "@/lib/format";
import styles from "./LegalPage.module.css";

export interface LegalSection {
  id: string;
  heading: string;
  body: ReactNode;
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  lead: string;
  /** ISO date this version took effect, or `null` while unapproved. */
  effectiveDate: string | null;
  /** Draft pages carry a visible notice and are excluded from search. */
  draft: boolean;
  draftNotice?: ReactNode;
  sections: LegalSection[];
}

/**
 * Shared legal-page layout: a 280/720 desktop split with in-page contents on
 * the left and the readable column on the right (design.md §8.9). On small
 * screens the contents becomes an ordinary list above the body.
 *
 * The whole notice is always rendered as flowing text. No section is hidden
 * behind an accordion and nothing is set in small type.
 */
export function LegalPage({
  eyebrow,
  title,
  lead,
  effectiveDate,
  draft,
  draftNotice,
  sections,
}: LegalPageProps) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} lead={lead} decor="converge">
        <p className={styles.effective}>
          {effectiveDate ? (
            <>
              Effective from <time dateTime={effectiveDate}>{formatDate(effectiveDate)}</time>
            </>
          ) : (
            "No version of this document has taken effect yet."
          )}
        </p>
      </PageHero>

      <Section tone="canvas" aria-labelledby="contents-heading">
        <Container width="wide">
          <div className={styles.layout}>
            <nav className={styles.contents} aria-labelledby="contents-heading">
              <h2 id="contents-heading" className={styles.contentsHeading}>
                On this page
              </h2>
              <ol className={styles.contentsList}>
                {sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className={styles.contentsLink}>
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className={styles.bodyColumn}>
              {draft ? (
                <div className={styles.draftNotice}>
                  <Notice tone="warning" title="Draft — not yet approved">
                    {draftNotice ?? (
                      <p>
                        This document has not been reviewed or approved. It describes how the
                        website behaves today and what the final notice will cover. It is excluded
                        from search engines and should not be relied on as a legal statement.
                      </p>
                    )}
                  </Notice>
                </div>
              ) : null}

              <Prose>
                {sections.map((section) => (
                  <section key={section.id} aria-labelledby={section.id}>
                    <h2 id={section.id}>{section.heading}</h2>
                    {section.body}
                  </section>
                ))}
              </Prose>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
