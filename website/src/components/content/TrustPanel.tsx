import type { ReactNode } from "react";
import styles from "./TrustPanel.module.css";

interface TrustPanelProps {
  intro: ReactNode;
  commitments: readonly string[];
  support?: string;
}

export function TrustPanel({ intro, commitments, support }: TrustPanelProps) {
  return (
    <div className={styles.panel}>
      <div>{intro}</div>
      <div>
        <ul className={styles.list}>
          {commitments.map((commitment) => (
            <li key={commitment} className={styles.item}>
              <svg className={styles.tick} viewBox="0 0 22 22" aria-hidden="true" focusable="false">
                <circle
                  cx="11"
                  cy="11"
                  r="10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="m6.4 11.4 3 3 6.2-6.6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {commitment}
            </li>
          ))}
        </ul>
        {support ? <p className={styles.support}>{support}</p> : null}
      </div>
    </div>
  );
}
