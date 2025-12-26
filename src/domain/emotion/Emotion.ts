import { ArousalLevel } from "../catalogs/arousal";
import { EmotionFamily } from "../catalogs/emotionFamilies";

export type Emotion = {
  id: string;
  label: string;
  family: EmotionFamily;
  arousal: ArousalLevel;
};
