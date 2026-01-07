import type { EmotionFamilyId } from "./EmotionFamily";

export interface EmotionVariant {
  id: string;
  familyId: EmotionFamilyId;
  name: string;
  shortDefinition: string;
  keyDifferences: {
    activationLevel: "very high" | "high" | "medium" | "low";
    timeOrientation: "immediate" | "future" | "diffuse";
    controlSense: "lost" | "fragile" | "present";
  };
  bodySignature: string[];
  mentalSignature: string[];
  impulse: string[];
}
