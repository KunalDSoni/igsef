import { expect, test } from "@playwright/test";

/**
 * The enquiry form and its server route in the state the site actually ships:
 * delivery is not configured, so nothing can be submitted.
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

const VALID_BODY = {
  enquiryType: "partnership",
  name: "Asha Menon",
  email: "asha@example.org",
  organisation: "Example Institute",
  role: "Head of Programmes",
  subject: "Curriculum collaboration",
  message: "We would like to explore a joint initiative for our diploma learners next year.",
  adultConfirmation: true,
};

test.describe("form UI in the shipped state", () => {
  for (const route of ["/contact", "/partner-with-us"]) {
    test(`${route} shows the honest unavailable state`, async ({ page }) => {
      await page.goto(route);

      await expect(
        page.getByText("Enquiries cannot be received through this form yet"),
      ).toBeVisible();
      await expect(page.getByLabel("Your name")).toBeDisabled();
      await expect(page.getByRole("button", { name: "Send enquiry" })).toBeDisabled();
      await expect(
        page.getByText("Sending is switched off until the enquiry channel is open."),
      ).toBeVisible();
    });

    test(`${route} shows no demo banner`, async ({ page }) => {
      await page.goto(route);
      await expect(page.getByText("Demo mode")).toHaveCount(0);
    });
  }

  test("the adult confirmation and safe-data warning are shown before any field", async ({
    page,
  }) => {
    await page.goto("/contact");
    await expect(page.getByText("I confirm that I am 18 or older")).toBeVisible();
    /* The under-18 guidance appears twice by design: in the page lead and as the
       checkbox hint. Both must be present. */
    await expect(page.getByText(/If you are under 18/).first()).toBeVisible();
    await expect(page.getByText(/If you are under 18/)).toHaveCount(2);
    await expect(page.getByText(/Please do not include identity documents/)).toBeVisible();
  });

  test("the point-of-collection notice links to the Privacy Notice", async ({ page }) => {
    await page.goto("/contact");
    const link = page
      .getByText(/We will use the information you provide/)
      .getByRole("link", { name: "Privacy Notice" });
    await expect(link).toHaveAttribute("href", "/privacy");
  });

  test("no phone, date-of-birth or identity field exists", async ({ page }) => {
    await page.goto("/contact");
    for (const label of [
      /phone/i,
      /date of birth/i,
      /aadhaar/i,
      /pan number/i,
      /income/i,
      /upload/i,
    ]) {
      await expect(page.getByLabel(label)).toHaveCount(0);
    }
    await expect(page.locator('input[type="file"]')).toHaveCount(0);
  });

  test("no monitored contact address is published while none is approved", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByText("No public email or phone number yet")).toBeVisible();
    await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
    await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);
  });
});

test.describe("server route", () => {
  test("reports delivery as unconfigured rather than faking success", async ({ request }) => {
    const response = await request.post("/api/enquiry", { data: VALID_BODY });
    expect(response.status()).toBe(503);
    expect((await response.json()).code).toBe("delivery_not_configured");
  });

  test("validates on the server even when the client is bypassed", async ({ request }) => {
    const response = await request.post("/api/enquiry", {
      data: { ...VALID_BODY, email: "not-an-email", name: "", adultConfirmation: false },
    });
    expect(response.status()).toBe(422);

    const body = await response.json();
    expect(body.code).toBe("validation_failed");
    expect(Object.keys(body.errors).sort()).toEqual(["adultConfirmation", "email", "name"]);
  });

  test("rejects an enquiry type outside the controlled list", async ({ request }) => {
    const response = await request.post("/api/enquiry", {
      data: { ...VALID_BODY, enquiryType: "donation" },
    });
    expect(response.status()).toBe(422);
    expect((await response.json()).errors.enquiryType).toBeTruthy();
  });

  test("rejects a filled honeypot without explaining why", async ({ request }) => {
    const response = await request.post("/api/enquiry", {
      data: { ...VALID_BODY, organisation_website: "https://spam.example" },
    });
    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.code).toBe("rejected");
    expect(body.errors).toBeUndefined();
  });

  test("rejects a malformed body", async ({ request }) => {
    const response = await request.post("/api/enquiry", {
      headers: { "content-type": "application/json" },
      data: "not json at all",
    });
    expect([400, 415]).toContain(response.status());
  });

  test("rejects an array body", async ({ request }) => {
    const response = await request.post("/api/enquiry", { data: [1, 2, 3] });
    expect(response.status()).toBe(400);
  });

  test("does not accept GET", async ({ request }) => {
    const response = await request.get("/api/enquiry");
    expect(response.status()).toBe(405);
    expect(response.headers()["allow"]).toBe("POST");
  });

  test("never returns a submitted value in the response body", async ({ request }) => {
    const response = await request.post("/api/enquiry", {
      data: { ...VALID_BODY, message: "a".repeat(10) },
    });
    const text = await response.text();
    for (const value of [VALID_BODY.name, VALID_BODY.email, VALID_BODY.subject]) {
      expect(text).not.toContain(value);
    }
  });

  test("is never cached", async ({ request }) => {
    const response = await request.post("/api/enquiry", { data: VALID_BODY });
    expect(response.headers()["cache-control"]).toContain("no-store");
  });

  test("rate limits repeated submissions", async ({ request, context }) => {
    /* One fixed address, so the per-window counter applies to every attempt. */
    await context.setExtraHTTPHeaders({ "x-forwarded-for": "198.51.100.200" });

    /* The limiter allows five per window; the sixth must be refused. */
    let sawRateLimit = false;
    for (let attempt = 0; attempt < 8; attempt += 1) {
      const response = await request.post("/api/enquiry", { data: VALID_BODY });
      if (response.status() === 429) {
        sawRateLimit = true;
        expect((await response.json()).code).toBe("rate_limited");
        expect(Number(response.headers()["retry-after"])).toBeGreaterThan(0);
        break;
      }
    }
    expect(sawRateLimit, "repeated submissions were never rate limited").toBe(true);
  });
});

test.describe("security headers", () => {
  test("sends the baseline protective headers", async ({ request }) => {
    const response = await request.get("/");
    const headers = response.headers();
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["permissions-policy"]).toContain("geolocation=()");
  });

  test("does not advertise the framework", async ({ request }) => {
    const response = await request.get("/");
    expect(response.headers()["x-powered-by"]).toBeUndefined();
  });
});
