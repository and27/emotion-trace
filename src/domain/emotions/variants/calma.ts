import type { EmotionVariant } from "../EmotionVariant";

export const calma: EmotionVariant = {
  id: "calma",
  familyId: "calm",
  name: "Calma",
  shortDefinition: "Sensacion de seguridad y quietud.",
  keyDifferences: {
    activationLevel: "low",
    timeOrientation: "diffuse",
    controlSense: "present",
  },
  bodySignature: ["respiracion lenta", "musculos sueltos"],
  mentalSignature: ["todo esta bien", "puedo soltar"],
  impulse: ["descansar", "permanecer"],
};
