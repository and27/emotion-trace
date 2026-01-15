import { createEmotionalEntry } from "../../domain/entry/createEmotionalEntry";
import { EmotionalEntryRepository } from "../../persistence/repository/EmotionalEntryRepository";
import { BodySensation } from "../../domain/sensation/BodySensation";
import { ActivationLevel, Belief, ContextTag, Emotion } from "@/src/domain";

type CreateAndSaveEmotionalEntryInput = {
  activationLevel: ActivationLevel;
  episode?: string;
  emotions: Emotion[];
  beliefs: Belief[];
  contexts: ContextTag[];
  contextNote?: string;
  bodySensations: BodySensation[];
};

export async function createAndSaveEmotionalEntry(
  input: CreateAndSaveEmotionalEntryInput,
  repository: EmotionalEntryRepository
) {
  const entry = createEmotionalEntry(input);
  await repository.save(entry);
  return entry;
}
