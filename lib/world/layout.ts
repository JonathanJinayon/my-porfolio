import type { Point, WorldRect, Zone, ZoneId } from "@/types/world";

export const WORLD_WIDTH = 1760;
export const WORLD_HEIGHT = 1120;
export const VIEW_SIZE = 760;
export const GRID_SIZE = 20;
export const CHARACTER_RADIUS = 26;
export const MOVE_SPEED = 250;
export const INTERACTION_RADIUS = 96;
export const SPAWN_POINT: Point = { x: 880, y: 560 };

export const ZONES: Zone[] = [
  {
    id: "workspace",
    index: "01",
    name: "Personal Workspace",
    shortName: "Workspace",
    tagline: "The portfolio, at the centre of the world",
    description:
      "Jonathan's original portfolio lives here: background, skills, projects, experience, repositories, and contact details.",
    rect: { x: 660, y: 70, width: 440, height: 210 },
    entrance: { x: 880, y: 340 },
    glyph: "⌂",
  },
  {
    id: "developer",
    index: "02",
    name: "Developer District",
    shortName: "Developer",
    tagline: "Languages, systems, and software pioneers",
    description:
      "A working district for computer science: the people who shaped computation, the languages we use, and the practices that keep software maintainable.",
    rect: { x: 120, y: 220, width: 440, height: 280 },
    entrance: { x: 610, y: 440 },
    glyph: "{}",
  },
  {
    id: "science",
    index: "03",
    name: "Science Observatory",
    shortName: "Science",
    tagline: "Theories, experiments, and the people behind them",
    description:
      "Exhibits on relativity, radioactivity, classical mechanics, orbital calculation, and the structure of life.",
    rect: { x: 1200, y: 220, width: 440, height: 280 },
    entrance: { x: 1150, y: 440 },
    glyph: "◐",
  },
  {
    id: "inventors",
    index: "04",
    name: "Inventors' Workshop",
    shortName: "Inventors",
    tagline: "Machines that changed what was possible",
    description:
      "From movable type to packet-switched networks, examine the systems behind major engineering transitions.",
    rect: { x: 120, y: 700, width: 440, height: 260 },
    entrance: { x: 610, y: 650 },
    glyph: "⚙",
  },
  {
    id: "library",
    index: "05",
    name: "Knowledge Library",
    shortName: "Library",
    tagline: "Ideas that connect across disciplines",
    description:
      "Psychology, mathematics, philosophy, astronomy, and systems thinking, with links that lead from one idea to another.",
    rect: { x: 1200, y: 700, width: 440, height: 260 },
    entrance: { x: 1150, y: 650 },
    glyph: "▤",
  },
  {
    id: "ai",
    index: "06",
    name: "AI Laboratory",
    shortName: "AI Lab",
    tagline: "Small, inspectable experiments",
    description:
      "A deterministic laboratory for perceptrons, gradient descent, attention, and a local search guide that cites its sources.",
    rect: { x: 680, y: 800, width: 400, height: 220 },
    entrance: { x: 880, y: 750 },
    glyph: "◇",
  },
];

export const ZONES_BY_ID = Object.fromEntries(
  ZONES.map((zone) => [zone.id, zone]),
) as Record<ZoneId, Zone>;

export const ZONE_RECTS: WorldRect[] = ZONES.map((zone) => zone.rect);

export const PLAZA = { x: 880, y: 560, radius: 118 };

export const ROUTES: Point[][] = [
  [
    { x: 880, y: 560 },
    { x: 880, y: 340 },
  ],
  [
    { x: 880, y: 560 },
    { x: 880, y: 750 },
  ],
  [
    { x: 880, y: 560 },
    { x: 700, y: 560 },
    { x: 610, y: 560 },
    { x: 610, y: 440 },
  ],
  [
    { x: 880, y: 560 },
    { x: 1060, y: 560 },
    { x: 1150, y: 560 },
    { x: 1150, y: 440 },
  ],
  [
    { x: 880, y: 560 },
    { x: 700, y: 560 },
    { x: 610, y: 560 },
    { x: 610, y: 650 },
  ],
  [
    { x: 880, y: 560 },
    { x: 1060, y: 560 },
    { x: 1150, y: 560 },
    { x: 1150, y: 650 },
  ],
];

export function getZone(id: ZoneId) {
  return ZONES_BY_ID[id];
}

export function getZoneDistance(point: Point, zone: Zone) {
  const { rect } = zone;
  const nearestX = Math.max(rect.x, Math.min(point.x, rect.x + rect.width));
  const nearestY = Math.max(rect.y, Math.min(point.y, rect.y + rect.height));

  return Math.hypot(point.x - nearestX, point.y - nearestY);
}

export function getZoneAt(point: Point): ZoneId | null {
  let closest: Zone | null = null;
  let closestDistance = Number.POSITIVE_INFINITY;

  for (const zone of ZONES) {
    const distance = getZoneDistance(point, zone);

    if (distance < 150 && distance < closestDistance) {
      closest = zone;
      closestDistance = distance;
    }
  }

  return closest?.id ?? null;
}
