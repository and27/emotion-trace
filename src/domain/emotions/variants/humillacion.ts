import type { EmotionVariant } from "../EmotionVariant";

export const humillacion: EmotionVariant = {
  id: "humillacion",
  familyId: "shame",
  name: "Humillacion",
  shortDefinition: "Sensacion de inferioridad tras un juicio externo.",
  keyDifferences: {
    activationLevel: "high",
    timeOrientation: "immediate",
    controlSense: "lost",
  },
  bodySignature: ["calor", "estomago cerrado"],
  mentalSignature: ["me hicieron quedar mal", "no valgo"],
  impulse: ["retirarse", "romper contacto"],
};
