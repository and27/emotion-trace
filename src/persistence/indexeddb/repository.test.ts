import { describe, expect, it } from "vitest";
import { createEmotionalEntry } from "@/src/domain";
import { DexieEmotionalEntryRepository } from "./DexieEmotionalEntryRepository";

describe("DexieEmotionalEntryRepository", () => {
  it("persists and retrieves emotional entries", async () => {
    const repo = new DexieEmotionalEntryRepository();

    const entry = createEmotionalEntry({
      emotions: [
        { id: "anxiety", label: "Anxiety", family: "fear", arousal: "high" },
      ],
      contexts: [],
      bodySensations: [{ bodyArea: "chest", sensation: "cold" }],
    });

    await repo.save(entry);

    const all = await repo.getAll();

    expect(all).toHaveLength(1);
    expect(all[0].id).toBe(entry.id);
  });
});
