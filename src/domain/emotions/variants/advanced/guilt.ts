import type { EmotionVariant } from "../../EmotionVariant";

export const turbacion: EmotionVariant = {
  id: "turbacion",
  familyId: "guilt",
  name: "Turbacion",
  shortDefinition: "Agitacion interna por conflicto moral.",
  keyDifferences: {
    activationLevel: "medium",
    timeOrientation: "diffuse",
    controlSense: "fragile",
  },
  bodySignature: ["nudo en el estomago", "respiracion contenida"],
  mentalSignature: ["algo no esta bien", "tengo que aclararlo"],
  impulse: ["reparar", "explicarse"],
};

export const arrepentimiento: EmotionVariant = {
  id: "arrepentimiento",
  familyId: "guilt",
  name: "Arrepentimiento",
  shortDefinition: "Dolor por una decision pasada que se quisiera cambiar.",
  keyDifferences: {
    activationLevel: "medium",
    timeOrientation: "diffuse",
    controlSense: "fragile",
  },
  bodySignature: ["peso en el pecho", "suspiro frecuente"],
  mentalSignature: ["no debi hacerlo", "ojala pudiera volver"],
  impulse: ["reparar", "pedir perdon"],
};

export const guiltVariants: EmotionVariant[] = [turbacion, arrepentimiento];
