# Leadership Vertical Assignments Redesign

**Date:** 2026-09-02  
**Scope:** Eliminate repetition in leadership team vertical assignments  
**Status:** Design approved, ready for implementation

## Problem Statement

Current leadership vertical assignments contain duplicate tags across team members:
- "Corporate and industry training" appears on both Dr. Ashok Digambarrao Chavan and Mahesh Ahuja
- "Industry–academia integration" appears on both Dr. Ashok and Mahesh
- Mahesh has only 2 verticals while other leaders have 3, creating visual imbalance

Result: Green tag display shows repetition, failing to communicate each leader's distinct expertise.

## Desired Outcome

Each leadership team member displays a unique set of vertical focus areas with zero overlap. The assignment reflects actual organizational roles and expertise distribution.

## Solution Design

### Leadership Vertical Mapping

**Prof. V.N. Rajasekharan (Founder and Vice Chairman)**
- International academic pathway
- AI and emerging technology education
- Innovation and incubation

**Mahesh Ahuja (Executive Director)**
- Corporate and industry training
- Industry–academia integration
- Strategic CSR and social impact

**Dr. Ashok Digambarrao Chavan (Chairman and Managing Director)**
- *(No specific vertical assignments; shown as governance/operational leader)*

### Rationale

**Prof. V.N. Rajasekharan:** All three assigned verticals align with his documented role providing "academic direction across international affiliations, AI curriculum standards, and the innovation portfolio." His expertise spans:
- International academic pathways (curriculum, institutional partnerships)
- AI and emerging tech education (curriculum standards, lab infrastructure)
- Innovation and incubation (student projects, commercial development)

**Mahesh Ahuja:** His 20+ years in banking/financial services and explicit role in "strategic partnerships and advisory initiatives across corporate training and industry collaborations" make him the natural lead for verticals requiring corporate relationship and business development expertise:
- Corporate and industry training (employer partnerships, upskilling programs)
- Industry–academia integration (placement coordination, talent banking)
- Strategic CSR and social impact (corporate partnerships, CSR project design)

**Dr. Ashok Digambarrao Chavan:** As Chairman and Managing Director, his role is cross-organizational operational oversight and governance. Rather than claim specific vertical ownership, his visibility as CMD without vertical tags reflects his responsibility for all verticals' strategic alignment and execution.

## Data Changes

**File:** `src/data/leadership.js`

**Dr. Ashok Digambarrao Chavan**
- Remove all `verticalSlugs` (set to empty array `[]`)

**Mahesh Ahuja**
- Replace current `verticalSlugs: ['corporate-and-industry-training', 'industry-academia-integration']`
- With: `verticalSlugs: ['corporate-and-industry-training', 'industry-academia-integration', 'strategic-csr-and-social-impact']`

**Prof. V.N. Rajasekharan**
- No change (already has correct assignment)

## Verification

After implementation, verify:
1. No vertical slug appears in more than one leader's `verticalSlugs` array
2. Prof. V.N. Rajasekharan displays 3 green tags (international academic, AI/emerging tech, innovation)
3. Mahesh Ahuja displays 3 green tags (corporate training, industry-academia integration, CSR/social impact)
4. Dr. Ashok Digambarrao Chavan displays no green tags (governance role, not vertical specialist)
5. All 6 verticals are accounted for across the team
6. Leadership page renders without errors

## Impact

- **Scope:** Leadership page team profiles only; no other pages affected
- **Risk:** Low; data-only change, no logic or component modifications
- **Visibility:** Public-facing; changes appear on leadership/team pages immediately after deployment
