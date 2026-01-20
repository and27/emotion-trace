import type { EmotionVariant } from "../../EmotionVariant";

export const sosiego: EmotionVariant = {
  id: "sosiego",
  familyId: "calm",
  name: "Sosiego",
  shortDefinition: "Calma suave con sensacion de respiro.",
  keyDifferences: {
    activationLevel: "low",
    timeOrientation: "diffuse",
    controlSense: "present",
  },
  bodySignature: ["respiracion lenta", "hombros relajados"],
  mentalSignature: ["todo esta bien", "puedo soltar"],
  impulse: ["descansar", "confiar"],
};

export const alivio: EmotionVariant = {
  id: "alivio",
  familyId: "calm",
  name: "Alivio",
  shortDefinition: "Liberacion despues de tension o esfuerzo.",
  keyDifferences: {
    activationLevel: "medium",
    timeOrientation: "immediate",
    controlSense: "present",
  },
  bodySignature: ["exhalacion larga", "cuerpo aflojado"],
  mentalSignature: ["por fin paso", "ya termino"],
  impulse: ["descansar", "agradecer"],
};

export const desahogo: EmotionVariant = {
  id: "desahogo",
  familyId: "calm",
  name: "Desahogo",
  shortDefinition: "Soltar la carga emocional acumulada.",
  keyDifferences: {
    activationLevel: "medium",
    timeOrientation: "immediate",
    controlSense: "present",
  },
  bodySignature: ["llanto liberador", "respiracion profunda"],
  mentalSignature: ["necesitaba sacarlo", "me siento mas liviano"],
  impulse: ["expresar", "compartir"],
};

export const consuelo: EmotionVariant = {
  id: "consuelo",
  familyId: "calm",
  name: "Consuelo",
  shortDefinition: "Calma que llega al sentirse acompanado.",
  keyDifferences: {
    activationLevel: "low",
    timeOrientation: "diffuse",
    controlSense: "present",
  },
  bodySignature: ["calor en el pecho", "respiracion calma"],
  mentalSignature: ["no estoy solo", "me sostiene"],
  impulse: ["acercarse", "agradecer"],
};

export const calmVariants: EmotionVariant[] = [
  sosiego,
  alivio,
  desahogo,
  consuelo,
];
