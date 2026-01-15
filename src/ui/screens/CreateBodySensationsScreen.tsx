"use client";

import { useEffect, useState } from "react";
import { useCreateEmotionalEntry } from "../hooks/useCreateEmotionalEntry";
import type { BodySensation } from "../../domain/sensation/BodySensation";
import type { BodyArea } from "../../domain/sensation/BodyArea";
import type { Sensation } from "../../domain/sensation/Sensation";
import { SensationChoice } from "../components/SensationChoice";
import { Button } from "../components/Button";
import { BODY_AREAS } from "../../domain/catalogs/bodyAreaCatalog";
import { SENSATIONS } from "../../domain/catalogs/sensationCatalog";

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
    <div className="content-narrow">
      <h1 className="text-xl font-semibold mb-6">Body sensations</h1>

      <div className="mb-6">
        <div className="text-sm uppercase tracking-wide text-gray-500 mb-2">
          1. Body area
        </div>
        <div className="flex flex-wrap gap-2">
          {BODY_AREAS.map((area) => (
            <SensationChoice
              key={area}
              label={area.replace(/_/g, " ")}
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
        {activeArea ? (
          <div className="flex flex-wrap gap-2">
            {SENSATIONS.map((sensation) => (
              <SensationChoice
                key={sensation}
                label={sensation.replace(/_/g, " ")}
                selected={activeSensation === sensation}
                onSelect={() => selectSensation(sensation)}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            Choose a body area to see sensations.
          </p>
        )}
      </div>
      <Button
        variant="secondary"
        disabled={!activeArea || !activeSensation}
        onClick={addSelection}
      >
        Add selection
      </Button>

      <div className="mb-6 mt-3">
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
                  {item.bodyArea.replace(/_/g, " ")} -{" "}
                  {item.sensation.replace(/_/g, " ")}
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

      <Button disabled={selected.length === 0} onClick={save}>
        {onContinue ? "Continue" : "Save"}
      </Button>
    </div>
  );
}
