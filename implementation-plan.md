# Framer Implementation Plan

Project: Indo-Global Skills & Edu Foundation  
Version: 1.0  
Date: 21 August 2026  
Status: Ready for estimation after P0 decisions and content owners are confirmed

## 1. Delivery outcome

If the Phase 0 platform go/no-go passes, deliver a production-ready Framer website based on the Kidora template, adapted for a credible education-and-skills foundation, with:

- approved responsive pages and reusable components;
- structured CMS collections;
- accurate, evidence-controlled content;
- secure, privacy-aware forms;
- accessibility and performance checks;
- SEO/social metadata and analytics;
- organisation-owned accounts, domain, documentation, and operational handoff.

The public site is not considered complete merely because pages are visually built. It is complete when the launch gates in `Requirement.md` and `qa-launch-checklist.md` pass.

## 2. Delivery assumptions

- Framer is the provisional production platform because the client selected a Framer template; final commitment depends on the Phase 0 go/no-go.
- The organisation will own the Framer workspace/project, domain, analytics, form destination, and search-console properties.
- The supplied Kidora copy is legitimately duplicated under the applicable free-content licence and will not be redistributed as a standalone template.
- The official Kidora public demo is the baseline; the supplied project copy will be checked for differences when access is available.
- English is the MVP language unless changed before build.
- Donations, user accounts, applications, learning portal, advanced search, and sensitive-data collection are out of scope.
- The foundation will supply authoritative corporate documents and name final approvers.
- The schedule starts only when the required people can review within two business days per review round.

## 3. P0 blockers

Do not publish the production site until these are resolved:

1. Certificate of Incorporation/current MCA data confirms the exact legal name, CIN, date, status, ROC, legal form/category, registered office, directors, and public-disclosure wording.
2. Board/programme owner approves mission, vision, values, primary audience, geography, focus areas, and actual programme statuses.
3. Owner confirms the canonical “Discuss a partnership” destination and staffed form-routing/SLA.
4. Legal/privacy owner approves the Privacy Notice, Terms, Accessibility Statement, collection notice, retention, grievance route, and implemented tracker/cookie inventory.
5. Framer project/template access and licence are recorded; all third-party assets are cleared or replaced.
6. The organisation controls the domain and platform accounts, with at least two appropriately authorised administrators.
7. Final logo/wordmark and public contact details are approved.

## 4. Recommended delivery phases

Estimates are working ranges for one experienced Framer designer/builder with timely review. They exclude brand identity creation, photography, legal drafting, translations, and complex external integrations.

| Phase | Typical effort | Output | Exit gate |
|---|---:|---|---|
| 0. Verification and access | 1–3 working days | Evidence register, access matrix, template delta audit, approved scope, platform feasibility record | Framer go/no-go signed; no unresolved identity/template ownership ambiguity |
| 1. Content and design lock | 3–5 days | Approved sitemap, copy baseline, design tokens, page wireframes, component map | Product/content/design approval |
| 2. Foundation build | 2–4 days | Framer variables/styles, components, header/footer, responsive shell | Component and breakpoint review |
| 3. Pages and CMS | 5–8 days | P0 pages, CMS collections/templates, empty/error states | Content-complete staging build |
| 4. Forms, SEO, privacy, analytics | 2–4 days | Working forms/routing, metadata, schema, consent/tracker setup | Functional/privacy test pass |
| 5. QA and remediation | 3–5 days | Accessibility, responsive, browser, performance, content, SEO, security QA | No open critical/high issues |
| 6. Launch and handoff | 1–2 days | Domain launch, monitoring, documentation, training, baseline report | Signed launch record |

Expected total: approximately 3–5 working weeks, mainly dependent on content/legal readiness and review speed.

## 5. Work breakdown

### Phase 0 — verification and access

#### 0.1 Project ownership

- Create/use organisation-controlled Framer workspace.
- Record workspace owner, billing owner, primary admin, backup admin, and implementer access.
- Confirm the domain registrar account is organisation controlled.
- Record renewal dates and recovery contacts.
- Do not build the only production copy in a contractor’s personal workspace.

#### 0.2 Template audit

- Open the supplied Kidora project copy.
- Compare pages/components/content with the official public demo.
- Record retained, modified, removed, and newly built items.
- Preserve an unlinked/archive copy of the original template when licence and workspace practice allow.
- Record the marketplace listing, creator, publish date, and Limited Commercial License source.
- Inventory photographs, icons, vectors, fonts, code components, custom cursors, forms, search, themes, localisation, and effects.
- Replace or verify rights for every third-party asset.

#### 0.3 Corporate/content verification

- Create the claim/evidence register specified in `Requirement.md`.
- Compare user-supplied details and secondary registry profile with the Certificate/MCA record.
- Do not change the supplied `MR` CIN segment based on older government `MH` examples; use the exact authoritative value.
- Classify every programme item as proposed, in development, pilot, open, in delivery, completed, paused, or archived.
- Remove the original “Related Initiatives” paragraph unless a real documented relationship exists.

#### 0.4 Framer platform go/no-go

Prototype and record whether the chosen Framer plan/configuration can satisfy the MVP for:

- structured CMS fields, conditional/empty content, preview, archive, and the external/native approval workflow;
- required-field/editorial enforcement or a documented operational control;
- accessible menu, accordion, focus management, errors, status messages, and reduced motion;
- adult-only form fields, point-of-collection notice, routing, accessible validation, spam/rate controls, retention/deletion, and outage handling;
- staging/preview access and reliable noindex controls;
- organisation-owned roles, least privilege, MFA availability, access removal, and vendor handoff;
- CMS/content export and a tested restore/rebuild path;
- canonical URLs, redirects, sitemap, robots, metadata, schema, consent-aware analytics, and cookie controls if required;
- custom code/embed limits, security review, performance budget, browser support, and localisation readiness.

Decision output: `Go`, `Go with recorded controls/exceptions`, or `No-go and select another platform`. A no-go pauses Framer page construction but does not invalidate the approved requirements, copy, or design direction.

### Phase 1 — content and design lock

#### 1.1 Decision workshop

Approve:

- product goal and the canonical CTA/destination map in `project-controls.md`;
- priority audiences/geography;
- MVP pages and conditional features;
- mission, vision, values, and focus areas;
- wordmark/logo and approved short name if any;
- Kidora adaptation intensity: close visual reuse versus deeper institutional restyling;
- English-only or localisation-ready launch;
- form owner, SLA, and data-retention approach;
- launch domain and target date.

#### 1.2 Content lock

- Resolve all P0 items in `content.md`.
- Enter page copy in an approval source with version/owner/date.
- Approve real/abstract imagery and alt-text approach.
- Draft/update legal pages against actual integrations.
- Prepare metadata and social images.
- Create the first approved CMS item before exposing Updates in public navigation; if none exists, approve/test the empty state but keep the page/module unlinked as specified.

#### 1.3 Design lock

- Apply Kidora’s verified Plus Jakarta Sans/Nunito Sans and cream/purple/pastel system with accessible pairings.
- Approve Home, About, Focus Areas, Partner, Updates, Contact, Disclosures, legal, CMS detail, and 404 at desktop and mobile widths.
- Approve forms through default, focus, error, submitting, failure, and success states.
- Approve component and motion rules, including reduced motion.
- Test long names, empty collections, no open programme, missing photo, expired item, and long translation-like content.

### Phase 2 — Framer foundations

#### 2.1 Duplicate and protect source

- Duplicate the licensed template into the organisation workspace.
- Rename the working project clearly.
- Keep the untouched source page/group unlinked and label it `Template Source — Do Not Publish` if permitted.
- Remove sample domains and public preview links that could cause confusion.

#### 2.2 Foundations

Build Framer variables/styles for:

- colour tokens;
- typography styles;
- spacing/radius/shadow tokens;
- container widths and section spacing;
- focus rings and semantic states;
- desktop/tablet/mobile breakpoints.

#### 2.3 Components

Build or clean shared components:

- header/mobile menu/skip link;
- announcement/static mission strip; no continuous marquee in the MVP;
- footer and corporate identity block;
- buttons and links;
- section intro;
- focus/programme card;
- audience pathway card;
- process step;
- update/resource card;
- trust/fact panel;
- disclosure row/card;
- status chip;
- FAQ accordion;
- form fields, error summary, success/failure states;
- CTA band;
- breadcrumbs, pagination/filter controls if needed.

Each component requires named variants and default/hover/focus/active/disabled/loading/error/success states as applicable.

### Phase 3 — pages and CMS

#### 3.1 Static page build

Recommended build order:

1. Global header/footer and base page shell
2. Home
3. About
4. Focus Areas listing
5. Partner With Us
6. Contact
7. Corporate Disclosures
8. Legal page template and legal pages
9. Updates listing
10. 404

Build mobile behaviour with each page, not as a final pass.

#### 3.2 CMS setup

Create collections from the model in `Requirement.md`:

- Focus Areas / Programmes
- Updates / Resources
- Team Members only as a P1 collection when leadership publication is approved
- FAQs
- Disclosures
- Partners only when real content exists

Use structured fields for status, dates, audience, files, review/expiry, ownership, alt text, and SEO. Avoid encoding filterable facts inside rich text.

#### 3.3 CMS templates

- Programme/focus-area detail
- Update/article/resource detail
- Optional team detail only if useful
- Optional disclosure detail; otherwise use rows/cards and file/summary destinations

Configure conditional visibility and empty states so blank fields do not leave broken gaps.

#### 3.4 Content entry

- Replace all Kidora sample copy/media/links.
- Enter approved text from `content.md`.
- Store only opaque claim IDs in CMS; keep `research-notes.md` and all source documents/private evidence outside Framer and public asset storage.
- Use abstract/cleared media with correct focal point and alt text.
- Add owner and review/expiry information to the external editorial log even if not all fields are public.
- Preview every CMS item at desktop, tablet, mobile, and long-content edge cases.

### Phase 4 — forms, SEO, privacy, analytics

#### 4.1 Form flow

Recommended data path:

```text
Visitor
  ↓ explicit field labels + collection notice
Framer page/form
  ↓ encrypted transmission
Approved form service/storage
  ├─→ monitored routing notification (minimum necessary details)
  └─→ restricted follow-up record with retention/deletion rule

Analytics receives only: form type, page, error code, success state
Analytics never receives: name, email, phone, organisation, subject, message
```

Implementation tasks:

- Configure the general/partnership form and conditional fields.
- Present the adult-only notice and require an “I am 18 or older” policy self-attestation without collecting date of birth; provide the under-18 guidance from `content.md`.
- Approve and test the accidental-child-data restriction, escalation, minimisation/deletion, response, and incident-log procedure; do not treat self-attestation as proof of age.
- Use accessible validation and an error summary.
- Add honeypot/rate controls or an accessible privacy-appropriate spam method.
- Route each enquiry type to a named owner.
- Avoid putting sensitive text in notification subjects.
- Configure acknowledgement if operationally approved.
- Create success/failure states and monitored email fallback.
- Test delivery from multiple addresses/devices and test spam/error paths.
- Record storage location, access list, retention, deletion, and incident owner.

#### 4.2 SEO

- Set page titles, descriptions, canonicals, social images, and index state.
- Configure clean final slugs.
- Add verified Organisation structured data only after facts are approved.
- Add Article/Event schema only where content qualifies.
- Configure XML sitemap and robots policy.
- Keep preview/staging unindexed.
- Build 404 and redirect register.
- Verify the final domain with search engines after launch.

#### 4.3 Analytics

- Select an approved analytics approach based on data minimisation, consent needs, ownership, retention, and reporting.
- Implement only the event/property set in `Requirement.md`.
- Exclude form values and personal URL parameters.
- Test each event fires once in staging/production.
- Exclude internal/test traffic where practical.
- Document dashboard owner and monthly review cadence.

#### 4.4 Privacy/cookies

- Inventory every cookie, local-storage item, request, pixel, embed, font service, form service, and analytics script.
- Remove unnecessary services.
- Configure consent before optional trackers where legal review requires it.
- Ensure rejection/withdrawal is available and does not block essential content.
- Make the Privacy Notice and cookie information match the final inventory.

### Phase 5 — QA and remediation

Run the complete `qa-launch-checklist.md`.

Conduct a small formative usability/comprehension check with 5–7 representative adults where feasible: at least two learner/early-career users, two institution/employer/CSR users, and accessibility representation or a dedicated assisted-technology review. Test whether they can explain the foundation’s purpose after a short Home-page view, distinguish Proposed from Open, find corporate disclosures, find the correct contact route, and understand that the site does not accept learner interest, donations, or foreign contributions in the MVP. Record tasks, results, material issues, fixes, and any accepted limitation.

Minimum test set:

- widths: 1440, 1280, 1024, 768, 390, 360, 320 px;
- current/previous major desktop browsers;
- representative iOS Safari and Android Chrome;
- keyboard only;
- at least one desktop screen reader and one mobile screen reader smoke test where resources allow;
- 200% zoom and 320 CSS px reflow;
- reduced motion;
- slow mobile network/performance profile;
- form success, validation, service failure, routing, and spam behaviour;
- empty CMS, long content, missing optional media, expired/open status;
- metadata, sitemap, robots, schema, social cards, links, downloads, and 404;
- admin publishing, preview, update, archive, export, and access removal.

Issue severity:

- **Critical:** legal identity error, exposed personal data, broken primary journey, site unavailable, severe security issue. Blocks launch.
- **High:** inaccessible primary control, lost form submission, wrong routing, unsupported public claim, major responsive failure. Blocks launch.
- **Medium:** material usability/content/performance issue with workaround. Fix or obtain recorded exception.
- **Low:** cosmetic or minor editorial issue. Can enter post-launch backlog with owner/date.

### Phase 6 — launch and handoff

#### 6.1 Pre-launch freeze

- Freeze content and record final version.
- Export/backup available CMS/content/configuration.
- Capture staging screenshots and production settings.
- Obtain specialist sign-offs.
- Confirm launch contacts and rollback decision owner.

#### 6.2 Domain launch

- Confirm explicit final domain and DNS records before changing them.
- Publish to custom HTTPS domain.
- Verify canonical host, certificate, redirects, robots, sitemap, favicons, and social previews.
- Re-test forms and analytics on the production domain.
- Confirm legal pages and contact ownership.
- Submit/verify sitemap and search properties.

#### 6.3 Rollback/recovery

Document before launch:

- previous published version or restoration method;
- who may trigger rollback;
- DNS/platform contacts;
- how to disable forms/trackers quickly;
- how to post a factual service notice;
- how to preserve incident evidence and notify privacy/security owners.

#### 6.4 Handoff

Provide:

- Framer project and admin/access map;
- design tokens/components/CMS map;
- content and evidence register;
- vendor/data-flow register;
- form routing and SLA map;
- analytics event dictionary/dashboard;
- domain/DNS/renewal ownership record;
- backup/export and rollback procedure;
- known issues/accepted exceptions;
- 60–90 minute editor/admin training and recording/notes;
- post-launch owner calendar.

## 6. Backlog by priority

### P0 — launch

- `BLD-001` Organisation-owned project and domain access
- `BLD-002` Template licence/source/asset audit
- `BLD-003` Design tokens and component library
- `BLD-004` Global header, navigation, mobile menu, skip link, footer
- `BLD-005` Home
- `BLD-006` About
- `BLD-007` Focus Areas listing and status model
- `BLD-008` Partner With Us
- `BLD-009` Updates listing/detail and empty state
- `BLD-010` Contact and form flow
- `BLD-011` Corporate Disclosures
- `BLD-012` Privacy, Terms, Accessibility, cookie information
- `BLD-013` CMS collections and publishing workflow
- `BLD-014` SEO/social/schema/sitemap/robots/404
- `BLD-015` Privacy-aware analytics events
- `BLD-016` Accessibility/responsive/performance/browser QA
- `BLD-017` Launch, ownership, backup, monitoring, training

### P1 — after operating content exists

- `BLD-101` Approved programme detail and intake
- `BLD-102` Leadership profiles
- `BLD-103` Events and opportunity types
- `BLD-104` Newsletter with consent/unsubscribe governance
- `BLD-105` Accessible reports/download library
- `BLD-106` Hindi/Marathi localisation
- `BLD-107` Verified case studies/testimonials

### P2 — separate discovery

- `BLD-201` Application/case-management workflow
- `BLD-202` CRM automation
- `BLD-203` Search
- `BLD-204` Impact dashboard
- `BLD-205` Donation system
- `BLD-206` Learning portal/accounts

## 7. Decision log template

For any deviation, record:

| Field | Value |
|---|---|
| Decision ID | DEC-### |
| Date | YYYY-MM-DD |
| Decision | What was chosen |
| Context | Why the choice was needed |
| Options considered | Short list |
| Impact | Scope, access, privacy, content, schedule, cost |
| Requirement affected | ID/link |
| Approver | Name/role |
| Review date | If temporary |

## 8. Definition of done for each page

A page is done when:

- its purpose, audience, primary CTA, owner, and review date are defined;
- content and claims are approved;
- desktop/tablet/mobile behaviour is complete;
- realistic long, empty, missing-media, error, and expired states are handled;
- components use approved styles/variants;
- keyboard, focus, headings, landmarks, labels, errors, media alternatives, contrast, and reflow pass;
- images/fonts/scripts meet the performance budget;
- title, description, canonical, social image, index state, and schema are set;
- analytics contains only approved events/properties;
- links, forms, downloads, routing, and alternative contact work;
- legal/privacy implications match the public notices;
- content/design/product QA signs off.

## 9. Project completion definition

The project is complete when:

- all P0 pages and requirements are accepted;
- no critical/high issues are open;
- all launch criteria in `Requirement.md` pass;
- production is verified after DNS propagation;
- platform/domain/integration ownership is handed to the organisation;
- editors can publish and archive content safely;
- response, review, backup, access, security, and correction owners are active;
- seven-day and 30-day reviews are scheduled.

## 10. Post-launch cadence

### First 24 hours

- Monitor availability, forms, errors, analytics, indexing controls, and key journeys.
- Correct critical factual or technical issues immediately through the approved incident process.

### Day 7

- Review form delivery/response, device issues, accessibility feedback, 404s, performance, and search indexing.
- Remove test data and close launch-only access.

### Day 30

- Review qualified enquiry quality, user journeys, search queries, content gaps, and publishing workflow.
- Prioritise P1 based on real operational need rather than template features.

### Ongoing

- Monthly: forms, broken links, open/expired content, analytics actions.
- Quarterly: disclosures, legal/privacy/vendor/access review, domain/billing/backup.
- Annually and after major changes: accessibility, security, content strategy, and platform resilience review.

This plan is an implementation guide, not legal or security certification.
