import { EmotionalEntry } from "../../domain/entry/EmotionalEntry";

export interface EmotionalEntryRepository {
  save(entry: EmotionalEntry): Promise<void>;
  getAll(): Promise<EmotionalEntry[]>;
}
