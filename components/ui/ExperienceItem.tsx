import type { ExperienceEntry } from "@/types/content";
import styles from "./ExperienceItem.module.css";

interface ExperienceItemProps {
  entry: ExperienceEntry;
  index: number;
}

export function ExperienceItem({ entry, index }: ExperienceItemProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className={styles.item}>
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <span className={styles.index}>{number}</span>
          <div>
            <h3 className={styles.role}>{entry.role}</h3>
            <p className={styles.organization}>{entry.organization}</p>
          </div>
        </div>
        <p className={styles.period}>{entry.period}</p>
      </header>
      <p className={styles.description}>{entry.description}</p>
    </article>
  );
}
