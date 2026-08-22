import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/content/CtaBand";
import { PageHero } from "@/components/content/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { DefinitionList, DefinitionRow } from "@/components/ui/DefinitionList";
import { Notice } from "@/components/ui/Notice";
import { Prose } from "@/components/ui/Prose";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { StatusChip } from "@/components/ui/StatusChip";
import { primaryAction } from "@/config/cta";
import { routes } from "@/config/site";
import { findFocusAreaBySlug, publishedFocusAreaDetails } from "@/content/focus-areas";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import styles from "./page.module.css";

/**
 * Focus area / programme detail template.
 *
 * Only records that carry an approved brief (`hasApprovedDetail` and
 * `editorialState: "Approved"`) produce a route. Everything else 404s, so a
 * draft cannot be reached by guessing a slug, and the sitemap and the routes
 * that exist stay in agreement.
 *
 * No record currently qualifies, so this template generates zero pages today.
 * It is complete and ready for the first approved programme brief.
 */

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return publishedFocusAreaDetails().map((focusArea) => ({ slug: focusArea.slug }));
}

/** Refuse any slug that is not an approved, published detail record. */
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const focusArea = findFocusAreaBySlug(slug);

  if (!focusArea || !focusArea.hasApprovedDetail) {
    return buildMetadata({
      title: "Focus area",
      description: "Focus area detail.",
      path: `${routes.focusAreas}/${slug}`,
      indexable: false,
    });
  }

  return buildMetadata({
    title: focusArea.seo.title,
    description: focusArea.seo.description,
    path: `${routes.focusAreas}/${focusArea.slug}`,
    indexable: focusArea.editorialState === "Approved",
  });
}

export default async function FocusAreaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const focusArea = findFocusAreaBySlug(slug);

  if (!focusArea || !focusArea.hasApprovedDetail || focusArea.editorialState !== "Approved") {
    notFound();
  }

  const crumbs = [
    { label: "Home", href: routes.home },
    { label: "Focus Areas", href: routes.focusAreas },
    { label: focusArea.title },
  ];

  const lastReviewed = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(focusArea.reviewDate));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: routes.home },
              { name: "Focus Areas", path: routes.focusAreas },
              { name: focusArea.title, path: `${routes.focusAreas}/${focusArea.slug}` },
            ]),
          ),
        }}
      />

      <PageHero
        title={focusArea.title}
        lead={focusArea.summary}
        above={<Breadcrumbs items={crumbs} />}
        decor="step"
      >
        <div className={styles.metaRow}>
          <StatusChip status={focusArea.status} />
          <span className={styles.metaItem}>For: {focusArea.audiences.join(", ")}</span>
          <span className={styles.metaItem}>Delivery: {focusArea.deliveryMode}</span>
        </div>
      </PageHero>

      <Section tone="canvas" aria-labelledby="overview-heading">
        <Container width="wide">
          <div className={styles.layout}>
            <div>
              <SectionIntro heading="Overview" headingId="overview-heading" />
              <Prose>
                {focusArea.body.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </Prose>
            </div>

            <aside className={styles.facts} aria-labelledby="facts-heading">
              <h2 id="facts-heading" className={styles.factsHeading}>
                Key facts
              </h2>
              <DefinitionList>
                <DefinitionRow term="Status">{focusArea.status}</DefinitionRow>
                <DefinitionRow term="Audience">{focusArea.audiences.join(", ")}</DefinitionRow>
                <DefinitionRow term="Geography">{focusArea.geography}</DefinitionRow>
                <DefinitionRow term="Delivery mode">{focusArea.deliveryMode}</DefinitionRow>
                {focusArea.eligibility ? (
                  <DefinitionRow term="Who can take part">{focusArea.eligibility}</DefinitionRow>
                ) : null}
                {focusArea.costStatement ? (
                  <DefinitionRow term="Cost">{focusArea.costStatement}</DefinitionRow>
                ) : null}
                <DefinitionRow term="Owner">{focusArea.owner}</DefinitionRow>
                <DefinitionRow term="Last reviewed">{lastReviewed}</DefinitionRow>
              </DefinitionList>
            </aside>
          </div>

          <div className={styles.disclaimer}>
            <Notice tone="neutral" title="What participation means">
              <p>
                Participation or completion does not guarantee employment, admission, promotion, or
                any third-party certification unless this page states an approved arrangement
                explicitly.
              </p>
            </Notice>
          </div>
        </Container>
      </Section>

      <CtaBand
        heading="Questions about this focus area?"
        body="Send an enquiry and choose “Programme information” so it reaches the right owner."
        headingId="detail-cta-heading"
        actions={
          <ButtonLink href={primaryAction().href} size="large" onDark withArrow>
            {primaryAction().label}
          </ButtonLink>
        }
      />
    </>
  );
}
