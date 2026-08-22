/**
 * Page copy deck.
 *
 * Every string here is transcribed from `content.md`, which is the source of
 * truth for exact public wording after copy approval. Keeping it in one typed
 * module makes the copy-lock register in `project-controls.md` §14 checkable:
 * a reviewer can diff this file against the copy deck without reading JSX.
 *
 * Rules that apply to every addition:
 * - Default to future-facing tense ("aims to", "intends to", "proposed").
 * - Never state a planned activity as delivered, or a target as a result.
 * - No bracketed placeholder may reach this file. If the copy deck contains a
 *   placeholder, the surrounding module is gated in `features.ts` instead.
 */

export const homeCopy = {
  hero: {
    eyebrow: "Education · Skills · Opportunity",
    h1: "Practical learning. Stronger pathways.",
    body: "We aim to develop inclusive education and skills initiatives designed around real learner, institution, and workplace needs.",
    statusNote:
      "We are a newly established organisation. Programme information and opportunities will be published here as they are approved.",
  },
  /** Static, wrapping strip — never a moving ticker (project-controls.md §2). */
  missionStrip: [
    "Learner-first",
    "Practical skills",
    "Stronger institutions",
    "Industry collaboration",
    "Inclusive access",
    "Evidence and accountability",
  ],
  why: {
    eyebrow: "Why this matters",
    h2: "Learning should lead somewhere meaningful.",
    body: "Education can open doors, but only when learners can connect knowledge with confidence, practical capability, and real opportunities. Institutions and employers also need better ways to listen to one another, adapt, and collaborate. We aim to help build those connections.",
  },
  focus: {
    h2: "Our proposed focus",
    intro:
      "Our proposed focus areas will be refined through consultation and published with a clear status as they move from design to delivery.",
  },
  howWeWork: {
    h2: "How we intend to work",
    steps: [
      {
        title: "Listen",
        body: "Understand learner goals, institutional realities, workplace needs, and barriers to participation.",
      },
      {
        title: "Co-design",
        body: "Develop clear, practical models with educators, employers, communities, and intended participants.",
      },
      {
        title: "Prepare to deliver",
        body: "Define the people, safeguards, resources, responsibilities, and transparent expectations required for responsible delivery.",
      },
      {
        title: "Learn and improve",
        body: "Measure what matters, publish results with context, and improve the next cycle.",
      },
    ],
  },
  pathways: {
    h2: "Find your way in",
    items: [
      {
        audience: "Learners",
        body: "See what is in development, what is open, and what each opportunity involves.",
      },
      {
        audience: "Education institutions",
        body: "Discuss curriculum, educator capacity, learner support, or a jointly designed initiative.",
      },
      {
        audience: "Employers and industry",
        body: "Help connect learning with workplace insight, mentors, projects, exposure, and opportunity.",
      },
      {
        audience: "CSR and funders",
        body: "Explore mission alignment, governance information, programme design, and responsible measurement.",
      },
    ],
  },
  transparency: {
    h2: "New organisation. Clear commitments.",
    /** Commitments, never counters (content.md §5.8). */
    commitments: [
      "Programme status published clearly",
      "Results shown with definitions and reporting periods",
      "Governance information kept current",
      "Corrections and concerns given a visible route",
    ],
    support:
      "Trust is earned over time. We will distinguish what is planned, what is active, and what has been demonstrated.",
  },
  updates: {
    h2: "Latest from the foundation",
    emptyBody:
      "Verified updates, opportunities, and resources will appear here as they are published.",
  },
  finalCta: {
    h2: "Build relevant learning with us.",
    body: "If you represent an education institution, employer, industry body, community organisation, or funding team, we would like to understand what you are trying to achieve.",
    secondaryLabel: "See how we plan to work",
  },
} as const;

export const aboutCopy = {
  hero: {
    eyebrow: "About the foundation",
    h1: "Built to connect learning with opportunity.",
    lead: "We intend to create a collaborative platform for practical education, future-ready skills, stronger institutions, and inclusive pathways.",
  },
  why: {
    h2: "Education is most powerful when it is relevant, inclusive, and connected.",
    body: "Learners navigate changing technologies, workplaces, and expectations. Educators and institutions work to keep learning responsive. Employers need clearer ways to contribute insight and opportunity. Communities understand barriers that top-down programmes can miss. We want to help these groups build practical pathways together.",
  },
  mission: {
    label: "Mission",
    body: "To co-create practical, inclusive learning pathways with learners, educators, institutions, employers, and communities.",
  },
  vision: {
    label: "Vision",
    body: "A future in which every learner can access relevant education, build useful capabilities, and pursue meaningful opportunity.",
  },
  values: {
    h2: "What we hold ourselves to",
    items: [
      {
        title: "Learner first",
        body: "We begin with people's goals, contexts, and barriers—not with a predetermined solution.",
      },
      {
        title: "Practical relevance",
        body: "We connect learning with capabilities that matter in education, work, enterprise, and daily life.",
      },
      {
        title: "Inclusion",
        body: "We design for different starting points and work to reduce avoidable barriers to participation.",
      },
      {
        title: "Partnership",
        body: "We believe educators, institutions, employers, communities, and learners achieve more when they build together.",
      },
      {
        title: "Evidence",
        body: "We define outcomes clearly, learn from delivery, and distinguish aspiration from demonstrated results.",
      },
      {
        title: "Accountability",
        body: "We communicate programme status, governance, and results honestly and correct mistakes openly.",
      },
    ],
  },
  approach: {
    h2: "Our intended approach",
    intro:
      "As a new organisation, our approach is a commitment to how we will design and assess work—not a claim of results already achieved.",
  },
  accountability: {
    h2: "What we commit to",
    quote:
      "Because trust is earned, we will publish our governance, programme status, learning outcomes, and annual reporting as they become available. We will not present a target as a result or an association as a partnership.",
  },
  /** Shown while `features.leadership` is false. */
  leadershipPending: {
    h2: "Leadership and governance",
    body: "Profiles of the people responsible for the foundation's direction and governance will be published here once each profile has been verified and approved for publication.",
  },
  status: {
    h2: "What is live now",
    body: "No programme is currently open and no delivery has begun. The focus areas on this website are proposals under development. We publish a status against each one and update it as work progresses.",
  },
  cta: {
    h2: "Help shape work that stays connected to real needs.",
  },
} as const;

export const focusAreasCopy = {
  hero: {
    eyebrow: "Our work",
    h1: "From learning to practical capability.",
    lead: "Our proposed focus areas respond to the connections learners and institutions need. Each initiative will show a clear status, audience, scope, and next step.",
  },
  statusExplainer: {
    h2: "What each status means",
    intro:
      "“Proposed” means a direction under consideration. “In development” means an approved initiative is being designed. “Open” means complete eligibility, dates, and application information is available.",
  },
  principles: {
    h2: "What every approved initiative should make clear",
    items: [
      "Who it is for",
      "What participants can expect",
      "What it costs, if anything",
      "Who delivers and supports it",
      "What completion or certification means",
      "What outcome is intended and how it will be assessed",
      "How to ask for accessibility or safeguarding support",
      "When the information was last reviewed",
    ],
  },
  /** content.md §7.5 — shown while nothing is open. */
  noOpenProgramme: {
    title: "No applications are currently open",
    body: "We will publish complete details here before inviting anyone to apply. For partnership discussions, contact our team.",
  },
  faq: { h2: "Questions about our work" },
  cta: { h2: "Build relevant learning with us." },
} as const;

export const partnerCopy = {
  hero: {
    eyebrow: "Partner with us",
    h1: "Build relevant learning with us.",
    lead: "We invite institutions, employers, community organisations, and funding teams to explore practical education and skills initiatives together.",
  },
  routes: {
    h2: "Where a conversation could start",
    intro:
      "These are invitations to explore work together, not descriptions of capacity we already hold.",
    items: [
      {
        title: "Education and training institutions",
        body: "Explore learner needs, curriculum relevance, educator capacity, delivery pilots, or referral pathways.",
      },
      {
        title: "Employers and industry bodies",
        body: "Contribute workplace insight, mentors, projects, exposure, specialist knowledge, or appropriate opportunity pathways.",
      },
      {
        title: "CSR and philanthropic teams",
        body: "Discuss mission alignment, programme design, governance, responsible budgets, safeguards, and outcome measurement.",
        note: "Submitting an enquiry does not constitute acceptance of funding or confirmation of CSR, tax, or foreign-contribution eligibility.",
      },
      {
        title: "NGOs and community organisations",
        body: "Share local knowledge, identify barriers, co-design access, or explore responsible implementation roles.",
      },
    ],
  },
  process: {
    h2: "What happens after you contact us",
    steps: [
      {
        title: "Tell us what you are trying to achieve.",
        body: "A short initial enquiry is enough.",
      },
      {
        title: "We check fit and readiness.",
        body: "We will identify the right owner and any information needed for a useful conversation.",
      },
      {
        title: "We define a responsible next step.",
        body: "This may be an exploratory meeting, concept note, referral, or a clear decision that the opportunity is not currently a fit.",
      },
    ],
  },
  governance: {
    h2: "Start with clarity",
    body: "Review our verified legal identity, governance information, policies, and published programme status before beginning due diligence.",
    /** Used while corporate disclosures remain blocked. */
    pendingBody:
      "Our corporate disclosures page will publish the foundation's verified legal identity, governance information, and policies once each item has been checked against authoritative documents. We will not publish those details before they are verified.",
  },
  enquiry: { h2: "Start a partnership conversation" },
} as const;

export const contactCopy = {
  hero: {
    eyebrow: "Contact",
    h1: "Let's start with the right conversation.",
    lead: "Choose the reason for your enquiry so it reaches the right person. This form is for adults aged 18 or older. If you are under 18, do not submit personal information; ask a parent, guardian, or institution to contact us using their own details and without sharing unnecessary information about you. Please do not send identity documents, financial information, education records, or sensitive personal details through this form.",
  },
  enquiry: { h2: "Send an enquiry" },
} as const;

export const disclosuresCopy = {
  hero: {
    eyebrow: "Governance",
    h1: "Trust begins with clarity.",
    lead: "This page brings together our verified legal identity, governance information, policies, and public reporting. Each item shows when it was issued or last reviewed.",
  },
  earlyStageNote:
    "Our first programme reporting cycle will begin after approved delivery starts. We will not publish an impact number without a reporting period, definition, and source.",
  /**
   * content.md §12.5. Held back until legal/brand approval — the module is
   * defined so the wording is reviewable, but it is not rendered.
   */
  noAffiliationNote:
    "Indo-Global Skills & Edu Foundation is an independent organisation. A similar name does not indicate an affiliation with any college, summit, foundation, trust, company, or government initiative unless this website identifies a documented partnership explicitly.",
} as const;

export const notFoundCopy = {
  eyebrow: "Page not found",
  h1: "This page isn't here.",
  body: "The address may be incorrect, or the page may have moved. Use one of the routes below to continue.",
  primaryLabel: "Go to home",
} as const;

export const systemCopy = {
  unavailable: {
    title: "This information is not available yet.",
    body: "We will publish complete, verified details when they are approved. In the meantime, you can explore our focus areas or discuss an institutional partnership.",
  },
  expired: {
    status: "Closed",
    body: "This opportunity is no longer accepting applications or expressions of interest. The page remains available for reference and shows the date it closed.",
  },
} as const;
