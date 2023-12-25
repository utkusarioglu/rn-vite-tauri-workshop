import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import {
  prepareTamaguiVitePlugins,
  elementsOptimizeDepsInclude,
} from "elements/vite";

const tamaguiVitePlugins = prepareTamaguiVitePlugins({
  extract: ["TRUE", "true", "1"].includes(process.env.EXTRACT!),
  options: {
    components: ["tamagui"],
    config: "tamagui.config.mts",
    importsWhitelist: ["constants.mjs", "colors.mjs"],
    logTimings: true,
  },
});

export default defineConfig({
  plugins: [react(), ...tamaguiVitePlugins],

  optimizeDeps: {
    include: [...elementsOptimizeDepsInclude],
  },
});
