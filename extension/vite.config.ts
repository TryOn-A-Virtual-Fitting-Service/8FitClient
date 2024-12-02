import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  build: {
    rollupOptions: {
      input:
        command === "serve"
          ? "index.html" // 개발 시
          : "src/content/content.tsx", // 빌드 시
      output: {
        entryFileNames: "content.js",
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@api": path.resolve(__dirname, "./src/api"),
    },
  },
}));
