import { features } from "@/config/features";
import type { Faq } from "./types";

/**
 * FAQs — wording from `content.md` §13.
 *
 * Two answers in the copy deck are marked BLOCKED and one is conditional:
 *
 * - "Is the foundation registered?" needs verified corporate facts, so it is
 *   gated on `corporateDisclosures`.
 * - "How do you protect children and vulnerable participants?" may only be
 *   published once safeguarding roles and a policy exist. No such policy exists,
 *   so the question is not present at all — a reassuring answer with no policy
 *   behind it would be worse than its absence.
 * - The corrections/accessibility answer names a contact address, so it is gated
 *   on `publicContactDetails` and a contact-free variant is used until then.
 */
const allFaqs: Faq[] = [
  {
    id: "faq-registered",
    question: "Is the foundation registered?",
    answer: [
      "Yes. Our current legal identity details, including the registration number and the date each item was last verified, are published on our Corporate Disclosures page.",
    ],
    category: "Governance",
    order: 10,
    owner: "Corporate-data approver",
    reviewDate: "2026-11-21",
    requiresFeature: "corporateDisclosures",
  },
  {
    id: "faq-programmes-open",
    question: "Are programmes currently open?",
    answer: [
      "No applications are currently open. We will publish complete eligibility, dates, costs, delivery, support, and application information before inviting anyone to apply.",
    ],
    category: "Programmes",
    order: 20,
    owner: "Programme owner",
    reviewDate: "2026-09-21",
  },
  {
    id: "faq-who-can-propose",
    question: "Who can propose a partnership?",
    answer: [
      "We welcome initial conversations with education and training institutions, employers and industry bodies, CSR and philanthropic teams, NGOs, and community organisations whose goals align with our approved mission.",
    ],
    category: "Partnership",
    order: 30,
    owner: "Product owner",
    reviewDate: "2026-11-21",
  },
  {
    id: "faq-guarantee",
    question: "Do your programmes guarantee employment or admission?",
    answer: [
      "No. Participation or completion does not guarantee employment, admission, promotion, or third-party certification unless a programme page states a specific approved arrangement.",
    ],
    category: "Programmes",
    order: 40,
    owner: "Programme owner",
    reviewDate: "2026-11-21",
  },
  {
    id: "faq-certificate",
    question: "Do participants receive a certificate?",
    answer: [
      "Certificate information will be stated on each programme page, including the issuing body and what the certificate represents. A participation or completion certificate is not presented as a degree, diploma, accreditation, or government-recognised qualification unless it genuinely is one.",
    ],
    category: "Programmes",
    order: 50,
    owner: "Programme owner",
    reviewDate: "2026-11-21",
  },
  {
    id: "faq-donation",
    question: "Can I make a donation?",
    answer: [
      "The website does not currently accept donations. If fundraising is enabled later, we will publish applicable eligibility, payment, receipt, tax, refund, domestic and foreign contribution, and privacy information first.",
    ],
    category: "Funding",
    order: 60,
    owner: "Executive sponsor",
    reviewDate: "2026-11-21",
  },
  {
    id: "faq-overseas",
    question: "Can overseas supporters contribute?",
    answer: [
      "The website does not currently accept foreign contributions. Any future acceptance will be subject to applicable authorisation and published with the required details.",
    ],
    category: "Funding",
    order: 70,
    owner: "Executive sponsor",
    reviewDate: "2026-11-21",
  },
  {
    id: "faq-corrections",
    question: "How can I report incorrect information or an accessibility problem?",
    answer: [
      "Use the enquiry form and choose either “Accessibility” or “Governance and disclosures” as the enquiry type. Include the page address and a description of the issue.",
      "We publish material corrections transparently where appropriate.",
    ],
    category: "Governance",
    order: 80,
    owner: "Publisher/editor owner",
    reviewDate: "2026-11-21",
  },
];

/** FAQs whose publication gate is satisfied, in display order. */
export function publishedFaqs(): Faq[] {
  return allFaqs
    .filter((faq) => !faq.requiresFeature || features[faq.requiresFeature])
    .sort((a, b) => a.order - b.order);
}

export function faqsByCategory(category: string): Faq[] {
  return publishedFaqs().filter((faq) => faq.category === category);
}
