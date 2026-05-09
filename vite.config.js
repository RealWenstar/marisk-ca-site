import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// BASE_PATH env var lets GitHub Pages serve from a sub-path
// (e.g. https://username.github.io/marisk/ → BASE_PATH=/marisk/).
// Default "/" works for local preview and root-domain hosting.
const base = process.env.BASE_PATH || "/";

export default defineConfig({
  plugins: [react()],
  base,
});
