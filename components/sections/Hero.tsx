import { site } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { ProfilePortrait } from "./ProfilePortrait";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-title">
      <Container>
        <div className={styles.grid}>
          <div className={styles.content}>
            <p className={styles.eyebrow}>{site.eyebrow}</p>
            <h1 id="hero-title" className={styles.name}>
              {site.name}
            </h1>
            <p className={styles.role}>{site.title}</p>
            <p className={styles.intro}>{site.intro}</p>

            <div className={styles.focus}>
              <p className={styles.focusLabel}>Focus areas</p>
              <ul className={styles.focusList} aria-label="Focus areas">
                {site.focusAreas.map((area) => (
                  <li key={area}>
                    <Tag>{area}</Tag>
                  </li>
                ))}
              </ul>
            </div>

            <dl className={styles.metaList}>
              <div>
                <dt>Location</dt>
                <dd>{site.location}</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>{site.focus}</dd>
              </div>
              <div>
                <dt>Availability</dt>
                <dd>{site.availability}</dd>
              </div>
            </dl>

            <div className={styles.actions}>
              <Button href="#projects">View projects</Button>
              <Button href="#contact" variant="secondary">
                Get in touch
              </Button>
            </div>
          </div>

          <ProfilePortrait />
        </div>
      </Container>
    </section>
  );
}
