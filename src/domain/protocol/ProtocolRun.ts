export type ProtocolFilterResponse = "yes" | "no" | "unknown";

export type ProtocolClassification = "mine" | "mixed" | "not_mine";

export type ProtocolFilters = {
  timing: ProtocolFilterResponse;
  identity: ProtocolFilterResponse;
  body: ProtocolFilterResponse;
  separation: ProtocolFilterResponse;
};

export interface ProtocolRun {
  id: string;
  createdAt: number;
  relatedEntryId: string;
  filters: ProtocolFilters;
  classification: ProtocolClassification;
  context?: string;
}
