import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["**/*.test.ts"],
    exclude: [
      "node_modules",
      "dist",
      "build",
      "coverage",
      "scripts",
      "public",
      "test"
    ],
    environment: "node",   // ✅ Use Node, not jsdom
    globals: true,
  },
});
