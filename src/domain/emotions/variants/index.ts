import { alegria } from "./alegria";
import { advancedEmotionVariants } from "./advanced";
import { ansiedad } from "./ansiedad";
import { calma } from "./calma";
import { culpa } from "./culpa";
import { duelo } from "./duelo";
import { entusiasmo } from "./entusiasmo";
import { frustracion } from "./frustracion";
import { humillacion } from "./humillacion";
import { ira } from "./ira";
import { panico } from "./panico";
import { remordimiento } from "./remordimiento";
import { serenidad } from "./serenidad";
import { tristeza } from "./tristeza";
import { verguenza } from "./verguenza";

export const emotionVariantsCatalog = [
  ansiedad,
  panico,
  ira,
  frustracion,
  tristeza,
  duelo,
  verguenza,
  humillacion,
  culpa,
  remordimiento,
  alegria,
  entusiasmo,
  calma,
  serenidad,
  ...advancedEmotionVariants,
];

export {
  alegria,
  ansiedad,
  calma,
  culpa,
  duelo,
  entusiasmo,
  frustracion,
  humillacion,
  ira,
  panico,
  remordimiento,
  serenidad,
  tristeza,
  verguenza,
};

export * from "./advanced";
