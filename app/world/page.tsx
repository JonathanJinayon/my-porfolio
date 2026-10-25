import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { WorldExperience } from "@/components/world/WorldExperience";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "World — Jonathan Jinayon",
  description:
    "Explore an interactive world of software, science, invention, and ideas alongside Jonathan Jinayon's portfolio.",
};

export default function WorldPage() {
  return (
    <div className={styles.page}>
      <Container>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>06 / World</p>
          <h1 className={styles.title}>Jonathan&apos;s Knowledge World</h1>
          <p className={styles.description}>
            Walk through six districts built from ideas about software,
            science, invention, and the people behind them. The portfolio sits
            at the centre; every exhibit is also available without exploring.
          </p>
        </header>

        <WorldExperience />
      </Container>
    </div>
  );
}
