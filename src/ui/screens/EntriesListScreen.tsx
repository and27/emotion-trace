"use client";

import { useEmotionalEntries } from "../hooks/useEmotionalEntries";

export function EntriesListScreen() {
  const { entries, loading } = useEmotionalEntries();

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
