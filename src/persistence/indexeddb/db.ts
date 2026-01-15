import Dexie, { Table } from "dexie";
import { EmotionalEntry } from "../../domain/entry/EmotionalEntry";

export class EmotionalEntryDatabase extends Dexie {
  entries!: Table<EmotionalEntry, string>;

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
