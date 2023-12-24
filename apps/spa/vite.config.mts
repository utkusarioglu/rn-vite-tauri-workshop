import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// TODO get rid of this require creation as soon as Tamagui fixes its
// module resolution
import Module from "node:module";
const require = Module.createRequire(import.meta.url);
const { tamaguiExtractPlugin, tamaguiPlugin } = require("@tamagui/vite-plugin");

const shouldExtract = process.env.EXTRACT === "1";

const tamaguiConfig = {
  components: ["tamagui"],
  config: "tamagui.config.mts",
};

export default defineConfig({
  plugins: [
    react(),
    tamaguiPlugin(tamaguiConfig),
    shouldExtract ? tamaguiExtractPlugin(tamaguiConfig) : null,
  ].filter(Boolean),

  optimizeDeps: {
    include: ["elements > tamagui"],
  },
});
