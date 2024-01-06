import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import {
  prepareTamaguiVitePlugins,
  // elementsOptimizeDepsInclude,
} from "elements/vite";
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
  plugins: [react(), ...tamaguiVitePlugins, vike()],

  // optimizeDeps: {
  //   include: [...elementsOptimizeDepsInclude],
  // },

  // resolve: {
  //   alias: {
  //     "react-native": "react-native-web",
  //   },
  // },

  ssr: {
    external: ["@react-native/normalize-color"],
    noExternal: [/tamagui/],
  },
});
