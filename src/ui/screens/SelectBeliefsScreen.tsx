"use client";

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
  function toggleBelief(belief: Belief) {
    const exists = value.some((b) => b.id === belief.id);

    onChange(exists ? value.filter((b) => b.id !== belief.id) : [...value, belief]);
  }

  const categories = Array.from(new Set(BELIEFS.map((belief) => belief.category)));

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold mb-6">Which beliefs are present?</h1>

      {categories.map((category) => {
        const beliefs = BELIEFS.filter((b) => b.category === category).sort((a, b) =>
          a.label.localeCompare(b.label)
        );

        return (
          <div key={category} className="mb-6">
            <h2 className="font-medium mb-2 capitalize">{formatCategory(category)}</h2>

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
