import { describe, it, expect } from "vitest";
import { createEmotionalEntry } from "./createEmotionalEntry";
import { EMOTIONS } from "../catalogs/emotionCatalog";
import { BELIEFS } from "../catalogs/beliefCatalog";
import type { Emotion } from "../emotion/Emotion";
import type { Belief } from "../belief/Belief";

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

describe("createEmotionalEntry", () => {
  it("creates a valid emotional entry with emotions and beliefs", () => {
    const entry = createEmotionalEntry({
      emotions: [getEmotion("frustration"), getEmotion("enthusiasm")],
      beliefs: [getBelief("not_enough"), getBelief("no_control")],
      contexts: ["work"],
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
    };

    const entry = createEmotionalEntry({
      emotions: [],
      beliefs: [getBelief("not_safe"), fakeBelief],
      contexts: [],
      bodySensations: [{ sensation: "tension", bodyArea: "chest" }],
    });

    expect(entry.beliefs.map((b) => b.id)).toEqual(["not_safe"]);
  });

  it("stores optional context note", () => {
    const entry = createEmotionalEntry({
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
      emotions: [getEmotion("frustration")],
      beliefs: [],
      contexts: [],
      contextNote: "",
      bodySensations: [{ sensation: "tension", bodyArea: "chest" }],
    });

    expect(entry.contextNote).toBe("");
  });

  it("requires at least one body sensation", () => {
    expect(() =>
      createEmotionalEntry({
        emotions: [getEmotion("frustration")],
        beliefs: [],
        contexts: [],
        bodySensations: [],
      })
    ).toThrow();
  });

  it("allows multiple body sensations with different areas", () => {
    const entry = createEmotionalEntry({
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
        emotions: [],
        beliefs: [belief, belief],
        contexts: [],
        bodySensations: [{ sensation: "tension", bodyArea: "chest" }],
      })
    ).toThrow();
  });
});