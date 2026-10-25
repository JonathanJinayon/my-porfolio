"use client";

import { useEffect, useId, useRef } from "react";
import type { Exhibit, Zone } from "@/types/world";
import { getRelatedExhibits, KIND_LABELS } from "@/lib/knowledge";
import { DemoView } from "./demos/Demos";
import { PortfolioExhibit } from "./workspace/PortfolioExhibit";
import styles from "./ExhibitPanel.module.css";

interface ExhibitPanelProps {
  exhibit: Exhibit;
  zone: Zone;
  discovered: boolean;
  onClose: () => void;
  onOpenExhibit: (exhibitId: string) => void;
  onOpenZone: (zoneId: Zone["id"]) => void;
}

export function ExhibitPanel({
  exhibit,
  zone,
  discovered,
  onClose,
  onOpenExhibit,
  onOpenZone,
}: ExhibitPanelProps) {
  const headingId = useId();
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const related = getRelatedExhibits(exhibit);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [exhibit.id]);

  return (
    <aside
      className={styles.panel}
      aria-labelledby={headingId}
      data-kind={exhibit.kind}
    >
      <header className={styles.header}>
        <div className={styles.topline}>
          <button
            type="button"
            className={styles.zoneLink}
            onClick={() => onOpenZone(zone.id)}
          >
            [{zone.index}] {zone.shortName}
          </button>
          <button type="button" className={styles.close} onClick={onClose}>
            Close
          </button>
        </div>

        <p className={styles.eyebrow}>
          {exhibit.eyebrow ?? KIND_LABELS[exhibit.kind]}
          {exhibit.year ? <span className={styles.year}>{exhibit.year}</span> : null}
        </p>
        <h2 ref={headingRef} id={headingId} className={styles.heading} tabIndex={-1}>
          {exhibit.title}
        </h2>
        <p className={styles.subtitle}>{exhibit.subtitle}</p>
        <div className={styles.metaRow}>
          <span>{KIND_LABELS[exhibit.kind]}</span>
          <span>{discovered ? "Discovered" : "New exhibit"}</span>
        </div>
      </header>

      <div className={styles.body}>
        <p className={styles.summary}>{exhibit.summary}</p>

        {exhibit.demo ? (
          <section className={styles.demoSection} aria-label="Interactive demonstration">
            <div className={styles.sectionHeading}>
              <span>Demonstration</span>
              <span className={styles.sectionHint}>Deterministic / local</span>
            </div>
            <DemoView kind={exhibit.demo} onOpenExhibit={onOpenExhibit} />
            {exhibit.demoHint ? <p className={styles.demoHint}>{exhibit.demoHint}</p> : null}
          </section>
        ) : null}

        {exhibit.kind === "portfolio" && exhibit.portfolioSection ? (
          <PortfolioExhibit section={exhibit.portfolioSection} />
        ) : (
          <div className={styles.sections}>
            {exhibit.sections.map((section) => (
              <section className={styles.section} key={section.heading}>
                <h3 className={styles.sectionTitle}>{section.heading}</h3>
                <p>{section.body}</p>
                {section.bullets ? (
                  <ul className={styles.bullets}>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        )}

        {exhibit.timeline ? (
          <section className={styles.timeline} aria-label="Timeline">
            <h3 className={styles.sectionTitle}>Timeline</h3>
            <ol>
              {exhibit.timeline.map((event) => (
                <li key={`${event.year}-${event.title}`}>
                  <span className={styles.timelineYear}>{event.year}</span>
                  <div>
                    <h4>{event.title}</h4>
                    <p>{event.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        <div className={styles.tags} aria-label="Topics">
          {exhibit.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        {related.length > 0 ? (
          <section className={styles.related} aria-label="Related exhibits">
            <h3 className={styles.sectionTitle}>Connected ideas</h3>
            <div className={styles.relatedList}>
              {related.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={styles.relatedLink}
                  onClick={() => onOpenExhibit(item.id)}
                >
                  <span>{item.title}</span>
                  <span aria-hidden="true">→</span>
                </button>
              ))}
            </div>
          </section>
        ) : null}

        {exhibit.sources.length > 0 ? (
          <section className={styles.sources} aria-label="Sources">
            <h3 className={styles.sectionTitle}>Sources</h3>
            <ul>
              {exhibit.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noopener noreferrer">
                    {source.label}
                    <span aria-hidden="true"> ↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </aside>
  );
}
