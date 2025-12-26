import { EmotionalEntry } from "../../domain/entry/EmotionalEntry";
import { EmotionalEntryRepository } from "./EmotionalEntryRepository";

export class InMemoryEmotionalEntryRepository
  implements EmotionalEntryRepository
{
  private entries: EmotionalEntry[] = [];

  async save(entry: EmotionalEntry): Promise<void> {
    this.entries.push(entry);
  }

  async getAll(): Promise<EmotionalEntry[]> {
    return this.entries;
  }
}
