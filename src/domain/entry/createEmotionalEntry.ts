import { EmotionalEntry } from "./EmotionalEntry";
import { EMOTIONS } from "../emotion/emotionCatalog";
import { ContextTag } from "../context/ContextTag";

type CreateEmotionalEntryInput = {
  emotions: string[];
  contexts: string[];
};

export function createEmotionalEntry(
  input: CreateEmotionalEntryInput
): EmotionalEntry {
  const emotions = EMOTIONS.filter((emotion) =>
    input.emotions.includes(emotion.id)
  );

  return {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    emotions,
    contexts: input.contexts as ContextTag[],
  };
}
