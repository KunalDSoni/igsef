import type { ReactNode } from "react";
import styles from "./SectionIntro.module.css";

interface SectionIntroProps {
  eyebrow?: string;
  /** Rendered as the given level so heading order stays logical per page. */
  headingLevel?: "h2" | "h3";
  heading: string;
  headingId?: string;
  lead?: string;
  children?: ReactNode;
  onDark?: boolean;
  centred?: boolean;
  actions?: ReactNode;
}

export function SectionIntro({
  eyebrow,
  headingLevel: Heading = "h2",
  heading,
  headingId,
  lead,
  children,
  onDark = false,
  centred = false,
  actions,
}: SectionIntroProps) {
  return (
    <div
      className={[styles.intro, onDark ? styles.onDark : "", centred ? styles.centred : ""]
        .filter(Boolean)
        .join(" ")}
    >
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <Heading id={headingId}>{heading}</Heading>
      {lead ? <p className={styles.lead}>{lead}</p> : null}
      {children}
      {actions ? <div className={styles.actions}>{actions}</div> : null}
    </div>
  );
}
