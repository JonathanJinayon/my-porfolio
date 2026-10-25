import type { Exhibit, PortfolioSection } from "@/types/world";

interface WorkspaceEntry {
  id: string;
  section: PortfolioSection;
  title: string;
  subtitle: string;
  summary: string;
  world: { x: number; y: number };
  related: string[];
}

const entries: WorkspaceEntry[] = [
  {
    id: "portfolio-about",
    section: "about",
    title: "About Jonathan",
    subtitle: "Background, interests, and direction",
    summary:
      "The original portfolio introduction, relocated inside the world. It covers software engineering, systems, AI, and continuous learning.",
    world: { x: 780, y: 380 },
    related: ["portfolio-skills", "portfolio-experience", "ai-guide"],
  },
  {
    id: "portfolio-skills",
    section: "skills",
    title: "Technical stack",
    subtitle: "The tools behind the work",
    summary:
      "Backend, frontend, and database technologies currently listed on the portfolio. Placeholder skill entries remain visibly marked.",
    world: { x: 880, y: 370 },
    related: ["portfolio-projects", "language-history", "open-source"],
  },
  {
    id: "portfolio-projects",
    section: "projects",
    title: "Selected projects",
    subtitle: "Work in progress",
    summary:
      "The portfolio project list. Project names, descriptions, and links remain placeholders until real details are supplied.",
    world: { x: 980, y: 380 },
    related: ["portfolio-skills", "portfolio-experience", "portfolio-contact"],
  },
  {
    id: "portfolio-experience",
    section: "experience",
    title: "Experience and training",
    subtitle: "The development journey",
    summary:
      "Roles, training, education, and the early steps that led into software engineering.",
    world: { x: 820, y: 420 },
    related: ["portfolio-about", "portfolio-projects", "portfolio-contact"],
  },
  {
    id: "portfolio-contact",
    section: "contact",
    title: "Contact and repositories",
    subtitle: "Ways to get in touch",
    summary:
      "Contact links and GitHub information from the portfolio. Unresolved links are shown as placeholders rather than fabricated URLs.",
    world: { x: 940, y: 420 },
    related: ["portfolio-about", "portfolio-projects", "open-source"],
  },
];

export const workspaceExhibits: Exhibit[] = entries.map((entry) => ({
  id: entry.id,
  zone: "workspace",
  kind: "portfolio",
  title: entry.title,
  subtitle: entry.subtitle,
  eyebrow: "Workspace",
  summary: entry.summary,
  tags: ["Portfolio", "Jonathan"],
  world: entry.world,
  sections: [],
  sources: [],
  related: entry.related,
  portfolioSection: entry.section,
}));
