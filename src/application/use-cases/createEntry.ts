import type { CreateEmotionalEntryInput } from "../../domain/entry/createEmotionalEntry";
import { createEmotionalEntry } from "../../domain/entry/createEmotionalEntry";
import type { EmotionalEntryRepository } from "../ports/EmotionalEntryRepository";

export async function createEntry(
  repository: EmotionalEntryRepository,
  input: CreateEmotionalEntryInput
): Promise<void> {
  const entry = createEmotionalEntry(input);
  await repository.save(entry);
}