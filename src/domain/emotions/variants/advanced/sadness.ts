import type { EmotionVariant } from "../../EmotionVariant";

export const anoranza: EmotionVariant = {
  id: "anoranza",
  familyId: "sadness",
  name: "Anoranza",
  shortDefinition: "Deseo suave por algo o alguien ausente.",
  keyDifferences: {
    activationLevel: "low",
    timeOrientation: "diffuse",
    controlSense: "present",
  },
  bodySignature: ["suspiro", "mirada distante"],
  mentalSignature: ["me hace falta", "recuerdo con carino"],
  impulse: ["recordar", "buscar contacto"],
};

export const congoja: EmotionVariant = {
  id: "congoja",
  familyId: "sadness",
  name: "Congoja",
  shortDefinition: "Opresion emocional que aprieta el pecho.",
  keyDifferences: {
    activationLevel: "medium",
    timeOrientation: "immediate",
    controlSense: "fragile",
  },
  bodySignature: ["pecho apretado", "respiracion corta"],
  mentalSignature: ["no puedo con esto", "me duele"],
  impulse: ["buscar consuelo", "llorar"],
};

export const desconsuelo: EmotionVariant = {
  id: "desconsuelo",
  familyId: "sadness",
  name: "Desconsuelo",
  shortDefinition: "Sensacion de no encontrar alivio.",
  keyDifferences: {
    activationLevel: "medium",
    timeOrientation: "diffuse",
    controlSense: "fragile",
  },
  bodySignature: ["cansancio", "peso en el cuerpo"],
  mentalSignature: ["nada ayuda", "no hay salida"],
  impulse: ["retirarse", "pedir apoyo"],
};

export const melancolia: EmotionVariant = {
  id: "melancolia",
  familyId: "sadness",
  name: "Melancolia",
  shortDefinition: "Tristeza lenta y reflexiva.",
  keyDifferences: {
    activationLevel: "low",
    timeOrientation: "diffuse",
    controlSense: "present",
  },
  bodySignature: ["energia baja", "movimientos lentos"],
  mentalSignature: ["todo se siente gris", "me cuesta"],
  impulse: ["pausar", "refugiarse"],
};

export const nostalgia: EmotionVariant = {
  id: "nostalgia",
  familyId: "sadness",
  name: "Nostalgia",
  shortDefinition: "Recuerdo agridulce de tiempos pasados.",
  keyDifferences: {
    activationLevel: "low",
    timeOrientation: "diffuse",
    controlSense: "present",
  },
  bodySignature: ["sonrisa suave", "pecho tibio"],
  mentalSignature: ["como antes", "que tiempos"],
  impulse: ["recordar", "conectar"],
};

export const pesadumbre: EmotionVariant = {
  id: "pesadumbre",
  familyId: "sadness",
  name: "Pesadumbre",
  shortDefinition: "Carga emocional pesada y persistente.",
  keyDifferences: {
    activationLevel: "medium",
    timeOrientation: "diffuse",
    controlSense: "fragile",
  },
  bodySignature: ["hombros caidos", "peso en la espalda"],
  mentalSignature: ["no se me quita", "me arrastra"],
  impulse: ["descansar", "aislarse"],
};

export const apatia: EmotionVariant = {
  id: "apatia",
  familyId: "sadness",
  name: "Apatia",
  shortDefinition: "Falta de interes o energia para involucrarse.",
  keyDifferences: {
    activationLevel: "low",
    timeOrientation: "diffuse",
    controlSense: "present",
  },
  bodySignature: ["energia baja", "gestos planos"],
  mentalSignature: ["me da igual", "no quiero"],
  impulse: ["no hacer nada", "evitar"],
};

export const indolencia: EmotionVariant = {
  id: "indolencia",
  familyId: "sadness",
  name: "Indolencia",
  shortDefinition: "Desgano prolongado y ausencia de motivacion.",
  keyDifferences: {
    activationLevel: "low",
    timeOrientation: "diffuse",
    controlSense: "present",
  },
  bodySignature: ["cuerpo pesado", "postura caida"],
  mentalSignature: ["para que", "no tengo ganas"],
  impulse: ["quedarse", "posponer"],
};

export const pereza: EmotionVariant = {
  id: "pereza",
  familyId: "sadness",
  name: "Pereza",
  shortDefinition: "Resistencia a la accion por baja energia.",
  keyDifferences: {
    activationLevel: "low",
    timeOrientation: "diffuse",
    controlSense: "present",
  },
  bodySignature: ["movimientos lentos", "pesadez"],
  mentalSignature: ["luego lo hago", "no ahora"],
  impulse: ["descansar", "evitar esfuerzo"],
};

export const hastio: EmotionVariant = {
  id: "hastio",
  familyId: "sadness",
  name: "Hastio",
  shortDefinition: "Cansancio por repeticion y falta de novedad.",
  keyDifferences: {
    activationLevel: "low",
    timeOrientation: "diffuse",
    controlSense: "present",
  },
  bodySignature: ["suspiro largo", "mirada perdida"],
  mentalSignature: ["otra vez lo mismo", "me aburre"],
  impulse: ["desconectarse", "buscar cambio"],
};

export const desgano: EmotionVariant = {
  id: "desgano",
  familyId: "sadness",
  name: "Desgano",
  shortDefinition: "Falta de ganas para iniciar o sostener acciones.",
  keyDifferences: {
    activationLevel: "low",
    timeOrientation: "diffuse",
    controlSense: "present",
  },
  bodySignature: ["movimientos lentos", "cuerpo pesado"],
  mentalSignature: ["no me sale", "me cuesta empezar"],
  impulse: ["posponer", "quedarse quieto"],
};

export const sadnessVariants: EmotionVariant[] = [
  anoranza,
  congoja,
  desconsuelo,
  melancolia,
  nostalgia,
  pesadumbre,
  apatia,
  indolencia,
  pereza,
  hastio,
  desgano,
];
