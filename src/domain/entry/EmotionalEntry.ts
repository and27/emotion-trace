import { ContextTag } from "../context/ContextTag";
import { Emotion } from "../emotion/Emotion";
import { BodyArea } from "../sensation/BodyArea";
import { BodySensation } from "../sensation/BodySensation";
import { Sensation } from "../sensation/Sensation";

export interface EmotionalEntry {
  id: string;
  createdAt: number;
  emotions: Emotion[];
  contexts: ContextTag[];
  bodySensations: BodySensation[];
}
