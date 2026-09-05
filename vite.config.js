/// <reference types="vitest/config" />
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  // loadEnv reads .env directly since these vars aren't prefixed with
  // VITE_ (they're server.js's config too, not meant to reach client code).
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    test: {
      projects: [
        {
          extends: true,
        },
      ],
    },
    server: {
      // VITE_BASE_URL is "/api/" (same-origin, see server.js's proxy
      // comment for why), so the dev server needs its own proxy to reach
      // the local backend. Reuses server.js's own API_PROXY_TARGET so the
      // two never drift apart.
      proxy: {
        "/api": env.API_PROXY_TARGET || "http://localhost:3000",
      },
    },
  };
});
