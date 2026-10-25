"use client";

import type { Zone } from "@/types/world";
import styles from "./WorldHud.module.css";

interface WorldHudProps {
  zone: Zone | null;
  discoveredCount: number;
  totalExhibits: number;
  onOpenMap: () => void;
  onOpenJournal: () => void;
  onOpenSearch: () => void;
  onOpenDirectory: () => void;
  onOpenHelp: () => void;
}

export function WorldHud({
  zone,
  discoveredCount,
  totalExhibits,
  onOpenMap,
  onOpenJournal,
  onOpenSearch,
  onOpenDirectory,
  onOpenHelp,
}: WorldHudProps) {
  return (
    <div className={styles.hud}>
      <div className={styles.location}>
        <span className={styles.label}>Current location</span>
        <strong className={styles.zoneName}>
          {zone ? zone.name : "Central Plaza"}
        </strong>
        <span className={styles.progress}>
          {discoveredCount} / {totalExhibits} exhibits opened
        </span>
      </div>

      <div className={styles.actions} role="group" aria-label="World tools">
        <button type="button" className={styles.action} onClick={onOpenDirectory}>
          Index
        </button>
        <button type="button" className={styles.action} onClick={onOpenSearch}>
          Search <kbd>Ctrl K</kbd>
        </button>
        <button type="button" className={styles.action} onClick={onOpenMap}>
          Atlas <kbd>M</kbd>
        </button>
        <button type="button" className={styles.action} onClick={onOpenJournal}>
          Journal <kbd>J</kbd>
        </button>
        <button type="button" className={styles.action} onClick={onOpenHelp}>
          Help <kbd>?</kbd>
        </button>
      </div>
    </div>
  );
}
