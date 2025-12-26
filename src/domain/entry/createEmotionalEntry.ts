import { EmotionalEntry } from "./EmotionalEntry";
import { EMOTIONS } from "../emotion/emotionCatalog";
import { ContextTag } from "../context/ContextTag";
import { Sensation } from "../sensation/Sensation";
import { BodyArea } from "../sensation/BodyArea";
import { SENSATIONS } from "../sensation/sensationCatalog";
import { BODY_AREAS } from "../sensation/BodyAreaCatalog";

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
    const isValidSensation = SENSATIONS.includes(input.sensation);
    const isValidBodyArea = BODY_AREAS.includes(input.bodyArea);

    if (isValidSensation && isValidBodyArea) {
      entry.sensation = input.sensation;
      entry.bodyArea = input.bodyArea;
    }
  }

  return entry;
}
