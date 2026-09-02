# Marquee Variety Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the homepage hero marquee cycle through the tagline plus short focus-area words instead of repeating one phrase.

**Architecture:** `Marquee.astro` gains an optional `items: string[]` prop. When present, it's used as the phrase list (each item followed by the `✳` separator icon); when absent, the component falls back to its current `text` + `repeat` behavior unchanged. Only the homepage hero call site switches to `items`.

**Tech Stack:** Astro components (`.astro`), no client JS, no new test framework (project uses `node --test` against data files only - this change is verified via `npm run build` and a browser check, per existing project convention of not unit-testing markup).

## Global Constraints

- Second marquee call in `index.astro` ("Every area labelled with its real status") must keep using `text` + `repeat` and must render identically to before.
- No default call site should break: a call with neither `items` nor `text` must still render `text = 'Where growth begins'`, `repeat = 4` (the existing default).
- Visual styling, the `✳` separator icon, and the scroll animation are unchanged - this is a content-source change only.

---

### Task 1: Add `items` prop to Marquee.astro

**Files:**
- Modify: `src/components/Marquee.astro`

**Interfaces:**
- Produces: `Marquee.astro` props - `items?: string[]`, `text?: string = 'Where growth begins'`, `repeat?: number = 4`. When `items` is a non-empty array, it is used as the phrase list. Otherwise the phrase list is `Array.from({ length: repeat }, () => text)`.

- [ ] **Step 1: Read the current file to confirm exact contents**

Run: view `src/components/Marquee.astro` (already read during brainstorming - reconfirm before editing):

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

- [ ] **Step 2: Rewrite the component to build a phrase list from either prop**

Replace the frontmatter and template with:

```astro
---
const { items, text = 'Where growth begins', repeat = 4 } = Astro.props;
const phrases = items && items.length > 0 ? items : Array.from({ length: repeat }, () => text);
---
<div class="marquee" aria-hidden="true">
  <div class="marquee__track">
    {[0, 1].map(() => (
      <div class="marquee__item">
        {phrases.map((phrase) => (<><span>{phrase}</span><svg><use href="#i-ast" /></svg></>))}
      </div>
    ))}
  </div>
</div>
```

Note the variable rename `items` (local array) → `phrases`, since `items` is now the incoming prop name. `text` stays referenced only inside the fallback branch.

- [ ] **Step 3: Verify no other call sites rely on removed behavior**

Run:
```bash
grep -n "Marquee" src/pages/*.astro src/layouts/*.astro
```
Expected: only the two calls in `src/pages/index.astro` (lines ~64 and ~120), both still passing `text` (no `items`) - confirms they'll hit the fallback branch and render exactly as before.

- [ ] **Step 4: Build the site to confirm no compile errors**

Run: `npm run build`
Expected: build succeeds with no errors referencing `Marquee.astro`.

- [ ] **Step 5: Commit**

```bash
git add src/components/Marquee.astro
git commit -m "feat: let Marquee accept a list of phrases via items prop"
```

---

### Task 2: Vary the homepage hero marquee content

**Files:**
- Modify: `src/pages/index.astro:64`

**Interfaces:**
- Consumes: `Marquee.astro`'s `items?: string[]` prop from Task 1.
- Consumes: `site.tagline` from `src/data/site.js` (already imported in `index.astro` - confirm the import exists before editing).

- [ ] **Step 1: Confirm `site` is imported in index.astro**

Run: `grep -n "import.*site" src/pages/index.astro`
Expected: a line importing `site` from `'../data/site.js'`. If missing, add `import { site } from '../data/site.js';` near the other imports at the top of the frontmatter - but do not add a duplicate if one already exists under a different name (e.g. destructured elsewhere).

- [ ] **Step 2: Replace the hero marquee call**

Find this line (around line 64):

```astro
<Marquee text="Learning, skills, and opportunity" />
```

Replace with:

```astro
<Marquee items={[
  site.tagline,
  'Academic pathways',
  'Industry training',
  'AI & emerging tech',
  'Innovation',
  'Industry–academia',
  'CSR & social impact',
]} />
```

- [ ] **Step 3: Confirm the second marquee call on the same page is untouched**

Run: `grep -n "Marquee" src/pages/index.astro`
Expected: two matches - the new `items={[...]}` call, and the unchanged `<Marquee text="Every area labelled with its real status" repeat={3} />`.

- [ ] **Step 4: Build the site**

Run: `npm run build`
Expected: build succeeds with no errors.

- [ ] **Step 5: Visually verify in the browser**

Start the dev server preview (`npm run dev` via the project's preview tooling), open the homepage, and confirm the hero marquee now scrolls through the tagline and the six supporting phrases (not the same phrase repeated), separated by the `✳` icon, with no layout shift or overlap.

- [ ] **Step 6: Run the full verify script**

Run: `npm run verify`
Expected: `npm test`, `npm run build`, and `npm run guard` all pass (guard scans `dist/` for content-guard rules unrelated to this change, but must still pass since the marquee copy introduces no invented facts).

- [ ] **Step 7: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: vary homepage hero marquee with focus-area phrases"
```
