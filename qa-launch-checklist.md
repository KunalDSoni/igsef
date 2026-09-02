# QA and Launch Checklist

Project: Indo-Global Skills & Edu Foundation  
Version: 1.0  
Date: 21 August 2026  
Use: Copy this checklist into the launch ticket and assign every item an owner/evidence link.

Legend: `[ ]` not checked · `[x]` passed · `[!]` exception approved and linked  
Critical/high-severity failures block launch.

## 1. Launch record

| Field | Value |
|---|---|
| Production domain | TBD |
| Framer project/workspace owner | TBD |
| Target launch date/time/time zone | TBD |
| Launch lead | TBD |
| Rollback decision owner | TBD |
| Technical contact | TBD |
| Corporate-data approver | TBD |
| Content approver | TBD |
| Legal/privacy approver | TBD |
| Accessibility reviewer | TBD |
| Form-response owner | TBD |
| Evidence folder/ticket | TBD |
| Previous production version/rollback reference | TBD |

## 2. Corporate identity and claims - launch blockers

- [ ] Exact registered legal name matches the Certificate of Incorporation and current MCA data.
- [ ] CIN matches the authoritative document character for character.
- [ ] The supplied `MR` segment has not been silently changed to `MH`; the final value is source-verified.
- [ ] Incorporation date is verified.
- [ ] Current status and “last checked” date are verified.
- [ ] Legal form/category and any Section 8 description are approved from actual documents.
- [ ] Registered office wording and disclosure level are approved.
- [ ] Registrar/ROC and principal activity/object wording are approved.
- [ ] If directors/leadership are public, they are current and biographies/photographs are internally approved.
- [ ] Any 12AB, 80G, CSR-1, FCRA, tax, donation, accreditation, government, or recognition statement has current evidence and specialist approval.
- [ ] No similar-name summit, college, foundation, trust, company, or government initiative is described as related/affiliated without a documented relationship.
- [ ] Every programme status is accurate: proposed, in development, pilot, open, in delivery, completed, paused, or archived.
- [ ] Every statistic has a definition, reporting period, source, owner, and review date.
- [ ] Every testimonial, quote, logo, case study, and photograph has permission and supporting records.
- [ ] No target, forecast, aspiration, audience reach, or social impression is styled as demonstrated impact.
- [ ] Corporate Disclosures page shows correct issue/review/expiry information.
- [ ] A correction/grievance contact is visible and monitored.

Evidence links/notes:

```text
TBD
```

## 3. Template, brand, and intellectual property

- [ ] Kidora source, creator, marketplace URL, publish date, and applicable licence are recorded.
- [ ] Use complies with Framer’s Limited Commercial License for free content.
- [ ] The template is incorporated into this end product and is not redistributed as a standalone asset.
- [ ] The organisation does not claim ownership/authorship of the underlying template.
- [ ] All original template copy, metadata, names, testimonials, prices, programme claims, contact details, and links are removed.
- [ ] Every demo photograph, illustration, vector, icon, font, and code component is either licensed for this use or replaced.
- [ ] Logo/wordmark ownership and approved variants are recorded.
- [ ] Public imagery has source, rights, consent/release, alt text, and withdrawal/expiry information.
- [ ] Images of minors/vulnerable people have safeguarding and appropriate guardian/participant approval.
- [ ] No synthetic person is presented as a real learner, employee, partner, or testimonial subject.
- [ ] Trademark/domain/social-handle confusion review is complete.
- [ ] Final site visibly preserves the approved Kidora layout language without retaining a preschool tone unsuitable for the foundation.

## 4. Content QA

### Global

- [ ] Navigation labels and page names match the approved sitemap.
- [ ] One clear H1 appears on every page.
- [ ] Heading levels are logical and not chosen for visual size.
- [ ] Page copy matches the approved version and uses Indian English consistently.
- [ ] Mission, vision, values, focus areas, audiences, and geography are approved.
- [ ] Present facts, future plans, open opportunities, and measured results are clearly distinguished.
- [ ] Dates, costs, deadlines, eligibility, capacity, mode/location, contacts, and status are complete where relevant.
- [ ] Acronyms are expanded on first use.
- [ ] Link text describes the destination; no ambiguous “click here/read more” in body content.
- [ ] External links and downloads are identified when behaviour is not obvious.
- [ ] Every download shows type and size.
- [ ] Important PDF content has an accessible HTML equivalent.
- [ ] Copyright year and exact legal footer are correct.
- [ ] Public email/phone/address are correct, monitored, and approved.
- [ ] No draft markers, placeholders, lorem ipsum, hidden sample cards, or template CMS items remain.
- [ ] No empty social icon links or unowned profiles remain.
- [ ] Spelling, grammar, punctuation, names, and titles have been proofread by a second person.

### Home

- [ ] Hero states the organisation’s purpose without overclaiming.
- [ ] Primary and secondary CTAs lead to working, staffed destinations.
- [ ] Status note accurately reflects whether programmes are proposed/open.
- [ ] Focus cards show controlled status words.
- [ ] Impact/statistics section contains only verified facts or clearly labelled commitments.
- [ ] Updates section has real content or the approved empty state.
- [ ] Corporate fact panel is source-verified.

### About

- [ ] Founding statement is verified.
- [ ] If leadership content is present, it is current and approved; otherwise no empty/sample Team section or collection is public.
- [ ] Approach is framed as intended where delivery has not begun.
- [ ] Corporate Disclosures link works.

### Focus Areas / programme detail

- [ ] No “Apply” CTA appears unless a complete, open workflow exists.
- [ ] Each open item states audience, eligibility, dates, duration, mode/location, cost, selection, support, certificate status, privacy, safeguarding, contact, and last review.
- [ ] Employment/admission/certification disclaimers are accurate.
- [ ] Expired/paused/completed programmes have correct actions and do not accept new applications accidentally.

### Partner With Us

- [ ] Collaboration examples are invitations, not false claims of existing capacity/partners.
- [ ] Governance link and process/response expectation are accurate.
- [ ] Form routes to the correct owner.

### Updates & Resources

- [ ] The Updates page appears in public navigation only when at least one approved item exists; otherwise the template remains unlinked/unindexed as approved.
- [ ] Cards/detail pages show correct type, dates, owner/author, status, related content, and file metadata.
- [ ] Expired opportunities are removed or clearly archived.
- [ ] Quotes/photos/logos and claimed results have evidence/permission.

### Contact and disclosures

- [ ] Form warns visitors not to send sensitive data.
- [ ] Collection notice matches actual handling.
- [ ] Legal identity table and documents are current.
- [ ] Superseded/expired documents are labelled.
- [ ] No public file exposes signatures, private numbers/emails, IDs, bank details, or other unintended personal data.

## 5. Responsive visual QA

Test at 1440, 1280, 1024, 768, 390, 360, and 320 CSS px, plus representative real devices.

- [ ] No unintended horizontal scrolling.
- [ ] Header, menu, hero, grids, cards, forms, tables, disclosures, footer, and 404 adapt correctly.
- [ ] Text does not clip, overlap, truncate meaning, or fall outside cards.
- [ ] Long organisation/person/document names wrap correctly.
- [ ] Button labels remain readable and do not overflow.
- [ ] Tap targets are approximately 44 × 44 CSS px or larger with adequate spacing.
- [ ] Images preserve meaningful focal points and do not crop faces/context harmfully.
- [ ] Decorative vectors do not cover text or cause overflow.
- [ ] Cards collapse in the intended semantic reading order.
- [ ] Tables become readable small-screen structures or have a clearly labelled accessible scroll region.
- [ ] Sticky header does not cover anchors, headings, focus, or validation errors.
- [ ] Orientation change does not break content.
- [ ] Missing optional images/fields do not leave broken spacing.
- [ ] Empty CMS states are intentional and useful.
- [ ] Print view of Corporate Disclosures is usable if print is an approved requirement.

## 5A. Usability and comprehension QA

- [ ] A formative check includes 5–7 representative adults where feasible, with learner/early-career and institution/employer/CSR perspectives plus accessibility representation or a dedicated assisted-technology review.
- [ ] After a short Home-page view, participants can explain the foundation’s purpose without inferring active programmes or proven impact.
- [ ] Participants can distinguish `Proposed` from `Open` and identify whether anything is currently available.
- [ ] Participants can find Corporate Disclosures and the correct partnership/contact route.
- [ ] Participants understand that learner-interest capture, donations, and foreign contributions are not accepted in the MVP.
- [ ] Tasks, participants/segments, observations, severity, fixes, and accepted limitations are recorded without putting participant personal data in analytics or public artifacts.
- [ ] Material comprehension or primary-journey failures are fixed and retested before launch.

## 6. Accessibility QA - WCAG 2.2 AA target

### Automated baseline

- [ ] Automated audit run on every unique page template.
- [ ] Duplicate IDs, missing names/labels, colour contrast, landmarks, headings, and ARIA errors are resolved.
- [ ] Automated results are attached; no claim of conformance relies on automation alone.

### Keyboard

- [ ] Skip link is first or early in the tab order and works.
- [ ] All actions are reachable and usable without a mouse.
- [ ] Focus order follows the visual/logical sequence.
- [ ] Focus indicator is clearly visible on every interactive element.
- [ ] Focus is not obscured by sticky content.
- [ ] No keyboard trap exists.
- [ ] Mobile menu opens/closes by keyboard, reports state, handles Escape, and restores focus.
- [ ] Accordions/filters expose and change state correctly.
- [ ] Modals are avoided; any used modal manages focus, labels, Escape, and background interaction.

### Screen reader and semantics

- [ ] Page title and language are correct.
- [ ] Landmarks and headings give a useful outline.
- [ ] Navigation and breadcrumb labels are clear.
- [ ] Buttons, links, menu controls, icons, and form fields have correct names/roles/states.
- [ ] Status chips include text, not colour alone.
- [ ] Form required/optional state, hints, errors, and success messages are announced.
- [ ] Error summary links/focuses to affected fields.
- [ ] Dynamic filters/updates announce meaningful changes where needed.
- [ ] Decorative SVG/images are hidden appropriately.
- [ ] Meaningful alt text communicates purpose without duplication.

### Zoom, reflow, visual access

- [ ] 200% browser zoom does not lose content/function.
- [ ] Content reflows at 320 CSS px without two-dimensional scrolling except genuine tables.
- [ ] User text-spacing overrides do not clip/overlap content.
- [ ] Normal text contrast meets 4.5:1; large text meets 3:1.
- [ ] Component boundaries and focus indicators have sufficient non-text contrast.
- [ ] Links in body text are recognisable without colour alone.
- [ ] Error/success/warning states use text/icon plus colour.
- [ ] No flashing or unsafe rapid animation.

### Motion and media

- [ ] The mission/status strip is static in the MVP; reduced-motion preference removes other non-essential reveals, transforms, and decorative animation.
- [ ] Essential information does not depend on animation/hover.
- [ ] No autoplay audio.
- [ ] Video has accurate captions; audio has a transcript.
- [ ] Auto-moving content can be paused/stopped/hidden where required.
- [ ] No custom cursor impairs control visibility or orientation.

### Accessibility operations

- [ ] Accessibility Statement accurately states target, assessment date, limitations, and contact route.
- [ ] Alternate-format/accessibility requests route to a named owner and SLA.
- [ ] Manual test evidence and known exceptions are recorded.

## 7. Forms, privacy, and data handling

### Fields and notices

- [ ] General form collects only enquiry type, name, email, optional organisation/role, subject, and message unless a documented need exists.
- [ ] The MVP form clearly states that it is for adults aged 18 or older, includes the approved confirmation, and gives under-18 visitors a no-data-submission route.
- [ ] The team understands that adult confirmation is self-attestation, not age proof; an accidental-child-data restriction, escalation, minimisation/deletion, response, and incident procedure is approved and tested.
- [ ] Phone is optional unless operationally essential.
- [ ] General forms do not request Aadhaar/PAN, ID documents, date of birth, income, disability, caste, bank, CV, education records, or children’s data.
- [ ] Labels remain visible; placeholders are not labels.
- [ ] Required/optional status is clear in text.
- [ ] Point-of-collection notice states purpose and links to the current Privacy Notice.
- [ ] No separate Privacy Notice acknowledgement checkbox is present unless a recorded legal decision requires it and all field/data-flow documents match.
- [ ] Marketing consent is separate, optional, and not pre-checked.
- [ ] Visitors can withdraw/unsubscribe as easily as they joined where applicable.

### Behaviour

- [ ] Client and server/service validation are tested.
- [ ] Errors identify the field and correction in plain language.
- [ ] Entered data is preserved safely after correctable errors.
- [ ] Submitting state prevents accidental duplicate submissions without trapping users.
- [ ] Success appears only after confirmed acceptance.
- [ ] Failure state says the message was not sent and provides a monitored alternative.
- [ ] Confirmation/reference wording is accurate.
- [ ] Form works with keyboard, screen reader, zoom, autofill, and mobile input types.
- [ ] Spam protection does not create an inaccessible barrier.

### Routing and storage

- [ ] Every enquiry type reaches the named owner.
- [ ] Notifications do not place sensitive/free-text content in email subject lines.
- [ ] Sender/reply behaviour is authenticated and does not encourage spoofing.
- [ ] Test submissions arrive, can be located, acknowledged, assigned, and deleted/exported as required.
- [ ] Access is least privilege and uses named accounts/MFA where supported.
- [ ] Storage location, processor, retention, deletion, backup, and incident contacts are recorded.
- [ ] The Privacy Notice matches the actual vendor/data flow.
- [ ] No form values appear in analytics, page URLs, logs exposed to unnecessary staff, or public CMS.
- [ ] A simulated third-party outage produces the designed failure path.

### Cookies/trackers

- [ ] Final inventory covers cookies, local storage, pixels, embeds, analytics, forms, fonts, and external media.
- [ ] Unnecessary trackers/widgets are removed.
- [ ] Optional trackers wait for consent where required by approved legal design.
- [ ] Reject/withdraw controls work and do not block essential content.
- [ ] Cookie information names actual providers, purposes, and durations.

## 8. Functional and browser QA

- [ ] Current and previous major Chrome, Safari, Edge, and Firefox tested as scoped.
- [ ] Representative iOS Safari and Android Chrome tested.
- [ ] Header, mobile menu, skip link, footer, breadcrumbs, accordions, filters, pagination, CTAs, and links work.
- [ ] Logo links to Home with an accessible name.
- [ ] No broken internal/external links.
- [ ] Mail/phone links use correct destinations where included.
- [ ] Downloads open/download as labelled and are not corrupt.
- [ ] CMS listing/detail, relations, dates, filters, and empty states work.
- [ ] 404 appears on an invalid URL and offers useful routes.
- [ ] Third-party failures do not remove essential contact/disclosure content.
- [ ] No console errors indicate broken production functionality.
- [ ] No mixed-content or certificate warnings.

## 9. Performance QA

- [ ] Production site-not only Framer preview-is tested.
- [ ] Core page initial compressed transfer target is approximately 1.5 MB or lower, excluding user-requested media/downloads, or exception is recorded.
- [ ] Hero image is correctly sized/compressed in a modern format; target approximately 250 KB or lower.
- [ ] Responsive images serve appropriate sizes.
- [ ] Below-fold images are lazy loaded appropriately.
- [ ] No hero/background autoplay video in MVP.
- [ ] Only required font families, weights, and subsets load; text remains visible during font load.
- [ ] Third-party scripts are minimal and non-essential scripts are delayed.
- [ ] Large blur/backdrop/fixed effects do not cause mobile jank.
- [ ] No material layout shift from media, fonts, cookie UI, or injected widgets.
- [ ] Production Core Web Vitals target: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 at the 75th percentile when field data becomes available.
- [ ] Launch lab baseline and test conditions are recorded.

## 10. SEO and social QA

- [ ] One canonical HTTPS host is chosen; alternate host redirects consistently.
- [ ] Every public page has a unique, accurate title and meta description.
- [ ] Canonical URL is correct.
- [ ] Open Graph/social title, description, image, and URL are correct.
- [ ] Social images contain no stale/template text and have safe crops.
- [ ] URLs are clean, lowercase, stable, and hyphenated.
- [ ] XML sitemap lists intended canonical public pages only.
- [ ] Robots rules are correct.
- [ ] Staging/preview is not indexed; production pages intended for discovery are indexable.
- [ ] Organisation schema uses only verified name, URL, identity, address/contact, logo, and owned profile links.
- [ ] Article/Event schema appears only on qualifying pages and passes validation.
- [ ] Breadcrumb markup is correct where used.
- [ ] No unrelated organisation/summit/college names are used to attract traffic or imply affiliation.
- [ ] Redirect register is implemented and tested.
- [ ] Search Console/Bing properties are organisation owned and verified.
- [ ] Sitemap is submitted after launch.
- [ ] A sample share on major relevant platforms produces the intended preview.

## 11. Analytics QA

- [ ] Analytics property/account is organisation controlled.
- [ ] Event dictionary matches `Requirement.md`.
- [ ] CTA, navigation, focus-area view, form start/error/success, download, outbound, and language events fire only as approved.
- [ ] Events fire once per action, not multiple times.
- [ ] No name, email, phone, organisation, subject, message, or other personal/free-text data is captured.
- [ ] No sensitive URL parameters are captured.
- [ ] Consent behaviour is correct where applicable.
- [ ] Internal/test traffic exclusion is documented.
- [ ] Campaign UTM convention is documented.
- [ ] Dashboard/report has an owner and monthly review date.
- [ ] Session replay/keystroke capture is absent in MVP.

## 12. Security, ownership, and resilience

- [ ] HTTPS works across the site with no mixed content.
- [ ] Domain and registrar are organisation controlled with MFA/recovery contacts.
- [ ] Framer, form, analytics, DNS, email, and search accounts use named organisation-controlled access.
- [ ] At least two authorised administrators exist; excess/vendor access is removed or time-bounded.
- [ ] MFA is enabled where supported.
- [ ] No secrets, tokens, private endpoints, personal submissions, or credentials appear in page code/CMS/public files.
- [ ] A production security-header/TLS scan is reviewed; Framer/platform-controlled limitations and compensating controls are documented.
- [ ] Every custom code component, override, and embed appears in the reviewed register with owner, source, data flow, and removal/test note.
- [ ] SPF, DKIM, and DMARC are reviewed for any domain used to send form acknowledgements or operational mail.
- [ ] The lightweight threat/abuse review in `project-controls.md` §13 is completed and high-risk controls are tested.
- [ ] Form rate/spam controls are active.
- [ ] Vendor/data-processor register and incident contacts are current.
- [ ] Backup/export of content and key configuration has been taken.
- [ ] Restore/rebuild procedure has been tested proportionately.
- [ ] Rollback method and decision owner are documented.
- [ ] Domain/platform billing and renewals have monitored owners.
- [ ] Access-offboarding procedure is tested.
- [ ] Security/privacy escalation route is documented.

## 13. CMS and editor QA

- [ ] Collection fields match the approved data model.
- [ ] Required owner, status, dates, alt, SEO, review/expiry, and evidence workflow are enforced operationally.
- [ ] Author can create, preview, update, publish, and archive without changing layout.
- [ ] Draft/unapproved content cannot appear accidentally.
- [ ] Long titles/body, missing optional media, empty relations, and expired items render correctly.
- [ ] Slugs remain unique and redirects are added when changed.
- [ ] Image alt text and rights records are part of the workflow.
- [ ] Publisher can identify review-due and expired content.
- [ ] Backup/export is documented.
- [ ] At least two editors/admins complete training.
- [ ] Roles, approval flow, and emergency correction process are documented.

## 14. Final pre-launch steps

- [ ] Final content freeze timestamp recorded.
- [ ] Staging approval captured from product, design, content, corporate-data, legal/privacy, accessibility, and technical owners.
- [ ] Critical/high issue count is zero.
- [ ] Medium/low exceptions have owner, approver, rationale, and due date.
- [ ] Production DNS target and rollback values are recorded before change.
- [ ] Launch contacts are available during the launch window.
- [ ] Production publish/domain connection is complete.
- [ ] HTTPS, canonical host, redirects, robots, sitemap, metadata, 404, legal pages, and favicons are rechecked.
- [ ] Production form delivery/routing/success/failure is rechecked with labelled test data.
- [ ] Production analytics/consent is rechecked without personal data.
- [ ] Production keyboard/mobile smoke test passes.
- [ ] Monitoring and feedback contacts are active.
- [ ] Search properties and sitemap submission are complete.
- [ ] Final backup/export and screenshots are stored.
- [ ] Stakeholder launch communication is approved.

## 15. Rollback triggers

Rollback or disable the affected feature when any of these occurs:

- wrong legal identity/CIN/public disclosure;
- unintended personal data exposure;
- compromised account or malicious content;
- primary pages/site unavailable;
- forms lose, expose, or misroute submissions;
- severe inaccessible barrier prevents primary journeys;
- incorrect payment/donation/application feature appears;
- certificate/domain security failure;
- widespread broken layout/navigation on supported devices.

Record incident time, reporter, evidence, containment, decision, action, notification, recovery, and follow-up owner. Do not delete incident evidence casually.

## 16. Sign-off

| Area | Approver | Decision | Date | Evidence/notes |
|---|---|---|---|---|
| Product/scope | TBD | ☐ Approve ☐ Reject | | |
| Corporate facts | TBD | ☐ Approve ☐ Reject | | |
| Programme content | TBD | ☐ Approve ☐ Reject | | |
| Content/brand | TBD | ☐ Approve ☐ Reject | | |
| Legal/privacy | TBD | ☐ Approve ☐ Reject | | |
| Accessibility | TBD | ☐ Approve ☐ Reject | | |
| Design | TBD | ☐ Approve ☐ Reject | | |
| Technical/security | TBD | ☐ Approve ☐ Reject | | |
| Operations/forms | TBD | ☐ Approve ☐ Reject | | |
| Analytics (if enabled) | TBD | ☐ Approve ☐ Reject | | |
| Publisher/editor | TBD | ☐ Approve ☐ Reject | | |
| Launch lead | TBD | ☐ Approve ☐ Reject | | |
| Executive launch | TBD | ☐ Approve ☐ Reject | | |

## 17. Post-launch

### Within 24 hours

- [ ] Availability, forms, errors, analytics, indexing, and primary journeys reviewed.
- [ ] Test submissions/data removed according to policy.
- [ ] No unintended admin/vendor access remains.

### Day 7

- [ ] Form delivery and SLA adherence reviewed.
- [ ] 404/broken links, device issues, performance, indexing, and accessibility feedback reviewed.
- [ ] Launch issues prioritised and assigned.

### Day 30

- [ ] Qualified enquiry quality and user journeys reviewed.
- [ ] Search queries and brand confusion reviewed.
- [ ] Content freshness/publishing workflow reviewed.
- [ ] P1 backlog reprioritised based on evidence.

This checklist supports quality control; it is not a legal, accessibility, privacy, or security certification.
