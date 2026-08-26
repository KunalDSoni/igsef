# Indo-Global Skills & Edu Foundation — website

Live site: [kunaldsoni.github.io/igsef](https://kunaldsoni.github.io/igsef/)

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
