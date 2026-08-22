import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/content/PageHero";
import { UpdateCard } from "@/components/content/UpdateCard";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Grid } from "@/components/ui/Grid";
import { Notice } from "@/components/ui/Notice";
import { features } from "@/config/features";
import { cta, routes } from "@/config/site";
import { homeCopy } from "@/content/copy";
import { publishedUpdates } from "@/content/updates";
import { buildMetadata } from "@/lib/seo";
import styles from "./page.module.css";

/**
 * Updates & Resources listing.
 *
 * Reachable but out of navigation and out of search until at least one approved
 * item exists (project-controls.md §2, §10). Indexing is tied to the presence of
 * a published record *and* the feature gate, so an empty listing can never be
 * indexed and a stale gate cannot expose an empty page to search.
 */

const updates = publishedUpdates();
const hasContent = features.updates && updates.length > 0;

export const metadata: Metadata = buildMetadata({
  title: "Updates & Resources",
  description:
    "Announcements published by the foundation, programme information, learning resources, and reporting.",
  path: routes.updates,
  indexable: hasContent,
});

export default function UpdatesPage() {
  const items = publishedUpdates();
  const showList = features.updates && items.length > 0;
  const featured = items.find((item) => item.featured);
  const rest = featured ? items.filter((item) => item.id !== featured.id) : items;

  return (
    <>
      <PageHero
        eyebrow="Updates"
        title="Updates and useful resources"
        lead="Announcements published by the foundation, programme information, learning resources, and reporting."
        decor="open"
      />

      <Section tone="canvas" aria-labelledby="updates-heading">
        <Container>
          <h2 id="updates-heading" className="visually-hidden">
            Published updates
          </h2>

          {!features.updates ? (
            <div className={styles.gateNotice} data-print-hide>
              <Notice tone="internal" title="This page is not in the site navigation">
                <p>
                  Updates &amp; Resources stays unlinked and excluded from search until the first
                  update has been written, evidenced and approved. The listing, card and detail
                  templates below are complete and ready for that first item.
                </p>
              </Notice>
            </div>
          ) : null}

          {showList ? (
            <>
              {featured ? (
                <div className={styles.featured}>
                  <UpdateCard update={featured} featured />
                </div>
              ) : null}
              <Grid>
                {rest.map((update) => (
                  <UpdateCard key={update.id} update={update} />
                ))}
              </Grid>
            </>
          ) : (
            <EmptyState
              title="No updates have been published yet"
              headingLevel="h3"
              actions={
                <>
                  <ButtonLink href={cta.focusAreas.href} variant="secondary">
                    {cta.focusAreas.label}
                  </ButtonLink>
                  <ButtonLink href={routes.about} variant="secondary">
                    About the foundation
                  </ButtonLink>
                </>
              }
            >
              <p>{homeCopy.updates.emptyBody}</p>
              <p>
                When we publish, each item will show who wrote it, when it was published, when it
                was last updated, and the evidence behind any factual claim.
              </p>
            </EmptyState>
          )}
        </Container>
      </Section>
    </>
  );
}
