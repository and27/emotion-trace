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

  if (loading) return <p>Loading…</p>;

  return (
    <div>
      <h1>Emotional Entries</h1>

      {entries.length === 0 && <p>No entries yet</p>}

      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            <strong>{new Date(entry.createdAt).toLocaleString()}</strong>
            <ul>
              {entry.bodySensations.map((bs, i) => (
                <li key={i}>
                  {bs.sensation} — {bs.bodyArea}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
