import { defineConfig, devices } from "@playwright/test";

/**
 * End-to-end and accessibility configuration.
 *
 * Two servers run from two separate production builds:
 *
 * - **default** (port 3100) is the site exactly as it ships: enquiry delivery is
 *   not configured, so the form shows its honest unavailable state.
 * - **demo** (port 3101) is built with `ENQUIRY_TEST_MODE=true`, which mocks the
 *   delivery adapter so the success path can be exercised end to end. The build
 *   is not marked production, so the mock cannot resolve in a real deployment.
 *
 * Both are production builds — `next build` output, not the dev server — so the
 * suite tests what a visitor would actually receive.
 */

const DEFAULT_PORT = 3100;
const DEMO_PORT = 3101;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : [["list"]],
  timeout: 45_000,
  expect: { timeout: 10_000 },

  use: {
    baseURL: `http://127.0.0.1:${DEFAULT_PORT}`,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "default",
      testIgnore: /demo\.spec\.ts/,
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile",
      testMatch: /(navigation|reflow)\.spec\.ts/,
      use: { ...devices["Pixel 7"] },
    },
    {
      name: "demo",
      testMatch: /demo\.spec\.ts/,
      use: { ...devices["Desktop Chrome"], baseURL: `http://127.0.0.1:${DEMO_PORT}` },
    },
  ],

  webServer: [
    {
      command: `npm run build && npx next start --port ${DEFAULT_PORT}`,
      url: `http://127.0.0.1:${DEFAULT_PORT}`,
      reuseExistingServer: !process.env.CI,
      timeout: 180_000,
      stdout: "ignore",
    },
    {
      command: `npm run build:demo && npx next start --port ${DEMO_PORT}`,
      url: `http://127.0.0.1:${DEMO_PORT}`,
      reuseExistingServer: !process.env.CI,
      timeout: 180_000,
      stdout: "ignore",
      env: { NEXT_DIST_DIR: ".next-demo", ENQUIRY_TEST_MODE: "true" },
    },
  ],
});
