# Indo-Global Skills & Edu Foundation — website

A static website for Indo-Global Skills & Edu Foundation, built with
[Astro](https://astro.build). The visual design is a clone of the
[Kidora](https://www.framer.com/community/marketplace/templates/kidora/) Framer
template, adapted from a fee-paying preschool to a donor-funded NGO.

This replaces an earlier Next.js implementation that lived at `website/` (see
"History" below) — that build was more compliance-rigorous but is no longer part
of the repo.

## Read this first — corporate facts are not verified

This is a real, newly-registered organisation, not a fictional placeholder. The
supplied corporate details have secondary corroboration only and are **not ready
to publish** without source-document approval:

- The supplied CIN is `U85499MR2026NPL479632`. Do not alter it, and do not treat
  it as confirmed — verify against the Certificate of Incorporation / current MCA
  record before it appears anywhere public.
- Incorporation date, legal name, company status, Section 8/non-profit status,
  registered office, and directors must all be checked against the MCA Certificate
  of Incorporation and current Company Master Data before publication.
- Similarly named summits, institutions, colleges, or foundations must never be
  shown as partners, affiliates, or endorsers unless a documented relationship
  exists.

Full detail is in `Requirement.md` §3.1 and `research-notes.md`, both still in
this repo. Treat the corporate-disclosure block as **blocked for publication**
until an authorised representative signs off on the source documents.

## Running it

```bash
npm install
npm run dev      # dev server
npm run build    # static output to dist/
```

## Layout

```
src/
  data/          content — edit these, not the pages
    site.js        org name, nav, contact details, headline stats
    images.js      every image URL in one place
    programs.js    programmes + their detail-page copy
    teachers.js    staff
    posts.js       blog posts + bodies
    testimonials.js
    tiers.js       giving tiers
  layouts/Base.astro    <head>, header, footer, page scripts
  components/           Header, Footer, ProgramCard, GivingTiers, CTA, …
  styles/global.css     design tokens + all styling
  pages/                11 routes → 15 built pages
```

Pages: Home · About · Programs (+ 3 detail pages) · Teachers · Admissions ·
Blog (+ 3 posts) · Ways to give · Contact · 404.

## Design tokens

Measured from the Kidora template rather than approximated.

| | |
|---|---|
| Display | Plus Jakarta Sans — h1 72/700, h2 56/700, h3 44/600 |
| Body | Nunito Sans 16/600 |
| Colours | cream `#FCFAED` · peach `#FEEECD` · mint `#D7FDCF` · lavender `#EBE1FD` · amber `#FCB520` · purple `#520080` · teal `#09D89A` |
| Radii | 20px cards · 100px pills · 40px blocks |

## Before this goes live

1. **Images are placeholders.** `src/data/images.js` points at the Kidora template's
   CDN assets so the layout reads correctly. They are not licensed for this site —
   replace every value with real or licensed photography.
2. **Most content is still invented.** The founding story, headcounts, staff,
   testimonials, and giving amounts in `src/data/` are placeholder content written
   to make the layout read correctly, not real facts about this organisation. See
   `content.md` for the claim-safety rules that should govern the real copy.
3. **Registration status is unresolved** — see "Read this first" above.
   `src/data/site.js`'s `regNumber` field currently says registration details are
   pending rather than asserting an unverified number or tax-exempt status. Do not
   change that until it's actually confirmed.
4. **Forms have no backend.** The contact form and newsletter signup say so on
   screen rather than pretending to submit. Wire them to a form handler.
5. **Positioning may not match the brief.** `design.md` specifies this should read
   as a credible institution for adult learners, educators, employers, and funders
   — not a preschool. This build is still visually and structurally closer to a
   kindergarten site (ages 3–12 programmes, "teachers," playroom photography),
   carried over from the Kidora template it was cloned from. Decide whether to
   retarget the content before this goes further.

## History

An earlier, more compliance-rigorous implementation lived at `website/` — a
Next.js app with lint/typecheck/unit/e2e/accessibility tests and a build-time
scan that enforced unverified corporate facts (like the CIN above) never reached
the compiled HTML. It was replaced by this Astro build. The planning documents
that governed it are still here and still apply to this build:

| File | Purpose |
|---|---|
| [Requirement.md](./Requirement.md) | Product requirements, audiences, sitemap, functional/non-functional requirements, governance, acceptance criteria, launch gates |
| [design.md](./design.md) | Brand direction, design tokens, responsive layouts, components, accessibility rules |
| [content.md](./content.md) | Draft page copy, content inventory, claim-safety rules, metadata, forms |
| [implementation-plan.md](./implementation-plan.md) | Delivery phases, responsibilities, dependencies, estimates |
| [qa-launch-checklist.md](./qa-launch-checklist.md) | Pre-launch review for content, design, accessibility, privacy, forms, analytics, SEO, security, operations |
| [research-notes.md](./research-notes.md) | Corporate/design source log, confidence labels, licence notes, unresolved verification items — never publish alongside the site |
| [traceability-matrix.md](./traceability-matrix.md) | Requirement-to-build-to-test mapping |
| [project-controls.md](./project-controls.md) | Canonical decisions, CTA map, owners, KPIs, platform feasibility |
| [IMPLEMENTATION_NOTES.md](./IMPLEMENTATION_NOTES.md) | Notes from the previous implementation |

These docs describe the Next.js build's architecture in places (content
collections, feature flags, `src/content/disclosures.ts`) that no longer exist —
read them for the requirements and governance rules, not as a literal map of
this codebase.

## Design preview

`design-preview/` holds the original standalone HTML mockup used to approve the
design before the Astro build. Kept for reference; not part of the site.
