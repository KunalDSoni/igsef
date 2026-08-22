import type { ElementType, ReactNode } from "react";
import styles from "./Section.module.css";

type Tone = "canvas" | "surface" | "ink" | "lavender" | "mint" | "yellow";

interface SectionProps {
  children: ReactNode;
  /** Background field. `ink` also flips text to the light palette. */
  tone?: Tone;
  /** Reduced vertical rhythm for tightly coupled sections. */
  tight?: boolean;
  id?: string;
  as?: ElementType;
  className?: string;
  /** Adds a hairline rule above the section. */
  divided?: boolean;
  "aria-labelledby"?: string;
}

const toneClass: Record<Tone, string> = {
  canvas: styles.canvas,
  surface: styles.surface,
  ink: styles.ink,
  lavender: styles.lavender,
  mint: styles.mint,
  yellow: styles.yellow,
};

export function Section({
  children,
  tone = "canvas",
  tight = false,
  id,
  as: Tag = "section",
  className,
  divided = false,
  ...rest
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={[
        styles.section,
        toneClass[tone],
        tight ? styles.tight : "",
        divided ? styles.divided : "",
        tone === "ink" ? "on-dark" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </Tag>
  );
}
