import type { BeliefCategoryId } from "./BeliefCategory";

export interface Belief {
  id: string;
  statement: string;
  categoryId: BeliefCategoryId;
}