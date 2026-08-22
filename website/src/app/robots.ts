import type { MetadataRoute } from "next";
import { features } from "@/config/features";
import { isProduction, routes, siteUrl } from "@/config/site";

/**
 * robots.txt.
 *
 * A staging build disallows everything. A production build allows crawling but
 * still disallows the API route and any route whose publication gate is closed —
 * belt and braces alongside the per-page `noindex`, so a gated page is neither
 * crawled nor indexed.
 */
export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  const disallow = ["/api/"];

  if (!features.corporateDisclosures) disallow.push(routes.corporateDisclosures);
  if (!features.updates) disallow.push(routes.updates);
  if (!features.legalPagesApproved) disallow.push(routes.privacy, routes.terms);

  return {
    rules: [{ userAgent: "*", allow: "/", disallow }],
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
    host: new URL(siteUrl).host,
  };
}
