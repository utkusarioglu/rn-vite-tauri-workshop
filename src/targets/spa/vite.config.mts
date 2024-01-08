import { join, resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { prepareTamaguiVitePlugins } from "package--elements/vite";

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
    alias: [
      {
        find: /^#styles\//,
        replacement: join(__dirname, "src/styles/"),
      },
      {
        find: /^#wrappers\//,
        replacement: join(__dirname, "src/components/wrappers/"),
      },
      {
        find: /^#screens/,
        replacement: join(__dirname, "src/components/screens/"),
      },
      {
        find: /^#\//,
        replacement: `${__dirname}/`,
      },
    ],
  },

  plugins: [react(), ...tamaguiVitePlugins],
});
