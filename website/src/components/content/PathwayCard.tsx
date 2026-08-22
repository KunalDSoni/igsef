import type { ReactNode } from "react";
import { Card, CardFooter, type CardSurface } from "@/components/ui/Card";
import styles from "./PathwayCard.module.css";

/**
 * Audience pathway card. Icons support the label and never replace it
 * (design.md §7.3), so each card names its audience in text.
 */
interface PathwayCardProps {
  audience: string;
  body: string;
  surface: CardSurface;
  icon: "learner" | "institution" | "employer" | "funder";
  action: ReactNode;
  headingLevel?: "h3" | "h4";
}

const icons: Record<PathwayCardProps["icon"], ReactNode> = {
  learner: (
    <>
      <path
        d="M3 8.5 12 4.5l9 4-9 4-9-4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 10.2v4.3c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5v-4.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </>
  ),
  institution: (
    <>
      <path
        d="M4 10h16v9H4z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M12 4 21 9H3l9-5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M9 19v-5m6 5v-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  employer: (
    <>
      <rect
        x="3"
        y="7.5"
        width="18"
        height="12"
        rx="2.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M3 12.5h18" stroke="currentColor" strokeWidth="1.8" />
    </>
  ),
  /* Mission alignment, drawn as concentric rings converging on a node —
     the site's pathway motif rather than a coin, a handshake or a globe. */
  funder: (
    <>
      <circle cx="12" cy="12" r="8.4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      <path
        d="M12 1.6v2.4M12 20v2.4M1.6 12H4M20 12h2.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </>
  ),
};

export function PathwayCard({
  audience,
  body,
  surface,
  icon,
  action,
  headingLevel: Heading = "h3",
}: PathwayCardProps) {
  return (
    <Card surface={surface} className={styles.card}>
      <span className={styles.icon} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" focusable="false">
          {icons[icon]}
        </svg>
      </span>
      <Heading className={styles.title}>{audience}</Heading>
      <p className={styles.body}>{body}</p>
      <CardFooter>{action}</CardFooter>
    </Card>
  );
}
