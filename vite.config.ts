import { defineConfig } from "vite";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/password-generator-app/",
  resolve: {
    alias: {
      "@components": resolve(__dirname, "src/components"),
      "@fonts": resolve(__dirname, "src/fonts"),
      "@images": resolve(__dirname, "src/images"),
    },
  },
});