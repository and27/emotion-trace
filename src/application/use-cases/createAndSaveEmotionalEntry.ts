import { createEmotionalEntry } from "../../domain/entry/createEmotionalEntry";
import { EmotionalEntryRepository } from "../../persistence/repository/EmotionalEntryRepository";
import { BodySensation } from "../../domain/sensation/BodySensation";
import { Emotion } from "@/src/domain";

type CreateAndSaveEmotionalEntryInput = {
  emotions: Emotion[];
  contexts: string[];
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
