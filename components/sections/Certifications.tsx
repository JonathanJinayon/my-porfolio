import { certifications } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import styles from "./Certifications.module.css";

export function Certifications() {
  return (
    <Section id="certifications" index="05" title="Certifications">
      <div className={styles.list}>
        {certifications.map((certification, index) => {
          const number = String(index + 1).padStart(2, "0");

          return (
            <article
              className={styles.item}
              key={`${certification.name}-${index}`}
            >
              <header className={styles.header}>
                <div className={styles.titleRow}>
                  <span className={styles.index}>{number}</span>
                  <div>
                    <h3 className={styles.name}>{certification.name}</h3>
                    <p className={styles.issuer}>{certification.issuer}</p>
                  </div>
                </div>
                <p className={styles.year}>{certification.year}</p>
              </header>
              {certification.credentialUrl ? (
                <a
                  className={styles.link}
                  href={certification.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View credential
                </a>
              ) : null}
            </article>
          );
        })}
      </div>
    </Section>
  );
}
