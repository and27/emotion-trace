import type { EmotionVariant } from "../EmotionVariant";

export const serenidad: EmotionVariant = {
  id: "serenidad",
  familyId: "calm",
  name: "Serenidad",
  shortDefinition: "Tranquilidad estable y clara.",
  keyDifferences: {
    activationLevel: "low",
    timeOrientation: "diffuse",
    controlSense: "present",
  },
  bodySignature: ["respiracion amplia", "mente despejada"],
  mentalSignature: ["todo fluye", "no hay prisa"],
  impulse: ["contemplar", "seguir"],
};
