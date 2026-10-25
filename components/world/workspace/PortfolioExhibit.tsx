import Link from "next/link";
import type { PortfolioSection } from "@/types/world";
import {
  aboutParagraphs,
  contactIntro,
  email,
  experience,
  facts,
  projects,
  site,
  socialLinks,
  techGroups,
} from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import styles from "./PortfolioExhibit.module.css";

const SECTION_HREFS: Record<PortfolioSection, string> = {
  about: "/#about",
  skills: "/#stack",
  projects: "/#projects",
  experience: "/#experience",
  contact: "/#contact",
};

const SECTION_LABELS: Record<PortfolioSection, string> = {
  about: "About section",
  skills: "Stack section",
  projects: "Projects section",
  experience: "Experience section",
  contact: "Contact section",
};

function isPlaceholder(value: string) {
  return /^\s*\[.*\]\s*$/.test(value);
}

function AboutContent() {
  return (
    <>
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
    </>
  );
}

function SkillsContent() {
  return (
    <div className={styles.groups}>
      {techGroups.map((group) => (
        <section className={styles.group} key={group.label}>
          <h3 className={styles.groupTitle}>{group.label}</h3>
          <ul className={styles.tags} aria-label={`${group.label} skills`}>
            {group.items.map((item, index) => (
              <li key={`${item}-${index}`}>
                <Tag>{item}</Tag>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function ProjectsContent() {
  return (
    <div className={styles.entries}>
      {projects.map((project, index) => {
        const number = String(index + 1).padStart(2, "0");

        return (
          <article className={styles.entry} key={`${project.name}-${index}`}>
            <header className={styles.entryHeader}>
              <div className={styles.entryTitleRow}>
                <span className={styles.entryIndex}>{number}</span>
                <h3 className={styles.entryTitle}>{project.name}</h3>
              </div>
              <div className={styles.entryLinks}>
                {project.githubUrl ? (
                  <a
                    className={styles.entryLink}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                ) : null}
                {project.liveUrl ? (
                  <a
                    className={styles.entryLink}
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live
                  </a>
                ) : null}
                {!project.githubUrl && !project.liveUrl ? (
                  <span className={styles.entryPending}>Links coming soon</span>
                ) : null}
              </div>
            </header>
            <p className={styles.entryDescription}>{project.description}</p>
            <ul className={styles.tags} aria-label="Technologies">
              {project.technologies.map((technology, tagIndex) => (
                <li key={`${technology}-${tagIndex}`}>
                  <Tag>{technology}</Tag>
                </li>
              ))}
            </ul>
          </article>
        );
      })}
    </div>
  );
}

function ExperienceContent() {
  return (
    <div className={styles.entries}>
      {experience.map((entry, index) => {
        const number = String(index + 1).padStart(2, "0");

        return (
          <article className={styles.entry} key={`${entry.role}-${index}`}>
            <header className={styles.entryHeader}>
              <div className={styles.entryTitleRow}>
                <span className={styles.entryIndex}>{number}</span>
                <div>
                  <h3 className={styles.entryTitle}>{entry.role}</h3>
                  <p className={styles.entryOrganization}>{entry.organization}</p>
                </div>
              </div>
              <p className={styles.entryPeriod}>{entry.period}</p>
            </header>
            <p className={styles.entryDescription}>{entry.description}</p>
          </article>
        );
      })}
    </div>
  );
}

function ContactContent() {
  const contactLinks = [email, ...socialLinks];
  const showEmailAction = Boolean(email.href) && !isPlaceholder(email.value);

  return (
    <>
      <p className={styles.prose}>{contactIntro}</p>

      {showEmailAction && email.href ? (
        <div className={styles.contactAction}>
          <Button href={email.href}>Send an email</Button>
        </div>
      ) : null}

      <dl className={styles.contactList}>
        {contactLinks.map((link) => {
          const href = link.href && !isPlaceholder(link.value) ? link.href : null;
          const isExternal = href?.startsWith("http") ?? false;

          return (
            <div className={styles.contactRow} key={link.label}>
              <dt>{link.label}</dt>
              <dd>
                {href ? (
                  <a
                    className={styles.contactLink}
                    href={href}
                    {...(isExternal
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
          );
        })}
      </dl>
    </>
  );
}

export function PortfolioExhibit({ section }: { section: PortfolioSection }) {
  return (
    <div className={styles.workspace}>
      <div className={styles.identity}>
        <p className={styles.identityName}>{site.name}</p>
        <p className={styles.identityRole}>
          {site.title} / {site.location}
        </p>
      </div>

      {section === "about" ? <AboutContent /> : null}
      {section === "skills" ? <SkillsContent /> : null}
      {section === "projects" ? <ProjectsContent /> : null}
      {section === "experience" ? <ExperienceContent /> : null}
      {section === "contact" ? <ContactContent /> : null}

      <Link className={styles.fullPortfolio} href={SECTION_HREFS[section]}>
        Open the full {SECTION_LABELS[section].toLowerCase()} on the homepage
        <span aria-hidden="true"> →</span>
      </Link>
    </div>
  );
}
