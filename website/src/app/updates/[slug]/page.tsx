import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/content/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Notice } from "@/components/ui/Notice";
import { Prose } from "@/components/ui/Prose";
import { features } from "@/config/features";
import { cta, routes } from "@/config/site";
import { systemCopy } from "@/content/copy";
import { findPublishedOrExpiredUpdate, publishedUpdates, expiredUpdates } from "@/content/updates";
import { isExpired } from "@/content/types";
import { formatDate } from "@/lib/format";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import styles from "./page.module.css";

/**
 * Update / resource detail template.
 *
 * Routes exist for approved records only — including expired ones, which stay
 * reachable for reference and render the "Closed" state from `content.md` §15.
 * A draft or withdrawn record produces no route at all.
 */

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [...publishedUpdates(), ...expiredUpdates()].map((update) => ({ slug: update.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const update = findPublishedOrExpiredUpdate(slug);

  if (!update) {
    return buildMetadata({
      title: "Update",
      description: "Update.",
      path: `${routes.updates}/${slug}`,
      indexable: false,
    });
  }

  return buildMetadata({
    title: update.seo.title,
    description: update.seo.description,
    path: `${routes.updates}/${update.slug}`,
    /* An expired item stays readable but leaves the index. */
    indexable: features.updates && !isExpired(update.expiryDate),
  });
}

export default async function UpdateDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const update = findPublishedOrExpiredUpdate(slug);

  if (!update) notFound();

  const expired = isExpired(update.expiryDate);
  const related = publishedUpdates()
    .filter((item) => item.id !== update.id)
    .slice(0, 2);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: routes.home },
              { name: "Updates", path: routes.updates },
              { name: update.title, path: `${routes.updates}/${update.slug}` },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow={update.type}
        title={update.title}
        lead={update.summary}
        above={
          <Breadcrumbs
            items={[
              { label: "Home", href: routes.home },
              { label: "Updates", href: routes.updates },
              { label: update.title },
            ]}
          />
        }
        decor="open"
      >
        <p className={styles.meta}>
          <span>By {update.author}</span>
          <span aria-hidden="true">·</span>
          <span>
            Published{" "}
            <time dateTime={update.publishedDate}>{formatDate(update.publishedDate)}</time>
          </span>
          {update.updatedDate ? (
            <>
              <span aria-hidden="true">·</span>
              <span>
                Updated <time dateTime={update.updatedDate}>{formatDate(update.updatedDate)}</time>
              </span>
            </>
          ) : null}
        </p>
      </PageHero>

      <Section tone="canvas" aria-labelledby="body-heading">
        <Container width="narrow">
          <h2 id="body-heading" className="visually-hidden">
            {update.title}
          </h2>

          {expired ? (
            <div className={styles.expiredNotice}>
              <Notice tone="warning" title={systemCopy.expired.status}>
                <p>{systemCopy.expired.body}</p>
                {update.expiryDate ? (
                  <p>
                    Closed on{" "}
                    <time dateTime={update.expiryDate}>{formatDate(update.expiryDate)}</time>.
                  </p>
                ) : null}
              </Notice>
            </div>
          ) : null}

          <Prose>
            {update.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </Prose>

          {update.download ? (
            <div className={styles.download}>
              <h2 className={styles.downloadHeading}>Download</h2>
              <ButtonLink href={update.download.href} variant="secondary" external>
                Download {update.download.label} ({update.download.fileType},{" "}
                {update.download.fileSize})
              </ButtonLink>
            </div>
          ) : null}

          <p className={styles.reviewNote}>
            This page was last reviewed on{" "}
            <time dateTime={update.reviewDate}>{formatDate(update.reviewDate)}</time>.
          </p>
        </Container>
      </Section>

      {related.length > 0 ? (
        <Section tone="surface" aria-labelledby="related-heading" divided>
          <Container width="narrow">
            <h2 id="related-heading" className={styles.relatedHeading}>
              Related updates
            </h2>
            <ul className={styles.relatedList}>
              {related.map((item) => (
                <li key={item.id}>
                  <ButtonLink href={`${routes.updates}/${item.slug}`} variant="tertiary" withArrow>
                    {item.title}
                  </ButtonLink>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <Section tone="canvas" aria-labelledby="next-heading" divided={related.length === 0}>
        <Container width="narrow">
          <h2 id="next-heading" className={styles.relatedHeading}>
            Where to next
          </h2>
          <div className={styles.nextActions}>
            <ButtonLink href={routes.updates} variant="secondary">
              All updates
            </ButtonLink>
            <ButtonLink href={cta.focusAreas.href} variant="secondary">
              {cta.focusAreas.label}
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
