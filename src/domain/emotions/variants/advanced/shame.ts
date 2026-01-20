import type { EmotionVariant } from "../../EmotionVariant";

export const bochorno: EmotionVariant = {
  id: "bochorno",
  familyId: "shame",
  name: "Bochorno",
  shortDefinition: "Verguenza breve por un error expuesto.",
  keyDifferences: {
    activationLevel: "medium",
    timeOrientation: "immediate",
    controlSense: "fragile",
  },
  bodySignature: ["cara caliente", "sudor", "sonrisa tensa"],
  mentalSignature: ["que pena", "me vieron"],
  impulse: ["disimular", "salir de ahi"],
};

export const deshonra: EmotionVariant = {
  id: "deshonra",
  familyId: "shame",
  name: "Deshonra",
  shortDefinition: "Sensacion de perdida de reputacion o dignidad.",
  keyDifferences: {
    activationLevel: "medium",
    timeOrientation: "diffuse",
    controlSense: "fragile",
  },
  bodySignature: ["hombros caidos", "pesadez"],
  mentalSignature: ["me desvalorizaron", "ya no me respetan"],
  impulse: ["retirarse", "reparar imagen"],
};

export const escarnio: EmotionVariant = {
  id: "escarnio",
  familyId: "shame",
  name: "Escarnio",
  shortDefinition: "Dolor por ser objeto de burla publica.",
  keyDifferences: {
    activationLevel: "high",
    timeOrientation: "immediate",
    controlSense: "fragile",
  },
  bodySignature: ["calor en la cara", "tension en la garganta"],
  mentalSignature: ["se estan riendo de mi", "no quiero estar aqui"],
  impulse: ["escapar", "confrontar"],
};

export const afrenta: EmotionVariant = {
  id: "afrenta",
  familyId: "shame",
  name: "Afrenta",
  shortDefinition: "Herida al honor por una ofensa directa.",
  keyDifferences: {
    activationLevel: "high",
    timeOrientation: "immediate",
    controlSense: "fragile",
  },
  bodySignature: ["mandibula tensa", "respiracion fuerte"],
  mentalSignature: ["me insultaron", "no lo acepto"],
  impulse: ["defenderse", "reclamar"],
};

export const desprecio: EmotionVariant = {
  id: "desprecio",
  familyId: "shame",
  name: "Desprecio",
  shortDefinition: "Sensacion de ser minimizado o tratado como menos.",
  keyDifferences: {
    activationLevel: "medium",
    timeOrientation: "immediate",
    controlSense: "fragile",
  },
  bodySignature: ["pecho apretado", "mirada baja"],
  mentalSignature: ["no me toman en serio", "no valgo para ellos"],
  impulse: ["retirarse", "protegerse"],
};

export const burla: EmotionVariant = {
  id: "burla",
  familyId: "shame",
  name: "Burla",
  shortDefinition: "Humillacion ligera ante comentarios sarcasticos.",
  keyDifferences: {
    activationLevel: "medium",
    timeOrientation: "immediate",
    controlSense: "fragile",
  },
  bodySignature: ["sonrisa forzada", "tension en la cara"],
  mentalSignature: ["se burlan", "me incomoda"],
  impulse: ["callar", "alejarse"],
};

export const shameVariants: EmotionVariant[] = [
  bochorno,
  deshonra,
  escarnio,
  afrenta,
  desprecio,
  burla,
];
