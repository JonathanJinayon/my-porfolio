import {
  CHAT_FALLBACK,
  CHAT_RULES,
  CHAT_WELCOME,
  type ChatAnswer,
  type ChatRule,
} from "./knowledge";

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(value: string) {
  return normalize(value)
    .split(" ")
    .filter((token) => token.length > 0);
}

function scoreRule(rule: ChatRule, query: string, tokens: string[]) {
  let score = 0;

  for (const phrase of rule.phrases ?? []) {
    const normalizedPhrase = normalize(phrase);

    if (normalizedPhrase && query.includes(normalizedPhrase)) {
      score += 10;
    }
  }

  for (const keyword of rule.keywords) {
    const normalizedKeyword = normalize(keyword);

    if (!normalizedKeyword) {
      continue;
    }

    if (normalizedKeyword.includes(" ")) {
      if (query.includes(normalizedKeyword)) {
        score += 6;
      }
    } else if (tokens.includes(normalizedKeyword)) {
      score += 3;
    }
  }

  return score * (rule.weight ?? 1);
}

export function answerPortfolioQuestion(input: string): ChatAnswer {
  const query = normalize(input);

  if (!query) {
    return CHAT_WELCOME;
  }

  const tokens = tokenize(query);
  let bestRule: ChatRule | null = null;
  let bestScore = 0;

  for (const rule of CHAT_RULES) {
    const score = scoreRule(rule, query, tokens);

    if (score > bestScore) {
      bestScore = score;
      bestRule = rule;
    }
  }

  if (!bestRule || bestScore <= 0) {
    return CHAT_FALLBACK;
  }

  return bestRule.answer();
}
