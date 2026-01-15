import type { ActivationLevel } from "../../domain/entry/ActivationLevel";
import type { EmotionalEntry } from "../../domain/entry/EmotionalEntry";
import type { Belief } from "../../domain/belief/Belief";
import type { ContextTag } from "../../domain/context/ContextTag";
import type { Emotion } from "../../domain/emotions/checkin/Emotion";
import type { BodySensation } from "../../domain/sensation/BodySensation";

type SimilarityInput = {
  activationLevel: ActivationLevel;
  episode: string;
  contextNote: string;
  contexts: ContextTag[];
  emotions: Emotion[];
  beliefs: Belief[];
  bodySensations: BodySensation[];
};

type SuggestionOptions = {
  now: number;
  windowDays: number;
  threshold: number;
  dismissedIds?: string[];
  query?: string;
  onDebug?: (payload: SimilarityDebugPayload) => void;
};

export type EntrySuggestion = {
  entryId: string;
  label: string;
  score: number;
};

type SimilarityDebugItem = {
  entryId: string;
  label: string;
  score: number;
  textScore: number;
  contextScore: number;
  emotionScore: number;
  beliefScore: number;
  bodyScore: number;
  activationScore: number;
  queryBoost: number;
  createdAt: number;
};

type SimilarityDebugPayload = {
  now: number;
  windowDays: number;
  threshold: number;
  query: string;
  considered: SimilarityDebugItem[];
};

const MAX_LABEL_LENGTH = 80;

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(value: string) {
  const normalized = normalizeText(value);
  if (!normalized) {
    return [];
  }
  return normalized.split(" ");
}

function jaccard(a: Set<string>, b: Set<string>) {
  if (a.size === 0 || b.size === 0) {
    return 0;
  }
  let intersection = 0;
  for (const item of a) {
    if (b.has(item)) {
      intersection += 1;
    }
  }
  return intersection / (a.size + b.size - intersection);
}

function labelForEntry(entry: EmotionalEntry) {
  const episode = entry.episode?.trim();
  if (episode) {
    return episode;
  }
  const contextNote = entry.contextNote?.trim();
  if (contextNote) {
    return contextNote;
  }
  if (entry.contexts[0]?.label) {
    return entry.contexts[0].label;
  }
  if (entry.emotions[0]?.label) {
    return entry.emotions[0].label;
  }
  if (entry.beliefs[0]?.label) {
    return entry.beliefs[0].label;
  }
  if (entry.bodySensations[0]) {
    return `${entry.bodySensations[0].bodyArea} ${entry.bodySensations[0].sensation}`;
  }
  return "";
}

function truncateLabel(value: string) {
  if (value.length <= MAX_LABEL_LENGTH) {
    return value;
  }
  return value.slice(0, MAX_LABEL_LENGTH - 3).trimEnd() + "...";
}

function textTokensFromEntry(entry: EmotionalEntry) {
  return tokenize([entry.episode, entry.contextNote].filter(Boolean).join(" "));
}

function textTokensFromInput(input: SimilarityInput) {
  return tokenize([input.episode, input.contextNote].filter(Boolean).join(" "));
}

export function findEntrySuggestion(
  entries: EmotionalEntry[],
  input: SimilarityInput,
  options: SuggestionOptions
): EntrySuggestion | null {
  const dismissed = new Set(options.dismissedIds ?? []);
  const windowMs = options.windowDays * 24 * 60 * 60 * 1000;
  const query = normalizeText(options.query ?? "");

  const inputTextTokens = new Set(textTokensFromInput(input));
  const inputContexts = new Set(input.contexts.map((context) => context.id));
  const inputEmotions = new Set(input.emotions.map((emotion) => emotion.id));
  const inputBeliefs = new Set(input.beliefs.map((belief) => belief.id));
  const inputBody = new Set(
    input.bodySensations.map(
      (sensation) => `${sensation.bodyArea}:${sensation.sensation}`
    )
  );

  const scored = entries
    .filter((entry) => {
      if (dismissed.has(entry.id)) {
        return false;
      }
      return options.now - entry.createdAt <= windowMs;
    })
    .map((entry) => {
      const label = labelForEntry(entry);
      const displayLabel = truncateLabel(label);
      const labelNormalized = normalizeText(displayLabel);
      const entryTextTokens = new Set(textTokensFromEntry(entry));

      const textScore = jaccard(inputTextTokens, entryTextTokens);
      const contextScore = jaccard(
        inputContexts,
        new Set(entry.contexts.map((context) => context.id))
      );
      const emotionScore = jaccard(
        inputEmotions,
        new Set(entry.emotions.map((emotion) => emotion.id))
      );
      const beliefScore = jaccard(
        inputBeliefs,
        new Set(entry.beliefs.map((belief) => belief.id))
      );
      const bodyScore = jaccard(
        inputBody,
        new Set(
          entry.bodySensations.map(
            (sensation) => `${sensation.bodyArea}:${sensation.sensation}`
          )
        )
      );
      const activationDiff = Math.abs(
        input.activationLevel - entry.activationLevel
      );
      const activationScore = Math.max(0, 1 - activationDiff / 2);

      const baseScore =
        textScore * 0.4 +
        contextScore * 0.2 +
        emotionScore * 0.15 +
        beliefScore * 0.1 +
        bodyScore * 0.1 +
        activationScore * 0.05;
      const queryBoost = query && labelNormalized.includes(query) ? 0.45 : 0;
      const score = Math.min(1, baseScore + queryBoost);

      return {
        entry,
        label,
        displayLabel,
        labelNormalized,
        textScore,
        contextScore,
        emotionScore,
        beliefScore,
        bodyScore,
        activationScore,
        queryBoost,
        score,
      };
    })
    .filter((item) => item.label.length > 0)
    .filter((item) => {
      if (!query) {
        return true;
      }
      return item.labelNormalized.includes(query);
    })
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return b.entry.createdAt - a.entry.createdAt;
    });

  if (options.onDebug) {
    options.onDebug({
      now: options.now,
      windowDays: options.windowDays,
      threshold: options.threshold,
      query,
      considered: scored.slice(0, 5).map((item) => ({
        entryId: item.entry.id,
        label: item.displayLabel,
        score: item.score,
        textScore: item.textScore,
        contextScore: item.contextScore,
        emotionScore: item.emotionScore,
        beliefScore: item.beliefScore,
        bodyScore: item.bodyScore,
        activationScore: item.activationScore,
        queryBoost: item.queryBoost,
        createdAt: item.entry.createdAt,
      })),
    });
  }

  const best = scored[0];
  if (!best || best.score < options.threshold) {
    if (!best || !query || !best.labelNormalized.includes(query)) {
      return null;
    }
  }
  if (query && best.labelNormalized === query) {
    return null;
  }

  return {
    entryId: best.entry.id,
    label: best.displayLabel,
    score: best.score,
  };
}
