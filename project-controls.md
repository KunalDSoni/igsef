# Canonical Project Controls

Project: Indo-Global Skills & Edu Foundation  
Version: 1.0  
Date: 21 August 2026  
Status: Decision baseline; named owners, durations, vendors, and URLs remain to be approved

## 1. Document precedence

If two documents appear to conflict, use this order and record a correction/decision:

1. `Requirement.md` controls product scope, functional/non-functional requirements, and acceptance.
2. `project-controls.md` controls cross-document decisions, owners, CTA destinations, measurement definitions, URL inventory, and operating gates.
3. `content.md` controls exact public wording after copy lock.
4. `design.md` controls visual presentation, components, responsive behaviour, and interaction.
5. `implementation-plan.md` controls delivery sequence, provisional effort, and handoff.
6. `traceability-matrix.md` connects requirements, build items, tests, evidence, and status.
7. `qa-launch-checklist.md` records verification and launch sign-off.
8. `research-notes.md` is internal discovery evidence only; it never overrides current official documents or approved public copy.

Change the controlling document first, then update dependent references in the same decision/change set.

## 2. Canonical MVP decisions

| Control | Current decision | Status/owner needed |
|---|---|---|
| Platform | Framer is provisional because the client selected Kidora; final only after Phase 0 feasibility go/no-go | Product + technical approval |
| Reference design | Kidora free template; preserve layout language, replace preschool positioning/content/assets | Design/content approval |
| Public language | English MVP; localisation-ready structure | Board/product decision |
| Primary audience | Institutions, employers/industry, CSR/funders; learners receive programme-status information | Final priority/geography needed |
| Primary conversion | Adult partnership enquiry | Form owner and SLA needed |
| Learner capture | No learner-interest capture in MVP | Separate future privacy/safeguarding discovery |
| General form | Adults 18+; self-attestation; minimum fields; no DOB/child/sensitive data | Legal/privacy + operations approval |
| Programmes | Present as `Proposed` until owner approves a different controlled status | Programme approval |
| Updates | CMS/template P0; public navigation only after at least one approved item exists | Content owner |
| Leadership | Public profiles and Team CMS are P1 unless approved content exists | Corporate/content approval |
| Donations | Not accepted in MVP | Separate future legal/finance discovery |
| Foreign contributions | Not accepted through the site in MVP | Separate future authorisation review |
| Newsletter | Not in MVP | Separate consent/vendor decision |
| Children’s data | Not intentionally collected in MVP; accidental-data procedure required | Privacy/safeguarding approval |
| Analytics | Minimal, consent-aware as applicable, no personal/free-text data, no session replay | Privacy/product approval |
| Moving ticker | No; static wrapping mission/status strip | Design decision locked |
| Impact | No counters or results until evidence exists | Programme/corporate approval |
| Related initiatives | Do not publish; no affiliation established | Legal/brand approval for any exception |

## 3. Canonical CTA and destination map

| Context | Exact label | Destination | Availability rule | Analytics event |
|---|---|---|---|---|
| Header/global primary | Discuss a partnership | `/partner-with-us#enquiry` | Only after form routing/SLA passes | `cta_click` |
| Home hero primary | Discuss a partnership | `/partner-with-us#enquiry` | Same as above | `cta_click` |
| Home hero secondary | Explore focus areas | `/focus-areas` | Always | `cta_click` |
| Learner information | View programme status | `/focus-areas#status` | Always; information only in MVP | `cta_click` |
| Trust/corporate | View corporate disclosures | `/corporate-disclosures` | Only after verified identity content exists; otherwise page remains blocked | `cta_click` |
| Focus card | View focus area | Approved detail URL | Hide until an approved detail page exists | `cta_click` |
| Updates Home module | View update / View all updates | Approved item/listing | Hide module until first approved item | `cta_click` |
| Contact/partnership form | Send enquiry | Current form | Only when adult notice, privacy, routing, retention, spam, success/failure pass | `form_submit_success` after acceptance |
| Download | Download `[name]` (`TYPE`, `SIZE`) | Approved accessible file/HTML route | Only with file rights/accessibility/metadata | `resource_download` |

No dead, circular, placeholder, or generic “Learn more” CTA may ship.

## 4. Controlled public vocabulary

### 4.1 Programme status values

Use these exact CMS/public values:

- `Proposed`
- `In development`
- `Pilot`
- `Open`
- `In delivery`
- `Completed`
- `Paused`
- `Archived`

`Draft` is an internal CMS/editorial status and never a public programme status. `Proposed focus` is not a separate value.

### 4.2 Focus-area names

- Future-ready skills
- Educator and institutional capacity
- Education–industry pathways
- Inclusive access

All are working drafts until programme/board approval.

### 4.3 Tense

- Default: “aims to develop,” “intends to create,” “proposed,” “we plan to.”
- Use “is developing” only after the programme owner confirms active design work.
- Use “delivers/is delivering” only during approved delivery.
- Use past/result tense only with an approved claim ID, definition, source, period, and owner.

## 5. Canonical owner and sign-off matrix

One person may hold multiple roles, but every role needs a named primary and backup before launch.

| Role | Accountable for | Required launch sign-off |
|---|---|---|
| Executive sponsor | Strategy, budget, final organisational risk acceptance | Yes |
| Product owner | Scope, priorities, CTA, platform go/no-go, release acceptance | Yes |
| Corporate-data approver | Legal identity, CIN, status, office, directors, registrations, evidence log | Yes |
| Programme owner | Mission/focus wording, programme status, eligibility, outcomes, operating claims | Yes |
| Content/brand approver | Exact copy, terminology, metadata, imagery, permissions, brand confusion | Yes |
| Legal/privacy reviewer | Legal pages, forms, data flow, retention, children, fundraising, grievance, vendors | Yes |
| Accessibility reviewer | WCAG target, manual testing, content/media/document access, known limitations | Yes |
| Design approver | Visual system, Kidora adaptation, responsive/component states | Yes |
| Technical/security owner | Framer go/no-go, domain, integrations, custom code, security, backup/rollback | Yes |
| Operations/form owner | Form routing, SLA, acknowledgement, accidental data, ongoing delivery tests | Yes |
| Analytics owner | Event dictionary, no-PII validation, dashboard, monthly action review | Yes if analytics enabled |
| Publisher/editor owner | CMS workflow, review/expiry, corrections, publishing training | Yes |
| Launch lead | Freeze, go-live, evidence, incident coordination, day-1 review | Yes |

The sign-off table in `qa-launch-checklist.md` must use this role set. A role marked “if enabled/present” signs only when that feature/content exists.

## 6. Form field and handling matrix

### 6.1 Baseline fields

| Field/data | Required? | Purpose | Public rule | Analytics |
|---|---:|---|---|---|
| Enquiry type | Yes | Routing | Controlled list | Category allowed |
| Name | Yes | Address/respond to adult enquirer | Adult form only | Never send value |
| Email | Yes | Respond | Validate; adult contact | Never send value |
| Organisation | Conditional/optional | Qualify partnership/media | Not required for general enquiry | Never send value |
| Role | Optional | Understand institutional context | Short controlled/free text | Never send value |
| Subject | Yes | Routing/context | Limit length; safe hint | Never send value |
| Message | Yes | Respond | Warn against sensitive/child data; limit length | Never send value |
| Adult confirmation | Yes | Policy self-attestation | Not proof of age; no DOB | Boolean not needed in analytics |
| Privacy Notice | Inline link/notice | Explain handling | Mandatory display; not a checkbox by default | Not an event unless policy requires |
| Marketing consent | No / absent | No MVP marketing | Must not be bundled | Not applicable |
| Phone | No by default | Only if a documented workflow requires | Optional and separately approved | Never send value |

### 6.2 Prohibited in general form

Aadhaar/PAN/government ID, exact date of birth, bank/payment data, income, caste, disability/health data, CV, education records, passwords, children’s data, identity documents, or programme application documents.

### 6.3 Accidental child/sensitive data procedure — required before launch

1. Restrict the record immediately to the privacy/safeguarding owner and necessary responder.
2. Do not copy it into chat, analytics, public CMS, general tickets, or broad email threads.
3. Assess urgency/safeguarding needs under the approved procedure.
4. Use the approved response script; do not continue an unapproved direct relationship with a child.
5. Minimise/delete/quarantine the data according to legal advice and the incident/retention rule.
6. Record the event in the restricted incident log without duplicating unnecessary personal data.
7. Review whether form wording, routing, or controls need correction.

## 7. Data retention and deletion decision matrix

Final durations require legal/privacy and operational approval before launch. `TBD` is a blocker for the affected data flow.

| Data category/system | Purpose | Proposed trigger | Retention duration | Deletion method/evidence | Owner | Status |
|---|---|---|---|---|---|---|
| Rejected/failed form attempt | Technical error handling | Failure/no accepted record | No intentional server storage beyond necessary transient logs | Vendor/log verification | Technical/privacy | TBD |
| General enquiry | Respond and document follow-up | Accepted submission | TBD | Provider deletion + restricted log | Operations/privacy | Blocked |
| Partnership lead | Assess/respond/record relationship | Accepted submission | TBD based on active conversation/closure | CRM/form deletion and audit record | Partnership/privacy | Blocked |
| Privacy/data-rights request | Verify/respond/accountability | Accepted request/closure | TBD under legal advice | Restricted case record + deletion schedule | Privacy | Blocked |
| Accessibility request | Provide alternate access/respond | Accepted request/closure | TBD; minimise disability information | Restricted record + deletion | Accessibility/privacy | Blocked |
| Spam/security logs | Protect service | Detection/event | TBD based on vendor/security need | Automated expiry/report | Technical/security | Blocked |
| Analytics event | Aggregate product measurement | Event collection | TBD in analytics settings | Automatic expiry/property deletion | Analytics/privacy | Blocked |
| Consent record | Demonstrate/operate choice if applicable | Consent/withdrawal | TBD under applicable rule | Provider record lifecycle | Privacy | Conditional |
| CMS/public content | Publish/audit | Publication/update/archive | While current plus approved archive policy | CMS archive/export/delete | Publisher | TBD |
| Claim evidence | Substantiate public claim | Approval/withdrawal | TBD by corporate/legal record policy | Restricted evidence store | Corporate/legal | Blocked |
| Incident record | Response/accountability | Incident closure | TBD by legal/security policy | Restricted archive/delete | Security/privacy | Blocked |

Vendor auto-backups, email copies, exported files, and subprocessor deletion must be included—not only the primary interface.

## 8. Privacy/data-rights and grievance operating procedure

Before forms launch:

1. Publish monitored privacy and grievance contacts.
2. Define intake channels and how staff recognise access/correction/erasure/withdrawal/grievance requests.
3. Verify the requester proportionately without collecting excessive new data.
4. Log the request in a restricted system with reference, owner, due date, systems to search, and decision.
5. Search every relevant processor/export/email location.
6. Respond in plain language using counsel-approved timelines/templates.
7. Apply correction/deletion/restriction to processors and backups where applicable.
8. Record completion and any lawful retention exception.
9. Escalate complaints/incidents to the named legal/privacy/security owner.
10. Review trends quarterly without exposing personal data.

## 9. KPI dictionary

Final numeric targets/baselines should be set after the first 30 days unless a reliable baseline exists.

| KPI | Definition/formula | Source | Exclusions | Owner | Initial target |
|---|---|---|---|---|---|
| Qualified partnership enquiry | Accepted adult enquiry with valid contact, organisation/context, relevant collaboration category, and enough detail for an owner decision | Form/follow-up register | Spam, tests, duplicates, vendors/sales outreach | Partnership/product | Baseline first 30 days |
| Accepted form completion rate | Successfully accepted submissions ÷ form starts | Privacy-safe analytics + form service | Internal tests/bots where identifiable | Product/analytics | Baseline then improve |
| Form delivery success | Accepted submissions that create confirmation and monitored notification ÷ accepted submissions | Form delivery log | Failed attempts (measured separately) | Operations/technical | 100% |
| Accessible failure coverage | Tested failure scenarios with announced useful error + alternative route ÷ defined failure scenarios | QA evidence | None | Accessibility/technical | 100% |
| Initial response SLA | Qualified enquiries receiving human acknowledgement within approved business-time window ÷ qualified enquiries | Follow-up register | Spam/tests; documented closures | Operations | ≥95% after SLA set |
| Programme-status clarity | Representative users who correctly distinguish Proposed vs Open and current availability ÷ participants | Usability notes | Facilitator-leading responses | Product/content | ≥80% formative; fix severe confusion |
| Purpose comprehension | Representative users who accurately explain purpose without inferring active delivery/impact ÷ participants | Usability notes | Leading answers | Product/content | ≥80% formative |
| Disclosure freshness | Live time-sensitive disclosure items within review date ÷ live time-sensitive items | Content/evidence register | Archived items | Corporate/publisher | 100% |
| Claim coverage | Live factual claims with current approved claim ID ÷ live factual claims requiring evidence | Claims audit | Mission/value statements labelled as such | Corporate/content | 100% |
| Broken internal links | Count from production crawl | Link check | Intentional non-HTTP actions | Technical/publisher | 0 at launch |
| Accessibility blockers | Open critical/high accessibility issues in P0 journeys | QA tracker | Approved non-blocking limitations only | Accessibility/product | 0 at launch |
| Core Web Vitals | 75th-percentile LCP, INP, CLS when field data exists | Production monitoring | Insufficient-data period labelled | Technical | Good thresholds in Requirement §14.2 |
| Publishing turnaround | Business time from complete approved draft to publish | Editorial log | Waiting on missing approval/evidence recorded separately | Publisher | Baseline first quarter |

“Low branded-search confusion” is not a KPI until a measurable method is approved. Track misdirected enquiries/search queries qualitatively first.

## 10. URL, index, metadata, and schema inventory

Final domain is represented as `{domain}`. Social images require rights-approved 1200 × 630 px assets and safe crops.

| Page | Slug/canonical | Index at launch | Schema | Social image/content rule | Redirect/condition |
|---|---|---:|---|---|---|
| Home | `https://{domain}/` | Yes | Organisation/WebSite only with verified fields | Brand/proposition; no fake learner image | Canonical host redirect |
| About | `/about` | Yes | AboutPage | Approved abstract/leadership visual | — |
| Focus Areas | `/focus-areas` | Yes | CollectionPage | Four-pillar abstract graphic | `#status` anchor works |
| Focus/programme detail | `/focus-areas/{slug}` | Only when approved | WebPage; no Course schema unless genuinely supported | Programme-specific approved media/status | Draft/P1 hidden |
| Partner With Us | `/partner-with-us` | Yes | WebPage | Collaboration visual | `#enquiry` anchor works |
| Updates | `/updates` | Only with ≥1 approved item | CollectionPage | Latest/general brand visual | Otherwise unlinked/noindex as approved |
| Update detail | `/updates/{slug}` | Per approved item | Article/NewsArticle only when accurate | Item image/title/date | Old slugs redirect |
| Contact | `/contact` | Yes | ContactPage | Brand/contact visual; no address graphic needed | — |
| Corporate Disclosures | `/corporate-disclosures` | Only after authoritative facts approved | WebPage/Organization fields only when verified | Restrained brand visual | Block until approved |
| Privacy | `/privacy` | Yes when forms/public site launch | WebPage | Default legal social card | Previous versions archived internally |
| Terms | `/terms` | Yes | WebPage | Default legal social card | — |
| Accessibility | `/accessibility` | Yes | WebPage | Default legal social card | — |
| Cookie information | `/cookies` or privacy section | According to implemented trackers | WebPage | Default legal social card | Omit separate page only if legal review approves |
| 404 | Platform 404 | No | None | No social requirement | Must return correct not-found behavior where platform allows |

Staging/preview, form success states containing references, private files, drafts, and internal search/filter combinations must not be indexed.

## 11. Framer feasibility record

Phase 0 owner records `Pass`, `Pass with control`, or `Fail` plus evidence for:

| Capability | Required evidence/decision |
|---|---|
| CMS structure | Fields, relationships, conditional/empty states, slugs, archive |
| Editorial control | Required fields or operational checklist; preview; approval; review/expiry |
| Forms | Adult field matrix, validation, errors, routing, spam/rate, retention/deletion, outage |
| Accessibility | Menu/accordion/focus/status/form semantics; reduced motion; keyboard/screen reader |
| Permissions | Organisation ownership, roles, least privilege, MFA, offboarding |
| Staging | Preview access, noindex, safe test data, separate production settings where needed |
| Export/recovery | CMS/content/config export and tested rebuild/restore route |
| SEO | Canonicals, redirects, metadata, schema, sitemap, robots, 404 |
| Privacy/consent | Tracker inventory, optional-script controls, withdrawal, vendor terms/data flow |
| Security | HTTPS, custom code/embed review, secrets, headers/limitations, vendor incident path |
| Performance | Fonts/media/scripts/effects within budget on production |
| Localisation | Language/URL/CMS expansion can be implemented without rebuild |

Any `Fail` on a P0 capability triggers a platform decision; do not hide it with undocumented custom code.

## 12. Procurement and cost model

No price is assumed in this blueprint. The product owner must collect current quotes/plan terms before approval because vendor pricing and limits change.

| Cost category | One-time considerations | Recurring considerations | Owner/decision |
|---|---|---|---|
| Framer | Build/migration/setup | Site/workspace plan, editors, bandwidth/CMS/form/localisation limits | Product/technical |
| Domain/DNS | Transfer/setup | Registration/renewal/privacy/DNS provider | Operations |
| Email | Domain setup, templates | Mailboxes, sending/transactional service, retention | Operations/security |
| Form service/CRM | Integration/configuration | Submission volume, seats, automation, storage | Operations/privacy |
| Analytics/consent | Setup/dashboard | Event volume, retention, consent tool | Product/privacy |
| Brand/logo | Identity work | Future updates | Executive/design |
| Photography/illustration | Shoot/licences/releases | New content and rights management | Content/design |
| Copy/legal | Copy lock, policies, compliance review | Updates, filings, vendor/law changes | Executive/legal |
| Accessibility | Design audit, manual/AT testing, PDF remediation | Annual/major-change review | Product/accessibility |
| Security | Threat review, scans, DNS/email auth | Monitoring, annual review, incident support | Technical/security |
| Translation | Terminology and initial translation | Editorial review per update/language | Content/product |
| Maintenance | Training/handoff | Publishing, QA, fixes, backups, reviews | Product/publisher |

Record plan limits, taxes, currency, billing owner, renewal date, cancellation/export terms, vendor lock-in, and minimum viable fallback—not price alone.

## 13. Lightweight threat and abuse review

| Threat/abuse | Control | Verification |
|---|---|---|
| Form spam/flood | Honeypot/rate controls, input limits, monitored provider | Load/spam simulation within safe limits |
| Phishing/impersonation | Organisation domain, verified sender, SPF/DKIM/DMARC plan, no public staff private emails | DNS/email-auth check |
| Malicious links/content | Restricted publishers, link review, no arbitrary user-generated content | Access/publishing test |
| Unsupported public claim | Claim IDs, approvals, review/expiry, correction route | Content/claim audit |
| Personal-data leakage | Minimum fields, no analytics values, restricted notifications/storage, redacted public docs | Payload/file/access inspection |
| Child/sensitive data | Adult warning/self-attestation, safe hint, restricted escalation/deletion procedure | Scenario test |
| Account takeover | Named accounts, MFA, least privilege, recovery/offboarding | Access review |
| Domain loss | Organisation ownership, renewal alerts, backup admin/recovery | Registrar review |
| Malicious/unsafe embed | Native-first policy, code/embed register, CSP/header limitations documented | Custom-code/source/network review |
| Dependency/vendor outage | Essential content native, form failure state, export/recovery, vendor contacts | Simulated outage/recovery review |
| Scraped director/address data misuse | Publish only required/approved corporate information; no extra private details | Corporate/privacy review |

Run a production security-header scan and document platform-controlled gaps. Review SPF, DKIM, and DMARC for any domain used to send acknowledgements. These controls complement—not replace—vendor security and legal review.

## 14. Copy-lock register format

The approved content owner maintains a row for every live section/component:

| Page | Section/component | Final text version/link | CTA label | CTA destination | Claim IDs | Status | Owner | Approver | Review date |
|---|---|---|---|---|---|---|---|---|---|
| Example: Home | Hero | COPY-HOME-001 v1 | Discuss a partnership | `/partner-with-us#enquiry` | None/IDs | Draft/Approved | TBD | TBD | YYYY-MM-DD |

Only rows marked Approved may be entered/published. A copy change updates the version, approvals, claim IDs, and review date.

## 15. Release-control rule

Launch requires:

- named owners in §5;
- resolved blockers in the retention, platform, corporate, copy, form, and vendor matrices;
- passed P0 rows in `traceability-matrix.md`;
- completed `qa-launch-checklist.md` with evidence;
- written product, corporate, programme, content, legal/privacy, accessibility, design, technical/security, operations, publisher, and executive decisions as applicable.

This controls document is operational guidance, not legal, privacy, accessibility, or security certification.
