import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tamaguiExtractPlugin, tamaguiPlugin } from "@tamagui/vite-plugin";

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
    include: ["xp-app", "elements"],
  },
  build: {
    commonjsOptions: {
      // include: [/xp-app/],
      include: [/xp-app/, /elements/],
    },
  },
});
