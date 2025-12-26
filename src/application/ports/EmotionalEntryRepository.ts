import type { EmotionalEntry } from "../../domain/entry/EmotionalEntry";

export interface EmotionalEntryRepository {
  save(entry: EmotionalEntry): Promise<void>;
  list(): Promise<EmotionalEntry[]>;
}
