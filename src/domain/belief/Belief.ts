import type { BeliefCategoryId } from "./BeliefCategory";

export interface Belief {
  id: string;
  label: string;
  category: BeliefCategoryId;
  valence: "negative" | "positive";
}
