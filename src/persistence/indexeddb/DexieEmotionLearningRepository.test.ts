import { describe, expect, it } from "vitest";
import { DexieEmotionLearningRepository } from "./DexieEmotionLearningRepository";

describe("DexieEmotionLearningRepository", () => {
  it("persists and retrieves emotion learning state", async () => {
    const repo = new DexieEmotionLearningRepository();

    await repo.save("joy", {
      clarityScore: 2,
      seenCount: 5,
      lastSeen: 1234,
    });

    const loaded = await repo.getById("joy");
    const all = await repo.getAll();

    expect(loaded).toEqual({
      clarityScore: 2,
      seenCount: 5,
      lastSeen: 1234,
    });
    expect(all.joy).toEqual({
      clarityScore: 2,
      seenCount: 5,
      lastSeen: 1234,
    });
  });
});
