# Contact Person Card Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the plain "Contact person" row with a contact card (initials, name, role, call and email buttons) on the Contact page and the Partner page's "Contact us" box.

**Architecture:** A pure helper (`src/lib/contact.js`) turns `site` data into what the pages render: the person, the card's buttons, the remaining fact rows, and the pending entries. A new `ContactCard.astro` component renders the card, and both pages use the helper so the split lives in one tested place.

**Tech Stack:** Astro 5 (static), plain CSS in `src/styles/global.css`, `node --test` for data and logic tests.

**Spec:** `docs/superpowers/specs/2026-11-23-contact-person-card-design.md`

## Global Constraints

- Exact copy: name `Krishnakumar R.`, role `Senior Vice President`, label `Your point of contact`, phone `+91 9323802631`, email `info@igsef.org`.
- Only existing tokens: `--indigo`, `--teal-deep`, `--tint-indigo`, `--tint-teal`, `--line`, `--ink`, `--white`, `--r-card`, `--r-pill`, `--display`.
- No photo, no new dependencies.
- `npm run verify` (tests, build, content guard) must pass.

## Review Focus

1. Phone text stays exactly `+91 9323802631`, and its link is `tel:+919323802631` (pinned in Task 1).
2. If phone or email becomes `null` (pending), the card drops that button instead of rendering a dead link (pinned in Task 1).
3. Phone and email never appear both in the card and as rows (pinned in Task 1).
4. If `contactPerson` is removed, phone and email fall back to plain rows, so no channel disappears (pinned in Task 1).
5. On a 375px phone, the card wraps without horizontal scroll and both buttons stay full-width and tappable (checked in Task 2, Step 4).

---

### Task 1: Contact data and view helper

**Files:**
- Create: `src/lib/contact.js`
- Modify: `src/data/site.js` (the `contact` array)
- Create: `tests/contact.test.js`
- Modify: `tests/data.test.js` (append one test)

**Interfaces:**
- Produces:
  - `initialsFor(name: string): string`. Takes the first letters of the first and last words, uppercased, after dropping a leading `Dr.`, `Prof.`, `Mr.`, `Mrs.` or `Ms.`. Returns `''` for a blank name.
  - `hrefFor(entry: {label, value}): string | null`. Returns `mailto:` for Email, `tel:` plus the value without whitespace for Phone, and `null` otherwise.
  - `contactView(site): { person: {name, role, initials} | null, actions: Array<{kind: 'call' | 'mail', label, href, icon}>, facts: entry[], pending: entry[] }`.
    - `actions`: Phone (`call`, `i-phone`), then Email (`mail`, `i-mail`). These are included only when there is a person and the value isn't null.
    - `facts`: entries that have a value and aren't already in `actions`, in their original order.
    - `pending`: entries whose value is `null`.
  - `site.contactPerson = { name: 'Krishnakumar R.', role: 'Senior Vice President' }`. The `'Contact person'` entry is removed from `site.contact`.

- [ ] **Step 1: Write the failing tests** in `tests/contact.test.js`

```js
test('initialsFor takes first and last initials, skipping honorifics', () => {
  assert.equal(initialsFor('Krishnakumar R.'), 'KR');
  assert.equal(initialsFor('Dr. Ashok Digambarrao Chavan'), 'AC');
  assert.equal(initialsFor('Prof. V. N. Rajasekharan Pillai'), 'VP');
  assert.equal(initialsFor('Krishnakumar'), 'K');
  assert.equal(initialsFor('  '), '');
});
test('hrefFor links email and phone only', () => {
  assert.equal(hrefFor({ label: 'Phone', value: '+91 9323802631' }), 'tel:+919323802631');
  assert.equal(hrefFor({ label: 'Email', value: 'info@igsef.org' }), 'mailto:info@igsef.org');
  assert.equal(hrefFor({ label: 'Office', value: 'Mumbai' }), null);
});
test('contactView gives the card call and email, office stays a row', () => {
  const v = contactView(site);
  assert.deepEqual(v.person, { name: 'Krishnakumar R.', role: 'Senior Vice President', initials: 'KR' });
  assert.deepEqual(v.actions.map((a) => [a.kind, a.label, a.href]), [
    ['call', '+91 9323802631', 'tel:+919323802631'],
    ['mail', 'info@igsef.org', 'mailto:info@igsef.org'],
  ]);
  assert.deepEqual(v.facts.map((f) => f.label), ['Office']);
});
test('a pending channel is left off the card, not rendered as a dead button', () => {
  const v = contactView({ contactPerson: { name: 'A B', role: 'R' }, contact: [
    { label: 'Email', icon: 'i-mail', value: null, status: 'pending' },
    { label: 'Phone', icon: 'i-phone', value: '+91 1', status: 'confirmed' },
  ] });
  assert.deepEqual(v.actions.map((a) => a.kind), ['call']);
  assert.deepEqual(v.pending.map((p) => p.label), ['Email']);
});
test('without a contact person, phone and email fall back to rows', () => {
  const v = contactView({ contact: site.contact });
  assert.equal(v.person, null);
  assert.deepEqual(v.actions, []);
  assert.deepEqual(v.facts.map((f) => f.label), ['Email', 'Phone', 'Office']);
});
```

Append to `tests/data.test.js`:

```js
test('contact person is declared once, outside the channel list', () => {
  assert.deepEqual(site.contactPerson, { name: 'Krishnakumar R.', role: 'Senior Vice President' });
  assert.ok(!site.contact.some((c) => c.label === 'Contact person'));
  assert.equal(site.contact.find((c) => c.label === 'Phone').value, '+91 9323802631');
});
```

- [ ] **Step 2: Run `npm test`.** Expected: FAIL. `contact.test.js` can't import `../src/lib/contact.js`, and the data test fails on `contactPerson`.
- [ ] **Step 3: Implement** `src/lib/contact.js` with the three exports above, add `contactPerson` to `site.js`, and remove the `'Contact person'` row.
- [ ] **Step 4: Run `npm test`.** Expected: all tests pass.
- [ ] **Step 5: Commit** `src/lib/contact.js src/data/site.js tests/` with the message "Add contact person data and contact view helper".

### Task 2: Contact card component, styles, and page wiring

**Files:**
- Create: `src/components/ContactCard.astro`
- Modify: `src/pages/contact.astro` (frontmatter `known`, `pending` and `hrefFor`, plus the facts block)
- Modify: `src/pages/partner.astro` (frontmatter `known`, plus the "Contact us" facts block)
- Modify: `src/styles/global.css` (after `.cfact a:hover`)

**Interfaces:**
- Consumes: `contactView(site)` and `hrefFor(entry)` from Task 1.
- Produces: `<ContactCard person={...} actions={...} />`. Class names:
  - `.ccard` and `.ccard__head`
  - `.ccard__avatar` (`aria-hidden`)
  - `.ccard__eyebrow`, `.ccard__name` (an `h3`) and `.ccard__role`
  - `.ccard__actions`, plus `.ccard__btn` with the `--call` / `--mail` variant. Each button is an `<a href>` with an `<svg><use href="#i-…">` icon and the value as its text.

- [ ] **Step 1: Create `ContactCard.astro`.** Show the actions row only when `actions.length > 0`.
- [ ] **Step 2: Add the `.ccard` styles.**
  - Card: white, `1px solid var(--line)`, `var(--r-card)`, padding 26px.
  - Avatar: 64px circle, `--tint-indigo` with `--indigo` initials in display 800 at 22px.
  - Eyebrow: 12px, 800, uppercase, letter-spacing .08em, `--teal-deep`.
  - Name: 22px, `--ink`.
  - Role: 13px, 800, letter-spacing .04em, `--indigo` (as in `.tmember__role`).
  - Actions: hairline top rule, flex wrap, gap 10px.
  - Buttons: pills in display 700 at 14px. `--call` is `--indigo` with white text, and `--mail` is `--tint-teal` with `--teal-deep` text. Hover lifts like `.btn:hover`.
  - At `max-width: 480px`: 56px avatar, and buttons `flex: 1 1 100%` with centred content.
- [ ] **Step 3: Wire both pages.**
  - Render `contactView(site)` and put the card first inside `.contact__facts`, followed by the fact rows.
  - The Contact page keeps its link rows through `hrefFor` and its pending notice through `pending`.
  - The Partner page keeps its "See how to reach us" fallback button for when there's no person and no facts.
- [ ] **Step 4: Verify.**
  - Run `npm run verify`. Expected: tests pass, the build completes, and "Content guard passed".
  - Preview `/contact` and `/partner` at desktop width and at 375px.
  - Expected: the card shows KR, the label, the name, the role and two buttons; Office is the only row; there are no Email or Phone rows; the call link is `tel:+919323802631`; and `scrollWidth <= innerWidth`.
- [ ] **Step 5: Commit** the component, both pages, `global.css` and the spec status with the message "Show contact person as a card on Contact and Partner pages".
