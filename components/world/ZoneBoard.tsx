"use client";

import { useEffect, useRef } from "react";
import type { Exhibit, Zone } from "@/types/world";
import { KIND_LABELS } from "@/lib/knowledge";
import styles from "./ZoneBoard.module.css";

interface ZoneBoardProps {
  zone: Zone;
  exhibits: Exhibit[];
  discovered: string[];
  onClose: () => void;
  onOpenExhibit: (exhibitId: string) => void;
}

export function ZoneBoard({
  zone,
  exhibits,
  discovered,
  onClose,
  onOpenExhibit,
}: ZoneBoardProps) {
  const discoveredSet = new Set(discovered);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [zone.id]);

  return (
    <aside className={styles.board} aria-labelledby="zone-board-heading">
      <header className={styles.header}>
        <div className={styles.topline}>
          <p className={styles.eyebrow}>
            [{zone.index}] / {discoveredSet.size > 0 ? "District index" : "Unvisited"}
          </p>
          <button type="button" className={styles.close} onClick={onClose}>
            Close
          </button>
        </div>
        <h2
          ref={headingRef}
          id="zone-board-heading"
          className={styles.heading}
          tabIndex={-1}
        >
          {zone.name}
        </h2>
        <p className={styles.tagline}>{zone.tagline}</p>
      </header>

      <div className={styles.body}>
        <p className={styles.description}>{zone.description}</p>

        <div className={styles.meta}>
          <span>{exhibits.length} exhibits</span>
          <span>
            {exhibits.filter((exhibit) => discoveredSet.has(exhibit.id)).length}{" "}
            discovered
          </span>
        </div>

        <ul className={styles.exhibitList}>
          {exhibits.map((exhibit, index) => (
            <li key={exhibit.id}>
              <button
                type="button"
                className={styles.exhibit}
                onClick={() => onOpenExhibit(exhibit.id)}
              >
                <span className={styles.exhibitIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={styles.exhibitMain}>
                  <span className={styles.exhibitTitle}>
                    {exhibit.title}
                    {discoveredSet.has(exhibit.id) ? (
                      <span className={styles.discoveredMark} aria-label="Discovered">
                        {" "}
                        ✓
                      </span>
                    ) : null}
                  </span>
                  <span className={styles.exhibitSummary}>{exhibit.subtitle}</span>
                  <span className={styles.exhibitKind}>
                    {KIND_LABELS[exhibit.kind]}
                  </span>
                </span>
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </button>
            </li>
          ))}
        </ul>

        <p className={styles.hint}>
          Tip: walk close to glowing markers in the world, then press{" "}
          <kbd>E</kbd> to open an exhibit. Everything here is also available in
          the Index.
        </p>
      </div>
    </aside>
  );
}
