import { join } from "node:path";
import { UserConfig, defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { prepareTamaguiVitePlugins } from "elements/vite";

const tamaguiVitePlugins = prepareTamaguiVitePlugins({
  extract: ["TRUE", "true", "1"].includes(process.env.EXTRACT!),
  options: {
    components: ["tamagui"],
    config: "tamagui.config.mts",
    useReactNativeWebLite: true,
  },
});

const tauriConfig: Partial<UserConfig> = {
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
  },
};

export default defineConfig({
  plugins: [react(), ...tamaguiVitePlugins],

  resolve: {
    alias: {
      "#wrappers": join(__dirname, "src/components/wrappers"),
      "#screens": join(__dirname, "src/components/screens"),
      "#": __dirname,
    },
  },

  ...tauriConfig,
});
