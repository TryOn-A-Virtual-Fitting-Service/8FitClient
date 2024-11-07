import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  // 환경 변수 로드
  const env = loadEnv(mode, process.cwd());
  
  // API URL에서 기본 도메인만 추출 (http://ec2-3-39... 부분만)
  const API_URL = env.VITE_API_URL.split('/api/v1')[0];

  return {
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/api/v1')
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@styles': path.resolve(__dirname, './src/styles'),
        '@components': path.resolve(__dirname, './src/components'),
        '@api': path.resolve(__dirname, './src/api'),
      }
    }
  };
});