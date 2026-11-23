// Turns the organisation's contact data into what the contact sections render:
// the named contact person (shown as a card), the call and email buttons on
// that card, the remaining detail rows, and any channels still pending.

const HONORIFICS = new Set(['dr', 'prof', 'mr', 'mrs', 'ms']);

// Channels that move onto the contact person's card, in button order.
const CARD_ACTIONS = [
  { label: 'Phone', kind: 'call', icon: 'i-phone' },
  { label: 'Email', kind: 'mail', icon: 'i-mail' },
];

const hasValue = (entry) => entry.value != null;

// "Krishnakumar R." -> "KR"; "Dr. Ashok Digambarrao Chavan" -> "AC".
export function initialsFor(name) {
  const words = String(name ?? '').split(/[\s.]+/).filter(Boolean);
  if (words.length > 1 && HONORIFICS.has(words[0].toLowerCase())) words.shift();
  if (words.length === 0) return '';
  const last = words.length > 1 ? words[words.length - 1][0] : '';
  return (words[0][0] + last).toUpperCase();
}

// Email and phone become actionable links; everything else is plain text.
export function hrefFor({ label, value }) {
  if (value == null) return null;
  if (label === 'Email') return `mailto:${value}`;
  if (label === 'Phone') return `tel:${value.replace(/\s+/g, '')}`;
  return null;
}

export function contactView(site) {
  const contact = site.contact ?? [];
  const p = site.contactPerson;
  const person = p?.name ? { name: p.name, role: p.role, initials: initialsFor(p.name) } : null;

  const onCard = person
    ? CARD_ACTIONS
        .map((a) => ({ ...a, entry: contact.find((c) => c.label === a.label && hasValue(c)) }))
        .filter((a) => a.entry)
    : [];

  return {
    person,
    actions: onCard.map(({ kind, icon, entry }) => ({
      kind,
      label: entry.value,
      href: hrefFor(entry),
      icon,
    })),
    facts: contact.filter((c) => hasValue(c) && !onCard.some((a) => a.entry === c)),
    pending: contact.filter((c) => !hasValue(c)),
  };
}
