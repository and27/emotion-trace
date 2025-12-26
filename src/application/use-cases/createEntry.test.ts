import { describe, it, expect } from "vitest";
import { createAndSaveEmotionalEntry } from "./createAndSaveEmotionalEntry";
import { InMemoryEmotionalEntryRepository } from "@/src/persistence/repository/InMemoryEmotionalEntryRepository";

describe("createAndSaveEmotionalEntry", () => {
  it("creates and persists an emotional entry", async () => {
    const repo = new InMemoryEmotionalEntryRepository();

    const entry = await createAndSaveEmotionalEntry(
      {
        emotions: [
          { id: "anxiety", label: "Anxiety", family: "fear", arousal: "high" },
        ],
        contexts: [],
        bodySensations: [{ sensation: "tension", bodyArea: "chest" }],
      },
      repo
    );

    const stored = await repo.getAll();

    expect(stored).toHaveLength(1);
    expect(stored[0].id).toBe(entry.id);
  });
});
