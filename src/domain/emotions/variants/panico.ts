import type { EmotionVariant } from "../EmotionVariant";

export const panico: EmotionVariant = {
  id: "panico",
  familyId: "fear",
  name: "Panico",
  shortDefinition: "Alarma intensa ante amenaza percibida como inmediata.",
  keyDifferences: {
    activationLevel: "very high",
    timeOrientation: "immediate",
    controlSense: "lost",
  },
  bodySignature: ["corazon acelerado", "temblor", "respiracion corta"],
  mentalSignature: ["no puedo", "me pasa algo"],
  impulse: ["huir", "buscar ayuda"],
};
