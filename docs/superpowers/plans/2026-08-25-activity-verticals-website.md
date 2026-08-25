# Activity Verticals Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the placeholder preschool content in this Astro site with the organisation's real six activity verticals, leadership, and positioning, rebranded to the supplied logo, with a machine-enforced guard that keeps unverified corporate facts out of the build.

**Architecture:** Keep the existing Astro static-site architecture — data modules in `src/data/` feeding `.astro` pages through shared components, all styling in one token-driven `src/styles/global.css`. The work is a content-and-brand replacement, not a framework change. Three things are new: a `src/data/verticals.js` module that is the single source of truth for the six activity verticals, a `/focus-areas` route pair that replaces `/programs`, and a `scripts/content-guard.mjs` gate that scans built HTML for forbidden claims and fails the build if any appear.

**Tech Stack:** Astro 5.18.2 (already installed) · Node 20+ · `node:test` built-in test runner (no new dependencies) · plain CSS custom properties · GitHub Pages via the existing Actions workflow.

---

## Source documents

- `~/Downloads/3_Comprehensive Activity Verticals of the company.docx` — the six verticals, their activities, and leadership assignments. **This is the primary content source for this plan.** Its text is reproduced verbatim in Task 3 so you do not need to open it.
- `~/Downloads/indo.svg` — the official logo. Task 2 copies it into the repo and derives the palette from it.
- `Requirement.md`, `project-controls.md`, `content.md`, `research-notes.md` — inherited governance rules. Their status vocabulary, prohibited-claims list, and CTA map are carried into this plan's Global Constraints.

## Decisions taken (stated, not asked)

Brainstorming did not close on a written spec before this plan, so these calls were made here. Change the plan if any is wrong.

1. **The site is retargeted from preschool to adult and institutional education services.** Nothing in the verticals document concerns children aged 3–12. Age-banded programmes, "Teachers", "Admissions", and child sponsorship are removed.
2. **Positioning is "credibility first, with enough service detail to be useful in a meeting."** Each vertical gets a public page describing what it does, who it is for, and what an engagement looks like — but no price list and no fee amounts.
3. **The document's "Revenue & Strategic Value" column is internal and is not published verbatim.** "Revenue: recruitment success fees from corporates" is business strategy, not website copy. Each vertical instead carries an `engagement` line describing the delivery model in public-facing terms. The underlying facts survive; the internal framing does not.
4. **Every vertical publishes with status `Proposed`.** The organisation was incorporated on 12 August 2026 and nothing is operating yet.
5. **Leadership names and roles are published; corporate registry facts are not.** The names and titles come from the organisation's own strategy document, which is theirs to publish. The CIN, incorporation date, Section 8 status, and registered address come from a scraped third-party registry and stay out of the build until verified.
6. **The strategy document's "Next Steps for Implementation" section is not published.** Vertical-lead hiring, Centre of Excellence premises, and the internal "Menu of Services" are operational planning, not website content.
7. **The Kidora layout language is retoned, not rebuilt.** Component structure and page rhythm stay; the pastel-nursery palette is replaced with the logo's indigo/teal/saffron, and the childish flourishes (hand-drawn swoosh, scrolling marquee, starbursts) are removed.

## Inputs still needed from the user

The build degrades honestly without these — it renders an enquiry route instead of inventing a value. Collect them and fill in `src/data/site.js`:

| Input | Why it is blocked | Where it lands |
|---|---|---|
| Public email address | `hello@indoglobalskills.org` is invented | `site.contact` |
| Public phone number | `+91 22 4000 1234` is invented | `site.contact` |
| Public office address | Site says Santacruz East; registry says Airoli, Thane. Neither is confirmed | `site.contact` |
| Confirmed spelling of the Vice Chairman's name | Registry: "Rajasekharan Pillai Valliyil Narayana Pillai". Strategy doc: "Dr. V.R. Rajshekaran Pillai" | `src/data/leadership.js` |
| Whether the third director (Mahesh Tolaram Ahuja) holds a public role | Named on the registry record, absent from the strategy document | `src/data/leadership.js` |
| Board confirmation of the titles "CMD" and "Vice Chairman" | Taken from an internal document | `src/data/leadership.js` |
| Real social media URLs | All four currently point at `#` | `site.socials` |
| Confirmation of the registration year | Home and About copy say "registered in 2026"; the year comes from the same registry scrape as everything else | `src/pages/index.astro`, `src/pages/about.astro` |

## Global Constraints

Every task's requirements implicitly include this section.

- **No new runtime dependencies.** Astro 5.18.2 only. Tests use the built-in `node:test` module.
- **Every internal `href` and `src` goes through `url()`** from `src/lib/url.js`. The site is served from the `/igsef` base path; a bare `/about` breaks in production.
- **Never publish, in any file that reaches `dist/`:** the CIN `U85499MR2026NPL479632`; the exact incorporation date (the year alone is permitted, and the home and About copy use it — confirm the year with the user first); the phrase "Section 8"; any 12A, 12AB, 80G, CSR-1, or FCRA claim; a registered office address; beneficiary counts, placement rates, or completion rates; partner or client logos; testimonials; the words "leading", "largest", "best", "official", or "national" as self-description.
- **Programme status vocabulary is exactly these eight values, spelled exactly this way:** `Proposed`, `In development`, `Pilot`, `Open`, `In delivery`, `Completed`, `Paused`, `Archived`. Every vertical ships as `Proposed`.
- **No image may load from `framerusercontent.com`.** Those assets belong to the Kidora template and are not licensed for this site.
- **British English throughout:** "programme", "organisation", "specialise", "centre". The one exception is the proper noun "Twin Programme", which the source document spells "Twin Program" — use the British spelling for consistency.
- **Colour contrast:** `--teal` `#138A8A` measures 4.17:1 on white, below the 4.5:1 threshold for normal text. Use it only for text at 24px+, or 18.66px+ bold, or for non-text graphics. For body-size text use `--teal-deep` `#0E6B6B` (6.2:1). `--saffron` `#E69A2E` is for graphics and rules only — never text on a light background.
- **Commit after every task**, using the exact message given in the task's final step.

## File structure

**Created**

| File | Responsibility |
|---|---|
| `scripts/content-guard.mjs` | Pure function `findViolations(text, rules)` plus a CLI that scans `dist/` and exits non-zero on a hit. No Astro imports. |
| `tests/content-guard.test.js` | Unit tests for `findViolations`. |
| `tests/data.test.js` | Shape and vocabulary tests for the data modules. |
| `src/data/verticals.js` | The six activity verticals — the site's core content. |
| `src/data/leadership.js` | Named leaders, their roles, and which verticals they lead. |
| `src/components/StatusBadge.astro` | Renders one of the eight status values with consistent styling. |
| `src/components/VerticalCard.astro` | Card for one vertical on the home and focus-areas pages. |
| `src/pages/focus-areas/index.astro` | Lists all six verticals. |
| `src/pages/focus-areas/[slug].astro` | Detail page per vertical. |
| `src/pages/partner.astro` | The primary conversion — partnership enquiry. |
| `src/pages/updates/index.astro` | Updates listing; renders an honest empty state until content exists. |
| `public/logo.svg` | The supplied logo, copied into the repo. |

**Modified**

| File | Change |
|---|---|
| `src/styles/global.css` | Palette tokens swapped to the logo's colours; nursery-specific rules removed. |
| `src/data/site.js` | Identity, tagline, blurb, navigation, contact, and stats rewritten. |
| `src/layouts/Base.astro` | Remove the donation price-toggle script; keep the header, drawer, and reveal scripts. |
| `src/components/Header.astro` | New nav; CTA changes from "Donate" to "Discuss a partnership". |
| `src/components/Footer.astro` | New link groups; newsletter form removed. |
| `src/components/CTA.astro` | New default copy; remove the face-pile of template portraits. |
| `src/pages/index.astro` | Rebuilt around the six verticals. |
| `src/pages/about.astro` | Rewritten; gains a leadership section. |
| `src/pages/contact.astro` | Enquiry-first; honest handling of missing contact facts. |
| `src/pages/404.astro` | Copy retone. |
| `package.json` | `test`, `guard`, and `verify` scripts. |
| `.github/workflows/deploy.yml` | Run the guard before deploying. |
| `README.md` | Rewritten to describe the real site. |

**Deleted**

`src/pages/donate.astro` · `src/pages/teachers.astro` · `src/pages/admissions.astro` · `src/pages/programs/index.astro` · `src/pages/programs/[slug].astro` · `src/pages/blog/index.astro` · `src/pages/blog/[slug].astro` · `src/data/programs.js` · `src/data/teachers.js` · `src/data/testimonials.js` · `src/data/tiers.js` · `src/data/posts.js` · `src/data/images.js` · `src/components/GivingTiers.astro` · `src/components/ProgramCard.astro` · `src/components/Testimonials.astro` · `src/components/Marquee.astro` · `src/components/Swoosh.astro` · `src/components/BlogCard.astro`

---

### Task 1: Content-safety guard

The governance documents list claims that must never reach a published page. A human checklist will not catch a regression six months from now; a build gate will. This task builds the matcher and its tests. Task 11 wires it into the build.

**Files:**
- Create: `scripts/content-guard.mjs`
- Create: `tests/content-guard.test.js`
- Modify: `package.json`

**Interfaces:**
- Consumes: nothing.
- Produces: `findViolations(text, rules)` → `Array<{ id, label, match }>`, exported from `scripts/content-guard.mjs`. Also exports `RULES`, an array of `{ id, label, pattern }` where `pattern` is a `RegExp` with the `gi` flags. Task 11 imports both.

- [ ] **Step 1: Write the failing test**

Create `tests/content-guard.test.js`:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { findViolations, RULES } from '../scripts/content-guard.mjs';

test('clean text produces no violations', () => {
  const html = '<p>We work with colleges and employers on skills programmes.</p>';
  assert.deepEqual(findViolations(html, RULES), []);
});

test('flags the unverified CIN', () => {
  const found = findViolations('<p>CIN: U85499MR2026NPL479632</p>', RULES);
  assert.equal(found.length, 1);
  assert.equal(found[0].id, 'cin');
  assert.equal(found[0].match, 'U85499MR2026NPL479632');
});

test('flags tax-exemption claims', () => {
  const ids = findViolations('<li>80G tax receipt</li>', RULES).map((v) => v.id);
  assert.ok(ids.includes('tax-status'));
});

test('flags Section 8 self-description', () => {
  const ids = findViolations('<p>We are a Section 8 company.</p>', RULES).map((v) => v.id);
  assert.ok(ids.includes('section-8'));
});

test('flags Kidora template image hosts', () => {
  const ids = findViolations('<img src="https://framerusercontent.com/images/x.png">', RULES)
    .map((v) => v.id);
  assert.ok(ids.includes('template-assets'));
});

test('flags leftover preschool vocabulary', () => {
  const ids = findViolations('<h3>Ages 3–5</h3>', RULES).map((v) => v.id);
  assert.ok(ids.includes('preschool'));
});

test('flags placeholder contact details', () => {
  const ids = findViolations('<span>+91 22 4000 1234</span>', RULES).map((v) => v.id);
  assert.ok(ids.includes('placeholder-contact'));
});

test('flags superlative self-description', () => {
  const ids = findViolations('<p>India’s leading skills foundation</p>', RULES).map((v) => v.id);
  assert.ok(ids.includes('superlative'));
});

test('does not flag superlatives inside ordinary words', () => {
  assert.deepEqual(findViolations('<p>We hold the best interests of learners first.</p>', RULES)
    .filter((v) => v.id === 'superlative'), []);
});

test('reports every distinct match, not just the first', () => {
  const found = findViolations('<p>80G and 12AB and CSR-1</p>', RULES);
  assert.equal(found.filter((v) => v.id === 'tax-status').length, 3);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/content-guard.test.js`
Expected: FAIL — `Cannot find module '../scripts/content-guard.mjs'`

- [ ] **Step 3: Write the implementation**

Create `scripts/content-guard.mjs`:

```js
// Build gate. Scans compiled HTML for claims the governance documents forbid
// until an authorised owner has verified them against source documents.
// See Requirement.md 3.3 and research-notes.md.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

export const RULES = [
  {
    id: 'cin',
    label: 'Company identification number — unverified, sourced from a third-party registry',
    pattern: /U\d{5}[A-Z]{2}\d{4}[A-Z]{3}\d{6}/gi,
  },
  {
    id: 'section-8',
    label: 'Section 8 status — the licence has never been reviewed',
    pattern: /section\s*8\b/gi,
  },
  {
    id: 'tax-status',
    label: 'Tax exemption or CSR registration claim — no registration confirmed',
    pattern: /\b(80\s?-?G|12\s?-?A[AB]?|CSR-?1|FCRA)\b/gi,
  },
  {
    id: 'template-assets',
    label: 'Kidora template asset — not licensed for this site',
    pattern: /framerusercontent\.com/gi,
  },
  {
    id: 'preschool',
    label: 'Leftover preschool vocabulary from the template',
    pattern: /\b(ages?\s*\d+\s*[–—-]\s*\d+|preschool|kindergarten|nursery|toddler|sponsor a child)\b/gi,
  },
  {
    id: 'placeholder-contact',
    label: 'Invented contact detail from the placeholder build',
    pattern: /(\+91\s*22\s*4000\s*1234|hello@indoglobalskills\.org|14 Kalina Road)/gi,
  },
  {
    id: 'superlative',
    label: 'Superiority claim — prohibited until evidenced',
    // Matched against a following noun on purpose: a bare /the\s+best/ fires on
    // ordinary phrases like "the best interests of learners".
    pattern: /\b(?:leading|largest|best|foremost|official|number[- ]one)\s+(?:skills?|education(?:al)?|training|foundation|organisation|provider|institute|academy|ngo)\b/gi,
  },
  {
    id: 'fabricated-impact',
    label: 'Impact figure carried over from the placeholder build',
    pattern: /(2,400\+?|38\s+(?:learning\s+)?centres|96%\s*(?:daily\s*)?attendance|120\+\s*trained)/gi,
  },
];

export function findViolations(text, rules) {
  const out = [];
  for (const rule of rules) {
    const re = new RegExp(rule.pattern.source, rule.pattern.flags.includes('g')
      ? rule.pattern.flags
      : `${rule.pattern.flags}g`);
    let m;
    while ((m = re.exec(text)) !== null) {
      out.push({ id: rule.id, label: rule.label, match: m[0] });
      if (m.index === re.lastIndex) re.lastIndex += 1;
    }
  }
  return out;
}

function htmlFiles(dir) {
  const found = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) found.push(...htmlFiles(full));
    else if (full.endsWith('.html')) found.push(full);
  }
  return found;
}

// CLI: `node scripts/content-guard.mjs dist`
if (process.argv[1] && process.argv[1].endsWith('content-guard.mjs')) {
  const dir = process.argv[2] || 'dist';
  let failures = 0;
  for (const file of htmlFiles(dir)) {
    for (const v of findViolations(readFileSync(file, 'utf8'), RULES)) {
      console.error(`${file}: [${v.id}] ${v.label} — found "${v.match}"`);
      failures += 1;
    }
  }
  if (failures > 0) {
    console.error(`\nContent guard failed: ${failures} forbidden claim(s) in ${dir}/.`);
    process.exit(1);
  }
  console.log(`Content guard passed — no forbidden claims in ${dir}/.`);
}
```

- [ ] **Step 4: Add the test script**

In `package.json`, replace the `"scripts"` block with:

```json
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "test": "node --test tests/",
    "guard": "node scripts/content-guard.mjs dist"
  },
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS — 10 passing tests, 0 failing.

- [ ] **Step 6: Commit**

```bash
git add scripts/content-guard.mjs tests/content-guard.test.js package.json
git commit -m "feat: add content-safety guard for forbidden corporate claims"
```

---

### Task 2: Brand foundations

Swap the Kidora nursery palette for the supplied logo's indigo, teal, and saffron, and install the real logo. Everything downstream inherits from this.

**Files:**
- Create: `public/logo.svg` (copied from `~/Downloads/indo.svg`)
- Modify: `src/styles/global.css:7-29` (the `:root` token block)
- Modify: `src/components/Icons.astro:23` (the `#i-logo` symbol)
- Modify: `src/data/site.js` (whole file)
- Create: `tests/data.test.js`

**Interfaces:**
- Consumes: nothing.
- Produces: CSS custom properties `--canvas`, `--indigo`, `--teal`, `--teal-deep`, `--mist`, `--saffron`, `--tint-indigo`, `--tint-teal`, `--tint-saffron`, `--ink`, `--grey`, `--line`, `--white`. The old `--cream`, `--peach`, `--mint`, `--lavender`, `--amber`, `--purple` are gone; every later task uses the new names. Also produces `site`, `nav`, `socials`, and `positioning` from `src/data/site.js` — note `allPages` and `stats` are removed.

- [ ] **Step 1: Write the failing test**

Create `tests/data.test.js`:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { site, nav, positioning } from '../src/data/site.js';

const css = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'utf8');

test('global.css defines the logo palette', () => {
  for (const token of ['--indigo', '--teal', '--teal-deep', '--saffron', '--canvas', '--mist']) {
    assert.ok(css.includes(`${token}:`), `missing token ${token}`);
  }
  assert.ok(css.includes('#173B70'), 'indigo hex missing');
  assert.ok(css.includes('#138A8A'), 'teal hex missing');
  assert.ok(css.includes('#E69A2E'), 'saffron hex missing');
});

test('global.css no longer defines the nursery palette', () => {
  for (const token of ['--cream:', '--peach:', '--mint:', '--lavender:', '--purple:', '--amber:']) {
    assert.ok(!css.includes(token), `stale token ${token} still defined`);
  }
});

test('site identity carries no invented contact details', () => {
  const blob = JSON.stringify(site);
  assert.ok(!blob.includes('4000 1234'));
  assert.ok(!blob.includes('hello@indoglobalskills.org'));
  assert.ok(!blob.includes('Kalina'));
});

test('unconfirmed contact entries are marked pending, not faked', () => {
  assert.ok(Array.isArray(site.contact));
  for (const entry of site.contact) {
    assert.ok(typeof entry.label === 'string' && entry.label.length > 0);
    assert.ok('value' in entry, `${entry.label} must declare a value, even if null`);
    if (entry.value === null) assert.equal(entry.status, 'pending');
  }
});

test('registration line makes no status claim', () => {
  assert.ok(!/section\s*8/i.test(site.regNote));
  assert.ok(!/80\s?-?G/i.test(site.regNote));
});

test('navigation points at the real routes', () => {
  const hrefs = nav.map((n) => n.href);
  assert.deepEqual(hrefs, ['/', '/about', '/focus-areas', '/partner', '/contact']);
});

test('positioning lines exist and avoid superlatives', () => {
  for (const key of ['proposition', 'mission', 'vision']) {
    assert.ok(typeof positioning[key] === 'string' && positioning[key].length > 20);
    assert.ok(!/\b(leading|largest|best|official)\b/i.test(positioning[key]));
  }
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/data.test.js`
Expected: FAIL — `global.css defines the logo palette` fails on the missing `--indigo` token, and `navigation points at the real routes` fails because `nav` is still Home/About/Contact.

- [ ] **Step 3: Install the logo**

```bash
cp ~/Downloads/indo.svg public/logo.svg
```

Then replace the `#i-logo` symbol in `src/components/Icons.astro` (currently line 23, the eight-pointed star) with the globe mark, scaled to a 24×24 viewBox:

```html
  <symbol id="i-logo" viewBox="0 0 560 420" fill="none">
    <path d="M101 316C76 272 65 220 73 166C87 70 171 0 270 0C328 0 382 24 421 65"
          stroke="#173B70" stroke-width="20" stroke-linecap="round"/>
    <path d="M442 95C466 142 474 197 463 249C445 336 372 401 281 412C222 419 166 401 125 365"
          stroke="#138A8A" stroke-width="20" stroke-linecap="round"/>
    <path d="M128 365C172 326 215 300 264 288C314 276 355 244 389 195"
          stroke="#173B70" stroke-width="18" stroke-linecap="round"/>
    <path d="M410 144L421 172L450 183L422 194L411 223L400 195L371 184L399 173Z" fill="#E69A2E"/>
  </symbol>
```

- [ ] **Step 4: Replace the palette tokens**

In `src/styles/global.css`, replace the `/* palette */` block (lines 8–20) with:

```css
  /* palette — derived from the organisation's logo */
  --canvas:       #FBFAF7;  /* warm off-white page ground */
  --indigo:       #173B70;  /* primary: actions, headings on light */
  --teal:         #138A8A;  /* secondary: large text 24px+ and graphics only */
  --teal-deep:    #0E6B6B;  /* secondary at body text sizes (6.2:1 on white) */
  --mist:         #A8D5D3;  /* pale teal from the logo's network lines */
  --saffron:      #E69A2E;  /* accent: rules and graphics only, never small text */
  --tint-indigo:  #E7ECF5;
  --tint-teal:    #E8F4F3;
  --tint-saffron: #FBF0DE;
  --grey:         #4A5568;
  --ink:          #18222F;
  --white:        #FFFFFF;
  --line:         rgba(23,59,112,.12);
```

Then run a global rename across `src/styles/global.css` so no rule references a deleted token:

```bash
sed -i '' \
  -e 's/var(--cream)/var(--canvas)/g' \
  -e 's/var(--purple)/var(--indigo)/g' \
  -e 's/var(--amber)/var(--saffron)/g' \
  -e 's/var(--peach)/var(--tint-saffron)/g' \
  -e 's/var(--mint)/var(--tint-teal)/g' \
  -e 's/var(--lavender)/var(--tint-indigo)/g' \
  src/styles/global.css
```

Then rename the two class names that encode the old palette, so markup and CSS stay in step:

```bash
sed -i '' -e 's/--cream\b/--canvas/g' -e 's/--purple\b/--indigo/g' src/styles/global.css
grep -rn 'section--cream\|btn--purple\|prog--mint\|prog--lav\|prog--peach\|pcard--mint\|pcard--lav\|pcard--peach\|plan--' src/ || true
```

Every hit that grep prints is markup a later task rewrites or deletes. Update `global.css` so the class names become `.section--canvas`, `.btn--indigo`, `.pcard--teal`, `.pcard--indigo`, `.pcard--saffron`, and leave the `.prog--*` and `.plan--*` rules alone — Task 10 deletes them along with their components.

- [ ] **Step 5: Rewrite the identity data**

Replace `src/data/site.js` entirely:

```js
// Single source of truth for the organisation's identity.
//
// Corporate facts (CIN, incorporation date, legal form, registered office) are
// deliberately absent. They are known only from a third-party registry scrape
// and must not be published until an authorised owner confirms them against the
// Certificate of Incorporation and current MCA master data. See research-notes.md.
export const site = {
  name: 'Indo-Global',
  fullName: 'Indo-Global Skills & Edu Foundation',
  tagline: 'Learning, skills, and opportunity',
  blurb:
    'We build practical pathways between learning, skills, institutions, and opportunity — working with colleges, employers, and communities across India and beyond.',

  // Each entry declares a value even when we do not have one yet. A null value
  // renders as a route to the enquiry form, never as an invented detail.
  contact: [
    { label: 'Email',   icon: 'i-mail',  value: null, status: 'pending' },
    { label: 'Phone',   icon: 'i-phone', value: null, status: 'pending' },
    { label: 'Office',  icon: 'i-pin',   value: null, status: 'pending' },
  ],

  // Deliberately makes no claim about legal form or tax status.
  regNote: 'A non-profit company registered in Maharashtra, India. Registration details available on request.',
};

export const positioning = {
  proposition: 'Building practical pathways between learning, skills, institutions, and opportunity.',
  mission:
    'To co-create practical, inclusive learning pathways with learners, educators, institutions, employers, and communities.',
  vision:
    'A future in which every learner can access relevant education, build useful capabilities, and pursue meaningful opportunity.',
};

export const nav = [
  { label: 'Home',         href: '/' },
  { label: 'About',        href: '/about' },
  { label: 'Focus areas',  href: '/focus-areas' },
  { label: 'Partner with us', href: '/partner' },
  { label: 'Contact',      href: '/contact' },
];

// Replace each '#' with a real profile URL before launch, or delete the entry.
// A social icon linking to '#' is a dead control and must not ship.
export const socials = [];
```

- [ ] **Step 6: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS — all `content-guard` and `data` tests green.

Do not run `npm run build` here. Removing `allPages` and `stats` from `site.js` breaks `Header.astro`, `Footer.astro`, `index.astro`, and `about.astro`, which still import them. The build stays broken from this point until Task 10 and that is expected — the tests are the gate for Tasks 2 and 3.

- [ ] **Step 7: Commit**

```bash
git add public/logo.svg src/styles/global.css src/components/Icons.astro src/data/site.js tests/data.test.js
git commit -m "feat: rebrand to the organisation's logo palette and real identity data"
```

---

### Task 3: The six activity verticals and leadership

This is the content the whole site exists to carry. Every field below is derived from the organisation's own strategy document. The `engagement` field is the public-facing rewrite of that document's internal "Revenue & Strategic Value" column — see Decision 3 in the header.

**Files:**
- Create: `src/data/verticals.js`
- Create: `src/data/leadership.js`
- Modify: `tests/data.test.js`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `verticals` — an array of six objects, each `{ slug, number, title, status, tone, summary, intro, activities, audiences, engagement, leadKey }`. `tone` is one of `'indigo' | 'teal' | 'saffron'`. `leadKey` matches a `key` in `leadership`.
  - `STATUSES` — the frozen array of the eight permitted status values.
  - `leadership` — an array of `{ key, name, role, remit, verticalSlugs }`.

- [ ] **Step 1: Write the failing test**

In `tests/data.test.js`, add these two imports alongside the existing ones at the top of the file:

```js
import { verticals, STATUSES } from '../src/data/verticals.js';
import { leadership } from '../src/data/leadership.js';
```

Then append the tests to the end of the file:

```js

test('there are six verticals with unique slugs', () => {
  assert.equal(verticals.length, 6);
  assert.equal(new Set(verticals.map((v) => v.slug)).size, 6);
});

test('every vertical is fully populated', () => {
  for (const v of verticals) {
    for (const key of ['slug', 'number', 'title', 'status', 'tone', 'summary', 'intro', 'engagement', 'leadKey']) {
      assert.ok(typeof v[key] === 'string' && v[key].length > 0, `${v.slug} missing ${key}`);
    }
    assert.ok(Array.isArray(v.activities) && v.activities.length >= 2, `${v.slug} needs activities`);
    assert.ok(Array.isArray(v.audiences) && v.audiences.length >= 2, `${v.slug} needs audiences`);
    assert.ok(['indigo', 'teal', 'saffron'].includes(v.tone), `${v.slug} has an unknown tone`);
  }
});

test('every vertical uses a permitted status and ships as Proposed', () => {
  for (const v of verticals) {
    assert.ok(STATUSES.includes(v.status), `${v.slug} has status "${v.status}"`);
    assert.equal(v.status, 'Proposed', `${v.slug} must ship as Proposed until it is operating`);
  }
});

test('vertical copy publishes no revenue strategy', () => {
  const blob = JSON.stringify(verticals);
  assert.ok(!/\brevenue\b/i.test(blob), 'internal revenue framing leaked into public copy');
  assert.ok(!/success fee|membership fee|management fee/i.test(blob));
});

test('vertical copy makes no prohibited claim', () => {
  const blob = JSON.stringify(verticals);
  assert.ok(!/\b(80\s?-?G|12\s?-?A[AB]?|CSR-?1|FCRA)\b/i.test(blob));
  assert.ok(!/section\s*8/i.test(blob));
});

test('every vertical names a lead who exists', () => {
  const keys = new Set(leadership.map((l) => l.key));
  for (const v of verticals) assert.ok(keys.has(v.leadKey), `${v.slug} names unknown lead ${v.leadKey}`);
});

test('leadership entries cross-reference real verticals', () => {
  const slugs = new Set(verticals.map((v) => v.slug));
  for (const l of leadership) {
    assert.ok(typeof l.name === 'string' && l.name.length > 0);
    assert.ok(typeof l.role === 'string' && l.role.length > 0);
    assert.ok(l.verticalSlugs.length > 0);
    for (const s of l.verticalSlugs) assert.ok(slugs.has(s), `${l.key} names unknown vertical ${s}`);
  }
});

test('leadership carries no invented biography or photo', () => {
  for (const l of leadership) {
    assert.ok(!('photo' in l), `${l.key} must not carry a photo until one is supplied`);
    assert.ok(!('bio' in l), `${l.key} must not carry a biography until one is approved`);
  }
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/data.test.js`
Expected: FAIL — `Cannot find module '../src/data/verticals.js'`

- [ ] **Step 3: Write the verticals module**

Create `src/data/verticals.js`:

```js
// The organisation's six activity verticals.
//
// Source: the board's "Comprehensive Activity Verticals" strategy paper.
// That paper's internal "Revenue & Strategic Value" column is NOT reproduced
// here. Each vertical instead carries an `engagement` line describing the
// delivery model in terms suitable for a public page.
//
// Every vertical ships with status 'Proposed'. The organisation was registered
// in August 2026 and nothing is operating yet. Change a status only when the
// programme owner confirms the work has actually started.

export const STATUSES = Object.freeze([
  'Proposed',
  'In development',
  'Pilot',
  'Open',
  'In delivery',
  'Completed',
  'Paused',
  'Archived',
]);

export const verticals = [
  {
    slug: 'international-academic-pathway',
    number: '01',
    title: 'International academic pathway',
    status: 'Proposed',
    tone: 'indigo',
    summary:
      'Structured routes for students moving between Indian and international institutions — course selection, admissions, and the language readiness that sits underneath both.',
    intro:
      'Studying abroad rarely fails on ability. It fails on process — the wrong course, a missed deadline, a language score that arrives too late. This vertical exists to make that process legible.',
    activities: [
      'Guidance on foreign university admissions, alongside career counselling that starts from where the student actually wants to end up',
      'Language academies covering IELTS, TOEFL, and foreign-language instruction',
      'Twin Programme affiliations that let Indian and overseas institutes recognise each other’s coursework',
    ],
    audiences: [
      'Students and families weighing an international course',
      'Indian colleges seeking overseas academic affiliations',
      'Overseas institutions looking for credible Indian partners',
    ],
    engagement:
      'Delivered as counselling for individual students, as scheduled language courses, and as formal affiliation agreements between partner institutions.',
    leadKey: 'vice-chairman',
  },
  {
    slug: 'corporate-and-industry-training',
    number: '02',
    title: 'Corporate and industry training',
    status: 'Proposed',
    tone: 'teal',
    summary:
      'Training that closes the distance between what someone has studied and what a workplace actually asks of them — for students entering work, and for professionals already in it.',
    intro:
      'Employers describe the same gap repeatedly: graduates who know the subject and not the job. This vertical addresses both sides of that gap, from either direction.',
    activities: [
      'For students — finishing schools, professional grooming, and job-ready certification programmes',
      'For professionals — upskilling workshops, leadership modules, and industry-specific technical training',
    ],
    audiences: [
      'Final-year students and recent graduates',
      'Employers developing their own teams',
      'Colleges adding employability provision to an existing curriculum',
    ],
    engagement:
      'Delivered as contracted programmes for employers and institutions, and as scheduled open courses that individuals can join directly.',
    leadKey: 'cmd',
  },
  {
    slug: 'ai-and-emerging-tech-education',
    number: '03',
    title: 'AI and emerging technology education',
    status: 'Proposed',
    tone: 'saffron',
    summary:
      'Age-appropriate AI and computing education for schools and colleges, together with the lab infrastructure needed to teach it rather than talk about it.',
    intro:
      'Most institutions want to teach AI and have no realistic route to doing it — no curriculum, no equipment, and no one on staff who has built a model. This vertical supplies all three.',
    activities: [
      'For schools — basic coding, logic building, and AI-awareness programmes',
      'For colleges — machine learning, data science, and ethics-in-AI modules',
      'AI Innovation Labs established inside partner institutions',
    ],
    audiences: [
      'Schools and school networks',
      'Colleges and technical institutes',
      'Funders and CSR teams supporting technology education',
    ],
    engagement:
      'Delivered through partner institutions, with curriculum and lab set-up scoped per campus. Structured to suit grant-funded and CSR-funded programmes.',
    leadKey: 'vice-chairman',
  },
  {
    slug: 'innovation-and-incubation',
    number: '04',
    title: 'Innovation and incubation',
    status: 'Proposed',
    tone: 'indigo',
    summary:
      'Support for student projects with commercial potential — finding them, developing them, and introducing them to people who can fund them.',
    intro:
      'A good student project usually dies at submission. This vertical is about the year after that, when an idea either becomes a product or quietly stops.',
    activities: [
      'Scouting original student projects and providing sustained mentorship',
      'Connecting out-of-the-box ideas with angel investors and venture capital',
      'Guiding the move from academic prototype to commercial product',
    ],
    audiences: [
      'Student founders and project teams',
      'Colleges running innovation or entrepreneurship cells',
      'Investors and business houses looking for early-stage ideas',
    ],
    engagement:
      'Delivered as mentorship cohorts run with partner institutions, supported by sponsorship from organisations with an interest in early-stage research and development.',
    leadKey: 'vice-chairman',
  },
  {
    slug: 'industry-academia-integration',
    number: '05',
    title: 'Industry–academia integration',
    status: 'Proposed',
    tone: 'teal',
    summary:
      'The working connection between campuses and employers: placements, internships, guest teaching, and a talent record that outlives any one hiring season.',
    intro:
      'Placement cells and hiring teams want the same outcome and rarely share a channel. This vertical is that channel, run as ongoing infrastructure rather than an annual event.',
    activities: [
      'Managing internships, job fairs, and campus placement drives',
      'Arranging guest lectures and sessions led by working corporate leaders',
      'Maintaining a talent bank spanning alumni and entry-level candidates',
    ],
    audiences: [
      'Colleges and their placement cells',
      'Employers hiring at entry level',
      'Students and alumni looking for roles',
    ],
    engagement:
      'Delivered through annual partnerships with institutions and standing hiring agreements with employers.',
    leadKey: 'cmd',
  },
  {
    slug: 'strategic-csr-and-social-impact',
    number: '06',
    title: 'Strategic CSR and social impact',
    status: 'Proposed',
    tone: 'saffron',
    summary:
      'Designing and running education programmes for companies that want their social spending to land somewhere specific and be accounted for.',
    intro:
      'Corporate social spending on education often disperses. This vertical is about designing programmes with a defined beneficiary, a defined outcome, and a record of both.',
    activities: [
      'Designing and executing education-focused corporate social responsibility projects',
      'Managing scholarship programmes end to end',
      'Infrastructure development for rural schools and colleges',
    ],
    audiences: [
      'Corporate social responsibility teams',
      'Rural schools and colleges',
      'Scholarship applicants and recipients',
    ],
    // Deliberately explicit: the statutory registrations required to act as a
    // corporate social responsibility implementing agency in India are not yet
    // in place. Saying so is better than a partner discovering it mid-contract.
    engagement:
      'Delivered as scoped projects for corporate partners. The statutory registrations required to act as an implementing agency are being completed, and we confirm our current standing in writing before any project is contracted.',
    leadKey: 'cmd',
  },
];
```

- [ ] **Step 4: Write the leadership module**

Create `src/data/leadership.js`:

```js
// Named leadership and the verticals each one carries.
//
// Source: the board's "Comprehensive Activity Verticals" strategy paper.
//
// Open items, tracked in the plan's "Inputs still needed" table:
//   - The Vice Chairman's name is spelled differently on the public company
//     record. Confirm the form the organisation wants to use publicly.
//   - The titles below come from an internal paper and need board confirmation.
//   - A third director appears on the company record with no vertical assigned.
//     Add an entry here if they hold a public role.
//
// No `bio` or `photo` field: we have neither, and inventing one is the exact
// failure mode this rebuild exists to correct.
export const leadership = [
  {
    key: 'cmd',
    name: 'Dr. Ashok Digambarrao Chavan',
    role: 'Chairman and Managing Director',
    remit:
      'Leads execution across corporate training, industry partnerships, and corporate social responsibility programmes.',
    verticalSlugs: [
      'corporate-and-industry-training',
      'industry-academia-integration',
      'strategic-csr-and-social-impact',
    ],
  },
  {
    key: 'vice-chairman',
    name: 'Dr. V. R. Rajshekaran Pillai',
    role: 'Vice Chairman',
    remit:
      'Provides academic direction across international affiliations, AI curriculum standards, and the innovation portfolio.',
    verticalSlugs: [
      'international-academic-pathway',
      'ai-and-emerging-tech-education',
      'innovation-and-incubation',
    ],
  },
];
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS — all tests green, including the nine new data tests.

- [ ] **Step 6: Commit**

```bash
git add src/data/verticals.js src/data/leadership.js tests/data.test.js
git commit -m "feat: add the six activity verticals and leadership data"
```

---

### Task 4: Shared components

Two new components carry the verticals; four existing ones are retoned. The nursery-specific components are left in place for now — Task 10 deletes them once nothing imports them.

**Files:**
- Create: `src/components/StatusBadge.astro`
- Create: `src/components/VerticalCard.astro`
- Modify: `src/components/Header.astro`
- Modify: `src/components/Footer.astro`
- Modify: `src/components/CTA.astro`
- Modify: `src/layouts/Base.astro:80-95` (remove the price-toggle and newsletter scripts)
- Modify: `src/styles/global.css` (append the new component rules)

**Interfaces:**
- Consumes: `verticals`, `STATUSES` from `src/data/verticals.js`; `site`, `nav` from `src/data/site.js`.
- Produces:
  - `StatusBadge.astro` — props `{ status }`.
  - `VerticalCard.astro` — props `{ vertical }`.
  - `CTA.astro` — props `{ title, text, cta, href }`, all optional, defaulting to the partnership CTA.

- [ ] **Step 1: Write StatusBadge**

Create `src/components/StatusBadge.astro`:

```astro
---
// Renders one of the eight permitted programme statuses. Anything else is a
// content error and should be loud rather than silently styled.
import { STATUSES } from '../data/verticals.js';
const { status } = Astro.props;
if (!STATUSES.includes(status)) {
  throw new Error(`Unknown programme status "${status}". Permitted: ${STATUSES.join(', ')}.`);
}
const slug = status.toLowerCase().replace(/\s+/g, '-');
---
<span class={`status status--${slug}`}>{status}</span>
```

- [ ] **Step 2: Write VerticalCard**

Create `src/components/VerticalCard.astro`:

```astro
---
import StatusBadge from './StatusBadge.astro';
import { url } from '../lib/url.js';
const { vertical } = Astro.props;
---
<article class={`vcard vcard--${vertical.tone} reveal`}>
  <div class="vcard__head">
    <span class="vcard__num">{vertical.number}</span>
    <StatusBadge status={vertical.status} />
  </div>
  <h3>{vertical.title}</h3>
  <p>{vertical.summary}</p>
  <a href={url(`/focus-areas/${vertical.slug}`)} class="link-arrow">
    View focus area <svg><use href="#i-arrow" /></svg>
  </a>
</article>
```

- [ ] **Step 3: Add the component styles**

Append to `src/styles/global.css`:

```css
/* ---------- status badge ---------- */
.status {
  display: inline-block; padding: 5px 12px; border-radius: var(--r-pill);
  font-size: 11px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase;
  background: var(--tint-indigo); color: var(--indigo);
}
.status--pilot, .status--in-development { background: var(--tint-saffron); color: #7A4E06; }
.status--open, .status--in-delivery     { background: var(--tint-teal); color: var(--teal-deep); }
.status--paused, .status--archived      { background: #EDEFF2; color: var(--grey); }

/* ---------- vertical cards ---------- */
.vgrid { display: grid; gap: 22px; grid-template-columns: repeat(3, 1fr); }
.vcard {
  display: flex; flex-direction: column; gap: 14px;
  padding: 32px; border-radius: var(--r-card);
  background: var(--white); border: 1px solid var(--line);
  border-top: 5px solid var(--indigo);
}
.vcard--teal    { border-top-color: var(--teal); }
.vcard--saffron { border-top-color: var(--saffron); }
.vcard__head { display: flex; align-items: center; justify-content: space-between; }
.vcard__num {
  font-family: var(--display); font-size: 15px; font-weight: 800;
  color: var(--indigo); opacity: .45;
}
.vcard h3 { font-size: clamp(22px, 2.2vw, 28px); line-height: 1.25; }
.vcard p { font-size: 15px; }
.vcard .link-arrow { margin-top: auto; align-self: flex-start; }

/* ---------- vertical detail ---------- */
.vdetail { display: grid; gap: 48px; grid-template-columns: 1.4fr 1fr; align-items: start; }
.vdetail__aside {
  padding: 28px; border-radius: var(--r-card);
  background: var(--tint-indigo); display: grid; gap: 22px;
}
.vdetail__aside h4 { font-size: 15px; letter-spacing: .1em; text-transform: uppercase; color: var(--indigo); }
.vdetail__aside ul { margin: 8px 0 0; padding-left: 18px; color: var(--grey); font-size: 15px; }
.vdetail__aside li { margin-bottom: 7px; }
.act-list { display: grid; gap: 16px; margin-top: 26px; padding: 0; list-style: none; }
.act-list li {
  display: grid; grid-template-columns: 26px 1fr; gap: 14px;
  color: var(--grey); font-size: 16px;
}
.act-list svg { width: 22px; height: 22px; color: var(--teal-deep); margin-top: 2px; }

/* ---------- leadership ---------- */
.leaders { display: grid; gap: 22px; grid-template-columns: repeat(2, 1fr); }
.leader {
  padding: 30px; border-radius: var(--r-card);
  background: var(--white); border: 1px solid var(--line);
}
.leader h4 { font-size: 24px; }
.leader__role {
  font-size: 13px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase;
  color: var(--teal-deep); margin: 6px 0 14px;
}
.leader__areas { margin-top: 16px; display: flex; flex-wrap: wrap; gap: 8px; }
.leader__areas a {
  font-size: 13px; font-weight: 700; padding: 6px 12px;
  border-radius: var(--r-pill); background: var(--tint-teal); color: var(--teal-deep);
}

/* ---------- honest empty state ---------- */
.empty {
  padding: 56px 32px; border-radius: var(--r-card);
  background: var(--tint-indigo); text-align: center;
}
.empty h3 { font-size: 26px; margin-bottom: 10px; }

@media (max-width: 900px) {
  .vgrid, .leaders { grid-template-columns: 1fr; }
  .vdetail { grid-template-columns: 1fr; gap: 32px; }
}
```

- [ ] **Step 4: Rewrite the header**

Replace `src/components/Header.astro`. The "All Pages" dropdown goes — it was a template artefact that exposed the 404 page as a navigation item.

```astro
---
import { nav, site } from '../data/site.js';
import Button from './Button.astro';
import { url } from '../lib/url.js';
// "overlay" sits transparent over a dark hero; "solid" is for every other page.
const { variant = 'solid' } = Astro.props;
---
<header class={`header ${variant === 'solid' ? 'header--solid' : ''}`} id="header" data-variant={variant}>
  <div class="wrap header__inner">
    <a class="logo" href={url('/')}><svg><use href="#i-logo" /></svg> {site.name}</a>

    <nav class="nav" aria-label="Primary">
      {nav.filter((item) => item.href !== '/partner').map((item) => <a href={url(item.href)}>{item.label}</a>)}
    </nav>

    <Button href="/partner" variant="indigo">Discuss a partnership</Button>

    <button class="header__burger" id="burger" aria-label="Open menu" aria-expanded="false">
      <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" fill="none"><path d="M3 7h18M3 12h18M3 17h18"/></svg>
    </button>
  </div>

  <div class="drawer" id="drawer" hidden>
    <div class="wrap drawer__inner">
      {nav.map((item) => <a href={url(item.href)}>{item.label}</a>)}
      <a href={url('/partner')} class="drawer__cta">Discuss a partnership</a>
    </div>
  </div>
</header>

<style>
  .drawer { background: var(--white); border-top: 1px solid var(--line); padding: 18px 0 26px; }
  .drawer__inner { display: grid; gap: 2px; }
  .drawer a { padding: 12px 4px; font-size: 15px; font-weight: 700; color: var(--ink); border-bottom: 1px solid var(--line); }
  .drawer__cta { margin-top: 14px; background: var(--indigo); color: var(--white) !important; text-align: center; border-radius: var(--r-pill); border: 0 !important; }
  @media (min-width: 721px) { .drawer { display: none; } }
</style>
```

- [ ] **Step 5: Rewrite the footer**

Replace `src/components/Footer.astro`. The newsletter form goes — `project-controls.md` puts a newsletter outside the MVP, and a signup box that acknowledges without subscribing is a dead control.

```astro
---
import { site, nav, socials } from '../data/site.js';
import { verticals } from '../data/verticals.js';
import { url } from '../lib/url.js';
---
<footer class="footer">
  <div class="wrap">
    <div class="footer__grid">
      <div>
        <a class="logo" href={url('/')}><svg><use href="#i-logo" /></svg> {site.name}</a>
        <p>{site.blurb}</p>
      </div>

      {socials.length > 0 && (
        <div class="socials">
          {socials.map((s) => (
            <a href={s.href} aria-label={s.label}><svg><use href={`#${s.icon}`} /></svg></a>
          ))}
        </div>
      )}

      <div class="footer__links">
        <div class="footer__col">
          <strong>Organisation</strong>
          {nav.map((l) => <a href={url(l.href)}>{l.label}</a>)}
        </div>
        <div class="footer__col">
          <strong>Focus areas</strong>
          {verticals.map((v) => <a href={url(`/focus-areas/${v.slug}`)}>{v.title}</a>)}
        </div>
      </div>
    </div>
    <div class="footer__bar">© {new Date().getFullYear()} {site.fullName} · {site.regNote}</div>
  </div>
</footer>
```

Then add the column-heading style to `src/styles/global.css`:

```css
.footer__col strong {
  display: block; font-family: var(--display); font-size: 14px;
  letter-spacing: .08em; text-transform: uppercase; margin-bottom: 14px;
}
```

- [ ] **Step 6: Retone the closing CTA**

Replace `src/components/CTA.astro`. The face-pile of template portraits goes with the images module.

```astro
---
import Button from './Button.astro';
const {
  title = 'Start a conversation about working together',
  text = 'If you run an institution, hire at entry level, or direct social spending toward education, we would like to hear what you are trying to do.',
  cta = 'Discuss a partnership',
  href = '/partner',
} = Astro.props;
---
<section class="section section--white" style="padding-top:0">
  <div class="wrap">
    <div class="cta reveal">
      <h2>{title}</h2>
      <p>{text}</p>
      <Button href={href} variant="indigo">{cta}</Button>
    </div>
  </div>
</section>
```

- [ ] **Step 7: Strip the dead scripts from the layout**

In `src/layouts/Base.astro`, delete the `--- monthly / yearly toggle ---` block and the `--- newsletter ---` block from the inline `<script>` (currently the last two blocks, around lines 80–95). Keep the sticky-header, mobile-drawer, and scroll-reveal blocks.

- [ ] **Step 8: Verify the build and tests**

Run: `npm test && npm run build`
Expected: tests PASS. The build will FAIL on the pages that still import deleted tokens or the old header CTA variant — that is expected at this point, and Tasks 5 through 10 clear it. Record the failing page list; it should contain only `index`, `about`, `programs`, `teachers`, `admissions`, `donate`, and `blog`.

- [ ] **Step 9: Commit**

```bash
git add src/components src/layouts/Base.astro src/styles/global.css
git commit -m "feat: add vertical and status components, retone header, footer, and CTA"
```

---

### Task 5: Home page

**Files:**
- Modify: `src/pages/index.astro` (full rewrite)

**Interfaces:**
- Consumes: `VerticalCard`, `CTA`, `Eyebrow`, `Button`, `verticals`, `positioning`, `site`.
- Produces: nothing other tasks depend on.

- [ ] **Step 1: Rewrite the page**

Replace `src/pages/index.astro`:

```astro
---
import Base from '../layouts/Base.astro';
import Eyebrow from '../components/Eyebrow.astro';
import Button from '../components/Button.astro';
import VerticalCard from '../components/VerticalCard.astro';
import CTA from '../components/CTA.astro';
import { verticals } from '../data/verticals.js';
import { positioning, site } from '../data/site.js';

const approach = [
  {
    title: 'We work through institutions',
    text: 'Colleges, schools, and employers already have the learners and the premises. We supply the programme, not a parallel system.',
  },
  {
    title: 'Learning is judged by what follows it',
    text: 'A course that does not change what someone can do, or get hired for, has not worked. Every vertical is designed backwards from that test.',
  },
  {
    title: 'We say what stage we are at',
    text: 'The organisation was registered in 2026. Every focus area on this site is labelled with its real status, and none of them claims to be running yet.',
  },
];
---
<Base description={site.blurb}>
  <section class="hero hero--plain">
    <div class="wrap hero__inner">
      <Eyebrow text="Indo-Global Skills & Edu Foundation" />
      <h1>{positioning.proposition}</h1>
      <p class="hero__sub">{site.blurb}</p>
      <div class="hero__actions">
        <Button href="/partner" variant="indigo">Discuss a partnership</Button>
        <Button href="/focus-areas" variant="white">See our focus areas</Button>
      </div>
    </div>
  </section>

  <section class="section section--white" id="focus">
    <div class="wrap">
      <div class="sec-head reveal" style="margin-bottom:44px">
        <div>
          <Eyebrow text="Focus areas" />
          <h2>Six areas of work</h2>
        </div>
        <p style="max-width:420px">
          Each one is a distinct body of work with its own audience and delivery model.
          All six are proposed: scoped and ready to start, not yet running.
        </p>
      </div>
      <div class="vgrid">
        {verticals.map((v) => <VerticalCard vertical={v} />)}
      </div>
    </div>
  </section>

  <section class="section section--canvas">
    <div class="wrap">
      <div class="reveal" style="max-width:760px">
        <Eyebrow text="Our approach" />
        <h2>How we intend to work</h2>
      </div>
      <div class="steps reveal" style="margin-top:40px">
        {approach.map((a, i) => (
          <div class="step"><b>{i + 1}</b><h4>{a.title}</h4><p>{a.text}</p></div>
        ))}
      </div>
    </div>
  </section>

  <section class="section section--white">
    <div class="wrap mission reveal">
      <div>
        <Eyebrow text="Mission" />
        <p class="mission__text">{positioning.mission}</p>
      </div>
      <div>
        <Eyebrow text="Vision" />
        <p class="mission__text">{positioning.vision}</p>
      </div>
    </div>
  </section>

  <CTA />
</Base>
```

- [ ] **Step 2: Add the new layout rules**

Append to `src/styles/global.css`:

```css
/* ---------- plain hero (replaces the full-bleed photographic hero) ---------- */
.hero--plain {
  min-height: 0; padding: 190px 0 96px; align-items: center;
  background: linear-gradient(180deg, var(--tint-indigo) 0%, var(--canvas) 100%);
}
.hero--plain .hero__inner { max-width: 900px; }
.hero--plain h1 { color: var(--ink); }
.hero--plain .hero__sub { color: var(--grey); max-width: 620px; margin: 22px 0 32px; font-size: 18px; }
.hero__actions { display: flex; flex-wrap: wrap; gap: 14px; }

/* ---------- mission / vision pair ---------- */
.mission { display: grid; gap: 48px; grid-template-columns: 1fr 1fr; }
.mission__text {
  font-family: var(--display); font-size: clamp(22px, 2.4vw, 30px);
  font-weight: 600; line-height: 1.35; color: var(--ink);
}
@media (max-width: 900px) {
  .mission { grid-template-columns: 1fr; gap: 34px; }
  .hero--plain { padding: 150px 0 72px; }
}
```

The header sits over this hero, so pass no `headerVariant` — the default `solid` styling is correct against a light background. Confirm `.header--solid .logo` and `.header--solid .nav a` resolve to `var(--ink)`; if the existing rule still assumes a dark photographic hero, change those two colours in the `/* ---------- header ---------- */` block.

- [ ] **Step 3: Build and inspect**

Run: `npm run build`
Expected: `dist/index.html` builds. Other pages may still fail; that is expected until Task 10.

Then check the compiled home page against the guard:

Run: `node scripts/content-guard.mjs dist`
Expected: no violations reported for `dist/index.html`.

- [ ] **Step 4: Look at it**

Start the preview and take a screenshot of the home page at desktop and mobile widths. Confirm: the hero reads as an institutional site rather than a nursery, all six vertical cards render with `Proposed` badges, and nothing shows a pastel nursery colour.

- [ ] **Step 5: Commit**

```bash
git add src/pages/index.astro src/styles/global.css
git commit -m "feat: rebuild the home page around the six activity verticals"
```

---

### Task 6: Focus areas index and detail pages

Replaces `/programs` and `/programs/[slug]`. Those two files are deleted in Task 10, once nothing links to them.

**Files:**
- Create: `src/pages/focus-areas/index.astro`
- Create: `src/pages/focus-areas/[slug].astro`

**Interfaces:**
- Consumes: `verticals` from `src/data/verticals.js`; `leadership` from `src/data/leadership.js`; `VerticalCard`, `StatusBadge`, `PageHero`, `Eyebrow`, `Button`, `CTA`.
- Produces: the routes `/focus-areas` and `/focus-areas/<slug>` for all six slugs. The header, footer, and home page already link to these.

- [ ] **Step 1: Write the index page**

Create `src/pages/focus-areas/index.astro`:

```astro
---
import Base from '../../layouts/Base.astro';
import PageHero from '../../components/PageHero.astro';
import VerticalCard from '../../components/VerticalCard.astro';
import CTA from '../../components/CTA.astro';
import { verticals } from '../../data/verticals.js';
---
<Base
  title="Focus areas"
  description="The six areas of work Indo-Global Skills & Edu Foundation is set up to deliver, across international pathways, training, technology education, incubation, placements, and corporate social responsibility."
>
  <PageHero
    eyebrow="Focus areas"
    title="Six areas of work"
    lede="Each area has its own audience, its own delivery model, and its own status. We publish that status rather than implying everything is already running."
    crumb="Focus areas"
  />

  <section class="section section--canvas" id="status">
    <div class="wrap">
      <div class="reveal" style="max-width:720px; margin-bottom:40px">
        <p>
          All six areas currently carry the status <strong>Proposed</strong>: designed and
          resourced to begin, with no delivery under way yet. When an area moves to pilot
          or open enrolment, the label on its card changes and the detail page says what
          is actually available.
        </p>
      </div>
      <div class="vgrid">
        {verticals.map((v) => <VerticalCard vertical={v} />)}
      </div>
    </div>
  </section>

  <CTA
    title="Which of these fits what you are trying to do?"
    text="Tell us the outcome you are working toward and we will say plainly whether we are the right people for it."
  />
</Base>
```

- [ ] **Step 2: Write the detail page**

Create `src/pages/focus-areas/[slug].astro`:

```astro
---
import Base from '../../layouts/Base.astro';
import PageHero from '../../components/PageHero.astro';
import Eyebrow from '../../components/Eyebrow.astro';
import Button from '../../components/Button.astro';
import StatusBadge from '../../components/StatusBadge.astro';
import CTA from '../../components/CTA.astro';
import { verticals } from '../../data/verticals.js';
import { leadership } from '../../data/leadership.js';

export function getStaticPaths() {
  return verticals.map((vertical) => ({ params: { slug: vertical.slug }, props: { vertical } }));
}

const { vertical } = Astro.props;
const lead = leadership.find((l) => l.key === vertical.leadKey);
---
<Base title={vertical.title} description={vertical.summary}>
  <PageHero
    eyebrow="Focus area"
    title={vertical.title}
    lede={vertical.intro}
    crumb={`Focus areas · ${vertical.title}`}
  />

  <section class="section section--white">
    <div class="wrap vdetail reveal">
      <div>
        <Eyebrow text="What this involves" />
        <ul class="act-list">
          {vertical.activities.map((a) => (
            <li><svg><use href="#i-check" /></svg><span>{a}</span></li>
          ))}
        </ul>

        <div style="margin-top:40px">
          <Eyebrow text="How it is delivered" />
          <p style="font-size:17px">{vertical.engagement}</p>
        </div>
      </div>

      <aside class="vdetail__aside">
        <div>
          <h4>Current status</h4>
          <div style="margin-top:10px"><StatusBadge status={vertical.status} /></div>
        </div>
        <div>
          <h4>Who this is for</h4>
          <ul>{vertical.audiences.map((a) => <li>{a}</li>)}</ul>
        </div>
        {lead && (
          <div>
            <h4>Led by</h4>
            <p style="margin-top:8px; color:var(--ink); font-weight:700">{lead.name}</p>
            <p style="font-size:14px">{lead.role}</p>
          </div>
        )}
        <Button href="/partner" variant="indigo">Enquire about this area</Button>
      </aside>
    </div>
  </section>

  <CTA
    title={`Interested in ${vertical.title.toLowerCase()}?`}
    text="Tell us what you are working toward and who you serve. We will reply with what we can realistically do and by when."
  />
</Base>
```

- [ ] **Step 3: Build and verify every route exists**

Run: `npm run build && ls dist/focus-areas`
Expected: an `index.html` plus one directory per slug — `international-academic-pathway`, `corporate-and-industry-training`, `ai-and-emerging-tech-education`, `innovation-and-incubation`, `industry-academia-integration`, `strategic-csr-and-social-impact`.

- [ ] **Step 4: Run the guard over the new pages**

Run: `node scripts/content-guard.mjs dist`
Expected: no violations from any `dist/focus-areas/**` file. Violations from `dist/programs`, `dist/donate`, and the other stale routes are expected and are cleared in Task 10.

- [ ] **Step 5: Commit**

```bash
git add src/pages/focus-areas
git commit -m "feat: add focus-area index and detail pages for the six verticals"
```

---

### Task 7: About page

The current About page tells an invented founding story about nineteen children in a rented room. It is replaced with what is actually true: a recently registered organisation, its mission, its approach, and the two people leading it.

**Files:**
- Modify: `src/pages/about.astro` (full rewrite)

**Interfaces:**
- Consumes: `positioning`, `site` from `src/data/site.js`; `leadership` from `src/data/leadership.js`; `verticals` from `src/data/verticals.js`.
- Produces: nothing other tasks depend on.

- [ ] **Step 1: Rewrite the page**

Replace `src/pages/about.astro`:

```astro
---
import Base from '../layouts/Base.astro';
import PageHero from '../components/PageHero.astro';
import Eyebrow from '../components/Eyebrow.astro';
import CTA from '../components/CTA.astro';
import { positioning, site } from '../data/site.js';
import { leadership } from '../data/leadership.js';
import { verticals } from '../data/verticals.js';
import { url } from '../lib/url.js';

const values = [
  {
    tone: 'teal',
    icon: 'i-check',
    title: 'Verified before visible',
    text: 'Every factual claim on this site has a source and an owner. Where we do not yet have the document, we say so instead of rounding up.',
  },
  {
    tone: 'indigo',
    icon: 'i-globe',
    title: 'Built with institutions',
    text: 'We are not trying to replace colleges, training providers, or employers. Our work runs through them.',
  },
  {
    tone: 'saffron',
    icon: 'i-chart',
    title: 'Judged on what follows',
    text: 'The measure of a programme is what a participant can do afterwards, and whether it changed their options.',
  },
];

const titleFor = (slug) => verticals.find((v) => v.slug === slug)?.title ?? slug;
---
<Base
  title="About"
  description="Indo-Global Skills & Edu Foundation is a non-profit company working on skills, education, and the routes between them. This is who we are and what stage we are at."
>
  <PageHero
    eyebrow="About us"
    title="A new organisation, being honest about it"
    lede="We were registered in 2026 to work on the gap between what people learn and the opportunities they can actually reach. Nothing on this site claims to be running before it is."
    crumb="About"
  />

  <section class="section section--white">
    <div class="wrap" style="max-width:820px">
      <div class="reveal">
        <Eyebrow text="Why we exist" />
        <div class="prose" style="margin-top:20px">
          <p>
            India produces more graduates each year than almost anywhere on earth, and employers
            still describe the same shortfall: people who know a subject without knowing the job.
            The gap is not talent. It is the absence of a route between one and the other.
          </p>
          <p>
            Indo-Global Skills & Edu Foundation was set up to build those routes — between school
            and college, between college and work, between an Indian institution and an
            international one, and between a student project and something that can be funded.
          </p>
          <p>
            We are a young organisation. We have a defined plan across six areas of work,
            leadership with long records in education and industry, and no delivery history yet.
            That last point matters, and we would rather state it than let a website imply otherwise.
          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--canvas">
    <div class="wrap mission reveal">
      <div>
        <Eyebrow text="Mission" />
        <p class="mission__text">{positioning.mission}</p>
      </div>
      <div>
        <Eyebrow text="Vision" />
        <p class="mission__text">{positioning.vision}</p>
      </div>
    </div>
  </section>

  <section class="section section--white">
    <div class="wrap">
      <div class="reveal" style="margin-bottom:44px">
        <Eyebrow text="What we hold to" />
        <h2>Three commitments</h2>
      </div>
      <div class="philo__rail reveal">
        {values.map((v) => (
          <article class={`pcard pcard--${v.tone}`}>
            <div class="pcard__icon"><svg><use href={`#${v.icon}`} /></svg></div>
            <h4>{v.title}</h4>
            <p>{v.text}</p>
          </article>
        ))}
      </div>
    </div>
  </section>

  <section class="section section--canvas" id="leadership">
    <div class="wrap">
      <div class="reveal" style="margin-bottom:40px; max-width:680px">
        <Eyebrow text="Leadership" />
        <h2>Who leads the work</h2>
        <p style="margin-top:16px">Each area of work sits with a named person rather than the organisation in general.</p>
      </div>
      <div class="leaders reveal">
        {leadership.map((l) => (
          <article class="leader">
            <h4>{l.name}</h4>
            <div class="leader__role">{l.role}</div>
            <p>{l.remit}</p>
            <div class="leader__areas">
              {l.verticalSlugs.map((s) => (
                <a href={url(`/focus-areas/${s}`)}>{titleFor(s)}</a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>

  <section class="section section--white" style="padding-top:0">
    <div class="wrap" style="max-width:820px">
      <div class="reveal">
        <Eyebrow text="Accountability" />
        <h2 style="margin-bottom:18px">What we will not do</h2>
        <div class="prose">
          <p>
            We do not publish beneficiary numbers, placement rates, or partner names we cannot
            evidence. We do not describe a proposed programme as an operating one. We do not
            claim affiliation with any similarly named institution, college, or summit — no such
            relationship exists.
          </p>
          <p>{site.regNote}</p>
        </div>
      </div>
    </div>
  </section>

  <CTA />
</Base>
```

- [ ] **Step 2: Retone the value cards**

The `.pcard--mint`, `.pcard--lav`, and `.pcard--peach` rules were renamed in Task 2 Step 4. Confirm `src/styles/global.css` now defines `.pcard--teal`, `.pcard--indigo`, and `.pcard--saffron`:

Run: `grep -n 'pcard--' src/styles/global.css`
Expected: three rules, named `--teal`, `--indigo`, `--saffron`. Rename any that were missed.

- [ ] **Step 3: Build and check**

Run: `npm run build && node scripts/content-guard.mjs dist`
Expected: `dist/about/index.html` builds and produces no violations.

- [ ] **Step 4: Commit**

```bash
git add src/pages/about.astro src/styles/global.css
git commit -m "feat: rewrite About around the real organisation and its leadership"
```

---

### Task 8: Partner with us

The primary conversion. Everything else on the site routes here. The form has no backend yet, so it must say so rather than pretending to submit — a form that silently discards an enquiry is worse than no form.

**Files:**
- Create: `src/pages/partner.astro`

**Interfaces:**
- Consumes: `verticals` from `src/data/verticals.js`; `PageHero`, `Eyebrow`.
- Produces: the route `/partner`, with the anchor `#enquiry`. The header, footer, CTA component, and every focus-area page already link to it.

- [ ] **Step 1: Write the page**

Create `src/pages/partner.astro`:

```astro
---
import Base from '../layouts/Base.astro';
import PageHero from '../components/PageHero.astro';
import Eyebrow from '../components/Eyebrow.astro';
import { verticals } from '../data/verticals.js';

const routes = [
  {
    title: 'Schools, colleges, and training institutes',
    text: 'Curriculum support, AI labs on campus, international affiliations, and placement infrastructure.',
  },
  {
    title: 'Employers and industry bodies',
    text: 'Entry-level hiring pipelines, team upskilling, mentoring, and input into what gets taught.',
  },
  {
    title: 'Corporate social responsibility and philanthropy',
    text: 'Education programmes with a defined beneficiary, a defined outcome, and a record of both.',
  },
  {
    title: 'Educators, trainers, and mentors',
    text: 'Teaching and mentoring roles as each area of work moves from proposed to active.',
  },
];
---
<Base
  title="Partner with us"
  description="Start a conversation with Indo-Global Skills & Edu Foundation about training, campus programmes, hiring pathways, or corporate social responsibility projects."
>
  <PageHero
    eyebrow="Partner with us"
    title="Tell us what you are trying to do"
    lede="We would rather hear the outcome you are working toward than pitch you a package. If we are not the right people for it, we will say so."
    crumb="Partner with us"
  />

  <section class="section section--white">
    <div class="wrap">
      <div class="reveal" style="margin-bottom:44px; max-width:680px">
        <Eyebrow text="Who we work with" />
        <h2>Four kinds of conversation</h2>
      </div>
      <div class="steps reveal">
        {routes.map((r, i) => (
          <div class="step"><b>{i + 1}</b><h4>{r.title}</h4><p>{r.text}</p></div>
        ))}
      </div>
    </div>
  </section>

  <section class="section section--canvas" id="enquiry">
    <div class="wrap contact">
      <div class="reveal">
        <Eyebrow text="What happens next" />
        <h2>Three steps</h2>
        <div class="prose" style="margin-top:20px">
          <p><strong>1. You send this form.</strong> Tell us your organisation and the outcome you want. Two sentences is enough.</p>
          <p><strong>2. We reply within two working days.</strong> A person, not an autoresponder, with an honest read on fit.</p>
          <p><strong>3. We scope it together.</strong> If it fits, we put timelines and responsibilities in writing before anything starts.</p>
        </div>
      </div>

      <form class="form reveal" id="partnerForm" novalidate>
        <div class="form__row">
          <label>Your name<input type="text" name="name" autocomplete="name" required /></label>
          <label>Organisation<input type="text" name="organisation" autocomplete="organization" required /></label>
        </div>
        <div class="form__row">
          <label>Email<input type="email" name="email" autocomplete="email" required /></label>
          <label>Role<input type="text" name="role" autocomplete="organization-title" /></label>
        </div>
        <label>Area of interest
          <select name="area">
            <option value="">Not sure yet</option>
            {verticals.map((v) => <option value={v.slug}>{v.title}</option>)}
          </select>
        </label>
        <label>What are you trying to achieve?<textarea name="message" rows="5" required></textarea></label>
        <p class="form__consent">
          We use what you send here only to reply to your enquiry. We do not add you to a
          mailing list and we do not share it with anyone else. This form is for adults
          aged 18 and over — please do not send us anyone else’s personal details.
        </p>
        <button class="btn btn--indigo" type="submit" style="justify-self:start">
          Send enquiry<span class="btn__dot"><svg><use href="#i-arrow" /></svg></span>
        </button>
        <p class="form__note" id="partnerNote" role="status">
          This form has no backend connected yet, so it cannot deliver your message.
          Connect it to a form handler before launch.
        </p>
      </form>
    </div>
  </section>

  <script>
    // No backend yet. Say so plainly rather than clearing the form and
    // implying a message was delivered.
    document.getElementById('partnerForm')?.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const note = document.getElementById('partnerNote');
      if (note) {
        note.textContent =
          'Not sent — this form still needs a backend connected. Nothing you typed has been transmitted or stored.';
        note.style.color = 'var(--indigo)';
        note.style.fontWeight = '700';
      }
    });
  </script>
</Base>
```

- [ ] **Step 2: Add the consent-note style**

Append to `src/styles/global.css`:

```css
.form__consent {
  font-size: 13px; color: var(--grey); line-height: 1.55;
  padding: 14px 16px; border-radius: 12px; background: var(--tint-indigo);
}
```

- [ ] **Step 3: Build and test the form behaviour**

Run: `npm run build`

Then open `/partner` in the preview, submit the form with fields filled, and confirm the note changes to the "Not sent" message and the typed values remain in the fields. Confirm no network request leaves the page.

- [ ] **Step 4: Commit**

```bash
git add src/pages/partner.astro src/styles/global.css
git commit -m "feat: add the partner-with-us page as the primary conversion route"
```

---

### Task 9: Contact, updates, and 404

Three smaller pages that share a test cycle. The updates listing exists as a working template with no content — `Requirement.md` §7.1 requires exactly this: build the route, keep it out of navigation until an approved item exists.

**Files:**
- Modify: `src/pages/contact.astro` (full rewrite)
- Create: `src/pages/updates/index.astro`
- Modify: `src/pages/404.astro`

**Interfaces:**
- Consumes: `site` from `src/data/site.js`.
- Produces: the routes `/contact`, `/updates`, and the 404 page. `/updates` is deliberately absent from `nav` in `src/data/site.js` and is reachable only by direct link until it has content.

- [ ] **Step 1: Rewrite the contact page**

Replace `src/pages/contact.astro`. Contact entries with a `null` value render an honest line rather than an invented number:

```astro
---
import Base from '../layouts/Base.astro';
import PageHero from '../components/PageHero.astro';
import Eyebrow from '../components/Eyebrow.astro';
import Button from '../components/Button.astro';
import { site } from '../data/site.js';

const known = site.contact.filter((c) => c.value !== null);
const pending = site.contact.filter((c) => c.value === null);
---
<Base
  title="Contact"
  description="How to reach Indo-Global Skills & Edu Foundation about partnerships, programmes, or organisational questions."
>
  <PageHero
    eyebrow="Contact"
    title="Reach the team"
    lede="Partnership enquiries move fastest through the enquiry form, which routes straight to the people who can answer."
    crumb="Contact"
  />

  <section class="section section--white">
    <div class="wrap" style="max-width:760px">
      <div class="reveal">
        <Eyebrow text="Best route" />
        <h2>Start with an enquiry</h2>
        <p style="margin:18px 0 28px">
          Whether you are an institution, an employer, a funder, or someone who wants to teach,
          the enquiry form asks for what we need to route your message correctly and reply properly.
        </p>
        <Button href="/partner" variant="indigo">Go to the enquiry form</Button>
      </div>

      {known.length > 0 && (
        <div class="contact__facts reveal" style="margin-top:56px">
          {known.map((c) => (
            <div class="cfact">
              <span class="cfact__icon"><svg><use href={`#${c.icon}`} /></svg></span>
              <span><b>{c.label}</b><span>{c.value}</span></span>
            </div>
          ))}
        </div>
      )}

      {pending.length > 0 && (
        <div class="empty reveal" style="margin-top:48px; text-align:left">
          <h3>Direct contact details are being finalised</h3>
          <p>
            We are not publishing {new Intl.ListFormat('en-GB', { style: 'long', type: 'conjunction' })
              .format(pending.map((c) => c.label.toLowerCase()))} until
            they are confirmed and monitored. Publishing a channel nobody is watching wastes your time.
            The enquiry form is checked.
          </p>
        </div>
      )}
    </div>
  </section>
</Base>
```

- [ ] **Step 2: Write the updates listing**

Create `src/pages/updates/index.astro`:

```astro
---
import Base from '../../layouts/Base.astro';
import PageHero from '../../components/PageHero.astro';
import Button from '../../components/Button.astro';

// Deliberately empty. This route exists as a working template so the first
// approved update can be published without building a page from scratch.
// It stays out of `nav` in src/data/site.js until this array has an entry.
const updates = [];
---
<Base
  title="Updates"
  description="News and published material from Indo-Global Skills & Edu Foundation."
>
  <PageHero
    eyebrow="Updates"
    title="Updates"
    lede="Programme news, published material, and anything we have learned worth passing on."
    crumb="Updates"
  />

  <section class="section section--white">
    <div class="wrap" style="max-width:760px">
      {updates.length === 0 ? (
        <div class="empty reveal">
          <h3>Nothing published yet</h3>
          <p style="max-width:460px; margin:0 auto 24px">
            We would rather leave this empty than fill it with a launch announcement.
            The first update will go here when there is a programme to report on.
          </p>
          <Button href="/focus-areas" variant="indigo">See what we are planning</Button>
        </div>
      ) : (
        <p>Listing template — render the update cards here.</p>
      )}
    </div>
  </section>
</Base>
```

- [ ] **Step 3: Retone the 404**

Replace the body copy in `src/pages/404.astro` — "This page went out to play" is nursery voice:

```astro
---
import Base from '../layouts/Base.astro';
import Button from '../components/Button.astro';
---
<Base title="Page not found">
  <section class="nf">
    <div class="wrap">
      <div class="nf__code">404</div>
      <h2>We could not find that page</h2>
      <p>The page you were looking for has moved or never existed. Everything else is where you left it.</p>
      <Button href="/" variant="indigo">Back to home</Button>
    </div>
  </section>
</Base>
```

- [ ] **Step 4: Build and verify**

Run: `npm run build && ls dist/contact dist/updates`
Expected: both directories contain an `index.html`.

Then confirm the contact page publishes no invented details:

Run: `grep -c '4000 1234\|hello@indoglobalskills\|Kalina' dist/contact/index.html`
Expected: `0`

- [ ] **Step 5: Commit**

```bash
git add src/pages/contact.astro src/pages/updates src/pages/404.astro
git commit -m "feat: rewrite contact, add empty updates template, retone 404"
```

---

### Task 10: Remove the placeholder site

Every route that replaces a deleted one now exists, so the preschool build can go. This task is deletion only — if anything here breaks the build, it means a link was missed in an earlier task, and the fix belongs in that page rather than in a reinstated file.

**Files:**
- Delete: `src/pages/donate.astro`, `src/pages/teachers.astro`, `src/pages/admissions.astro`, `src/pages/programs/index.astro`, `src/pages/programs/[slug].astro`, `src/pages/blog/index.astro`, `src/pages/blog/[slug].astro`
- Delete: `src/data/programs.js`, `src/data/teachers.js`, `src/data/testimonials.js`, `src/data/tiers.js`, `src/data/posts.js`, `src/data/images.js`
- Delete: `src/components/GivingTiers.astro`, `src/components/ProgramCard.astro`, `src/components/Testimonials.astro`, `src/components/Marquee.astro`, `src/components/Swoosh.astro`, `src/components/BlogCard.astro`
- Modify: `src/styles/global.css` (remove the orphaned rule blocks)

**Interfaces:**
- Consumes: nothing.
- Produces: a `src/` tree containing no reference to the template's imagery, invented people, or fee structures.

- [ ] **Step 1: Confirm nothing imports what is about to go**

Run:

```bash
grep -rn "programs\.js\|teachers\.js\|testimonials\.js\|tiers\.js\|posts\.js\|images\.js\|GivingTiers\|ProgramCard\|Testimonials\|Marquee\|Swoosh\|BlogCard" src/
```

Expected: no output. Any hit is a live import — fix that file before deleting.

- [ ] **Step 2: Delete the files**

```bash
git rm -r src/pages/programs src/pages/blog
git rm src/pages/donate.astro src/pages/teachers.astro src/pages/admissions.astro
git rm src/data/programs.js src/data/teachers.js src/data/testimonials.js src/data/tiers.js src/data/posts.js src/data/images.js
git rm src/components/GivingTiers.astro src/components/ProgramCard.astro src/components/Testimonials.astro src/components/Marquee.astro src/components/Swoosh.astro src/components/BlogCard.astro
```

- [ ] **Step 3: Remove the orphaned CSS**

Delete these rule blocks from `src/styles/global.css`, identified by their section comments: `/* ---------- marquee ---------- */`, `/* ---------- programs ---------- */`, `/* ---------- testimonials ---------- */`, `/* ---------- giving ---------- */`, `/* ---------- blog ---------- */`. Also delete: the `.team`, `.tmember`, `.tmember__photo`, and `.tmember__role` rules; the `.sub` and `.sub__msg` newsletter rules in the footer block; and the `.nav__group`, `.nav__panel`, and `.nav__more` rules, orphaned when Task 4 removed the "All Pages" dropdown.

Then confirm nothing is left dangling:

```bash
for cls in marquee prog__ tcard plan__ bcard tmember sub__ nav__group nav__panel nav__more; do
  echo "== $cls =="
  grep -rn "$cls" src/ || echo "  clean"
done
```

Expected: every group prints `clean`.

- [ ] **Step 4: Verify the build is complete and clean**

Run: `npm run build && ls dist`
Expected: `index.html`, `404.html`, and directories `about`, `focus-areas`, `partner`, `contact`, `updates`. No `programs`, `blog`, `donate`, `teachers`, or `admissions`.

Run: `node scripts/content-guard.mjs dist`
Expected: `Content guard passed — no forbidden claims in dist/.`

If the guard still reports violations, fix the offending page copy. Do not weaken a rule in `scripts/content-guard.mjs` to make the build pass.

- [ ] **Step 5: Verify no template asset survives**

Run: `grep -rn "framerusercontent" src/ dist/ || echo "clean"`
Expected: `clean`

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: remove the placeholder preschool site and its template assets"
```

---

### Task 11: Wire the guard into the build, update the README, verify

The guard is worthless if it only runs when someone remembers. This task makes it part of `npm run verify` and part of deployment, then brings the README in line with what the site now is.

**Files:**
- Modify: `package.json`
- Modify: `.github/workflows/deploy.yml`
- Modify: `README.md` (full rewrite)

**Interfaces:**
- Consumes: `scripts/content-guard.mjs` from Task 1.
- Produces: `npm run verify` — the single command that proves the site is publishable.

- [ ] **Step 1: Add the verify script**

In `package.json`, replace the `"scripts"` block with:

```json
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "test": "node --test tests/",
    "guard": "node scripts/content-guard.mjs dist",
    "verify": "npm test && npm run build && npm run guard"
  },
```

- [ ] **Step 2: Run it**

Run: `npm run verify`
Expected: tests pass, build succeeds, guard prints `Content guard passed`. Exit code 0.

Confirm the guard actually fails the command when it should — this proves the gate is wired, not decorative:

```bash
printf '<p>Registered under Section 8 with 80G approval.</p>' > dist/canary.html
npm run guard; echo "exit=$?"
rm dist/canary.html
```

Expected: two violations reported (`section-8` and `tax-status`) and `exit=1`.

- [ ] **Step 3: Gate deployment on the guard**

In `.github/workflows/deploy.yml`, replace the single `- run: npm run build` line in the `build` job with:

```yaml
      - run: npm test
      - run: npm run build
      - run: npm run guard
```

- [ ] **Step 4: Rewrite the README**

Replace `README.md`:

```markdown
# Indo-Global Skills & Edu Foundation — website

A static site for Indo-Global Skills & Edu Foundation, built with [Astro](https://astro.build).
It presents the organisation's six activity verticals, its leadership, and a single
partnership enquiry route.

## Running it

    npm install
    npm run dev       # dev server
    npm run verify    # tests + build + content guard — run this before pushing

## Content lives in `src/data/`

Edit these, not the pages.

| File | Holds |
|---|---|
| `site.js` | Name, tagline, navigation, contact entries, positioning statements |
| `verticals.js` | The six activity verticals and the permitted status vocabulary |
| `leadership.js` | Named leaders, their roles, and the verticals they lead |

## The content guard

`scripts/content-guard.mjs` scans the built HTML and fails the build if a forbidden
claim appears. It runs in `npm run verify` and in CI before deployment.

It blocks: the company identification number, "Section 8", any 80G / 12A / CSR-1 / FCRA
claim, Kidora template image URLs, leftover preschool vocabulary, the placeholder contact
details, superiority claims, and the fabricated impact figures from the earlier build.

**If the guard fails, fix the copy — do not weaken the rule.** Each rule corresponds to a
claim that has no verified source. Remove a rule only when the underlying document has been
verified and an authorised owner has approved publication.

## Before this goes live

1. **Supply the real contact details.** `site.contact` entries have `value: null` and render
   an honest "being finalised" note. Fill in the email, phone, and office address, and set
   `status` to `'confirmed'`.
2. **Confirm the leadership entries.** The Vice Chairman's name is spelled differently on the
   public company record; the titles come from an internal paper; a third director on the
   record has no vertical assigned. See the comment block in `src/data/leadership.js`.
3. **Wire the enquiry form to a backend.** `/partner` currently tells the visitor plainly that
   nothing was transmitted. Connect a form handler and replace that message with a real
   success and failure state.
4. **Add social links or leave the array empty.** `site.socials` is `[]`; the footer hides the
   block entirely rather than rendering dead icons.
5. **Verify the corporate facts before publishing any of them.** The CIN, incorporation date,
   legal form, registered office, and directors are known only from a third-party registry
   scrape. Check them against the Certificate of Incorporation and current MCA master data.
   See `research-notes.md`.
6. **Decide on photography.** The site currently uses no photographs at all. That is a
   deliberate improvement over the unlicensed template imagery, not an oversight — but real,
   licensed photography of actual work would strengthen it once such work exists.

## Governance documents

These predate this build and still govern it. They describe a Next.js architecture that no
longer exists — read them for the requirements and rules, not as a map of this codebase.

| File | Purpose |
|---|---|
| [Requirement.md](./Requirement.md) | Product requirements, audiences, sitemap, governance, launch gates |
| [project-controls.md](./project-controls.md) | Canonical decisions, CTA map, status vocabulary, owners |
| [content.md](./content.md) | Claim-safety rules and draft copy |
| [research-notes.md](./research-notes.md) | Corporate and design source log — internal only, never publish |
| [design.md](./design.md) | Brand direction and accessibility rules |
| [qa-launch-checklist.md](./qa-launch-checklist.md) | Pre-launch review |
| [implementation-plan.md](./implementation-plan.md), [traceability-matrix.md](./traceability-matrix.md), [IMPLEMENTATION_NOTES.md](./IMPLEMENTATION_NOTES.md) | Delivery notes from the previous build |
```

- [ ] **Step 5: Full verification**

Run: `npm run verify`
Expected: exit code 0.

Then check every internal link resolves. Start the preview and confirm each of these returns a page, not a 404: `/`, `/about`, `/focus-areas`, each of the six `/focus-areas/<slug>` routes, `/partner`, `/contact`, `/updates`.

Then take screenshots of the home page, one focus-area detail page, and the partner page, at desktop (1280px) and mobile (375px) widths. Confirm no horizontal scroll at 375px and no pastel nursery colour anywhere.

- [ ] **Step 6: Commit**

```bash
git add package.json .github/workflows/deploy.yml README.md
git commit -m "chore: gate build and deploy on the content guard, rewrite README"
```

---

## Verification summary

The plan is complete when all of these hold:

- `npm run verify` exits 0.
- `dist/` contains exactly: `index.html`, `404.html`, `about/`, `focus-areas/` (index plus six slugs), `partner/`, `contact/`, `updates/`.
- `grep -rn "framerusercontent" dist/` returns nothing.
- No page mentions the CIN, "Section 8", 80G, 12A, CSR-1, FCRA, a registered address, or a beneficiary count.
- All six verticals render with the status `Proposed`.
- Both leaders appear on `/about` with their roles and their verticals cross-linked.
- The enquiry form states plainly that it cannot deliver a message yet.
- The README's "Before this goes live" list is accurate.

## What this plan does not do

Stated so nobody assumes otherwise:

- **No backend.** The enquiry form still cannot deliver a message. Wiring it needs a form handler, a routing decision, a response SLA, and a retention policy — a separate piece of work.
- **No photography.** The site ships with no photographs. Replacing unlicensed template images with nothing is the honest interim state.
- **No corporate disclosures page.** `Requirement.md` §10.7 specifies one; it stays blocked until the Certificate of Incorporation has been checked.
- **No analytics.** `project-controls.md` requires a consent-aware, no-personal-data setup. Out of scope here.
- **No Hindi or Marathi.** The structure does not obstruct localisation, but no translation work is included.
