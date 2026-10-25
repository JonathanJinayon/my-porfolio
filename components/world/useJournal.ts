"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { JournalState, ZoneId } from "@/types/world";
import {
  EMPTY_JOURNAL,
  JOURNAL_STORAGE_KEY,
  discoverExhibit,
  parseJournal,
  visitZone as visitZoneInState,
} from "@/lib/world/journal";

const listeners = new Set<() => void>();
let cachedJournal: JournalState | null = null;

function readJournal() {
  if (typeof window === "undefined") {
    return EMPTY_JOURNAL;
  }

  try {
    return parseJournal(window.localStorage.getItem(JOURNAL_STORAGE_KEY));
  } catch {
    return EMPTY_JOURNAL;
  }
}

function getSnapshot() {
  if (cachedJournal === null) {
    cachedJournal = readJournal();
  }

  return cachedJournal;
}

function getServerSnapshot() {
  return EMPTY_JOURNAL;
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  function handleStorage(event: StorageEvent) {
    if (event.key !== JOURNAL_STORAGE_KEY) {
      return;
    }

    cachedJournal = null;
    listener();
  }

  window.addEventListener("storage", handleStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

function updateJournal(updater: (current: JournalState) => JournalState) {
  const next = updater(getSnapshot());
  cachedJournal = next;

  try {
    window.localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage may be unavailable. The world remains fully usable.
  }

  for (const listener of listeners) {
    listener();
  }
}

function clearJournal() {
  cachedJournal = EMPTY_JOURNAL;

  try {
    window.localStorage.removeItem(JOURNAL_STORAGE_KEY);
  } catch {
    // Ignore storage failures.
  }

  for (const listener of listeners) {
    listener();
  }
}

export function useJournal() {
  const journal = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const discover = useCallback((exhibitId: string) => {
    updateJournal((current) => discoverExhibit(current, exhibitId));
  }, []);

  const visitZone = useCallback((zoneId: ZoneId) => {
    updateJournal((current) => visitZoneInState(current, zoneId));
  }, []);

  const clear = useCallback(() => {
    clearJournal();
  }, []);

  return { journal, discover, visitZone, clear };
}
