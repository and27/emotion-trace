export type LearningFeedback = "got_it" | "not_clear";

export type LearningState = {
  clarityScore: number;
  seenCount: number;
  lastSeen: number | null;
};

export type LearningStateById = Record<string, LearningState>;

export type LearningSelectionOptions = {
  now?: number;
  cooldownMs?: number;
  rng?: () => number;
};
