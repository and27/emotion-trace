import type { EmotionVariant } from "../EmotionVariant";

export const duelo: EmotionVariant = {
  id: "duelo",
  familyId: "sadness",
  name: "Duelo",
  shortDefinition: "Procesamiento profundo de una perdida significativa.",
  keyDifferences: {
    activationLevel: "low",
    timeOrientation: "diffuse",
    controlSense: "fragile",
  },
  bodySignature: ["nudo en la garganta", "pecho pesado"],
  mentalSignature: ["no era asi", "no termino de aceptar"],
  impulse: ["recordar", "honrar"],
};
