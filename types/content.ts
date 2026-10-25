export interface NavLink {
  label: string;
  href: string;
}

export interface TechGroup {
  label: string;
  items: string[];
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface ExperienceEntry {
  role: string;
  organization: string;
  period: string;
  description: string;
}

export interface SocialLink {
  label: string;
  value: string;
  href?: string;
}

export interface Fact {
  label: string;
  value: string;
}

export interface ProfileImage {
  src: string;
  alt: string;
  caption: string;
}

export interface SiteContent {
  name: string;
  title: string;
  eyebrow: string;
  intro: string;
  location: string;
  focus: string;
  availability: string;
  focusAreas: string[];
  profileImage: ProfileImage;
}
