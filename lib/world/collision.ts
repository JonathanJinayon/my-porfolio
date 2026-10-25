import type { Point } from "@/types/world";
import {
  CHARACTER_RADIUS,
  WORLD_HEIGHT,
  WORLD_WIDTH,
  ZONE_RECTS,
} from "./layout";

export function isPointWalkable(
  point: Point,
  radius = CHARACTER_RADIUS,
): boolean {
  if (
    point.x < radius ||
    point.x > WORLD_WIDTH - radius ||
    point.y < radius ||
    point.y > WORLD_HEIGHT - radius
  ) {
    return false;
  }

  for (const rect of ZONE_RECTS) {
    if (
      point.x > rect.x - radius &&
      point.x < rect.x + rect.width + radius &&
      point.y > rect.y - radius &&
      point.y < rect.y + rect.height + radius
    ) {
      return false;
    }
  }

  return true;
}

export function resolveMovement(
  from: Point,
  deltaX: number,
  deltaY: number,
  radius = CHARACTER_RADIUS,
): Point {
  let x = from.x;
  let y = from.y;

  if (isPointWalkable({ x: x + deltaX, y }, radius)) {
    x += deltaX;
  }

  if (isPointWalkable({ x, y: y + deltaY }, radius)) {
    y += deltaY;
  }

  return { x, y };
}

export function getNearestWalkablePoint(point: Point): Point {
  if (isPointWalkable(point)) {
    return point;
  }

  for (let distance = 20; distance <= 260; distance += 20) {
    for (let angle = 0; angle < 360; angle += 30) {
      const radians = (angle * Math.PI) / 180;
      const candidate = {
        x: point.x + Math.cos(radians) * distance,
        y: point.y + Math.sin(radians) * distance,
      };

      if (isPointWalkable(candidate)) {
        return candidate;
      }
    }
  }

  return { x: 880, y: 560 };
}
