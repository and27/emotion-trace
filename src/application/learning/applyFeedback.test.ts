import { describe, it, expect } from "vitest";
import { applyFeedback } from "./applyFeedback";
import type { LearningState } from "./learningTypes";

describe("applyFeedback", () => {
  it("increments clarity score and updates metadata on got_it", () => {
    const previous: LearningState = {
      clarityScore: 1,
      seenCount: 2,
      lastSeen: 1000,
    };
    const now = 5000;

    const result = applyFeedback(previous, "got_it", now);

    expect(result).toEqual({
      clarityScore: 2,
      seenCount: 3,
      lastSeen: 5000,
    });
  });

  it("never drops clarity score below zero on not_clear", () => {
    const now = 1234;

    const result = applyFeedback(undefined, "not_clear", now);

    expect(result).toEqual({
      clarityScore: 0,
      seenCount: 1,
      lastSeen: 1234,
    });
  });
});
