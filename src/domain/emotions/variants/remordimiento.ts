import type { EmotionVariant } from "../EmotionVariant";

export const remordimiento: EmotionVariant = {
  id: "remordimiento",
  familyId: "guilt",
  name: "Remordimiento",
  shortDefinition: "Insistencia mental sobre un error pasado.",
  keyDifferences: {
    activationLevel: "low",
    timeOrientation: "diffuse",
    controlSense: "fragile",
  },
  bodySignature: ["tension interna", "pecho apretado"],
  mentalSignature: ["no dejo de pensar", "ojala pudiera deshacerlo"],
  impulse: ["arreglar", "confesar"],
};
