import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tamaguiExtractPlugin, tamaguiPlugin } from "@tamagui/vite-plugin";
// import { spaTamaguiConfig } from "./tamagui.config";

const shouldExtract = process.env.EXTRACT === "1";

const tamaguiConfig = {
  components: ["tamagui"],
  config: "src/tamagui.config.ts",
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tamaguiPlugin(tamaguiConfig),
    shouldExtract ? tamaguiExtractPlugin(tamaguiConfig) : null,
  ].filter(Boolean),

  optimizeDeps: {
    include: ["xp-app"],
  },
  build: {
    commonjsOptions: {
      // include: [/xp-app/],
      include: [/xp-app/],
    },
  },
});
