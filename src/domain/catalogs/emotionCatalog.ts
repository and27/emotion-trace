import { ArousalLevel } from "./arousal";
import { EmotionFamily } from "./emotionFamilies";

export type Emotion = {
  id: string;
  label: string;
  family: EmotionFamily;
  arousal: ArousalLevel;
};

export const EMOTIONS: Emotion[] = [
  // Fear / high
  { id: "anxiety", label: "Anxiety", family: "fear", arousal: "high" },
  { id: "fear", label: "Fear", family: "fear", arousal: "high" },
  { id: "panic", label: "Panic", family: "fear", arousal: "high" },
  { id: "unease", label: "Unease", family: "fear", arousal: "low" },

  // Sadness / low
  { id: "sadness", label: "Sadness", family: "sadness", arousal: "low" },
  { id: "emptiness", label: "Emptiness", family: "sadness", arousal: "low" },
  { id: "loneliness", label: "Loneliness", family: "sadness", arousal: "low" },
  { id: "nostalgia", label: "Nostalgia", family: "sadness", arousal: "low" },

  // Anger / high
  { id: "anger", label: "Anger", family: "anger", arousal: "high" },
  { id: "irritation", label: "Irritation", family: "anger", arousal: "high" },
  { id: "frustration", label: "Frustration", family: "anger", arousal: "high" },

  // Shame
  { id: "shame", label: "Shame", family: "shame", arousal: "high" },
  { id: "guilt", label: "Guilt", family: "shame", arousal: "high" },
  { id: "humiliation", label: "Humiliation", family: "shame", arousal: "high" },

  // Neutral / regulation
  { id: "neutral", label: "Neutral", family: "neutral", arousal: "low" },
  { id: "calm", label: "Calm", family: "neutral", arousal: "low" },
  { id: "relief", label: "Relief", family: "neutral", arousal: "low" },

  // Pleasant
  { id: "joy", label: "Joy", family: "pleasant", arousal: "high" },
  {
    id: "enthusiasm",
    label: "Enthusiasm",
    family: "pleasant",
    arousal: "high",
  },
  { id: "gratitude", label: "Gratitude", family: "pleasant", arousal: "low" },
  { id: "hope", label: "Hope", family: "pleasant", arousal: "low" },
];
