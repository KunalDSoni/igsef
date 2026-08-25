import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { site, nav, positioning } from '../src/data/site.js';

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
