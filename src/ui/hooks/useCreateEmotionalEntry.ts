import { createAndSaveEmotionalEntry } from "../../application/use-cases/createAndSaveEmotionalEntry";
import { useEmotionalEntryRepository } from "../providers/AppProviders";
import { BodySensation } from "../../domain/sensation/BodySensation";
import { Emotion } from "@/src/domain";

type Input = {
  emotions: Emotion[];
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
