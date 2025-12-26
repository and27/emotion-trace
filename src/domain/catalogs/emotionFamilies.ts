export const EMOTION_FAMILIES = [
  "fear",
  "sadness",
  "anger",
  "shame",
  "neutral",
  "pleasant",
] as const;

export type EmotionFamily = (typeof EMOTION_FAMILIES)[number];
