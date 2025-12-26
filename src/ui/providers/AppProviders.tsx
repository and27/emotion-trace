"use client";

import { createContext, useContext } from "react";
import { DexieEmotionalEntryRepository } from "../../persistence/indexeddb/DexieEmotionalEntryRepository";
import { EmotionalEntryRepository } from "../../persistence/repository/EmotionalEntryRepository";

const RepositoryContext = createContext<EmotionalEntryRepository | null>(null);

export function AppProviders({ children }: { children: React.ReactNode }) {
  const repository = new DexieEmotionalEntryRepository();

  return (
    <RepositoryContext.Provider value={repository}>
      {children}
    </RepositoryContext.Provider>
  );
}

export function useEmotionalEntryRepository() {
  const ctx = useContext(RepositoryContext);
  if (!ctx) {
    throw new Error(
      "useEmotionalEntryRepository must be used within AppProviders"
    );
  }
  return ctx;
}
