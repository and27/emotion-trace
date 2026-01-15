"use client";

import type {
  ContextTag,
  ContextCategory,
} from "../../domain/context/ContextTag";
import { CONTEXT_TAGS } from "@/src/domain";

const CATEGORY_LABELS: Record<ContextCategory, string> = {
  work_performance: "Work / performance",
  relationships: "Relationships",
  self_care_body: "Self care / body",
  environment: "Environment",
  leisure: "Leisure",
};

type Props = {
  value: ContextTag[];
  onChange: (next: ContextTag[]) => void;
  onContinue?: () => void;
};

export function SelectContextTagsScreen({
  value,
  onChange,
  onContinue,
}: Props) {
  function toggleTag(tag: ContextTag) {
    const exists = value.some((t) => t.id === tag.id);
    onChange(exists ? value.filter((t) => t.id !== tag.id) : [...value, tag]);
  }

  const categories = Array.from(
    new Set(CONTEXT_TAGS.map((tag) => tag.category))
  );

  return (
    <div className="p-3 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold mb-6">What contexts apply?</h1>

      {categories.map((category) => {
        const tags = CONTEXT_TAGS.filter((tag) => tag.category === category);

        return (
          <div key={category} className="mb-6">
            <h2 className="font-medium mb-2">{CATEGORY_LABELS[category]}</h2>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => {
                const isSelected = value.some((t) => t.id === tag.id);

                return (
                  <button
                    key={tag.id}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded border text-sm transition
                      ${
                        isSelected
                          ? "bg-foreground text-background border-foreground"
                          : "border-surface-border text-foreground hover:bg-surface"
                      }`}
                  >
                    {tag.label}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {onContinue && (
        <button
          onClick={onContinue}
          className="mt-4 px-4 py-2 rounded bg-foreground text-background transition disabled:opacity-40"
        >
          Continue
        </button>
      )}
    </div>
  );
}
