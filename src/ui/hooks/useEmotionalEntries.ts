import { useEffect, useState } from "react";
import { EmotionalEntry } from "../../domain/entry/EmotionalEntry";
import { getAllEmotionalEntries } from "../../application/use-cases/getAllEmotionalEntries";
import { useEmotionalEntryRepository } from "../providers/AppProviders";

export function useEmotionalEntries() {
  const repo = useEmotionalEntryRepository();
  const [entries, setEntries] = useState<EmotionalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllEmotionalEntries(repo).then((result) => {
      setEntries(result);
      setLoading(false);
    });
  }, [repo]);

  return { entries, loading };
}
