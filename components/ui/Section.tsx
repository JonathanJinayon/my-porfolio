import type { ReactNode } from "react";
import { Container } from "./Container";
import styles from "./Section.module.css";

interface SectionProps {
  id: string;
  index: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function Section({
  id,
  index,
  title,
  description,
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={[styles.section, className].filter(Boolean).join(" ")}
      aria-labelledby={`${id}-title`}
    >
      <Container>
        <header className={styles.header}>
          <h2 id={`${id}-title`} className={styles.title}>
            <span className={styles.index}>{index} /</span>
            {title}
          </h2>
          {description ? (
            <p className={styles.description}>{description}</p>
          ) : null}
        </header>
        {children}
      </Container>
    </section>
  );
}
