import type { ReactNode } from "react";
import styles from "./Accordion.module.css";

export function AccordionList({ children }: { children: ReactNode }) {
  return <div className={styles.list}>{children}</div>;
}

interface AccordionItemProps {
  id: string;
  question: string;
  children: ReactNode;
  /** Opens the first item so the pattern is discoverable without interaction. */
  defaultOpen?: boolean;
}

export function AccordionItem({ id, question, children, defaultOpen = false }: AccordionItemProps) {
  // No `name` attribute: FAQ items stay independently open so a visitor can
  // compare two answers without one closing the other.
  return (
    <details className={styles.item} open={defaultOpen}>
      <summary className={styles.summary} id={`${id}-summary`}>
        <span>{question}</span>
        <span className={styles.marker} aria-hidden="true">
          <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 1.5v11M1.5 7h11" strokeLinecap="round" />
          </svg>
        </span>
      </summary>
      <div className={styles.panel}>{children}</div>
    </details>
  );
}
