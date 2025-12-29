export type ContextCategory =
  | "work_performance"
  | "relationships"
  | "self_care_body"
  | "environment"
  | "leisure";

export interface ContextTag {
  id: string;
  label: string;
  category: ContextCategory;
}
