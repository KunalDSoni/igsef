import type { ElementType, ReactNode } from "react";
import styles from "./Card.module.css";

export type CardSurface = "white" | "lavender" | "mint" | "yellow" | "cream" | "ink";

interface CardProps {
  children: ReactNode;
  surface?: CardSurface;
  /** Adds the hover raise. Only for cards that contain an action. */
  interactive?: boolean;
  as?: ElementType;
  className?: string;
}

export function Card({
  children,
  surface = "white",
  interactive = false,
  as: Tag = "div",
  className,
}: CardProps) {
  return (
    <Tag
      className={[
        styles.card,
        styles[surface],
        interactive ? styles.interactive : "",
        surface === "ink" ? "on-dark" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
}

export function CardFooter({ children }: { children: ReactNode }) {
  return <div className={styles.footer}>{children}</div>;
}
