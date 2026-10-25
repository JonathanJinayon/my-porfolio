import { techGroups } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import styles from "./TechStack.module.css";

export function TechStack() {
  return (
    <Section id="stack" index="02" title="Stack">
      <div className={styles.grid}>
        {techGroups.map((group) => (
          <div className={styles.group} key={group.label}>
            <h3 className={styles.label}>{group.label}</h3>
            <ul className={styles.items}>
              {group.items.map((item, index) => (
                <li key={`${item}-${index}`}>
                  <Tag>{item}</Tag>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
