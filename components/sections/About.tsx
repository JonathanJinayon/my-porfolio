import { aboutParagraphs, facts, site } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ProfilePortrait } from "./ProfilePortrait";
import styles from "./About.module.css";

export function About() {
  return (
    <section id="about" className={styles.about} aria-labelledby="about-title">
      <Container>
        <div className={styles.grid}>
          <div className={styles.portraitSlot}>
            <ProfilePortrait />
          </div>

          <div className={styles.content}>
            <p className={styles.eyebrow}>01 / About</p>
            <h1 id="about-title" className={styles.name}>
              {site.name}
            </h1>
            <p className={styles.role}>{site.title}</p>

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

            <div className={styles.actions}>
              <Button href="#projects">View projects</Button>
              <Button href="#contact" variant="secondary">
                Get in touch
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
