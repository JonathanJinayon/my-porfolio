import type {
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
  eyebrow: "// software engineer",
  intro:
    "I build software, solve problems, and explore how systems work. I'm focused on backend development, clean code, and designing reliable applications while continuously improving my skills.",
  location: "Metro Cebu, Philippines",
  focus: "Java, Spring Boot, and System Design",
  availability: "Building and learning",
  focusAreas: ["Java", "Spring Boot", "REST APIs", "React", "TypeScript"],
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
  { label: "Contact", href: "/#contact" },
  { label: "World", href: "/world" },
];

export const aboutParagraphs: string[] = [
  "I'm a Computer Science graduate currently working as a Software Engineer. I enjoy building software, solving technical problems, and turning ideas into practical applications. My background includes Java, Spring Boot, REST APIs, and full-stack development, and I'm continuously developing my skills through hands-on experience.",
  "My interests extend beyond application development into system design, artificial intelligence, and large language models (LLMs). I'm curious about how software systems work under the hood and how AI can be integrated into applications to solve real-world problems. I believe in continuous learning, writing maintainable code, and growing into a well-rounded engineer.",
];

export const facts: Fact[] = [
  { label: "Based in", value: "Bohol, Philippines" },
  { label: "Focus", value: "AI, LLMs, and Backend Engineering" },
  { label: "Learning", value: "LLM Integration, AI Agents, and System Design" },
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
