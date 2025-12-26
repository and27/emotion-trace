import { describe, it, expect } from "vitest";
import { InMemoryEmotionalEntryRepository } from "../../persistence/repository/InMemoryEmotionalEntryRepository";
import { createEmotionalEntry } from "../../domain/entry/createEmotionalEntry";
import { getAllEmotionalEntries } from "./getAllEmotionalEntries";

describe("getAllEmotionalEntries", () => {
  it("returns all persisted emotional entries", async () => {
    const repo = new InMemoryEmotionalEntryRepository();

    const entry1 = createEmotionalEntry({
      emotions: [
        { id: "anxiety", label: "Anxiety", family: "fear", arousal: "high" },
      ],
      beliefs: [],
      contexts: [],
      bodySensations: [{ sensation: "tension", bodyArea: "chest" }],
    });

    const entry2 = createEmotionalEntry({
      emotions: [
        { id: "fear", label: "Fear", family: "fear", arousal: "high" },
      ],
      beliefs: [],
      contexts: [],
      bodySensations: [{ sensation: "heat", bodyArea: "head" }],
    });

    await repo.save(entry1);
    await repo.save(entry2);

    const result = await getAllEmotionalEntries(repo);

    expect(result).toHaveLength(2);
    expect(result.map((e) => e.id)).toEqual(
      expect.arrayContaining([entry1.id, entry2.id])
    );
  });
});
