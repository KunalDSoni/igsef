import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Indexing behaviour across both deployment stages.
 *
 * `isProduction` and `siteUrl` are read when the module first loads, so each
 * case resets the module registry and re-imports with the environment it needs.
 * A staging build cannot exercise production metadata, and this is the part of
 * the SEO configuration most likely to regress unnoticed.
 */

const ORIGINAL_ENV = { ...process.env };

async function loadWith(env: Record<string, string | undefined>) {
  vi.resetModules();
  for (const [key, value] of Object.entries(env)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  const [seo, sitemapModule, robotsModule, features] = await Promise.all([
    import("@/lib/seo"),
    import("@/app/sitemap"),
    import("@/app/robots"),
    import("@/config/features"),
  ]);
  return {
    buildMetadata: seo.buildMetadata,
    websiteJsonLd: seo.websiteJsonLd,
    sitemap: sitemapModule.default,
    robots: robotsModule.default,
    features: features.features,
  };
}

beforeEach(() => {
  process.env = { ...ORIGINAL_ENV };
});

afterEach(() => {
  process.env = { ...ORIGINAL_ENV };
  vi.resetModules();
});

describe("staging build", () => {
  it("marks every page noindex regardless of its own gate", async () => {
    const { buildMetadata } = await loadWith({
      NEXT_PUBLIC_SITE_STAGE: "staging",
      NEXT_PUBLIC_SITE_URL: undefined,
    });

    for (const indexable of [true, false]) {
      const meta = buildMetadata({ title: "T", description: "D", path: "/", indexable });
      expect(meta.robots).toMatchObject({ index: false, follow: false });
    }
  });

  it("disallows all crawling", async () => {
    const { robots } = await loadWith({ NEXT_PUBLIC_SITE_STAGE: "staging" });
    const rules = robots().rules;
    expect(rules).toMatchObject([{ userAgent: "*", disallow: "/" }]);
  });

  it("produces an empty sitemap", async () => {
    const { sitemap } = await loadWith({ NEXT_PUBLIC_SITE_STAGE: "staging" });
    expect(sitemap()).toEqual([]);
  });

  it("treats an unrecognised stage value as staging", async () => {
    const { robots } = await loadWith({ NEXT_PUBLIC_SITE_STAGE: "prod" });
    expect(robots().rules).toMatchObject([{ userAgent: "*", disallow: "/" }]);
  });

  it("falls back to localhost when no canonical origin is configured", async () => {
    const { buildMetadata } = await loadWith({
      NEXT_PUBLIC_SITE_STAGE: "staging",
      NEXT_PUBLIC_SITE_URL: undefined,
    });
    const meta = buildMetadata({ title: "T", description: "D", path: "/about" });
    expect(meta.alternates?.canonical).toBe("http://localhost:3000/about");
  });
});

describe("production build", () => {
  const PROD_ENV = {
    NEXT_PUBLIC_SITE_STAGE: "production",
    NEXT_PUBLIC_SITE_URL: "https://example.invalid",
  };

  it("indexes a page whose gate is open", async () => {
    const { buildMetadata } = await loadWith(PROD_ENV);
    const meta = buildMetadata({ title: "T", description: "D", path: "/about" });
    expect(meta.robots).toMatchObject({ index: true, follow: true });
  });

  it("still refuses to index a page whose gate is closed", async () => {
    const { buildMetadata } = await loadWith(PROD_ENV);
    const meta = buildMetadata({
      title: "T",
      description: "D",
      path: "/corporate-disclosures",
      indexable: false,
    });
    expect(meta.robots).toMatchObject({ index: false, follow: false });
  });

  it("lists only open routes in the sitemap", async () => {
    const { sitemap } = await loadWith(PROD_ENV);
    const paths = sitemap().map((entry) => new URL(entry.url).pathname);

    expect(paths).toEqual([
      "/",
      "/about",
      "/focus-areas",
      "/partner-with-us",
      "/contact",
      "/accessibility",
    ]);
  });

  it("keeps every gated route out of the sitemap", async () => {
    const { sitemap } = await loadWith(PROD_ENV);
    const paths = sitemap().map((entry) => new URL(entry.url).pathname);

    for (const gated of ["/updates", "/corporate-disclosures", "/privacy", "/terms"]) {
      expect(paths, `${gated} must not be advertised`).not.toContain(gated);
    }
  });

  it("disallows the API route and every gated route in robots.txt", async () => {
    const { robots } = await loadWith(PROD_ENV);
    const rule = robots().rules;
    const disallow = Array.isArray(rule) ? rule[0]!.disallow : rule.disallow;

    expect(disallow).toEqual(["/api/", "/corporate-disclosures", "/updates", "/privacy", "/terms"]);
  });

  it("points robots.txt at the sitemap on the canonical host", async () => {
    const { robots } = await loadWith(PROD_ENV);
    expect(robots().sitemap).toBe("https://example.invalid/sitemap.xml");
    expect(robots().host).toBe("example.invalid");
  });

  it("builds canonical and Open Graph URLs on the canonical origin", async () => {
    const { buildMetadata } = await loadWith(PROD_ENV);
    const meta = buildMetadata({ title: "T", description: "D", path: "/contact" });

    expect(meta.alternates?.canonical).toBe("https://example.invalid/contact");
    expect(meta.openGraph?.url).toBe("https://example.invalid/contact");
  });

  it("gives every page a social card image", async () => {
    const { buildMetadata } = await loadWith(PROD_ENV);
    for (const path of ["/", "/about", "/focus-areas", "/partner-with-us", "/contact"]) {
      const meta = buildMetadata({ title: "T", description: "D", path });
      const images = meta.openGraph?.images;
      expect(images, `${path} has no og:image`).toBeTruthy();
      expect(JSON.stringify(images)).toContain("https://example.invalid/opengraph-image");
    }
  });
});

describe("structured data", () => {
  it("carries no legal identity, address or owned-profile claim", async () => {
    const { websiteJsonLd } = await loadWith({ NEXT_PUBLIC_SITE_STAGE: "production" });
    const data = websiteJsonLd();

    expect(data["@type"]).toBe("WebSite");
    const serialised = JSON.stringify(data);
    for (const forbidden of ["legalName", "taxID", "vatID", "address", "sameAs", "founder"]) {
      expect(serialised, `structured data contains ${forbidden}`).not.toContain(forbidden);
    }
  });
});
