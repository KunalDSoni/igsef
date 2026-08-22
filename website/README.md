# Indo-Global Skills & Edu Foundation — website

The public website for a newly established Indian education-and-skills
foundation. Built as a staging-ready application: everything that can be built
without an unresolved external dependency is built, and everything that depends
on one is behind an explicit gate that is documented and switched off.

**This site is not ready to publish.** See
[`NEEDS_CLIENT_INPUT.md`](./NEEDS_CLIENT_INPUT.md) for exactly what is
outstanding, and the launch gates in `../qa-launch-checklist.md`.

## Contents

- [Setup](#setup)
- [Development](#development)
- [Testing and verification](#testing-and-verification)
- [Project structure](#project-structure)
- [Editing content](#editing-content)
- [Publication gates](#publication-gates)
- [The enquiry form](#the-enquiry-form)
- [Design system](#design-system)
- [Configuration](#configuration)
- [Deployment](#deployment)

## Setup

Requires Node.js 20.9 or later.

```bash
npm install
```

Copy the environment template. Every variable is optional — with none set, the
site runs as a staging build that is excluded from search engines and whose
enquiry form is in its unavailable state, which is the intended default.

```bash
cp .env.example .env.local
```

## Development

```bash
npm run dev
```

Opens on <http://localhost:3000>.

To see the enquiry form working end to end with a mocked adapter — useful for
reviewing the validation, error, submitting and success states — run:

```bash
npm run dev:demo
```

That build shows a prominent "Demo mode — submissions are not delivered" banner
on every form. Nothing is transmitted or stored.

## Testing and verification

| Command                      | What it does                                        |
| ---------------------------- | --------------------------------------------------- |
| `npm run format:check`       | Prettier formatting check                           |
| `npm run lint`               | ESLint, including the Next.js core-web-vitals rules |
| `npm run typecheck`          | Strict TypeScript, no emit                          |
| `npm test`                   | Unit and component tests (Vitest + Testing Library) |
| `npm run build`              | Production build                                    |
| `npm run check:build-output` | Scans the built output for blocked content          |
| `npm run test:e2e`           | End-to-end and accessibility tests (Playwright)     |
| `npm run test:a11y`          | Accessibility tests only (axe-core)                 |
| `npm run verify`             | Everything except the end-to-end suite, in order    |
| `npm run screenshots`        | Captures every page at seven widths                 |

Run the whole gate before any handoff:

```bash
npm run verify && npm run test:e2e
```

The end-to-end suite builds and starts two production servers of its own — the
default build on port 3100 and a demo-mode build on port 3101 — so it tests what
a visitor would actually receive rather than the dev server. Playwright browsers
are needed once:

```bash
npx playwright install chromium
```

### What the tests cover

- **Unit and component** — enquiry validation and normalisation, the analytics
  scrubber, rate limiting, publication-safety invariants (no blocked corporate
  value, no template content, no placeholder, gates and content in agreement),
  and the form's accessibility contract.
- **End-to-end** — every route and its status, link integrity (no dead,
  circular, `#` or "learn more" links), gated content and indexing, the branded
  404, the mobile menu's focus behaviour, the accordion, the server route's
  validation, honeypot and rate limiting, security headers, reflow at seven
  widths, 200% zoom, text-spacing overrides, touch targets, reduced motion, and
  the site working with CSS removed.
- **Indexing** — both deployment stages, exercised by re-importing the metadata,
  sitemap and robots modules under each environment: a staging build is entirely
  `noindex` with an empty sitemap, and a production build indexes only routes
  whose gate is open while disallowing the rest in `robots.txt` as well.
- **Accessibility** — axe-core against every page template, the open mobile
  menu, and the form's error and success states. Automated results are a floor,
  not evidence of conformance; see `/accessibility` for what has and has not
  been tested.

### Screenshots

```bash
npm run dev          # in one terminal
npm run screenshots  # in another
```

Writes to `screenshots/<viewport>/<page>.png` at 1440, 1280, 768, 390 and 320
pixels, and fails if any page scrolls horizontally.

## Project structure

```text
src/
  app/                 Routes (App Router). Server Components by default.
    api/enquiry/       Enquiry submission endpoint
    layout.tsx         Shell: fonts, header, footer, skip link, metadata
    sitemap.ts         Gate-aware sitemap
    robots.ts          Gate-aware robots rules
    opengraph-image.tsx  Social card, generated at build time
  components/
    layout/            Container, Section
    ui/                Buttons, cards, grid, notices, chips, accordion, …
    content/           Page-level composites: heroes, cards, CTA band, …
    form/              Enquiry form and its field primitives
    graphics/          Decorative "pathways" SVGs
    site/              Header, footer, wordmark, skip link, navigation
  config/
    site.ts            Names, routes, canonical CTA map, stage
    features.ts        Publication gates
    cta.ts             The gated primary action
  content/             The typed content layer (see below)
  lib/
    enquiry/           Schema, delivery adapter, rate limiting, mode
    analytics.ts       Event adapter (off by default)
    seo.ts             Metadata and structured data helpers
    fonts.ts           Self-hosted fonts
    format.ts          Date formatting
  styles/tokens.css    Every design token
  fonts/               Self-hosted woff2 files (OFL 1.1)
tests/
  unit/                Vitest
  e2e/                 Playwright
scripts/               Screenshots, build-output scan
```

## Editing content

All content lives in `src/content/` as typed records that mirror the CMS
collections required by `../Requirement.md` §12.1. The shape and the controlled
vocabulary are deliberately the ones an editor would see in a CMS, so moving to
a headless CMS later is a transport change rather than a remodelling exercise.

| File             | Collection                                            |
| ---------------- | ----------------------------------------------------- |
| `types.ts`       | Field types and the controlled vocabulary             |
| `copy.ts`        | Page copy, transcribed from `../content.md`           |
| `focus-areas.ts` | Focus Areas / Programmes                              |
| `updates.ts`     | Updates / Resources                                   |
| `faqs.ts`        | FAQs                                                  |
| `disclosures.ts` | Corporate identity fields and documents               |
| `settings.ts`    | Global settings: contacts, social links, announcement |
| `team.ts`        | Team Members and Partners (both disabled)             |

### Adding a focus-area detail page

1. In `src/content/focus-areas.ts`, fill in `body`, `eligibility` and
   `costStatement` for the record.
2. Set `status` to the value the programme owner has approved.
3. Set `hasApprovedDetail: true` and `editorialState: "Approved"`.
4. Update `reviewDate` and add the evidence `claimIds`.

The detail route, the card's "View focus area" link and the sitemap entry all
appear automatically. Until then the route returns a 404 by design, so a draft
cannot be reached by guessing a slug.

### Adding the first update

1. Append a record to `updates` in `src/content/updates.ts` with
   `editorialState: "Approved"`.
2. Set `features.updates` to `true` in `src/config/features.ts`.

Both steps are required: the record controls what is rendered, the flag controls
navigation, indexing and the Home module.

### Content rules

The organisation is newly established. Copy defaults to future-facing tense
("aims to", "intends to", "proposed"). Do not describe planned work as delivered,
a target as a result, or an association as a partnership. `../content.md` §17 is
the editor's checklist.

## Publication gates

`src/config/features.ts` holds every gate. Each is `false` because a specific
external dependency is unresolved, and each carries a comment naming that
dependency. Flipping one is a publication decision.

| Gate                   | What it controls                                              | Blocked on                                 |
| ---------------------- | ------------------------------------------------------------- | ------------------------------------------ |
| `updates`              | Updates in navigation, Home module, indexing                  | One approved update                        |
| `corporateDisclosures` | The disclosures page, footer identity block, every link to it | Verified incorporation records             |
| `leadership`           | Leadership profiles on About                                  | Approved names, bios, photo consent        |
| `partners`             | Partner names and logos                                       | A documented relationship                  |
| `publicContactDetails` | Email, phone, address, alternative contact                    | An approved monitored contact              |
| `legalPagesApproved`   | Removes the draft notice, allows indexing                     | Legal review                               |
| `analytics`            | Any analytics dispatch                                        | Analytics owner, consent design, retention |
| `consentUi`            | A cookie choice UI                                            | Only if an optional tracker is added       |
| `publishedSla`         | The "Discuss a partnership" CTA and response-time wording     | A named owner who can meet the SLA         |

While `publishedSla` is false, every primary call to action resolves through
`primaryAction()` in `src/config/cta.ts` to "Explore partnership routes" instead
of the canonical "Discuss a partnership", because
`../project-controls.md` §3 permits that label only once form routing and the
SLA pass.

## The enquiry form

The form is for adults aged 18 or older. It collects enquiry type, name, email,
optional organisation and role, subject, message, and an adult self-attestation.
There is no phone field, no date of birth, and nothing that would collect
identity documents, financial data, health, caste, education records or
information about children.

It has three modes, decided on the server:

| Mode          | When                                               | Behaviour                                                 |
| ------------- | -------------------------------------------------- | --------------------------------------------------------- |
| `unavailable` | `ENQUIRY_ENDPOINT` unset (the shipped state)       | Fields disabled, an explanation of why, nothing submitted |
| `demo`        | `ENQUIRY_TEST_MODE=true` on a non-production build | Mocked adapter, prominent demo banner                     |
| `live`        | `ENQUIRY_ENDPOINT` set                             | Posts to the configured provider                          |

`ENQUIRY_TEST_MODE` is refused when the stage is `production`, so a mocked
success can never reach a real visitor.

Submitted values never enter a URL, a log, an error message, a notification
subject line or an analytics event. The notification subject is built from the
routing category alone. The endpoint applies a honeypot check, then a hashed,
in-process rate limit, then full server-side validation — the client's result is
never trusted.

Before switching delivery on, resolve everything in `NEEDS_CLIENT_INPUT.md`
under "Form and enquiry handling".

## Design system

The visual language adapts the Kidora Framer template referenced in
`../design.md`: the warm cream canvas, deep-purple pill actions, mint, lavender
and pale-yellow card surfaces, oversized editorial headings, rounded modules and
asymmetric grids are retained. The preschool positioning, imagery, motifs and
copy are not — they are replaced by a "pathways in motion" language of connecting
curves, nodes and steps.

Every colour, size, radius, shadow and duration is a token in
`src/styles/tokens.css`. Component styles are CSS Modules that reference those
tokens; there are no ad-hoc hex values or magic numbers in component stylesheets.

No photography is used. None has been cleared for production, and synthetic
people must never stand in for beneficiaries, so the hero and every decorative
graphic are built from CSS and inline SVG. They add no image request and no
layout shift, and the pages remain legible if they fail to render.

Two self-hosted variable fonts, Plus Jakarta Sans (600–800) for headings and
Nunito Sans (400–700) for body copy, both SIL Open Font License 1.1. They are
committed to `src/fonts/` and loaded with `next/font/local`, so the site makes no
runtime request to Google Fonts or any other third-party host.

## Configuration

See `.env.example` for every variable and what must be true before setting it.
Nothing in the repository contains a secret, a personal detail or an unverified
corporate fact.

## Deployment

**Do not deploy to a production domain yet.** The corporate, legal, privacy,
contact, form-routing, retention, vendor, domain, asset-rights and
accessibility-review gates in `../qa-launch-checklist.md` are unresolved.

For an internal staging deployment:

1. Build with `NEXT_PUBLIC_SITE_STAGE` unset or set to `staging`. Every page is
   then `noindex`, `robots.txt` disallows all crawling, and the sitemap is empty.
2. Put the deployment behind access control if the host supports it.
3. Run `npm run check:build-output` against the build before publishing it
   anywhere.

The site is a standard Next.js application and runs anywhere Next.js 16 runs. It
is almost entirely statically generated; only `/api/enquiry` is dynamic.
