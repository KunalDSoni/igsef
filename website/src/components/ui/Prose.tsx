import type { ReactNode } from "react";
import styles from "./Prose.module.css";

export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={[styles.prose, className].filter(Boolean).join(" ")}>{children}</div>;
}
