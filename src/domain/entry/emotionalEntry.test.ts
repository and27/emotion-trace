import { describe, it, expect } from "vitest";
import { createEmotionalEntry } from "./createEmotionalEntry";
import { EMOTIONS } from "../emotions/checkin/emotionCatalog";
import { BELIEFS } from "../catalogs/beliefCatalog";
import { CONTEXT_TAGS } from "../catalogs/contextCatalog";
import type { Emotion } from "../emotions/checkin/Emotion";
import type { Belief } from "../belief/Belief";
import type { ContextTag } from "../context/ContextTag";

function getEmotion(id: string): Emotion {
  const emotion = EMOTIONS.find((item) => item.id === id);
  if (!emotion) {
    throw new Error(`Emotion ${id} not found in catalog`);
  }
  return emotion;
}

function getBelief(id: string): Belief {
  const belief = BELIEFS.find((item) => item.id === id);
  if (!belief) {
    throw new Error(`Belief ${id} not found in catalog`);
  }
  return belief;
}

function getContext(id: string): ContextTag {
  const context = CONTEXT_TAGS.find((item) => item.id === id);
  if (!context) {
    throw new Error(`Context ${id} not found in catalog`);
  }
  return context;
}

describe("createEmotionalEntry", () => {
  it("creates a valid emotional entry with emotions and beliefs", () => {
    const entry = createEmotionalEntry({
      activationLevel: 3,
      emotions: [getEmotion("frustration"), getEmotion("enthusiasm")],
      beliefs: [getBelief("not_enough"), getBelief("no_control")],
      contexts: [getContext("work")],
      bodySensations: [{ sensation: "tension", bodyArea: "chest" }],
    });

    expect(entry.id).toBeDefined();
    expect(entry.createdAt).toBeTypeOf("number");
    expect(entry.emotions.map((e) => e.id)).toEqual(
      expect.arrayContaining(["frustration", "enthusiasm"])
    );
    expect(entry.beliefs.map((b) => b.id)).toEqual(
      expect.arrayContaining(["not_enough", "no_control"])
    );
  });

  it("ignores invalid emotions", () => {
    const fakeEmotion: Emotion = {
      id: "inventada",
      label: "Inventada",
      family: "fear",
      arousal: "high",
    };

    const entry = createEmotionalEntry({
      activationLevel: 3,
      emotions: [getEmotion("frustration"), fakeEmotion],
      beliefs: [],
      contexts: [],
      bodySensations: [{ sensation: "tension", bodyArea: "chest" }],
    });

    expect(entry.emotions.map((e) => e.id)).toEqual(["frustration"]);
  });

  it("ignores invalid beliefs", () => {
    const fakeBelief: Belief = {
      id: "inventada",
      label: "Inventada",
      category: "control",
      valence: "negative",
    };

    const entry = createEmotionalEntry({
      activationLevel: 3,
      emotions: [],
      beliefs: [getBelief("not_safe"), fakeBelief],
      contexts: [],
      bodySensations: [{ sensation: "tension", bodyArea: "chest" }],
    });

    expect(entry.beliefs.map((b) => b.id)).toEqual(["not_safe"]);
  });

  it("ignores invalid context tags", () => {
    const fakeContext: ContextTag = {
      id: "invalid_tag",
      label: "Invalid",
      category: "relationships",
    };

    const entry = createEmotionalEntry({
      activationLevel: 3,
      emotions: [getEmotion("frustration")],
      beliefs: [],
      contexts: [getContext("work"), fakeContext],
      bodySensations: [{ sensation: "tension", bodyArea: "chest" }],
    });

    expect(entry.contexts.map((tag) => tag.id)).toEqual(["work"]);
  });

  it("does not allow duplicate context tags", () => {
    const context = getContext("work");

    expect(() =>
      createEmotionalEntry({
        activationLevel: 3,
        emotions: [getEmotion("frustration")],
        beliefs: [],
        contexts: [context, context],
        bodySensations: [{ sensation: "tension", bodyArea: "chest" }],
      })
    ).toThrow();
  });

  it("stores optional context note", () => {
    const entry = createEmotionalEntry({
      activationLevel: 3,
      emotions: [getEmotion("frustration")],
      beliefs: [],
      contexts: [],
      contextNote: "Se sintio despues de la reunion",
      bodySensations: [{ sensation: "tension", bodyArea: "chest" }],
    });

    expect(entry.contextNote).toBe("Se sintio despues de la reunion");
  });

  it("allows empty context note", () => {
    const entry = createEmotionalEntry({
      activationLevel: 3,
      emotions: [getEmotion("frustration")],
      beliefs: [],
      contexts: [],
      contextNote: "",
      bodySensations: [{ sensation: "tension", bodyArea: "chest" }],
    });

    expect(entry.contextNote).toBe("");
  });

  it("allows empty body sensations", () => {
    const entry = createEmotionalEntry({
      activationLevel: 3,
      emotions: [getEmotion("frustration")],
      beliefs: [],
      contexts: [],
      bodySensations: [],
    });

    expect(entry.bodySensations).toHaveLength(0);
  });

  it("allows multiple body sensations with different areas", () => {
    const entry = createEmotionalEntry({
      activationLevel: 3,
      emotions: [getEmotion("frustration")],
      beliefs: [],
      contexts: [],
      bodySensations: [
        { sensation: "tension", bodyArea: "chest" },
        { sensation: "heaviness", bodyArea: "stomach" },
      ],
    });

    expect(entry.bodySensations).toHaveLength(2);
  });

  it("does not allow repeated body areas", () => {
    expect(() =>
      createEmotionalEntry({
        activationLevel: 3,
        emotions: [getEmotion("frustration")],
        beliefs: [],
        contexts: [],
        bodySensations: [
          { sensation: "tension", bodyArea: "chest" },
          { sensation: "emptiness", bodyArea: "chest" },
        ],
      })
    ).toThrow();
  });

  it("does not allow duplicate beliefs", () => {
    const belief = getBelief("not_enough");

    expect(() =>
      createEmotionalEntry({
        activationLevel: 3,
        emotions: [],
        beliefs: [belief, belief],
        contexts: [],
        bodySensations: [{ sensation: "tension", bodyArea: "chest" }],
      })
    ).toThrow();
  });
});
