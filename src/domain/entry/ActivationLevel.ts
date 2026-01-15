export const ACTIVATION_LEVELS = [1, 2, 3, 4, 5] as const;

export type ActivationLevel = (typeof ACTIVATION_LEVELS)[number];
