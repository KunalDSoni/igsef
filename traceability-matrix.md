# Requirement-to-Build-to-Test Traceability Matrix

Project: Indo-Global Skills & Edu Foundation  
Version: 1.0  
Date: 21 August 2026  
Status: Baseline; implementation owners and evidence links to be filled during delivery

## 1. How to use this matrix

This matrix connects the requirement source to a build item and the evidence required for acceptance. The delivery owner should add a ticket/component/page link and the reviewer should add test evidence before marking a row Passed.

Allowed status: `Not started`, `In progress`, `Blocked`, `Ready for review`, `Passed`, `Exception approved`.

An exception requires a decision record from `implementation-plan.md` with impact, approver, date, and review/remediation date. Critical identity, privacy exposure, unsupported-claim, broken-primary-journey, and severe accessibility/security requirements cannot be waived casually.

## 2. Product and content traceability

| Trace ID | Requirement source | Build/backlog item | Primary artifact/page | Acceptance evidence | Owner | Status |
|---|---|---|---|---|---|---|
| TRC-001 | G-01; Requirement §3, §10.7 | BLD-011 | Corporate Disclosures, footer fact block | Signed identity evidence register; page screenshots; corporate-data approval | TBD | Not started |
| TRC-002 | G-02; Requirement §4, §10.1–10.3 | BLD-005–007 | Home, About, Focus Areas | Approved mission/focus copy; comprehension/usability notes | TBD | Not started |
| TRC-003 | G-03; J-01 | BLD-008, BLD-010 | Partner With Us, contact form | End-to-end qualified enquiry test and routing evidence | TBD | Not started |
| TRC-004 | G-04; J-02 | BLD-007 | Focus Areas/status UI | No-open-programme state; live-opportunity test when applicable; no learner data capture in MVP | TBD | Not started |
| TRC-005 | G-05; J-04 | BLD-009, BLD-013 | CMS/editorial workflow | Draft→approval→publish→archive test; review-date evidence | TBD | Not started |
| TRC-006 | G-06; Requirement §14 | BLD-016 | All P0 templates | Accessibility/performance/browser QA report | TBD | Not started |
| TRC-007 | Requirement §3.1–3.3 | BLD-002, BLD-003 | Claims/evidence register; all public pages | Zero unsupported claims; specialist sign-off | TBD | Not started |
| TRC-008 | Requirement §7.1 | BLD-004–017 | Whole MVP | P0 scope checklist complete | TBD | Not started |
| TRC-009 | Requirement §7.2–7.3 | P1/P2 backlog | Hidden/deferred features | Confirm no accidental public routes/CMS/sample data | TBD | Not started |
| TRC-010 | Requirement §17; content.md §17–19 | BLD-005–013 | All content | Content QA, source/permission records, no template copy | TBD | Not started |
| TRC-011 | No-affiliation rule; Requirement §3.3 | BLD-005, BLD-011 | About, disclosures, metadata | Search/content audit shows no implied relationship or SEO bait | TBD | Not started |
| TRC-012 | Adult-only/no-child-data MVP; FR-009, NFR Privacy | BLD-010 | Contact/partner form | Adult notice/confirmation, under-18 guidance, field/data-flow inspection | TBD | Not started |

## 3. Page traceability

| Trace ID | Requirement source | Build item | Required output | Acceptance evidence | Owner | Status |
|---|---|---|---|---|---|---|
| TRC-020 | Requirement §10.1; content §5; design §8.1 | BLD-005 | Home | Desktop/mobile screenshots; CTA/link/content/claim checks | TBD | Not started |
| TRC-021 | Requirement §10.2; content §6; design §8.2 | BLD-006 | About | Founding/mission approval; leadership approval if present; responsive QA | TBD | Not started |
| TRC-022 | Requirement §10.3; content §7; design §8.3 | BLD-007 | Focus Areas | Status controls and empty/open-state tests | TBD | Not started |
| TRC-023 | Requirement §10.3; content §8; design §8.4 | BLD-101/P1 | Programme detail template | Complete sample using approved realistic data; eligibility/privacy/safeguarding review | TBD | Not started |
| TRC-024 | Requirement §10.4; content §9; design §8.5 | BLD-008 | Partner With Us | Pathways, governance link, form/routing test | TBD | Not started |
| TRC-025 | Requirement §10.5; content §10; design §8.6 | BLD-009 | Updates listing/detail | CMS item, empty state, download/card QA | TBD | Not started |
| TRC-026 | Requirement §10.6; content §11; design §8.7 | BLD-010 | Contact | Adult-only accessible form success/error/outage evidence | TBD | Not started |
| TRC-027 | Requirement §10.7; content §12; design §8.8 | BLD-011 | Corporate Disclosures | Current official evidence, last-checked date, document/accessibility QA | TBD | Not started |
| TRC-028 | Requirement §10.8; content §14 | BLD-012 | Privacy, Terms, Accessibility, cookie information | Legal/privacy/accessibility sign-off against final behaviour | TBD | Not started |
| TRC-029 | FR-005; Requirement §7.1 | BLD-014 | 404 | Invalid-URL test; useful keyboard-accessible routes | TBD | Not started |

## 4. Functional traceability

| Trace ID | Requirement IDs | Build item/component | Test evidence | Owner | Status |
|---|---|---|---|---|---|
| TRC-040 | FR-001–FR-005 | BLD-004, BLD-014; header/menu/footer/404 | Keyboard, focus, current-page, external/download, invalid-URL tests | TBD | Not started |
| TRC-041 | FR-009–FR-011 | BLD-010; adult-only minimal form | Field inventory, notice/confirmation, no-sensitive/child-data inspection | TBD | Not started |
| TRC-042 | FR-012–FR-014 | BLD-010; form controls/error summary/success | Keyboard + screen-reader validation and status-message evidence | TBD | Not started |
| TRC-043 | FR-015–FR-019 | BLD-010, BLD-015; routing/storage/analytics/accidental child data | Route-by-type, spam, retention/deletion, analytics payload, and restricted escalation procedure tests | TBD | Not started |
| TRC-044 | FR-020–FR-025 | BLD-013; CMS/access/backup | Authoring, preview, schedule/manual calendar, archive, export, access-removal tests | TBD | Not started |
| TRC-045 | FR-030–FR-034 | BLD-003, BLD-005–013; media/downloads | Alt/decorative test, rights register, caption/transcript, file metadata, responsive image inspection | TBD | Not started |
| TRC-046 | FR-040–FR-044 | BLD-014; SEO/empty/error resilience | Metadata/schema/sitemap/robots/empty/outage QA | TBD | Not started |
| TRC-047 | FR-050 | BLD-104/P1; newsletter | Hidden at MVP; future consent/unsubscribe/retention end-to-end evidence | TBD | Not started |
| TRC-048 | FR-051 | BLD-205/P2; donations | Hidden at MVP; future legal/payment/receipt/refund/reconciliation/security evidence | TBD | Not started |
| TRC-049 | FR-052 | BLD-201/P2; applications | Hidden at MVP; future applicant-data/safeguarding/retention/processor evidence | TBD | Not started |

## 5. CMS and component traceability

| Trace ID | Requirement/design source | Build item | Acceptance evidence | Owner | Status |
|---|---|---|---|---|---|
| TRC-060 | Requirement §12.1 | BLD-013; CMS collections | Field-by-field schema review and sample/empty/expired item render | TBD | Not started |
| TRC-061 | Requirement §12.2 | BLD-013; taxonomy/status | Filter/status consistency and controlled-value audit | TBD | Not started |
| TRC-062 | Requirement §12.3 | BLD-013; approval workflow | External/native approval log test; publisher access restriction | TBD | Not started |
| TRC-063 | design §9.1 | BLD-004; global components | Header/menu/announcement/footer variants and states | TBD | Not started |
| TRC-064 | design §9.2 | BLD-003; content components | Card/process/trust/update/disclosure/CTA/FAQ variant review | TBD | Not started |
| TRC-065 | design §9.3 | BLD-003, BLD-010; actions/forms | Default/hover/focus/active/disabled/loading/error/success states | TBD | Not started |
| TRC-066 | design §14.1–14.4 | BLD-003, BLD-013 | Naming/style/stack/variant/CMS architecture inspection | TBD | Not started |
| TRC-067 | design §14.5 | Any override/embed | Owner/purpose/privacy/access/performance/removal record and test | TBD | Not started |

## 6. Non-functional traceability

| Trace ID | Requirement IDs/source | Build item | Test evidence | Owner | Status |
|---|---|---|---|---|---|
| TRC-080 | NFR-A01–A09 | BLD-016 | Automated + manual keyboard/screen-reader/zoom/reflow/contrast/motion/media report | TBD | Not started |
| TRC-081 | NFR-P01–P05 | BLD-016 | Production transfer/image/font/script audit; lab baseline; field-monitor setup | TBD | Not started |
| TRC-082 | Requirement §14.3 | BLD-016 | Supported desktop/mobile browser matrix | TBD | Not started |
| TRC-083 | Requirement §14.4 | BLD-017 | HTTPS, access/MFA, secret, spam, backup, incident, domain-ownership review | TBD | Not started |
| TRC-084 | Requirement §14.5 | BLD-010, BLD-012, BLD-015 | Privacy notice/data flow/consent/retention/rights/vendor review | TBD | Not started |
| TRC-085 | Requirement §14.6 | BLD-003, BLD-013, BLD-017 | Component/style inspection, custom-code register, editor handoff test | TBD | Not started |
| TRC-086 | design §11 | BLD-003, BLD-016 | Timing/reduced-motion/no-autoplay/no-layout-shift test | TBD | Not started |
| TRC-087 | design §13 | BLD-005–013, BLD-016 | 1440/1280/1024/768/390/360/320 screenshots and real-device notes | TBD | Not started |

## 7. SEO, analytics, privacy, and operations traceability

| Trace ID | Requirement source | Build item | Acceptance evidence | Owner | Status |
|---|---|---|---|---|---|
| TRC-100 | Requirement §15 | BLD-014 | URL/title/description/canonical/social/schema/sitemap/robots/redirect/search-console evidence | TBD | Not started |
| TRC-101 | Requirement §16 | BLD-015 | Event debugger export, allowed-property audit, no-PII proof, owner/dashboard | TBD | Not started |
| TRC-102 | Requirement §13 | BLD-010, BLD-015, BLD-017 | Vendor register and current data-flow diagram | TBD | Not started |
| TRC-103 | Requirement §18 | BLD-017 | Named RACI, review calendar, response owners, training record | TBD | Not started |
| TRC-104 | Requirement §19 | BLD-002–017 | Risk review with mitigation owner/status | TBD | Not started |
| TRC-105 | Requirement §20 | BLD-017 | Signed launch acceptance record | TBD | Not started |
| TRC-106 | implementation-plan §6.3 | BLD-017 | Documented and proportionately tested rollback/recovery procedure | TBD | Not started |
| TRC-107 | implementation-plan §10 | BLD-017 | 24-hour, day-7, and day-30 review tickets/owners | TBD | Not started |
| TRC-108 | implementation-plan Phase 0.4; project-controls §11 | BLD-001–002 | Signed Framer feasibility go/no-go with evidence for every P0 capability | TBD | Not started |
| TRC-109 | Requirement FR-017/FR-019; project-controls §7–8 | BLD-010, BLD-017 | Approved retention/deletion matrix and privacy/grievance/accidental-data procedure tests | TBD | Not started |

## 8. Release gate summary

Before production launch:

- [ ] All P0 rows are `Passed` or have an allowed recorded exception.
- [ ] TRC-001, TRC-003, TRC-007, TRC-011, TRC-012, TRC-026–029, TRC-040–046, TRC-080–085, and TRC-100–109 have no unresolved blocking exception.
- [ ] Deferred P1/P2 rows are demonstrably absent/hidden from production.
- [ ] Evidence links are accessible to the organisation, not only a vendor.
- [ ] Corporate-data, content, legal/privacy, accessibility, technical, operations, product, and executive approvals are recorded in `qa-launch-checklist.md`.

The matrix tracks delivery evidence; it does not replace specialist review or the detailed requirements/checklists.
