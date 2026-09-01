// Named leadership and the verticals each one carries.
//
// Source: the board's "Comprehensive Activity Verticals" strategy paper.
//
// Open items, tracked in the plan's "Inputs still needed" table:
//   - The Vice Chairman's name is spelled differently on the public company
//     record. Confirm the form the organisation wants to use publicly.
//   - The titles below come from an internal paper and need board confirmation.
//   - A third director appears on the company record with no vertical assigned.
//     Add an entry here if they hold a public role.
//
// `photo` is optional: supply it only when the organisation has provided a real
// portrait. Cards without one fall back to the person's initial.
export const leadership = [
  {
    key: 'cmd',
    name: 'Dr. Ashok Digambarrao Chavan',
    role: 'Chairman and Managing Director',
    photo: '/images/ashok-chavan.jpg',
    remit:
      'Leads execution across corporate training, industry partnerships, and corporate social responsibility programmes.',
    verticalSlugs: [
      'corporate-and-industry-training',
      'industry-academia-integration',
      'strategic-csr-and-social-impact',
    ],
  },
  {
    key: 'vice-chairman',
    name: 'Prof. V. N. Rajasekharan Pillai',
    role: 'Vice Chairman',
    photo: '/images/rajshekaran-pillai.png',
    remit:
      'Provides academic direction across international affiliations, AI curriculum standards, and the innovation portfolio.',
    verticalSlugs: [
      'international-academic-pathway',
      'ai-and-emerging-tech-education',
      'innovation-and-incubation',
    ],
  },
];
