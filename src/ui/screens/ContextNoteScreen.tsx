"use client";

import { Button } from "../components/Button";

type Props = {
  value: string;
  onChange: (next: string) => void;
  onContinue?: () => void;
  onBack?: () => void;
};

export function ContextNoteScreen({
  value,
  onChange,
  onContinue,
  onBack,
}: Props) {
  return (
    <div className="content-narrow">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="mb-4 inline-flex items-center gap-2 text-sm text-text-muted hover:text-foreground"
        >
          <span aria-hidden="true">&lt;</span>
          <span>Back</span>
        </button>
      )}
      <h1 className="text-xl font-semibold mb-2">Context note</h1>
      <p className="text-sm text-text-muted mb-6">
        Add any extra context about why you felt this way. Optional.
      </p>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="What was happening?"
        rows={6}
        className="mb-5 w-full rounded-md border border-surface-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
      />

      {onContinue && <Button onClick={onContinue}>Continue</Button>}
    </div>
  );
}
