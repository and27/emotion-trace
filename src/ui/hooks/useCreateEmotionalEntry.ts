import { createAndSaveEmotionalEntry } from "../../application/use-cases/createAndSaveEmotionalEntry";
import { useEmotionalEntryRepository } from "../providers/AppProviders";
import { BodySensation } from "../../domain/sensation/BodySensation";

type Input = {
  emotions: string[];
  contexts: string[];
  bodySensations: BodySensation[];
};

export function useCreateEmotionalEntry() {
  const repo = useEmotionalEntryRepository();

  async function create(input: Input) {
    return createAndSaveEmotionalEntry(input, repo);
  }

  return { create };
}
