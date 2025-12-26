export function createUuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `uuid-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}