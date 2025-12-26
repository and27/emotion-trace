"use client";

import { useEffect, useState } from "react";
import { EmotionalEntry } from "../../domain/entry/EmotionalEntry";
import { DexieEmotionalEntryRepository } from "../../persistence/indexeddb/DexieEmotionalEntryRepository";
import { getAllEmotionalEntries } from "../../application/use-cases/getAllEmotionalEntries";

export function EntriesListScreen() {
  const [entries, setEntries] = useState<EmotionalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const repo = new DexieEmotionalEntryRepository();
    getAllEmotionalEntries(repo).then((result) => {
      setEntries(result);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="p-4">Loading…</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Emotional Entries</h1>

      {entries.length === 0 && <p className="text-gray-500">No entries yet</p>}

      <ul className="space-y-4">
        {entries.map((entry) => (
          <li key={entry.id} className="border rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-2">
              {new Date(entry.createdAt).toLocaleString()}
            </div>

            <ul className="space-y-1">
              {entry.bodySensations.map((bs, i) => (
                <li key={i} className="text-sm">
                  {bs.sensation} —{" "}
                  <span className="text-gray-500">{bs.bodyArea}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
