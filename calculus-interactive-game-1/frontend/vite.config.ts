import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    host: '0.0.0.0',
    strictPort: true,
    hmr: {
      clientPort: 5000,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/assets': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
    allowedHosts: [
      "5173--019a88b6-eaaf-7608-8448-39237987f323.us-east-1-01.gitpod.dev"
    ],
  },
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});