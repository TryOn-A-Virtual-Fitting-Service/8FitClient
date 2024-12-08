import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode, command }) => {
  // 환경 변수 로드
  const env = loadEnv(mode, process.cwd());

  const API_URL = env.VITE_API_URL.split("/api/v1")[0];

  return {
    plugins: [react()],
    build: {
      rollupOptions: {
        input: {
          content: "src/content/content.tsx",
          background: "src/background/background.ts",
        },
        output: {
          entryFileNames: "[name].js",
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@styles": path.resolve(__dirname, "./src/styles"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@api": path.resolve(__dirname, "./src/api"),
      },
    },
  };
});
