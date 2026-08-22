import type { ReactNode } from "react";
import styles from "./Notice.module.css";

export type NoticeTone = "info" | "warning" | "error" | "success" | "neutral" | "internal";

interface NoticeProps {
  tone?: NoticeTone;
  title?: string;
  children: ReactNode;
  /**
   * `status` announces politely when content changes; `alert` interrupts.
   * Omit for static page content so nothing is announced on load.
   */
  live?: "status" | "alert";
  id?: string;
  className?: string;
}

const icons: Record<NoticeTone, ReactNode> = {
  info: <path d="M11 7h2v2h-2zm0 4h2v6h-2z" fill="currentColor" />,
  warning: <path d="M11 8h2v6h-2zm0 8h2v2h-2z" fill="currentColor" />,
  error: <path d="M11 7h2v7h-2zm0 9h2v2h-2z" fill="currentColor" />,
  success: (
    <path
      d="m7 12.5 3.2 3.2L17 9"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  neutral: <path d="M11 7h2v2h-2zm0 4h2v6h-2z" fill="currentColor" />,
  internal: <path d="M11 7h2v7h-2zm0 9h2v2h-2z" fill="currentColor" />,
};

export function Notice({ tone = "info", title, children, live, id, className }: NoticeProps) {
  return (
    <div
      id={id}
      className={[styles.notice, styles[tone], className].filter(Boolean).join(" ")}
      role={live === "alert" ? "alert" : live === "status" ? "status" : undefined}
      aria-live={live === "status" ? "polite" : undefined}
    >
      <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="10.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        {icons[tone]}
      </svg>
      <div className={styles.body}>
        {tone === "internal" ? (
          <span className={styles.internalBadge}>Internal preview — not published</span>
        ) : null}
        {title ? <p className={styles.title}>{title}</p> : null}
        <div className={styles.text}>{children}</div>
      </div>
    </div>
  );
}
