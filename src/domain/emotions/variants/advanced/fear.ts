import type { EmotionVariant } from "../../EmotionVariant";

export const aprension: EmotionVariant = {
  id: "aprension",
  familyId: "fear",
  name: "Aprension",
  shortDefinition: "Incomodidad anticipatoria ante algo que podria salir mal.",
  keyDifferences: {
    activationLevel: "medium",
    timeOrientation: "future",
    controlSense: "fragile",
  },
  bodySignature: ["tension en el pecho", "respiracion corta"],
  mentalSignature: ["algo no cuadra", "mejor prevenir"],
  impulse: ["anticipar", "evitar"],
};

export const desasosiego: EmotionVariant = {
  id: "desasosiego",
  familyId: "fear",
  name: "Desasosiego",
  shortDefinition: "Inquietud persistente sin causa clara.",
  keyDifferences: {
    activationLevel: "medium",
    timeOrientation: "diffuse",
    controlSense: "fragile",
  },
  bodySignature: ["inquietud en el cuerpo", "movimientos repetidos"],
  mentalSignature: ["no logro calmarme", "algo me inquieta"],
  impulse: ["moverse", "buscar alivio"],
};

export const intranquilidad: EmotionVariant = {
  id: "intranquilidad",
  familyId: "fear",
  name: "Intranquilidad",
  shortDefinition: "Sensacion de no estar en calma.",
  keyDifferences: {
    activationLevel: "low",
    timeOrientation: "diffuse",
    controlSense: "present",
  },
  bodySignature: ["respiracion superficial", "tension leve"],
  mentalSignature: ["no estoy tranquilo", "no puedo soltar"],
  impulse: ["mantenerse alerta", "revisar"],
};

export const recelo: EmotionVariant = {
  id: "recelo",
  familyId: "fear",
  name: "Recelo",
  shortDefinition: "Cautela desconfiada ante intenciones ajenas.",
  keyDifferences: {
    activationLevel: "low",
    timeOrientation: "future",
    controlSense: "present",
  },
  bodySignature: ["mirada vigilante", "cuerpo contenido"],
  mentalSignature: ["no me fio", "mejor esperar"],
  impulse: ["guardar distancia", "observar"],
};

export const apremio: EmotionVariant = {
  id: "apremio",
  familyId: "fear",
  name: "Apremio",
  shortDefinition: "Urgencia por responder a una presion inmediata.",
  keyDifferences: {
    activationLevel: "high",
    timeOrientation: "immediate",
    controlSense: "fragile",
  },
  bodySignature: ["corazon rapido", "sensacion de prisa"],
  mentalSignature: ["tengo que hacerlo ya", "no hay tiempo"],
  impulse: ["apresurarse", "resolver"],
};

export const pavor: EmotionVariant = {
  id: "pavor",
  familyId: "fear",
  name: "Pavor",
  shortDefinition: "Miedo extremo que paraliza o desborda.",
  keyDifferences: {
    activationLevel: "very high",
    timeOrientation: "immediate",
    controlSense: "lost",
  },
  bodySignature: ["temblor", "sudor frio", "bloqueo"],
  mentalSignature: ["esto es terrible", "no puedo"],
  impulse: ["huir", "protegerse"],
};

export const desconcierto: EmotionVariant = {
  id: "desconcierto",
  familyId: "fear",
  name: "Desconcierto",
  shortDefinition: "Desorientacion ante algo inesperado.",
  keyDifferences: {
    activationLevel: "medium",
    timeOrientation: "immediate",
    controlSense: "fragile",
  },
  bodySignature: ["mirada perdida", "pausa en el cuerpo"],
  mentalSignature: ["no entiendo", "que paso"],
  impulse: ["preguntar", "detenerse"],
};

export const aturdimiento: EmotionVariant = {
  id: "aturdimiento",
  familyId: "fear",
  name: "Aturdimiento",
  shortDefinition: "Sensacion de mente nublada o saturada.",
  keyDifferences: {
    activationLevel: "medium",
    timeOrientation: "immediate",
    controlSense: "fragile",
  },
  bodySignature: ["cabeza pesada", "lenta reaccion"],
  mentalSignature: ["todo me supera", "no proceso"],
  impulse: ["parar", "respirar"],
};

export const estupefaccion: EmotionVariant = {
  id: "estupefaccion",
  familyId: "fear",
  name: "Estupefaccion",
  shortDefinition: "Paralisis breve ante algo sorprendente.",
  keyDifferences: {
    activationLevel: "high",
    timeOrientation: "immediate",
    controlSense: "lost",
  },
  bodySignature: ["quedarse quieto", "ojos abiertos"],
  mentalSignature: ["no lo puedo creer", "me quedo en blanco"],
  impulse: ["quedarse inmovil", "buscar explicacion"],
};

export const intriga: EmotionVariant = {
  id: "intriga",
  familyId: "fear",
  name: "Intriga",
  shortDefinition: "Curiosidad tensa por lo desconocido.",
  keyDifferences: {
    activationLevel: "low",
    timeOrientation: "future",
    controlSense: "present",
  },
  bodySignature: ["atencion enfocada", "respiracion contenida"],
  mentalSignature: ["que sera", "quiero saber"],
  impulse: ["investigar", "acercarse"],
};

export const fearVariants: EmotionVariant[] = [
  aprension,
  desasosiego,
  intranquilidad,
  recelo,
  apremio,
  pavor,
  desconcierto,
  aturdimiento,
  estupefaccion,
  intriga,
];
