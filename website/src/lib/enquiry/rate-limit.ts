import "server-only";

/**
 * Submission rate limiting.
 *
 * An in-process fixed-window counter. It is a real control for a single-instance
 * deployment and a documented hook for a shared one: replace `check()` with a
 * durable store (the platform's rate limiter, or a small KV) when the site runs
 * behind more than one instance, since per-instance counters can be bypassed by
 * spreading requests across them.
 *
 * Privacy: the client address is **hashed with a per-process salt and never
 * stored in raw form**, entries expire with the window, and nothing is written
 * to disk or logs. The map holds a hash and two integers — no personal data, no
 * submitted values.
 */

import { createHash, randomBytes } from "node:crypto";

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_SUBMISSIONS_PER_WINDOW = 5;

/**
 * Regenerated on every process start, so a hash cannot be correlated across
 * restarts or reversed against a list of candidate addresses.
 */
const SALT = randomBytes(32);

interface WindowEntry {
  count: number;
  resetAt: number;
}

const windows = new Map<string, WindowEntry>();

function fingerprint(clientAddress: string): string {
  return createHash("sha256").update(SALT).update(clientAddress).digest("base64url").slice(0, 22);
}

/** Drops expired entries so the map cannot grow without bound. */
function sweep(now: number): void {
  for (const [key, entry] of windows) {
    if (entry.resetAt <= now) windows.delete(key);
  }
}

export interface RateLimitResult {
  allowed: boolean;
  /** Seconds until the window resets. Sent as `Retry-After` when blocked. */
  retryAfterSeconds: number;
}

export function checkRateLimit(clientAddress: string, now: number = Date.now()): RateLimitResult {
  sweep(now);

  const key = fingerprint(clientAddress);
  const entry = windows.get(key);

  if (!entry || entry.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  entry.count += 1;

  if (entry.count > MAX_SUBMISSIONS_PER_WINDOW) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
    };
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

/** Exposed for tests so a suite can start from a known state. */
export function resetRateLimitState(): void {
  windows.clear();
}

export const RATE_LIMIT_CONFIG = { WINDOW_MS, MAX_SUBMISSIONS_PER_WINDOW } as const;
