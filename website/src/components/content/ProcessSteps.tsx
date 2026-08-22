import styles from "./ProcessSteps.module.css";

export interface ProcessStep {
  title: string;
  body: string;
}

interface ProcessStepsProps {
  steps: readonly ProcessStep[];
  onDark?: boolean;
  headingLevel?: "h3" | "h4";
}

/**
 * An ordered list, so the sequence is conveyed structurally. The visual
 * connector is decoration layered on top of that, not a replacement for it.
 */
export function ProcessSteps({
  steps,
  onDark = false,
  headingLevel: Heading = "h3",
}: ProcessStepsProps) {
  const columnClass = steps.length === 4 ? styles.listFour : styles.listThree;

  return (
    <ol
      className={[styles.list, columnClass, onDark ? styles.onDark : ""].filter(Boolean).join(" ")}
    >
      {steps.map((step, index) => (
        <li key={step.title} className={styles.step}>
          <span className={styles.marker} aria-hidden="true">
            {index + 1}
          </span>
          <Heading className={styles.title}>{step.title}</Heading>
          <p className={styles.body}>{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
