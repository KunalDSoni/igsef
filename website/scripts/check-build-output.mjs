/**
 * Scan the production build for anything that must never ship.
 *
 * This is the authoritative check behind the unit-test source scan: it reads the
 * generated HTML, CSS and JavaScript — what a visitor actually receives — rather
 * than the source, so a value that leaks through a template, a bundled constant
 * or a stylesheet is caught here even if the source scan is satisfied.
 *
 * Run after `next build`:
 *   node scripts/check-build-output.mjs
 */

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import path from "node:path";

const BUILD_DIR = ".next";

if (!existsSync(BUILD_DIR)) {
  console.error(`No ${BUILD_DIR} directory. Run \`npm run build\` first.`);
  process.exit(1);
}

/**
 * Candidate corporate values from the brief and the private research notes.
 * None is verified, so none may appear in anything served to a visitor.
 */
const BLOCKED_CORPORATE = [
  "U85499MR2026NPL479632",
  "NPL479632",
  "ROC Mumbai",
  "Sagar CHSL",
  "CIDCO Colony",
  "Rajasekharan Pillai",
  "Ashok Digambarrao",
  "Mahesh Tolaram",
  "qorpiq",
  "company limited by guarantee",
];

/** Similarly named organisations that must never be implied as related. */
const BLOCKED_AFFILIATION = [
  "Indus Foundation",
  "Indo Global Colleges",
  "igef.net",
  "Indo-Global Skills Summit",
];

/** Reference-template content that must not survive into production. */
const BLOCKED_TEMPLATE = [
  "kidora",
  "reddevs",
  "preschool",
  "kindergarten",
  "daycare",
  "bright young minds",
  "happy parents",
  "framer.website",
];

/** Internal markers that must never render as public copy. */
const BLOCKED_PLACEHOLDER = [
  "[BLOCKED",
  "[TBD",
  "lorem ipsum",
  "[approved ",
  "[verified ",
  "[exact ",
  "[public email",
  "[monitored public email",
  "[approved sla",
];

/** Private discovery material that must never be bundled. */
const BLOCKED_PRIVATE = ["research-notes", "Classification: Internal", "claims register"];

const GROUPS = [
  ["candidate corporate value", BLOCKED_CORPORATE],
  ["unrelated-affiliation reference", BLOCKED_AFFILIATION],
  ["reference-template content", BLOCKED_TEMPLATE],
  ["internal placeholder", BLOCKED_PLACEHOLDER],
  ["private research material", BLOCKED_PRIVATE],
];

/** Directories that hold build caches rather than served output. */
const SKIP_DIRS = new Set(["cache", "trace", "types"]);

function walk(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full, acc);
    } else if (/\.(html|js|css|json|txt|xml|rsc)$/.test(entry)) {
      acc.push(full);
    }
  }
  return acc;
}

const files = walk(BUILD_DIR);
const findings = [];

for (const file of files) {
  const text = readFileSync(file, "utf8").toLowerCase();
  for (const [label, terms] of GROUPS) {
    for (const term of terms) {
      if (text.includes(term.toLowerCase())) {
        findings.push(`${label}: "${term}" in ${file}`);
      }
    }
  }
}

console.log(`Scanned ${files.length} build output files.`);

if (findings.length > 0) {
  console.error("\nBlocked content found in the production build:");
  for (const finding of findings) console.error(`  - ${finding}`);
  process.exit(1);
}

console.log("No blocked corporate, affiliation, template, placeholder or private content found.");
