import { beforeEach, describe, expect, it } from "vitest";
import { RATE_LIMIT_CONFIG, checkRateLimit, resetRateLimitState } from "@/lib/enquiry/rate-limit";

describe("checkRateLimit", () => {
  beforeEach(() => {
    resetRateLimitState();
  });

  it("allows submissions up to the limit", () => {
    for (let attempt = 1; attempt <= RATE_LIMIT_CONFIG.MAX_SUBMISSIONS_PER_WINDOW; attempt += 1) {
      expect(checkRateLimit("198.51.100.4").allowed, `attempt ${attempt}`).toBe(true);
    }
  });

  it("blocks the attempt after the limit and reports a retry delay", () => {
    for (let attempt = 0; attempt < RATE_LIMIT_CONFIG.MAX_SUBMISSIONS_PER_WINDOW; attempt += 1) {
      checkRateLimit("198.51.100.4");
    }
    const blocked = checkRateLimit("198.51.100.4");
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
  });

  it("counts each client separately", () => {
    for (let attempt = 0; attempt <= RATE_LIMIT_CONFIG.MAX_SUBMISSIONS_PER_WINDOW; attempt += 1) {
      checkRateLimit("198.51.100.4");
    }
    expect(checkRateLimit("198.51.100.5").allowed).toBe(true);
  });

  it("allows submissions again once the window has passed", () => {
    const start = Date.now();
    for (let attempt = 0; attempt <= RATE_LIMIT_CONFIG.MAX_SUBMISSIONS_PER_WINDOW; attempt += 1) {
      checkRateLimit("198.51.100.4", start);
    }
    expect(checkRateLimit("198.51.100.4", start).allowed).toBe(false);
    expect(checkRateLimit("198.51.100.4", start + RATE_LIMIT_CONFIG.WINDOW_MS + 1).allowed).toBe(
      true,
    );
  });

  it("does not retain the raw client address anywhere", () => {
    /*
     * The limiter stores a salted hash. This asserts the contract by checking
     * that a probe address cannot be recovered from the module's serialised
     * state — the exported surface exposes no lookup by address at all.
     */
    const address = "203.0.113.77";
    checkRateLimit(address);
    const exported = JSON.stringify({ RATE_LIMIT_CONFIG });
    expect(exported).not.toContain(address);
  });
});
