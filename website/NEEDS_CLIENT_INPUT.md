# Unresolved external inputs

Everything the foundation must supply, decide or approve before this website can
be published. Each item names what is blocked, who owns it, and what flips once
it is resolved.

This is a working list, not a duplicate of the blueprint. The full requirements
live in `../Requirement.md`, the decision baseline in `../project-controls.md`,
and the launch evidence in `../qa-launch-checklist.md`.

Status: nothing on this list is resolved. The build is complete and gated around
all of it.

---

## 1. Corporate identity — blocks the disclosures page and the footer

| Needed | Owner |
| --- | --- |
| Certificate of Incorporation | Corporate-data approver |
| Current official company master data (name, status, registrar, activity, registered office, directors) | Corporate-data approver |
| Confirmation of the exact registration number, character for character, from the certificate or the official service | Corporate-data approver |
| The exact legal form and the approved public wording for it | Corporate-data approver + legal |
| Whether directors are to be named publicly, and internal approval if so | Corporate-data approver |
| Approved public wording for the registered office, at the disclosure level the board agrees | Corporate-data approver + legal |

Candidate values appear in the brief and in the private research notes at the
repository root. They have secondary corroboration only. They are deliberately
absent from the application source, the browser bundle and the generated HTML,
and a unit test plus a build-output scan enforce that.

**Two things must not happen.** The registration number must not be
"corrected" by inference from a pattern — copy it exactly from the authoritative
document. And no value may be taken from a third-party registry to fill a gap.

**Unblocks:** populate `identityFields` in `src/content/disclosures.ts` with the
value and the date checked, then set `features.corporateDisclosures = true`. The
disclosures page becomes indexable, the footer identity block fills in, the
footer link appears, and the "View corporate disclosures" CTA activates.

---

## 2. Mission, focus areas and programme status — blocks the core copy

| Needed | Owner |
| --- | --- |
| Board approval of the mission, vision and values as drafted, or replacements | Board / programme owner |
| Approval of the four focus-area names, or replacements | Programme owner |
| The real status of each focus area from the controlled list | Programme owner |
| Primary audience and geography for the first year | Board / product owner |
| An approved brief for any focus area that should have a detail page | Programme owner |

The site currently shows all four focus areas as `Proposed` with no detail
pages, and states plainly that nothing is open and no delivery has begun.

**Unblocks:** update `src/content/focus-areas.ts`. See the README for the
four-step process to publish a detail page.

---

## 3. Named owners and signatories — blocks the launch record

Every role in `../project-controls.md` §5 needs a named primary and a backup:
executive sponsor, product owner, corporate-data approver, programme owner,
content/brand approver, legal/privacy reviewer, accessibility reviewer, design
approver, technical/security owner, operations/form owner, analytics owner,
publisher/editor owner, launch lead.

The content layer currently records role names as owners ("Programme owner",
"Corporate-data approver") rather than people. Replace them with real names once
assigned.

---

## 4. Public contact details — blocks the contact routes

| Needed | Owner |
| --- | --- |
| A public email address, with a named person monitoring it | Operations |
| Whether a public phone number is published, and who answers it | Operations |
| Whether a postal address is published, and at what level of detail | Operations + legal |
| A grievance/privacy contact address | Legal/privacy |
| An accessibility contact address | Accessibility reviewer |

Nothing is published today. The contact page says so plainly rather than
publishing an address nobody watches, and the site contains no `mailto:` or
`tel:` link at all.

**Unblocks:** fill in `src/content/settings.ts` and set
`features.publicContactDetails = true`.

---

## 5. Form and enquiry handling — blocks form delivery

| Needed | Owner |
| --- | --- |
| The enquiry provider, and a signed data-processing agreement | Operations + legal |
| The endpoint and credential, for the server environment | Technical |
| A named owner and monitored inbox for each of the seven enquiry types | Operations |
| An agreed response-time commitment that the owner can actually meet | Operations |
| Retention period and deletion method for an accepted enquiry | Legal/privacy |
| Who may read submissions, and how access is removed | Technical/security |
| The accidental-child-data procedure, approved and tested | Legal/privacy + safeguarding |
| Whether an automated acknowledgement is sent, and from which address | Operations |
| SPF, DKIM and DMARC for any domain used to send acknowledgements | Technical |

The form UI, validation, error states, honeypot, rate limiting and server route
are complete and tested. Delivery is switched off and the form says so.

**Unblocks:** set `ENQUIRY_ENDPOINT` (and `ENQUIRY_API_KEY` if required) in the
server environment. Set `features.publishedSla = true` and
`settings.responseSla` once a response time is agreed — that also activates the
canonical "Discuss a partnership" call to action across the site.

---

## 6. Legal and privacy wording — blocks the legal pages

| Needed | Owner |
| --- | --- |
| Approved Privacy Notice, matching the actual data flow once a provider is chosen | Legal/privacy |
| Approved Terms of Use, including liability, governing law and jurisdiction | Legal |
| Review of the Accessibility Statement | Accessibility reviewer |
| Confirmation that no cookie banner is required while no optional tracker is set | Legal/privacy |
| A child-safeguarding policy, before any work involving minors | Legal + safeguarding |

The privacy and terms pages carry a visible draft notice and are excluded from
search. They describe what the website does today rather than guessing at final
wording, and they list what counsel still has to supply.

**Unblocks:** replace the section bodies in `src/app/privacy/page.tsx` and
`src/app/terms/page.tsx`, then set `features.legalPagesApproved = true`.

---

## 7. Domain and account ownership — blocks going live

| Needed | Owner |
| --- | --- |
| The chosen domain, registered to and controlled by the organisation | Operations |
| Registrar access with at least two authorised administrators and MFA | Technical/security |
| Hosting account owned by the organisation, not by a contractor | Technical/security |
| Search Console and Bing Webmaster properties, organisation owned | Technical |
| A confirmed canonical host, and redirects from any alternate host | Technical |

No domain is assumed anywhere in the code. `NEXT_PUBLIC_SITE_URL` is unset, so
the build stays on localhost and out of search.

---

## 8. Brand and media rights — affects the visual finish

| Needed | Owner |
| --- | --- |
| A decision on the logo: commission an identity, or keep the typographic wordmark | Executive + design |
| A decision on a short name or acronym, after trademark and confusion checks | Executive |
| Photography with model releases, if real imagery is wanted | Content + design |
| Confirmation of the reference template's licence terms for this use | Technical + legal |

The site ships with a typographic wordmark and built CSS/SVG graphics, and uses
no photography. It does not depend on any of this being resolved; a commissioned
identity would replace `src/components/site/Wordmark.tsx`.

Both typefaces are SIL Open Font License 1.1 and are self-hosted, so there is no
outstanding font licensing question.

---

## 9. Analytics and consent — blocks measurement

| Needed | Owner |
| --- | --- |
| Whether analytics is used at all, and which provider | Product + privacy |
| Consent design, if the provider requires one | Legal/privacy |
| Retention period and dashboard owner | Analytics owner |

Analytics is off. The adapter forwards only the approved event dictionary and a
runtime scrubber drops anything resembling personal data or free text, but no
provider transport is implemented — deliberately, so nothing can be sent before
the decisions exist.

---

## 10. First update — blocks the Updates section

One approved, evidenced update or resource. Until then Updates is out of
navigation, out of the sitemap, `noindex`, and shows the approved empty state.

---

## 11. Sign-offs — blocks launch

`../qa-launch-checklist.md` §16 lists thirteen sign-off areas. None is signed.
Until they are, this build is a staging artefact.

Also outstanding and not satisfiable in code:

- an independent accessibility review, and testing with people who use assistive
  technology;
- a formative usability check with representative adults
  (`../implementation-plan.md` Phase 5);
- production Core Web Vitals field data, which only exists after launch;
- a production security-header and TLS scan against the real domain;
- a tested backup, restore and rollback procedure.
