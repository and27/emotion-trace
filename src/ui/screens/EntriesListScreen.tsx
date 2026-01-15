"use client";

import { useState } from "react";
import { useEmotionalEntries } from "../hooks/useEmotionalEntries";
import { Card } from "../components/Card";
import { Chip } from "../components/Chip";
import { SectionTitle } from "../components/SectionTitle";
import { Button } from "../components/Button";
import Link from "next/link";

export function EntriesListScreen() {
  const { entries, loading } = useEmotionalEntries();
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  function toggleExpanded(id: string) {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  if (loading) {
    return (
      <div className="content-wide">
        <div className="text-sm text-text-muted">Loading...</div>
      </div>
    );
  }

  return (
    <div className="content-wide relative pb-10">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <SectionTitle as="h1" className="text-2xl">
            Emotional Entries
          </SectionTitle>
          <p className="mt-2 text-sm text-text-muted">
            A snapshot of your recent check-ins.
          </p>
        </div>
        <Button
          asChild
          className="rounded-lg aspect-square text-xl"
          aria-label="Create entry"
        >
          <Link href="/create">+</Link>
        </Button>
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
                <div className="flex items-start justify-between gap-4">
                  <div className="text-xs font-medium uppercase tracking-wide text-text-muted">
                    {new Date(entry.createdAt).toLocaleString()}
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleExpanded(entry.id)}
                    className="text-xs font-semibold uppercase tracking-wide text-foreground"
                  >
                    {expandedIds.includes(entry.id) ? "Ver menos" : "Ver mas"}
                  </button>
                </div>

                <div className="mt-2 flex flex-wrap gap-2 items-center">
                  <div className="text-xs font-semibold uppercase text-text-muted">
                    Emotions
                  </div>
                  {entry.emotions.length === 0 ? (
                    <Chip tone="neutral">None</Chip>
                  ) : (
                    entry.emotions.map((emotion) => (
                      <Chip key={emotion.id}>{emotion.label}</Chip>
                    ))
                  )}
                </div>

                <div className="mt-2 flex flex-wrap gap-2 items-center">
                  <div className="text-xs font-semibold uppercase text-text-muted">
                    Context tags
                  </div>
                  {entry.contexts.length === 0 ? (
                    <Chip tone="neutral">None</Chip>
                  ) : (
                    entry.contexts.map((tag) => (
                      <Chip key={tag.id}>{tag.label}</Chip>
                    ))
                  )}
                </div>

                {expandedIds.includes(entry.id) && (
                  <div className="mt-4 space-y-3 text-sm">
                    <div className="flex flex-wrap gap-2 items-center">
                      <div className="text-xs font-semibold uppercase text-text-muted">
                        Beliefs
                      </div>
                      {entry.beliefs.length === 0 ? (
                        <Chip tone="neutral">None</Chip>
                      ) : (
                        entry.beliefs.map((belief) => (
                          <Chip key={belief.id}>{belief.label}</Chip>
                        ))
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 items-center">
                      <div className="text-xs font-semibold uppercase text-text-muted">
                        Body sensations
                      </div>
                      {entry.bodySensations.length === 0 ? (
                        <Chip tone="neutral">None</Chip>
                      ) : (
                        entry.bodySensations.map((item) => (
                          <Chip key={item.bodyArea}>
                            {item.bodyArea.replace(/_/g, " ")} ·{" "}
                            {item.sensation.replace(/_/g, " ")}
                          </Chip>
                        ))
                      )}
                    </div>

                    <div>
                      <div className="text-xs font-semibold uppercase text-text-muted">
                        Context note
                      </div>
                      <p className="mt-1 text-sm text-foreground">
                        {entry.contextNote && entry.contextNote.trim().length > 0
                          ? entry.contextNote
                          : "None"}
                      </p>
                    </div>
                  </div>
                )}
              </Card>
            </li>
          ))}
      </ul>
    </div>
  );
}
