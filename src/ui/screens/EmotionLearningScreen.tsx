"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { emotionVariantsCatalog } from "@/src/domain/emotions/variants";
import { applyFeedback } from "@/src/application/learning/applyFeedback";
import { selectNextEmotion } from "@/src/application/learning/selectNextEmotion";
import type { EmotionVariant } from "@/src/domain/emotions/EmotionVariant";
import type {
  LearningFeedback,
  LearningStateById,
} from "@/src/application/learning/learningTypes";
import { DexieEmotionLearningRepository } from "@/src/persistence/indexeddb/DexieEmotionLearningRepository";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { SectionTitle } from "../components/SectionTitle";

const SWIPE_THRESHOLD = 80;

export function EmotionLearningScreen() {
  const repo = useMemo(() => new DexieEmotionLearningRepository(), []);
  const [learningState, setLearningState] = useState<LearningStateById>({});
  const [currentEmotion, setCurrentEmotion] = useState<EmotionVariant | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<number | null>(null);

  useEffect(() => {
    let isActive = true;

    repo.getAll().then((state) => {
      if (!isActive) {
        return;
      }

      setLearningState(state);
      setCurrentEmotion(
        selectNextEmotion(emotionVariantsCatalog, state, { now: Date.now() })
      );
      setLoading(false);
    });

    return () => {
      isActive = false;
    };
  }, [repo]);

  const handleFeedback = (feedback: LearningFeedback) => {
    if (!currentEmotion) {
      return;
    }

    const now = Date.now();

    setLearningState((prev) => {
      const updated = applyFeedback(prev[currentEmotion.id], feedback, now);
      const nextState = { ...prev, [currentEmotion.id]: updated };

      void repo.save(currentEmotion.id, updated);
      setCurrentEmotion(
        selectNextEmotion(emotionVariantsCatalog, nextState, { now })
      );

      return nextState;
    });
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragStartRef.current = event.clientX;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartRef.current === null) {
      return;
    }

    setDragOffset(event.clientX - dragStartRef.current);
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartRef.current === null) {
      return;
    }

    event.currentTarget.releasePointerCapture(event.pointerId);

    const offset = dragOffset;
    dragStartRef.current = null;
    setIsDragging(false);
    setDragOffset(0);

    if (Math.abs(offset) >= SWIPE_THRESHOLD) {
      handleFeedback(offset > 0 ? "got_it" : "not_clear");
    }
  };

  if (loading) {
    return (
      <div className="text-sm text-text-muted">Loading learning deck...</div>
    );
  }

  if (!currentEmotion) {
    return (
      <div className="text-sm text-text-muted">
        No emotions available yet.
      </div>
    );
  }

  return (
    <div className="content-medium space-y-6">
      <header className="space-y-2">
        <SectionTitle as="h1" className="text-2xl">
          Learn emotions
        </SectionTitle>
        <p className="text-sm text-text-muted">
          Swipe right for got it, swipe left for not clear.
        </p>
      </header>

      <div className="relative">
        <Card
          className="space-y-4 cursor-grab active:cursor-grabbing"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          style={{
            transform: `translateX(${dragOffset}px) rotate(${dragOffset / 12}deg)`,
            transition: isDragging ? "none" : "transform 200ms ease",
          }}
        >
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-wide text-text-muted">
              Emotion variant
            </div>
            <h2 className="text-xl font-semibold">{currentEmotion.name}</h2>
          </div>

          <p className="text-sm text-foreground">
            {currentEmotion.shortDefinition}
          </p>

          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase text-text-muted">
              Key differences
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border border-surface-border px-3 py-1">
                Activation: {currentEmotion.keyDifferences.activationLevel}
              </span>
              <span className="rounded-full border border-surface-border px-3 py-1">
                Time: {currentEmotion.keyDifferences.timeOrientation}
              </span>
              <span className="rounded-full border border-surface-border px-3 py-1">
                Control: {currentEmotion.keyDifferences.controlSense}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase text-text-muted">
                Body signature
              </div>
              <div className="flex flex-wrap gap-2">
                {currentEmotion.bodySignature.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-surface-border px-3 py-1 text-xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase text-text-muted">
                Mental signature
              </div>
              <div className="flex flex-wrap gap-2">
                {currentEmotion.mentalSignature.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-surface-border px-3 py-1 text-xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase text-text-muted">
                Impulse
              </div>
              <div className="flex flex-wrap gap-2">
                {currentEmotion.impulse.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-surface-border px-3 py-1 text-xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Button
            variant="secondary"
            onClick={() => handleFeedback("not_clear")}
          >
            Not clear
          </Button>
          <Button onClick={() => handleFeedback("got_it")}>Got it</Button>
        </div>
      </div>
    </div>
  );
}
