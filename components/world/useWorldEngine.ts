"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type MouseEvent as ReactMouseEvent,
  type RefObject,
} from "react";
import type { Interactable, Point, ZoneId } from "@/types/world";
import { getNearestWalkablePoint, isPointWalkable, resolveMovement } from "@/lib/world/collision";
import {
  CHARACTER_RADIUS,
  MOVE_SPEED,
  SPAWN_POINT,
  VIEW_SIZE,
  WORLD_HEIGHT,
  WORLD_WIDTH,
  getZoneAt,
} from "@/lib/world/layout";
import { getNearbyInteractable } from "@/lib/world/interactions";
import {
  clamp,
  getPathLength,
  getPointAtDistance,
  prefersReducedMotion,
} from "@/lib/world/movement";
import { findPath } from "@/lib/world/pathfinding";

interface UseWorldEngineOptions {
  stageRef: RefObject<HTMLDivElement | null>;
  worldRef: RefObject<HTMLDivElement | null>;
  characterRef: RefObject<SVGGElement | null>;
  headingRef: RefObject<SVGGElement | null>;
  pausedRef: RefObject<boolean>;
  onNearbyChange: (target: Interactable | null) => void;
  onZoneChange: (zoneId: ZoneId | null) => void;
}

interface TravelState {
  path: Point[];
  totalDistance: number;
  distance: number;
  token: number;
}

const MOVEMENT_KEYS = new Set([
  "w",
  "a",
  "s",
  "d",
  "arrowup",
  "arrowdown",
  "arrowleft",
  "arrowright",
]);

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return (
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT" ||
    target.isContentEditable
  );
}

export function useWorldEngine({
  stageRef,
  worldRef,
  characterRef,
  headingRef,
  pausedRef,
  onNearbyChange,
  onZoneChange,
}: UseWorldEngineOptions) {
  const positionRef = useRef<Point>({ ...SPAWN_POINT });
  const cameraRef = useRef<Point>({
    x: clamp(SPAWN_POINT.x - VIEW_SIZE / 2, 0, WORLD_WIDTH - VIEW_SIZE),
    y: clamp(SPAWN_POINT.y - VIEW_SIZE / 2, 0, WORLD_HEIGHT - VIEW_SIZE),
  });
  const cameraTargetRef = useRef<Point>({ ...cameraRef.current });
  const scaleRef = useRef(1);
  const keysRef = useRef(new Set<string>());
  const touchRef = useRef<Point>({ x: 0, y: 0 });
  const faceRef = useRef(0);
  const travelRef = useRef<TravelState | null>(null);
  const travelTokenRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);
  const nearbyIdRef = useRef<string | null>(null);
  const zoneIdRef = useRef<ZoneId | null>(null);
  const reducedMotionRef = useRef(false);
  const callbacksRef = useRef({ onNearbyChange, onZoneChange });
  callbacksRef.current = { onNearbyChange, onZoneChange };

  const applyCharacter = useCallback(() => {
    const point = positionRef.current;
    characterRef.current?.setAttribute(
      "transform",
      `translate(${point.x} ${point.y})`,
    );
    headingRef.current?.setAttribute("transform", `rotate(${faceRef.current})`);
  }, [characterRef, headingRef]);

  const applyCamera = useCallback(() => {
    const scale = scaleRef.current;
    const camera = cameraRef.current;

    if (worldRef.current) {
      worldRef.current.style.transform = `translate3d(${-camera.x * scale}px, ${-camera.y * scale}px, 0)`;
    }
  }, [worldRef]);

  const updateContext = useCallback(() => {
    const point = positionRef.current;
    const nearby = getNearbyInteractable(point);
    const nearbyId = nearby?.id ?? null;

    if (nearbyIdRef.current !== nearbyId) {
      nearbyIdRef.current = nearbyId;
      callbacksRef.current.onNearbyChange(nearby);
    }

    const zoneId = getZoneAt(point);

    if (zoneIdRef.current !== zoneId) {
      zoneIdRef.current = zoneId;
      callbacksRef.current.onZoneChange(zoneId);
    }
  }, []);

  const ensureLoop = useCallback(() => {
    if (frameRef.current !== null || typeof window === "undefined") {
      return;
    }

    lastTimeRef.current = performance.now();
    frameRef.current = window.requestAnimationFrame(function tick(now) {
      const deltaSeconds = Math.min((now - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = now;

      const paused = pausedRef.current;
      const travel = travelRef.current;
      let moved = false;

      if (!paused) {
        if (travel) {
          travel.distance = Math.min(
            travel.totalDistance,
            travel.distance + MOVE_SPEED * deltaSeconds,
          );
          positionRef.current = getPointAtDistance(
            travel.path[0] ?? positionRef.current,
            travel.path.slice(1),
            travel.distance,
          );

          if (travel.distance >= travel.totalDistance) {
            travelRef.current = null;
            travelTokenRef.current += 1;
          }

          moved = true;
        } else {
          let directionX = touchRef.current.x;
          let directionY = touchRef.current.y;

          if (keysRef.current.has("a") || keysRef.current.has("arrowleft")) {
            directionX -= 1;
          }

          if (keysRef.current.has("d") || keysRef.current.has("arrowright")) {
            directionX += 1;
          }

          if (keysRef.current.has("w") || keysRef.current.has("arrowup")) {
            directionY -= 1;
          }

          if (keysRef.current.has("s") || keysRef.current.has("arrowdown")) {
            directionY += 1;
          }

          const length = Math.hypot(directionX, directionY);

          if (length > 0) {
            directionX /= length;
            directionY /= length;
            faceRef.current =
              (Math.atan2(directionY, directionX) * 180) / Math.PI + 90;
            const step = MOVE_SPEED * deltaSeconds;
            const next = resolveMovement(
              positionRef.current,
              directionX * step,
              directionY * step,
              CHARACTER_RADIUS,
            );

            if (
              next.x !== positionRef.current.x ||
              next.y !== positionRef.current.y
            ) {
              positionRef.current = next;
              moved = true;
            }
          }
        }
      }

      applyCharacter();
      updateContext();

      cameraTargetRef.current = {
        x: clamp(
          positionRef.current.x - VIEW_SIZE / 2,
          0,
          WORLD_WIDTH - VIEW_SIZE,
        ),
        y: clamp(
          positionRef.current.y - VIEW_SIZE / 2,
          0,
          WORLD_HEIGHT - VIEW_SIZE,
        ),
      };

      const camera = cameraRef.current;
      const target = cameraTargetRef.current;
      const cameraDeltaX = target.x - camera.x;
      const cameraDeltaY = target.y - camera.y;
      const cameraFollowing =
        Math.abs(cameraDeltaX) > 0.4 || Math.abs(cameraDeltaY) > 0.4;

      if (reducedMotionRef.current) {
        camera.x = target.x;
        camera.y = target.y;
      } else if (cameraFollowing) {
        const factor = Math.min(1, deltaSeconds * 10);
        camera.x += cameraDeltaX * factor;
        camera.y += cameraDeltaY * factor;
      }

      applyCamera();

      const stillMoving =
        moved ||
        travelRef.current !== null ||
        cameraFollowing ||
        (!paused &&
          (keysRef.current.size > 0 ||
            Math.abs(touchRef.current.x) > 0 ||
            Math.abs(touchRef.current.y) > 0));

      if (stillMoving) {
        frameRef.current = window.requestAnimationFrame(tick);
      } else {
        frameRef.current = null;
      }
    });
  }, [applyCamera, applyCharacter, pausedRef, updateContext]);

  const teleport = useCallback(
    (point: Point) => {
      travelTokenRef.current += 1;
      travelRef.current = null;
      positionRef.current = isPointWalkable(point)
        ? point
        : getNearestWalkablePoint(point);
      cameraTargetRef.current = {
        x: clamp(
          positionRef.current.x - VIEW_SIZE / 2,
          0,
          WORLD_WIDTH - VIEW_SIZE,
        ),
        y: clamp(
          positionRef.current.y - VIEW_SIZE / 2,
          0,
          WORLD_HEIGHT - VIEW_SIZE,
        ),
      };
      cameraRef.current = { ...cameraTargetRef.current };
      applyCharacter();
      applyCamera();
      updateContext();
    },
    [applyCamera, applyCharacter, updateContext],
  );

  const walkTo = useCallback(
    (target: Point) => {
      const goal = isPointWalkable(target)
        ? target
        : getNearestWalkablePoint(target);
      const path = findPath(positionRef.current, goal);

      if (!path || path.length === 0) {
        return;
      }

      if (prefersReducedMotion()) {
        teleport(goal);
        return;
      }

      travelTokenRef.current += 1;
      travelRef.current = {
        path: [positionRef.current, ...path],
        totalDistance: getPathLength(positionRef.current, path),
        distance: 0,
        token: travelTokenRef.current,
      };
      ensureLoop();
    },
    [ensureLoop, teleport],
  );

  const handleStageClick = useCallback(
    (event: ReactMouseEvent<HTMLDivElement>) => {
      if (pausedRef.current) {
        return;
      }

      const stage = stageRef.current;

      if (!stage) {
        return;
      }

      const bounds = stage.getBoundingClientRect();
      const scale = scaleRef.current || bounds.width / VIEW_SIZE;
      const worldPoint = {
        x: cameraRef.current.x + (event.clientX - bounds.left) / scale,
        y: cameraRef.current.y + (event.clientY - bounds.top) / scale,
      };

      walkTo(worldPoint);
    },
    [pausedRef, stageRef, walkTo],
  );

  const setTouchDirection = useCallback(
    (x: number, y: number) => {
      touchRef.current = { x, y };

      if (x !== 0 || y !== 0) {
        ensureLoop();
      }
    },
    [ensureLoop],
  );

  const cancelTravel = useCallback(() => {
    travelTokenRef.current += 1;
    travelRef.current = null;
  }, []);

  useEffect(() => {
    reducedMotionRef.current = prefersReducedMotion();
    applyCharacter();

    const stage = stageRef.current;
    const target = stage ?? worldRef.current;
    const observer =
      typeof ResizeObserver !== "undefined" && target
        ? new ResizeObserver((entries) => {
            const entry = entries[0];

            if (!entry) {
              return;
            }

            scaleRef.current = entry.contentRect.width / VIEW_SIZE;
            applyCamera();
          })
        : null;

    if (target) {
      observer?.observe(target);
    }

    const scale = target?.getBoundingClientRect().width ?? VIEW_SIZE;
    scaleRef.current = scale / VIEW_SIZE;
    applyCharacter();
    applyCamera();
    ensureLoop();

    function handleKeyDown(event: KeyboardEvent) {
      if (isTypingTarget(event.target) || pausedRef.current) {
        return;
      }

      const key = event.key.toLowerCase();

      if (MOVEMENT_KEYS.has(key)) {
        event.preventDefault();
        keysRef.current.add(key);
        ensureLoop();
      }
    }

    function handleKeyUp(event: KeyboardEvent) {
      const key = event.key.toLowerCase();

      if (MOVEMENT_KEYS.has(key)) {
        keysRef.current.delete(key);
      }
    }

    function handleBlur() {
      keysRef.current.clear();
      touchRef.current = { x: 0, y: 0 };
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);

    return () => {
      observer?.disconnect();
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [
    applyCamera,
    applyCharacter,
    ensureLoop,
    pausedRef,
    stageRef,
    worldRef,
  ]);

  return {
    positionRef,
    walkTo,
    teleport,
    cancelTravel,
    setTouchDirection,
    handleStageClick,
  };
}
