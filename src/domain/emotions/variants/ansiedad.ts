import type { EmotionVariant } from "../EmotionVariant";

export const ansiedad: EmotionVariant = {
  id: "ansiedad",
  familyId: "fear",
  name: "Ansiedad",
  shortDefinition: "Activacion anticipatoria orientada al futuro.",
  keyDifferences: {
    activationLevel: "medium",
    timeOrientation: "future",
    controlSense: "present",
  },
  bodySignature: ["inquietud", "tension muscular", "energia sin descarga"],
  mentalSignature: ["y si pasa algo", "tengo que estar preparado"],
  impulse: ["anticipar", "evitar", "controlar"],
};
