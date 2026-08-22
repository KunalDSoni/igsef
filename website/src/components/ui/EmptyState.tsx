import type { ReactNode } from "react";
import { PathwayMark } from "@/components/graphics/PathwayMark";
import styles from "./EmptyState.module.css";

interface EmptyStateProps {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
  /** Heading level so the state fits the surrounding outline. */
  headingLevel?: "h2" | "h3" | "h4";
  showGraphic?: boolean;
}

export function EmptyState({
  title,
  children,
  actions,
  headingLevel: Heading = "h3",
  showGraphic = true,
}: EmptyStateProps) {
  return (
    <div className={styles.empty}>
      {showGraphic ? <PathwayMark className={styles.graphic} variant="open" /> : null}
      <Heading className={styles.title}>{title}</Heading>
      <div className={styles.body}>{children}</div>
      {actions ? <div className={styles.actions}>{actions}</div> : null}
    </div>
  );
}
