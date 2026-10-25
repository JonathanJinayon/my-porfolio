"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { Zone, ZoneId } from "@/types/world";
import { searchExhibits } from "@/lib/knowledge/search";
import { KIND_LABELS } from "@/lib/knowledge";
import { ZONES } from "@/lib/world/layout";
import styles from "./SearchPalette.module.css";

interface SearchPaletteProps {
  discoveredIds: string[];
  onOpenExhibit: (exhibitId: string) => void;
  onOpenZone: (zoneId: ZoneId) => void;
  onClose: () => void;
}

export function SearchPalette({
  discoveredIds,
  onOpenExhibit,
  onOpenZone,
  onClose,
}: SearchPaletteProps) {
  const [query, setQuery] = useState("");
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const discovered = useMemo(() => new Set(discoveredIds), [discoveredIds]);
  const results = useMemo(() => searchExhibits(query, 14), [query]);
  const normalized = query.trim().toLowerCase();
  const zoneMatches: Zone[] = useMemo(
    () =>
      normalized
        ? ZONES.filter((zone) =>
            `${zone.name} ${zone.shortName} ${zone.tagline} ${zone.description}`
              .toLowerCase()
              .includes(normalized),
          )
        : ZONES,
    [normalized],
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className={styles.backdrop} role="presentation" onClick={onClose}>
      <section
        className={styles.sheet}
        role="dialog"
        aria-modal="true"
        aria-labelledby="world-search-heading"
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          <h2 id="world-search-heading" className={styles.eyebrow}>
            Search the archive
          </h2>
          <button type="button" className={styles.close} onClick={onClose}>
            Close
          </button>
        </header>

        <form
          className={styles.form}
          onSubmit={(event) => {
            event.preventDefault();

            if (results[0]) {
              onOpenExhibit(results[0].exhibit.id);
            } else if (zoneMatches[0]) {
              onOpenZone(zoneMatches[0].id);
            }
          }}
        >
          <label className={styles.label} htmlFor={inputId}>
            Find people, concepts, technologies, or places
          </label>
          <div className={styles.inputRow}>
            <span aria-hidden="true">&gt;</span>
            <input
              ref={inputRef}
              id={inputId}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try: Turing, radioactivity, printing press, attention"
              autoComplete="off"
              spellCheck={false}
              maxLength={120}
            />
            <kbd>Esc</kbd>
          </div>
        </form>

        <div className={styles.results}>
          <section aria-label="Places">
            <h3 className={styles.groupHeading}>
              {normalized ? "Places" : "All zones"}
            </h3>
            <ul className={styles.zoneList}>
              {zoneMatches.map((zone) => (
                <li key={zone.id}>
                  <button
                    type="button"
                    className={styles.zoneButton}
                    onClick={() => onOpenZone(zone.id)}
                  >
                    <span className={styles.zoneIndex}>[{zone.index}]</span>
                    <span>{zone.name}</span>
                    <span className={styles.zoneArrow} aria-hidden="true">
                      →
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section aria-label="Exhibits">
            <h3 className={styles.groupHeading}>
              {normalized ? `${results.length} exhibits` : "Exhibits"}
            </h3>
            {results.length === 0 ? (
              <p className={styles.empty}>
                No exhibit matches this search. Try a broader term or browse a
                zone above.
              </p>
            ) : (
              <ul className={styles.resultList}>
                {results.map(({ exhibit }) => (
                  <li key={exhibit.id}>
                    <button
                      type="button"
                      className={styles.result}
                      onClick={() => onOpenExhibit(exhibit.id)}
                    >
                      <span className={styles.resultMain}>
                        <span className={styles.resultTitle}>
                          {exhibit.title}
                          {discovered.has(exhibit.id) ? (
                            <span className={styles.found} aria-label="Discovered">
                              {" "}
                              ✓
                            </span>
                          ) : null}
                        </span>
                        <span className={styles.resultSummary}>{exhibit.subtitle}</span>
                      </span>
                      <span className={styles.resultMeta}>
                        {KIND_LABELS[exhibit.kind]}
                        <span aria-hidden="true">→</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <footer className={styles.footer}>
          Search is local and deterministic. All exhibits are also listed in the
          Index.
        </footer>
      </section>
    </div>
  );
}
