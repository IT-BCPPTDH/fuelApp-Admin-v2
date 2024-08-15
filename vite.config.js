import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import million from 'million/compiler';
import { VitePWA } from 'vite-plugin-pwa';
import removeConsole from 'vite-plugin-remove-console';

export default defineConfig({
  plugins: [
    million.vite({ auto: true }),
    react(),
    removeConsole(),
    VitePWA({
      // PWA configuration
    })
  ],
  server: {
    compress: true,
  },
  build: {
    brotliSize: false,
    chunkSizeWarningLimit: 1600,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'euiselect'], 
        },
      },
    },
  },
});
