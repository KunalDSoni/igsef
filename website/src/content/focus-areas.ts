import type { FocusArea } from "./types";

/**
 * Focus Areas.
 *
 * Copy is taken verbatim from `content.md` §5.5 and §7. All four are working
 * drafts pending programme/board approval, so every record carries the public
 * status `Proposed` and `hasApprovedDetail: false` — no card may offer a
 * "View focus area" link until an approved programme brief exists
 * (project-controls.md §3).
 *
 * When a brief is approved: set `hasApprovedDetail: true`, fill `body`,
 * `eligibility` and `costStatement`, move `editorialState` to `Approved`, and
 * update `status` to the value the programme owner signs off. The detail route
 * then publishes automatically.
 */
export const focusAreas: FocusArea[] = [
  {
    id: "focus-future-ready-skills",
    slug: "future-ready-skills",
    title: "Future-ready skills",
    cardTitle: "Future-ready skills",
    summary:
      "Practical digital, communication, workplace, entrepreneurial, and professional-readiness capabilities for a changing world.",
    owner: "Programme owner",
    editorialState: "Draft",
    reviewDate: "2026-11-21",
    claimIds: [],
    status: "Proposed",
    audiences: ["Learner", "Institution", "Employer"],
    geography: "To be confirmed",
    deliveryMode: "To be confirmed",
    body: [],
    startDate: null,
    endDate: null,
    eligibility: null,
    costStatement: null,
    image: null,
    hasApprovedDetail: false,
    surface: "lavender",
    seo: {
      title: "Future-ready skills",
      description:
        "A proposed focus on practical digital, communication, workplace and professional-readiness capabilities.",
    },
  },
  {
    id: "focus-educator-institutional-capacity",
    slug: "educator-and-institutional-capacity",
    title: "Educator and institutional capacity",
    cardTitle: "Educator and institutional capacity",
    summary:
      "Tools, curriculum support, and shared learning that can help education and training providers respond to learner needs.",
    owner: "Programme owner",
    editorialState: "Draft",
    reviewDate: "2026-11-21",
    claimIds: [],
    status: "Proposed",
    audiences: ["Educator", "Institution"],
    geography: "To be confirmed",
    deliveryMode: "To be confirmed",
    body: [],
    startDate: null,
    endDate: null,
    eligibility: null,
    costStatement: null,
    image: null,
    hasApprovedDetail: false,
    surface: "mint",
    seo: {
      title: "Educator and institutional capacity",
      description:
        "A proposed focus on tools, curriculum support and shared learning for education and training providers.",
    },
  },
  {
    id: "focus-education-industry-pathways",
    slug: "education-industry-pathways",
    title: "Education–industry pathways",
    cardTitle: "Education–industry pathways",
    summary:
      "Collaboration between institutions and employers to make learning more relevant and opportunity more visible.",
    owner: "Programme owner",
    editorialState: "Draft",
    reviewDate: "2026-11-21",
    claimIds: [],
    status: "Proposed",
    audiences: ["Institution", "Employer", "Learner"],
    geography: "To be confirmed",
    deliveryMode: "To be confirmed",
    body: [],
    startDate: null,
    endDate: null,
    eligibility: null,
    costStatement: null,
    image: null,
    hasApprovedDetail: false,
    surface: "yellow",
    seo: {
      title: "Education–industry pathways",
      description:
        "A proposed focus on collaboration between institutions and employers to make learning more relevant.",
    },
  },
  {
    id: "focus-inclusive-access",
    slug: "inclusive-access",
    title: "Inclusive access",
    cardTitle: "Inclusive access",
    summary:
      "Approaches that recognise different starting points and work to reduce practical barriers to learning and participation.",
    owner: "Programme owner",
    editorialState: "Draft",
    reviewDate: "2026-11-21",
    claimIds: [],
    status: "Proposed",
    audiences: ["Learner", "NGO", "Institution"],
    geography: "To be confirmed",
    deliveryMode: "To be confirmed",
    body: [],
    startDate: null,
    endDate: null,
    eligibility: null,
    costStatement: null,
    image: null,
    hasApprovedDetail: false,
    surface: "white",
    seo: {
      title: "Inclusive access",
      description:
        "A proposed focus on reducing practical barriers to learning and participation for underserved learners.",
    },
  },
];

/** Focus areas with an approved, publishable detail page. */
export function publishedFocusAreaDetails(): FocusArea[] {
  return focusAreas.filter((f) => f.hasApprovedDetail && f.editorialState === "Approved");
}

export function findFocusAreaBySlug(slug: string): FocusArea | undefined {
  return focusAreas.find((f) => f.slug === slug);
}

/** True when any focus area currently carries the `Open` status. */
export function hasOpenProgramme(): boolean {
  return focusAreas.some((f) => f.status === "Open");
}
