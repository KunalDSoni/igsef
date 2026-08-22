import type { PublicStatus } from "@/content/types";
import styles from "./StatusChip.module.css";

/**
 * Maps each controlled status to a tone and a distinct glyph shape. Two statuses
 * never share a glyph *and* a tone, so status is distinguishable without colour
 * (WCAG 1.4.1) and without shape recognition alone.
 */
const presentation: Record<
  PublicStatus,
  { tone: string; glyph: "ring" | "half" | "dot" | "pause" | "check" | "cross" }
> = {
  Proposed: { tone: "proposed", glyph: "ring" },
  "In development": { tone: "developing", glyph: "half" },
  Pilot: { tone: "developing", glyph: "dot" },
  Open: { tone: "active", glyph: "dot" },
  "In delivery": { tone: "active", glyph: "half" },
  Completed: { tone: "closed", glyph: "check" },
  Paused: { tone: "paused", glyph: "pause" },
  Archived: { tone: "closed", glyph: "cross" },
};

function Glyph({ shape }: { shape: (typeof presentation)[PublicStatus]["glyph"] }) {
  return (
    <svg className={styles.glyph} viewBox="0 0 10 10" aria-hidden="true" focusable="false">
      {shape === "ring" && (
        <circle cx="5" cy="5" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
      )}
      {shape === "dot" && <circle cx="5" cy="5" r="4" fill="currentColor" />}
      {shape === "half" && (
        <>
          <circle cx="5" cy="5" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M5 1.4A3.6 3.6 0 0 1 5 8.6Z" fill="currentColor" />
        </>
      )}
      {shape === "pause" && (
        <>
          <rect x="2.2" y="1.8" width="2" height="6.4" rx="0.8" fill="currentColor" />
          <rect x="5.8" y="1.8" width="2" height="6.4" rx="0.8" fill="currentColor" />
        </>
      )}
      {shape === "check" && (
        <path
          d="M1.8 5.2 4 7.4 8.2 2.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      {shape === "cross" && (
        <path
          d="M2.4 2.4 7.6 7.6M7.6 2.4 2.4 7.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

export function StatusChip({ status }: { status: PublicStatus }) {
  const { tone, glyph } = presentation[status];

  return (
    <span className={`${styles.chip} ${styles[tone]}`}>
      <Glyph shape={glyph} />
      <span className={styles.label}>
        <span className="visually-hidden">Status: </span>
        {status}
      </span>
    </span>
  );
}
