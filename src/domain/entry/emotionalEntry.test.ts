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
});
