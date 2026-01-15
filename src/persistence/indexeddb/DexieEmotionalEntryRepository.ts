import Dexie, { Table } from "dexie";
import { EmotionalEntry } from "../../domain/entry/EmotionalEntry";
import { EmotionalEntryRepository } from "../repository/EmotionalEntryRepository";

interface EmotionalEntryRecord extends EmotionalEntry {}

class EmotionalEntryDatabase extends Dexie {
  entries!: Table<EmotionalEntryRecord, string>;

  constructor() {
    super("EmotionalEntryDB");

    this.version(1).stores({
      entries: "id, createdAt",
    });
    this.version(2)
      .stores({
        entries: "id, createdAt",
      })
      .upgrade((tx) =>
        tx
          .table("entries")
          .toCollection()
          .modify((entry) => {
            if (entry.activationLevel == null) {
              entry.activationLevel = 3;
            }
          })
      );
  }
}

export class DexieEmotionalEntryRepository implements EmotionalEntryRepository {
  private db: EmotionalEntryDatabase;

  constructor(db?: EmotionalEntryDatabase) {
    this.db = db ?? new EmotionalEntryDatabase();
  }

  async save(entry: EmotionalEntry): Promise<void> {
    await this.db.entries.put(entry);
  }

  async getAll(): Promise<EmotionalEntry[]> {
    return await this.db.entries.toArray();
  }
}
