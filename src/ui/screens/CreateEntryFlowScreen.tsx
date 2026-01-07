"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import type { BodySensation } from "../../domain/sensation/BodySensation";
import type { Emotion } from "../../domain/emotions/checkin/Emotion";
import type { Belief } from "../../domain/belief/Belief";
import type { ContextTag } from "../../domain/context/ContextTag";

import { CreateBodySensationsScreen } from "./CreateBodySensationsScreen";
import { useCreateEmotionalEntry } from "../hooks/useCreateEmotionalEntry";
import { SelectEmotionsScreen } from "./SelectEmotionsScreen";
import { SelectBeliefsScreen } from "./SelectBeliefsScreen";
import { SelectContextTagsScreen } from "./SelectContextTagsScreen";
import { ContextNoteScreen } from "./ContextNoteScreen";

type Step = "body" | "emotions" | "contexts" | "beliefs" | "context";

export function CreateEntryFlowScreen() {
  const router = useRouter();
  const { create } = useCreateEmotionalEntry();

  const [step, setStep] = useState<Step>("body");
  const [bodySensations, setBodySensations] = useState<BodySensation[]>([]);
  const [emotions, setEmotions] = useState<Emotion[]>([]);
  const [beliefs, setBeliefs] = useState<Belief[]>([]);
  const [contexts, setContexts] = useState<ContextTag[]>([]);
  const [contextNote, setContextNote] = useState("");

  async function handleSave() {
    await create({
      emotions: emotions.map((e) => e),
      beliefs,
      contexts,
      contextNote,
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
        onContinue={() => setStep("contexts")}
      />
    );
  }

  if (step === "contexts") {
    return (
      <SelectContextTagsScreen
        value={contexts}
        onChange={setContexts}
        onContinue={() => setStep("beliefs")}
      />
    );
  }

  if (step === "beliefs") {
    return (
      <SelectBeliefsScreen
        value={beliefs}
        onChange={setBeliefs}
        onContinue={() => setStep("context")}
      />
    );
  }

  return (
    <ContextNoteScreen
      value={contextNote}
      onChange={setContextNote}
      onContinue={handleSave}
    />
  );
}
