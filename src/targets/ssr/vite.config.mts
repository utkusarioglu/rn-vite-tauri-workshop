import { join } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { prepareTamaguiVitePlugins } from "package--elements/vite";
import vike from "vike/plugin";

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
  clearScreen: false,

  plugins: [react(), ...tamaguiVitePlugins, vike()],

  resolve: {
    alias: [
      {
        find: /^#styles\//,
        replacement: join(__dirname, "src/styles/"),
      },
      {
        find: /^#layouts\//,
        replacement: join(__dirname, "src/components/layouts/"),
      },
      {
        find: /^#\//,
        replacement: `${__dirname}/`,
      },
    ],
  },

  ssr: {
    external: ["@react-native/normalize-color"],
    noExternal: [/tamagui/],
  },
});
