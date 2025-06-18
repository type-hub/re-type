import tsconfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [tsconfigPaths()],

  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],

    // Configure aliases to point to your dist folder
    // typecheck: {
    //   enabled: true,
    // },

    alias: {
      // Match the baseUrl from tsconfig.json
      // "@/": "./src/",
    },
  },
})
