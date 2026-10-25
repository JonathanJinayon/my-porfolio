import { aboutParagraphs, facts } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import styles from "./About.module.css";

export function About() {
  return (
    <Section id="about" index="01" title="About">
      <div className={styles.grid}>
        <div className={styles.prose}>
          {aboutParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <dl className={styles.facts}>
          {facts.map((fact) => (
            <div className={styles.fact} key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
