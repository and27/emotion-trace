import { EmotionalEntry } from "./EmotionalEntry";
import { BELIEFS } from "../catalogs/beliefCatalog";
import { CONTEXT_TAGS } from "../catalogs/contextCatalog";
import type { ContextTag } from "../context/ContextTag";
import { EMOTIONS } from "../emotions/checkin/emotionCatalog";
import type { Belief } from "../belief/Belief";
import { BodySensation } from "../sensation/BodySensation";
import { Emotion } from "../emotions/checkin/Emotion";
import { ACTIVATION_LEVELS, ActivationLevel } from "./ActivationLevel";

type CreateEmotionalEntryInput = {
  activationLevel: ActivationLevel;
  episode?: string;
  emotions: Emotion[];
  beliefs: Belief[];
  contexts: ContextTag[];
  contextNote?: string;
  bodySensations: BodySensation[];
};

export function createEmotionalEntry(
  input: CreateEmotionalEntryInput
): EmotionalEntry {
  if (!ACTIVATION_LEVELS.includes(input.activationLevel)) {
    throw new Error("Activation level must be between 1 and 5");
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

  const contextIds = input.contexts.map((tag) => tag.id);
  if (new Set(contextIds).size !== contextIds.length) {
    throw new Error("Context tags must be unique");
  }

  const contexts = CONTEXT_TAGS.filter((tag) => contextIds.includes(tag.id));

  const episode =
    input.episode && input.episode.trim().length > 0
      ? input.episode.trim()
      : undefined;

  const entry: EmotionalEntry = {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    activationLevel: input.activationLevel,
    episode,
    emotions,
    beliefs,
    contexts,
    contextNote: input.contextNote,
    bodySensations: input.bodySensations,
  };

  return entry;
}
