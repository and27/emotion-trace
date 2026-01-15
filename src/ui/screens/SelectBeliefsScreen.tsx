"use client";

import { useState } from "react";
import type { Belief } from "../../domain/belief/Belief";
import { BELIEFS } from "@/src/domain";

type Props = {
  value: Belief[];
  onChange: (next: Belief[]) => void;
  onContinue?: () => void;
};

function formatCategory(category: Belief["category"]) {
  return category.replace(/_/g, " ");
}

export function SelectBeliefsScreen({ value, onChange, onContinue }: Props) {
  const [valence, setValence] = useState<Belief["valence"]>("negative");

  function toggleBelief(belief: Belief) {
    const exists = value.some((b) => b.id === belief.id);

    onChange(
      exists ? value.filter((b) => b.id !== belief.id) : [...value, belief]
    );
  }

  const filteredBeliefs = BELIEFS.filter(
    (belief) => belief.valence === valence
  );
  const categories = Array.from(
    new Set(filteredBeliefs.map((belief) => belief.category))
  );

  return (
    <div className="p-3 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold mb-6">Which beliefs are present?</h1>

      <div className="mb-6 flex items-center gap-2">
        <span className="text-xs uppercase tracking-wide text-neutral-500">
          Show
        </span>
        <div className="inline-flex rounded-full border border-surface-border p-1">
          <button
            type="button"
            onClick={() => setValence("negative")}
            className={`rounded-full px-3 py-1 text-xs font-medium transition ${
              valence === "negative"
                ? "bg-foreground text-background"
                : "text-foreground hover:bg-surface"
            }`}
          >
            Negative
          </button>
          <button
            type="button"
            onClick={() => setValence("positive")}
            className={`rounded-full px-3 py-1 text-xs font-medium transition ${
              valence === "positive"
                ? "bg-foreground text-background"
                : "text-foreground hover:bg-surface"
            }`}
          >
            Positive
          </button>
        </div>
      </div>

      {categories.map((category) => {
        const beliefs = filteredBeliefs
          .filter((b) => b.category === category)
          .sort((a, b) => a.label.localeCompare(b.label));

        if (beliefs.length === 0) {
          return null;
        }

        return (
          <div key={category} className="mb-6">
            <h2 className="text-sm mb-2 text-neutral-500 tracking-[3px] capitalize">
              {formatCategory(category)}
            </h2>

            <div className="flex flex-wrap gap-2">
              {beliefs.map((belief) => {
                const isSelected = value.some((b) => b.id === belief.id);

                return (
                  <button
                    key={belief.id}
                    onClick={() => toggleBelief(belief)}
                    className={`px-3 py-1 rounded border text-sm transition
                      ${
                        isSelected
                          ? "bg-foreground text-background border-foreground"
                          : "border-surface-border text-foreground hover:bg-surface"
                      }`}
                  >
                    {belief.label}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {onContinue && (
        <button
          disabled={value.length === 0}
          onClick={onContinue}
          className="mt-4 px-4 py-2 bg-black text-white rounded disabled:opacity-40"
        >
          Continue
        </button>
      )}
    </div>
  );
}
