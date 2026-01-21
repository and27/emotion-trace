import type { ProtocolRun } from "../../domain/protocol/ProtocolRun";

export interface ProtocolRunRepository {
  save(run: ProtocolRun): Promise<void>;
  getAll(): Promise<ProtocolRun[]>;
}
