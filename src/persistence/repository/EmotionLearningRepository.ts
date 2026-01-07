import type { LearningState, LearningStateById } from "@/src/application/learning/learningTypes";

export interface EmotionLearningRepository {
  save(emotionId: string, state: LearningState): Promise<void>;
  getById(emotionId: string): Promise<LearningState | undefined>;
  getAll(): Promise<LearningStateById>;
}
