"use client";

import { useState } from "react";
import { useEmotionalEntryRepository } from "../providers/AppProviders";
import { EmotionalEntry } from "../../domain/entry/EmotionalEntry";
import { EmotionalEntryDatabase } from "../../persistence/indexeddb/db";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { SectionTitle } from "../components/SectionTitle";
import Link from "next/link";

type ExportPayload = {
  version: 1;
  exportedAt: string;
  entries: EmotionalEntry[];
};

export function SettingsScreen() {
  const repo = useEmotionalEntryRepository();
  const [status, setStatus] = useState<string | null>(null);
  const [isBusy, setIsBusy] = useState(false);
  const [replaceExisting, setReplaceExisting] = useState(false);

  async function handleExport() {
    setIsBusy(true);
    setStatus(null);
    try {
      const entries = await repo.getAll();
      const payload: ExportPayload = {
        version: 1,
        exportedAt: new Date().toISOString(),
        entries,
      };

      const blob = new Blob([JSON.stringify(payload, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `emotional-entries-${Date.now()}.json`;
      link.click();
      URL.revokeObjectURL(url);
      setStatus("Exported entries successfully.");
    } catch (error) {
      setStatus("Export failed. Please try again.");
    } finally {
      setIsBusy(false);
    }
  }

  async function handleImport(file: File) {
    setIsBusy(true);
    setStatus(null);
    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as ExportPayload | EmotionalEntry[];
      const entries = Array.isArray(parsed) ? parsed : parsed.entries;

      if (!Array.isArray(entries)) {
        throw new Error("Invalid file format");
      }

      if (replaceExisting) {
        const db = new EmotionalEntryDatabase();
        await db.entries.clear();
      }

      for (const entry of entries) {
        await repo.save(entry);
      }

      setStatus("Import completed.");
    } catch (error) {
      setStatus("Import failed. Please check the file format.");
    } finally {
      setIsBusy(false);
    }
  }

  return (
    <div className="content-medium">
      <div className="mb-6 flex items-center justify-between">
        <SectionTitle as="h1" className="text-2xl">
          Settings
        </SectionTitle>
        <Button asChild variant="secondary">
          <Link href="/">Back to entries</Link>
        </Button>
      </div>
      <p className="mt-2 text-sm text-text-muted">
        Manage your data by exporting or importing entries.
      </p>

      <div className="mt-6 space-y-6">
        <Card className="space-y-4">
          <div>
            <h2 className="text-sm font-semibold uppercase text-text-muted">
              Export data
            </h2>
            <p className="mt-2 text-sm text-text-muted">
              Download all entries as a JSON file.
            </p>
          </div>
          <Button onClick={handleExport} disabled={isBusy}>
            Export entries
          </Button>
        </Card>

        <Card className="space-y-4">
          <div>
            <h2 className="text-sm font-semibold uppercase text-text-muted">
              Import data
            </h2>
            <p className="mt-2 text-sm text-text-muted">
              Import entries from a JSON backup file.
            </p>
          </div>

          <label className="flex items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={replaceExisting}
              onChange={(event) => setReplaceExisting(event.target.checked)}
            />
            Replace existing entries
          </label>

          <input
            type="file"
            accept="application/json"
            disabled={isBusy}
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                handleImport(file);
                event.target.value = "";
              }
            }}
          />
        </Card>

        {status && (
          <p className="text-sm text-text-muted" role="status">
            {status}
          </p>
        )}
      </div>
    </div>
  );
}
