# Restore Original Template With Real Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring back the original template's visual richness (hero, marquee, about-cards, why-choose-us split, showcase band, rich two-column program cards, team grid, FAQ) that a prior rebuild wrongly stripped out, and fill every section with real Indo-Global Skills & Edu Foundation content instead of preschool copy or invented numbers.

**Architecture:** Additive CSS restoration (Task 1) brings back the original template's section styles, recoloured from the preschool palette (mint/lavender/peach/amber/purple) to the real brand palette (teal/indigo/saffron) already defined in `src/styles/global.css`. Component restoration (Tasks 2-3, 6) brings back `Marquee`, `Swoosh`, and a richer `ProgramCard`, plus a new `LeaderCard`. Page rewrites (Tasks 4-5, 7-9) slot real content — the six verticals, the two leaders, the honest positioning language already written in a prior session — into the restored layout. No stock photography anywhere: every original photo slot becomes an abstract brand-colour graphic, because the organisation has no real campus or programme photography yet.

**Tech Stack:** Astro 5.18.2, plain CSS custom properties, no new dependencies.

## Global Constraints

- No stock photography or photos of people anywhere. Every restored photo slot (`hero__bg`, `about__cards` photo card, `why__photo`, `showcase`, `feats__photo`, `prog__media`, `tmember__photo`) becomes an abstract SVG/gradient graphic in the brand palette, never an `<img>` of a person or claimed real place.
- Colour tokens: use only what's already defined in `src/styles/global.css` (`--canvas`, `--indigo`, `--teal`, `--teal-deep`, `--mist`, `--saffron`, `--tint-indigo`, `--tint-teal`, `--tint-saffron`, `--grey`, `--ink`, `--white`, `--line`). Never add a new literal colour or reintroduce the old `--mint`/`--lavender`/`--peach`/`--amber`/`--purple`/`--cream` tokens.
- Contrast: `--teal` only for text ≥24px or ≥18.66px bold, or for graphics; `--teal-deep` for body-size teal text; `--saffron` is graphics-only, never text on a light background. `--indigo` is safe as text at any size (it is the existing primary action/heading colour).
- Every internal `href`/`src` goes through `url()` from `src/lib/url.js`.
- Never publish: a registration number, an incorporation date beyond the year, "Section 8", any 80G/12A/CSR-1/FCRA claim, a registered office address, beneficiary counts, placement rates, partner logos, testimonials, or superiority claims. No fabricated statistics of any kind (no "2,400 children", no invented percentages).
- No newsletter/subscribe form and no individual-donation ask anywhere — the real conversion action is the partnership enquiry (`/partner`), already built and working.
- Heading levels must not skip (h2 → h3 only, never h2 → h4) on every page touched.
- No horizontal scroll at 375px viewport.
- `npm test` → 26/26 tests pass throughout (the data modules being tested are not touched).
- `npm run build` → succeeds; `node scripts/content-guard.mjs dist` → zero violations; `npm run verify` → succeeds.
- Source of truth for real content: `src/data/verticals.js` (six verticals), `src/data/leadership.js` (two leaders), `src/data/site.js` (`positioning`, `site.blurb`, `nav`). These files are correct and already verified against the source strategy paper — do not modify their content, only reference them.

---

### Task 1: CSS foundation — restore and recolour the original template's section styles

**Files:**
- Modify: `src/styles/global.css` (append new rule blocks; do not touch the existing `:root` token block or any currently-used rule)

**Interfaces:**
- Produces: the following classes, all consumed by later tasks — `.hero` (photo/overlay variant, distinct from the existing `.hero--plain`), `.hero__bg`, `.hero__bg-graphic`, `.marquee`, `.marquee__track`, `.marquee__item`, `.about__grid`, `.about__statement`, `.about__faces`, `.acard`, `.acard--teal`, `.acard--indigo`, `.acard--saffron`, `.acard__icon`, `.acard__wave`, `.why`, `.why__photo`, `.why__graphic`, `.why__feats`, `.feat`, `.feat__sep`, `.showcase`, `.showcase__graphic`, `.showcase__in`, `.feats`, `.feats__photo`, `.feats__graphic`, `.feats__grid`, `.fcard`, `.prog`, `.prog--teal`, `.prog--indigo`, `.prog--saffron`, `.prog__body`, `.prog__num`, `.prog__foot`, `.prog__media`, `.prog__graphic`, `.team`, `.tmember`, `.tmember__avatar`, `.tmember__body`, `.tmember__role`, `.faq`.

- [ ] **Step 1: Append the hero (overlay/photo variant) rules**

The current file only has `.hero--plain` (flat gradient, used by the interim homepage). This restores the original rich hero — same structure as `f9d1125`'s `.hero`, but the background is an abstract gradient graphic instead of a stock photo, and the headline no longer clamps to a cramped `12ch` (a bug flagged in a prior review of this project — the original template's `max-width: 12ch` squeezed a 12-word headline into 6 lines).

Append to `src/styles/global.css`:

```css
/* ---- hero: overlay variant (photo/graphic background, dark nav sits on top) ---- */
.hero { position: relative; min-height: 620px; display: flex; align-items: center; padding: 170px 0 90px; overflow: hidden; }
.hero__bg { position: absolute; inset: 0; }
.hero__bg-graphic {
  position: absolute; inset: 0;
  background:
    radial-gradient(circle at 15% 20%, rgba(19,138,138,.55), transparent 55%),
    radial-gradient(circle at 85% 75%, rgba(230,154,46,.35), transparent 50%),
    linear-gradient(160deg, #173B70 0%, #0E2549 100%);
}
.hero__bg::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(14,37,73,.25), rgba(14,37,73,.65)); }
.hero__inner { position: relative; z-index: 2; width: 100%; color: var(--white); }
.hero h1 { color: var(--white); }
.hero__sub { color: rgba(255,255,255,.88); max-width: 46ch; margin: 20px 0 30px; font-size: 15px; }
.hero .swoosh { color: var(--saffron); }
.hero .eyebrow { color: rgba(255,255,255,.85); }
```

- [ ] **Step 2: Append the marquee band rules**

```css
/* ---- marquee: scrolling tagline band ---- */
.marquee { background: var(--tint-teal); overflow: hidden; padding: 20px 0; }
.marquee__track { display: flex; gap: 44px; width: max-content; animation: slide 26s linear infinite; }
.marquee__item { display: flex; gap: 44px; align-items: center; padding-right: 44px; font-family: var(--display); font-weight: 700; font-size: 20px; white-space: nowrap; }
.marquee svg { width: 22px; height: 22px; color: var(--teal); flex: none; }
@keyframes slide { from { transform: translateX(0); } to { transform: translateX(-50%); } }
```

- [ ] **Step 3: Append the about-grid/statement/cards rules**

The original `about__cards` row was two tone cards plus a photo card. With no stock photography, this becomes three tone cards (teal/indigo/saffron) instead of two-plus-photo.

```css
/* ---- about: statement + three-tone card row ---- */
.about__grid { display: grid; grid-template-columns: 260px 1fr; gap: 40px; align-items: start; }
.about__statement { font-family: var(--display); font-size: clamp(26px,3.4vw,44px); font-weight: 600; line-height: 1.28; }
.about__faces { display: inline-flex; vertical-align: middle; margin-left: 10px; }
.about__faces span { width: 34px; height: 34px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-left: -10px; border: 3px solid var(--white); }
.about__faces span:first-child { margin-left: 0; }
.about__faces svg { width: 16px; height: 16px; }

.about__cards { display: grid; grid-template-columns: repeat(3,1fr); gap: 22px; margin-top: 60px; }
.acard { border-radius: var(--r-card); padding: 30px; min-height: 260px; display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden; }
.acard--teal { background: var(--tint-teal); }
.acard--indigo { background: var(--tint-indigo); }
.acard--saffron { background: var(--tint-saffron); }
.acard__icon { width: 46px; height: 46px; border-radius: 50%; background: var(--white); display: grid; place-items: center; }
.acard__icon svg { width: 20px; height: 20px; color: var(--indigo); }
.acard h4 { font-size: 21px; margin-bottom: 8px; }
.acard p { font-size: 14px; }
.acard__wave { position: absolute; right: -30px; bottom: -40px; width: 220px; opacity: .3; pointer-events: none; z-index: 0; }
.acard > *:not(.acard__wave) { position: relative; z-index: 1; }
```

- [ ] **Step 4: Append the why-choose-us split rules**

```css
/* ---- why: two-column split with abstract graphic instead of photo ---- */
.why { display: grid; grid-template-columns: 1fr 1fr; gap: 70px; align-items: center; }
.why__photo { border-radius: var(--r-card); overflow: hidden; aspect-ratio: 5/6; }
.why__graphic {
  width: 100%; height: 100%;
  background:
    radial-gradient(circle at 30% 30%, rgba(19,138,138,.5), transparent 60%),
    radial-gradient(circle at 75% 70%, rgba(230,154,46,.4), transparent 55%),
    var(--tint-indigo);
}
.why p.lede { margin: 18px 0 0; font-size: 15px; max-width: 52ch; }
.why__feats { display: grid; grid-template-columns: 1fr auto 1fr; gap: 26px; margin-top: 40px; padding-top: 34px; border-top: 1px solid var(--line); }
.why__feats + .why__feats { margin-top: 26px; padding-top: 28px; }
.feat h4 { font-size: 22px; margin-bottom: 6px; }
.feat p { font-size: 14px; }
.feat__sep { width: 22px; color: var(--teal); align-self: center; }
```

- [ ] **Step 5: Append the showcase band rules**

```css
/* ---- showcase: full-bleed abstract band, no photo ---- */
.showcase { position: relative; min-height: 420px; display: grid; place-items: center; text-align: center; overflow: hidden; }
.showcase__graphic {
  position: absolute; inset: 0;
  background:
    radial-gradient(circle at 20% 30%, rgba(230,154,46,.35), transparent 55%),
    radial-gradient(circle at 80% 70%, rgba(19,138,138,.45), transparent 55%),
    linear-gradient(160deg, #173B70 0%, #0E2549 100%);
}
.showcase__in { position: relative; z-index: 2; color: var(--white); }
.showcase__in h2 { color: var(--white); max-width: 16ch; margin-inline: auto; }
.showcase .eyebrow { color: rgba(255,255,255,.85); }
```

- [ ] **Step 6: Append the features grid rules**

```css
/* ---- feats: two-column split, graphic instead of photo, 2x2 card grid ---- */
.feats { display: grid; grid-template-columns: 1fr 1fr; gap: 70px; }
.feats__photo { border-radius: var(--r-card); overflow: hidden; margin-top: 44px; aspect-ratio: 16/11; }
.feats__graphic {
  width: 100%; height: 100%;
  background:
    radial-gradient(circle at 25% 25%, rgba(19,138,138,.45), transparent 55%),
    radial-gradient(circle at 80% 80%, rgba(230,154,46,.35), transparent 55%),
    var(--tint-teal);
}
.feats__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.fcard { background: var(--tint-saffron); border-radius: var(--r-card); padding: 28px; }
.fcard:nth-child(2), .fcard:nth-child(4) { margin-top: 56px; }
.fcard svg { width: 30px; height: 30px; color: var(--saffron); margin-bottom: 54px; }
.fcard h4 { font-size: 20px; margin-bottom: 8px; }
.fcard p { font-size: 13.5px; }
```

- [ ] **Step 7: Append the rich two-column program-card rules**

The original `.prog` card paired a photo with a text panel and an "ages" badge. Here the photo slot is an abstract graphic, and the badge slot is the existing `StatusBadge` component instead of an invented label.

```css
/* ---- prog: rich two-column card (used for the six focus areas) ---- */
.prog { border-radius: var(--r-card); display: grid; grid-template-columns: 1fr 1fr; gap: 0; overflow: hidden; margin-bottom: 24px; position: relative; }
.prog--teal { background: var(--tint-teal); }
.prog--indigo { background: var(--tint-indigo); }
.prog--saffron { background: var(--tint-saffron); }
.prog__body { padding: 40px; display: flex; flex-direction: column; }
.prog__num { width: 52px; height: 52px; border-radius: 50%; background: var(--white); display: grid; place-items: center; font-family: var(--display); font-weight: 700; font-size: 17px; margin-bottom: 30px; color: var(--indigo); }
.prog h3 { font-size: 28px; margin-bottom: 12px; }
.prog p { font-size: 14px; max-width: 46ch; }
.prog__foot { margin-top: auto; padding-top: 26px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.prog__media { padding: 22px 22px 22px 0; }
.prog__graphic {
  width: 100%; height: 100%; min-height: 280px; border-radius: var(--r-card);
  background:
    radial-gradient(circle at 30% 30%, rgba(255,255,255,.35), transparent 55%),
    var(--indigo);
}
.prog--teal .prog__graphic { background: radial-gradient(circle at 30% 30%, rgba(255,255,255,.35), transparent 55%), var(--teal-deep); }
.prog--saffron .prog__graphic { background: radial-gradient(circle at 30% 30%, rgba(255,255,255,.35), transparent 55%), var(--saffron); }
@media (max-width: 720px) { .prog { grid-template-columns: 1fr; } .prog__media { padding: 0 22px 22px; } }
```

- [ ] **Step 8: Append the team/leadership grid rules**

The original `.tmember` card held a photo. Since there are no real leadership photos, this uses an icon avatar (an initial letter on a tint background) in the same slot.

```css
/* ---- team: leadership grid with icon-avatar instead of photo ---- */
.team { display: grid; grid-template-columns: repeat(2,1fr); gap: 24px; }
.tmember { background: var(--white); border: 1px solid var(--line); border-radius: var(--r-card); overflow: hidden; }
.tmember__avatar { aspect-ratio: 16/9; display: grid; place-items: center; background: var(--tint-indigo); }
.tmember__avatar span { font-family: var(--display); font-weight: 800; font-size: 48px; color: var(--indigo); }
.tmember__body { padding: 22px; }
.tmember h4 { font-size: 21px; }
.tmember__role { font-size: 13px; color: var(--indigo); font-weight: 800; letter-spacing: .04em; margin: 5px 0 12px; }
.tmember p { font-size: 14px; }
```

- [ ] **Step 9: Append the FAQ rules**

```css
/* ---- faq: expandable question list ---- */
.faq { max-width: 780px; }
.faq details { border-bottom: 1px solid var(--line); padding: 22px 0; }
.faq summary { font-family: var(--display); font-size: 20px; font-weight: 600; cursor: pointer; list-style: none; display: flex; justify-content: space-between; gap: 20px; }
.faq summary::-webkit-details-marker { display: none; }
.faq summary::after { content: "+"; font-size: 24px; color: var(--indigo); line-height: 1; }
.faq details[open] summary::after { content: "–"; }
.faq p { margin-top: 14px; font-size: 15px; }
```

- [ ] **Step 10: Verify no contrast regression**

Run: `grep -n "var(--teal)" src/styles/global.css`

Confirm every match added in this task is either a graphic/icon usage (an `svg` selector, or a background on a dark card) — never plain text under 24px. The additions in this task use `--teal` only for the marquee icon (22px svg) and `.feat__sep` (22px svg icon) — both graphics, both compliant. `--indigo` is used for text at every size, which is compliant (it's the existing primary text colour).

- [ ] **Step 11: Build to confirm no CSS errors**

Run: `npm run build`
Expected: succeeds (no page yet references the new classes, so this only confirms the CSS itself is valid — Astro doesn't lint unused CSS).

- [ ] **Step 12: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: restore original template's section styles, recoloured to the real brand palette"
```

---

### Task 2: Restore the Marquee and Swoosh components

**Files:**
- Create: `src/components/Marquee.astro`
- Create: `src/components/Swoosh.astro`

**Interfaces:**
- Produces: `<Marquee text={string} repeat={number}>` (default `repeat=4`), `<Swoosh text={string}>` — both consumed by Task 4 (homepage).

These are pure presentational components with no data dependency — restored verbatim from the original template, since there's nothing preschool-specific in them to change.

- [ ] **Step 1: Create Marquee.astro**

```astro
---
const { text = 'Where growth begins', repeat = 4 } = Astro.props;
const items = Array.from({ length: repeat });
---
<div class="marquee" aria-hidden="true">
  <div class="marquee__track">
    {[0, 1].map(() => (
      <div class="marquee__item">
        {items.map(() => (<><span>{text}</span><svg><use href="#i-ast" /></svg></>))}
      </div>
    ))}
  </div>
</div>
```

- [ ] **Step 2: Create Swoosh.astro**

The original used an amber-coloured hand-drawn stroke; this uses the brand saffron instead.

```astro
---
// A hand-drawn ellipse that rings a word in a heading.
const { text } = Astro.props;
---
<span class="swoosh" style="position:relative;display:inline-block">{text}<svg
    style="position:absolute;left:-8%;top:4%;width:116%;height:100%;pointer-events:none"
    viewBox="0 0 200 70" fill="none" aria-hidden="true">
    <path d="M100 5C42 5 8 18 8 34c0 15 42 27 96 27s90-12 90-27C194 20 158 7 108 5"
          stroke="currentColor" stroke-width="4" stroke-linecap="round" />
  </svg></span>
```

Note: `stroke="currentColor"` (not a hardcoded hex) so the `.hero .swoosh { color: var(--saffron); }` rule from Task 1 controls its colour — this avoids a literal colour value outside the token system.

- [ ] **Step 3: Verify the icon sprite has `i-ast`**

Run: `grep -n "i-ast" src/components/Icons.astro`
Expected: a match. If there is no match, add an asterisk/sparkle symbol to `Icons.astro`'s `<defs>` following the existing symbols' pattern (each is a `<symbol id="i-name" viewBox="...">` with an inline path) — asterisks are already used elsewhere on the site (the `Eyebrow` component), so the same symbol can likely be reused; check `Eyebrow.astro` for its existing icon reference before adding a duplicate.

- [ ] **Step 4: Build to confirm no errors**

Run: `npm run build`
Expected: succeeds (these components aren't used by any page yet).

- [ ] **Step 5: Commit**

```bash
git add src/components/Marquee.astro src/components/Swoosh.astro
git commit -m "feat: restore Marquee and Swoosh components"
```

---

### Task 3: Rebuild ProgramCard as the rich two-column vertical card, retire VerticalCard

**Files:**
- Modify: `src/components/ProgramCard.astro` (does not currently exist — create it)
- Delete: `src/components/VerticalCard.astro`
- Modify: `src/pages/index.astro` — import swap only (full rewrite happens in Task 4)
- Modify: `src/pages/focus-areas/index.astro` — import swap only (full content in Task 7)

**Interfaces:**
- Consumes: a `vertical` object matching `src/data/verticals.js`'s shape — `{ slug, number, title, status, tone, summary }` (only these four fields are used by the card; `intro`/`activities`/`audiences`/`engagement`/`leadKey` are used on the detail page, not the card).
- Produces: `<ProgramCard vertical={v} />`, rendering the `.prog`/`.prog--{tone}` two-column card from Task 1's CSS, with `<StatusBadge status={vertical.status} />` in place of the original template's invented "ages" badge.

- [ ] **Step 1: Read the current VerticalCard for reference, then delete it**

Run: `cat src/components/VerticalCard.astro`

This shows the simpler card being replaced. Once you've noted its prop shape (it should match — both consume `vertical`), delete it:

Run: `rm src/components/VerticalCard.astro`

- [ ] **Step 2: Create ProgramCard.astro**

```astro
---
import { url } from '../lib/url.js';
import StatusBadge from './StatusBadge.astro';
const { vertical } = Astro.props;
---
<article class={`prog prog--${vertical.tone} reveal`}>
  <div class="prog__body">
    <div class="prog__num">{vertical.number}</div>
    <h3>{vertical.title}</h3>
    <p>{vertical.summary}</p>
    <div class="prog__foot">
      <StatusBadge status={vertical.status} />
      <a href={url(`/focus-areas/${vertical.slug}`)} class="link-arrow">View details <svg><use href="#i-arrow" /></svg></a>
    </div>
  </div>
  <div class="prog__media"><div class="prog__graphic" aria-hidden="true"></div></div>
</article>
```

- [ ] **Step 3: Fix the two import sites so the build doesn't break**

In `src/pages/index.astro`, replace:
```astro
import VerticalCard from '../components/VerticalCard.astro';
```
with:
```astro
import ProgramCard from '../components/ProgramCard.astro';
```
and replace the render call `<VerticalCard vertical={v} />` with `<ProgramCard vertical={v} />` (Task 4 rewrites this page's surrounding markup fully — this step only keeps the build green in the meantime).

In `src/pages/focus-areas/index.astro`, make the identical swap (Task 7 rewrites the rest of this page).

- [ ] **Step 4: Run tests and build**

Run: `npm test`
Expected: 26/26 pass (no test touches this component directly).

Run: `npm run build`
Expected: succeeds, 13 pages built.

- [ ] **Step 5: Check contrast of the status badge on the new card background**

`StatusBadge` renders `.status--proposed` (the only status currently in use). Check its defined colours in `src/components/StatusBadge.astro` and confirm they remain legible against `--tint-teal`, `--tint-indigo`, and `--tint-saffron` card backgrounds (all light backgrounds, and the badge was already contrast-verified against a canvas background in a prior session — light-on-light-tint should still pass, but verify by reading the computed rule, not by assumption).

- [ ] **Step 6: Commit**

```bash
git add src/components/ProgramCard.astro src/pages/index.astro src/pages/focus-areas/index.astro
git rm src/components/VerticalCard.astro
git commit -m "feat: rebuild ProgramCard as the rich two-column vertical card, retire VerticalCard"
```

---

### Task 4: Rewrite the homepage with the restored template sections

**Files:**
- Modify: `src/pages/index.astro` (full rewrite)

**Interfaces:**
- Consumes: `Marquee` (Task 2), `Swoosh` (Task 2), `ProgramCard` (Task 3), `positioning`/`site` from `src/data/site.js`, `verticals` from `src/data/verticals.js`, existing `Eyebrow`/`Button`/`CTA` components.

This restores the original section order — hero, marquee, about-statement-with-cards, why-choose-us split, showcase band, marquee again, the six-verticals grid (now the rich `ProgramCard`), features grid, mission/vision, final CTA — filled with real content. The stats block, testimonials, and giving tiers from the original are not restored (per the approved design spec: no fabricated numbers, no testimonials without a track record, no individual-donation ask). The existing "how we intend to work" numbered-steps block is folded into the new `.acard` three-card section below so the same message isn't said twice in two different visual styles.

- [ ] **Step 1: Replace the full contents of `src/pages/index.astro`**

```astro
---
import Base from '../layouts/Base.astro';
import Eyebrow from '../components/Eyebrow.astro';
import Button from '../components/Button.astro';
import Marquee from '../components/Marquee.astro';
import Swoosh from '../components/Swoosh.astro';
import ProgramCard from '../components/ProgramCard.astro';
import CTA from '../components/CTA.astro';
import { verticals } from '../data/verticals.js';
import { positioning, site } from '../data/site.js';

const approach = [
  {
    tone: 'teal',
    icon: 'i-check',
    title: 'We work through institutions',
    text: 'Colleges, schools, and employers already have the learners and the premises. We supply the programme, not a parallel system.',
  },
  {
    tone: 'indigo',
    icon: 'i-chart',
    title: 'Learning is judged by what follows it',
    text: 'A course that does not change what someone can do, or get hired for, has not worked. Every vertical is designed backwards from that test.',
  },
  {
    tone: 'saffron',
    icon: 'i-globe',
    title: 'We say what stage we are at',
    text: 'The organisation was registered in 2026. Every focus area on this site is labelled with its real status, and none of them claims to be running yet.',
  },
];

const features = [
  { title: 'Verified before visible', text: 'Every factual claim on this site has a source and an owner. Where we do not yet have the document, we say so.' },
  { title: 'Built with institutions', text: 'We are not trying to replace colleges, training providers, or employers. Our work runs through them.' },
  { title: 'Named leadership', text: 'Each area of work sits with a named person, not the organisation in general.' },
  { title: 'No delivery claims yet', text: 'Nothing here says a programme is running before it is. Status labels are real, not aspirational.' },
];
---
<Base headerVariant="overlay" description={site.blurb}>
  <section class="hero">
    <div class="hero__bg"><div class="hero__bg-graphic" aria-hidden="true"></div></div>
    <div class="wrap hero__inner">
      <Eyebrow text="Indo-Global Skills & Edu Foundation" />
      <h1>Building practical <Swoosh text="pathways" /> between learning, skills, institutions, and opportunity.</h1>
      <p class="hero__sub">{site.blurb}</p>
      <div class="hero__actions">
        <Button href="/partner" variant="white">Discuss a partnership</Button>
        <Button href="/focus-areas" variant="indigo">See our focus areas</Button>
      </div>
    </div>
  </section>

  <Marquee text="Learning, skills, and opportunity" />

  <section class="section section--white" id="about">
    <div class="wrap">
      <div class="about__grid reveal">
        <Eyebrow text="About us" />
        <p class="about__statement">A young foundation built to close the gap between what people learn and the opportunities they can actually reach</p>
      </div>

      <div class="about__cards reveal">
        {approach.map((a) => (
          <div class={`acard acard--${a.tone}`}>
            <div class="acard__icon"><svg><use href={`#${a.icon}`} /></svg></div>
            <div>
              <h4>{a.title}</h4>
              <p>{a.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>

  <section class="section section--canvas">
    <div class="wrap why reveal">
      <div class="why__photo"><div class="why__graphic" aria-hidden="true"></div></div>
      <div>
        <Eyebrow text="Why work with us" />
        <h2>What makes the<br />approach different</h2>
        <p class="lede">We are not a delivery organisation pretending to be a strategy — we are a strategy that says plainly it has not delivered anything yet, and shows exactly how it plans to.</p>
        <div class="why__feats">
          <div class="feat"><h4>{features[0].title}</h4><p>{features[0].text}</p></div>
          <svg class="feat__sep"><use href="#i-ast" /></svg>
          <div class="feat"><h4>{features[1].title}</h4><p>{features[1].text}</p></div>
        </div>
        <div class="why__feats">
          <div class="feat"><h4>{features[2].title}</h4><p>{features[2].text}</p></div>
          <svg class="feat__sep"><use href="#i-ast" /></svg>
          <div class="feat"><h4>{features[3].title}</h4><p>{features[3].text}</p></div>
        </div>
      </div>
    </div>
  </section>

  <section class="showcase">
    <div class="showcase__graphic" aria-hidden="true"></div>
    <div class="showcase__in">
      <Eyebrow text="How we work" />
      <h2>Six areas, one<br />standard of honesty</h2>
    </div>
  </section>

  <Marquee text="Every area labelled with its real status" repeat={3} />

  <section class="section section--canvas" id="focus">
    <div class="wrap">
      <div class="sec-head reveal">
        <div>
          <Eyebrow text="Focus areas" />
          <h2>Six areas of work</h2>
        </div>
        <Button href="/focus-areas" variant="indigo">View all focus areas</Button>
      </div>
      {verticals.map((v) => <ProgramCard vertical={v} />)}
    </div>
  </section>

  <section class="section section--white">
    <div class="wrap feats reveal">
      <div>
        <Eyebrow text="Get involved" />
        <h2>A closer look at<br />how we operate</h2>
        <p style="margin:18px 0 28px;font-size:15px;max-width:44ch">If you run an institution, hire at entry level, or direct social spending toward education, we would like to hear what you are trying to do.</p>
        <Button href="/partner" variant="indigo">Discuss a partnership</Button>
        <div class="feats__photo"><div class="feats__graphic" aria-hidden="true"></div></div>
      </div>
      <div class="feats__grid">
        {features.map((f) => (
          <div class="fcard">
            <svg><use href="#i-ast" /></svg>
            <h4>{f.title}</h4>
            <p>{f.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  <section class="section section--canvas">
    <div class="wrap mission reveal">
      <h2 style="grid-column:1 / -1; margin-bottom:8px">Purpose and direction</h2>
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

Note: this uses icons `i-check`, `i-chart`, `i-globe`, `i-ast` — all of which were already in use before this rebuild (per the earlier `about.astro` "three commitments" section and the restored `Marquee`). Verify each exists with `grep -n "i-check\|i-chart\|i-globe\|i-ast" src/components/Icons.astro` before running the build; if any is missing, add it to `Icons.astro` following that file's existing `<symbol>` pattern.

- [ ] **Step 2: Run tests and build**

Run: `npm test && npm run build`
Expected: 26/26 tests pass; build succeeds with 13 pages.

- [ ] **Step 3: Check the built heading structure**

Run: `grep -o '<h[1-6][^>]*>[^<]*' dist/index.html | sed 's/<h\([1-6]\)[^>]*>/h\1: /'`
Expected: `h1` once, then only `h2`/`h3`/`h4` in descending order with no skip. (`.acard h4` and `.feat h4` sit inside a section whose preceding heading is `h2` — since there is no intermediate `h3` on the page at those points, using `h4` directly under `h2` would be a skip. Fix this by rendering those specific headings as `h3`, not `h4`, in the template above — i.e. change `<h4>{a.title}</h4>` inside the `.acard` loop and `<h4>{f.title}</h4>` inside `.feat`/`.fcard` loops to `<h3>`. The CSS classes (`.acard h4`, `.feat h4`, `.fcard h4`) select by tag, so after this edit also update those three CSS selectors in Task 1's output to `h3` instead of `h4` before re-running this check.)

- [ ] **Step 4: Check for horizontal scroll at 375px**

This needs a browser. Start the dev server, resize to 375×812, and confirm no element overflows — pay particular attention to `.about__cards` (3-column grid) and `.feats__grid` (2-column grid), which need a `grid-template-columns: 1fr` override under a mobile breakpoint if one doesn't already exist in the surrounding responsive rules. Check `grep -n "@media" src/styles/global.css` for the existing breakpoint pattern and match it.

- [ ] **Step 5: Guard check**

Run: `node scripts/content-guard.mjs dist`
Expected: "Content guard passed" — this page now carries significantly more copy volume than before, so this is the highest-risk check in this task.

- [ ] **Step 6: Commit**

```bash
git add src/pages/index.astro src/styles/global.css src/components/Icons.astro
git commit -m "feat: rebuild homepage with restored template sections and real content"
```

---

### Task 5: Build LeaderCard and rewrite the About page's leadership section

**Files:**
- Create: `src/components/LeaderCard.astro`
- Modify: `src/pages/about.astro`

**Interfaces:**
- Consumes: `leadership` from `src/data/leadership.js` — `{ key, name, role, remit, verticalSlugs }` — and `verticals` from `src/data/verticals.js` for the `titleFor` lookup already used in the current `about.astro`.
- Produces: `<LeaderCard leader={l} titleFor={fn} />`, rendering the `.tmember` card from Task 1's CSS with an icon-avatar (the leader's initial) instead of a photo.

- [ ] **Step 1: Create LeaderCard.astro**

```astro
---
import { url } from '../lib/url.js';
const { leader, titleFor } = Astro.props;
const initial = leader.name.replace(/^Dr\.\s*/, '').trim().charAt(0);
---
<article class="tmember">
  <div class="tmember__avatar"><span>{initial}</span></div>
  <div class="tmember__body">
    <h4>{leader.name}</h4>
    <div class="tmember__role">{leader.role}</div>
    <p>{leader.remit}</p>
    <div class="leader__areas">
      {leader.verticalSlugs.map((s) => (
        <a href={url(`/focus-areas/${s}`)}>{titleFor(s)}</a>
      ))}
    </div>
  </div>
</article>
```

- [ ] **Step 2: Read the current About page's leadership section**

Run: `sed -n '100,130p' src/pages/about.astro`

This shows the current simple `.leaders`/`.leader` list. Replace it with the `LeaderCard`/`.team` grid, keeping the same section wrapper, `Eyebrow`, and heading.

- [ ] **Step 3: Apply the edit**

Replace:
```astro
      <div class="leaders reveal">
        {leadership.map((l) => (
          <article class="leader">
            <h3>{l.name}</h3>
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
```
with:
```astro
      <div class="team reveal">
        {leadership.map((l) => <LeaderCard leader={l} titleFor={titleFor} />)}
      </div>
```

Add the import at the top of the file alongside the other component imports:
```astro
import LeaderCard from '../components/LeaderCard.astro';
```

The existing `url` import may now be unused in this file if `titleFor` was the only other consumer — check with `grep -n "url(" src/pages/about.astro` before removing the import; if `url()` is still used elsewhere in the file (it is, in `titleFor`'s lookup is not a `url()` call, but other parts of the page may use it), leave the import in place.

- [ ] **Step 4: Also restore the why-split layout for the founding-context section**

Read the current founding-context section:

Run: `sed -n '1,50p' src/pages/about.astro`

Replace the current plain `.prose`-only "The gap we are built to close" section's wrapper from a single-column block to the `.why` split, with an abstract graphic in the photo slot:

Replace:
```astro
  <section class="section section--white">
    <div class="wrap" style="max-width:820px">
      <div class="reveal">
        <Eyebrow text="Why we exist" />
        <h2>The gap we are built to close</h2>
        <div class="prose" style="margin-top:20px">
```
with:
```astro
  <section class="section section--white">
    <div class="wrap why reveal">
      <div class="why__photo"><div class="why__graphic" aria-hidden="true"></div></div>
      <div>
        <Eyebrow text="Why we exist" />
        <h2>The gap we are built to close</h2>
        <div class="prose" style="margin-top:20px">
```

Find the matching closing tags for this section (the original had `</div></div></section>`; after this edit it needs one additional closing `</div>` for the new `.why` wrapper's second column) and adjust the closing tags to balance — read the full section first with `sed -n '/The gap we are built to close/,/<\/section>/p' src/pages/about.astro` to see exactly which closing tags need the extra `</div>`.

- [ ] **Step 5: Run tests and build**

Run: `npm test && npm run build`
Expected: 26/26 pass; build succeeds.

- [ ] **Step 6: Check heading structure**

Run: `grep -o '<h[1-6][^>]*>[^<]*' dist/about/index.html | sed 's/<h\([1-6]\)[^>]*>/h\1: /'`
Expected: h1 once, then h2/h3/h4 descending with no skip. `LeaderCard`'s `<h4>` sits under the page's "Who leads the work" `<h2>` with no intervening `<h3>` — same skip risk as Task 4. Fix by using `<h3>` in `LeaderCard.astro` instead of `<h4>` (and update the `.tmember h4`/`.tmember__role` CSS selectors in Task 1's block to target `h3` instead — the `.tmember__role` selector targets a `<div>`, not a heading, so only `.tmember h4` needs the tag change).

- [ ] **Step 7: Guard check**

Run: `node scripts/content-guard.mjs dist`
Expected: "Content guard passed".

- [ ] **Step 8: Commit**

```bash
git add src/components/LeaderCard.astro src/pages/about.astro src/styles/global.css
git commit -m "feat: restore why-split layout and team grid on the About page"
```

---

### Task 6: Rewrite focus-areas/index.astro with the rich card grid

**Files:**
- Modify: `src/pages/focus-areas/index.astro`

**Interfaces:**
- Consumes: `ProgramCard` (Task 3), `verticals` from `src/data/verticals.js`.

Task 3 already swapped the import; this task confirms the rest of the page reads well with the new card and removes the now-redundant inline heading-size override that was a workaround for a different problem in the prior rebuild.

- [ ] **Step 1: Read the current file**

Run: `cat src/pages/focus-areas/index.astro`

- [ ] **Step 2: Confirm the h2 added in a prior fix round is still needed**

The current file has `<h2 style="font-size:28px; font-weight:700; margin-bottom:32px">Our six areas</h2>` — this was added specifically to fix an h1→h3 heading skip when the page used the plain `VerticalCard` (which renders an `<h3>`). `ProgramCard` (Task 3) renders an `<h3>` too, so this heading is still required — do not remove it. Only remove the inline `style` attribute if the surrounding CSS already provides equivalent sizing for a bare `<h2>` in this section (check by rendering and comparing visually); otherwise leave it as-is.

- [ ] **Step 3: Build and check**

Run: `npm run build`
Run: `grep -o '<h[1-6][^>]*>[^<]*' dist/focus-areas/index.html | sed 's/<h\([1-6]\)[^>]*>/h\1: /'`
Expected: h1, h2, then h3×6, then the CTA's h2 — no skip.

- [ ] **Step 4: Guard check**

Run: `node scripts/content-guard.mjs dist`
Expected: "Content guard passed".

- [ ] **Step 5: Commit (only if any edit was made in Step 2)**

```bash
git add src/pages/focus-areas/index.astro
git commit -m "chore: confirm focus-areas index works with the restored ProgramCard"
```

If Step 2 required no edit, skip this commit — there's nothing to commit, and an empty commit is not useful.

---

### Task 7: Restore the pdetail split layout on the focus-area detail page, fix the CTA capitalisation bug

**Files:**
- Modify: `src/pages/focus-areas/[slug].astro`

**Interfaces:**
- Consumes: `verticals`, `leadership` (unchanged), `StatusBadge` (unchanged).

A prior whole-branch review flagged that this page's closing CTA lowercases the vertical title mid-sentence (`Interested in ai and emerging technology education?`) because of a `.toLowerCase()` call. This task fixes that and upgrades the two-column prose/aside layout to the restored `.pdetail` split with an abstract graphic, matching the original template's program-detail page.

- [ ] **Step 1: Read the current file**

Run: `cat "src/pages/focus-areas/[slug].astro"`

- [ ] **Step 2: Fix the CTA capitalisation bug**

Replace:
```astro
  <CTA
    title={`Interested in ${vertical.title.toLowerCase()}?`}
    text="Tell us what you are working toward and who you serve. We will reply with what we can realistically do and by when."
  />
```
with:
```astro
  <CTA
    title="Interested in this area of work?"
    text="Tell us what you are working toward and who you serve. We will reply with what we can realistically do and by when."
  />
```

- [ ] **Step 3: Add the pdetail graphic alongside the prose**

Wrap the existing "What this involves" / "How it is delivered" content block in a `.pdetail` split with an abstract graphic in the media slot, keeping the existing `aside` column as a third sibling (the original `.pdetail` was two columns; here the layout needs prose + graphic + aside, so use a 3-column variant instead of literally reusing `.pdetail`'s 2-column grid). Append this rule to `src/styles/global.css` in this task (a small addition specific to this one page, not part of Task 1's broader restoration):

```css
.vdetail--rich { grid-template-columns: 1fr .7fr 1fr; }
.vdetail__graphic {
  border-radius: var(--r-card); aspect-ratio: 4/3;
  background: radial-gradient(circle at 30% 30%, rgba(255,255,255,.35), transparent 55%), var(--indigo);
}
```

Then change the existing `<div class="wrap vdetail reveal">` wrapper to `<div class="wrap vdetail vdetail--rich reveal">` and insert a new middle column between the prose `<div>` and the `<aside>`:

```astro
      <div class="vdetail__graphic" aria-hidden="true"></div>
```

- [ ] **Step 4: Run tests, build, and check headings**

Run: `npm test && npm run build`
Run: `grep -o '<h[1-6][^>]*>[^<]*' "dist/focus-areas/ai-and-emerging-tech-education/index.html" | sed 's/<h\([1-6]\)[^>]*>/h\1: /'`
Expected: 26/26 tests pass; build succeeds; heading order is h1, h2, h2, h2 (this page's existing structure — verified clean in a prior review, unaffected by this task's layout change since no headings were added or removed).

- [ ] **Step 5: Check the CTA fix landed on every vertical**

Run: `grep -r "toLowerCase" dist/focus-areas/`
Expected: no output — confirms the bug is gone from every one of the six built detail pages, not just the one checked above.

- [ ] **Step 6: Guard check**

Run: `node scripts/content-guard.mjs dist`
Expected: "Content guard passed".

- [ ] **Step 7: Commit**

```bash
git add "src/pages/focus-areas/[slug].astro" src/styles/global.css
git commit -m "fix: correct CTA capitalisation bug, restore pdetail-style layout on focus-area pages"
```

---

### Task 8: Restore the FAQ section on the partnership page

**Files:**
- Modify: `src/pages/partner.astro`

**Interfaces:**
- No new data dependencies — the FAQ content below is authored fresh for this task, answering the questions a real prospective partner would actually have given the organisation's current stage.

The existing 4-step "who we work with" section and the working enquiry form are correct and untouched. This task only adds the restored `.faq` section, in the same position the original template placed it (after the process explanation, before the final CTA — here, appended after the "Three steps" section and before the form, since the form is this page's actual conversion point and should stay last).

- [ ] **Step 1: Read the current file**

Run: `cat src/pages/partner.astro`

- [ ] **Step 2: Insert the FAQ section**

Insert a new section immediately after the closing `</section>` of the "What happens next / Three steps" section (identify it by its `id="enquiry"` — insert this new section *before* that one, since the FAQ answers objections that come before someone fills out the form):

```astro
  <section class="section section--white">
    <div class="wrap">
      <div class="reveal" style="margin-bottom:34px">
        <Eyebrow text="Questions" />
        <h2>Before you write in</h2>
      </div>
      <div class="faq reveal">
        <details>
          <summary>Is the organisation formally registered?</summary>
          <p>Yes — as a non-profit company in Maharashtra, India, registered in 2026. Full registration details are available on request once we've confirmed them against the official record.</p>
        </details>
        <details>
          <summary>What stage is each focus area actually at?</summary>
          <p>Every one of the six areas is currently labelled Proposed: scoped and ready to start, with no delivery under way. The status on each focus area's page is kept accurate — it will change the day real delivery starts, not before.</p>
        </details>
        <details>
          <summary>Is there a cost to a first conversation?</summary>
          <p>No. Sending the enquiry form below costs nothing and commits you to nothing. If we scope work together afterwards, costs and responsibilities are put in writing before anything starts.</p>
        </details>
        <details>
          <summary>What if we are not the right fit?</summary>
          <p>We will say so directly, and where possible point you toward who might be a better fit. We would rather have that conversation early than after a proposal.</p>
        </details>
      </div>
    </div>
  </section>

```

- [ ] **Step 3: Run tests and build**

Run: `npm test && npm run build`
Expected: 26/26 pass; build succeeds.

- [ ] **Step 4: Check heading structure**

Run: `grep -o '<h[1-6][^>]*>[^<]*' dist/partner/index.html | sed 's/<h\([1-6]\)[^>]*>/h\1: /'`
Expected: h1, then h2 "Four kinds of conversation", h3×4, the new h2 "Before you write in" (no h3 needed under it since `<details><summary>` is not a heading — this doesn't create a skip), h2 "Three steps".

- [ ] **Step 5: Guard check**

Run: `node scripts/content-guard.mjs dist`
Expected: "Content guard passed" — check specifically that "registered in 2026" and "Maharashtra" pass the guard's rules the same way the existing `site.js` `regNote` does, since this is new copy stating the same fact in different words.

- [ ] **Step 6: Commit**

```bash
git add src/pages/partner.astro
git commit -m "feat: restore FAQ section on the partnership page"
```

---

### Task 9: Restyle contact.astro, updates/index.astro, and 404.astro against the restored palette, remove dead CSS

**Files:**
- Modify: `src/pages/contact.astro` (verification only — see Step 1)
- Modify: `src/pages/updates/index.astro` (verification only — see Step 1)
- Modify: `src/pages/404.astro` (verification only — see Step 1)
- Modify: `src/styles/global.css` (remove dead classes identified in Step 3)

**Interfaces:** none — this task touches no data or component contracts.

- [ ] **Step 1: Confirm these three pages need no structural change**

These pages already use the current brand tokens (`--indigo`, `--canvas`, etc.) rather than any of the removed preschool tokens — they were rebuilt from scratch in a prior session, not restored-and-recoloured like the rest of this plan. `updates/index.astro` in particular is the original template's `/blog` slot: its honest empty-state ("nothing published yet") is correct and stays exactly as-is — do not wire up `BlogCard` or invent a post, since no real update exists yet. Run:

`grep -n "var(--mint)\|var(--lav\|var(--peach)\|var(--amber)\|var(--purple)\|var(--cream)" src/pages/contact.astro src/pages/updates/index.astro src/pages/404.astro`

Expected: no output. If there is output, replace each match using Task 1's mapping table (mint→tint-teal, lavender→tint-indigo, peach→tint-saffron, amber→saffron, purple→indigo, cream→canvas) and re-run this check until clean.

- [ ] **Step 2: Visual check in the browser**

Start the dev server, load `/contact`, `/updates`, and `/404`, and confirm they read as visually consistent with the newly-richer other pages (same fonts, same button style, same section rhythm) — not jarringly plainer. If any page reads as flat compared to its neighbours, that's a judgement call for a small enhancement (e.g. the `.aside`-style card treatment already used elsewhere for the contact facts block), but do not invent new content or sections — this task is about consistency, not expansion.

- [ ] **Step 3: Find and remove dead CSS**

The homepage and About page no longer use `VerticalCard`'s old grid classes or the plain `.leaders`/`.leader` list classes (both replaced in Tasks 3 and 5). Check:

Run: `grep -rn "\.vgrid\b" src/pages/ src/components/`

If `.vgrid` still appears in `focus-areas/index.astro` (it does — that page still uses it as a grid wrapper around `ProgramCard`s), keep the CSS rule. Then check the now-fully-unused ones:

Run: `grep -rn "\bleaders\b\|\.leader\b\|\.leader__" src/pages/ src/components/`

Expected: no output (Task 5 removed the only usage). If clean, remove the corresponding `.leaders`/`.leader`/`.leader__role`/`.leader__areas` rules from `src/styles/global.css` — but first check whether `.leader__areas` is still referenced by the new `LeaderCard.astro` (it is, reused deliberately for the linked-verticals list) — keep that one rule, remove only `.leaders` and the bare `.leader` (not `.leader__areas`).

- [ ] **Step 4: Full regression pass**

Run: `npm test && npm run build && npm run verify`
Expected: 26/26 tests pass; build succeeds; guard passes with "Content guard passed".

- [ ] **Step 5: Commit**

```bash
git add src/pages/contact.astro src/pages/404.astro src/styles/global.css
git commit -m "chore: verify contact/404 palette consistency, remove dead leader-list CSS"
```

---

### Task 10: Final whole-branch audit

**Files:** none created or modified directly — this task verifies and fixes whatever the audit finds.

- [ ] **Step 1: Full test and build pass**

Run: `npm run verify`
Expected: tests 26/26, build succeeds (13 pages), "Content guard passed", exit 0.

- [ ] **Step 2: Heading-level audit across every page**

Run this for each of the 13 built pages and confirm no skip in any:

```bash
for f in dist/index.html dist/about/index.html dist/contact/index.html dist/partner/index.html dist/updates/index.html dist/404.html dist/focus-areas/index.html dist/focus-areas/*/index.html; do
  echo "=== $f ==="
  grep -o '<h[1-6][^>]*>[^<]*' "$f" | sed 's/<h\([1-6]\)[^>]*>/h\1/'
done
```

For each page, confirm exactly one `h1` and no jump of more than one level at any point in the sequence.

- [ ] **Step 3: Contrast audit for every new colour usage introduced in this plan**

List every place `var(--teal)`, `var(--saffron)`, or `var(--indigo)` is used as a `color` (not `background`) on text, and for each, confirm the element's rendered font size/weight against the Global Constraints contrast rule:

Run: `grep -n "color: var(--teal)\|color: var(--saffron)" src/styles/global.css`

Expected: every match is on a selector targeting an `svg` (icon/graphic), never a text element. If any match targets text, either the colour is wrong (should be `--teal-deep` or `--indigo`) or the text needs to be resized to qualify — fix the CSS, don't just note the violation.

- [ ] **Step 4: No-horizontal-scroll check at 375px**

Using the browser, resize to 375×812 and load each of: `/`, `/about`, `/focus-areas`, `/focus-areas/international-academic-pathway`, `/partner`, `/contact`. Confirm no page scrolls horizontally. Pay attention to `.about__cards` (3-col), `.feats__grid` (2-col), `.why`/`.feats` (2-col split), `.team` (2-col), `.vdetail--rich` (3-col) — these are the grids most likely to need a `grid-template-columns: 1fr` mobile override. Check the existing breakpoint pattern with `grep -n "@media (max-width" src/styles/global.css` and add matching rules for any grid that overflows.

- [ ] **Step 5: Confirm no stock photography or fabricated claims slipped in**

Run: `grep -rn "framerusercontent\|<img" src/pages/ src/components/`
Expected: no output (or only the favicon/logo `<img>` if either page legitimately displays the organisation's own logo mark — check any match individually; it should never be a photo of a person or place).

Run: `node scripts/content-guard.mjs dist`
Expected: "Content guard passed" — this is the authoritative check for fabricated numbers, testimonials, and unverified registration claims; the manual checks above are a supplement, not a replacement.

- [ ] **Step 6: Confirm nav and footer still reflect the real site structure**

Run: `grep -n "nav\s*=" src/data/site.js` and re-read the array — confirm it still lists exactly Home, About, Focus areas, Partner with us, Contact (no `/donate`, no `/teachers`, no separate `/leadership` route, since leadership lives inside `/about`).

Run: `ls src/pages/ dist/`
Expected: no `donate.astro`/`dist/donate`, no `teachers.astro`/`dist/teachers`, no `admissions.astro`/`dist/admissions`, no `programs/`/`dist/programs`, no `blog/`/`dist/blog` — these were already removed in a prior session's cleanup and must not have been reintroduced by this plan's restoration work.

- [ ] **Step 7: Report and commit any final fixes found in Steps 2-6**

```bash
git add -A
git commit -m "fix: whole-branch audit — heading levels, contrast, mobile overflow"
```

If the audit found nothing to fix, skip this commit.
