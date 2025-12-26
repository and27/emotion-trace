"use client";

import { useEffect, useState } from "react";
import { useCreateEmotionalEntry } from "../hooks/useCreateEmotionalEntry";
import type { BodySensation } from "../../domain/sensation/BodySensation";
import type { BodyArea } from "../../domain/sensation/BodyArea";
import type { Sensation } from "../../domain/sensation/Sensation";
import { SensationChoice } from "../components/SensationChoice";

const BODY_AREAS = ["chest", "stomach", "head"] as const;
const SENSATIONS = ["tension", "heaviness", "heat"] as const;

type CreateBodySensationsScreenProps = {
  value?: BodySensation[];
  onContinue?: (value: BodySensation[]) => void;
};

export function CreateBodySensationsScreen({
  value,
  onContinue,
}: CreateBodySensationsScreenProps) {
  const { create } = useCreateEmotionalEntry();

  const [selected, setSelected] = useState<BodySensation[]>(value ?? []);
  const [activeArea, setActiveArea] = useState<BodyArea | null>(null);
  const [activeSensation, setActiveSensation] = useState<Sensation | null>(
    null
  );

  useEffect(() => {
    if (value) {
      setSelected(value);
    }
  }, [value]);

  function selectBodyArea(area: BodyArea) {
    setActiveArea(area);
    setActiveSensation(null);
  }

  function selectSensation(sensation: Sensation) {
    setActiveSensation(sensation);
  }

  function addSelection() {
    if (!activeArea || !activeSensation) return;

    setSelected((prev) => [
      ...prev.filter((s) => s.bodyArea !== activeArea),
      { bodyArea: activeArea, sensation: activeSensation },
    ]);

    setActiveArea(null);
    setActiveSensation(null);
  }

  function removeSelection(area: BodyArea) {
    setSelected((prev) => prev.filter((s) => s.bodyArea !== area));
  }

  async function save() {
    if (onContinue) {
      onContinue(selected);
      return;
    }

    await create({
      emotions: [],
      beliefs: [],
      contexts: [],
      bodySensations: selected,
    });

    alert("Saved!");
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold mb-6">Body sensations</h1>

      <div className="mb-6">
        <div className="text-sm uppercase tracking-wide text-gray-500 mb-2">
          1. Body area
        </div>
        <div className="flex flex-wrap gap-2">
          {BODY_AREAS.map((area) => (
            <SensationChoice
              key={area}
              label={area}
              selected={activeArea === area}
              onSelect={() => selectBodyArea(area)}
            />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="text-sm uppercase tracking-wide text-gray-500 mb-2">
          2. Sensation
        </div>
        <div className="flex flex-wrap gap-2">
          {SENSATIONS.map((sensation) => (
            <SensationChoice
              key={sensation}
              label={sensation}
              selected={activeSensation === sensation}
              onSelect={() => selectSensation(sensation)}
            />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="text-sm uppercase tracking-wide text-gray-500 mb-2">
          Selected
        </div>
        {selected.length === 0 ? (
          <p className="text-sm text-gray-500">No selections yet.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {selected.map((item) => (
              <li
                key={item.bodyArea}
                className="flex items-center justify-between rounded border px-3 py-2"
              >
                <span className="capitalize">
                  {item.bodyArea} - {item.sensation}
                </span>
                <button
                  type="button"
                  className="text-xs text-gray-500 hover:text-black"
                  onClick={() => removeSelection(item.bodyArea)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        disabled={!activeArea || !activeSensation}
        onClick={addSelection}
        className="px-4 py-2 bg-gray-900 text-white rounded disabled:opacity-40"
      >
        Add selection
      </button>

      <button
        disabled={selected.length === 0}
        onClick={save}
        className="mt-4 px-4 py-2 bg-black text-white rounded disabled:opacity-40"
      >
        {onContinue ? "Continue" : "Save"}
      </button>
    </div>
  );
}
