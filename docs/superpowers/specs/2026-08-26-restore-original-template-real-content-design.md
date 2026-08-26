# Restore Original Template, Fit Real Content — Design

## Context

A prior rebuild (merged to `main` at `e05864c`) replaced the site's original visual
template — the one shipped in commit `f9d1125` — with a plainer, minimal design of
its own invention. That was a mistake: the brief was to feed real organisational
content into the existing, already-good-looking template, not to redesign it.

This spec reverses that error. The original template (components, layout, section
order, card styles) is treated as fixed and correct. The only work is: swap every
piece of preschool copy and stock imagery for real Indo-Global Skills & Edu
Foundation content, and honestly handle the handful of slots that have no true
answer yet (stats, testimonials, donations) because the organisation has no
delivery history.

Source of truth for real content: `src/data/verticals.js` and `src/data/leadership.js`,
already built and verified against the board's "Comprehensive Activity Verticals"
strategy paper in a prior session. Reuse them as-is — do not re-derive.

## Approach

Two things are being restored, and they are independent axes:

1. **Structure** — components, section order, card layouts, page templates.
   Pulled from `f9d1125`. Never redesigned.
2. **Content** — every word and image. Comes from `verticals.js`, `leadership.js`,
   `site.js` (rewritten), and honest new copy. Never a fabricated number, quote,
   or claim — the guard script (`scripts/content-guard.mjs`) still enforces this
   and stays wired into `npm run verify`.

## Palette

The original template used a fixed 3-tone accent system: cards, badges, and
section tints each carry one of three colours (mint / lavender / peach, with
amber and purple as secondary accents). That *pattern* — "each card gets one of
three rotating accent tones" — is structural and stays. The specific colours do
not fit an institutional foundation, so they are remapped:

| Original token | Real-brand replacement |
|---|---|
| `--mint` | `--teal` |
| `--lav` (lavender) | `--indigo` |
| `--peach` | `--saffron` |
| `--amber` | `--saffron-deep` (new, darker saffron for text-weight uses) |
| `--purple` (buttons/CTAs) | `--indigo` |
| `--cream` (section tint) | keep as a warm neutral, or replace with a light indigo/teal tint — implementer's call, must pass contrast |

Contrast rules from the prior rebuild still apply: `--teal` only for text ≥24px
or ≥18.66px bold or graphics; body-size text uses a darker teal; saffron is
graphics-only, never text on a light background. Re-verify every recoloured
component against these rules — the original template's contrast was tuned for
its own (different) colours and cannot be assumed safe.

## Images

The original template hotlinked stock photography of preschool children from
`framerusercontent.com`. None of it can be reused — wrong subject, and the
organisation has no real campus/programme photography yet because nothing has
run. Every image slot in the layout stays (hero background, about-photo,
why-choose-us photo, showcase banner, features photo, program-detail photo,
leadership avatar) but is filled with an abstract/pattern graphic in the brand
palette instead of a photo of people or a claimed real place. No stock photography
of unrelated people, places, or classrooms — that would be the same fabrication
problem in a different medium.

Leadership cards use an icon/initial avatar in the accent colour, not a photo —
matching the existing `leadership.js` decision to omit invented photos.

## Content mapping

### Homepage (`index.astro`)

| Original section (kept) | Real content |
|---|---|
| Hero — photo bg, h1, sub, CTA | Real proposition headline (from `positioning.proposition`), real blurb, CTA → "Discuss a partnership" (`/partner`) |
| Marquee band | Real tagline, e.g. "Learning, skills, and opportunity" |
| About grid + statement | Real "who we are" statement (from existing About page copy) |
| Stats block | **Removed.** No invented numbers. |
| About-cards (3 tone cards with icon + wave) | Repurposed as honest capability statements — reuse the existing "Verified before visible / Built with institutions / Judged on what follows" three commitments, in this card style instead of the plainer `.pcard` style built previously |
| Why-choose-us split (photo + 2×2 feature pairs) | Real differentiators — draw from existing About/positioning copy; four short feature pairs replacing "Caring space / Fun learning / No fees / Trained teachers" |
| Philosophy pillars (3-card rail) | Fold into the about-cards slot above rather than duplicating — **do not** carry two near-identical three-card sections; pick one, drop the other, note the choice in the report |
| Showcase photo band | Abstract graphic, real caption (e.g. "How we work") |
| Second marquee | Real tagline variant |
| Programs section (`ProgramCard` grid + "View all" button) | **The six activity verticals**, `ProgramCard`-style cards, button → `/focus-areas` |
| Features grid + photo | Real differentiators, CTA → "Discuss a partnership" (not "Sponsor a child") |
| Testimonials | **Removed.** No delivery history to quote yet. |
| Giving tiers | **Removed.** No individual-donation ask; partnership is the real call to action. |
| Blog grid | Reused for **Updates** — real empty-state copy if no update exists yet, matching the honest-empty-state pattern already used on `/updates` |
| Final CTA | "Discuss a partnership" → `/partner` |

### Other pages — reuse the original page *template*, replace the content

| Original page/template | Becomes | Content source |
|---|---|---|
| `/programs` (`ProgramCard` grid + PageHero + CTA) | `/focus-areas` | Six verticals from `verticals.js` |
| `/programs/[slug]` (photo + prose + numbered outcome steps) | `/focus-areas/[slug]` | Per-vertical `intro`, `activities`, `audiences`, `engagement` from `verticals.js` |
| `/teachers` (team grid, photo + name + role + bio) | `/leadership` | `leadership.js` — icon avatar instead of photo, `name`/`role`/`remit`, linked verticals |
| `/admissions` (4-step process + FAQ) | `/partner` | Real partnership steps (already drafted in current `/partner`), real FAQ replacing enrolment FAQ |
| `/donate` (giving tiers + spend breakdown) | **Removed entirely.** No route. | — |
| `/blog` + `/blog/[slug]` | `/updates` | Empty-state page, same grid layout, ready for a real post |
| `/about` | `/about` | Keep the why-photo/story split layout structurally; replace founding-story copy and the fabricated "milestones" (2,400 children, 96% attendance) with the existing honest stage-of-growth copy, restyled into the original layout instead of the plainer one built previously |
| `/contact` | `/contact` | Content already correct (honest pending-fields handling) — apply the restored palette/section styling, no structural change needed |
| `/404` | `/404` | Content already correct — restyle only |

### Navigation

Nav restructures to point at the renamed routes: Home, About, Focus areas,
Partner with us, Contact — same five entries the current site already has.
`/donate` and `/teachers`-as-team-of-educators drop out of nav (leadership
moves under About or its own top-level entry — implementer's call, consistent
with a five-item nav).

## What does not change

- `astro.config.mjs` base path (`/igsef`) and `src/lib/url.js` — this was a real
  deployment fix, not a template choice.
- `scripts/content-guard.mjs` and its wiring into `npm run verify` — still the
  gate against fabricated claims, now more load-bearing than before since we're
  reintroducing a much larger, richer template with more copy surface area.
- `src/data/verticals.js`, `src/data/leadership.js` — verified content, reused
  as-is.
- The favicon (already rebuilt from the real logo in a prior session) — keep.
- Heading-level discipline (no skips) — the original template was not audited
  for this; every restored page must still produce a clean h1→h2→h3 outline,
  same as the rest of this project's standard.

## Testing

- All existing content-guard tests (`tests/content-guard.test.js`,
  `tests/data.test.js`) continue to pass unchanged — they test data modules,
  not page markup, and those modules are untouched.
- Guard (`node scripts/content-guard.mjs dist`) must report zero violations
  against the restored, much larger page bodies — most of the tests written to
  date. This is the highest-risk area: 8 pages of new copy volume with more
  editorial surface for something to slip past the guard's regex.
- Contrast re-verification for every recoloured component (see Palette section).
- No horizontal scroll at 375px, same as prior standard.
- Heading-level check per page, same as prior standard.

## Self-review

- **Placeholder scan:** none — every section above states the actual replacement
  content or an explicit removal decision.
- **Consistency check:** the About page's about-card style and the homepage's
  philosophy-pillar style are near-duplicates in the original template; the plan
  must pick one and say so explicitly per page rather than leaving both.
- **Scope:** this is one coherent unit of work (restore-and-refill), sized for a
  single implementation plan, though it will have more tasks than the size of
  the diff suggests because it touches every page.
- **Ambiguity:** "cream" section tint and nav placement of leadership are left
  as implementer judgement calls, flagged above, because they don't affect
  correctness — pick a reasonable answer and move on.
