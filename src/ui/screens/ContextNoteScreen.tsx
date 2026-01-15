"use client";

type Props = {
  value: string;
  onChange: (next: string) => void;
  onContinue?: () => void;
};

export function ContextNoteScreen({ value, onChange, onContinue }: Props) {
  return (
    <div className="content-narrow">
      <h1 className="text-xl font-semibold mb-2">Context note</h1>
      <p className="text-sm text-text-muted mb-6">
        Add any extra context about why you felt this way. Optional.
      </p>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="What was happening?"
        rows={6}
        className="w-full rounded-md border border-surface-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
      />

      {onContinue && (
        <button
          onClick={onContinue}
          className="mt-4 px-4 py-2 rounded bg-foreground text-background transition disabled:opacity-40"
        >
          Continue
        </button>
      )}
    </div>
  );
}
