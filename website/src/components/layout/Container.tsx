import type { ElementType, ReactNode } from "react";
import styles from "./Container.module.css";

type Width = "default" | "narrow" | "wide" | "full";

interface ContainerProps {
  children: ReactNode;
  /** `narrow` is the 736px reading column, `wide` the 1000px disclosure column. */
  width?: Width;
  as?: ElementType;
  className?: string;
  id?: string;
}

const widthClass: Record<Width, string> = {
  default: styles.default,
  narrow: styles.narrow,
  wide: styles.wide,
  full: styles.full,
};

export function Container({
  children,
  width = "default",
  as: Tag = "div",
  className,
  id,
}: ContainerProps) {
  return (
    <Tag
      id={id}
      className={[styles.container, widthClass[width], className].filter(Boolean).join(" ")}
    >
      {children}
    </Tag>
  );
}
