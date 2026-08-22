import type { ReactNode } from "react";
import styles from "./DefinitionList.module.css";

export function DefinitionList({ children }: { children: ReactNode }) {
  return <dl className={styles.list}>{children}</dl>;
}

interface RowProps {
  term: string;
  children: ReactNode;
}

export function DefinitionRow({ term, children }: RowProps) {
  return (
    <div className={styles.row}>
      <dt className={styles.term}>{term}</dt>
      <dd className={styles.value}>{children}</dd>
    </div>
  );
}

/**
 * A field whose value is not yet verified. It states the outstanding source
 * rather than showing a blank, a dash, or a bracketed placeholder.
 */
export function PendingRow({ term, source }: { term: string; source: string }) {
  return (
    <div className={styles.row}>
      <dt className={styles.term}>{term}</dt>
      <dd className={styles.value}>
        <span className={styles.pending}>
          <span className={styles.pendingLabel}>
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
              <circle cx="7" cy="7" r="6" fill="none" stroke="currentColor" strokeWidth="1.4" />
              <path
                d="M7 3.6v3.8l2.4 1.4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
            Verification in progress
          </span>
          <span className={styles.source}>Will be published from: {source}.</span>
        </span>
      </dd>
    </div>
  );
}

export { styles as definitionListStyles };
