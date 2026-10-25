import type { Exhibit } from "@/types/world";
import { EXHIBITS } from "./index";

export interface SearchResult {
  exhibit: Exhibit;
  score: number;
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getTokens(query: string) {
  return normalize(query)
    .split(" ")
    .filter((token) => token.length > 1);
}

function countMatches(haystack: string, token: string) {
  let count = 0;
  let index = haystack.indexOf(token);

  while (index !== -1) {
    count += 1;
    index = haystack.indexOf(token, index + token.length);
  }

  return count;
}

function getSearchText(exhibit: Exhibit) {
  return normalize(
    [
      exhibit.title,
      exhibit.subtitle,
      exhibit.eyebrow ?? "",
      exhibit.year ?? "",
      exhibit.summary,
      exhibit.tags.join(" "),
      exhibit.sections
        .map((section) => `${section.heading} ${section.body} ${(section.bullets ?? []).join(" ")}`)
        .join(" "),
      (exhibit.timeline ?? [])
        .map((event) => `${event.year} ${event.title} ${event.description}`)
        .join(" "),
    ].join(" "),
  );
}

export function searchExhibits(query: string, limit = 12): SearchResult[] {
  const tokens = getTokens(query);

  if (tokens.length === 0) {
    return [];
  }

  const results: SearchResult[] = [];

  for (const exhibit of EXHIBITS) {
    const title = normalize(`${exhibit.title} ${exhibit.subtitle}`);
    const tags = normalize(exhibit.tags.join(" "));
    const text = getSearchText(exhibit);
    let score = 0;

    for (const token of tokens) {
      if (title.includes(token)) {
        score += 12;
      }

      if (tags.includes(token)) {
        score += 7;
      }

      score += Math.min(6, countMatches(text, token) * 2);
    }

    if (score > 0) {
      results.push({ exhibit, score });
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, limit);
}

export interface GuideAnswer {
  answer: string;
  citations: Exhibit[];
  matched: boolean;
}

export function answerQuestion(query: string): GuideAnswer {
  const results = searchExhibits(query, 3);

  if (!query.trim()) {
    return {
      answer:
        "Ask about a person, a theory, an invention, or a concept. I will search the exhibits stored in this world and cite what I find.",
      citations: [],
      matched: false,
    };
  }

  if (results.length === 0) {
    return {
      answer:
        "I could not find a strong match in the local archive. Try a broader term, or browse the Directory to see every exhibit.",
      citations: [],
      matched: false,
    };
  }

  const [first, second] = results;
  const relatedText = second
    ? ` A related exhibit is “${second.exhibit.title}” in the ${second.exhibit.zone} zone.`
    : "";

  return {
    answer: `${first.exhibit.summary}${relatedText}`,
    citations: results.map((result) => result.exhibit),
    matched: true,
  };
}

export const GUIDE_SUGGESTIONS = [
  "How does a perceptron work?",
  "What did Katherine Johnson calculate?",
  "How did the internet begin?",
  "What is the Ship of Theseus?",
  "How does attention in transformers work?",
];
