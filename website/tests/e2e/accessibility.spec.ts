import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/**
 * Automated accessibility checks.
 *
 * axe-core catches a useful subset of WCAG failures and nothing more. It is not
 * acceptance evidence on its own (Requirement.md NFR-A09), which is why the
 * manual keyboard, focus, reflow, zoom and reduced-motion checks live in the
 * other specs and the accessibility statement names what has not been tested.
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

const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"];

for (const route of ROUTES) {
  test(`${route} has no automated accessibility violation`, async ({ page }) => {
    await page.goto(route);
    await page.waitForLoadState("networkidle");

    const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();

    const summary = results.violations.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      help: violation.help,
      nodes: violation.nodes.map((node) => node.target.join(" ")),
    }));

    expect(summary, `${route} accessibility violations`).toEqual([]);
  });
}

test("the mobile menu passes an accessibility scan while open", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Menu" }).click();
  await expect(page.getByRole("dialog", { name: "Main menu" })).toBeVisible();

  const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();
  expect(results.violations.map((v) => v.id)).toEqual([]);
});

test("every page exposes a main landmark and a logical heading order", async ({ page }) => {
  for (const route of ROUTES) {
    await page.goto(route);

    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("header")).toHaveCount(1);
    await expect(page.locator("footer")).toHaveCount(1);

    const levels = await page
      .locator("h1, h2, h3, h4, h5, h6")
      .evaluateAll((headings) => headings.map((heading) => Number(heading.tagName.slice(1))));

    expect(levels[0], `${route} does not start at h1`).toBe(1);

    for (let index = 1; index < levels.length; index += 1) {
      const jump = levels[index]! - levels[index - 1]!;
      expect(jump, `${route} skips a heading level at position ${index}`).toBeLessThanOrEqual(1);
    }
  }
});

test("decorative graphics are hidden from assistive technology", async ({ page }) => {
  for (const route of ["/", "/about", "/focus-areas", "/no-such-page"]) {
    await page.goto(route);

    const exposed = await page.locator("svg").evaluateAll((nodes) =>
      nodes
        .filter((node) => {
          const hidden =
            node.getAttribute("aria-hidden") === "true" ||
            node.closest("[aria-hidden='true']") !== null;
          const named =
            node.getAttribute("role") === "img" &&
            (node.getAttribute("aria-label") ?? node.querySelector("title")?.textContent ?? "")
              .length > 0;
          return !hidden && !named;
        })
        .map((node) => node.outerHTML.slice(0, 80)),
    );

    expect(exposed, `${route} exposes an unlabelled decorative SVG`).toEqual([]);
  }
});

test("no image is missing alternative text", async ({ page }) => {
  for (const route of ROUTES) {
    await page.goto(route);
    const missing = await page
      .locator("img")
      .evaluateAll((images) =>
        images
          .filter((image) => !image.hasAttribute("alt"))
          .map((image) => image.getAttribute("src") ?? ""),
      );
    expect(missing, `${route} has an image with no alt attribute`).toEqual([]);
  }
});

test("status is never conveyed by colour alone", async ({ page }) => {
  await page.goto("/focus-areas");

  /*
   * Every status chip carries its status word as visible text alongside a
   * distinct glyph, so the value survives with colour removed.
   */
  const chips = page
    .locator("dl dt")
    .locator("span", { hasText: /Status:/ })
    .last();
  await expect(chips).toBeVisible();

  const statusWords = await page
    .locator("dl dt")
    .evaluateAll((terms) =>
      terms.map((term) => (term.textContent ?? "").replace("Status:", "").trim()),
    );

  expect(statusWords.length).toBeGreaterThan(4);
  for (const word of statusWords) {
    /* The shortest controlled status value, "Open", is four characters. */
    expect(word.length, `a status chip rendered no text: "${word}"`).toBeGreaterThanOrEqual(4);
  }
});
