import Link from "next/link";
import { site } from "@/config/site";
import styles from "./Wordmark.module.css";

/**
 * The glyph: two interlocking bands forming an open bridge. It holds at 16–24px
 * in one colour and avoids flags, globes and mortarboards entirely.
 */
function Glyph() {
  return (
    <svg
      className={styles.glyph}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
      role="presentation"
    >
      <path
        d="M4 24c0-8.8 4.5-13.5 12-13.5S28 15.2 28 24"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M4 24c0-4.6 2.6-7 8-7s8 2.4 8 7"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.45"
      />
      <circle cx="28" cy="24" r="2.6" fill="currentColor" />
    </svg>
  );
}

interface WordmarkProps {
  /** True on the page the mark links to; suppresses the redundant link. */
  onDark?: boolean;
  className?: string;
}

export function Wordmark({ onDark = false, className }: WordmarkProps) {
  return (
    <Link
      href="/"
      className={[styles.mark, onDark ? styles.onDark : "", className].filter(Boolean).join(" ")}
      aria-label={`${site.legalNameWorking} — home`}
    >
      <Glyph />
      <span className={styles.text} aria-hidden="true">
        <span className={styles.lead}>{site.wordmark.lead}</span>
        <span className={styles.trail}>{site.wordmark.trail}</span>
      </span>
    </Link>
  );
}
