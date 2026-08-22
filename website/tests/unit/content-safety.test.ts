import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { features } from "@/config/features";
import { PUBLIC_STATUSES, isExpired, isPublishable } from "@/content/types";
import { focusAreas, publishedFocusAreaDetails } from "@/content/focus-areas";
import { publishedUpdates, updates } from "@/content/updates";
import { publishedFaqs } from "@/content/faqs";
import { disclosureDocuments, identityFields, identityIsComplete } from "@/content/disclosures";
import { settings } from "@/content/settings";
import { partners, teamMembers } from "@/content/team";

/**
 * Publication-safety invariants.
 *
 * These are the rules that must not regress silently: unverified corporate
 * facts staying out of the shipped source, gates and content agreeing with each
 * other, and no placeholder or template text reaching a public string.
 */

const SRC = path.resolve(__dirname, "../../src");

function sourceFiles(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      sourceFiles(full, acc);
    } else if (/\.(tsx?|css)$/.test(entry)) {
      acc.push(full);
    }
  }
  return acc;
}

/**
 * Strips comments before scanning.
 *
 * Source comments legitimately name the Kidora reference and the date format,
 * and comments never reach the browser. What matters is that no blocked value
 * appears in code or content, so the scan looks at everything except comments.
 * `scripts/check-build-output.mjs` performs the authoritative scan of the
 * generated HTML, CSS and JavaScript.
 */
function stripComments(text: string): string {
  return text.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:"'`\\])\/\/[^\n]*/g, "$1 ");
}

const allSource = sourceFiles(SRC).map((file) => ({
  file: path.relative(SRC, file),
  text: stripComments(readFileSync(file, "utf8")),
}));

describe("controlled vocabulary", () => {
  it("uses only approved public statuses", () => {
    for (const focusArea of focusAreas) {
      expect(PUBLIC_STATUSES).toContain(focusArea.status);
    }
  });

  it("excludes the internal Draft state from the public status list", () => {
    expect(PUBLIC_STATUSES as readonly string[]).not.toContain("Draft");
  });

  it("uses lowercase hyphenated slugs", () => {
    for (const record of [...focusAreas, ...updates]) {
      expect(record.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });

  it("keeps slugs unique within each collection", () => {
    const focusSlugs = focusAreas.map((f) => f.slug);
    expect(new Set(focusSlugs).size).toBe(focusSlugs.length);
    const updateSlugs = updates.map((u) => u.slug);
    expect(new Set(updateSlugs).size).toBe(updateSlugs.length);
  });
});

describe("corporate facts stay blocked", () => {
  it("publishes no identity value until it is verified", () => {
    expect(identityIsComplete()).toBe(false);
    for (const field of identityFields) {
      expect(field.value).toBeNull();
    }
  });

  it("keeps the corporate disclosures gate closed while identity is unverified", () => {
    expect(features.corporateDisclosures).toBe(identityIsComplete());
  });

  it("names a required source for every unverified identity field", () => {
    for (const field of identityFields) {
      expect(field.requiredSource.length).toBeGreaterThan(10);
    }
  });

  it("holds no disclosure document that claims to be verified without a source", () => {
    for (const doc of disclosureDocuments) {
      if (doc.status === "Verified") {
        expect(doc.document).not.toBeNull();
        expect(doc.effectiveDate).not.toBeNull();
      }
    }
  });

  /**
   * The candidate registration number, incorporation date, registered office and
   * director names live in the private research notes at the repository root.
   * None of them may appear anywhere in the application source, which is what
   * ends up in the browser bundle and the generated HTML.
   */
  it("keeps candidate corporate values out of the application source", () => {
    const forbidden = [
      "U85499MR2026NPL479632",
      "479632",
      "ROC Mumbai",
      "Sagar CHSL",
      "CIDCO Colony",
      "Airoli",
      "400708",
      "Rajasekharan",
      "Ashok Digambarrao",
      "Mahesh Tolaram",
      "qorpiq",
      "12 August 2026",
      "Section 8",
      "company limited by guarantee",
    ];

    for (const { file, text } of allSource) {
      for (const value of forbidden) {
        expect(
          text.toLowerCase().includes(value.toLowerCase()),
          `${file} contains blocked corporate value "${value}"`,
        ).toBe(false);
      }
    }
  });

  it("keeps unrelated similarly named organisations out of the source", () => {
    const forbidden = ["Indus Foundation", "Indo Global Colleges", "igef.net", "Skills Summit"];
    for (const { file, text } of allSource) {
      for (const value of forbidden) {
        expect(
          text.toLowerCase().includes(value.toLowerCase()),
          `${file} references unrelated organisation "${value}"`,
        ).toBe(false);
      }
    }
  });
});

describe("no placeholder or template content", () => {
  it("contains no bracketed placeholder or TODO in the source", () => {
    const patterns: [RegExp, string][] = [
      [/\[BLOCKED/i, "BLOCKED placeholder"],
      [/\[TBD/i, "TBD placeholder"],
      [/\[approved /i, "bracketed approval placeholder"],
      [/\[verified /i, "bracketed verification placeholder"],
      [/lorem ipsum/i, "lorem ipsum"],
      [/\bTODO\b/, "TODO marker"],
      [/\bFIXME\b/, "FIXME marker"],
      [/\bXXX\b/, "XXX marker"],
    ];

    for (const { file, text } of allSource) {
      for (const [pattern, label] of patterns) {
        expect(pattern.test(text), `${file} contains ${label}`).toBe(false);
      }
    }
  });

  it("contains no Kidora template content", () => {
    const templateTerms = [
      "kidora",
      "reddevs",
      "preschool",
      "kindergarten",
      "daycare",
      "enroll now",
      "Enrol now",
      "happy parents",
      "Price plan",
      "bright young minds",
    ];
    for (const { file, text } of allSource) {
      for (const term of templateTerms) {
        expect(
          text.toLowerCase().includes(term.toLowerCase()),
          `${file} contains template term "${term}"`,
        ).toBe(false);
      }
    }
  });
});

describe("gated collections stay empty", () => {
  it("publishes no leadership profile while the gate is closed", () => {
    expect(features.leadership).toBe(false);
    expect(teamMembers).toHaveLength(0);
  });

  it("publishes no partner while the gate is closed", () => {
    expect(features.partners).toBe(false);
    expect(partners).toHaveLength(0);
  });

  it("keeps the updates gate closed while no approved update exists", () => {
    expect(publishedUpdates()).toHaveLength(0);
    expect(features.updates).toBe(false);
  });

  it("publishes no focus-area detail page without an approved brief", () => {
    expect(publishedFocusAreaDetails()).toHaveLength(0);
    for (const focusArea of focusAreas) {
      if (!focusArea.hasApprovedDetail) {
        expect(focusArea.editorialState).not.toBe("Approved");
      }
    }
  });
});

describe("publication helpers", () => {
  it("treats only approved, unexpired records as publishable", () => {
    const approved = { editorialState: "Approved" as const };
    const draft = { editorialState: "Draft" as const };
    expect(isPublishable(approved, null)).toBe(true);
    expect(isPublishable(draft, null)).toBe(false);
    expect(isPublishable(approved, "2020-01-01")).toBe(false);
    expect(isPublishable(approved, "2999-01-01")).toBe(true);
  });

  it("reports expiry correctly", () => {
    expect(isExpired(null)).toBe(false);
    expect(isExpired("2020-01-01")).toBe(true);
    expect(isExpired("2999-01-01")).toBe(false);
  });
});

describe("contact details", () => {
  it("publishes no contact address until one is approved and monitored", () => {
    expect(features.publicContactDetails).toBe(false);
    expect(settings.publicEmail).toBeNull();
    expect(settings.publicPhone).toBeNull();
    expect(settings.publicAddress).toBeNull();
  });

  it("shows no social links while none are owned or verified", () => {
    expect(settings.socialLinks).toHaveLength(0);
  });

  it("publishes no response-time commitment without an owner", () => {
    expect(features.publishedSla).toBe(false);
    expect(settings.responseSla).toBeNull();
  });
});

describe("FAQs", () => {
  it("hides the registration answer while corporate facts are unverified", () => {
    expect(publishedFaqs().some((faq) => faq.id === "faq-registered")).toBe(false);
  });

  it("gives every published FAQ an owner, a review date and an answer", () => {
    for (const faq of publishedFaqs()) {
      expect(faq.owner.length).toBeGreaterThan(0);
      expect(faq.reviewDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(faq.answer.length).toBeGreaterThan(0);
    }
  });

  it("states plainly that nothing is open", () => {
    const answer = publishedFaqs()
      .find((faq) => faq.id === "faq-programmes-open")
      ?.answer.join(" ");
    expect(answer).toContain("No applications are currently open");
  });
});

describe("claims and tense", () => {
  it("makes no impact, partner, accreditation or government claim in page copy", () => {
    const copy = readFileSync(path.join(SRC, "content/copy.ts"), "utf8");
    const forbidden = [
      "learners trained",
      "our partners",
      "accredited",
      "government-approved",
      "government approved",
      "award-winning",
      "leading ",
      "world-class",
      "best-in-class",
      "guaranteed placement",
      "assured job",
    ];
    for (const phrase of forbidden) {
      expect(copy.toLowerCase().includes(phrase), `copy contains "${phrase}"`).toBe(false);
    }
  });
});
