// Single source of truth for the organisation's identity.
// Change these values to rebrand the entire site.
export const site = {
  name: 'IGSEF',
  fullName: 'Indo-Global Skills & Edu Foundation',
  tagline: 'Building bright young minds',
  blurb: 'We provide a safe and nurturing environment where children learn, play, and grow with confidence every day.',
  email: 'hello@indoglobalskills.org',
  phone: '+91 22 4000 1234',
  address: '14 Kalina Road, Santacruz East, Mumbai 400029',
  // Registration status is genuinely pending verification (see main branch's
  // Requirement.md §3.1) — do not publish a CIN or 80G/12A claim here until
  // an authorised owner confirms it against the MCA record.
  regNumber: 'Section 8 non-profit · registration details available on request',
};

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

// Grouped into the "All Pages" dropdown, mirroring the reference template.
export const allPages = [
  { label: 'Programs', href: '/programs' },
  { label: 'Program Details', href: '/programs/little-explorer' },
  { label: 'Teachers', href: '/teachers' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Ways to give', href: '/donate' },
  { label: 'Blogs', href: '/blog' },
  { label: 'Blog Details', href: '/blog/creative-games-that-make-learning-fun' },
  { label: '404', href: '/404' },
];

export const socials = [
  { label: 'Facebook', href: '#', icon: 'i-fb' },
  { label: 'X', href: '#', icon: 'i-x' },
  { label: 'LinkedIn', href: '#', icon: 'i-in' },
  { label: 'YouTube', href: '#', icon: 'i-yt' },
];

export const stats = [
  { value: '2,400+', label: 'Children in our classrooms' },
  { value: '38',     label: 'Learning centres running' },
  { value: '96%',    label: 'Daily attendance rate' },
  { value: '120+',   label: 'Trained community educators' },
];
