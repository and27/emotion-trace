import { describe, it, expect } from "vitest";
import { selectNextEmotion } from "./selectNextEmotion";
import type { EmotionVariant } from "@/src/domain/emotions/EmotionVariant";
import type { LearningStateById } from "./learningTypes";

describe("selectNextEmotion", () => {
  const variants: EmotionVariant[] = [
    {
      id: "joy-quiet",
      familyId: "joy",
      name: "Quiet Joy",
      shortDefinition: "A gentle lift in mood.",
      keyDifferences: {
        activationLevel: "low",
        timeOrientation: "diffuse",
        controlSense: "present",
      },
      bodySignature: [],
      mentalSignature: [],
      impulse: [],
    },
    {
      id: "sadness-soft",
      familyId: "sadness",
      name: "Soft Sadness",
      shortDefinition: "A slow reflective dip.",
      keyDifferences: {
        activationLevel: "low",
        timeOrientation: "diffuse",
        controlSense: "present",
      },
      bodySignature: [],
      mentalSignature: [],
      impulse: [],
    },
  ];

  it("prefers lower clarity scores when weights dominate", () => {
    const state: LearningStateById = {
      "joy-quiet": { clarityScore: 0, seenCount: 0, lastSeen: null },
      "sadness-soft": { clarityScore: 3, seenCount: 2, lastSeen: null },
    };

    const picked = selectNextEmotion(variants, state, {
      now: 1000,
      cooldownMs: 1000,
      rng: () => 0.1,
    });

    expect(picked.id).toBe("joy-quiet");
  });

  it("penalizes very recent cards", () => {
    const now = 10000;
    const state: LearningStateById = {
      "joy-quiet": { clarityScore: 0, seenCount: 0, lastSeen: now },
      "sadness-soft": { clarityScore: 0, seenCount: 0, lastSeen: now - 1000 },
    };

    const picked = selectNextEmotion(variants, state, {
      now,
      cooldownMs: 1000,
      rng: () => 0.5,
    });

    expect(picked.id).toBe("sadness-soft");
  });
});
