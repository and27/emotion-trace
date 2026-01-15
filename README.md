# GUT

## Project Summary
GUT is a PWA for fast emotional check-ins. It captures activation level and a
short narrative so users can track internal states with minimal friction.

## Objective
Reduce friction during high activation while preserving narrative continuity.

## Scope (current)
- Activation gate (1-5) with quick vs full flow
- Save entries with activation, emotions, beliefs, contexts, body sensations,
  context note, and episode label ("Reminds me of")
- History list at `/history`
- Learning deck at `/learn`
- Import/export JSON backups
- Offline-first basics (PWA manifest + service worker)

## Non-goals (for now)
- Diagnosis, therapy, or clinical guidance
- Multi-user accounts
- Social sharing
- Advanced analytics or dashboards

## Definition of Done (DoD)
- Activation -> create -> save -> history flows work end to end
- Domain changes reflected in use cases, persistence, and migrations
- UI states are consistent (empty, loading, back navigation)
- Text is in English and accessible labels are present
- Import/export works with current schema version
- Tests updated for domain/persistence changes (or smoke checks recorded)

## Agent README
- Keep UX low friction; prioritize activation and narrative capture
- Prefer domain-first changes, then UI, then persistence/migrations
- Keep commits small and focused; update tests or note manual checks


## Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
