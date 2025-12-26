"use client";

import { useCallback, useState } from "react";
import type { CreateEmotionalEntryInput } from "../../domain/entry/createEmotionalEntry";
import type { EmotionalEntryRepository } from "../../application/ports/EmotionalEntryRepository";
import { createEntry } from "../../application/use-cases/createEntry";

export function useCreateEntry(repository: EmotionalEntryRepository) {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveEntry = useCallback(
    async (input: CreateEmotionalEntryInput) => {
      setIsSaving(true);
      setError(null);
      try {
        await createEntry(repository, input);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        throw err;
      } finally {
        setIsSaving(false);
      }
    },
    [repository]
  );

  return { isSaving, error, saveEntry };
}