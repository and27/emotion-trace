export type EmotionCategoryId = "positive" | "negative" | "neutral";

export interface EmotionCategory {
  id: EmotionCategoryId;
  label: string;
}