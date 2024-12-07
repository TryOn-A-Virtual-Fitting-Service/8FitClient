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
        "@styles": path.resolve(__dirname, "./src/styles"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@api": path.resolve(__dirname, "./src/api"),
      },
    },
  };
});
