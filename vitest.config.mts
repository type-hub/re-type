import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],

    // Configure aliases to point to your dist folder
    // typecheck: {
    //   enabled: true,
    // },

    // alias: {
    //   // "@type-hub/re-action": "./dist/index.js",
    //   "@type-hub/re-action": resolve(__dirname, "./dist/index.js"),
    // },

    alias: {
      // "@/": resolve(__dirname, "./src"),
      // "@": resolve(__dirname, "./test-data/index.ts"),
      // "@test-data": resolve(__dirname, "./test-data"), // Adjust path as needed
    },
  },
});
