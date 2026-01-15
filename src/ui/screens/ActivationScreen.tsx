"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ACTIVATION_LEVELS,
  ActivationLevel,
} from "../../domain/entry/ActivationLevel";
import { Button } from "../components/Button";

const QUICK_THRESHOLD: ActivationLevel = 3;

export function ActivationScreen() {
  const router = useRouter();
  const [activation, setActivation] = useState<ActivationLevel>(3);
  const isQuick = activation >= QUICK_THRESHOLD;

  function goFull() {
    router.push(`/create?activation=${activation}`);
  }

  function goQuick() {
    router.push(`/create?mode=quick&activation=${activation}`);
  }

  return (
    <div className="content-narrow space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Activation level</h1>
        <p className="text-sm text-text-muted">
          How activated do you feel right now?
        </p>
      </header>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm text-text-muted">
          <span>Low</span>
          <span>High</span>
        </div>
        <input
          type="range"
          min={1}
          max={5}
          step={1}
          value={activation}
          onChange={(event) =>
            setActivation(Number(event.target.value) as ActivationLevel)
          }
          className="w-full"
        />
        <div className="flex justify-between text-sm font-semibold">
          {ACTIVATION_LEVELS.map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setActivation(level)}
              className={`h-9 w-9 rounded-full border text-sm transition ${
                activation === level
                  ? "border-foreground bg-foreground text-background"
                  : "border-surface-border text-foreground hover:bg-surface"
              }`}
              aria-label={`Activation level ${level}`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {isQuick ? (
        <div className="space-y-3">
          <Button className="w-full" onClick={goQuick}>
            Quick note
          </Button>
          <Button className="w-full" variant="secondary" onClick={goFull}>
            Full check-in
          </Button>
        </div>
      ) : (
        <Button className="w-full" onClick={goFull}>
          Continue
        </Button>
      )}
    </div>
  );
}
