# Implementation notes

Companion to the blueprint. The blueprint documents at this level are unchanged;
this file records what was built, what was audited, what was decided, and where
the source documents disagreed with each other.

Date: 22 August 2026
Status: staging build, not published

---

## 1. What was built and where

The blueprint stays at the repository root. The application lives in
[`website/`](./website), built as a Next.js 16 App Router project with strict
TypeScript, CSS Modules and design tokens, and no CSS or component framework.

Read [`website/README.md`](./website/README.md) for setup, development, testing,
content editing and deployment, and
[`website/NEEDS_CLIENT_INPUT.md`](./website/NEEDS_CLIENT_INPUT.md) for every
unresolved external input.

`research-notes.md` stays at the repository root as supplied. It is outside the
application directory, so it is not part of any build. A unit test and a
build-output scan both assert that its candidate corporate values never reach the
application source, the browser bundle or the generated HTML.

## 2. Reference-design audit

Attempted, in the order the brief specified.

| Source | Result |
| --- | --- |
| The supplied Framer project URL | **Not accessible.** Redirects to a Framer sign-in screen. No credentials were supplied and none were sought. |
| Kidora marketplace listing | Not opened; the public demo gave the same information more directly. |
| Kidora public demo | **Accessible.** Audited at desktop and small viewport widths. |

Measured from the live public demo and used to confirm the specification in
`design.md` §4–§6:

- Canvas `#FCFAED`; actions `#520080`; card surfaces `#D7FDCF`, `#EBE1FD`,
  `#FEEECD`; accents `#FCB520`, `#09D89A`. Every value matches `design.md` §4
  exactly.
- Plus Jakarta Sans at weight 700 for headings; Nunito Sans at 400 for body.
- Pill actions at 50px radius and ~53px height; card radii between 20px and 42px;
  container max-width 1300px with text columns of 600–620px.
- Hero composition: full-bleed photograph, dark overlay, oversized left-aligned
  white headline, pill call to action, ticker strip beneath.

**Access limitation.** Because the supplied project could not be opened, no delta
audit was possible between it and the public template. If the client's copy
differs from the public demo, those differences are not reflected here. The
adaptation follows the baseline in `design.md`, which the brief states is
authoritative for exactly this situation. To close it, supply a public preview
URL, view access, or full-page desktop and mobile screenshots.

**This is a coded reimplementation, not a Framer project.** It cannot be imported
into Framer. The visual language is adapted; no Kidora asset, copy, component or
markup is used, and a build-output scan enforces that.

## 3. Discrepancies between blueprint documents

Resolved in favour of the higher-precedence document in each case, as the brief
requires. None changed the scope of the build.

**1. Focus-area card grid — `design.md` §8.1 vs §8.3.**
The Home wireframe shows four focus-area cards across one row; the Focus Areas
page specifies three columns at desktop. With exactly four records, either rule
alone strands the fourth card alone on a second row.

*Resolution:* a deliberate two-by-two layout for the four pillars on both pages.
It honours the intent of both rules — the set reads as one balanced group, and
each card keeps an editorial measure. The three-column rule applies once the
collection grows beyond four. `Requirement.md` §10.1 requires "four focus-area
cards", which is satisfied.

**2. Header primary CTA — `Requirement.md` §8.1 vs `project-controls.md` §3.**
The requirements list "Discuss a partnership" as part of the standing primary
navigation; the controls document permits that exact label and its
`/partner-with-us#enquiry` destination **only after form routing and the response
SLA pass**. Neither exists.

*Resolution:* the canonical label and destination are withheld. Every primary
call to action resolves through `primaryAction()` to "Explore partnership
routes" → `/partner-with-us`, which works and leads somewhere meaningful. The
canonical CTA activates everywhere at once when `features.publishedSla` opens.
`project-controls.md` §3 is explicit about the availability rule, and
`Requirement.md` §8.1 does not contradict it — it describes the launched state.

**3. Contact page structure — `Requirement.md` §10.6 vs `content.md` §11.2.**
The requirements list a response expectation and public contact details as
required sections; the copy deck renders them as bracketed placeholders awaiting
approval.

*Resolution:* the sections are built and gated. While no contact is approved, the
page states plainly that none has been published and why, rather than showing a
placeholder or an unmonitored address. `content.md` §19 forbids placeholders in
live copy.

**4. FAQ placement.**
`content.md` §13 defines eight FAQs but no document says where each belongs.

*Resolution:* programme and governance questions on Focus Areas; partnership and
funding questions on Partner With Us. The registration question is gated on
verified corporate facts. The safeguarding question is not built at all — no
safeguarding policy exists, and a reassuring answer with nothing behind it would
be worse than its absence.

## 4. Decisions recorded

| ID | Decision | Reason |
| --- | --- | --- |
| DEC-001 | Next.js 16 App Router, strict TypeScript, CSS Modules, npm | The repository held documentation only, so §4 of the brief applies. Framer is provisional pending the Phase 0 go/no-go; a coded build keeps the requirements, copy and design direction portable either way. |
| DEC-002 | No photography anywhere | None is cleared for production and synthetic people must never stand in for beneficiaries. The hero and every decorative graphic are built from CSS and inline SVG: no image request, no layout shift, and the page stays legible if they fail. |
| DEC-003 | Typographic wordmark, no acronym | `design.md` §3.1 forbids launching a short name before trademark and confusion checks. The mark sets the full approved name across two lines. |
| DEC-004 | Fonts self-hosted from the repository | Both families are SIL Open Font License 1.1. Committed as woff2 and loaded with `next/font/local`, so no third-party host appears in the waterfall and no runtime request leaks visitor data. |
| DEC-005 | Indexing is opt-in | A page is indexable only when the build is marked production *and* its own gate is open. Staging disallows all crawling and produces an empty sitemap. No accidental exposure is possible from a default configuration. |
| DEC-006 | The enquiry form ships fully built but disabled | The UI, validation, error states, honeypot, rate limiting and server route are complete and tested. Delivery is off until a provider, routing owner, SLA and retention rule exist. The form says so rather than accepting data nobody can handle. |
| DEC-007 | No cookie banner | The site sets no cookie of its own, runs no analytics and loads no third-party resource. `content.md` §16 forbids a performative banner offering a choice that does not exist. The Privacy Notice explains this. |
| DEC-008 | `WebSite` structured data only | `Requirement.md` §15.2 permits Organisation schema only with verified facts. Until the corporate gate opens the site emits no legal name, registration number, address or `sameAs` profile. |
| DEC-009 | Owners recorded as roles, not names | No individual has been assigned to any role. Role names are honest placeholders in an internal field; they are replaced with real names once assigned. |
| DEC-010 | Native `<dialog>` for the mobile menu | Gives focus containment, Escape, background inertness and focus restoration from the platform rather than a hand-rolled trap. The footer carries the full navigation, so every route stays reachable if the menu's JavaScript fails. |

## 5. Verification performed

See the final section of `website/README.md` for the commands. All of the
following were run against this build:

- Prettier format check, ESLint, strict TypeScript — clean.
- 85 unit and component tests.
- 152 end-to-end and accessibility tests across three Playwright projects
  (desktop default, mobile, and a demo-mode server), all against production
  builds rather than the dev server.
- axe-core against every page template, the open mobile menu, and the form's
  error and success states.
- Production build, followed by a scan of the built HTML, CSS and JavaScript for
  blocked corporate values, unrelated-organisation references, template content,
  internal placeholders and private research material.
- Screenshots at 1440, 1280, 768, 390 and 320 pixels, with an automated
  horizontal-overflow check at each width.

Not performed, and not performable in code — listed in
`website/NEEDS_CLIENT_INPUT.md` §11: independent accessibility review, testing
with assistive-technology users, formative usability testing, production Core Web
Vitals field data, a security-header scan against a real domain, and a tested
backup and rollback procedure.
