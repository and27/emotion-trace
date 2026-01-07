import type { EmotionVariant } from "../EmotionVariant";

export const ira: EmotionVariant = {
  id: "ira",
  familyId: "anger",
  name: "Ira",
  shortDefinition: "Energia intensa que aparece cuando un limite es cruzado.",
  keyDifferences: {
    activationLevel: "high",
    timeOrientation: "immediate",
    controlSense: "fragile",
  },
  bodySignature: ["calor", "mandibula tensa", "punos cerrados"],
  mentalSignature: ["esto no es justo", "tengo que parar esto"],
  impulse: ["confrontar", "defender"],
};
