import { site } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <p>© {site.name}</p>
        <p className={styles.meta}>Next.js / TypeScript / Light and dark</p>
        <a className={styles.top} href="#main">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </Container>
    </footer>
  );
}
