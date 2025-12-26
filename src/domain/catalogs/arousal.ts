export const AROUSAL_LEVELS = ["low", "high"] as const;

export type ArousalLevel = (typeof AROUSAL_LEVELS)[number];
