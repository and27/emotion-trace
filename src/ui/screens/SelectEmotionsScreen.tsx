"use client";

import type { Emotion } from "../../domain/emotion/Emotion";
import { EMOTION_FAMILIES } from "../../domain/catalogs/emotionFamilies";
import { EMOTIONS } from "@/src/domain";

type Props = {
  value: Emotion[];
  onChange: (next: Emotion[]) => void;
  onContinue?: () => void;
};

export function SelectEmotionsScreen({ value, onChange, onContinue }: Props) {
  function toggleEmotion(emotion: Emotion) {
    const exists = value.some((e) => e.id === emotion.id);

    onChange(
      exists ? value.filter((e) => e.id !== emotion.id) : [...value, emotion]
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold mb-6">What emotions are present?</h1>

      {EMOTION_FAMILIES.map((family) => {
        const emotions = EMOTIONS.filter((e) => e.family === family).sort(
          (a, b) => a.label.localeCompare(b.label)
        );

        if (emotions.length === 0) return null;

        return (
          <div key={family} className="mb-6">
            <h2 className="font-medium mb-2 capitalize">{family}</h2>

            <div className="flex flex-wrap gap-2">
              {emotions.map((emotion) => {
                const isSelected = value.some((e) => e.id === emotion.id);

                return (
                  <button
                    key={emotion.id}
                    onClick={() => toggleEmotion(emotion)}
                    className={`px-3 py-1 rounded border text-sm
                      ${
                        isSelected ? "bg-black text-white" : "hover:bg-gray-100"
                      }`}
                  >
                    {emotion.label}
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
