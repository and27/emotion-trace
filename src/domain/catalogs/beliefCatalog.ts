import type { Belief } from "./Belief";

export const beliefCatalog: Belief[] = [
  { id: "capable", statement: "I can handle this.", categoryId: "self" },
  { id: "unsafe", statement: "The world is unsafe.", categoryId: "world" },
  { id: "hope", statement: "The future can improve.", categoryId: "future" },
];