# Homepage marquee variety

## Problem

The homepage hero marquee ([index.astro:64](../../../src/pages/index.astro)) repeats a single phrase, `site.tagline`, back to back with a `✳` separator. Seeing the identical string four times in a row reads as monotonous rather than dynamic, even though the scroll animation itself looks fine.

## Change

`Marquee.astro` gains an `items` prop: an array of strings that get joined with the `✳` separator and looped, replacing the current `text` + `repeat` (single string repeated N times) behavior for callers that want variety. Callers that still only need one repeated phrase (the second homepage usage, "Every area labelled with its real status") keep using `text` + `repeat` — that path is untouched.

The homepage hero marquee switches to:

```
items={[
  site.tagline,               // "Learning, skills, and opportunity"
  'Academic pathways',
  'Industry training',
  'AI & emerging tech',
  'Innovation',
  'Industry–academia',
  'CSR & social impact',
]}
```

These supporting words are short, hardcoded labels derived from the six focus-area titles in [verticals.js](../../../src/data/verticals.js), condensed for ticker length (not full sentences, not pulled programmatically at build time — just informed by that source content).

Visual presentation (font, spacing, separator icon, scroll speed/animation, the double-track rendering for the seamless loop) is unchanged.

## Component contract

`Marquee.astro` props:
- `items?: string[]` — when present, used as the list of phrases to loop, each followed by the `✳` icon.
- `text?: string`, `repeat?: number` — existing behavior, used when `items` is not passed. Default `repeat = 4`.
- Exactly one of `items` or `text` is expected per call site; if neither is passed, fall back to the current default (`text = 'Where growth begins'`, `repeat = 4`) so no existing call site can silently break.

Internally, `Marquee.astro` builds a flat list of phrases (either from `items`, or `text` repeated `repeat` times) and renders that same list twice (the two `.marquee__item` tracks) for the scrolling illusion, same as today.

## Out of scope

- No change to the second marquee call ("Every area labelled with its real status").
- No change to animation, styling, or the separator icon.
- No build-time derivation of ticker words from `verticals.js` — the list is a hardcoded array in `index.astro`.
