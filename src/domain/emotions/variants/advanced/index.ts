import type { EmotionVariant } from "../../EmotionVariant";
import { angerVariants } from "./anger";
import { calmVariants } from "./calm";
import { fearVariants } from "./fear";
import { guiltVariants } from "./guilt";
import { sadnessVariants } from "./sadness";
import { shameVariants } from "./shame";

export const advancedEmotionVariants: EmotionVariant[] = [
  ...fearVariants,
  ...guiltVariants,
  ...shameVariants,
  ...sadnessVariants,
  ...angerVariants,
  ...calmVariants,
];

export * from "./anger";
export * from "./calm";
export * from "./fear";
export * from "./guilt";
export * from "./sadness";
export * from "./shame";
