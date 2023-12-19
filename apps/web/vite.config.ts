import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

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
