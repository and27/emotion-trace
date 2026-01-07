import Dexie, { Table } from "dexie";
import type {
  LearningState,
  LearningStateById,
} from "@/src/application/learning/learningTypes";
import { EmotionLearningRepository } from "../repository/EmotionLearningRepository";

interface EmotionLearningRecord extends LearningState {
  id: string;
}

class EmotionLearningDatabase extends Dexie {
  learning!: Table<EmotionLearningRecord, string>;

  constructor() {
    super("EmotionLearningDB");

    this.version(1).stores({
      learning: "id, lastSeen, clarityScore",
    });
  }
}

export class DexieEmotionLearningRepository
  implements EmotionLearningRepository
{
  private db: EmotionLearningDatabase;

  constructor(db?: EmotionLearningDatabase) {
    this.db = db ?? new EmotionLearningDatabase();
  }

  async save(emotionId: string, state: LearningState): Promise<void> {
    await this.db.learning.put({ id: emotionId, ...state });
  }

  async getById(emotionId: string): Promise<LearningState | undefined> {
    const record = await this.db.learning.get(emotionId);
    if (!record) {
      return undefined;
    }

    const { id: _id, ...state } = record;
    return state;
  }

  async getAll(): Promise<LearningStateById> {
    const records = await this.db.learning.toArray();

    return records.reduce<LearningStateById>((acc, record) => {
      const { id, ...state } = record;
      acc[id] = state;
      return acc;
    }, {});
  }
}
