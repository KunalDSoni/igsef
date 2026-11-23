import { test } from 'node:test';
import assert from 'node:assert/strict';
import { initialsFor, hrefFor, contactView } from '../src/lib/contact.js';
import { site } from '../src/data/site.js';

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
