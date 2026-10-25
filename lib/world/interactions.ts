import type { Interactable, Point, ZoneId } from "@/types/world";
import { EXHIBITS } from "@/lib/knowledge";
import { getDistance } from "./movement";
import { INTERACTION_RADIUS, ZONES } from "./layout";

export const INTERACTABLES: Interactable[] = [
  ...ZONES.map<Interactable>((zone) => ({
    id: `zone:${zone.id}`,
    kind: "zone",
    title: `Enter ${zone.name}`,
    point: zone.entrance,
    zoneId: zone.id,
  })),
  ...EXHIBITS.filter((exhibit) => !exhibit.hidden).map<Interactable>((exhibit) => ({
    id: `exhibit:${exhibit.id}`,
    kind: "exhibit",
    title: `Explore ${exhibit.title}`,
    point: exhibit.world,
    zoneId: exhibit.zone,
    exhibitId: exhibit.id,
  })),
];

export function getNearbyInteractable(point: Point): Interactable | null {
  let nearest: Interactable | null = null;
  let nearestDistance = INTERACTION_RADIUS;

  for (const interactable of INTERACTABLES) {
    const distance = getDistance(point, interactable.point);

    if (distance <= nearestDistance) {
      nearest = interactable;
      nearestDistance = distance;
    }
  }

  return nearest;
}

export function getExhibitsForZone(zoneId: ZoneId) {
  return EXHIBITS.filter((exhibit) => exhibit.zone === zoneId);
}
