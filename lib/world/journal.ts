import type { Badge, JournalState, ZoneId } from "@/types/world";
import { EXHIBITS_BY_ID } from "@/lib/knowledge";

export const JOURNAL_STORAGE_KEY = "portfolio-world-journal-v1";

export const EMPTY_JOURNAL: JournalState = {
  discovered: [],
  zones: [],
  recent: [],
};

export function parseJournal(raw: string | null): JournalState {
  if (!raw) {
    return EMPTY_JOURNAL;
  }

  try {
    const value = JSON.parse(raw) as Partial<JournalState>;
    const discovered = Array.isArray(value.discovered)
      ? value.discovered.filter((id) => typeof id === "string" && id in EXHIBITS_BY_ID)
      : [];
    const zones = Array.isArray(value.zones)
      ? value.zones.filter(
          (zone): zone is ZoneId =>
            typeof zone === "string" &&
            ["workspace", "developer", "science", "inventors", "library", "ai"].includes(
              zone,
            ),
        )
      : [];
    const recent = Array.isArray(value.recent)
      ? value.recent
          .filter((id) => typeof id === "string" && id in EXHIBITS_BY_ID)
          .slice(0, 12)
      : [];

    return { discovered, zones, recent };
  } catch {
    return EMPTY_JOURNAL;
  }
}

export function discoverExhibit(state: JournalState, id: string): JournalState {
  if (!(id in EXHIBITS_BY_ID)) {
    return state;
  }

  return {
    ...state,
    discovered: state.discovered.includes(id)
      ? state.discovered
      : [...state.discovered, id],
    recent: [id, ...state.recent.filter((recentId) => recentId !== id)].slice(0, 12),
  };
}

export function visitZone(state: JournalState, zoneId: ZoneId): JournalState {
  if (state.zones.includes(zoneId)) {
    return state;
  }

  return { ...state, zones: [...state.zones, zoneId] };
}

export function getBadges(state: JournalState): Badge[] {
  const inZone = (zoneId: ZoneId, minimum: number) =>
    state.discovered.filter((id) => EXHIBITS_BY_ID[id]?.zone === zoneId).length >=
    minimum;

  return [
    {
      id: "first-contact",
      label: "First contact",
      description: "Open your first exhibit.",
      earned: state.discovered.length >= 1,
    },
    {
      id: "curious",
      label: "Curious",
      description: "Open five exhibits.",
      earned: state.discovered.length >= 5,
    },
    {
      id: "science-explorer",
      label: "Science explorer",
      description: "Open three Science Observatory exhibits.",
      earned: inZone("science", 3),
    },
    {
      id: "builder",
      label: "Builder",
      description: "Open three Developer District exhibits.",
      earned: inZone("developer", 3),
    },
    {
      id: "cartographer",
      label: "Cartographer",
      description: "Visit four different zones.",
      earned: state.zones.length >= 4,
    },
    {
      id: "polymath",
      label: "Polymath",
      description: "Visit every zone in the world.",
      earned: state.zones.length === 6,
    },
    {
      id: "archivist",
      label: "Archivist",
      description: "Open fifteen exhibits.",
      earned: state.discovered.length >= 15,
    },
  ];
}
