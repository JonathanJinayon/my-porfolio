import Link from "next/link";
import { Container } from "@/components/ui/Container";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <Container className={styles.wrapper}>
      <p className={styles.index}>404 /</p>
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.description}>
        The page you are looking for does not exist or has moved.
      </p>
      <Link className={styles.link} href="/">
        Return home <span aria-hidden="true">→</span>
      </Link>
    </Container>
  );
}
