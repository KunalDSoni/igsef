import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "tertiary";

interface SharedProps {
  children: ReactNode;
  variant?: Variant;
  size?: "default" | "large";
  /** Inverts the palette for use on the ink field. */
  onDark?: boolean;
  block?: boolean;
  /** Shows the circular arrow badge used on Kidora's primary actions. */
  withArrow?: boolean;
  className?: string;
}

function classes({ variant = "primary", size = "default", onDark, block, className }: SharedProps) {
  return [
    styles.base,
    styles[variant],
    size === "large" ? styles.large : "",
    onDark ? styles.onDark : "",
    block ? styles.block : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

function Arrow() {
  return (
    <span className={styles.arrow} aria-hidden="true">
      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 6h8M6.5 2.5 10 6l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

interface ButtonLinkProps extends SharedProps {
  href: string;
  /** Set for links that leave the site; adds rel and a visually hidden note. */
  external?: boolean;
}

/**
 * A link styled as an action. Used for every navigational CTA so that
 * "Discuss a partnership" is a real link a visitor can open in a new tab.
 */
export function ButtonLink({ href, external, withArrow, ...props }: ButtonLinkProps) {
  const externalProps = external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : undefined;

  return (
    <Link href={href} className={classes(props)} {...externalProps}>
      <span className={styles.label}>
        {props.children}
        {external ? <span className="visually-hidden"> (opens in a new tab)</span> : null}
        {/* Inside the label so the arrow trails the final word instead of being
            pushed to the far edge when the text wraps. */}
        {withArrow ? <Arrow /> : null}
      </span>
    </Link>
  );
}

interface ButtonProps
  extends SharedProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  loading?: boolean;
  loadingLabel?: string;
}

export function Button({
  loading = false,
  loadingLabel,
  withArrow,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  const { children, variant, size, onDark, block, className, ...buttonProps } = props;

  return (
    <button
      type={type}
      className={classes({ children, variant, size, onDark, block, className })}
      disabled={disabled || loading}
      {...buttonProps}
    >
      {loading ? <span className={styles.spinner} aria-hidden="true" /> : null}
      <span className={styles.label}>
        {loading && loadingLabel ? loadingLabel : children}
        {withArrow && !loading ? <Arrow /> : null}
      </span>
    </button>
  );
}
