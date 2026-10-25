import type { Exhibit } from "@/types/world";
import { developerExhibits } from "./developer";
import { scienceExhibits } from "./science";
import { inventorExhibits } from "./inventors";
import { libraryExhibits } from "./library";
import { aiExhibits } from "./ai";
import { workspaceExhibits } from "./workspace";

export const EXHIBITS: Exhibit[] = [
  ...workspaceExhibits,
  ...developerExhibits,
  ...scienceExhibits,
  ...inventorExhibits,
  ...libraryExhibits,
  ...aiExhibits,
];

export const EXHIBITS_BY_ID = Object.fromEntries(
  EXHIBITS.map((exhibit) => [exhibit.id, exhibit]),
) as Record<string, Exhibit>;

export function getExhibit(id: string) {
  return EXHIBITS_BY_ID[id] ?? null;
}

export function getZoneExhibits(zoneId: Exhibit["zone"]) {
  return EXHIBITS.filter((exhibit) => exhibit.zone === zoneId);
}

export function getRelatedExhibits(exhibit: Exhibit) {
  return exhibit.related
    .map((id) => EXHIBITS_BY_ID[id])
    .filter((related): related is Exhibit => Boolean(related));
}

export const EXHIBIT_COUNT = EXHIBITS.length;

export const KIND_LABELS: Record<Exhibit["kind"], string> = {
  person: "People",
  concept: "Concepts",
  timeline: "Timelines",
  lab: "Interactive",
  portfolio: "Portfolio",
};
