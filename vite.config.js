import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import million from "million/compiler";
import { VitePWA } from 'vite-plugin-pwa'; 

export default defineConfig({
  plugins: [
    million.vite({ auto: true }), 
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: false
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, 
        navigateFallback: '/index.html',
        navigateFallbackAllowlist: [
          new RegExp('^/_'),
        ],
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [{
          handler: 'NetworkOnly',
          urlPattern: /\/api\/.*\/*.json/,
          method: 'POST',
          options: {
            backgroundSync: {
              name: 'myQueueName',
              options: {
                maxRetentionTime: 24 * 60
              }
            }
          }
        }]
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'pwa-maskable-192x192.png'],
      manifest: {
        name: 'MOD/MED Data Collector',
        short_name: 'DH Data Collector',
        description: 'Aplikasi Data Collector for MED & MOD',
        theme_color: '#ffffff',
        start_url: "/",
        display: "standalone",
        id: "/",
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-maskable-192x192.png',
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: 'pwa-maskable-512x512.png',
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ]
      },
      injectRegister: 'auto'
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
          vendor: ['react', 'react-dom', 'react-router-dom'], 
        },
      },
    },
  },
})
