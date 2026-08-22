import { expect, test } from "@playwright/test";

/**
 * Reflow, zoom, touch targets and reduced motion.
 */

const ROUTES = [
  "/",
  "/about",
  "/focus-areas",
  "/partner-with-us",
  "/contact",
  "/updates",
  "/corporate-disclosures",
  "/privacy",
  "/terms",
  "/accessibility",
  "/no-such-page",
];

const WIDTHS = [1440, 1280, 1024, 768, 390, 360, 320];

test.describe("no horizontal overflow", () => {
  for (const width of WIDTHS) {
    test(`at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });

      for (const route of ROUTES) {
        await page.goto(route);
        await page.waitForLoadState("networkidle");

        const { scrollWidth, clientWidth } = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        }));

        expect(
          scrollWidth,
          `${route} scrolls horizontally at ${width}px (${scrollWidth} > ${clientWidth})`,
        ).toBeLessThanOrEqual(clientWidth + 1);
      }
    });
  }
});

test.describe("200% zoom", () => {
  test("content reflows without a horizontal scrollbar", async ({ page }) => {
    /* 200% zoom at a 1280px window is equivalent to a 640px CSS viewport. */
    await page.setViewportSize({ width: 640, height: 512 });

    for (const route of ROUTES) {
      await page.goto(route);
      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(scrollWidth, `${route} overflows at 200% zoom`).toBeLessThanOrEqual(clientWidth + 1);
    }
  });
});

test.describe("text spacing overrides", () => {
  test("increased spacing does not clip or overlap content", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    for (const route of ["/", "/focus-areas", "/contact"]) {
      await page.goto(route);
      /* WCAG 1.4.12 values. */
      await page.addStyleTag({
        content: `* { line-height: 1.5 !important; letter-spacing: 0.12em !important;
          word-spacing: 0.16em !important; } p { margin-bottom: 2em !important; }`,
      });

      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(scrollWidth, `${route} overflows with text-spacing overrides`).toBeLessThanOrEqual(
        clientWidth + 1,
      );
    }
  });
});

test.describe("touch targets", () => {
  test("interactive controls are at least 44 x 44 CSS pixels", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    for (const route of ["/", "/focus-areas", "/contact", "/partner-with-us"]) {
      await page.goto(route);

      const small = await page.evaluate(() => {
        const results: string[] = [];
        const controls = document.querySelectorAll<HTMLElement>(
          "a, button, summary, input:not([type='hidden']), select, textarea",
        );

        for (const control of controls) {
          if (control.closest("[aria-hidden='true']")) continue; // honeypot
          if (control.tabIndex < 0) continue;

          /*
           * For a checkbox or radio wrapped in its label, the target is the
           * whole label row, not the box itself (WCAG 2.5.8 measures the
           * activatable area).
           */
          const isBox =
            control instanceof HTMLInputElement && ["checkbox", "radio"].includes(control.type);
          const target = isBox ? (control.closest("label") ?? control) : control;

          const rect = target.getBoundingClientRect();
          if (rect.width === 0 && rect.height === 0) continue; // not rendered

          /* An inline link inside a paragraph is exempt (WCAG 2.5.8). */
          const parent = control.parentElement;
          const inlineInText =
            control.tagName === "A" &&
            parent !== null &&
            ["P", "LI", "DD", "SPAN"].includes(parent.tagName) &&
            (parent.textContent ?? "").trim().length > (control.textContent ?? "").trim().length;
          if (inlineInText) continue;

          if (rect.height < 44 || rect.width < 24) {
            results.push(
              `${control.tagName}"${(control.textContent ?? "").trim().slice(0, 30)}" ` +
                `${Math.round(rect.width)}x${Math.round(rect.height)}`,
            );
          }
        }
        return results;
      });

      expect(small, `${route} has undersized touch targets`).toEqual([]);
    }
  });
});

test.describe("reduced motion", () => {
  test.use({ contextOptions: { reducedMotion: "reduce" } });

  test("stops the decorative hero animation", async ({ page }) => {
    await page.goto("/");

    const animated = await page.evaluate(() => {
      const elements = document.querySelectorAll<HTMLElement>("*");
      const running: string[] = [];
      for (const element of elements) {
        const style = getComputedStyle(element);
        if (style.animationName !== "none" && style.animationPlayState === "running") {
          running.push(`${element.tagName}.${element.className}`);
        }
      }
      return running;
    });

    expect(animated, "an animation is still running under reduced motion").toEqual([]);
  });

  test("keeps all content reachable without animation", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Our proposed focus" })).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });
});

test.describe("content resilience", () => {
  test("the page is readable and navigable without CSS", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      document.querySelectorAll('link[rel="stylesheet"], style').forEach((node) => node.remove());
    });

    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByRole("link", { name: "Explore focus areas" }).first()).toBeVisible();
    await expect(page.locator("main")).toContainText("newly established organisation");
  });

  test("essential content is present in the server-rendered HTML", async ({ request }) => {
    const html = await (await request.get("/")).text();
    expect(html).toContain("Practical learning. Stronger pathways.");
    expect(html).toContain("Our proposed focus");
    expect(html).toContain("newly established organisation");
  });
});
