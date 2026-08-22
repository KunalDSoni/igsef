import type { ReactNode } from "react";
import styles from "./Grid.module.css";

interface GridProps {
  children: ReactNode;
  /**
   * `min` controls the minimum track width for auto-fitting collections.
   * `pillars` switches to a deliberate two-up layout for fixed sets of four.
   */
  min?: "sm" | "md" | "lg" | "pillars";
  className?: string;
}

const variants: Record<NonNullable<GridProps["min"]>, string> = {
  sm: styles.four,
  md: "",
  lg: styles.two,
  pillars: styles.pillars,
};

export function Grid({ children, min = "md", className }: GridProps) {
  return (
    <div className={[styles.grid, variants[min], className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
