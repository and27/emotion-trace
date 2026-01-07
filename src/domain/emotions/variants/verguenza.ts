import type { EmotionVariant } from "../EmotionVariant";

export const verguenza: EmotionVariant = {
  id: "verguenza",
  familyId: "shame",
  name: "Verguenza",
  shortDefinition: "Malestar por sentirte expuesto o juzgado.",
  keyDifferences: {
    activationLevel: "medium",
    timeOrientation: "immediate",
    controlSense: "fragile",
  },
  bodySignature: ["cara caliente", "mirada baja", "tension"],
  mentalSignature: ["me estan viendo", "que pena"],
  impulse: ["esconderse", "alejarse"],
};
