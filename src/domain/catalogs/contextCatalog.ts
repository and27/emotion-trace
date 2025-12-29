import type { ContextTag } from "../context/ContextTag";

export const CONTEXT_TAGS: ContextTag[] = [
  // Work / performance
  { id: "work", label: "Work", category: "work_performance" },
  { id: "study", label: "Study", category: "work_performance" },
  { id: "money", label: "Money", category: "work_performance" },
  { id: "career", label: "Career", category: "work_performance" },
  { id: "performance", label: "Performance", category: "work_performance" },
  { id: "success", label: "Success", category: "work_performance" },

  // Relationships
  { id: "family", label: "Family", category: "relationships" },
  { id: "friends", label: "Friends", category: "relationships" },
  { id: "partner", label: "Partner", category: "relationships" },
  { id: "social", label: "Social", category: "relationships" },
  { id: "loneliness", label: "Loneliness", category: "relationships" },

  // Self care / body
  { id: "health", label: "Health", category: "self_care_body" },
  { id: "sleep", label: "Sleep", category: "self_care_body" },
  { id: "exercise", label: "Exercise", category: "self_care_body" },
  { id: "self_care", label: "Self care", category: "self_care_body" },
  { id: "food", label: "Food", category: "self_care_body" },

  // Environment
  { id: "social_media", label: "Social media", category: "environment" },
  { id: "news", label: "News", category: "environment" },
  { id: "weather", label: "Weather", category: "environment" },
  { id: "noise", label: "Noise", category: "environment" },
  { id: "clutter", label: "Clutter", category: "environment" },

  // Leisure
  { id: "music", label: "Music", category: "leisure" },
  { id: "movies", label: "Movies", category: "leisure" },
  { id: "hobbies", label: "Hobbies", category: "leisure" },
  { id: "reading", label: "Reading", category: "leisure" },
  { id: "travel", label: "Travel", category: "leisure" },
];
