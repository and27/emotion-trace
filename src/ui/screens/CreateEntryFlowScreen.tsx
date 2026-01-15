"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import type { BodySensation } from "../../domain/sensation/BodySensation";
import type { Emotion } from "../../domain/emotions/checkin/Emotion";
import type { Belief } from "../../domain/belief/Belief";
import type { ContextTag } from "../../domain/context/ContextTag";
import type { ActivationLevel } from "../../domain/entry/ActivationLevel";
import { ACTIVATION_LEVELS } from "../../domain/entry/ActivationLevel";

import { CreateBodySensationsScreen } from "./CreateBodySensationsScreen";
import { useCreateEmotionalEntry } from "../hooks/useCreateEmotionalEntry";
import { SelectEmotionsScreen } from "./SelectEmotionsScreen";
import { SelectBeliefsScreen } from "./SelectBeliefsScreen";
import { SelectContextTagsScreen } from "./SelectContextTagsScreen";
import { ContextNoteScreen } from "./ContextNoteScreen";

type Step = "body" | "emotions" | "contexts" | "beliefs" | "context";

export function CreateEntryFlowScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { create } = useCreateEmotionalEntry();

  const mode = searchParams.get("mode");
  const activationParam = Number(searchParams.get("activation"));
  const activationFallback: ActivationLevel = 3;
  const activationInitial = ACTIVATION_LEVELS.includes(
    activationParam as ActivationLevel
  )
    ? (activationParam as ActivationLevel)
    : activationFallback;

  const [step, setStep] = useState<Step>(
    mode === "quick" ? "context" : "body"
  );
  const [activationLevel] = useState<ActivationLevel>(activationInitial);
  const [bodySensations, setBodySensations] = useState<BodySensation[]>([]);
  const [emotions, setEmotions] = useState<Emotion[]>([]);
  const [beliefs, setBeliefs] = useState<Belief[]>([]);
  const [contexts, setContexts] = useState<ContextTag[]>([]);
  const [contextNote, setContextNote] = useState("");

  async function handleSave() {
    await create({
      activationLevel,
      emotions: emotions.map((e) => e),
      beliefs,
      contexts,
      contextNote,
      bodySensations,
    });

    router.push("/");
  }

  function handleBack() {
    if (mode === "quick") {
      router.push("/");
      return;
    }

    switch (step) {
      case "body":
        router.push("/");
        return;
      case "emotions":
        setStep("body");
        return;
      case "contexts":
        setStep("emotions");
        return;
      case "beliefs":
        setStep("contexts");
        return;
      case "context":
        setStep("beliefs");
        return;
      default:
        router.push("/");
    }
  }

  if (step === "body") {
    return (
      <CreateBodySensationsScreen
        value={bodySensations}
        onBack={handleBack}
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
        onBack={handleBack}
        onContinue={() => setStep("contexts")}
      />
    );
  }

  if (step === "contexts") {
    return (
      <SelectContextTagsScreen
        value={contexts}
        onChange={setContexts}
        onBack={handleBack}
        onContinue={() => setStep("beliefs")}
      />
    );
  }

  if (step === "beliefs") {
    return (
      <SelectBeliefsScreen
        value={beliefs}
        onChange={setBeliefs}
        onBack={handleBack}
        onContinue={() => setStep("context")}
      />
    );
  }

  return (
    <ContextNoteScreen
      value={contextNote}
      onChange={setContextNote}
      onBack={handleBack}
      onContinue={handleSave}
    />
  );
}
