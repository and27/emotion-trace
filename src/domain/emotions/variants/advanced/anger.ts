import type { EmotionVariant } from "../../EmotionVariant";

export const contrariedad: EmotionVariant = {
  id: "contrariedad",
  familyId: "anger",
  name: "Contrariedad",
  shortDefinition: "Malestar por un obstaculo o contratiempo.",
  keyDifferences: {
    activationLevel: "medium",
    timeOrientation: "immediate",
    controlSense: "present",
  },
  bodySignature: ["tension en la mandibula", "respiracion fuerte"],
  mentalSignature: ["esto no debia pasar", "que fastidio"],
  impulse: ["reclamar", "arreglar"],
};

export const irritacion: EmotionVariant = {
  id: "irritacion",
  familyId: "anger",
  name: "Irritacion",
  shortDefinition: "Enojo leve que roza la impaciencia.",
  keyDifferences: {
    activationLevel: "medium",
    timeOrientation: "immediate",
    controlSense: "fragile",
  },
  bodySignature: ["mandibula tensa", "respiracion corta"],
  mentalSignature: ["me molesta", "ya basta"],
  impulse: ["responder", "poner limite"],
};

export const fastidio: EmotionVariant = {
  id: "fastidio",
  familyId: "anger",
  name: "Fastidio",
  shortDefinition: "Molestia por algo insistente o repetido.",
  keyDifferences: {
    activationLevel: "medium",
    timeOrientation: "immediate",
    controlSense: "present",
  },
  bodySignature: ["entrecejo fruncido", "tension en los hombros"],
  mentalSignature: ["otra vez", "me cansa"],
  impulse: ["apartarse", "parar"],
};

export const rabia: EmotionVariant = {
  id: "rabia",
  familyId: "anger",
  name: "Rabia",
  shortDefinition: "Enojo intenso con impulso de reaccion.",
  keyDifferences: {
    activationLevel: "high",
    timeOrientation: "immediate",
    controlSense: "fragile",
  },
  bodySignature: ["calor", "tension en brazos"],
  mentalSignature: ["no es justo", "quiero explotar"],
  impulse: ["confrontar", "descargar"],
};

export const furia: EmotionVariant = {
  id: "furia",
  familyId: "anger",
  name: "Furia",
  shortDefinition: "Explosividad emocional con muy poco control.",
  keyDifferences: {
    activationLevel: "very high",
    timeOrientation: "immediate",
    controlSense: "lost",
  },
  bodySignature: ["pulso fuerte", "tension total"],
  mentalSignature: ["no veo nada mas", "voy a estallar"],
  impulse: ["arremeter", "romper"],
};

export const angerVariants: EmotionVariant[] = [
  contrariedad,
  irritacion,
  fastidio,
  rabia,
  furia,
];
