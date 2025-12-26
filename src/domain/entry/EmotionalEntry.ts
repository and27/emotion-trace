import { ContextTag } from "../context/ContextTag";
import { Emotion } from "../emotion/Emotion";
import { BodySensation } from "../sensation/BodySensation";

export interface EmotionalEntry {
  id: string;
  createdAt: number;
  emotions: Emotion[];
  contexts: ContextTag[];
  bodySensations: BodySensation[];
}
