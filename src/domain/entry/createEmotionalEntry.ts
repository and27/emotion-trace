import { EmotionalEntry } from "./EmotionalEntry";
import { EMOTIONS } from "../emotion/emotionCatalog";
import { ContextTag } from "../context/ContextTag";
import { Sensation } from "../sensation/Sensation";
import { BodyArea } from "../sensation/BodyArea";

type CreateEmotionalEntryInput = {
  emotions: string[];
  contexts: string[];
  sensation?: Sensation;
  bodyArea?: BodyArea;
};

export function createEmotionalEntry(
  input: CreateEmotionalEntryInput
): EmotionalEntry {
  const emotions = EMOTIONS.filter((emotion) =>
    input.emotions.includes(emotion.id)
  );

  const entry: EmotionalEntry = {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    emotions,
    contexts: input.contexts as ContextTag[],
  };

  if (input.sensation && input.bodyArea) {
    entry.sensation = input.sensation;
    entry.bodyArea = input.bodyArea;
  }

  return entry;
}
