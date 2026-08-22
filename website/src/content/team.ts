import type { Partner, TeamMember } from "./types";

/**
 * Leadership / Team — P1, disabled.
 *
 * `content.md` §6.8 requires an approved name, role, factual 60–100 word
 * biography, source-checked credentials, an approved photograph with alt text
 * and an appointment review date before any profile is published. Director names
 * appear in a third-party registry profile in `research-notes.md`, but that is
 * discovery material: publishing from it would breach the verification rule.
 *
 * The collection stays empty and `features.leadership` stays false, so the
 * About page renders a stated governance position instead of an empty grid.
 */
export const teamMembers: TeamMember[] = [];

/**
 * Partners — disabled.
 *
 * No documented relationship exists. `Requirement.md` §3.3 prohibits partner
 * logos until evidenced, and the similarly named summits, colleges and
 * foundations in the original brief must never appear as partners or lineage.
 */
export const partners: Partner[] = [];
