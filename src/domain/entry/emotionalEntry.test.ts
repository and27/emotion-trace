import { describe, it, expect } from "vitest";
import { createEmotionalEntry } from "./createEmotionalEntry";

describe("createEmotionalEntry", () => {
  it("creates a valid emotional entry with mixed emotions", () => {
    const entry = createEmotionalEntry({
      emotions: ["frustration", "enthusiasm"],
      contexts: ["work"],
      bodySensations: [{ sensation: "tension", bodyArea: "chest" }],
    } as any);

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
      bodySensations: [{ sensation: "tension", bodyArea: "chest" }],
    } as any);

    expect(entry.emotions.map((e) => e.id)).toEqual(["frustration"]);
  });

  it("requires at least one body sensation", () => {
    expect(() =>
      createEmotionalEntry({
        emotions: ["frustration"],
        contexts: [],
        bodySensations: [],
      } as any)
    ).toThrow();
  });

  it("allows multiple body sensations with different areas", () => {
    const entry = createEmotionalEntry({
      emotions: ["frustration"],
      contexts: [],
      bodySensations: [
        { sensation: "tension", bodyArea: "chest" },
        { sensation: "heaviness", bodyArea: "stomach" },
      ],
    } as any);

    expect(entry.bodySensations).toHaveLength(2);
  });

  it("does not allow repeated body areas", () => {
    expect(() =>
      createEmotionalEntry({
        emotions: ["frustration"],
        contexts: [],
        bodySensations: [
          { sensation: "tension", bodyArea: "chest" },
          { sensation: "emptiness", bodyArea: "chest" },
        ],
      } as any)
    ).toThrow();
  });
});
