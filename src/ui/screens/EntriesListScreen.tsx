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
  const [expandedEntries, setExpandedEntries] = useState<Set<string>>(
    () => new Set()
  );

  function toggleExpanded(entryId: string) {
    setExpandedEntries((prev) => {
      const next = new Set(prev);
      if (next.has(entryId)) {
        next.delete(entryId);
      } else {
        next.add(entryId);
      }
      return next;
    });
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="text-sm text-text-muted">Loading...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
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
          .map((entry) => {
            const isExpanded = expandedEntries.has(entry.id);

            return (
              <li key={entry.id}>
                <Card>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="text-xs font-medium uppercase tracking-wide text-text-muted">
                      {new Date(entry.createdAt).toLocaleString()}
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleExpanded(entry.id)}
                      className="text-xs font-semibold text-foreground hover:text-text-muted"
                    >
                      {isExpanded ? "Hide" : "See more"}
                    </button>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2 items-center">
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

                  <div className="mt-3 flex flex-wrap gap-2 items-center">
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

                  {isExpanded && (
                    <div className="mt-3 space-y-3">
                      <div>
                        <div className="mt-2 flex flex-wrap gap-2 items-center">
                          <div className="text-xs font-semibold uppercase text-text-muted">
                            Body sensations
                          </div>
                          {entry.bodySensations.map((bs, i) => (
                            <Chip key={`${bs.bodyArea}-${bs.sensation}-${i}`}>
                              {bs.sensation} · {bs.bodyArea}
                            </Chip>
                          ))}
                        </div>
                      </div>

                      {entry.beliefs && (
                        <div className="flex flex-wrap gap-2 items-center">
                          <div className="text-xs font-semibold uppercase text-text-muted">
                            Beliefs
                          </div>
                          {entry.beliefs?.length === 0 ? (
                            <Chip tone="neutral">None</Chip>
                          ) : (
                            entry.beliefs?.map((belief) => (
                              <Chip key={belief.id}>{belief.label}</Chip>
                            ))
                          )}
                        </div>
                      )}

                      <div className="mt-2">
                        <div className="text-xs font-semibold uppercase text-text-muted">
                          Context note
                        </div>
                        {entry.contextNote &&
                        entry.contextNote.trim() !== "" ? (
                          <p className="mt-2 text-sm text-foreground">
                            {entry.contextNote}
                          </p>
                        ) : (
                          <div className="mt-2">
                            <Chip tone="neutral">None</Chip>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </Card>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
