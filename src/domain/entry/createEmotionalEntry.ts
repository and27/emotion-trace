import { EmotionalEntry } from "./EmotionalEntry";
import { BELIEFS } from "../catalogs/beliefCatalog";
import { EMOTIONS } from "../catalogs/emotionCatalog";
import type { Belief } from "../belief/Belief";
import { ContextTag } from "../context/ContextTag";
import { BodySensation } from "../sensation/BodySensation";
import { Emotion } from "../emotion/Emotion";

type CreateEmotionalEntryInput = {
  emotions: Emotion[];
  beliefs: Belief[];
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

  const emotionIds = new Set(input.emotions.map((emotion) => emotion.id));
  const emotions = EMOTIONS.filter((emotion) => emotionIds.has(emotion.id));

  const beliefIds = input.beliefs.map((belief) => belief.id);
  if (new Set(beliefIds).size !== beliefIds.length) {
    throw new Error("Beliefs must be unique");
  }

  const beliefs = BELIEFS.filter((belief) => beliefIds.includes(belief.id));

  const entry: EmotionalEntry = {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    emotions,
    beliefs,
    contexts: input.contexts as ContextTag[],
    bodySensations: input.bodySensations,
  };

  return entry;
}
