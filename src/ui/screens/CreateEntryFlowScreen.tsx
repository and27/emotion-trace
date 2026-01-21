"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import type { BodySensation } from "../../domain/sensation/BodySensation";
import type { Emotion } from "../../domain/emotions/checkin/Emotion";
import type { Belief } from "../../domain/belief/Belief";
import type { ContextTag } from "../../domain/context/ContextTag";
import type { ActivationLevel } from "../../domain/entry/ActivationLevel";
import { ACTIVATION_LEVELS } from "../../domain/entry/ActivationLevel";

import { CreateBodySensationsScreen } from "./CreateBodySensationsScreen";
import { useCreateEmotionalEntry } from "../hooks/useCreateEmotionalEntry";
import { useEmotionalEntries } from "../hooks/useEmotionalEntries";
import { SelectEmotionsScreen } from "./SelectEmotionsScreen";
import { SelectBeliefsScreen } from "./SelectBeliefsScreen";
import { SelectContextTagsScreen } from "./SelectContextTagsScreen";
import { ContextNoteScreen } from "./ContextNoteScreen";
import { findEntrySuggestion } from "../utils/entrySimilarity";

type Step = "body" | "emotions" | "contexts" | "beliefs" | "context";

export function CreateEntryFlowScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { create } = useCreateEmotionalEntry();
  const { entries, loading } = useEmotionalEntries();
  const debugSimilarity = searchParams.get("debugSimilarity") === "1";

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
  const [remindsMeOf, setRemindsMeOf] = useState("");
  const [dismissedSuggestionIds, setDismissedSuggestionIds] = useState<
    string[]
  >([]);

  const suggestion = useMemo(() => {
    if (loading) {
      return null;
    }
    return findEntrySuggestion(
      entries,
      {
        activationLevel,
        episode: remindsMeOf,
        contextNote,
        contexts,
        emotions,
        beliefs,
        bodySensations,
      },
      {
        now: Date.now(),
        windowDays: 14,
        threshold: 0.6,
        dismissedIds: dismissedSuggestionIds,
        query: remindsMeOf,
        onDebug: debugSimilarity
          ? (payload) => {
              console.debug("[entrySimilarity]", payload);
            }
          : undefined,
      }
    );
  }, [
    activationLevel,
    beliefs,
    bodySensations,
    contextNote,
    contexts,
    dismissedSuggestionIds,
    emotions,
    entries,
    debugSimilarity,
    loading,
    remindsMeOf,
  ]);

  async function saveEntry() {
    return await create({
      activationLevel,
      episode: remindsMeOf,
      emotions: emotions.map((e) => e),
      beliefs,
      contexts,
      contextNote,
      bodySensations,
    });
  }

  async function handleSave() {
    await saveEntry();
    router.push("/history");
  }

  async function handleSaveAndProtocol() {
    const entry = await saveEntry();
    router.push(`/protocol?relatedEntryId=${entry.id}`);
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
      remindsMeOf={remindsMeOf}
      onRemindsMeOfChange={setRemindsMeOf}
      suggestedEpisode={suggestion?.label}
      onUseSuggestedEpisode={() => {
        if (suggestion) {
          setRemindsMeOf(suggestion.label);
        }
      }}
      onDismissSuggestedEpisode={() => {
        if (suggestion) {
          setDismissedSuggestionIds((prev) => [...prev, suggestion.entryId]);
        }
      }}
      onBack={handleBack}
      onSave={handleSave}
      onSaveAndProtocol={handleSaveAndProtocol}
    />
  );
}
