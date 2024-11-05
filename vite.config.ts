import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';  // path 모듈 추가
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@components': path.resolve(__dirname, './src/components')
    }
  }
});