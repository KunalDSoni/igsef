import type { MetadataRoute } from "next";
import { features } from "@/config/features";
import { isProduction, routes, siteUrl } from "@/config/site";
import { publishedFocusAreaDetails } from "@/content/focus-areas";
import { publishedUpdates } from "@/content/updates";

/**
 * XML sitemap.
 *
 * Lists only canonical pages that are actually indexable. The conditions here
 * mirror `buildMetadata` exactly, so a page can never be `noindex` in its own
 * metadata yet advertised in the sitemap:
 *
 * - a staging build produces an empty sitemap;
 * - Updates appears only with at least one approved item;
 * - Corporate Disclosures appears only once identity is verified;
 * - the legal drafts appear only once approved;
 * - detail routes appear only for approved records.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!isProduction) return [];

  const url = (path: string) => new URL(path, siteUrl).toString();
  const lastModified = new Date();

  const entries: MetadataRoute.Sitemap = [
    { url: url(routes.home), lastModified, changeFrequency: "monthly", priority: 1 },
    { url: url(routes.about), lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: url(routes.focusAreas), lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: url(routes.partner), lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: url(routes.contact), lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: url(routes.accessibility), lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];

  for (const focusArea of publishedFocusAreaDetails()) {
    entries.push({
      url: url(`${routes.focusAreas}/${focusArea.slug}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  if (features.updates) {
    const updates = publishedUpdates();
    if (updates.length > 0) {
      entries.push({
        url: url(routes.updates),
        lastModified,
        changeFrequency: "weekly",
        priority: 0.6,
      });
      for (const update of updates) {
        entries.push({
          url: url(`${routes.updates}/${update.slug}`),
          lastModified: new Date(update.updatedDate ?? update.publishedDate),
          changeFrequency: "yearly",
          priority: 0.5,
        });
      }
    }
  }

  if (features.corporateDisclosures) {
    entries.push({
      url: url(routes.corporateDisclosures),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  if (features.legalPagesApproved) {
    entries.push(
      { url: url(routes.privacy), lastModified, changeFrequency: "yearly", priority: 0.3 },
      { url: url(routes.terms), lastModified, changeFrequency: "yearly", priority: 0.3 },
    );
  }

  return entries;
}
