"use client";

import type { PointerEvent } from "react";
import styles from "./TouchControls.module.css";

interface TouchControlsProps {
  onDirection: (x: number, y: number) => void;
  onStop: () => void;
  onInteract: () => void;
  canInteract: boolean;
}

export function TouchControls({
  onDirection,
  onStop,
  onInteract,
  canInteract,
}: TouchControlsProps) {
  function hold(
    event: PointerEvent<HTMLButtonElement>,
    x: number,
    y: number,
  ) {
    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    onDirection(x, y);
  }

  function release(event: PointerEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    onStop();
  }

  const directions = [
    { label: "Move up", x: 0, y: -1, className: styles.up, glyph: "↑" },
    { label: "Move left", x: -1, y: 0, className: styles.left, glyph: "←" },
    { label: "Move down", x: 0, y: 1, className: styles.down, glyph: "↓" },
    { label: "Move right", x: 1, y: 0, className: styles.right, glyph: "→" },
  ];

  return (
    <div className={styles.controls} aria-label="Touch movement controls">
      <div className={styles.pad}>
        {directions.map((direction) => (
          <button
            key={direction.label}
            type="button"
            className={`${styles.direction} ${direction.className}`}
            aria-label={direction.label}
            onPointerDown={(event) =>
              hold(event, direction.x, direction.y)
            }
            onPointerUp={release}
            onPointerCancel={release}
            onLostPointerCapture={onStop}
            onContextMenu={(event) => event.preventDefault()}
          >
            {direction.glyph}
          </button>
        ))}
        <span className={styles.padCenter} aria-hidden="true" />
      </div>

      <button
        type="button"
        className={styles.interact}
        onClick={onInteract}
        disabled={!canInteract}
      >
        {canInteract ? "Interact" : "Explore"}
      </button>
    </div>
  );
}
