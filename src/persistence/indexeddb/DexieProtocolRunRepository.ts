import Dexie, { Table } from "dexie";
import type { ProtocolRun } from "../../domain/protocol/ProtocolRun";
import type { ProtocolRunRepository } from "../repository/ProtocolRunRepository";

interface ProtocolRunRecord extends ProtocolRun {}

class ProtocolRunDatabase extends Dexie {
  runs!: Table<ProtocolRunRecord, string>;

  constructor() {
    super("ProtocolRunDB");

    this.version(1).stores({
      runs: "id, createdAt, relatedEntryId, [relatedEntryId+createdAt]",
    });
  }
}

export class DexieProtocolRunRepository implements ProtocolRunRepository {
  private db: ProtocolRunDatabase;

  constructor(db?: ProtocolRunDatabase) {
    this.db = db ?? new ProtocolRunDatabase();
  }

  async save(run: ProtocolRun): Promise<void> {
    await this.db.runs.put(run);
  }

  async getAll(): Promise<ProtocolRun[]> {
    return await this.db.runs.toArray();
  }
}
