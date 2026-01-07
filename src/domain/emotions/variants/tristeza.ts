import type { EmotionVariant } from "../EmotionVariant";

export const tristeza: EmotionVariant = {
  id: "tristeza",
  familyId: "sadness",
  name: "Tristeza",
  shortDefinition: "Baja energia emocional ante una perdida.",
  keyDifferences: {
    activationLevel: "low",
    timeOrientation: "diffuse",
    controlSense: "present",
  },
  bodySignature: ["pesadez", "lagrimas", "cansancio"],
  mentalSignature: ["me duele", "extraño"],
  impulse: ["retirarse", "buscar consuelo"],
};
