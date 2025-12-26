"use client";

import { useEffect, useState } from "react";
import { useCreateEmotionalEntry } from "../hooks/useCreateEmotionalEntry";
import { BodySensation } from "../../domain/sensation/BodySensation";
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

  useEffect(() => {
    if (value) {
      setSelected(value);
    }
  }, [value]);

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
    if (onContinue) {
      onContinue(selected);
      return;
    }

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
                <SensationChoice
                  key={s}
                  label={s}
                  selected={isSelected}
                  onSelect={() => addSensation(area, s)}
                />
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
        {onContinue ? "Continue" : "Save"}
      </button>
    </div>
  );
}
