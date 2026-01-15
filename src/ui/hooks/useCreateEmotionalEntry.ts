import { createAndSaveEmotionalEntry } from "../../application/use-cases/createAndSaveEmotionalEntry";
import { useEmotionalEntryRepository } from "../providers/AppProviders";
import { BodySensation } from "../../domain/sensation/BodySensation";
import { ActivationLevel, Belief, ContextTag, Emotion } from "@/src/domain";

type Input = {
  activationLevel: ActivationLevel;
  emotions: Emotion[];
  beliefs: Belief[];
  contexts: ContextTag[];
  contextNote?: string;
  bodySensations: BodySensation[];
};

export function useCreateEmotionalEntry() {
  const repo = useEmotionalEntryRepository();

  async function create(input: Input) {
    return createAndSaveEmotionalEntry(input, repo);
  }

  return { create };
}
