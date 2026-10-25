import { projects } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { ProjectItem } from "@/components/ui/ProjectItem";
import styles from "./Projects.module.css";

export function Projects() {
  return (
    <Section id="projects" index="03" title="Projects">
      <div className={styles.list}>
        {projects.map((project, index) => (
          <ProjectItem
            key={`${project.name}-${index}`}
            project={project}
            index={index}
          />
        ))}
      </div>
    </Section>
  );
}
