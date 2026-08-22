import { expect, test } from "@playwright/test";

/**
 * Navigation, keyboard operation and focus management.
 */

test.describe("skip link", () => {
  test("is the first thing in the tab order and moves focus to main", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");

    const skip = page.getByRole("link", { name: "Skip to main content" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();

    await page.keyboard.press("Enter");
    await expect(page.locator("#main")).toBeFocused();
  });
});

test.describe("header navigation", () => {
  /* The inline navigation exists above the desktop breakpoint only; below it,
     the same links live in the menu panel, covered by the next block. */
  test.use({ viewport: { width: 1280, height: 900 } });

  test("marks the current page for assistive technology, not by colour alone", async ({ page }) => {
    await page.goto("/about");
    const current = page
      .getByRole("navigation", { name: "Main" })
      .getByRole("link", { name: "About" });
    await expect(current).toHaveAttribute("aria-current", "page");
  });

  test("the wordmark links home and has an accessible name", async ({ page }) => {
    await page.goto("/about");
    const wordmark = page.locator("header a[aria-label*='home']").first();
    await expect(wordmark).toHaveAttribute("href", "/");
    await wordmark.click();
    await expect(page).toHaveURL(/\/$/);
  });

  test("every navigation destination loads", async ({ page }) => {
    await page.goto("/");
    const links = page.getByRole("navigation", { name: "Main" }).getByRole("link");
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(4);

    for (let index = 0; index < count; index += 1) {
      const href = await links.nth(index).getAttribute("href");
      const response = await page.goto(href!);
      expect(response?.status(), `${href} did not load`).toBe(200);
      await page.goto("/");
    }
  });
});

test.describe("mobile menu", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("has an accessible name and reports its expanded state", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Menu" });

    await expect(trigger).toBeVisible();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");

    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByRole("dialog", { name: "Main menu" })).toBeVisible();
  });

  test("closes with Escape and restores focus to the trigger", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Menu" });

    await trigger.click();
    await expect(page.getByRole("dialog", { name: "Main menu" })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog", { name: "Main menu" })).toBeHidden();
    await expect(trigger).toBeFocused();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("closes with the close button and restores focus", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Menu" });

    await trigger.click();
    await page.getByRole("button", { name: "Close" }).click();

    await expect(page.getByRole("dialog", { name: "Main menu" })).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("keeps focus inside the panel while it is open", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Menu" }).click();

    const dialog = page.getByRole("dialog", { name: "Main menu" });

    /*
     * Tab well past the number of controls. A native modal dialog cycles focus
     * through `document.body` on the wrap step, which is expected; what must
     * never happen is focus landing on a control behind the dialog.
     */
    const visited: string[] = [];
    for (let step = 0; step < 20; step += 1) {
      await page.keyboard.press("Tab");
      const where = await dialog.evaluate((element) => {
        const active = document.activeElement;
        if (!active || active === document.body) return "body";
        if (element.contains(active) || active === element) return "dialog";
        return `escaped:${active.tagName}:${(active.textContent ?? "").trim().slice(0, 30)}`;
      });
      visited.push(where);
    }

    expect(
      visited.filter((where) => where.startsWith("escaped")),
      "focus reached a control behind the open menu",
    ).toEqual([]);
    expect(visited.filter((where) => where === "dialog").length).toBeGreaterThan(10);
  });

  test("makes the page behind it inert", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Menu" }).click();

    /* A modal dialog puts the rest of the document in the inert subtree, so a
       background control cannot be reached or activated. */
    const reachable = await page.evaluate(() => {
      const hero = document.querySelector("main a");
      if (!(hero instanceof HTMLElement)) return false;
      hero.focus();
      return document.activeElement === hero;
    });
    expect(reachable).toBe(false);
  });

  test("navigates and closes when a menu link is used", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Menu" }).click();
    await page
      .getByRole("dialog", { name: "Main menu" })
      .getByRole("link", { name: "About" })
      .click();

    await expect(page).toHaveURL(/\/about$/);
    await expect(page.getByRole("dialog", { name: "Main menu" })).toBeHidden();
  });

  test("marks the current page in the panel with text as well as styling", async ({ page }) => {
    await page.goto("/about");
    await page.getByRole("button", { name: "Menu" }).click();

    const dialog = page.getByRole("dialog", { name: "Main menu" });
    await expect(dialog.getByRole("link", { name: /About/ })).toHaveAttribute(
      "aria-current",
      "page",
    );
    await expect(dialog.getByText("Current page")).toBeVisible();
  });
});

test.describe("FAQ accordion", () => {
  test("is operable by keyboard and reports its state", async ({ page }) => {
    await page.goto("/focus-areas");

    const summaries = page.locator("summary");
    const second = summaries.nth(1);
    const details = second.locator("xpath=..");

    await expect(details).not.toHaveAttribute("open", /.*/);

    await second.focus();
    await expect(second).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(details).toHaveAttribute("open", /.*/);

    await page.keyboard.press("Enter");
    await expect(details).not.toHaveAttribute("open", /.*/);
  });

  test("keeps items independently open", async ({ page }) => {
    await page.goto("/focus-areas");
    const summaries = page.locator("summary");

    await summaries.nth(1).click();
    await expect(summaries.nth(0).locator("xpath=..")).toHaveAttribute("open", /.*/);
    await expect(summaries.nth(1).locator("xpath=..")).toHaveAttribute("open", /.*/);
  });
});

test.describe("call-to-action integrity", () => {
  test("the canonical partnership CTA is withheld while the enquiry route is closed", async ({
    page,
  }) => {
    for (const route of ["/", "/about", "/focus-areas"]) {
      await page.goto(route);
      await expect(
        page.getByRole("link", { name: "Discuss a partnership", exact: true }),
        `${route} shows the partnership CTA before the enquiry route is operational`,
      ).toHaveCount(0);
    }
  });

  test("the focus-areas status anchor scrolls to the status section", async ({ page }) => {
    await page.goto("/focus-areas");
    await page.getByRole("link", { name: "View programme status" }).first().click();
    await expect(page).toHaveURL(/#status$/);
    await expect(page.locator("#status")).toBeInViewport();
  });

  test("the partner page enquiry anchor reaches the form section", async ({ page }) => {
    await page.goto("/partner-with-us");
    await page.getByRole("link", { name: "Go to the enquiry form" }).click();
    await expect(page).toHaveURL(/#enquiry$/);
    await expect(page.locator("#enquiry")).toBeInViewport();
  });
});

test.describe("focus visibility", () => {
  test("every focused control shows a visible indicator", async ({ page }) => {
    await page.goto("/");

    for (let step = 0; step < 15; step += 1) {
      await page.keyboard.press("Tab");
      const outline = await page.evaluate(() => {
        const element = document.activeElement;
        if (!element || element === document.body) return null;
        const style = getComputedStyle(element);
        return {
          width: style.outlineWidth,
          style: style.outlineStyle,
          tag: element.tagName,
        };
      });
      if (!outline) continue;
      expect(
        outline.style !== "none" && parseFloat(outline.width) >= 2,
        `${outline.tag} has no visible focus indicator`,
      ).toBe(true);
    }
  });

  test("the sticky header does not obscure a focused control", async ({ page }) => {
    await page.goto("/focus-areas");
    await page.locator("#status").scrollIntoViewIfNeeded();

    const summary = page.locator("summary").first();
    await summary.focus();

    const headerHeight = await page
      .locator("header")
      .evaluate((el) => el.getBoundingClientRect().height);
    const box = await summary.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y, "focused control sits under the sticky header").toBeGreaterThanOrEqual(
      headerHeight - 1,
    );
  });
});
