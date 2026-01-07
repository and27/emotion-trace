import type { EmotionVariant } from "../EmotionVariant";

export const culpa: EmotionVariant = {
  id: "culpa",
  familyId: "guilt",
  name: "Culpa",
  shortDefinition: "Incomodidad por sentir que causaste daño.",
  keyDifferences: {
    activationLevel: "medium",
    timeOrientation: "diffuse",
    controlSense: "present",
  },
  bodySignature: ["peso en el pecho", "suspiros"],
  mentalSignature: ["debia haberlo hecho mejor", "fue mi culpa"],
  impulse: ["reparar", "pedir perdon"],
};
