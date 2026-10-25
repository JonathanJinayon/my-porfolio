"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { ZoneId } from "@/types/world";
import { EXHIBITS, KIND_LABELS } from "@/lib/knowledge";
import { ZONES } from "@/lib/world/layout";
import styles from "./Directory.module.css";

interface DirectoryProps {
  discoveredIds: string[];
  onOpenExhibit: (exhibitId: string) => void;
  onOpenZone: (zoneId: ZoneId) => void;
  onClose: () => void;
}

export function Directory({
  discoveredIds,
  onOpenExhibit,
  onOpenZone,
  onClose,
}: DirectoryProps) {
  const headingId = useId();
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const [filter, setFilter] = useState<"all" | "opened" | "unopened">("all");
  const discovered = new Set(discoveredIds);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

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
            <p className={styles.eyebrow}>Conventional navigation</p>
            <h2 ref={headingRef} id={headingId} className={styles.heading} tabIndex={-1}>
              Exhibit index
            </h2>
            <p className={styles.description}>
              Every exhibit is listed here. Exploration is optional; this index
              is the complete archive.
            </p>
          </div>
          <button type="button" className={styles.close} onClick={onClose}>
            Close
          </button>
        </header>

        <div className={styles.toolbar}>
          <div className={styles.filters} role="group" aria-label="Filter exhibits">
            {(["all", "opened", "unopened"] as const).map((option) => (
              <button
                key={option}
                type="button"
                className={styles.filter}
                data-active={filter === option || undefined}
                aria-pressed={filter === option}
                onClick={() => setFilter(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <p className={styles.count}>
            {EXHIBITS.length} exhibits / {discovered.size} opened
          </p>
        </div>

        <div className={styles.body}>
          {ZONES.map((zone) => {
            const exhibits = EXHIBITS.filter((exhibit) => {
              if (exhibit.zone !== zone.id) {
                return false;
              }

              if (filter === "opened") {
                return discovered.has(exhibit.id);
              }

              if (filter === "unopened") {
                return !discovered.has(exhibit.id);
              }

              return true;
            });

            if (exhibits.length === 0) {
              return null;
            }

            return (
              <section className={styles.zone} key={zone.id} aria-label={zone.name}>
                <div className={styles.zoneHeader}>
                  <button
                    type="button"
                    className={styles.zoneLink}
                    onClick={() => onOpenZone(zone.id)}
                  >
                    [{zone.index}] {zone.name}
                  </button>
                  <span className={styles.zoneCount}>
                    {exhibits.length} exhibit{exhibits.length === 1 ? "" : "s"}
                  </span>
                </div>
                <ul className={styles.list}>
                  {exhibits.map((exhibit) => (
                    <li key={exhibit.id}>
                      <button
                        type="button"
                        className={styles.entry}
                        onClick={() => onOpenExhibit(exhibit.id)}
                      >
                        <span className={styles.entryMain}>
                          <span className={styles.entryTitle}>
                            {exhibit.title}
                            {discovered.has(exhibit.id) ? (
                              <span className={styles.found} aria-label="Discovered">
                                {" "}
                                âœ“
                              </span>
                            ) : null}
                          </span>
                          <span className={styles.entrySummary}>{exhibit.summary}</span>
                        </span>
                        <span className={styles.entryMeta}>
                          {KIND_LABELS[exhibit.kind]}
                          <span aria-hidden="true">â†’</span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </section>
    </div>
  );
}

