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
    include: ["xp-app", "elements > tamagui"],
  },

  // prevent vite from obscuring rust errors
  clearScreen: false,
  // Tauri expects a fixed port, fail if that port is not available
  server: {
    strictPort: true,
  },
  // to access the Tauri environment variables set by the CLI with information about the current target
  envPrefix: [
    "VITE_",
    "TAURI_PLATFORM",
    "TAURI_ARCH",
    "TAURI_FAMILY",
    "TAURI_PLATFORM_VERSION",
    "TAURI_PLATFORM_TYPE",
    "TAURI_DEBUG",
  ],
  build: {
    // Tauri uses Chromium on Windows and WebKit on macOS and Linux
    target: process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "safari13",
    // don't minify for debug builds
    minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_DEBUG,

    // commonjsOptions: {
    //   // include: [/xp-app/],
    //   include: [/xp-app/, /elements/],
    // },
  },
});
