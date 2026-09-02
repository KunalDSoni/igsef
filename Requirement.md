# Website Requirements

Project: Indo-Global Skills & Edu Foundation  
Version: 1.0  
Date: 21 August 2026  
Status: Draft for founder, board, legal, content, and implementation review  
Intended platform: Framer, subject to final feasibility and ownership approval

## 1. Document control

### 1.1 Approval roles

| Role | Responsibility | Named owner |
|---|---|---|
| Executive sponsor | Confirms strategy, budget, and launch | TBD |
| Product owner | Makes scope and priority decisions | TBD |
| Corporate-data approver | Verifies MCA and statutory facts | TBD |
| Programme owner | Verifies programme/focus-area claims | TBD |
| Content/brand approver | Approves public copy, terminology, metadata, imagery, and permissions | TBD |
| Legal/privacy reviewer | Reviews disclosures, forms, privacy, fundraising, and safeguarding | TBD |
| Design approver | Approves brand and responsive design | TBD |
| Accessibility reviewer | Reviews WCAG target, manual tests, content/media/document access, and limitations | TBD |
| Technical/security owner | Owns Framer go/no-go, domain, integrations, custom code, security, backup, and rollback | TBD |
| Operations/form owner | Owns routing, SLA, acknowledgements, accidental data, and recurring delivery tests | TBD |
| Analytics owner | Owns event dictionary, no-PII validation, dashboard, and action review if enabled | TBD |
| Publisher/editor owner | Owns CMS workflow, review/expiry, corrections, and training | TBD |
| Launch lead | Coordinates freeze, go-live, evidence, incidents, and post-launch reviews | TBD |
| Framer implementer | Builds, tests, and documents the site under the accountable owners | TBD |

`project-controls.md` §5 is the canonical role/sign-off matrix. Approval means written sign-off from the product owner plus every specialist owner applicable to the released content/features. Corporate facts, legal pages, donations, children’s data, testimonials, partner marks, and impact claims require specialist sign-off even after general design approval.

### 1.2 Change log

| Version | Date | Change |
|---|---|---|
| 1.0 | 21 Aug 2026 | Initial complete requirements baseline |

## 2. Executive summary

Create a mobile-first institutional website that introduces Indo-Global Skills & Edu Foundation, explains its approved education-and-skills focus, establishes legitimacy, and converts relevant visitors into qualified enquiries.

Because the organisation is newly registered, the first release must communicate ambition without presenting planned work as completed work. Trust will come from precise language, transparent disclosures, approved leadership information where available, clear contact routes, and evidence-backed updates-not invented statistics, generic partner logos, or implied affiliations.

### 2.1 Product principles

1. **Verified before visible.** Every corporate, programme, partner, result, and tax-status claim has an owner and source.
2. **Present, plan, and proof stay distinct.** The site clearly labels what exists, what is proposed, what is open, and what has measured results.
3. **One useful next step per audience.** Visitors can understand the organisation and act without navigating a maze.
4. **Warm institution, not nursery school.** The Kidora reference supplies friendliness and modularity; the adaptation must remain credible to adult learners, educators, employers, funders, and government stakeholders.
5. **Accessible by default.** Content, forms, interactions, and media target WCAG 2.2 Level AA.
6. **Privacy by design.** Collect only the information needed to respond; do not place personal data in analytics.

## 3. Source-of-truth and publication controls

### 3.1 Current input register

| Input | Current status | Publication rule |
|---|---|---|
| Legal name: “Indo-Global Skills & Edu Foundation” | User supplied and matched by a third-party registry profile reporting MCA-derived data | Verify against Certificate of Incorporation and MCA master data |
| Incorporation date: 12 Aug 2026 | User supplied and matched by the secondary registry profile | Verify before publishing |
| Status: Active | User supplied and matched by the secondary registry profile; time-sensitive | Check current MCA master data immediately before launch and at each disclosure review |
| Activity: education and skill development | Secondary profile reports principal activity as Education; “skill development” remains an objects/programme claim | Verify NIC/activity and approved object clauses before final wording |
| Registry state: Maharashtra | User supplied | Verify registered office and registrar details |
| CIN: `U85499MR2026NPL479632` | Exact secondary match; current third-party registry profiles show `MR` in use for some new ROC Mumbai II entities despite older `MH` examples | **Do not alter or publish solely from inference.** Confirm the exact string on the Certificate/MCA service |
| “Private non-profit company” / Section 8 status | Secondary profile reports Private, company limited by guarantee, non-government; Section 8 licence not reviewed | Publish the exact legal form/Section 8 wording only after source-document review |
| Related education summits and similarly named colleges | No relationship established | Do not describe as related, affiliated, endorsed, or partnered |

### 3.2 Required evidence register

Maintain a private evidence log for publishable claims with these fields:

- Claim ID
- Exact public wording
- Claim category
- Authoritative source/document
- Source owner
- Date checked
- Review/expiry date
- Approved by
- Pages/components where used
- Status: draft, verified, expired, withdrawn

### 3.3 Prohibited until evidenced

- Government affiliation, recognition, empanelment, or accreditation
- Affiliation with any similarly named college, foundation, summit, trust, NGO, or company
- Partner/customer logos
- Beneficiary counts, geographic reach, placement rates, completion rates, or economic impact
- Testimonials, quotations, or photographs without consent and release records
- “Leading,” “largest,” “best,” “official,” “national,” or equivalent superiority claims
- Donation tax deductibility, 12AB/80G, CSR-1, or FCRA eligibility
- Claims that proposed programmes are operating or accepting applications
- Implication that a downloadable policy or certificate is current when it has expired

## 4. Positioning

### 4.1 Working one-line proposition

> Building practical pathways between learning, skills, institutions, and opportunity.

This is a working brand line, not a legal or impact claim.

### 4.2 Working mission

> To co-create practical, inclusive learning pathways with learners, educators, institutions, employers, and communities.

The board/programme owner must approve or replace this before launch.

### 4.3 Working vision

> A future in which every learner can access relevant education, build useful capabilities, and pursue meaningful opportunity.

### 4.4 Proposed focus pillars

Use “focus areas” or “proposed work” until operating programmes are approved and live.

1. **Future-ready skills** - digital, workplace, entrepreneurial, communication, and professional-readiness capability.
2. **Educator and institutional capacity** - tools, curriculum support, and peer learning for education and training providers.
3. **Education–industry pathways** - collaboration that makes learning more relevant to real opportunities.
4. **Inclusive access** - approaches designed to reduce barriers for underserved learners and communities.

Each pillar is a proposal, not a statement of existing delivery.

## 5. Goals, non-goals, and measures

### 5.1 MVP goals

| ID | Goal | Primary measure |
|---|---|---|
| G-01 | Establish institutional legitimacy | Corporate disclosure views; About-page engagement; low branded-search confusion |
| G-02 | Explain the foundation’s approved purpose | Focus-area page engagement; comprehension feedback in usability testing |
| G-03 | Generate qualified partnership leads | Completed partner enquiries by organisation and partnership type |
| G-04 | Give learners and institutions a clear, current programme-status route | Focus-area/status engagement and valid clicks to any approved live opportunity |
| G-05 | Create a maintainable publishing channel | Time to publish an approved update; zero stale/expired live content |
| G-06 | Meet quality and access baselines | Accessibility, performance, form-delivery, and broken-link pass rates |

### 5.2 Non-goals for the MVP

- Learning-management system or online courses
- User accounts, dashboards, or community portal
- Full application/admissions workflow
- Job marketplace
- Grant-management system
- Advanced site search before content volume justifies it
- Public impact dashboard without verified outcome data
- Donation processing without legal, banking, tax, receipt, refund, and reconciliation readiness
- Automatic translation presented as authoritative content

### 5.3 Initial operational targets

- 100% of live claims have an approved source or are clearly framed as mission/plan.
- 100% of successfully accepted form submissions receive an on-screen confirmation and a monitored internal notification; failed attempts receive an accessible failure state and alternative contact route.
- 95% of qualified enquiries receive an initial human response within the approved SLA; suggested SLA: two business days.
- Zero critical WCAG failures in the defined test set.
- Zero broken internal links at launch.
- Core pages target good Core Web Vitals and a mobile Lighthouse performance score of 90 or better in a representative production test; exceptions must be documented.
- Content owners review corporate disclosures quarterly and time-sensitive opportunities monthly.

## 6. Audiences

### 6.1 Priority audiences

| Audience | Primary need | Trust question | Desired action |
|---|---|---|---|
| Students, job seekers, and early-career learners | Relevant, understandable pathways | Is anything open and is it legitimate? | Review programme status or explore a verified live opportunity |
| Schools, colleges, and training institutions | Collaboration that improves relevance/capacity | What exactly can this team offer? | Submit an institutional partnership enquiry |
| Employers and industry bodies | Skills and talent collaboration | Is there a practical delivery model? | Discuss curriculum, mentoring, exposure, or hiring pathways |
| CSR and philanthropic teams | Mission fit, governance, delivery readiness | Is the entity compliant, transparent, and capable? | Request a partnership conversation or concept note |
| Educators, trainers, and mentors | Meaningful contribution opportunities | Are roles defined and safeguarded? | Register interest only if an approved process exists |
| Government, researchers, and media | Accurate organisational facts | Where is the authoritative statement? | View disclosures or contact the designated representative |

### 6.2 Secondary audiences

- Parents and guardians
- NGOs and implementation partners
- Prospective employees and consultants
- Donors, only when fundraising is enabled
- Internal editors and administrators

### 6.3 Audience constraints

Design and content must support:

- mobile-first use and intermittent/limited bandwidth;
- clear English without sector jargon;
- future Hindi and Marathi expansion;
- varying digital literacy;
- keyboard, screen-reader, zoom, and reduced-motion use;
- users who need to verify legitimacy before sharing contact details.

## 7. Scope and priorities

### 7.1 P0 - required for launch

- Global header, accessible navigation, footer, skip link, and mobile menu
- Home
- About
- Focus Areas
- Partner With Us
- Updates / Resources listing and detail template; publish/add to navigation only when at least one approved item exists
- Contact
- Corporate Disclosures
- Privacy Notice, Terms of Use, Accessibility Statement, and cookie information appropriate to the implemented trackers
- Contact/partnership form with privacy notice, validation, routing, confirmation, and spam protection
- Framer CMS for updates/resources, focus areas/programmes, FAQs, and disclosures where appropriate
- Custom domain, HTTPS, canonical host, sitemap, robots controls, social metadata, favicon, and friendly 404
- Consent-aware analytics configuration with no personal data
- Editorial, review, backup/export, and access-control procedure

### 7.2 P1 - add when real content/processes exist

- Approved programme-detail pages and intake status
- Leadership profiles and Team Member CMS collection
- Events
- Opportunities/careers/mentor listings
- Case studies and testimonials with evidence/consent
- Newsletter sign-up with auditable consent and unsubscribe path
- Downloads and reports with accessible HTML summaries
- Hindi and/or Marathi localisation

### 7.3 P2 - conditional/future

- Applications with case management
- CRM automation
- Site search
- Impact dashboard
- Learning portal or member login
- Donation/payment system
- Volunteer onboarding
- Multiregion/language workflow

## 8. Information architecture

```text
Home
About
├── Mission, Vision & Values
├── Our Approach
├── Leadership [when approved]
└── Governance & Corporate Disclosures
Focus Areas
├── Focus Area / Programme Detail [CMS; only approved items]
└── Current Opportunities [when open]
Partner With Us
├── Education Institutions
├── Employers & Industry
├── CSR & Funders
└── Partnership Enquiry
Updates & Resources
├── Update / Article
├── Event [future]
└── Download / Report [future]
Contact
Legal
├── Privacy Notice
├── Terms of Use
├── Accessibility Statement
└── Cookie Information [as needed]
```

### 8.1 Primary navigation

Desktop: About · Focus Areas · Partner With Us · Updates (when at least one item exists) · Contact · primary CTA “Discuss a partnership”  
Mobile: same order in a full-height menu; disclosure/legal links remain in the footer.

Avoid separate “Impact” navigation until verified outcomes exist. Use “Our Approach” and “What we aim to change” instead.

## 9. Priority journeys

### J-01 - Institutional partnership

1. Visitor lands on Home or Partner With Us.
2. Visitor identifies their pathway: institution, employer/industry, or CSR/funder.
3. Visitor reviews a concise collaboration model and governance links.
4. Visitor opens a short partnership form.
5. Visitor submits organisation and enquiry details with acknowledgement of the Privacy Notice.
6. Success page explains response time and provides a reference code if the chosen form service supports it.
7. Submission routes to a named owner and is logged for follow-up.

Success: a qualified, consented enquiry reaches the correct owner and is acknowledged.  
Failure handling: preserve entered non-sensitive data where safe, show specific accessible errors, and provide a monitored email alternative.

### J-02 - Learner explores opportunities

1. Visitor lands on Focus Areas.
2. Live opportunities are clearly distinguished from proposed areas.
3. If an intake is open, visitor sees audience, location/mode, dates, eligibility, cost, safeguarding information, and application route.
4. If nothing is open, the page states that plainly and does not collect learner interest in the MVP.

Success: the visitor knows whether an opportunity is live and what to do next.

### J-03 - Trust and verification

1. Visitor opens About or Corporate Disclosures.
2. Visitor sees approved legal name, legal form, verified CIN, incorporation date, registered office disclosure level, approved leadership where published, and current certificates/policies.
3. Documents show publication/review dates and accessible formats.
4. Visitor can contact the designated corporate/media representative.

Success: the visitor can verify the organisation without relying on marketing claims.

### J-04 - Content publishing

1. Author drafts a CMS item using the approved template.
2. Author supplies owner, evidence, alt text, SEO fields, and review/expiry date.
3. Editor checks clarity and accessibility.
4. Legal/programme reviewer approves regulated or factual claims where required.
5. Publisher previews desktop and mobile and publishes/schedules.
6. Owner reviews or archives at the review date.

Success: no content bypasses the approval and expiry process.

## 10. Page requirements

### 10.1 Home

**Purpose:** establish relevance and trust, then route visitors.  
**Primary CTA:** Discuss a partnership.  
**Secondary CTA:** Explore focus areas.

Required sections, in order:

1. Header and optional factual announcement bar
2. Hero with one clear proposition and two CTAs
3. “Why we exist” problem/opportunity statement without invented data
4. Four focus-area cards labelled as approved/planned/current
5. “How we work” collaboration model
6. Audience pathways: learners, institutions, employers, CSR/funders
7. Current update(s), only if published
8. Trust/disclosure panel with verified corporate facts
9. Final partnership CTA
10. Footer with legal and disclosure links

Acceptance:

- A first-time visitor can explain the foundation’s purpose after a five-second scan.
- No unverified metric, logo, endorsement, programme, or affiliation appears.
- Both hero CTAs are visible without scrolling at a representative desktop viewport; the primary CTA remains prominent on mobile.

### 10.2 About

Required sections:

- Organisation introduction
- Mission, vision, and values
- The problem space and approved geographic/audience focus
- Theory of change / approach
- “What is live now” status note
- Leadership/governance, when approved
- Link to Corporate Disclosures

Do not use a fabricated founding story or stock “years of impact” timeline. A short 2026 establishment marker is acceptable after verification.

### 10.3 Focus Areas

Required sections:

- Page introduction explaining whether the items are focus areas, pilots, or operating programmes
- Card grid with title, plain-language summary, audience, status, and CTA
- Delivery principles
- FAQ
- Relevant contact CTA

Status vocabulary is controlled: `Proposed`, `In development`, `Pilot`, `Open`, `In delivery`, `Completed`, `Paused`.

Every open programme detail must include owner, dates, mode/location, eligibility, fees/cost statement, capacity, application deadline, selection process, accessibility/contact support, privacy link, and last-reviewed date.

### 10.4 Partner With Us

Required pathways:

- Education and training institutions
- Employers and industry bodies
- CSR and philanthropic partners
- NGOs/implementation partners, if applicable

For each pathway, show potential collaboration types as invitations, not current achievements. Include what the foundation needs in an initial enquiry and what happens next. Link to governance/disclosures. Use one adaptive or audience-tagged partnership form.

### 10.5 Updates & Resources

Required:

- CMS-driven listing with featured item and simple topic/type filters only when needed
- Detail page with author/owner, published date, updated date, reading time if reliable, body, related items, and share/copy-link controls
- Downloads show file type and size and include an HTML summary; PDFs intended for public use must be accessible
- Designed empty state for preview/direct access, but keep the page out of primary navigation until at least one approved item exists

### 10.6 Contact

Required:

- Public email and phone only after approval
- Registered/correspondence address at the approved disclosure level
- Office hours/response expectation if staffed
- Enquiry-type selector
- Minimal form fields
- Point-of-collection Privacy Notice and the approved adult confirmation; no separate privacy-acknowledgement checkbox unless legal review requires it
- Map only if the office receives visitors and embedding is privacy/performance justified
- Clear emergency/support disclaimer if relevant

### 10.7 Corporate Disclosures

Required after verification:

- Exact legal name and legal form
- CIN
- Incorporation date and current status, with “last checked” date
- Registered office details to the legally required and board-approved level
- Directors/key officers where required/approved
- Statutory registrations held, with validity dates
- Annual reports, financial statements, policies, or certificates as required and available
- Public grievance/privacy contact
- Correction request route

Each document/card includes title, issuing body, effective date, expiry/review date, file type/size, accessible summary, and source/owner.

### 10.8 Legal pages

Legal counsel must provide or approve:

- Privacy Notice
- Terms of Use
- Cookie information/notice based on the actual tracker inventory
- Accessibility Statement and feedback route
- Donation/refund/tax wording if fundraising is ever enabled
- Safeguarding and media-consent information where children or vulnerable people are involved

## 11. Functional requirements

### 11.1 Navigation and layout

- **FR-001:** Every page must provide a keyboard-accessible skip link, consistent header, primary navigation, and footer.
- **FR-002:** The mobile menu must trap focus appropriately while open, close with Escape, restore focus, expose its state programmatically, and prevent hidden-menu interaction.
- **FR-003:** Current-page navigation state must not rely on colour alone.
- **FR-004:** External links and downloads must be labelled when their behaviour is not obvious.
- **FR-005:** A branded 404 page must provide Home, Focus Areas, and Contact routes, plus Updates only when the public Updates page has content.

### 11.2 Forms

- **FR-009:** The MVP contact/partnership form is for adults aged 18 or older. It must state this before data entry/submission, require a simple “I confirm that I am 18 or older” checkbox, and tell under-18 visitors not to submit personal information. The checkbox is a policy self-attestation, not proof of age. A parent, guardian, or institution may contact the foundation using their own contact details without including unnecessary personal information about a child.
- **FR-010:** MVP form fields: enquiry type, name, email, organisation (conditional/optional), role (optional), subject, message, and the adult confirmation. Phone is optional unless a defined workflow requires it. A clear linked point-of-collection Privacy Notice is required; a separate privacy-acknowledgement checkbox is not part of the baseline unless legal review specifically requires it.
- **FR-011:** Do not request date of birth, government ID, income, disability, education records, CVs, or children’s data in the general contact form.
- **FR-012:** Labels remain visible; placeholder text is not a label.
- **FR-013:** Validation occurs accessibly, identifies the field and correction, preserves entered data, and moves focus to an error summary on failed submission.
- **FR-014:** Submission success is shown on a dedicated state/page and announced to assistive technology.
- **FR-015:** Internal notifications route by enquiry type to named, monitored owners.
- **FR-016:** Spam protection must avoid inaccessible image CAPTCHAs where possible; use honeypot, rate limiting, or privacy-appropriate managed protection.
- **FR-017:** Retention, deletion, access, export, and breach procedures exist for stored submissions.
- **FR-018:** No form content or URL parameter containing personal data is sent to analytics.
- **FR-019:** Before launch, approve an accidental-child-data procedure covering restricted access, prompt escalation to the privacy/safeguarding owner, minimisation/deletion under the approved retention rule, an appropriate response script, and incident logging. The age checkbox does not remove this need.

### 11.3 CMS and publishing

- **FR-020:** Authorised editors can create, preview, publish, update, schedule where supported, and archive updates/resources without changing layout.
- **FR-021:** Required fields prevent publication without owner, status, alt text where applicable, publish date, review date, and SEO basics.
- **FR-022:** Preview must cover desktop and mobile layouts using realistic long content.
- **FR-023:** Content with an expiry date is reviewed or removed by an assigned owner; if platform automation is unavailable, maintain a calendar process.
- **FR-024:** The team can export/backup CMS content and key configuration on a documented schedule.
- **FR-025:** Admin access uses named accounts, least privilege, MFA where supported, and prompt offboarding.

### 11.4 Media and downloads

- **FR-030:** Images must have meaningful alt text or be marked decorative.
- **FR-031:** Every public image has documented rights/consent; photos of minors require appropriate guardian and safeguarding approval.
- **FR-032:** Video has captions; audio has transcripts; autoplay with sound is prohibited.
- **FR-033:** Download links state file type and size; key content has an accessible HTML equivalent.
- **FR-034:** Responsive images avoid serving unnecessarily large files.

### 11.5 Search, sharing, and errors

- **FR-040:** Each public page has a unique title, description, canonical URL, social title/description/image, and index setting.
- **FR-041:** The site generates an XML sitemap and a robots policy; staging must be noindex and access controlled where feasible.
- **FR-042:** Friendly empty states explain what is missing and provide a next action.
- **FR-043:** Third-party outages must not remove essential contact or disclosure information.
- **FR-044:** Site search is deferred until the content inventory makes navigation/filtering insufficient.

### 11.6 Conditional features

- **FR-050:** Newsletter sign-up may launch only with an approved provider, consent record, privacy wording, confirmed subscription approach, unsubscribe flow, retention rule, and owner.
- **FR-051:** Donations may launch only after legal eligibility, domestic/foreign contribution controls, payment gateway, receipt/tax language, refund/cancellation policy, reconciliation, security, and support processes are approved.
- **FR-052:** Programme applications may launch only after the selection workflow, sensitive-data assessment, safeguarding, access control, retention/deletion, applicant support, and processor contracts are approved.

## 12. CMS/data model

### 12.1 Core collections

| Collection | Required fields |
|---|---|
| Focus Area / Programme | Title, slug, short summary, full description, status, audience, geography, delivery mode, dates, eligibility, cost statement, CTA, owner, review date, opaque claim IDs, SEO, image + alt |
| Update / Resource | Title, slug, type, summary, body, author/owner, publish/update dates, topic, related focus area, download metadata, review/expiry date, SEO, featured image + alt |
| Team Member (P1) | Name, role, short bio, approved photo + alt, credentials source, profile links, display order, active status, review date; do not create/populate for MVP unless leadership publication is approved |
| FAQ | Question, answer, category, display order, owner, review date |
| Disclosure | Title, category, document/source, plain-language summary, effective/issue date, expiry/review date, issuer, file type/size, status, owner |
| Partner | Name, relationship type, approved logo + alt, proof/consent reference, URL, active dates, owner; hide collection until real partners exist |
| Global Settings | Public contacts, social links, legal name, verified CIN, address, announcement, default SEO/social image, footer text |

CMS evidence fields store opaque claim IDs only. Source documents, signatures, identity data, private contact details, internal notes, and other non-public evidence remain in the restricted evidence register-not in Framer CMS or public assets.

### 12.2 Taxonomy

- Audience: Learner, Educator, Institution, Employer, CSR/Funder, NGO, Public/Media
- Content type: Update, Insight, Event, Report, Policy, Opportunity
- Status: Draft, Proposed, In development, Pilot, Open, In delivery, Completed, Paused, Archived
- Geography: controlled list, not free-text duplicates
- Language: English initially; reserve Hindi/Marathi identifiers

### 12.3 Content workflow

`Draft → Content review → Specialist review (if triggered) → Approved → Published → Review due → Updated or archived`

Framer does not replace organisational governance. If native permissions/review states cannot enforce this flow, use an external approval log and limit publishing access to the final publisher.

## 13. Integrations and data handling

Maintain a vendor register with vendor, purpose, data received, hosting/processing location, contract owner, retention, deletion method, incident contact, and legal review.

### 13.1 MVP integrations

| Integration | Purpose | Data rule |
|---|---|---|
| Framer hosting/CMS | Site delivery and content | Named accounts; review platform terms, subprocessors, export, and deletion |
| Form service or Framer Forms | Enquiry handling | Minimum fields; restricted access; defined retention; never expose submissions in public CMS |
| Email | Notifications and replies | Avoid sending sensitive form content in notification subject lines; monitor delivery |
| Privacy-conscious analytics | Aggregate product measurement | No names, emails, phone numbers, message text, or persistent cross-context identifiers |
| Search Console | Search health | No visitor PII |

Maps, embedded video, chat, marketing pixels, heatmaps/session replay, CRM, newsletter, and payment tools require separate privacy/performance approval before activation.

## 14. Non-functional requirements

### 14.1 Accessibility

- **NFR-A01:** Target WCAG 2.2 Level AA across templates, components, forms, media, and content.
- **NFR-A02:** All meaningful actions work by keyboard with a visible focus indicator.
- **NFR-A03:** At 200% zoom and at 320 CSS px width, content reflows without loss or two-dimensional scrolling except genuinely necessary data tables.
- **NFR-A04:** Text and interactive-component contrast meet AA; no meaning depends on colour alone.
- **NFR-A05:** Heading levels, landmarks, labels, status messages, errors, and link purpose are programmatically clear.
- **NFR-A06:** Motion honours `prefers-reduced-motion`; essential information never depends on animation.
- **NFR-A07:** Touch targets target at least 44 × 44 CSS px, with adequate spacing.
- **NFR-A08:** Public PDFs are accessible or have equivalent HTML.
- **NFR-A09:** Test with keyboard, screen reader, zoom/reflow, high-contrast considerations, and real mobile devices-not automated tools alone.

### 14.2 Performance

- **NFR-P01:** Mobile-first performance budget: initial compressed page transfer target ≤ 1.5 MB on core pages, excluding user-initiated video/downloads.
- **NFR-P02:** Hero image target ≤ 250 KB in modern formats with responsive sources; avoid background video in MVP.
- **NFR-P03:** Use at most two font families and only required weights; prefer variable fonts and `font-display: swap` where supported.
- **NFR-P04:** Limit third-party scripts and delay non-essential integrations.
- **NFR-P05:** Target good Core Web Vitals at the 75th percentile: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1, measured after production launch.

### 14.3 Browser/device support

- Current and previous major versions of Chrome, Safari, Edge, and Firefox at launch
- iOS Safari and Android Chrome on representative small and mid-size devices
- Graceful content access when animation, custom fonts, or non-essential scripts fail

### 14.4 Security and resilience

- HTTPS-only custom domain and no mixed content
- MFA and least privilege for administrators where platform support exists
- No secrets in page code, CMS fields, or public repositories
- Spam/rate protection on forms
- Documented access review and offboarding
- Monthly review of platform/integration security notices
- Backup/export schedule and tested restoration/rebuild procedure
- Incident contacts and an escalation path for data/security events
- Domain renewal and registrar access owned by the organisation, not a departing vendor

### 14.5 Privacy

- Publish an accurate plain-language Privacy Notice before collecting personal data.
- Provide a standalone, understandable collection notice at each form.
- State the categories of data collected, specific purposes, contact/rights route, retention approach, and relevant processors.
- Make withdrawal/opt-out as straightforward as sign-up where applicable.
- Apply the Digital Personal Data Protection Act, 2023 and notified rules according to the provisions in force at launch; obtain Indian legal advice on phased commencement and the foundation’s role/obligations.
- Do not collect children’s data in the MVP. If future services require it, perform a separate legal, safeguarding, consent, and security design review.

### 14.6 Maintainability

- Common layout is component-based; no repeated manual footer/header copies.
- Colours, type, spacing, radii, and shadows use shared styles/variables.
- Editors can publish standard content without free-positioning elements.
- Each custom override or embedded script has an owner, reason, source, and removal/test note.
- A new implementer can understand the structure from `implementation-plan.md` and in-project naming.

## 15. SEO and discovery

### 15.1 Search principles

- Optimise for accurate intent such as education skills foundation, institutional skills partnership, educator capacity building, education–industry collaboration, and the organisation’s verified geography.
- Do not target names of unrelated “Indo Global” institutions in a way that implies association.
- Explain the full legal name and purpose on the About/Disclosure pages to reduce brand confusion.

### 15.2 Technical SEO

- Clean lowercase, hyphenated URLs
- One canonical HTTPS host
- Unique title and meta description per page
- Indexable HTML text for essential content
- XML sitemap and correct robots rules
- Canonicals, Open Graph, and social preview images
- Organisation structured data only with verified facts and sameAs links owned by the foundation
- Article/Event schema only where page content fully supports it
- Breadcrumbs for detail pages
- Descriptive internal links; no “click here”
- Redirect register for changed URLs
- Search Console and Bing Webmaster verification

## 16. Analytics plan

### 16.1 Events

| Event | Trigger | Allowed properties |
|---|---|---|
| `cta_click` | Primary/secondary CTA activation | page, component, label, destination type |
| `nav_click` | Header/footer/mobile navigation | source, destination |
| `focus_area_view` | Detail view | public item ID, status |
| `form_start` | First meaningful form interaction | form type, page |
| `form_error` | Validation/submission error | form type, field category/error code; never entered value |
| `form_submit_success` | Confirmed submission | form type, audience category; no identity/message |
| `resource_download` | Download activation | public resource ID, type |
| `outbound_click` | External destination | destination domain/category |
| `language_change` | Future language switch | from/to language |

### 16.2 Analytics rules

- No personal data or free-text values.
- No session replay/keystroke capture in MVP.
- Document consent behaviour and retention.
- Exclude internal/test traffic where practical.
- Define UTM naming before campaigns.
- Product owner reviews a simple monthly dashboard and records actions, not just traffic totals.

## 17. Content and brand safety

- Use Indian English consistently unless a defined international audience requires another convention.
- Prefer short sentences, concrete verbs, and plain-language labels.
- Use “skills” rather than “skill” when describing the sector, except in an exact legal object/name.
- Explain acronyms on first use.
- Use dates as `12 August 2026`; use Indian digit grouping only where relevant and clearly understood.
- Never describe proposed outcomes as achieved impact.
- Label AI-generated illustrative imagery if policy/ethics review requires it; never use synthetic people as implied beneficiaries or testimonials.
- Replace all template copy, names, photos, icons, logos, links, metadata, and sample CMS content.

## 18. Governance and operations

### 18.1 RACI summary

| Activity | Responsible | Accountable | Consulted |
|---|---|---|---|
| Corporate facts/disclosures | Corporate-data approver | Executive sponsor | Legal reviewer |
| Programme/focus-area content | Programme owner | Product owner | Content and legal reviewers |
| General publishing | Content editor | Product owner | Design/accessibility reviewer |
| Form responses | Named enquiry owner | Product owner | Privacy reviewer |
| Privacy/terms/cookies | Legal/privacy reviewer | Executive sponsor | Technical owner |
| Platform/security/access | Framer/technical owner | Product owner | Privacy reviewer |
| Accessibility verification | Accessibility reviewer | Product owner | Design, content, technical owners |
| Analytics | Analytics owner | Product owner | Privacy reviewer |
| Editorial workflow/reviews | Publisher/editor owner | Product owner | Content, corporate, programme reviewers |
| Launch/rollback coordination | Launch lead | Product owner | All applicable approvers |

### 18.2 Review cadence

- Forms and notification delivery: monthly and after any integration change
- Broken links, expired opportunities, staff listings: monthly
- Corporate disclosures and legal contacts: quarterly and after any filing/change
- Privacy/cookie/vendor register: quarterly and before new integrations
- Accessibility and security: at launch, annually, and after major redesigns
- Domain, billing, admin access, and backups: quarterly

## 19. Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Incorrect or silently “corrected” CIN/legal claims | High trust/compliance risk | Preserve the supplied `MR` value in the evidence log; block publication until MCA documents are verified and signed off |
| Implied affiliation with similarly named organisations | Brand/legal confusion | Explicit claim rules; do not use their names/logos/SEO bait |
| Website overstates a new organisation’s delivery | Credibility loss | “Focus areas / in development” language and controlled status labels |
| Child-oriented template weakens institutional trust | Conversion risk | Retain warmth/layout, replace nursery motifs with documentary and systems-oriented visual language |
| Forms collect data without operational follow-up | Privacy and service failure | Named owner, SLA, minimum fields, retention/deletion process, monthly delivery test |
| Framer project access/license unclear | Build and IP risk | Confirm project access, duplication rights, asset licences, and organisational ownership |
| Heavy animation/media hurts mobile users | Access/performance risk | Static hero, compressed media, reduced motion, performance budget |
| Publishing depends on one vendor/person | Continuity risk | Organisation-owned accounts/domain, documentation, exports, second administrator |

## 20. Launch acceptance criteria

The MVP is accepted only when all P0 items pass:

1. Written approval exists for the final sitemap, page copy, responsive design, and live domain.
2. Exact legal name, CIN, incorporation date, legal form, status, address disclosure, any leadership shown, and registrations shown on the site are verified against current authoritative documents.
3. No sample/template content or assets remain.
4. No unsupported affiliation, partner, programme, impact, accreditation, government, tax, or fundraising claim remains.
5. All core journeys work on supported desktop and mobile browsers.
6. Keyboard, focus, screen-reader basics, zoom/reflow, reduced motion, contrast, labels, errors, and media alternatives pass the documented accessibility test.
7. Core pages meet the agreed production performance budget or have approved exceptions.
8. Forms deliver to named owners, show accessible success/error states, and have tested privacy, retention, and spam controls.
9. Analytics events fire once with allowed properties and no personal data.
10. Titles, descriptions, canonicals, social cards, schema, sitemap, robots, redirects, 404, and favicons are correct.
11. Privacy, terms, accessibility, and cookie information match actual site behaviour and are approved.
12. Organisation-controlled accounts own the domain, Framer project, analytics, form provider, and search-console properties.
13. Backup/export, rollback/rebuild, monitoring, access-offboarding, and incident contacts are documented and tested proportionately.
14. Named owners complete publisher and enquiry-response training.
15. All applicable canonical roles in `project-controls.md` §5 sign the launch record, including product, executive, corporate-data, programme, content/brand, legal/privacy, accessibility, design, technical/security, operations/forms, publisher/editor, analytics if enabled, and launch coordination.

## 21. Open decisions

### P0 decisions before final design/build

- What is the exact verified legal name and CIN?
- Is the entity a Section 8 company, and what public wording is approved?
- What programmes/focus areas are board-approved, operational, or still proposed?
- Which audience and geography comes first?
- Confirm the canonical adult partnership-enquiry conversion, destination, form owner, and response SLA. Learner-interest capture remains deferred pending a separate age, privacy, and safeguarding workflow.
- Who owns each enquiry type and what response SLA can be met?
- What public email, phone, office/address, leadership, and social profiles are approved?
- Is English-only acceptable for launch? If not, which content requires Hindi/Marathi parity?
- Does the Phase 0 feasibility record confirm Framer as the production platform, and can the organisation own the project/workspace and required integrations?
- What are the Kidora project/template licence and third-party asset rights?
- What is the public Framer preview or screenshot set for the exact template audit?

### Conditional decisions

- Are applications, volunteering, careers, newsletter, events, downloads, or donations actually operational at launch?
- Are 12AB, 80G, CSR-1, or FCRA registrations held and current?
- Will the foundation collect information from or about children?
- What CRM, email, analytics, and form vendors are approved?

## 22. Traceability rule

During implementation, each built page/component should reference the relevant requirement IDs in its QA ticket/checklist. Any intentional deviation requires a recorded decision containing the requirement, reason, impact, approver, and date.

This requirements document is a design and implementation brief, not legal advice.
