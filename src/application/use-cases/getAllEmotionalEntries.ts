import { EmotionalEntryRepository } from "../../persistence/repository/EmotionalEntryRepository";
import { EmotionalEntry } from "../../domain/entry/EmotionalEntry";

export async function getAllEmotionalEntries(
  repository: EmotionalEntryRepository
): Promise<EmotionalEntry[]> {
  return repository.getAll();
}
