export type BeliefCategoryId =
  | "self_worth"
  | "responsibility"
  | "safety"
  | "control";

export interface BeliefCategory {
  id: BeliefCategoryId;
  label: string;
}
