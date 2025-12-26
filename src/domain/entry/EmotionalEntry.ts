import { ContextTag } from "../context/ContextTag";
import { Emotion } from "../emotion/Emotion";
import { Belief } from "../belief/Belief";
import { BodySensation } from "../sensation/BodySensation";

export interface EmotionalEntry {
  id: string;
  createdAt: number;
  emotions: Emotion[];
  beliefs: Belief[];
  contexts: ContextTag[];
  contextNote?: string;
  bodySensations: BodySensation[];
}
