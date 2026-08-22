import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { PathwayMark } from "@/components/graphics/PathwayMark";
import { Section } from "@/components/layout/Section";
import styles from "./CtaBand.module.css";

interface CtaBandProps {
  heading: string;
  body?: string;
  actions: ReactNode;
  headingId?: string;
}

export function CtaBand({ heading, body, actions, headingId }: CtaBandProps) {
  return (
    <Section tone="canvas" aria-labelledby={headingId}>
      <Container>
        <div className={`${styles.band} on-dark`}>
          <PathwayMark className={styles.decor} variant="step" />
          <div className={styles.inner}>
            <h2 id={headingId} className={styles.heading}>
              {heading}
            </h2>
            {body ? <p className={styles.body}>{body}</p> : null}
            <div className={styles.actions}>{actions}</div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
