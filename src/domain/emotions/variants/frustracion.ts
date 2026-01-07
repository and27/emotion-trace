import type { EmotionVariant } from "../EmotionVariant";

export const frustracion: EmotionVariant = {
  id: "frustracion",
  familyId: "anger",
  name: "Frustracion",
  shortDefinition: "Irritacion cuando algo no avanza como esperabas.",
  keyDifferences: {
    activationLevel: "medium",
    timeOrientation: "immediate",
    controlSense: "present",
  },
  bodySignature: ["tension en cuello", "suspiros", "impaciencia"],
  mentalSignature: ["por que no sale", "me estoy trabando"],
  impulse: ["empujar", "reclamar"],
};
