import { contactIntro, email, socialLinks } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import styles from "./Contact.module.css";

export function Contact() {
  const links = [email, ...socialLinks];

  return (
    <Section id="contact" index="05" title="Contact">
      <div className={styles.grid}>
        <div>
          <p className={styles.intro}>{contactIntro}</p>
          {email.href ? (
            <Button href={email.href} className={styles.action}>
              Send an email
            </Button>
          ) : null}
        </div>

        <dl className={styles.links}>
          {links.map((link) => (
            <div className={styles.row} key={link.label}>
              <dt>{link.label}</dt>
              <dd>
                {link.href ? (
                  <a
                    className={styles.link}
                    href={link.href}
                    {...(link.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {link.value}
                  </a>
                ) : (
                  <span className={styles.placeholder}>{link.value}</span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
