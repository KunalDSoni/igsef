import { test } from 'node:test';
import assert from 'node:assert/strict';
import { findViolations, RULES } from '../scripts/content-guard.mjs';

test('clean text produces no violations', () => {
  const html = '<p>We work with colleges and employers on skills programmes.</p>';
  assert.deepEqual(findViolations(html, RULES), []);
});

test('flags the unverified CIN', () => {
  const found = findViolations('<p>CIN: U85499MR2026NPL479632</p>', RULES);
  assert.equal(found.length, 1);
  assert.equal(found[0].id, 'cin');
  assert.equal(found[0].match, 'U85499MR2026NPL479632');
});

test('flags tax-exemption claims', () => {
  const ids = findViolations('<li>80G tax receipt</li>', RULES).map((v) => v.id);
  assert.ok(ids.includes('tax-status'));
});

test('flags Section 8 self-description', () => {
  const ids = findViolations('<p>We are a Section 8 company.</p>', RULES).map((v) => v.id);
  assert.ok(ids.includes('section-8'));
});

test('flags Kidora template image hosts', () => {
  const ids = findViolations('<img src="https://framerusercontent.com/images/x.png">', RULES)
    .map((v) => v.id);
  assert.ok(ids.includes('template-assets'));
});

test('flags leftover preschool vocabulary', () => {
  const ids = findViolations('<h3>Ages 3–5</h3>', RULES).map((v) => v.id);
  assert.ok(ids.includes('preschool'));
});

test('flags placeholder contact details', () => {
  const ids = findViolations('<span>+91 22 4000 1234</span>', RULES).map((v) => v.id);
  assert.ok(ids.includes('placeholder-contact'));
});

test('flags superlative self-description', () => {
  const ids = findViolations('<p>India’s leading skills foundation</p>', RULES).map((v) => v.id);
  assert.ok(ids.includes('superlative'));
});

test('does not flag superlatives inside ordinary words', () => {
  assert.deepEqual(findViolations('<p>We hold the best interests of learners first.</p>', RULES)
    .filter((v) => v.id === 'superlative'), []);
});

test('reports every distinct match, not just the first', () => {
  const found = findViolations('<p>80G and 12AB and CSR-1</p>', RULES);
  assert.equal(found.filter((v) => v.id === 'tax-status').length, 3);
});
