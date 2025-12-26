import type { Belief } from "../belief/Belief";

export const BELIEFS: Belief[] = [
  // Self-worth
  { id: "not_enough", label: "No soy suficiente", category: "self_worth" },
  { id: "defective", label: "Soy defectuoso", category: "self_worth" },
  { id: "unlovable", label: "No merezco amor", category: "self_worth" },
  { id: "something_wrong", label: "Hay algo mal en mi", category: "self_worth" },

  // Responsibility
  { id: "my_fault", label: "Todo es mi culpa", category: "responsibility" },
  {
    id: "should_have_done_more",
    label: "Debi haberlo hecho mejor",
    category: "responsibility",
  },
  {
    id: "always_mess_up",
    label: "Siempre me equivoco",
    category: "responsibility",
  },

  // Safety
  { id: "not_safe", label: "No estoy a salvo", category: "safety" },
  {
    id: "cannot_trust",
    label: "No puedo confiar en nadie",
    category: "safety",
  },
  { id: "something_bad", label: "Algo malo va a pasar", category: "safety" },

  // Control
  { id: "no_control", label: "No tengo control", category: "control" },
  { id: "no_options", label: "No tengo opciones", category: "control" },
  { id: "cannot_handle", label: "No puedo con esto", category: "control" },
  {
    id: "must_be_perfect",
    label: "Tengo que ser perfecto",
    category: "control",
  },
];