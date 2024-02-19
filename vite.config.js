import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import million from "million/compiler";
import { VitePWA } from 'vite-plugin-pwa'; 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    million.vite({ auto: true }), 
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      includeAssets: ['assets/favicon.ico', 'assets/apple-touch-icon.png'],
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
            src: 'assets/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'assets/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'assets/pwa-maskable-192x192.png',
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: 'assets/pwa-maskable-512x512.png',
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ]
      }
    })
  ],
})
