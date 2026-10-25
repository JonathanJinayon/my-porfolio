"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Interactable, Overlay, Point, ZoneId } from "@/types/world";
import { EXHIBITS, getExhibit, getZoneExhibits } from "@/lib/knowledge";
import { getBadges } from "@/lib/world/journal";
import { SPAWN_POINT, ZONES, getZone } from "@/lib/world/layout";
import { Directory } from "./Directory";
import { ExhibitPanel } from "./ExhibitPanel";
import { InteractionPrompt } from "./InteractionPrompt";
import { JournalPanel } from "./JournalPanel";
import { SearchPalette } from "./SearchPalette";
import { TouchControls } from "./TouchControls";
import { WorldHelp } from "./WorldHelp";
import { WorldHud } from "./WorldHud";
import { WorldMapOverlay } from "./WorldMapOverlay";
import { WorldStage } from "./WorldStage";
import { ZoneBoard } from "./ZoneBoard";
import { useJournal } from "./useJournal";
import { useWorldEngine } from "./useWorldEngine";
import styles from "./WorldExperience.module.css";

const INITIAL_STATUS =
  "Walk with W A S D or the arrow keys. Click open ground to move there, and press E near a marker.";
const INITIAL_GUIDE =
  "Start in the Central Plaza. Six districts surround you, and every exhibit is also listed in the Index.";

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return (
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT" ||
    target.isContentEditable
  );
}

export function WorldExperience() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const worldRef = useRef<HTMLDivElement | null>(null);
  const characterRef = useRef<SVGGElement | null>(null);
  const headingRef = useRef<SVGGElement | null>(null);
  const inspectorRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(false);

  const [overlay, setOverlay] = useState<Overlay>("none");
  const [nearby, setNearby] = useState<Interactable | null>(null);
  const [currentZoneId, setCurrentZoneId] = useState<ZoneId | null>(null);
  const [activeExhibitId, setActiveExhibitId] = useState<string | null>(null);
  const [zoneBoardId, setZoneBoardId] = useState<ZoneId | null>(null);
  const [status, setStatus] = useState(INITIAL_STATUS);
  const [guideMessage, setGuideMessage] = useState<string | null>(INITIAL_GUIDE);
  const [mapPoint, setMapPoint] = useState<Point>({ ...SPAWN_POINT });

  const { journal, discover, visitZone, clear } = useJournal();

  const handleNearbyChange = useCallback((target: Interactable | null) => {
    setNearby(target);

    if (target) {
      setStatus(`${target.title}. Press E or use the prompt to interact.`);
    }
  }, []);

  const handleZoneChange = useCallback(
    (zoneId: ZoneId | null) => {
      setCurrentZoneId(zoneId);

      if (!zoneId) {
        setStatus("Central Plaza. Choose a route or open the Index.");
        return;
      }

      const zone = getZone(zoneId);
      visitZone(zoneId);
      setStatus(`Entered ${zone.name}.`);
      setGuideMessage(`${zone.name}: ${zone.tagline}.`);
    },
    [visitZone],
  );

  const {
    positionRef,
    cancelTravel,
    setTouchDirection,
    handleStageClick,
  } = useWorldEngine({
    stageRef,
    worldRef,
    characterRef,
    headingRef,
    pausedRef,
    onNearbyChange: handleNearbyChange,
    onZoneChange: handleZoneChange,
  });

  const activeExhibit = activeExhibitId ? getExhibit(activeExhibitId) : null;
  const zoneBoardZone = zoneBoardId ? getZone(zoneBoardId) : null;
  const currentZone = currentZoneId ? getZone(currentZoneId) : null;
  const activeZoneId =
    zoneBoardZone?.id ?? activeExhibit?.zone ?? currentZoneId ?? null;
  const activePanelZone = activeExhibit
    ? getZone(activeExhibit.zone)
    : zoneBoardZone;
  const paused = Boolean(activeExhibit || zoneBoardZone) || overlay !== "none";
  const badges = useMemo(() => getBadges(journal), [journal]);
  const discoveredCount = journal.discovered.length;
  const progress = Math.round((discoveredCount / EXHIBITS.length) * 100);

  useEffect(() => {
    pausedRef.current = paused;

    if (paused) {
      setTouchDirection(0, 0);
    }
  }, [paused, setTouchDirection]);

  useEffect(() => {
    if (!activeExhibitId && !zoneBoardId) {
      return;
    }

    if (!window.matchMedia("(max-width: 64rem)").matches) {
      return;
    }

    inspectorRef.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  }, [activeExhibitId, zoneBoardId]);

  useEffect(() => {
    if (overlay === "none") {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [overlay]);

  const openExhibit = useCallback(
    (exhibitId: string) => {
      const exhibit = getExhibit(exhibitId);

      if (!exhibit) {
        return;
      }

      cancelTravel();
      setTouchDirection(0, 0);
      discover(exhibitId);
      setActiveExhibitId(exhibitId);
      setZoneBoardId(null);
      setOverlay("none");
      setStatus(`Opened ${exhibit.title}.`);
      setGuideMessage(exhibit.subtitle);
    },
    [cancelTravel, discover, setTouchDirection],
  );

  const openZone = useCallback(
    (zoneId: ZoneId) => {
      const zone = getZone(zoneId);

      if (!zone) {
        return;
      }

      cancelTravel();
      setTouchDirection(0, 0);
      visitZone(zoneId);
      setActiveExhibitId(null);
      setZoneBoardId(zoneId);
      setOverlay("none");
      setStatus(`Opened the ${zone.name} index.`);
      setGuideMessage(`${zone.name}: ${zone.tagline}.`);
    },
    [cancelTravel, setTouchDirection, visitZone],
  );

  const closePanel = useCallback(() => {
    setActiveExhibitId(null);
    setZoneBoardId(null);
    setStatus("Returned to the world. Every exhibit remains available in the Index.");
  }, []);

  const openOverlay = useCallback(
    (next: Exclude<Overlay, "none">) => {
      cancelTravel();
      setTouchDirection(0, 0);
      setOverlay(next);

      if (next === "map") {
        setMapPoint({ ...positionRef.current });
      }
    },
    [cancelTravel, positionRef, setTouchDirection],
  );

  const closeOverlay = useCallback(() => {
    setOverlay("none");
    setStatus("Closed the overlay.");
  }, []);

  const handleInteract = useCallback(() => {
    if (!nearby) {
      setStatus("Nothing within reach. Move closer to a district entrance or exhibit marker.");
      return;
    }

    if (nearby.kind === "zone") {
      openZone(nearby.zoneId);
      return;
    }

    if (nearby.exhibitId) {
      openExhibit(nearby.exhibitId);
    }
  }, [nearby, openExhibit, openZone]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (overlay !== "none") {
          event.preventDefault();
          closeOverlay();
        } else if (activeExhibitId || zoneBoardId) {
          event.preventDefault();
          closePanel();
        }

        return;
      }

      if (isTypingTarget(event.target)) {
        return;
      }

      const key = event.key.toLowerCase();
      const command = event.ctrlKey || event.metaKey;

      if (command && key === "k") {
        event.preventDefault();
        openOverlay("search");
        return;
      }

      if (event.altKey || command) {
        return;
      }

      if (overlay !== "none") {
        return;
      }

      if (key === "m") {
        event.preventDefault();
        openOverlay("map");
        return;
      }

      if (key === "j") {
        event.preventDefault();
        openOverlay("journal");
        return;
      }

      if (event.key === "?") {
        event.preventDefault();
        openOverlay("help");
        return;
      }

      if (key === "/") {
        event.preventDefault();
        openOverlay("search");
        return;
      }

      if (
        key === "e" &&
        !activeExhibitId &&
        !zoneBoardId
      ) {
        event.preventDefault();
        handleInteract();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    activeExhibitId,
    closeOverlay,
    closePanel,
    handleInteract,
    openOverlay,
    overlay,
    zoneBoardId,
  ]);

  const handleJournalClear = useCallback(() => {
    clear();
    setStatus("Journal cleared. Your discoveries can begin again.");
  }, [clear]);

  const handleMapZone = useCallback(
    (zoneId: ZoneId) => {
      setOverlay("none");
      openZone(zoneId);
    },
    [openZone],
  );

  return (
    <div className={styles.experience}>
      <div className={styles.mainColumn}>
        <WorldHud
          zone={currentZone}
          discoveredCount={discoveredCount}
          totalExhibits={EXHIBITS.length}
          onOpenMap={() => openOverlay("map")}
          onOpenJournal={() => openOverlay("journal")}
          onOpenSearch={() => openOverlay("search")}
          onOpenDirectory={() => openOverlay("directory")}
          onOpenHelp={() => openOverlay("help")}
        />

        <div className={styles.stageColumn}>
          <WorldStage
            stageRef={stageRef}
            worldRef={worldRef}
            characterRef={characterRef}
            headingRef={headingRef}
            nearby={nearby}
            activeExhibitId={activeExhibit?.id ?? null}
            activeZoneId={activeZoneId}
            discoveredIds={journal.discovered}
            onStageClick={handleStageClick}
            onOpenZone={openZone}
            onOpenExhibit={openExhibit}
          />
          <InteractionPrompt target={nearby} onInteract={handleInteract} />
          <TouchControls
            onDirection={setTouchDirection}
            onStop={() => setTouchDirection(0, 0)}
            onInteract={handleInteract}
            canInteract={Boolean(nearby)}
          />
        </div>

        <div className={styles.statusRow}>
          <p className={styles.status} role="status" aria-live="polite">
            {status}
          </p>
          {guideMessage ? (
            <p className={styles.guide}>
              <span className={styles.guideLabel}>Guide</span>
              {guideMessage}
            </p>
          ) : null}
        </div>
      </div>

      <div className={styles.inspector} ref={inspectorRef}>
        {activeExhibit && activePanelZone ? (
          <ExhibitPanel
            exhibit={activeExhibit}
            zone={activePanelZone}
            discovered={journal.discovered.includes(activeExhibit.id)}
            onClose={closePanel}
            onOpenExhibit={openExhibit}
            onOpenZone={openZone}
          />
        ) : zoneBoardZone ? (
          <ZoneBoard
            zone={zoneBoardZone}
            exhibits={getZoneExhibits(zoneBoardZone.id)}
            discovered={journal.discovered}
            onClose={closePanel}
            onOpenExhibit={openExhibit}
          />
        ) : (
          <aside className={styles.overview} aria-label="World overview">
            <p className={styles.eyebrow}>Field notes / orientation</p>
            <h2 className={styles.overviewHeading}>
              Six districts, one continuous archive.
            </h2>
            <p className={styles.overviewText}>
              Walk the world to discover it, or use the Index, Atlas, Search, and
              Journal to move directly to anything that interests you.
            </p>

            <div className={styles.progressBlock}>
              <div className={styles.progressLabel}>
                <span>Exhibits opened</span>
                <strong>
                  {discoveredCount} / {EXHIBITS.length}
                </strong>
              </div>
              <div
                className={styles.progressTrack}
                role="progressbar"
                aria-label="Exhibits opened"
                aria-valuemin={0}
                aria-valuemax={EXHIBITS.length}
                aria-valuenow={discoveredCount}
              >
                <span style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className={styles.zoneList} role="list" aria-label="Districts">
              {ZONES.map((zone) => {
                const exhibits = getZoneExhibits(zone.id);
                const found = exhibits.filter((exhibit) =>
                  journal.discovered.includes(exhibit.id),
                ).length;

                return (
                  <div key={zone.id} role="listitem">
                    <button
                      type="button"
                      className={styles.zoneButton}
                      onClick={() => openZone(zone.id)}
                    >
                      <span className={styles.zoneIndex}>[{zone.index}]</span>
                      <span className={styles.zoneMain}>
                        <span className={styles.zoneName}>{zone.name}</span>
                        <span className={styles.zoneTagline}>{zone.tagline}</span>
                      </span>
                      <span className={styles.zoneCount}>
                        {found}/{exhibits.length}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>

            <div className={styles.overviewActions}>
              <button
                type="button"
                className={styles.primaryAction}
                onClick={() => openOverlay("directory")}
              >
                Browse the full index
              </button>
              <button
                type="button"
                className={styles.secondaryAction}
                onClick={() => openOverlay("search")}
              >
                Search the archive
              </button>
            </div>

            <p className={styles.overviewHint}>
              Interact with <kbd>E</kbd>, open the atlas with <kbd>M</kbd>, or
              press <kbd>?</kbd> for every control.
            </p>
          </aside>
        )}
      </div>

      {overlay === "map" ? (
        <WorldMapOverlay
          characterPoint={mapPoint}
          discoveredIds={journal.discovered}
          visitedZones={journal.zones}
          onSelectZone={handleMapZone}
          onClose={closeOverlay}
        />
      ) : null}

      {overlay === "journal" ? (
        <JournalPanel
          journal={journal}
          badges={badges}
          onOpenExhibit={openExhibit}
          onClear={handleJournalClear}
          onClose={closeOverlay}
        />
      ) : null}

      {overlay === "search" ? (
        <SearchPalette
          discoveredIds={journal.discovered}
          onOpenExhibit={openExhibit}
          onOpenZone={openZone}
          onClose={closeOverlay}
        />
      ) : null}

      {overlay === "directory" ? (
        <Directory
          discoveredIds={journal.discovered}
          onOpenExhibit={openExhibit}
          onOpenZone={openZone}
          onClose={closeOverlay}
        />
      ) : null}

      {overlay === "help" ? <WorldHelp onClose={closeOverlay} /> : null}
    </div>
  );
}
