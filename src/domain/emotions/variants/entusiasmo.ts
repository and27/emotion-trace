import type { EmotionVariant } from "../EmotionVariant";

export const entusiasmo: EmotionVariant = {
  id: "entusiasmo",
  familyId: "joy",
  name: "Entusiasmo",
  shortDefinition: "Impulso alegre por algo que viene.",
  keyDifferences: {
    activationLevel: "very high",
    timeOrientation: "future",
    controlSense: "present",
  },
  bodySignature: ["energia alta", "movimiento rapido"],
  mentalSignature: ["quiero hacerlo ya", "esto va a estar genial"],
  impulse: ["iniciar", "compartir"],
};
