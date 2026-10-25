"use client";

import { useEffect, useId, useRef } from "react";
import type { Badge, Exhibit, JournalState } from "@/types/world";
import { getExhibit } from "@/lib/knowledge";
import { ZONES } from "@/lib/world/layout";
import styles from "./JournalPanel.module.css";

interface JournalPanelProps {
  journal: JournalState;
  badges: Badge[];
  onOpenExhibit: (exhibitId: string) => void;
  onClear: () => void;
  onClose: () => void;
}

export function JournalPanel({
  journal,
  badges,
  onOpenExhibit,
  onClear,
  onClose,
}: JournalPanelProps) {
  const headingId = useId();
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const recent = journal.recent
    .map((id) => getExhibit(id))
    .filter((exhibit): exhibit is Exhibit => Boolean(exhibit));
  const earned = badges.filter((badge) => badge.earned).length;

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
            <p className={styles.eyebrow}>Field journal</p>
            <h2 ref={headingRef} id={headingId} className={styles.heading} tabIndex={-1}>
              Your discoveries
            </h2>
          </div>
          <button type="button" className={styles.close} onClick={onClose}>
            Close
          </button>
        </header>

        <div className={styles.body}>
          <div className={styles.stats}>
            <div>
              <strong>{journal.discovered.length}</strong>
              <span>exhibits opened</span>
            </div>
            <div>
              <strong>{journal.zones.length} / 6</strong>
              <span>zones visited</span>
            </div>
            <div>
              <strong>{earned} / {badges.length}</strong>
              <span>field badges</span>
            </div>
          </div>

          <section aria-label="Recently visited">
            <h3 className={styles.sectionTitle}>Recently visited</h3>
            {recent.length === 0 ? (
              <p className={styles.empty}>
                Nothing recorded yet. Open an exhibit in the world, the zone
                index, or search to begin your journal.
              </p>
            ) : (
              <ul className={styles.recentList}>
                {recent.map((exhibit) => (
                  <li key={exhibit.id}>
                    <button
                      type="button"
                      className={styles.recentButton}
                      onClick={() => onOpenExhibit(exhibit.id)}
                    >
                      <span>{exhibit.title}</span>
                      <span aria-hidden="true">→</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section aria-label="Zones visited">
            <h3 className={styles.sectionTitle}>Zones</h3>
            <ul className={styles.zoneList}>
              {ZONES.map((zone) => {
                const visited = journal.zones.includes(zone.id);
                const count = journal.discovered.filter(
                  (id) => getExhibit(id)?.zone === zone.id,
                ).length;

                return (
                  <li key={zone.id} data-visited={visited || undefined}>
                    <span className={styles.zoneIndex}>[{zone.index}]</span>
                    <span className={styles.zoneName}>{zone.name}</span>
                    <span className={styles.zoneCount}>
                      {visited ? `${count} opened` : "unvisited"}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>

          <section aria-label="Badges">
            <h3 className={styles.sectionTitle}>Field badges</h3>
            <ul className={styles.badgeList}>
              {badges.map((badge) => (
                <li key={badge.id} data-earned={badge.earned || undefined}>
                  <span className={styles.badgeMark} aria-hidden="true">
                    {badge.earned ? "◆" : "◇"}
                  </span>
                  <span>
                    <strong>{badge.label}</strong>
                    <small>{badge.description}</small>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <div className={styles.footer}>
            <p>
              Progress is stored only in this browser. Nothing is required to
              access the portfolio or the exhibit archive.
            </p>
            <button type="button" className={styles.clear} onClick={onClear}>
              Clear journal
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
