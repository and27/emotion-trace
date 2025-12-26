"use client";

import { useState } from "react";
import { useCreateEmotionalEntry } from "../hooks/useCreateEmotionalEntry";
import { BodySensation } from "../../domain/sensation/BodySensation";

const BODY_AREAS = ["chest", "stomach", "head"] as const;
const SENSATIONS = ["tension", "heaviness", "heat"] as const;

export function CreateBodySensationsScreen() {
  const { create } = useCreateEmotionalEntry();

  const [selected, setSelected] = useState<BodySensation[]>([]);

  function addSensation(
    bodyArea: BodySensation["bodyArea"],
    sensation: BodySensation["sensation"]
  ) {
    setSelected((prev) => [
      ...prev.filter((s) => s.bodyArea !== bodyArea),
      { bodyArea, sensation },
    ]);
  }

  async function save() {
    await create({
      emotions: [],
      contexts: [],
      bodySensations: selected,
    });

    alert("Saved!");
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold mb-6">Body sensations</h1>

      {BODY_AREAS.map((area) => (
        <div key={area} className="mb-4">
          <div className="font-medium mb-2 capitalize">{area}</div>

          <div className="flex gap-2">
            {SENSATIONS.map((s) => {
              const isSelected = selected.some(
                (x) => x.bodyArea === area && x.sensation === s
              );

              return (
                <button
                  key={s}
                  onClick={() => addSensation(area, s)}
                  className={`px-3 py-1 rounded border text-sm
                    ${
                      isSelected ? "bg-black text-white" : "hover:bg-gray-100"
                    }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <button
        disabled={selected.length === 0}
        onClick={save}
        className="mt-6 px-4 py-2 bg-black text-white rounded disabled:opacity-40"
      >
        Save
      </button>
    </div>
  );
}
