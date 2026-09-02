// Single source of truth for the organisation's identity.
//
// Corporate facts (CIN, incorporation date, legal form, registered office) are
// deliberately absent. They are known only from a third-party registry scrape
// and must not be published until an authorised owner confirms them against the
// Certificate of Incorporation and current MCA master data. See research-notes.md.
export const site = {
  name: 'Indo-Global',
  fullName: 'Indo-Global Skills & Edu Foundation',
  tagline: 'Learning, skills, and opportunity',
  blurb:
    'We build practical pathways between learning, skills, institutions, and opportunity - working with colleges, employers, and communities across India and beyond.',

  // Each entry declares a value even when we do not have one yet. A null value
  // renders as a route to the enquiry form, never as an invented detail.
  // Values below are taken from the organisation's official letterhead.
  contact: [
    { label: 'Email',   icon: 'i-mail',  value: null, status: 'pending' },
    { label: 'Phone',   icon: 'i-phone', value: '+91 9323802631', status: 'confirmed' },
    { label: 'Office',  icon: 'i-pin',   value: '102, Ackruti Star, MIDC Central Road, Andheri (E), Mumbai - 400 093', status: 'confirmed' },
  ],

  // Deliberately makes no claim about legal form or tax status.
  regNote: 'A non-profit company registered in Maharashtra, India. Registration details available on request.',
};

export const positioning = {
  proposition: 'Building practical pathways between learning, skills, institutions, and opportunity.',
  mission:
    'To co-create practical, inclusive learning pathways with learners, educators, institutions, employers, and communities.',
  vision:
    'A future in which every learner can access relevant education, build useful capabilities, and pursue meaningful opportunity.',
};

export const nav = [
  { label: 'Home',         href: '/' },
  { label: 'About',        href: '/about' },
  { label: 'Work',         href: '/work' },
  { label: 'Partner with us', href: '/partner' },
  { label: 'Contact',      href: '/contact' },
];

// Replace each '#' with a real profile URL before launch, or delete the entry.
// A social icon linking to '#' is a dead control and must not ship.
export const socials = [];
