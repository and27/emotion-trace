import type { LearningFeedback, LearningState } from "./learningTypes";

export function applyFeedback(
  current: LearningState | undefined,
  feedback: LearningFeedback,
  now: number
): LearningState {
  const clarityScore = current?.clarityScore ?? 0;
  const seenCount = current?.seenCount ?? 0;

  const delta = feedback === "got_it" ? 1 : -1;

  return {
    clarityScore: Math.max(0, clarityScore + delta),
    seenCount: seenCount + 1,
    lastSeen: now,
  };
}
