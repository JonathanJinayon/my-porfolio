"use client";

import type { MouseEvent, RefObject } from "react";
import type { Interactable, Point, ZoneId } from "@/types/world";
import { EXHIBITS } from "@/lib/knowledge";
import {
  PLAZA,
  ROUTES,
  SPAWN_POINT,
  VIEW_SIZE,
  WORLD_HEIGHT,
  WORLD_WIDTH,
  ZONES,
} from "@/lib/world/layout";
import styles from "./WorldStage.module.css";

interface WorldStageProps {
  stageRef: RefObject<HTMLDivElement | null>;
  worldRef: RefObject<HTMLDivElement | null>;
  characterRef: RefObject<SVGGElement | null>;
  headingRef: RefObject<SVGGElement | null>;
  nearby: Interactable | null;
  activeExhibitId: string | null;
  activeZoneId: ZoneId | null;
  discoveredIds: string[];
  onStageClick: (event: MouseEvent<HTMLDivElement>) => void;
  onOpenZone: (zoneId: ZoneId) => void;
  onOpenExhibit: (exhibitId: string) => void;
}

function percentX(value: number) {
  return `${(value / WORLD_WIDTH) * 100}%`;
}

function percentY(value: number) {
  return `${(value / WORLD_HEIGHT) * 100}%`;
}

function routePoints(points: Point[]) {
  return points.map((point) => `${point.x},${point.y}`).join(" ");
}

export function WorldStage({
  stageRef,
  worldRef,
  characterRef,
  headingRef,
  nearby,
  activeExhibitId,
  activeZoneId,
  discoveredIds,
  onStageClick,
  onOpenZone,
  onOpenExhibit,
}: WorldStageProps) {
  const discovered = new Set(discoveredIds);

  return (
    <div className={styles.stageFrame}>
      <div
        ref={stageRef}
        className={styles.stage}
        onClick={onStageClick}
        role="group"
        aria-label="Explorable knowledge world. Use W A S D or arrow keys to move, and press E near an object to interact."
      >
        <div
          ref={worldRef}
          className={styles.world}
          style={{
            width: `${(WORLD_WIDTH / VIEW_SIZE) * 100}%`,
            height: `${(WORLD_HEIGHT / VIEW_SIZE) * 100}%`,
          }}
        >
          <div className={styles.grid} aria-hidden="true" />

          <svg
            className={styles.routes}
            viewBox={`0 0 ${WORLD_WIDTH} ${WORLD_HEIGHT}`}
            aria-hidden="true"
            focusable="false"
          >
            <g className={styles.routeLines}>
              {ROUTES.map((route, index) => (
                <polyline key={index} points={routePoints(route)} />
              ))}
            </g>
            <circle
              className={styles.plazaRing}
              cx={PLAZA.x}
              cy={PLAZA.y}
              r={PLAZA.radius}
            />
            <circle
              className={styles.plazaInner}
              cx={PLAZA.x}
              cy={PLAZA.y}
              r="38"
            />
            <path
              className={styles.compass}
              d={`M ${PLAZA.x} ${PLAZA.y - PLAZA.radius - 24} v -18 M ${PLAZA.x} ${PLAZA.y + PLAZA.radius + 24} v 18 M ${PLAZA.x - PLAZA.radius - 24} ${PLAZA.y} h -18 M ${PLAZA.x + PLAZA.radius + 24} ${PLAZA.y} h 18`}
            />
            <text
              className={styles.plazaLabel}
              x={PLAZA.x}
              y={PLAZA.y + PLAZA.radius + 38}
            >
              CENTRAL PLAZA
            </text>
            <text className={styles.axisLabel} x="26" y="34">
              N / 000
            </text>
            <text className={styles.axisLabel} x={WORLD_WIDTH - 26} y="34">
              {WORLD_WIDTH} × {WORLD_HEIGHT}
            </text>
          </svg>

          {ZONES.map((zone) => (
            <button
              key={zone.id}
              type="button"
              className={styles.zoneBuilding}
              data-zone={zone.id}
              data-active={activeZoneId === zone.id || undefined}
              style={{
                left: percentX(zone.rect.x),
                top: percentY(zone.rect.y),
                width: percentX(zone.rect.width),
                height: percentY(zone.rect.height),
              }}
              aria-label={`Open ${zone.name}`}
              onClick={(event) => {
                event.stopPropagation();
                onOpenZone(zone.id);
              }}
            >
              <span className={styles.zoneTopline}>
                <span>[{zone.index}]</span>
                <span className={styles.zoneGlyph} aria-hidden="true">
                  {zone.glyph}
                </span>
              </span>
              <span className={styles.zoneName}>{zone.name}</span>
              <span className={styles.zoneTagline}>{zone.tagline}</span>
              <span className={styles.zoneOpen} aria-hidden="true">
                Open district
              </span>
            </button>
          ))}

          {EXHIBITS.map((exhibit) => {
            const isNearby = nearby?.exhibitId === exhibit.id;
            const isActive = activeExhibitId === exhibit.id;
            const isDiscovered = discovered.has(exhibit.id);

            return (
              <button
                key={exhibit.id}
                type="button"
                tabIndex={-1}
                className={styles.exhibitNode}
                data-nearby={isNearby || undefined}
                data-active={isActive || undefined}
                data-discovered={isDiscovered || undefined}
                style={{
                  left: percentX(exhibit.world.x),
                  top: percentY(exhibit.world.y),
                }}
                aria-label={`Explore ${exhibit.title}`}
                onClick={(event) => {
                  event.stopPropagation();
                  onOpenExhibit(exhibit.id);
                }}
              >
                <span className={styles.nodeDot} aria-hidden="true" />
                <span className={styles.nodeLabel}>{exhibit.title}</span>
              </button>
            );
          })}

          <svg
            className={styles.characterLayer}
            viewBox={`0 0 ${WORLD_WIDTH} ${WORLD_HEIGHT}`}
            aria-hidden="true"
            focusable="false"
          >
            <g
              ref={characterRef}
              transform={`translate(${SPAWN_POINT.x} ${SPAWN_POINT.y})`}
            >
              <ellipse className={styles.characterShadow} cx="0" cy="13" rx="17" ry="8" />
              <circle className={styles.characterHalo} r="30" />
              <g ref={headingRef}>
                <rect
                  className={styles.characterPack}
                  x="-8"
                  y="2"
                  width="16"
                  height="15"
                  rx="5"
                />
                <rect
                  className={styles.characterFoot}
                  x="-7.5"
                  y="9"
                  width="6"
                  height="10"
                  rx="2.5"
                />
                <rect
                  className={styles.characterFoot}
                  x="1.5"
                  y="9"
                  width="6"
                  height="10"
                  rx="2.5"
                />
                <rect
                  className={styles.characterArm}
                  x="-13"
                  y="-3"
                  width="5"
                  height="13"
                  rx="2.5"
                />
                <rect
                  className={styles.characterArm}
                  x="8"
                  y="-3"
                  width="5"
                  height="13"
                  rx="2.5"
                />
                <path
                  className={styles.characterTorso}
                  d="M -9 2 C -10 -3 -5 -6 0 -6 C 5 -6 10 -3 9 2 L 7.5 12 C 5 15 -5 15 -7.5 12 Z"
                />
                <path
                  className={styles.characterCollar}
                  d="M -5.5 -3 Q 0 0.5 5.5 -3"
                />
                <rect
                  className={styles.characterChest}
                  x="-3.5"
                  y="1"
                  width="7"
                  height="6"
                  rx="1.5"
                />
                <circle className={styles.characterHead} cx="0" cy="-12" r="9" />
                <path
                  className={styles.characterVisor}
                  d="M -6 -14 A 6.5 6.5 0 0 1 6 -14 Q 4.5 -8.5 0 -8 Q -4.5 -8.5 -6 -14 Z"
                />
                <circle className={styles.characterVisorCore} cx="-2.2" cy="-11" r="1.25" />
                <circle className={styles.characterVisorCore} cx="2.2" cy="-11" r="1.25" />
                <path className={styles.characterAntenna} d="M 7.5 -8 L 11.5 -14" />
                <circle className={styles.characterAntennaTip} cx="12" cy="-15" r="1.4" />
              </g>
            </g>
          </svg>
        </div>

        <div className={styles.frameCorners} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className={styles.stageLegend} aria-hidden="true">
          <span>WASD / arrows</span>
          <span>E interact</span>
          <span>click to walk</span>
        </div>
      </div>
    </div>
  );
}
