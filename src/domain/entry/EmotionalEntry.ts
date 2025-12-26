import { ContextTag } from "../context/ContextTag";
import { Emotion } from "../emotion/Emotion";

export interface EmotionalEntry {
  id: string;
  createdAt: number;
  emotions: Emotion[];
  contexts: ContextTag[];
}
