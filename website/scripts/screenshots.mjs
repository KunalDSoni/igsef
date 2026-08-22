/**
 * Capture desktop and mobile screenshots of every public route.
 *
 * Usage:
 *   node scripts/screenshots.mjs [baseUrl] [outDir]
 *
 * Defaults to http://localhost:3000 and ./screenshots. Run a dev or production
 * server first. Also reports any page whose document scrolls horizontally at the
 * captured width, which is the cheapest way to catch an overflow regression.
 */

import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const baseUrl = (process.argv[2] ?? "http://localhost:3000").replace(/\/+$/, "");
const outDir = process.argv[3] ?? "screenshots";

const routes = [
  ["home", "/"],
  ["about", "/about"],
  ["focus-areas", "/focus-areas"],
  ["partner-with-us", "/partner-with-us"],
  ["contact", "/contact"],
  ["updates", "/updates"],
  ["corporate-disclosures", "/corporate-disclosures"],
  ["privacy", "/privacy"],
  ["terms", "/terms"],
  ["accessibility", "/accessibility"],
  ["404", "/this-page-does-not-exist"],
];

const viewports = [
  ["desktop-1440", 1440, 900],
  ["desktop-1280", 1280, 900],
  ["tablet-768", 768, 1024],
  ["mobile-390", 390, 844],
  ["mobile-320", 320, 640],
];

const overflow = [];

const browser = await chromium.launch();

for (const [viewportName, width, height] of viewports) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  for (const [routeName, route] of routes) {
    await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });

    const scroll = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));

    if (scroll.scrollWidth > scroll.clientWidth + 1) {
      overflow.push(
        `${routeName} @ ${viewportName}: ${scroll.scrollWidth} > ${scroll.clientWidth}`,
      );
    }

    const dir = path.join(outDir, viewportName);
    await mkdir(dir, { recursive: true });
    await page.screenshot({ path: path.join(dir, `${routeName}.png`), fullPage: true });
  }

  await context.close();
}

await browser.close();

if (overflow.length > 0) {
  console.error("Horizontal overflow detected:");
  for (const line of overflow) console.error(`  - ${line}`);
  process.exitCode = 1;
} else {
  console.log("No horizontal overflow at any captured width.");
}

console.log(`Screenshots written to ${outDir}/`);
