import type { EmotionalEntry } from "../../domain/entry/EmotionalEntry";
import type { EmotionalEntryRepository } from "../../application/ports/EmotionalEntryRepository";

export class EmotionalEntryDexieRepository implements EmotionalEntryRepository {
  async save(_entry: EmotionalEntry): Promise<void> {
    throw new Error("EmotionalEntryDexieRepository not implemented.");
  }

  async list(): Promise<EmotionalEntry[]> {
    return [];
  }
}