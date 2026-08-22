import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { PathwayMark } from "@/components/graphics/PathwayMark";
import styles from "./PageHero.module.css";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  /** Rendered above the title — used for breadcrumbs on detail routes. */
  above?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
  decor?: "open" | "step" | "converge";
}

export function PageHero({
  eyebrow,
  title,
  lead,
  above,
  actions,
  children,
  decor = "converge",
}: PageHeroProps) {
  return (
    <div className={styles.hero}>
      <PathwayMark className={styles.decor} variant={decor} />
      <Container>
        <div className={styles.inner}>
          {above}
          {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
          <h1>{title}</h1>
          {lead ? <p className={styles.lead}>{lead}</p> : null}
          {children ? <div className={styles.meta}>{children}</div> : null}
          {actions ? <div className={styles.actions}>{actions}</div> : null}
        </div>
      </Container>
    </div>
  );
}
