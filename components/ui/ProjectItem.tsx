import type { Project } from "@/types/content";
import { Tag } from "./Tag";
import styles from "./ProjectItem.module.css";

interface ProjectItemProps {
  project: Project;
  index: number;
}

export function ProjectItem({ project, index }: ProjectItemProps) {
  const number = String(index + 1).padStart(2, "0");
  const hasLinks = Boolean(project.githubUrl || project.liveUrl);

  return (
    <article className={styles.item}>
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <span className={styles.index}>{number}</span>
          <h3 className={styles.title}>{project.name}</h3>
        </div>
        <div className={styles.links}>
          {project.githubUrl ? (
            <a
              className={styles.link}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <span aria-hidden="true">↗</span>
            </a>
          ) : null}
          {project.liveUrl ? (
            <a
              className={styles.link}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live demo <span aria-hidden="true">↗</span>
            </a>
          ) : null}
          {!hasLinks ? (
            <span className={styles.pending}>Links coming soon</span>
          ) : null}
        </div>
      </header>
      <p className={styles.description}>{project.description}</p>
      <ul className={styles.tags} aria-label="Technologies">
        {project.technologies.map((technology, tagIndex) => (
          <li key={`${technology}-${tagIndex}`}>
            <Tag>{technology}</Tag>
          </li>
        ))}
      </ul>
    </article>
  );
}
