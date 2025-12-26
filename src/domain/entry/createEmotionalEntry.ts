import { EmotionalEntry } from "./EmotionalEntry";
import { EMOTIONS } from "../catalogs/emotionCatalog";
import { ContextTag } from "../context/ContextTag";
import { BodySensation } from "../sensation/BodySensation";

type CreateEmotionalEntryInput = {
  emotions: string[];
  contexts: string[];
  bodySensations: BodySensation[];
};

export function createEmotionalEntry(
  input: CreateEmotionalEntryInput
): EmotionalEntry {
  if (!input.bodySensations || input.bodySensations.length === 0) {
    throw new Error("At least one body sensation is required");
  }

  const areas = input.bodySensations.map((bs) => bs.bodyArea);
  const uniqueAreas = new Set(areas);

  if (areas.length !== uniqueAreas.size) {
    throw new Error("Body areas must be unique");
  }

  const emotions = EMOTIONS.filter((emotion) =>
    input.emotions.includes(emotion.id)
  );

  const entry: EmotionalEntry = {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    emotions,
    contexts: input.contexts as ContextTag[],
    bodySensations: input.bodySensations,
  };

  return entry;
}
