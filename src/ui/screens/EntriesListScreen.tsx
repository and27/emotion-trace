"use client";

import { useEmotionalEntries } from "../hooks/useEmotionalEntries";
import { Card } from "../components/Card";
import { Chip } from "../components/Chip";
import { SectionTitle } from "../components/SectionTitle";

export function EntriesListScreen() {
  const { entries, loading } = useEmotionalEntries();

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="text-sm text-text-muted">Loading...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <SectionTitle as="h1" className="text-2xl">
            Emotional Entries
          </SectionTitle>
          <p className="mt-2 text-sm text-text-muted">
            A snapshot of your recent check-ins.
          </p>
        </div>
      </div>

      {entries.length === 0 && (
        <Card>
          <p className="text-sm text-text-muted">
            No entries yet. Start with a new check-in.
          </p>
        </Card>
      )}

      <ul className="space-y-6">
        {[...entries]
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((entry) => (
          <li key={entry.id}>
            <Card>
              <div className="text-xs font-medium uppercase tracking-wide text-text-muted">
                {new Date(entry.createdAt).toLocaleString()}
              </div>

              <div className="mt-4 space-y-4">
                <div>
                  <div className="text-xs font-semibold uppercase text-text-muted">
                    Body sensations
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {entry.bodySensations.map((bs, i) => (
                      <Chip key={`${bs.bodyArea}-${bs.sensation}-${i}`}>
                        {bs.sensation} · {bs.bodyArea}
                      </Chip>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold uppercase text-text-muted">
                    Emotions
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {entry.emotions.length === 0 ? (
                      <Chip tone="neutral">None</Chip>
                    ) : (
                      entry.emotions.map((emotion) => (
                        <Chip key={emotion.id}>{emotion.label}</Chip>
                      ))
                    )}
                  </div>
                </div>

                {entry.beliefs && (
                  <div>
                    <div className="text-xs font-semibold uppercase text-text-muted">
                      Beliefs
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {entry.beliefs?.length === 0 ? (
                        <Chip tone="neutral">None</Chip>
                      ) : (
                        entry.beliefs?.map((belief) => (
                          <Chip key={belief.id}>{belief.label}</Chip>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
