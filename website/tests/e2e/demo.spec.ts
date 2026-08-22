import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/**
 * Full enquiry journey against the demo-mode server.
 *
 * This project runs against a build made with `ENQUIRY_TEST_MODE=true`, which
 * mocks the delivery adapter. Every assertion here also checks that the demo
 * label is present, so the environment can never be mistaken for a real one.
 */

/**
 * The form's own error summary and failure notice. Scoped to the enquiry region
 * because Next.js injects a route announcer that also carries `role="alert"`.
 */
/**
 * Each test acts as a distinct visitor.
 *
 * Submission rate limiting is per client address, so without this a suite that
 * submits repeatedly would trip the limiter and test the limiter instead of the
 * behaviour it is aiming at. The rate-limit test opts out and uses one address
 * deliberately.
 */
let visitorCounter = 0;

test.beforeEach(async ({ context }, testInfo) => {
  visitorCounter += 1;
  await context.setExtraHTTPHeaders({
    "x-forwarded-for": `203.0.113.${(visitorCounter % 250) + 1}`,
    "x-test-name": testInfo.title.slice(0, 40),
  });
});

function formAlert(page: import("@playwright/test").Page) {
  return page.locator("#enquiry").getByRole("alert");
}

async function fillValidEnquiry(page: import("@playwright/test").Page) {
  await page.getByLabel("What would you like to discuss?").selectOption("partnership");
  await page.getByLabel("Your name").fill("Asha Menon");
  await page.getByLabel("Work or personal email").fill("asha@example.org");
  await page.getByLabel("Subject").fill("Curriculum collaboration");
  await page
    .getByLabel("How can we help?")
    .fill("We would like to explore a joint initiative for our diploma learners next year.");
  await page.getByLabel("I confirm that I am 18 or older").check();
}

test.describe("demo mode is unmistakable", () => {
  test("labels the environment before anything is submitted", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByText("Demo mode — submissions are not delivered")).toBeVisible();
    await expect(page.getByText("Internal preview — not published")).toBeVisible();
  });
});

test.describe("validation journey", () => {
  test("submitting an empty form focuses an error summary listing every problem", async ({
    page,
  }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: "Send enquiry" }).click();

    const summary = formAlert(page);
    await expect(summary).toBeVisible();
    await expect(summary).toBeFocused();
    await expect(summary).toContainText("problems with this form");
  });

  test("each summary entry moves focus to the field it names", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: "Send enquiry" }).click();

    const firstEntry = formAlert(page).getByRole("link").first();
    const href = await firstEntry.getAttribute("href");
    await firstEntry.click();
    await expect(page.locator(href!)).toBeFocused();
  });

  test("preserves entered values when validation fails", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Your name").fill("Asha Menon");
    await page.getByLabel("Subject").fill("A subject that should survive");
    await page.getByRole("button", { name: "Send enquiry" }).click();

    await expect(formAlert(page)).toBeVisible();
    await expect(page.getByLabel("Your name")).toHaveValue("Asha Menon");
    await expect(page.getByLabel("Subject")).toHaveValue("A subject that should survive");
  });

  test("rejects an invalid email with a specific, actionable message", async ({ page }) => {
    await page.goto("/contact");
    await fillValidEnquiry(page);
    await page.getByLabel("Work or personal email").fill("asha-at-example");
    await page.getByRole("button", { name: "Send enquiry" }).click();

    await expect(formAlert(page)).toContainText("name@example.com");
    await expect(page.getByLabel("Work or personal email")).toHaveAttribute("aria-invalid", "true");
  });

  test("requires the adult confirmation", async ({ page }) => {
    await page.goto("/contact");
    await fillValidEnquiry(page);
    await page.getByLabel("I confirm that I am 18 or older").uncheck();
    await page.getByRole("button", { name: "Send enquiry" }).click();

    await expect(formAlert(page)).toContainText("18 or older");
  });

  test("the whole form is operable by keyboard alone", async ({ page }) => {
    await page.goto("/contact");

    /*
     * Type-ahead rather than arrow keys: a native select's arrow-key popup does
     * not commit a value in a headless browser, and typing the first letter is
     * an equally real keyboard interaction.
     */
    await page.getByLabel("What would you like to discuss?").focus();
    await page.keyboard.type("P");
    await expect(page.getByLabel("What would you like to discuss?")).toHaveValue("partnership");

    await page.keyboard.press("Tab");
    await page.keyboard.type("Asha Menon");
    await page.keyboard.press("Tab");
    await page.keyboard.type("asha@example.org");
    await page.keyboard.press("Tab");
    await page.keyboard.type("Example Institute");
    await page.keyboard.press("Tab");
    await page.keyboard.type("Head of Programmes");
    await page.keyboard.press("Tab");
    await page.keyboard.type("Curriculum collaboration");
    await page.keyboard.press("Tab");
    await page.keyboard.type("We would like to explore a joint initiative for our learners.");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Space");

    await expect(page.getByLabel("I confirm that I am 18 or older")).toBeChecked();

    /*
     * The point-of-collection notice sits between the checkbox and the submit
     * button and contains a Privacy Notice link, so tab until the submit button
     * has focus rather than assuming it is the next stop.
     */
    const submit = page.locator("#enquiry button[type='submit']");
    for (let step = 0; step < 5; step += 1) {
      await page.keyboard.press("Tab");
      if (await submit.evaluate((element) => element === document.activeElement)) break;
    }
    await expect(submit).toBeFocused();
    await page.keyboard.press("Enter");

    await expect(page.locator("#enquiry").getByRole("status")).toContainText(
      "Your enquiry has been received",
    );
  });
});

test.describe("success journey", () => {
  test("shows a success state that is announced and labelled as a demo", async ({ page }) => {
    await page.goto("/contact");
    await fillValidEnquiry(page);
    await page.getByRole("button", { name: "Send enquiry" }).click();

    const status = page.locator("#enquiry").getByRole("status");
    await expect(status).toBeVisible();
    await expect(status).toContainText("Your enquiry has been received.");
    await expect(status).toContainText(
      "No enquiry was transmitted, stored or delivered to anyone.",
    );
  });

  test("moves focus to the result so it is not missed", async ({ page }) => {
    await page.goto("/contact");
    await fillValidEnquiry(page);
    await page.getByRole("button", { name: "Send enquiry" }).click();

    await expect(page.locator("#enquiry").getByRole("status")).toBeVisible();
    const focusedContainsStatus = await page.evaluate(
      () => document.activeElement?.querySelector('[role="status"]') !== null,
    );
    expect(focusedContainsStatus).toBe(true);
  });

  test("publishes no response-time promise while no SLA is agreed", async ({ page }) => {
    await page.goto("/contact");
    await fillValidEnquiry(page);
    await page.getByRole("button", { name: "Send enquiry" }).click();

    await expect(page.locator("#enquiry").getByRole("status")).toBeVisible();
    await expect(page.getByText(/we aim to acknowledge your message within/i)).toHaveCount(0);
  });

  test("does not resubmit while a submission is in flight", async ({ page }) => {
    let submissions = 0;
    await page.route("**/api/enquiry", async (route) => {
      submissions += 1;
      await new Promise((resolve) => setTimeout(resolve, 600));
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ code: "accepted", testMode: true }),
      });
    });

    await page.goto("/contact");
    await fillValidEnquiry(page);

    /*
      Located by type rather than by name: while a submission is in flight the
      button's accessible name changes to "Sending your enquiry…", which is the
      intended way it reports the state.
    */
    const submit = page.locator("#enquiry button[type='submit']");
    await submit.click();
    await expect(submit).toBeDisabled();
    await expect(submit).toHaveAccessibleName(/sending your enquiry/i);
    await submit.click({ force: true }).catch(() => {});
    await submit.click({ force: true }).catch(() => {});

    await expect(page.locator("#enquiry").getByRole("status")).toBeVisible();
    expect(submissions).toBe(1);
  });
});

test.describe("failure journeys", () => {
  test("a provider outage says the message was not sent", async ({ page }) => {
    await page.route("**/api/enquiry", (route) =>
      route.fulfill({
        status: 502,
        contentType: "application/json",
        body: JSON.stringify({ code: "provider_unavailable" }),
      }),
    );

    await page.goto("/contact");
    await fillValidEnquiry(page);
    await page.getByRole("button", { name: "Send enquiry" }).click();

    const alert = formAlert(page);
    await expect(alert).toContainText("We could not send your enquiry.");
    await expect(alert).toContainText("has not been submitted");
    await expect(page.getByLabel("Your name")).toHaveValue("Asha Menon");
  });

  test("a timeout is reported as a timeout", async ({ page }) => {
    await page.route("**/api/enquiry", (route) =>
      route.fulfill({
        status: 504,
        contentType: "application/json",
        body: JSON.stringify({ code: "provider_timeout" }),
      }),
    );

    await page.goto("/contact");
    await fillValidEnquiry(page);
    await page.getByRole("button", { name: "Send enquiry" }).click();

    await expect(formAlert(page)).toContainText("took too long");
  });

  test("a dropped connection does not claim success", async ({ page }) => {
    await page.route("**/api/enquiry", (route) => route.abort("connectionrefused"));

    await page.goto("/contact");
    await fillValidEnquiry(page);
    await page.getByRole("button", { name: "Send enquiry" }).click();

    await expect(formAlert(page)).toContainText("has not been submitted");
    await expect(page.locator("#enquiry").getByRole("status")).toHaveCount(0);
  });
});

test.describe("analytics and logging hygiene", () => {
  test("no submitted value appears in a URL or a console message", async ({ page }) => {
    const messages: string[] = [];
    page.on("console", (message) => messages.push(message.text()));

    const urls: string[] = [];
    page.on("request", (request) => urls.push(request.url()));

    await page.goto("/contact");
    await fillValidEnquiry(page);
    await page.getByRole("button", { name: "Send enquiry" }).click();
    await expect(page.locator("#enquiry").getByRole("status")).toBeVisible();

    const secrets = [
      "Asha Menon",
      "asha@example.org",
      "Curriculum collaboration",
      "diploma learners",
    ];
    for (const secret of secrets) {
      for (const url of urls) {
        expect(decodeURIComponent(url), `"${secret}" appeared in a request URL`).not.toContain(
          secret,
        );
      }
      for (const message of messages) {
        expect(message, `"${secret}" appeared in a console message`).not.toContain(secret);
      }
    }

    expect(page.url()).not.toContain("asha");
  });
});

test.describe("accessibility of interactive states", () => {
  const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"];

  test("the error state passes an accessibility scan", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: "Send enquiry" }).click();
    await expect(formAlert(page)).toBeVisible();

    const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();
    expect(results.violations.map((violation) => violation.id)).toEqual([]);
  });

  test("the success state passes an accessibility scan", async ({ page }) => {
    await page.goto("/contact");
    await fillValidEnquiry(page);
    await page.getByRole("button", { name: "Send enquiry" }).click();
    await expect(page.locator("#enquiry").getByRole("status")).toBeVisible();

    const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();
    expect(results.violations.map((violation) => violation.id)).toEqual([]);
  });
});
