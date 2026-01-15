import type { Belief } from "../belief/Belief";

export const BELIEFS: Belief[] = [
  // Self-worth
  {
    id: "not_enough",
    label: "No soy suficiente",
    category: "self_worth",
    valence: "negative",
  },
  {
    id: "defective",
    label: "Soy defectuoso",
    category: "self_worth",
    valence: "negative",
  },
  {
    id: "unlovable",
    label: "No merezco amor",
    category: "self_worth",
    valence: "negative",
  },
  {
    id: "something_wrong",
    label: "Hay algo mal en mi",
    category: "self_worth",
    valence: "negative",
  },
  {
    id: "worthy",
    label: "Tengo valor",
    category: "self_worth",
    valence: "positive",
  },
  {
    id: "deserving_love",
    label: "Merezco amor",
    category: "self_worth",
    valence: "positive",
  },

  // Responsibility
  {
    id: "my_fault",
    label: "Todo es mi culpa",
    category: "responsibility",
    valence: "negative",
  },
  {
    id: "should_have_done_more",
    label: "Debi haberlo hecho mejor",
    category: "responsibility",
    valence: "negative",
  },
  {
    id: "always_mess_up",
    label: "Siempre me equivoco",
    category: "responsibility",
    valence: "negative",
  },
  {
    id: "did_my_best",
    label: "Hice lo mejor que pude",
    category: "responsibility",
    valence: "positive",
  },
  {
    id: "can_learn",
    label: "Puedo aprender de esto",
    category: "responsibility",
    valence: "positive",
  },

  // Safety
  {
    id: "not_safe",
    label: "No estoy a salvo",
    category: "safety",
    valence: "negative",
  },
  {
    id: "cannot_trust",
    label: "No puedo confiar en nadie",
    category: "safety",
    valence: "negative",
  },
  {
    id: "something_bad",
    label: "Algo malo va a pasar",
    category: "safety",
    valence: "negative",
  },
  {
    id: "safe_now",
    label: "Estoy a salvo",
    category: "safety",
    valence: "positive",
  },
  {
    id: "can_trust",
    label: "Puedo confiar en gente cercana",
    category: "safety",
    valence: "positive",
  },

  // Control
  {
    id: "no_control",
    label: "No tengo control",
    category: "control",
    valence: "negative",
  },
  {
    id: "no_options",
    label: "No tengo opciones",
    category: "control",
    valence: "negative",
  },
  {
    id: "cannot_handle",
    label: "No puedo con esto",
    category: "control",
    valence: "negative",
  },
  {
    id: "must_be_perfect",
    label: "Tengo que ser perfecto",
    category: "control",
    valence: "negative",
  },
  {
    id: "have_options",
    label: "Tengo opciones",
    category: "control",
    valence: "positive",
  },
  {
    id: "can_handle",
    label: "Puedo con esto",
    category: "control",
    valence: "positive",
  },
];
