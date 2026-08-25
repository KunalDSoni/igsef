// The organisation's six activity verticals.
//
// Source: the board's "Comprehensive Activity Verticals" strategy paper.
// That paper's internal "Revenue & Strategic Value" column is NOT reproduced
// here. Each vertical instead carries an `engagement` line describing the
// delivery model in terms suitable for a public page.
//
// Every vertical ships with status 'Proposed'. The organisation was registered
// in August 2026 and nothing is operating yet. Change a status only when the
// programme owner confirms the work has actually started.

export const STATUSES = Object.freeze([
  'Proposed',
  'In development',
  'Pilot',
  'Open',
  'In delivery',
  'Completed',
  'Paused',
  'Archived',
]);

export const verticals = [
  {
    slug: 'international-academic-pathway',
    number: '01',
    title: 'International academic pathway',
    status: 'Proposed',
    tone: 'indigo',
    summary:
      'Structured routes for students moving between Indian and international institutions — course selection, admissions, and the language readiness that sits underneath both.',
    intro:
      'Studying abroad rarely fails on ability. It fails on process — the wrong course, a missed deadline, a language score that arrives too late. This vertical exists to make that process legible.',
    activities: [
      'Guidance on foreign university admissions, alongside career counselling that starts from where the student actually wants to end up',
      'Language academies covering IELTS, TOEFL, and foreign-language instruction',
      'Twin Programme affiliations that let Indian and overseas institutes recognise each other’s coursework',
    ],
    audiences: [
      'Students and families weighing an international course',
      'Indian colleges seeking overseas academic affiliations',
      'Overseas institutions looking for credible Indian partners',
    ],
    engagement:
      'Delivered as counselling for individual students, as scheduled language courses, and as formal affiliation agreements between partner institutions.',
    leadKey: 'vice-chairman',
  },
  {
    slug: 'corporate-and-industry-training',
    number: '02',
    title: 'Corporate and industry training',
    status: 'Proposed',
    tone: 'teal',
    summary:
      'Training that closes the distance between what someone has studied and what a workplace actually asks of them — for students entering work, and for professionals already in it.',
    intro:
      'Employers describe the same gap repeatedly: graduates who know the subject and not the job. This vertical addresses both sides of that gap, from either direction.',
    activities: [
      'For students — finishing schools, professional grooming, and job-ready certification programmes',
      'For professionals — upskilling workshops, leadership modules, and industry-specific technical training',
    ],
    audiences: [
      'Final-year students and recent graduates',
      'Employers developing their own teams',
      'Colleges adding employability provision to an existing curriculum',
    ],
    engagement:
      'Delivered as contracted programmes for employers and institutions, and as scheduled open courses that individuals can join directly.',
    leadKey: 'cmd',
  },
  {
    slug: 'ai-and-emerging-tech-education',
    number: '03',
    title: 'AI and emerging technology education',
    status: 'Proposed',
    tone: 'saffron',
    summary:
      'Age-appropriate AI and computing education for schools and colleges, together with the lab infrastructure needed to teach it rather than talk about it.',
    intro:
      'Most institutions want to teach AI and have no realistic route to doing it — no curriculum, no equipment, and no one on staff who has built a model. This vertical supplies all three.',
    activities: [
      'For schools — basic coding, logic building, and AI-awareness programmes',
      'For colleges — machine learning, data science, and ethics-in-AI modules',
      'AI Innovation Labs established inside partner institutions',
    ],
    audiences: [
      'Schools and school networks',
      'Colleges and technical institutes',
      'Funders and CSR teams supporting technology education',
    ],
    engagement:
      'Delivered through partner institutions, with curriculum and lab set-up scoped per campus. Structured to suit grant-funded and CSR-funded programmes.',
    leadKey: 'vice-chairman',
  },
  {
    slug: 'innovation-and-incubation',
    number: '04',
    title: 'Innovation and incubation',
    status: 'Proposed',
    tone: 'indigo',
    summary:
      'Support for student projects with commercial potential — finding them, developing them, and introducing them to people who can fund them.',
    intro:
      'A good student project usually dies at submission. This vertical is about the year after that, when an idea either becomes a product or quietly stops.',
    activities: [
      'Scouting original student projects and providing sustained mentorship',
      'Connecting out-of-the-box ideas with angel investors and venture capital',
      'Guiding the move from academic prototype to commercial product',
    ],
    audiences: [
      'Student founders and project teams',
      'Colleges running innovation or entrepreneurship cells',
      'Investors and business houses looking for early-stage ideas',
    ],
    engagement:
      'Delivered as mentorship cohorts run with partner institutions, supported by sponsorship from organisations with an interest in early-stage research and development.',
    leadKey: 'vice-chairman',
  },
  {
    slug: 'industry-academia-integration',
    number: '05',
    title: 'Industry–academia integration',
    status: 'Proposed',
    tone: 'teal',
    summary:
      'The working connection between campuses and employers: placements, internships, guest teaching, and a talent record that outlives any one hiring season.',
    intro:
      'Placement cells and hiring teams want the same outcome and rarely share a channel. This vertical is that channel, run as ongoing infrastructure rather than an annual event.',
    activities: [
      'Managing internships, job fairs, and campus placement drives',
      'Arranging guest lectures and sessions led by working corporate leaders',
      'Maintaining a talent bank spanning alumni and entry-level candidates',
    ],
    audiences: [
      'Colleges and their placement cells',
      'Employers hiring at entry level',
      'Students and alumni looking for roles',
    ],
    engagement:
      'Delivered through annual partnerships with institutions and standing hiring agreements with employers.',
    leadKey: 'cmd',
  },
  {
    slug: 'strategic-csr-and-social-impact',
    number: '06',
    title: 'Strategic CSR and social impact',
    status: 'Proposed',
    tone: 'saffron',
    summary:
      'Designing and running education programmes for companies that want their social spending to land somewhere specific and be accounted for.',
    intro:
      'Corporate social spending on education often disperses. This vertical is about designing programmes with a defined beneficiary, a defined outcome, and a record of both.',
    activities: [
      'Designing and executing education-focused corporate social responsibility projects',
      'Managing scholarship programmes end to end',
      'Infrastructure development for rural schools and colleges',
    ],
    audiences: [
      'Corporate social responsibility teams',
      'Rural schools and colleges',
      'Scholarship applicants and recipients',
    ],
    // Deliberately explicit: the statutory registrations required to act as a
    // corporate social responsibility implementing agency in India are not yet
    // in place. Saying so is better than a partner discovering it mid-contract.
    engagement:
      'Delivered as scoped projects for corporate partners. The statutory registrations required to act as an implementing agency are being completed, and we confirm our current standing in writing before any project is contracted.',
    leadKey: 'cmd',
  },
];
