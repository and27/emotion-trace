export type EmotionFamilyId =
  | "fear"
  | "anger"
  | "sadness"
  | "shame"
  | "guilt"
  | "joy"
  | "calm";

export interface EmotionFamily {
  id: EmotionFamilyId;
  name: string;
  coreTheme: string;
}
