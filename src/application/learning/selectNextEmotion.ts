import type { EmotionVariant } from "@/src/domain/emotions/EmotionVariant";
import type {
  LearningSelectionOptions,
  LearningStateById,
} from "./learningTypes";

const DEFAULT_COOLDOWN_MS = 60 * 60 * 1000;

export function selectNextEmotion(
  emotions: EmotionVariant[],
  stateById: LearningStateById,
  options: LearningSelectionOptions = {}
): EmotionVariant {
  if (emotions.length === 0) {
    throw new Error("No emotions available to select from.");
  }

  const now = options.now ?? Date.now();
  const cooldownMs = options.cooldownMs ?? DEFAULT_COOLDOWN_MS;
  const rng = options.rng ?? Math.random;

  const weights = emotions.map((emotion) => {
    const state = stateById[emotion.id];
    const clarityScore = state?.clarityScore ?? 0;
    const lastSeen = state?.lastSeen ?? null;

    const baseWeight = 1 / (clarityScore + 1);

    if (lastSeen === null) {
      return baseWeight;
    }

    const ageMs = Math.max(0, now - lastSeen);
    const normalized = Math.min(ageMs / cooldownMs, 1);
    const recencyMultiplier = 0.4 + 0.6 * normalized;

    return baseWeight * recencyMultiplier;
  });

  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);

  if (totalWeight <= 0) {
    return emotions[0];
  }

  const pick = rng() * totalWeight;
  let cumulative = 0;

  for (let i = 0; i < emotions.length; i += 1) {
    cumulative += weights[i];
    if (pick <= cumulative) {
      return emotions[i];
    }
  }

  return emotions[emotions.length - 1];
}
