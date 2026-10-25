import { experience } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { ExperienceItem } from "@/components/ui/ExperienceItem";
import styles from "./Experience.module.css";

export function Experience() {
  return (
    <Section id="experience" index="04" title="Experience">
      <div className={styles.list}>
        {experience.map((entry, index) => (
          <ExperienceItem
            key={`${entry.role}-${index}`}
            entry={entry}
            index={index}
          />
        ))}
      </div>
    </Section>
  );
}
