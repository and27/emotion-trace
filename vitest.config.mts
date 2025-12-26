import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "node",
    setupFiles: ["./vitest.setup.ts"],
    environmentMatchGlobs: [
      ["src/ui/**/*.test.ts", "jsdom"],
      ["src/ui/**/*.test.tsx", "jsdom"],
    ],
  },
});
