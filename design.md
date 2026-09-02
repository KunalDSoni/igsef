# Website Design Specification

Project: Indo-Global Skills & Edu Foundation  
Version: 1.0  
Date: 21 August 2026  
Reference: Framer “Kidora copy” project supplied by the client; official marketplace listing and public demo audited  
Status: Visual direction ready for approval; supplied project copy still requires view access for delta checking

## 1. Design brief

Design a warm, modern, credible website for a newly established Indian education-and-skills foundation. It should feel optimistic enough for learners and communities, structured enough for institutions and government stakeholders, and transparent enough for CSR/funding due diligence.

The design should communicate:

- practical pathways, not abstract promises;
- partnership, not institutional distance;
- youthful momentum, not nursery-school playfulness;
- Indian roots and global outlook without flags, clichés, or unearned international claims;
- an early-stage organisation that is clear about what is verified, planned, open, and achieved.

### 1.1 Working creative concept: “Pathways in motion”

Use connecting curves, stepped cards, directional lines, overlapping fields, and rounded modules to suggest movement from learning to capability to opportunity. The concept adapts the friendly visual grammar of an education template without copying a children’s classroom aesthetic.

### 1.2 Desired attributes

Credible · optimistic · inclusive · practical · open · contemporary · human · evidence-led

### 1.3 Anti-goals

- Preschool/nursery motifs, crayon fonts, toy-like icons, childish copy, or primary-colour overload
- A cold government-portal aesthetic
- Generic corporate-blue stock layouts
- Flags, globes, graduation-cap patterns, handshakes, or “global network” graphics without a real reason
- Fake impact counters, partner carousels, testimonials, or map pins
- Heavy scroll-jacking, parallax, autoplay video, or decorative motion that delays content
- Decorative accessibility widgets presented as a substitute for accessible design

## 2. Reference-template status and adaptation rule

The supplied project URL currently redirects to Framer login in the available browser. The official Kidora marketplace listing and public demo are accessible and confirm the base template. The supplied copy still needs a quick delta audit because it may contain edits not present in the public demo.

The verified base template contains:

- a full-bleed photographic hero with dark overlay, oversized headline, rounded CTA, and ticker;
- a warm cream canvas, deep-purple actions, and mint/lavender/yellow pastel cards;
- rounded corners, pill buttons, starbursts, arrows, scribbles, and abstract vector decoration;
- asymmetric editorial grids combining photography, feature cards, and statistics;
- homepage modules for hero, ticker, about/impact, differentiators, programmes, environment/features, testimonials, pricing, articles, community CTA, and footer;
- pages for Home, About, Programs, Program Details, Contact, Blogs, Blog Details, Teachers, Price plan, Admission, and 404;
- CMS, forms, responsive layouts, localisation, search, light/dark theme, appear/scroll effects, and other optional interactions.

Before high-fidelity build sign-off, obtain a public preview, Framer view access, or desktop/mobile screenshots and record:

- pages, sections, components, variants, and breakpoints;
- font, colour, illustration, image, icon, and animation licences;
- third-party components or code overrides;
- CMS structure and sample items;
- accessibility and responsive gaps;
- retained, replaced, and removed elements.

### 2.1 Template mapping

| Kidora pattern | Foundation adaptation | Decision |
|---|---|---|
| Classes / curriculum | Focus areas or approved programmes | Keep layout; rewrite model and status |
| Admissions | Programme status or partnership conversation | Change CTA; do not imply open admission or collect learner interest in the MVP |
| Teachers | Leadership, advisors, or delivery team | Use only verified people with consent |
| Parent testimonials | Verified partner/learner stories | Remove at launch if none exist |
| Child-development statistics | Accountability commitments or verified programme status | Never use fabricated counters |
| Gallery | Real, consented programme photography or abstract pathway art | Replace all template media |
| Blog | Updates & Resources | Keep as CMS collection |
| Playful CTA band | Partner With Us | Retain warmth, mature the wording |
| Decorative doodles | Pathway lines, nodes, and subtle learning/work symbols | Simplify and systematise |

### 2.1.1 Page and module reuse plan

| Base template item | Production use |
|---|---|
| Home | Retain structure; replace every section’s content and imagery |
| About | Retain editorial grid; use verified founding, mission, values, approach, leadership, disclosures |
| Programs / Program Details | Convert to Focus Areas and approved programme details |
| Teachers | Convert to Leadership/Team; hide until approved profiles exist |
| Admission | Convert to Partner With Us for the MVP; archive the application pattern until a real, reviewed intake exists |
| Price plan | Remove, or convert to “Ways to engage”; never imply fees/donations without an operating model |
| Blogs / Blog Details | Rename Updates & Resources; retain CMS pattern |
| Contact | Retain layout; minimise fields and add point-of-collection privacy information |
| 404 | Rebrand and retain |
| Hero | Retain photographic/editorial composition; replace preschool image and “enrol” CTA |
| Ticker | Convert to a static, wrapping mission/status strip in the MVP; no continuous marquee |
| Impact/statistics | Replace with verified facts or accountability commitments; never invent numbers |
| Testimonials | Hide until authentic, consented stories exist |
| Community CTA | Convert to a partnership conversation |

### 2.2 Licence rule

Do not assume “free” means unrestricted. Confirm duplication, commercial/organisational use, attribution, redistribution, and third-party asset rights. Replace every template photograph, illustration, name, testimonial, logo, link, and metadata item unless the licence and content fit are documented.

## 3. Brand foundation

### 3.1 Brand architecture

Use the full name in formal contexts and first mention:

**Indo-Global Skills & Edu Foundation**

Possible short display name after approval:

**Indo-Global Skills Foundation** or **IGSE Foundation**

Do not invent or launch an acronym until trademark/domain/confusion checks and board approval are complete. The legal footer always uses the exact verified registered name.

### 3.2 Working brand line

> Practical learning. Stronger pathways.

### 3.3 Logo requirements

Until a formal identity is commissioned, use a restrained wordmark rather than a generic education icon.

Recommended mark concept for a future identity:

- two or three interlocking pathway bands forming a subtle bridge or open “I/G” monogram;
- works in one colour at 16–24 px height;
- no national flags, globes, mortarboards, books-with-torch clichés, or map outlines;
- horizontal, stacked, icon-only, monochrome, and reversed variants;
- minimum clear space equal to the cap height of the “I”;
- no shadows, gradients, outlines, rotation, or recolouring outside approved variants.

The website build must not delay waiting for a logo: a typographic wordmark is an acceptable MVP.

## 4. Colour system

The palette keeps Kidora’s verified cream/purple/pastel identity so the final site visibly uses the chosen template, while adding a dark ink neutral for institutional readability. Light accents are surfaces, not body-text colours.

| Token | Hex | Use |
|---|---|---|
| `ink-900` | `#17131C` | Primary text and dark sections |
| `ink-700` | `#433A49` | Secondary text on light backgrounds |
| `purple-800` | `#520080` | Kidora primary action/brand colour |
| `purple-950` | `#2F004A` | Darker accessible purple pairing where required |
| `lavender-100` | `#EBE1FD` | Secondary card surface |
| `mint-100` | `#D7FDCF` | Positive/learning card surface with dark text |
| `yellow-100` | `#FEEECD` | Warm card surface with dark text |
| `gold-500` | `#FCB520` | Highlight/illustration accent; use dark text |
| `green-500` | `#09D89A` | Illustration/status accent; not small text on white |
| `cream-050` | `#FCFAED` | Kidora page canvas |
| `white` | `#FFFFFF` | Cards and clean sections |
| `line-200` | `#DED7E2` | Borders/dividers |
| `error-700` | `#A83B34` | Error text and borders |
| `success-700` | `#1C6B3C` | Success states |
| `warning-800` | `#704B00` | Warning text on pale yellow |

### 4.1 Colour rules

- Use `ink-900` for most text and `purple-800` as the recognisable template action colour.
- White text is allowed only on colours that pass 4.5:1 for normal text; verify actual pairings in the design tool.
- Gold, green, and pale tints use dark ink text, never white body text.
- Links remain recognisable without colour through underline or another persistent cue.
- Status chips combine words and, if useful, icons; colour never carries status alone.
- Error, warning, success, and information colours are semantic and not reassigned for decoration in the same context.
- Aim for roughly 70% cream/white, 15% ink/purple, and 15% pastel/gold/green accents per page.

### 4.2 Tested text pairings

Calculated WCAG contrast ratios for the specified hex values:

| Text | Background | Ratio | Approved use |
|---|---|---:|---|
| `ink-900` | `cream-050` | 17.48:1 | All text sizes |
| `ink-700` | `cream-050` | 10.33:1 | All text sizes |
| `purple-800` | `white` | 12.57:1 | Links, buttons/text, headings |
| `purple-800` | `cream-050` | 11.99:1 | Links and headings |
| `white` | `purple-800` | 12.57:1 | Filled buttons/sections |
| `ink-900` | `mint-100` | 16.44:1 | All text sizes |
| `ink-900` | `lavender-100` | 14.59:1 | All text sizes |
| `ink-900` | `yellow-100` | 15.99:1 | All text sizes |
| `ink-900` | `gold-500` | 10.27:1 | All text sizes |
| `ink-900` | `green-500` | 9.86:1 | All text sizes |
| `error-700` | `white` | 6.29:1 | Error text |
| `success-700` | `white` | 6.53:1 | Success text |
| `warning-800` | `yellow-100` | 6.80:1 | Warning text |

Re-test any opacity, gradient, overlay, blend mode, hover state, or token change; ratios above apply only to the solid listed values.

## 5. Typography

### 5.1 Font stack

- Display/headings: **Plus Jakarta Sans**; public-demo H1/H2 were observed at weight 700. Weights 600–800 are the proposed production range.
- Body/UI: **Nunito Sans**; public-demo paragraphs were observed at weight 400. Weights 600/700 for UI and emphasis are production choices.
- Fallback: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

Both families must be loaded only in needed weights. If font licensing or performance makes two families undesirable, use Plus Jakarta Sans for the complete interface.

### 5.2 Type scale

Use responsive `clamp()`-style sizing where Framer supports it; the table gives target bounds.

| Style | Desktop | Mobile | Line height | Max line length |
|---|---:|---:|---:|---|
| Display | 72 px | 42 px | 1.02–1.08 | 11–14 words |
| H1 | 60 px | 38 px | 1.08–1.15 | 16 words |
| H2 | 44 px | 32 px | 1.12–1.2 | 2 lines |
| H3 | 28 px | 24 px | 1.2–1.3 | 2 lines |
| H4 | 22 px | 20 px | 1.3 | - |
| Lead | 22 px | 19 px | 1.5 | 60 characters |
| Body large | 18 px | 18 px | 1.55–1.65 | 65–75 characters |
| Body | 16 px | 16 px | 1.55–1.65 | 65–75 characters |
| Small/meta | 14 px | 14 px | 1.45 | - |
| Button | 16 px semibold | 16 px semibold | 1.2 | 2–4 words preferred |

### 5.3 Typography rules

- Sentence case for headings and buttons.
- No all-caps paragraphs; eyebrow labels may use small caps/uppercase with increased tracking and must remain readable.
- One H1 per page in normal content flow.
- Do not force line breaks that fail on mobile or translated text.
- Avoid centre-aligned paragraphs longer than three lines.
- Links and buttons use verbs that describe the destination/action.

## 6. Layout system

### 6.1 Breakpoints

| Range | Design target | Grid |
|---|---|---|
| 0–479 px | Small mobile | 4 columns, 20 px side padding |
| 480–767 px | Large mobile | 4 columns, 24 px side padding |
| 768–1023 px | Tablet | 8 columns, 32 px side padding |
| 1024–1279 px | Small desktop | 12 columns, 48 px side padding |
| 1280 px+ | Large desktop | 12 columns, centred max container 1200–1240 px |

The exact Framer breakpoints may use `Desktop`, `Tablet`, and `Mobile`; components must still behave correctly across the continuous ranges above.

### 6.2 Spacing scale

Base unit: 4 px. Preferred spacing tokens:

`4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 120`

- Section vertical padding: 96–120 px desktop, 64–80 px tablet, 48–64 px mobile.
- Card padding: 32–40 px desktop, 24 px mobile.
- Inline control gap: 8–12 px.
- Grid/card gap: 24 px desktop, 16 px mobile.
- Text block gap: 12–20 px depending on hierarchy.

### 6.3 Container and alignment

- Standard content max width: 1200–1240 px.
- Reading column: 680–760 px.
- Wide disclosure/table column: up to 1000 px.
- Use fluid stacks, not fixed canvas positioning.
- Alternate wide visual sections with narrower reading sections to create rhythm.
- Decorative shapes must not cause horizontal overflow.

### 6.4 Shape and elevation

| Token | Value | Use |
|---|---|---|
| `radius-sm` | 10 px | Inputs, small tags |
| `radius-md` | 16 px | Standard cards |
| `radius-lg` | 24 px | Feature cards, images |
| `radius-xl` | 32 px | Hero/CTA fields |
| `radius-pill` | 999 px | Chips and buttons only |
| `shadow-1` | `0 1px 2px rgba(23,19,28,.08), 0 8px 24px rgba(23,19,28,.06)` | Raised card/hover |
| `shadow-2` | `0 16px 48px rgba(23,19,28,.12)` | Rare floating panel/menu |

Do not put every card in a shadow. Prefer border and background contrast; elevation communicates interactivity or layering.

## 7. Visual language

### 7.1 Photography

Prioritise real documentary images of learning, making, mentoring, collaboration, and workplaces.

- Show agency and participation, not pity or staged charity.
- Represent different genders, disabilities, geographies, ages, and socioeconomic contexts naturally.
- Capture hands-on work, peer exchange, educators, tools, and environments-not rows of posed certificate holders alone.
- Obtain model/property releases and specific guardian/safeguarding approval for minors.
- Do not use a photograph as evidence of a programme it did not depict.
- Record photographer/source, rights, consent scope, alt text, people/programme/date, and expiry/withdrawal route.

Until real photography exists, use abstract pathway illustrations, textured geometric fields, close-ups of tools/learning materials without identifiable people, or clearly labelled illustrative visuals. Do not use synthetic people as implied beneficiaries.

### 7.2 Illustration

- Rounded geometric forms, connecting lines, nodes, steps, bridges, and modular blocks
- Limited palette per illustration: ink plus two accents
- Subtle paper-cut or screen-print texture is acceptable if compressed and not behind text
- No stereotyped symbols for disability, poverty, rural life, or occupations
- Decorative SVGs must be hidden from assistive technology

### 7.3 Icons

- Consistent 2 px rounded-line family
- 20–24 px in UI, 32 px in feature cards
- Icons support labels; they do not replace unfamiliar text
- Do not mix filled, outline, emoji, and 3D icon styles

## 8. Page composition

### 8.1 Home wireframe

```text
┌──────────────────────────────────────────────────────┐
│ Skip link / optional factual announcement            │
├──────────────────────────────────────────────────────┤
│ Wordmark | About | Focus | Partner | Updates | CTA   │
├──────────────────────────────────────────────────────┤
│ HERO: full-bleed visual + overlay + proposition/CTAs │
│ small honest status note; visual focal point to right│
├──────────────────────────────────────────────────────┤
│ Why this matters: short narrative, no fake stats     │
├──────────────────────────────────────────────────────┤
│ Four focus-area cards (status-labelled)              │
├──────────────────────────────────────────────────────┤
│ How we work: Listen → Co-design → Deliver → Learn    │
├──────────────────────────────────────────────────────┤
│ Choose your path: Learner | Institution | Industry   │
│                                  | CSR / Funder       │
├──────────────────────────────────────────────────────┤
│ Latest verified update / transparent empty state     │
├──────────────────────────────────────────────────────┤
│ Verified corporate fact panel + disclosures link     │
├──────────────────────────────────────────────────────┤
│ CTA: Build relevant learning with us                 │
├──────────────────────────────────────────────────────┤
│ Footer: contacts / navigation / disclosures / legal  │
└──────────────────────────────────────────────────────┘
```

Desktop hero: retain Kidora’s full-bleed photographic composition with a tested dark overlay, left-aligned content in a 620–700 px text area, and a right-biased visual focal point. If cleared photography is unavailable, use an abstract full-bleed pathway composition rather than a synthetic beneficiary image.  
Mobile hero: use a purpose-built crop/abstract variant, preserve text contrast, and stack CTA buttons full width only on very small screens.  
Avoid height locking; the hero must accommodate long legal/translation-safe content.

### 8.2 About

1. Compact page hero with title and verified/newly established descriptor
2. Mission/vision split cards
3. Why we exist narrative in a readable column with supporting abstract visual
4. Values in a two- or three-column grid
5. Four-step approach timeline
6. Leadership grid only when content is approved
7. Legal identity/disclosures panel
8. Partnership CTA

### 8.3 Focus Areas

1. Page hero and precise status explanation
2. Filter/status controls only if more than six items
3. Card grid: 3 columns desktop, 2 tablet, 1 mobile
4. Delivery principles
5. FAQ accordion
6. Contact/interest CTA

Cards place the status chip before the title and keep the CTA at a consistent bottom edge. An “Open” status must have real dates and an active destination.

### 8.4 Programme/focus-area detail

```text
Breadcrumb
Status + audience + mode
H1 and plain-language summary
Primary action / honest unavailable state
Overview facts panel
Problem and intended outcome
What participants can expect
Eligibility / schedule / cost / location
Safeguarding and accessibility support
Partners [only verified]
FAQ
Last reviewed + contact
Related updates/resources
```

On mobile, key facts become a vertical definition list; no horizontal table is required for basic information.

### 8.5 Partner With Us

- Human, specific hero; CTA jumps to or opens the enquiry section without a modal
- Four pathway cards with concrete examples framed as possible collaboration
- “How a conversation works” three-step process
- Governance/trust panel
- Short form on the page or a dedicated form section
- Alternative monitored email route

### 8.6 Updates & Resources

- Featured item only when intentionally curated
- Simple tabs/chips for content type, with an accessible “All” state
- Cards use 16:10 media, title, type, date, summary, and clear link
- 3/2/1 column behaviour across desktop/tablet/mobile
- Empty state is designed, not hidden
- Detail page uses a narrow reading column, sticky share controls only if they do not obstruct content, related content, and accessible download cards

### 8.7 Contact

Desktop: 5/7 split with approved contact information and expectation on the left, form on the right.  
Mobile: contact guidance first, then form.  
Do not embed a map by default. Use a text address and an optional map link if visitors are received onsite.

### 8.8 Corporate Disclosures

Use a restrained institutional layout:

- verified identity summary card;
- “last checked” date;
- categorised disclosure/download list;
- definition-list fields instead of marketing cards;
- review/expiry markers;
- correction/grievance route.

This page prioritises scanability and printability over playful decoration.

### 8.9 Legal pages

Use a simple 280/720 px desktop split: optional sticky in-page contents on the left and a readable legal column on the right. On mobile, the contents becomes a normal disclosure/list above the body. Show title, plain-language intro, effective/updated date, contact route, and anchored H2 sections. Do not place legal text in tiny type, accordions that hide the entire notice, or decorative multi-column cards.

### 8.10 404

Use a compact Kidora-inspired cream/pastel composition with a restrained pathway graphic, “This page isn’t here,” a primary Home button, a secondary Focus Areas button, and Contact. Show Updates only when it contains approved public content. The page must retain the global header/footer, work by keyboard, and avoid childish “you are lost” jokes.

## 9. Component system

### 9.1 Global components

#### Header

Variants: Desktop light, Desktop dark/overlay if needed, Mobile closed, Mobile open, Scrolled.  
Height: 80–88 px desktop, 64–72 px mobile.  
Behaviour: sticky is acceptable if it does not consume excessive small-screen space; add a subtle border rather than dramatic shrinking.

#### Announcement bar

Use only for factual, time-bound information such as an open intake or published report. Include destination, close control if dismissible, keyboard support, and expiry owner. Do not use an endless “coming soon” banner.

#### Footer

Four logical groups: organisation; explore; work with us; disclosures/legal. Include approved contact, exact verified legal identity block, copyright, accessibility/privacy links, and content-correction route. Avoid a newsletter field unless the process exists.

#### Privacy preferences - conditional

Do not show a banner when no optional service requires a choice under the approved legal design. When required, provide a bottom sheet/banner and a preferences panel with equal-access Accept optional, Reject optional, and Manage choices actions; labelled categories; Essential always-on explanation; saved confirmation; keyboard/focus management; and a persistent footer link to reopen choices. Use the copy in `content.md` §16.

### 9.2 Content components

#### Section intro

Eyebrow (optional), H2, 1–3 sentence lead, optional link. Left-aligned by default. Max width 720 px.

#### Focus/programme card

Fields: status chip, title, summary, audience/mode metadata, optional illustration/image, CTA.  
Variants: standard, featured, compact, unavailable/archived.  
Whole-card links are allowed only with correct semantics and no nested interactive controls.

#### Audience pathway card

Icon, audience name, one question/need, action label. Use four distinct pale surfaces with consistent dark text.

#### Process step

Number/icon, verb-led title, 1–2 sentence description, connecting line. Collapses to vertical on mobile; reading order remains DOM order.

#### Trust/fact panel

Use for verified facts or explicit commitments. Every corporate fact can show source/last checked. Do not style aspirations like audited results.

#### Update/resource card

Image or abstract category graphic, content type, date, title, summary, reading/download metadata. Hover raises by at most 2–4 px and never changes layout.

#### Disclosure row/card

Title, issuer/category, date, status, summary, file type/size, open/download action. Expired/superseded items are labelled and separated.

#### CTA band

Short H2, one supporting sentence, primary action, optional secondary text link. Use an ink or purple field with restrained pathway illustration. Never combine more than two actions.

#### FAQ accordion

Native/semantic disclosure behaviour where possible. Button target spans the row, icon rotates subtly, focus is visible, and content is not removed from assistive technology incorrectly.

### 9.3 Action components

#### Buttons

Variants:

- Primary: ink or purple filled
- Secondary: transparent/light with 1.5–2 px border
- Tertiary: text link with arrow
- Destructive: reserved for admin/internal experiences, not public marketing pages

Sizes: 44 px minimum height; 48–52 px default. Horizontal padding 20–28 px.  
States: default, hover, focus-visible, active, disabled, loading.  
Focus ring: 3 px high-contrast outer ring with offset; never remove the browser outline without a replacement.

#### Text links

Underlined in body text. Navigation links may rely on placement plus active/focus styling. External/download behaviour is named when relevant.

#### Form controls

Minimum height 48 px; label above; optional hint below label; input; error below.  
Border: 1.5 px default, 2 px focus/error.  
Textarea minimum 140 px, user-resizable where possible.  
Required fields marked in text, not colour/asterisk alone.  
Checkbox has a 44 px effective hit area and visible label.

States:

- Default
- Hover
- Focus-visible
- Filled
- Disabled/read-only (use sparingly)
- Error with icon + text
- Success only when meaningful
- Submitting/loading
- Submission success
- Submission failure with retry and alternative contact

## 10. Content design

### 10.1 Voice

- **Clear:** “Applications are not open yet” instead of “Exciting opportunities coming soon.”
- **Active:** “We are developing…” instead of “Programmes are being conceptualised.”
- **Respectful:** learners and communities are partners with agency.
- **Specific:** name the audience, action, timing, and owner when known.
- **Measured:** no hype, guarantees, or borrowed prestige.

### 10.2 UI wording conventions

- Global/header/Home primary CTA: “Discuss a partnership”
- Home secondary CTA: “Explore focus areas”
- Learner information CTA: “View programme status”
- Trust CTA: “View corporate disclosures”
- Learner CTA when no intake is live: “View programme status”; do not collect learner interest in the MVP
- Programme CTA: “View programme details” / “Apply by 30 September”
- Download CTA: “Download report (PDF, 1.2 MB)”
- Form action: “Send enquiry,” not “Submit”
- Success: “Your enquiry has been received” plus response expectation
- Error: explain what happened, what remains saved, and what to do next

### 10.3 Reading and localisation

- Aim for plain language understandable by a broad secondary-school reading level.
- Do not bake text into images.
- Design buttons for 30–40% text expansion.
- Do not concatenate translated fragments in CMS fields.
- Reserve language metadata and alternate URL strategy before adding Hindi/Marathi.
- Use culturally and linguistically appropriate editorial review; do not launch unreviewed machine translation.

## 11. Motion and interaction

Motion supports orientation and feedback; it does not perform credibility.

### 11.1 Allowed motion

- Button/link feedback: 120–180 ms
- Card hover: 160–220 ms, 2–4 px translation maximum
- Accordion/menu: 180–260 ms
- Section reveal: opacity + 8–16 px movement, 250–400 ms, once only and never required to expose content
- Decorative pathway line: optional slow draw/shift only when it does not distract and disappears under reduced motion

### 11.2 Rules

- Honour reduced-motion preferences by removing non-essential transforms and auto animation.
- No scroll hijacking, continuous marquee, flashing, bouncing CTA, auto-advancing carousel, or autoplay audio/video.
- Hover cannot be the only way to reveal essential information.
- Focus and active states are immediate enough to feel responsive.
- Animation must not cause cumulative layout shift.

## 12. Accessibility specification

Target WCAG 2.2 AA.

### 12.1 Structure

- Correct `lang` attribute and logical page title
- One main landmark and consistent header/navigation/footer landmarks
- Skip link visible on focus
- Logical heading hierarchy
- DOM order matches visual and keyboard order
- Breadcrumbs marked as navigation on detail pages

### 12.2 Interaction

- Every action has an accessible name and keyboard operation
- Visible focus never hidden behind sticky elements
- Mobile menu exposes expanded state, manages/restores focus, and closes with Escape
- Accordions and filters expose state programmatically
- No unexpected context change on focus/input
- Validation and success messages are announced

### 12.3 Visual

- Normal text contrast ≥ 4.5:1; large text ≥ 3:1
- UI component boundaries/focus indicators meet non-text contrast expectations
- 200% zoom and 320 CSS px reflow
- Text spacing overrides do not clip content
- Touch targets target 44 × 44 px
- Meaning never depends on colour, position, shape, or animation alone

### 12.4 Media/content

- Alt text describes purpose/context, not filenames or redundant “image of” wording
- Decorative media has empty alt/hidden semantics
- Captions and transcripts for timed media
- Accessible HTML alternative for important PDFs
- Descriptive links and document metadata
- Accessibility feedback route in footer and statement

## 13. Responsive behaviour

### 13.1 Global rules

- Desktop multi-column content collapses in semantic reading order.
- Minimum card width: roughly 280 px; use auto-fit/Framer wrapping rather than squeezing.
- Navigation becomes a labelled menu button below the desktop breakpoint.
- CTA pairs wrap or stack with 12 px gap; do not shrink labels below 16 px.
- Images retain meaningful focal points; configure per-breakpoint crop/position where needed.
- No horizontal scrolling except intentionally scrollable, labelled data tables.
- Tables convert to definition lists/cards on small screens when the relationship remains clear.
- Long names, URLs, and document titles wrap without overlap.

### 13.2 Mobile priority order

1. Page purpose/status
2. Primary action
3. Eligibility/key facts
4. Explanatory content
5. Supporting visual
6. Secondary action/content

Decorative shapes move behind or below content and may be removed on small screens.

## 14. Framer implementation rules

### 14.1 Project structure

Recommended project groups:

```text
00 Foundations
01 Global
02 Navigation
03 Content
04 Cards
05 Forms
06 CMS
07 Sections
08 Pages
09 Utilities
90 Archive / Template Source
```

Preserve the original duplicated template in an archived, unlinked page/group for comparison if the licence allows; build production pages from cleaned shared components.

### 14.2 Naming

Use descriptive names such as:

- `Button / Primary / Default`
- `Card / Focus Area / Standard`
- `Header / Desktop / Scrolled`
- `Section / Trust Panel`
- `CMS / Update Card`

Avoid `Frame 123`, `Copy 7`, or colour-named components such as `Blue Button`.

### 14.3 Layout construction

- Use Stacks and Grid for primary layout; avoid absolute positioning for content.
- Use shared text/colour styles and variables for all tokens.
- Components use variants for breakpoint/state changes.
- Prefer hug-content and min/max constraints over fixed heights.
- Fix decorative elements inside a bounded wrapper and hide overflow intentionally.
- Verify realistic long titles, empty optional fields, multiple paragraphs, and translated text.
- Keep a single source for header, footer, buttons, forms, cards, and CMS layouts.

### 14.4 CMS

- Connect cards/details to the collections in `Requirement.md`.
- Do not use rich text for facts that need filtering, status, dates, or validation; give them structured fields.
- Configure empty-state sections so a missing collection does not leave awkward blank space.
- Hide unapproved collections rather than publishing sample content.
- Validate slugs, social images, alt text, status, owner, and review date during editorial QA.

### 14.5 Code and embeds

- Use native Framer features first.
- Every code override/embed needs a named owner, purpose, accessibility/performance test, privacy review, and removal note.
- No third-party widget that injects inaccessible UI or collects data without disclosure.
- Avoid chat widgets, map embeds, session replay, and marketing pixels in MVP.

### 14.6 Performance

- Use AVIF/WebP where supported, correctly sized responsive images, and lazy loading below the fold.
- Do not preload multiple large images or all font weights.
- Prefer SVG for simple abstract graphics; optimise and strip unnecessary metadata.
- No hero video in MVP.
- Keep blur, backdrop filters, and large fixed backgrounds limited, especially on mobile.
- Test the published production site, not only Framer preview.

## 15. Design QA matrix

For every page/component, verify:

| Area | Test |
|---|---|
| Content | Realistic approved copy; no sample content; long/empty states handled |
| Layout | 1440, 1280, 1024, 768, 390, 360, and 320 px widths |
| Interaction | Default, hover, focus, active, disabled, loading, error, success |
| Keyboard | Logical order; no traps; menu/accordion/form fully operable |
| Screen reader | Names, roles, state, headings, landmarks, errors, status messages |
| Zoom/reflow | 200% zoom and 320 CSS px without loss/overlap |
| Colour | Text and non-text contrast; colour not sole cue |
| Motion | Reduced-motion behaviour and no layout shift |
| Media | Rights, consent, alt text, crop, compression, caption/transcript |
| Performance | Production transfer, fonts, scripts, LCP element, CLS |
| SEO | title, description, canonical, social image, schema, index state |

## 16. High-fidelity approval checklist

Design is ready to build when:

- the exact Framer reference has been audited or the documented adaptation is explicitly accepted;
- desktop and mobile designs exist for every P0 page;
- the header, menu, footer, forms, cards, disclosures, filters, accordion, 404, empty, error, and success states are designed;
- only approved/realistic content is used;
- colour pairings and focus indicators pass contrast checks;
- keyboard order and component semantics are documented;
- forms are prototyped from entry through error and success;
- long text, missing images, no updates, and no open programmes are handled;
- imagery rights/consent and template licence are confirmed;
- product, content, corporate-data, legal/privacy, and accessibility reviewers sign off their areas.

## 17. Design decisions pending

- Final logo/short name or typographic wordmark
- Public template access and exact retained sections
- Template and asset licence terms
- Primary audience and geography
- English-only versus English/Hindi/Marathi launch
- Availability of real programme photography
- Approved programme status and leadership profiles
- Whether a newsletter, events, careers, volunteer, or donation experience is in scope
- Final domain and social handles

This design specification should be read together with `Requirement.md`, `content.md`, `implementation-plan.md`, and `qa-launch-checklist.md`.

## 18. Reference links

- Kidora official marketplace listing: <https://www.framer.com/community/marketplace/templates/kidora/>
- Kidora public demo: <https://kidora.framer.website/>
- Framer Community Terms: <https://www.framer.com/legal/community-terms>
- Detailed observations and verification caveats: `research-notes.md`
