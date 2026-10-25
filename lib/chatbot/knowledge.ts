import {
  aboutParagraphs,
  certifications,
  contactIntro,
  email,
  experience,
  facts,
  projects,
  site,
  socialLinks,
  techGroups,
} from "@/lib/content";

export interface ChatLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface ChatAnswer {
  text: string;
  links?: ChatLink[];
  suggestions?: string[];
}

export interface ChatRule {
  id: string;
  keywords: string[];
  phrases?: string[];
  weight?: number;
  answer: () => ChatAnswer;
}

export const CHAT_SUGGESTIONS = [
  "What do you do?",
  "What is your stack?",
  "Show me your projects",
  "How can I contact you?",
];

const SECTION_LINKS = {
  about: { label: "Open About", href: "/#about" },
  stack: { label: "Open Stack", href: "/#stack" },
  projects: { label: "Open Projects", href: "/#projects" },
  experience: { label: "Open Experience", href: "/#experience" },
  certifications: { label: "Open Certifications", href: "/#certifications" },
  contact: { label: "Open Contact", href: "/#contact" },
  world: { label: "Explore the World", href: "/world" },
};

function isPlaceholder(value: string) {
  return /^\s*\[.*\]\s*$/.test(value);
}

function cleanWords(values: string[]) {
  return values
    .flatMap((value) => value.split(/[^a-zA-Z0-9]+/))
    .map((value) => value.toLowerCase())
    .filter((value) => value.length > 2);
}

function unique(values: string[]) {
  return Array.from(new Set(values));
}

function getFact(label: string) {
  return facts.find(
    (fact) => fact.label.toLowerCase() === label.toLowerCase(),
  )?.value;
}

function socialLink(label: string) {
  return socialLinks.find(
    (link) => link.label.toLowerCase() === label.toLowerCase(),
  );
}

function contactLinks(): ChatLink[] {
  const links: ChatLink[] = [
    { label: "Send an email", href: email.href ?? `mailto:${email.value}` },
  ];

  for (const label of ["GitHub", "LinkedIn"]) {
    const link = socialLink(label);

    if (link?.value.startsWith("http")) {
      links.push({ label, href: link.value, external: true });
    }
  }

  links.push(SECTION_LINKS.contact);

  return links;
}

function formatProjects() {
  const realProjects = projects.filter(
    (project) => !isPlaceholder(project.name),
  );

  if (realProjects.length === 0) {
    return "The project write-ups are still being finalized. The stack includes Java, Spring Boot, REST APIs, React, TypeScript, MySQL, and MongoDB. You can check the Projects section for updates.";
  }

  return realProjects
    .map((project) => `- ${project.name}: ${project.description}`)
    .join("\n\n");
}

function formatCertifications() {
  const realCertifications = certifications.filter(
    (certification) => !isPlaceholder(certification.name),
  );

  if (realCertifications.length === 0) {
    return "Certifications are still being added to the portfolio. Check the Certifications section for updates.";
  }

  return realCertifications
    .map(
      (certification) =>
        `- ${certification.name} — ${certification.issuer} (${certification.year})`,
    )
    .join("\n");
}

const aboutRule: ChatRule = {
  id: "about",
  keywords: [
    "about",
    "who",
    "yourself",
    "bio",
    "background",
    "introduce",
    "introduction",
    "name",
    "jonathan",
  ],
  phrases: [
    "about you",
    "about jonathan",
    "who are you",
    "who is jonathan",
    "tell me about yourself",
    "what do you do",
    "introduce yourself",
  ],
  weight: 1.6,
  answer: () => ({
    text: `${site.name} is a ${site.title} based in ${site.location}.\n\n${aboutParagraphs[0]}`,
    links: [SECTION_LINKS.about],
    suggestions: ["What is your stack?", "Show me your projects"],
  }),
};

const locationRule: ChatRule = {
  id: "location",
  keywords: ["where", "located", "location", "based", "bohol", "philippines", "live"],
  phrases: ["where are you", "where is jonathan", "where are you based"],
  weight: 1.4,
  answer: () => ({
    text: `${site.name} is based in ${site.location}.`,
    links: [SECTION_LINKS.about, SECTION_LINKS.contact],
  }),
};

const stackRule: ChatRule = {
  id: "stack",
  keywords: [
    "stack",
    "skill",
    "skills",
    "tech",
    "technology",
    "technologies",
    "tool",
    "tools",
    "language",
    "languages",
    "framework",
    "frameworks",
    "backend",
    "frontend",
    "database",
    "databases",
    "java",
    "spring",
    "boot",
    "rest",
    "react",
    "typescript",
    "mysql",
    "mongodb",
    "git",
    "copilot",
    "opencode",
  ],
  phrases: ["what is your stack", "what do you use", "tech stack"],
  weight: 1.5,
  answer: () => ({
    text: `Here is the stack:\n\n${techGroups
      .map((group) => `${group.label}: ${group.items.join(", ")}`)
      .join("\n")}`,
    links: [SECTION_LINKS.stack],
    suggestions: ["Show me your projects", "What is your experience?"],
  }),
};

const projectsRule: ChatRule = {
  id: "projects",
  keywords: ["project", "projects", "built", "build", "apps", "applications", "showcase"],
  phrases: ["show me your work", "show your projects", "what have you built"],
  weight: 1.4,
  answer: () => ({
    text: formatProjects(),
    links: [SECTION_LINKS.projects],
    suggestions: ["What is your stack?", "How can I contact you?"],
  }),
};

const experienceRule: ChatRule = {
  id: "experience",
  keywords: ["experience", "career", "job", "jobs", "employment", "worked", "work"],
  phrases: [
    "work experience",
    "work history",
    "where do you work",
    "professional experience",
  ],
  weight: 1.4,
  answer: () => ({
    text: `Experience:\n\n${experience
      .map((entry) => `- ${entry.role} at ${entry.organization} (${entry.period})`)
      .join("\n")}`,
    links: [SECTION_LINKS.experience],
    suggestions: ["What is your education?", "Show me your projects"],
  }),
};

const educationRule: ChatRule = {
  id: "education",
  keywords: [
    "education",
    "school",
    "college",
    "degree",
    "graduate",
    "university",
    "bachelor",
    "bs",
    "science",
    "bisu",
  ],
  phrases: ["what is your education", "where did you study"],
  weight: 1.6,
  answer: () => {
    const entry = experience.find((item) =>
      `${item.role} ${item.organization}`.toLowerCase().includes("computer science"),
    );

    return {
      text: entry
        ? `${entry.description} (${entry.organization}, ${entry.period})`
        : "Jonathan earned a Bachelor of Science in Computer Science from BISU Candijay.",
      links: [SECTION_LINKS.experience],
    };
  },
};

const certificationsRule: ChatRule = {
  id: "certifications",
  keywords: [
    "certification",
    "certifications",
    "certificate",
    "certificates",
    "certified",
    "license",
    "licenses",
    "credential",
    "credentials",
  ],
  weight: 1.5,
  answer: () => ({
    text: formatCertifications(),
    links: [SECTION_LINKS.certifications],
  }),
};

const contactRule: ChatRule = {
  id: "contact",
  keywords: ["contact", "email", "reach", "hire", "hiring", "connect", "message", "linkedin", "github", "mail"],
  phrases: [
    "how can i contact you",
    "how do i reach you",
    "get in touch",
    "contact you",
  ],
  weight: 1.6,
  answer: () => ({
    text: `You can reach ${site.name} at ${email.value}.\n\n${contactIntro}`,
    links: contactLinks(),
    suggestions: ["What is your experience?", "Are you open to collaboration?"],
  }),
};

const availabilityRule: ChatRule = {
  id: "availability",
  keywords: ["available", "availability", "freelance", "collaborate", "collaboration", "opportunity", "opportunities", "open"],
  phrases: ["are you available", "open to work", "open to collaboration"],
  weight: 1.5,
  answer: () => ({
    text: `${getFact("Currently") ? `Currently: ${getFact("Currently")}. ` : ""}${
      getFact("Open to") ? `Open to: ${getFact("Open to")}.` : ""
    }`.trim(),
    links: [SECTION_LINKS.contact],
  }),
};

const interestsRule: ChatRule = {
  id: "interests",
  keywords: ["ai", "artificial", "intelligence", "llm", "llms", "learning", "learn", "explore", "exploring", "interest", "interests", "focus", "design"],
  phrases: ["what are you learning", "what are your interests", "system design"],
  weight: 1.3,
  answer: () => ({
    text: `Exploring: ${getFact("Exploring") ?? "AI, LLMs, and System Design"}.\n\n${aboutParagraphs[1]}`,
    links: [SECTION_LINKS.about],
  }),
};

const worldRule: ChatRule = {
  id: "world",
  keywords: ["world", "knowledge", "explore", "playground", "game", "map"],
  phrases: ["knowledge world", "interactive world"],
  weight: 1.3,
  answer: () => ({
    text: "The World is an interactive knowledge map with six districts covering software, science, invention, and ideas. Jonathan's portfolio sits at the centre, and every exhibit is also available without exploring.",
    links: [SECTION_LINKS.world],
  }),
};

const resumeRule: ChatRule = {
  id: "resume",
  keywords: ["resume", "cv"],
  weight: 1.5,
  answer: () => ({
    text: "A downloadable resume is not available yet, but the Experience and Certifications sections cover the same information.",
    links: [SECTION_LINKS.experience, SECTION_LINKS.certifications],
  }),
};

const greetingRule: ChatRule = {
  id: "greeting",
  keywords: ["hi", "hello", "hey", "yo", "morning", "afternoon", "evening"],
  weight: 0.6,
  answer: () => ({
    text: "Hi — I'm the portfolio assistant. I answer from Jonathan's portfolio content using local rules.",
    suggestions: CHAT_SUGGESTIONS,
  }),
};

const thanksRule: ChatRule = {
  id: "thanks",
  keywords: ["thanks", "thank", "appreciate"],
  weight: 0.6,
  answer: () => ({
    text: "You're welcome. Ask another question any time.",
    suggestions: CHAT_SUGGESTIONS,
  }),
};

const helpRule: ChatRule = {
  id: "help",
  keywords: ["help", "capabilities", "questions", "ask", "topics"],
  phrases: ["what can you do", "how can you help"],
  weight: 0.8,
  answer: () => ({
    text: "I can answer questions about Jonathan's background, stack, projects, experience, education, certifications, availability, and contact details. I can also point you to the interactive World.",
    suggestions: CHAT_SUGGESTIONS,
  }),
};

function projectRules(): ChatRule[] {
  return projects.flatMap((project, index) => {
    if (isPlaceholder(project.name)) {
      return [];
    }

    return [
      {
        id: `project-${index}`,
        keywords: cleanWords([project.name]),
        phrases: [project.name],
        weight: 2.4,
        answer: () => {
          const links: ChatLink[] = [SECTION_LINKS.projects];

          if (project.githubUrl) {
            links.push({ label: "GitHub", href: project.githubUrl, external: true });
          }

          if (project.liveUrl) {
            links.push({ label: "Live demo", href: project.liveUrl, external: true });
          }

          return {
            text: `${project.name}\n\n${project.description}\n\nTechnologies: ${project.technologies.join(", ")}.`,
            links,
          };
        },
      } satisfies ChatRule,
    ];
  });
}

function experienceRules(): ChatRule[] {
  return experience.flatMap((entry, index) => {
    const words = cleanWords([entry.role, entry.organization]);

    if (words.length === 0) {
      return [];
    }

    return [
      {
        id: `experience-${index}`,
        keywords: unique(words),
        phrases: [entry.role, entry.organization],
        weight: 2.2,
        answer: () => ({
          text: `${entry.role} at ${entry.organization} (${entry.period})\n\n${entry.description}`,
          links: [SECTION_LINKS.experience],
        }),
      } satisfies ChatRule,
    ];
  });
}

function certificationRules(): ChatRule[] {
  return certifications.flatMap((certification, index) => {
    if (isPlaceholder(certification.name)) {
      return [];
    }

    return [
      {
        id: `certification-${index}`,
        keywords: cleanWords([certification.name, certification.issuer]),
        phrases: [certification.name],
        weight: 2.2,
        answer: () => ({
          text: `${certification.name} — ${certification.issuer} (${certification.year}).`,
          links: certification.credentialUrl
            ? [
                { label: "View credential", href: certification.credentialUrl, external: true },
                SECTION_LINKS.certifications,
              ]
            : [SECTION_LINKS.certifications],
        }),
      } satisfies ChatRule,
    ];
  });
}

export const CHAT_RULES: ChatRule[] = [
  greetingRule,
  thanksRule,
  helpRule,
  aboutRule,
  locationRule,
  stackRule,
  projectsRule,
  experienceRule,
  educationRule,
  certificationsRule,
  contactRule,
  availabilityRule,
  interestsRule,
  worldRule,
  resumeRule,
  ...projectRules(),
  ...experienceRules(),
  ...certificationRules(),
];

export const CHAT_WELCOME: ChatAnswer = {
  text: "Hi — I'm the portfolio assistant. I answer from Jonathan's portfolio content using local rules. Ask about his background, stack, projects, experience, certifications, or contact details.",
  suggestions: CHAT_SUGGESTIONS,
};

export const CHAT_FALLBACK: ChatAnswer = {
  text: "I couldn't find that in the portfolio knowledge. Try asking about background, stack, projects, experience, education, certifications, or contact details.",
  suggestions: CHAT_SUGGESTIONS,
};
