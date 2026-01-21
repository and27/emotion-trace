import Dexie, { Table } from "dexie";
import type { ProtocolRun } from "../../domain/protocol/ProtocolRun";

export class ProtocolRunDatabase extends Dexie {
  runs!: Table<ProtocolRun, string>;

  constructor() {
    super("ProtocolRunDB");
    this.version(1).stores({
      runs: "id, createdAt, relatedEntryId, [relatedEntryId+createdAt]",
    });
  }
}
