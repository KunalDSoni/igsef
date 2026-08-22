import Image from "next/image";
import Link from "next/link";
import { Card, CardFooter } from "@/components/ui/Card";
import { PathwayMark } from "@/components/graphics/PathwayMark";
import { routes } from "@/config/site";
import { type UpdateRecord, isExpired } from "@/content/types";
import { formatDate } from "@/lib/format";
import styles from "./UpdateCard.module.css";

/**
 * Update / resource card.
 *
 * Handles the states a real collection produces: a missing image (an abstract
 * category graphic stands in rather than leaving a broken box), an expired
 * opportunity (labelled, with no action inviting a response), and a download
 * (type and size named in the link text, per FR-033).
 */
export function UpdateCard({
  update,
  featured = false,
  headingLevel: Heading = "h3",
}: {
  update: UpdateRecord;
  featured?: boolean;
  headingLevel?: "h2" | "h3" | "h4";
}) {
  const expired = isExpired(update.expiryDate);
  const href = `${routes.updates}/${update.slug}`;

  return (
    <Card surface="white" interactive className={featured ? styles.featured : undefined}>
      <div className={styles.media}>
        {update.image ? (
          <Image
            src={update.image.src}
            alt={update.image.alt ?? ""}
            width={update.image.width}
            height={update.image.height}
            className={styles.image}
            sizes="(min-width: 64rem) 380px, (min-width: 48rem) 50vw, 100vw"
          />
        ) : (
          /* Missing-media state: a built graphic keeps the card's proportions
             so the grid does not shift when an image is absent. */
          <div className={styles.placeholder} aria-hidden="true">
            <PathwayMark className={styles.placeholderMark} variant="step" />
          </div>
        )}
      </div>

      <p className={styles.meta}>
        <span className={styles.type}>{update.type}</span>
        <span aria-hidden="true">·</span>
        <time dateTime={update.publishedDate}>{formatDate(update.publishedDate)}</time>
        {expired ? <span className={styles.expired}>Closed</span> : null}
      </p>

      <Heading className={styles.title}>
        {/* The link wraps the title only — no nested interactive controls. */}
        <Link href={href} className={styles.titleLink}>
          {update.title}
        </Link>
      </Heading>

      <p className={styles.summary}>{update.summary}</p>

      {update.download ? (
        <CardFooter>
          <p className={styles.download}>
            Includes a download: {update.download.label} ({update.download.fileType},{" "}
            {update.download.fileSize})
          </p>
        </CardFooter>
      ) : null}
    </Card>
  );
}
