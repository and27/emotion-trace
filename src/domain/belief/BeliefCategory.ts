export type BeliefCategoryId = "self" | "world" | "future";

export interface BeliefCategory {
  id: BeliefCategoryId;
  label: string;
}