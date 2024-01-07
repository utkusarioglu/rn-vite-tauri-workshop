import { join } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { prepareTamaguiVitePlugins } from "elements/vite";

const tamaguiVitePlugins = prepareTamaguiVitePlugins({
  extract: ["TRUE", "true", "1"].includes(process.env.EXTRACT!),
  options: {
    components: ["tamagui"],
    config: "tamagui.config.mts",
    importsWhitelist: ["constants.mjs", "colors.mjs"],
    logTimings: true,
    useReactNativeWebLite: true,
  },
});

export default defineConfig({
  server: {
    port: 5000,
  },

  resolve: {
    alias: {
      "#screens": join(__dirname, "src/components/screens"),
      "#": __dirname,
    },
  },

  plugins: [react(), ...tamaguiVitePlugins],
});
