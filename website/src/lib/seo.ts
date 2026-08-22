import type { Metadata } from "next";
import { isProduction, site, siteUrl } from "@/config/site";

/**
 * Metadata helpers.
 *
 * Indexing is opt-in, not opt-out. A page is indexable only when the build is
 * marked production *and* the page itself declares that its publication gate is
 * open. Every other combination — staging, a gated route, a draft legal page, a
 * form result — resolves to `noindex, nofollow`.
 */

interface PageMetaInput {
  title: string;
  description: string;
  /** Path with a leading slash. */
  path: string;
  /**
   * Whether this route's own publication gate is open. Defaults to true; pass
   * false for blocked, draft or empty-state routes.
   */
  indexable?: boolean;
}

export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl).toString();
}

/**
 * The social card generated at build time by `src/app/opengraph-image.tsx`.
 *
 * Referenced explicitly rather than relying on the file convention: a page that
 * declares its own `openGraph` object does not inherit the convention's image,
 * which would leave every route except the home page without a card.
 */
const SOCIAL_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
} as const;

export function buildMetadata({
  title,
  description,
  path,
  indexable = true,
}: PageMetaInput): Metadata {
  const canonical = absoluteUrl(path);
  const shouldIndex = isProduction && indexable;
  const socialImage = {
    url: absoluteUrl(SOCIAL_IMAGE.url),
    width: SOCIAL_IMAGE.width,
    height: SOCIAL_IMAGE.height,
    alt: `${site.legalNameWorking} — ${site.brandLine}`,
  };

  return {
    title,
    description,
    alternates: { canonical },
    robots: shouldIndex
      ? { index: true, follow: true }
      : {
          index: false,
          follow: false,
          nocache: true,
          googleBot: { index: false, follow: false },
        },
    openGraph: {
      type: "website",
      siteName: site.legalNameWorking,
      title,
      description,
      url: canonical,
      locale: "en_IN",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage.url],
    },
  };
}

/**
 * Structured data.
 *
 * Deliberately minimal. `Requirement.md` §15.2 permits Organisation schema only
 * with verified facts, and `project-controls.md` forbids emitting candidate
 * legal facts. Until the corporate gate opens, the site emits only a `WebSite`
 * node carrying the working name and canonical URL — no legal name, no
 * registration number, no address, no `sameAs` profiles.
 */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.legalNameWorking,
    url: siteUrl,
    inLanguage: "en-IN",
    description: site.description,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
