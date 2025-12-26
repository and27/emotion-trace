"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import type { BodySensation } from "../../domain/sensation/BodySensation";
import type { Emotion } from "../../domain/emotion/Emotion";

import { CreateBodySensationsScreen } from "./CreateBodySensationsScreen";
import { SelectEmotionsScreen } from "./SelectEmotionsScreen";
import { useCreateEmotionalEntry } from "../hooks/useCreateEmotionalEntry";

type Step = "body" | "emotions";

export function CreateEntryFlowScreen() {
  const router = useRouter();
  const { create } = useCreateEmotionalEntry();

  const [step, setStep] = useState<Step>("body");
  const [bodySensations, setBodySensations] = useState<BodySensation[]>([]);
  const [emotions, setEmotions] = useState<Emotion[]>([]);

  async function handleSave() {
    await create({
      emotions: emotions.map((e) => e.id),
      contexts: [],
      bodySensations,
    });

    router.push("/");
  }

  if (step === "body") {
    return (
      <CreateBodySensationsScreen
        value={bodySensations}
        onContinue={(next) => {
          setBodySensations(next);
          setStep("emotions");
        }}
      />
    );
  }

  return (
    <SelectEmotionsScreen
      value={emotions}
      onChange={setEmotions}
      onContinue={handleSave}
    />
  );
}
