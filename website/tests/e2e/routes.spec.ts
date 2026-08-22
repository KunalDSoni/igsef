import { expect, test } from "@playwright/test";

/**
 * Route availability, link integrity and gated-content behaviour.
 */

const PUBLIC_ROUTES = [
  { path: "/", h1: "Practical learning. Stronger pathways." },
  { path: "/about", h1: "Built to connect learning with opportunity." },
  { path: "/focus-areas", h1: "From learning to practical capability." },
  { path: "/partner-with-us", h1: "Build relevant learning with us." },
  { path: "/contact", h1: "Let's start with the right conversation." },
  { path: "/accessibility", h1: "Accessibility statement" },
];

const GATED_ROUTES = [
  { path: "/updates", h1: "Updates and useful resources" },
  { path: "/corporate-disclosures", h1: "Trust begins with clarity." },
  { path: "/privacy", h1: "Privacy Notice" },
  { path: "/terms", h1: "Terms of Use" },
];

test.describe("public routes", () => {
  for (const route of PUBLIC_ROUTES) {
    test(`${route.path} returns 200 with exactly one H1`, async ({ page }) => {
      const response = await page.goto(route.path);
      expect(response?.status()).toBe(200);

      const headings = page.locator("h1");
      await expect(headings).toHaveCount(1);
      await expect(headings).toHaveText(route.h1);
    });
  }

  test("every page has a unique title and meta description", async ({ page }) => {
    const seen = new Map<string, string>();

    for (const route of PUBLIC_ROUTES) {
      await page.goto(route.path);
      const title = await page.title();
      const description = await page.locator('meta[name="description"]').getAttribute("content");

      expect(title.length, `${route.path} has no title`).toBeGreaterThan(10);
      expect(description?.length ?? 0, `${route.path} has no description`).toBeGreaterThan(30);
      expect(seen.has(title), `duplicate title "${title}"`).toBe(false);
      seen.set(title, route.path);
    }
  });

  test("every page declares a canonical URL and Open Graph metadata", async ({ page }) => {
    for (const route of PUBLIC_ROUTES) {
      await page.goto(route.path);
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
      await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
      await expect(page.locator('meta[property="og:description"]')).toHaveCount(1);
      await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
      await expect(page.locator('meta[name="twitter:card"]')).toHaveCount(1);
    }
  });

  test("the page language is set", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "en-IN");
  });

  test("the social card image is generated and served", async ({ page, request }) => {
    await page.goto("/");
    const url = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(url).toBeTruthy();
    const response = await request.get(new URL(url!).pathname);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");
  });

  test("a favicon is served", async ({ request }) => {
    const response = await request.get("/icon.svg");
    expect(response.status()).toBe(200);
  });
});

test.describe("gated routes", () => {
  for (const route of GATED_ROUTES) {
    test(`${route.path} is reachable but excluded from search`, async ({ page }) => {
      const response = await page.goto(route.path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveText(route.h1);

      const robots = await page.locator('meta[name="robots"]').getAttribute("content");
      expect(robots, `${route.path} should be noindex`).toContain("noindex");
    });
  }

  test("Updates is absent from the header and footer navigation", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Updates" }),
    ).toHaveCount(0);
    await expect(page.locator("footer").getByRole("link", { name: /^updates$/i })).toHaveCount(0);
  });

  test("Corporate Disclosures is not linked from anywhere on the public pages", async ({
    page,
  }) => {
    for (const route of PUBLIC_ROUTES) {
      await page.goto(route.path);
      await expect(
        page.locator('a[href="/corporate-disclosures"]'),
        `${route.path} links to the blocked disclosures page`,
      ).toHaveCount(0);
    }
  });

  test("the disclosures page shows no corporate value and says why", async ({ page }) => {
    await page.goto("/corporate-disclosures");
    await expect(page.getByText("This page is not published")).toBeVisible();
    await expect(page.getByText("Verification in progress").first()).toBeVisible();

    const body = (await page.textContent("body")) ?? "";
    for (const blocked of ["U85499", "NPL479632", "ROC Mumbai", "Airoli", "CIDCO"]) {
      expect(body, `rendered page leaked "${blocked}"`).not.toContain(blocked);
    }
  });

  test("the updates page shows the approved empty state, not a blank grid", async ({ page }) => {
    await page.goto("/updates");
    await expect(page.getByText("No updates have been published yet")).toBeVisible();
    await expect(page.getByRole("link", { name: /explore focus areas/i })).toBeVisible();
  });

  test("legal drafts are labelled as drafts", async ({ page }) => {
    for (const path of ["/privacy", "/terms"]) {
      await page.goto(path);
      await expect(page.getByText("Draft — not yet approved")).toBeVisible();
    }
  });
});

test.describe("detail templates", () => {
  test("an unapproved focus-area slug returns the branded 404", async ({ page }) => {
    const response = await page.goto("/focus-areas/future-ready-skills");
    expect(response?.status()).toBe(404);
    await expect(page.locator("h1")).toHaveText("This page isn't here.");
  });

  test("an unknown update slug returns the branded 404", async ({ page }) => {
    const response = await page.goto("/updates/anything");
    expect(response?.status()).toBe(404);
    await expect(page.locator("h1")).toHaveText("This page isn't here.");
  });
});

test.describe("404", () => {
  test("returns a 404 status and useful routes", async ({ page }) => {
    const response = await page.goto("/no-such-page");
    expect(response?.status()).toBe(404);

    await expect(page.locator("h1")).toHaveText("This page isn't here.");
    await expect(page.getByRole("link", { name: "Go to home" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Explore focus areas" })).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "Other pages" }).getByRole("link", { name: "Contact" }),
    ).toBeVisible();
  });

  test("offers no Updates link while Updates is gated", async ({ page }) => {
    await page.goto("/no-such-page");
    await expect(
      page.getByRole("navigation", { name: "Other pages" }).getByRole("link", { name: /updates/i }),
    ).toHaveCount(0);
  });

  test("keeps the global header and footer", async ({ page }) => {
    await page.goto("/no-such-page");
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });
});

test.describe("link integrity", () => {
  const ALL_ROUTES = [...PUBLIC_ROUTES, ...GATED_ROUTES].map((r) => r.path);

  test("no visible link points at a placeholder destination", async ({ page }) => {
    for (const route of ALL_ROUTES) {
      await page.goto(route);
      const hrefs = await page
        .locator("a[href]")
        .evaluateAll((links) => links.map((link) => link.getAttribute("href") ?? ""));

      for (const href of hrefs) {
        expect(href.trim(), `${route} has an empty href`).not.toBe("");
        expect(href, `${route} has a placeholder "#" link`).not.toBe("#");
        expect(href, `${route} has a javascript: link`).not.toMatch(/^javascript:/i);
      }
    }
  });

  test("every internal link resolves to a real page", async ({ page, request }) => {
    const checked = new Set<string>();

    for (const route of ALL_ROUTES) {
      await page.goto(route);
      const hrefs = await page
        .locator("a[href^='/']")
        .evaluateAll((links) => links.map((link) => link.getAttribute("href")!));

      for (const href of hrefs) {
        const path = href.split("#")[0]!;
        if (!path || checked.has(path)) continue;
        checked.add(path);
        const response = await request.get(path);
        expect(
          response.status(),
          `${href} (linked from ${route}) returned ${response.status()}`,
        ).toBe(200);
      }
    }

    expect(checked.size).toBeGreaterThan(5);
  });

  test("in-page anchors resolve to an element that exists", async ({ page }) => {
    for (const route of ALL_ROUTES) {
      await page.goto(route);
      const anchors = await page
        .locator("a[href*='#']")
        .evaluateAll((links) =>
          links
            .map((link) => link.getAttribute("href")!)
            .filter((href) => href.includes("#") && !href.startsWith("http")),
        );

      for (const href of anchors) {
        const [pathPart, hash] = href.split("#");
        if (!hash) continue;
        if (pathPart && pathPart !== route && pathPart !== "") {
          await page.goto(pathPart);
        }
        /* `CSS.escape` is a browser API; match on the attribute instead. */
        await expect(
          page.locator(`[id="${hash}"]`),
          `${route} links to #${hash}, which does not exist on ${pathPart || route}`,
        ).toHaveCount(1);
        if (pathPart && pathPart !== route && pathPart !== "") {
          await page.goto(route);
        }
      }
    }
  });

  test("no link text is a generic 'learn more' or 'click here'", async ({ page }) => {
    for (const route of ALL_ROUTES) {
      await page.goto(route);
      const texts = await page
        .locator("a")
        .evaluateAll((links) => links.map((link) => (link.textContent ?? "").trim().toLowerCase()));
      for (const text of texts) {
        expect(["learn more", "read more", "click here", "here", "more"]).not.toContain(text);
      }
    }
  });
});

test.describe("robots and sitemap", () => {
  test("a staging build disallows all crawling", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain("User-Agent: *");
    expect(body).toContain("Disallow: /");
  });

  test("a staging build produces an empty sitemap rather than advertising pages", async ({
    request,
  }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).not.toContain("<loc>");
  });

  test("every page in a staging build is noindex", async ({ page }) => {
    for (const route of PUBLIC_ROUTES) {
      await page.goto(route.path);
      const robots = await page.locator('meta[name="robots"]').getAttribute("content");
      expect(robots, `${route.path} is indexable in a staging build`).toContain("noindex");
    }
  });
});

test.describe("structured data", () => {
  test("emits no organisation schema carrying unverified legal facts", async ({ page }) => {
    await page.goto("/");
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(blocks.length).toBeGreaterThan(0);

    for (const block of blocks) {
      const data = JSON.parse(block);
      expect(data["@type"]).not.toBe("Organization");
      expect(JSON.stringify(data)).not.toMatch(/taxID|vatID|legalName|address|sameAs/);
    }
  });
});

test.describe("console health", () => {
  test("no page logs an error to the console", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(error.message));

    for (const route of [...PUBLIC_ROUTES, ...GATED_ROUTES]) {
      await page.goto(route.path);
      await page.waitForLoadState("networkidle");
    }

    expect(errors).toEqual([]);
  });

  test("loads no third-party resource", async ({ page }) => {
    const external: string[] = [];
    page.on("request", (request) => {
      const url = new URL(request.url());
      if (!["127.0.0.1", "localhost"].includes(url.hostname)) external.push(request.url());
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.goto("/contact");
    await page.waitForLoadState("networkidle");

    expect(external, "the site must make no third-party request").toEqual([]);
  });
});
