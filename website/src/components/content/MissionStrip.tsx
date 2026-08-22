import { Container } from "@/components/layout/Container";
import styles from "./MissionStrip.module.css";

export function MissionStrip({ items, label }: { items: readonly string[]; label: string }) {
  return (
    <div className={styles.strip}>
      <Container>
        <ul className={styles.list} aria-label={label}>
          {items.map((item) => (
            <li key={item} className={styles.item}>
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
