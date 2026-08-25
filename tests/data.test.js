import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { site, nav, positioning } from '../src/data/site.js';
import { verticals, STATUSES } from '../src/data/verticals.js';
import { leadership } from '../src/data/leadership.js';

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
  assert.ok(site.contact.length > 0, 'site.contact must not be empty');
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
