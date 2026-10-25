import type {
  Certification,
  ExperienceEntry,
  Fact,
  NavLink,
  Project,
  SiteContent,
  SocialLink,
  TechGroup,
} from "@/types/content";

export const site: SiteContent = {
  name: "Jonathan Jinayon",
  title: "Software Engineer",
  location: "Bohol, Philippines",
  profileImage: {
    src: "/profile-pixel.png",
    alt: "Portrait of Jonathan Jinayon",
    caption: "Fig. 1 / Jonathan Jinayon",
  },
};

export const navLinks: NavLink[] = [
  { label: "About", href: "/#about" },
  { label: "Stack", href: "/#stack" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Certifications", href: "/#certifications" },
  { label: "Contact", href: "/#contact" },
  { label: "World", href: "/world" },
];

export const aboutParagraphs: string[] = [
  "My path into software started with curiosity about how things are built. That curiosity grew into a focus on backend development and eventually into a Computer Science degree and a career as a Software Engineer.",
  "What keeps me engaged is the why behind a system: how it is structured, how data moves through it, and how newer tools like AI and LLMs can make it more useful. I care about clear code, thoughtful tradeoffs, and learning alongside people who take pride in their craft. I am especially interested in building solutions."
];

export const facts: Fact[] = [
  { label: "Based in", value: "Bohol, Philippines" },
  { label: "Currently", value: "Software Engineer" },
  { label: "Exploring", value: "AI, LLMs, and System Design" },
  { label: "Open to", value: "Collaboration and Knowledge Sharing" },
];

export const techGroups: TechGroup[] = [
  { label: "Backend", items: ["Java", "Spring Boot", "REST APIs"] },
  { label: "Frontend", items: ["React", "TypeScript"] },
  { label: "Database", items: ["MySQL", "MongoDB"] },
  { label: "Additional", items: ["Copilot", "openCode", "Git"] },
];

export const projects: Project[] = [
  {
    name: "[Project One]",
    description:
      "[Describe the problem this project solves, the approach you took, and the result you are most proud of.]",
    technologies: ["Java", "Spring Boot", "MySQL"],
  },
  {
    name: "[Project Two]",
    description:
      "[Describe the problem this project solves, the approach you took, and the result you are most proud of.]",
    technologies: ["React", "TypeScript", "REST APIs"],
  },
  {
    name: "[Project Three]",
    description:
      "[Describe the problem this project solves, the approach you took, and the result you are most proud of.]",
    technologies: ["[Technology]", "[Technology]", "[Technology]"],
  },
];

export const experience: ExperienceEntry[] = [
  {
    role: "Software Engineer",
    organization: "Optum",
    period: "2026 – Present",
    description:
      "Working as a Software Engineer, contributing to software development while continuing to grow in engineering practices, problem-solving, and building reliable applications.",
  },
  {
    role: "Full Stack Bootcamp",
    organization: "Accenture",
    period: "Oct 2025 – Jan 2026",
    description:
      "Completed full-stack development training focused on Java, Spring Boot, REST APIs, React, and Redux. Gained hands-on experience with backend development, API testing, debugging, and microservices concepts.",
  },
  {
    role: "BS Computer Science",
    organization: "BISU Candijay",
    period: "2025",
    description:
      "Earned a Bachelor of Science in Computer Science, building a foundation in programming, software development, databases, and problem-solving.",
  },
  {
    role: "OJT Intern",
    organization: "LGU Anda & Candijay",
    period: "2024",
    description:
      "Completed on-the-job training in a local government setting, gaining practical workplace experience and exposure to professional processes and responsibilities.",
  },
  {
    role: "Hello World",
    organization: "Personal Learning",
    period: "2021",
    description:
      "Started my programming journey with the fundamentals of coding, sparking an ongoing interest in software development and technology.",
  },
];

export const certifications: Certification[] = [
  {
    name: "Accenture Tech AmplifAI Program",
    issuer: "Accenture",
    year: "20 October 2025 - 2 January 2026.",
  },
  {
    name: "Introduction to Modern AI Course",
    issuer: "Cisco Networking Academy",
    year: "2025",
  },
];

export const contactIntro =
  "I'm always open to connecting with fellow developers, exploring new technologies, and discussing ideas around software engineering, AI, and LLMs. Whether you have a project in mind, want to collaborate, or simply want to talk tech, feel free to reach out.";

export const email: SocialLink = {
  label: "Email",
  value: "jonzkie2016@gmail.com",
  href: "mailto:jonzkie2016@gmail.com",
};

export const socialLinks: SocialLink[] = [
  { label: "GitHub", value: "https://github.com/JonathanJinayon" },
  { label: "LinkedIn", value: "https://linkedin.com/in/jonathan-jinayon" },
  { label: "Location", value: "Philippines" },
];
