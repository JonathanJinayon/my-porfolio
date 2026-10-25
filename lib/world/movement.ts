import type { Point } from "@/types/world";

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function getDistance(from: Point, to: Point) {
  return Math.hypot(to.x - from.x, to.y - from.y);
}

export function getPathLength(start: Point, path: Point[]) {
  let length = 0;
  let previous = start;

  for (const point of path) {
    length += getDistance(previous, point);
    previous = point;
  }

  return length;
}

export function getPointAtDistance(
  start: Point,
  path: Point[],
  distance: number,
): Point {
  if (path.length === 0) {
    return start;
  }

  let remaining = Math.max(0, distance);
  let previous = start;

  for (const point of path) {
    const segmentLength = getDistance(previous, point);

    if (remaining <= segmentLength) {
      if (segmentLength === 0) {
        return point;
      }

      const progress = remaining / segmentLength;

      return {
        x: previous.x + (point.x - previous.x) * progress,
        y: previous.y + (point.y - previous.y) * progress,
      };
    }

    remaining -= segmentLength;
    previous = point;
  }

  return path[path.length - 1];
}

export function clamp(value: number, minimum: number, maximum: number) {
  return Math.max(minimum, Math.min(value, maximum));
}
