"use client";

import { useEffect, useId, useRef } from "react";
import styles from "./WorldHelp.module.css";

interface WorldHelpProps {
  onClose: () => void;
}

export function WorldHelp({ onClose }: WorldHelpProps) {
  const headingId = useId();
  const headingRef = useRef<HTMLHeadingElement | null>(null);

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
            <p className={styles.eyebrow}>Exploration guide</p>
            <h2 ref={headingRef} id={headingId} className={styles.heading} tabIndex={-1}>
              How to move through the world
            </h2>
          </div>
          <button type="button" className={styles.close} onClick={onClose}>
            Close
          </button>
        </header>

        <div className={styles.body}>
          <section>
            <h3>Movement</h3>
            <ul>
              <li><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> or arrow keys move the guide.</li>
              <li>Click or tap open ground to walk there automatically.</li>
              <li>On touch screens, use the directional pad in the lower-left corner.</li>
              <li>Buildings and world edges block movement.</li>
            </ul>
          </section>

          <section>
            <h3>Interaction</h3>
            <ul>
              <li>Walk near a glowing marker or district entrance.</li>
              <li>Press <kbd>E</kbd> or use the prompt to open it.</li>
              <li>District buildings open their exhibit index.</li>
              <li>Exhibits can be opened directly from the Index at any time.</li>
            </ul>
          </section>

          <section>
            <h3>Tools</h3>
            <ul>
              <li><kbd>M</kbd> atlas with discovered locations.</li>
              <li><kbd>J</kbd> journal with recent visits and badges.</li>
              <li><kbd>Ctrl</kbd> + <kbd>K</kbd> search across the archive.</li>
              <li><kbd>?</kbd> opens this help panel.</li>
              <li><kbd>Esc</kbd> closes the current panel or overlay.</li>
            </ul>
          </section>

          <section>
            <h3>Access and motion</h3>
            <p>
              The Index and Search expose every exhibit without exploring. The
              world respects reduced-motion preferences, announces arrivals and
              opened exhibits, and keeps all controls keyboard accessible.
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
