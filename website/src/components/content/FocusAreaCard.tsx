import { Card, CardFooter, type CardSurface } from "@/components/ui/Card";
import { PathwayMark } from "@/components/graphics/PathwayMark";
import { StatusChip } from "@/components/ui/StatusChip";
import { ButtonLink } from "@/components/ui/Button";
import { cta, routes } from "@/config/site";
import type { FocusArea } from "@/content/types";
import styles from "./FocusAreaCard.module.css";

const surfaceMap: Record<FocusArea["surface"], CardSurface> = {
  lavender: "lavender",
  mint: "mint",
  yellow: "yellow",
  white: "white",
};

const markVariants = ["open", "step", "converge"] as const;

interface FocusAreaCardProps {
  focusArea: FocusArea;
  index: number;
  /** Heading level so the card fits the page outline. */
  headingLevel?: "h3" | "h4";
}

export function FocusAreaCard({
  focusArea,
  index,
  headingLevel: Heading = "h3",
}: FocusAreaCardProps) {
  const variant = markVariants[index % markVariants.length];

  return (
    <Card
      surface={surfaceMap[focusArea.surface]}
      interactive={focusArea.hasApprovedDetail}
      className={styles.card}
    >
      <div className={styles.topRow}>
        <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
        <PathwayMark className={styles.mark} variant={variant} />
      </div>

      <div className={styles.head}>
        <StatusChip status={focusArea.status} />
      </div>

      <Heading className={styles.title}>{focusArea.cardTitle}</Heading>
      <p className={styles.summary}>{focusArea.summary}</p>

      <ul className={styles.meta}>
        <li className={styles.metaItem}>
          <span className={styles.metaLabel}>For</span>
          {focusArea.audiences.join(", ")}
        </li>
      </ul>

      <CardFooter>
        {focusArea.hasApprovedDetail ? (
          <ButtonLink href={`${routes.focusAreas}/${focusArea.slug}`} variant="tertiary" withArrow>
            {cta.focusAreaDetail.label}
            <span className="visually-hidden">: {focusArea.cardTitle}</span>
          </ButtonLink>
        ) : (
          /* No approved brief exists, so there is no page to link to. Saying so
             is better than shipping a dead or circular link. */
          <p className={styles.pending}>
            <svg
              className={styles.pendingIcon}
              viewBox="0 0 16 16"
              aria-hidden="true"
              focusable="false"
            >
              <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M8 4.2v4.2l2.6 1.6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            Detailed information will be published once this focus area has an approved brief.
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
