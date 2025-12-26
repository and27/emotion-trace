import { describe, it, expect } from "vitest";
import { createEmotionalEntry } from "./createEmotionalEntry";

describe("createEmotionalEntry", () => {
  it("creates a valid emotional entry with mixed emotions", () => {
    const entry = createEmotionalEntry({
      emotions: ["frustration", "enthusiasm"],
      contexts: ["work"],
    });

    expect(entry.id).toBeDefined();
    expect(entry.createdAt).toBeTypeOf("number");
    expect(entry.emotions.map((e) => e.id)).toEqual(
      expect.arrayContaining(["frustration", "enthusiasm"])
    );
  });

  it("ignores invalid emotions", () => {
    const entry = createEmotionalEntry({
      emotions: ["frustration", "inventada"],
      contexts: [],
    });

    expect(entry.emotions.map((e) => e.id)).toEqual(["frustration"]);
  });

  it("stores sensation and bodyArea when both are provided", () => {
    const entry = createEmotionalEntry({
      emotions: ["frustration"],
      contexts: [],
      sensation: "tension",
      bodyArea: "chest",
    } as any);

    expect(entry.sensation).toBe("tension");
    expect(entry.bodyArea).toBe("chest");
  });

  it("does not allow sensation without body area", () => {
    const entry = createEmotionalEntry({
      emotions: ["frustration"],
      contexts: [],
      sensation: "tension",
    } as any);

    expect(entry.sensation).toBeUndefined();
    expect(entry.bodyArea).toBeUndefined();
  });

  it("does not allow body area without sensation", () => {
    const entry = createEmotionalEntry({
      emotions: ["frustration"],
      contexts: [],
      bodyArea: "chest",
    } as any);

    expect(entry.sensation).toBeUndefined();
    expect(entry.bodyArea).toBeUndefined();
  });

  it("ignores invalid sensations", () => {
    const entry = createEmotionalEntry({
      emotions: ["frustration"],
      contexts: [],
      sensation: "inventada",
      bodyArea: "chest",
    } as any);

    expect(entry.sensation).toBeUndefined();
    expect(entry.bodyArea).toBeUndefined();
  });
});
