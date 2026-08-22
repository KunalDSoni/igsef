import Link from "next/link";
import styles from "./Breadcrumbs.module.css";

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * Breadcrumbs for detail routes (design.md §12.1). The final crumb is the
 * current page and is marked with `aria-current`, not rendered as a link.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className={styles.nav}>
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className={styles.item}>
              {item.href && !isLast ? (
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              ) : (
                <span className={styles.current} aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
