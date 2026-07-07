import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages serves project sites from /<repository-name>/, so the
// base path must match the repository name exactly. Update BASE_PATH
// below if the repository is renamed.
const BASE_PATH = process.env.VITE_BASE_PATH ?? "/anahita/";

export default defineConfig({
  base: BASE_PATH,
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
