"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../components/Button";
import { DexieProtocolRunRepository } from "../../persistence/indexeddb/DexieProtocolRunRepository";
import type {
  ProtocolClassification,
  ProtocolFilters,
} from "../../domain/protocol/ProtocolRun";

type Step = "intro" | "pause" | "filters" | "classification" | "actions";

const DEFAULT_FILTERS: ProtocolFilters = {
  timing: "unknown",
  identity: "unknown",
  body: "unknown",
  separation: "unknown",
};

const CLASSIFICATION_COPY: Record<ProtocolClassification, string> = {
  mine: "Work with your usual tools: self-compassion, regulation, reflection.",
  mixed: "Do not act yet. Give it time and revisit when you are calmer.",
  not_mine:
    "Say: “This is not mine.” Return to baseline: body, breath, and safety.",
};

const FILTER_LABELS = {
  timing: "Did this appear after being with someone or entering a situation?",
  identity: "Is this state typical of me in general?",
  body: "Does it feel integrated or invasive?",
  separation: "If you step away, does it drop a lot within 10–30 minutes?",
};

export function ProtocolRunScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const relatedEntryId = searchParams.get("relatedEntryId");

  const [step, setStep] = useState<Step>("intro");
  const [filters, setFilters] = useState<ProtocolFilters>(DEFAULT_FILTERS);
  const [classification, setClassification] =
    useState<ProtocolClassification>("mixed");
  const [context, setContext] = useState("");
  const [saving, setSaving] = useState(false);

  if (!relatedEntryId) {
    return (
      <div className="content-narrow space-y-4">
        <h1 className="text-2xl font-semibold">Protocol</h1>
        <p className="text-sm text-text-muted">
          A protocol run must be linked to a check-in.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => router.push("/create")}>Go to check-in</Button>
          <Button variant="secondary" onClick={() => router.push("/")}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  async function handleSave() {
    if (saving) {
      return;
    }
    setSaving(true);
    const repo = new DexieProtocolRunRepository();

    await repo.save({
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      relatedEntryId,
      filters,
      classification,
      context: context.trim().length > 0 ? context.trim() : undefined,
    });

    router.push("/history");
  }

  return (
    <div className="content-narrow space-y-6">
      {step === "intro" && (
        <>
          <h1 className="text-2xl font-semibold">Protocol</h1>
          <p className="text-sm text-text-muted">
            This protocol classifies, it does not decide. Do not make decisions
            while activated.
          </p>
          <Button onClick={() => setStep("pause")}>Start</Button>
        </>
      )}

      {step === "pause" && (
        <>
          <h1 className="text-2xl font-semibold">Pause</h1>
          <ul className="space-y-2 text-sm text-text-muted">
            <li>Exhale slowly twice.</li>
            <li>Lower your shoulders.</li>
            <li>Feel your feet on the floor.</li>
          </ul>
          <Button onClick={() => setStep("filters")}>Continue</Button>
        </>
      )}

      {step === "filters" && (
        <>
          <h1 className="text-2xl font-semibold">Four filters</h1>
          <p className="text-sm text-text-muted">
            Answer yes / no / not sure.
          </p>

          <label className="block text-xs font-semibold uppercase tracking-wide text-text-muted">
            Context (optional)
          </label>
          <input
            value={context}
            onChange={(event) => setContext(event.target.value)}
            placeholder="Short context"
            maxLength={120}
            className="w-full rounded-md border border-surface-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
          />

          {(
            Object.keys(FILTER_LABELS) as Array<keyof typeof FILTER_LABELS>
          ).map((key) => (
            <div key={key} className="rounded-lg border border-surface-border p-4">
              <div className="text-sm font-medium">{FILTER_LABELS[key]}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {(["yes", "no", "unknown"] as const).map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, [key]: value }))
                    }
                    className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                      filters[key] === value
                        ? "border-foreground bg-foreground text-background"
                        : "border-surface-border text-foreground hover:bg-surface"
                    }`}
                  >
                    {value === "unknown" ? "Not sure" : value}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" onClick={() => setStep("pause")}>
              Back
            </Button>
            <Button onClick={() => setStep("classification")}>Continue</Button>
          </div>
        </>
      )}

      {step === "classification" && (
        <>
          <h1 className="text-2xl font-semibold">Classification</h1>
          <p className="text-sm text-text-muted">
            Use the best fit. You do not need certainty.
          </p>
          <div className="space-y-3">
            {(
              [
                { value: "mine", label: "Mine" },
                { value: "mixed", label: "Mixed / unclear" },
                { value: "not_mine", label: "Probably not mine" },
              ] as const
            ).map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setClassification(option.value)}
                className={`w-full rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                  classification === option.value
                    ? "border-foreground bg-foreground text-background"
                    : "border-surface-border text-foreground hover:bg-surface"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" onClick={() => setStep("filters")}>
              Back
            </Button>
            <Button onClick={() => setStep("actions")}>Continue</Button>
          </div>
        </>
      )}

      {step === "actions" && (
        <>
          <h1 className="text-2xl font-semibold">What to do</h1>
          <p className="text-sm text-text-muted">
            {CLASSIFICATION_COPY[classification]}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" onClick={() => setStep("classification")}>
              Back
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save protocol"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
