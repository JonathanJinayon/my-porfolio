export interface Point {
  x: number;
  y: number;
}

export interface WorldRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type ZoneId =
  | "workspace"
  | "developer"
  | "science"
  | "inventors"
  | "library"
  | "ai";

export type ExhibitKind = "person" | "concept" | "timeline" | "lab" | "portfolio";

export type DemoKind =
  | "relativity"
  | "decay"
  | "projectile"
  | "orbit"
  | "perceptron"
  | "gradient"
  | "attention"
  | "binary"
  | "guide";

export type PortfolioSection =
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "contact";

export interface SourceLink {
  label: string;
  url: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface ContentSection {
  heading: string;
  body: string;
  bullets?: string[];
}

export interface Exhibit {
  id: string;
  zone: ZoneId;
  kind: ExhibitKind;
  title: string;
  subtitle: string;
  summary: string;
  tags: string[];
  year?: string;
  eyebrow?: string;
  world: Point;
  sections: ContentSection[];
  timeline?: TimelineEvent[];
  sources: SourceLink[];
  related: string[];
  demo?: DemoKind;
  demoHint?: string;
  hidden?: boolean;
  portfolioSection?: PortfolioSection;
}

export interface Zone {
  id: ZoneId;
  index: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  rect: WorldRect;
  entrance: Point;
  glyph: string;
}

export interface Interactable {
  id: string;
  kind: "zone" | "exhibit";
  title: string;
  point: Point;
  zoneId: ZoneId;
  exhibitId?: string;
}

export type Overlay = "none" | "map" | "journal" | "search" | "directory" | "help";

export interface JournalState {
  discovered: string[];
  zones: ZoneId[];
  recent: string[];
}

export interface Badge {
  id: string;
  label: string;
  description: string;
  earned: boolean;
}
