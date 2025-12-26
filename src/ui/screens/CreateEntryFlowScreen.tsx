"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import type { BodySensation } from "../../domain/sensation/BodySensation";
import type { Emotion } from "../../domain/emotion/Emotion";
import type { Belief } from "../../domain/belief/Belief";

import { CreateBodySensationsScreen } from "./CreateBodySensationsScreen";
import { useCreateEmotionalEntry } from "../hooks/useCreateEmotionalEntry";
import { SelectEmotionsScreen } from "./SelectEmotionsScreen";
import { SelectBeliefsScreen } from "./SelectBeliefsScreen";

type Step = "body" | "emotions" | "beliefs";

export function CreateEntryFlowScreen() {
  const router = useRouter();
  const { create } = useCreateEmotionalEntry();

  const [step, setStep] = useState<Step>("body");
  const [bodySensations, setBodySensations] = useState<BodySensation[]>([]);
  const [emotions, setEmotions] = useState<Emotion[]>([]);
  const [beliefs, setBeliefs] = useState<Belief[]>([]);

  async function handleSave() {
    await create({
      emotions: emotions.map((e) => e),
      beliefs,
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

  if (step === "emotions") {
    return (
      <SelectEmotionsScreen
        value={emotions}
        onChange={setEmotions}
        onContinue={() => setStep("beliefs")}
      />
    );
  }

  return (
    <SelectBeliefsScreen
      value={beliefs}
      onChange={setBeliefs}
      onContinue={handleSave}
    />
  );
}
