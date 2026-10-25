"use client";

import { useEffect, useId, useRef, type KeyboardEvent } from "react";
import type { Point, Zone, ZoneId } from "@/types/world";
import { EXHIBITS } from "@/lib/knowledge";
import {
  PLAZA,
  ROUTES,
  WORLD_HEIGHT,
  WORLD_WIDTH,
  ZONES,
} from "@/lib/world/layout";
import styles from "./WorldMapOverlay.module.css";

interface WorldMapOverlayProps {
  characterPoint: Point;
  discoveredIds: string[];
  visitedZones: ZoneId[];
  onSelectZone: (zoneId: ZoneId) => void;
  onClose: () => void;
}

function pointsString(points: Point[]) {
  return points.map((point) => `${point.x},${point.y}`).join(" ");
}

export function WorldMapOverlay({
  characterPoint,
  discoveredIds,
  visitedZones,
  onSelectZone,
  onClose,
}: WorldMapOverlayProps) {
  const headingId = useId();
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const discovered = new Set(discoveredIds);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  function handleZoneKeyDown(event: KeyboardEvent<SVGGElement>, zone: Zone) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelectZone(zone.id);
    }
  }

  return (
    <div className={styles.backdrop} role="presentation" onClick={onClose}>
      <section
        className={styles.sheet}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>World atlas</p>
            <h2 ref={headingRef} id={headingId} className={styles.heading} tabIndex={-1}>
              Discovered locations
            </h2>
          </div>
          <button type="button" className={styles.close} onClick={onClose}>
            Close
          </button>
        </header>

        <div className={styles.content}>
          <svg
            className={styles.map}
            viewBox={`0 0 ${WORLD_WIDTH} ${WORLD_HEIGHT}`}
            role="group"
            aria-label="World map with six zones"
          >
            <rect width={WORLD_WIDTH} height={WORLD_HEIGHT} className={styles.ground} />
            {ROUTES.map((route, index) => (
              <polyline
                key={index}
                points={pointsString(route)}
                className={styles.route}
              />
            ))}
            <circle cx={PLAZA.x} cy={PLAZA.y} r={PLAZA.radius} className={styles.plaza} />
            <text x={PLAZA.x} y={PLAZA.y + PLAZA.radius + 34} className={styles.plazaText}>
              CENTRAL PLAZA
            </text>

            {ZONES.map((zone) => {
              const visited = visitedZones.includes(zone.id);
              const zoneExhibits = EXHIBITS.filter((exhibit) => exhibit.zone === zone.id);
              const found = zoneExhibits.filter((exhibit) => discovered.has(exhibit.id)).length;

              return (
                <g
                  key={zone.id}
                  className={styles.zone}
                  data-visited={visited || undefined}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open ${zone.name}. ${found} of ${zoneExhibits.length} exhibits discovered.`}
                  onClick={() => onSelectZone(zone.id)}
                  onKeyDown={(event) => handleZoneKeyDown(event, zone)}
                >
                  <rect
                    x={zone.rect.x}
                    y={zone.rect.y}
                    width={zone.rect.width}
                    height={zone.rect.height}
                    rx="6"
                  />
                  <text x={zone.rect.x + 22} y={zone.rect.y + 34} className={styles.zoneIndex}>
                    [{zone.index}]
                  </text>
                  <text x={zone.rect.x + 22} y={zone.rect.y + 68} className={styles.zoneName}>
                    {zone.name}
                  </text>
                  <text x={zone.rect.x + 22} y={zone.rect.y + 94} className={styles.zoneMeta}>
                    {found} / {zoneExhibits.length} exhibits
                  </text>
                  <text x={zone.rect.x + 22} y={zone.rect.y + 118} className={styles.zoneMeta}>
                    {visited ? "visited" : "unvisited"}
                  </text>
                </g>
              );
            })}

            {EXHIBITS.filter((exhibit) => discovered.has(exhibit.id)).map((exhibit) => (
              <circle
                key={exhibit.id}
                cx={exhibit.world.x}
                cy={exhibit.world.y}
                r="5"
                className={styles.exhibitDot}
              />
            ))}

            <g className={styles.player} transform={`translate(${characterPoint.x} ${characterPoint.y})`}>
              <circle r="18" />
              <circle r="7" />
            </g>
          </svg>

          <div className={styles.legend}>
            <span><i className={styles.legendZone} /> Zone</span>
            <span><i className={styles.legendDot} /> Discovered exhibit</span>
            <span><i className={styles.legendPlayer} /> You</span>
          </div>
        </div>

        <footer className={styles.footer}>
          <p>
            Select a zone to open its district index. Discovered exhibits remain
            accessible from the Index at any time.
          </p>
        </footer>
      </section>
    </div>
  );
}
