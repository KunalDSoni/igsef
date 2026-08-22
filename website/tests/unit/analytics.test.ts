import { describe, expect, it } from "vitest";
import { scrubProperties, trackEvent } from "@/lib/analytics";
import { features } from "@/config/features";

/**
 * Analytics must never carry personal data or free text. The type system stops
 * most of it; these tests cover the runtime backstop and the default-off gate.
 */

describe("scrubProperties", () => {
  it("drops property names that could carry identity", () => {
    const safe = scrubProperties({
      page: "/contact",
      name: "Asha Menon",
      email: "asha@example.org",
      organisation: "Example Institute",
      subject: "Hello",
      message: "Some text",
      role: "Head of Programmes",
      address: "Somewhere",
    });
    expect(safe).toEqual({ page: "/contact" });
  });

  it("is case-insensitive about forbidden names", () => {
    expect(scrubProperties({ Email: "a@b.co", NAME: "Asha" })).toEqual({});
  });

  it("drops anything that looks like an email address", () => {
    expect(scrubProperties({ destination: "mailto:asha@example.org" })).toEqual({});
  });

  it("drops long values that read as free text", () => {
    expect(scrubProperties({ label: "x".repeat(65) })).toEqual({});
    expect(scrubProperties({ label: "x".repeat(64) })).toEqual({ label: "x".repeat(64) });
  });

  it("keeps short categorical values, numbers and booleans", () => {
    expect(scrubProperties({ form_type: "enquiry", field_count: 3, first_error: true })).toEqual({
      form_type: "enquiry",
      field_count: 3,
      first_error: true,
    });
  });

  it("drops values of unsupported types", () => {
    expect(scrubProperties({ nested: { a: 1 } as never })).toEqual({});
  });
});

describe("trackEvent", () => {
  it("is disabled by default", () => {
    expect(features.analytics).toBe(false);
  });

  it("does not throw while the gate is closed", () => {
    expect(() => trackEvent("cta_click", { page: "/", component: "hero" })).not.toThrow();
  });
});
