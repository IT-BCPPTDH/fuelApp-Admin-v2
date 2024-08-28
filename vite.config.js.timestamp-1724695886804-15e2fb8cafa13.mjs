// vite.config.js
import { defineConfig } from "file:///Users/septian-tm/app/New-Admin-Fuel-Apps/node_modules/vite/dist/node/index.js";
import react from "file:///Users/septian-tm/app/New-Admin-Fuel-Apps/node_modules/@vitejs/plugin-react-swc/index.mjs";
import million from "file:///Users/septian-tm/app/New-Admin-Fuel-Apps/node_modules/million/dist/packages/compiler.mjs";
import { VitePWA } from "file:///Users/septian-tm/app/New-Admin-Fuel-Apps/node_modules/vite-plugin-pwa/dist/index.js";
import removeConsole from "file:///Users/septian-tm/app/New-Admin-Fuel-Apps/node_modules/vite-plugin-remove-console/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    million.vite({ auto: true }),
    react(),
    removeConsole(),
    VitePWA({
      // PWA configuration
    })
  ],
  server: {
    compress: true
  },
  build: {
    brotliSize: false,
    chunkSizeWarningLimit: 1600,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom", "euiselect"]
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvc2VwdGlhbi10bS9hcHAvTmV3LUFkbWluLUZ1ZWwtQXBwc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3NlcHRpYW4tdG0vYXBwL05ldy1BZG1pbi1GdWVsLUFwcHMvdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3NlcHRpYW4tdG0vYXBwL05ldy1BZG1pbi1GdWVsLUFwcHMvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2MnO1xuaW1wb3J0IG1pbGxpb24gZnJvbSAnbWlsbGlvbi9jb21waWxlcic7XG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSAndml0ZS1wbHVnaW4tcHdhJztcbmltcG9ydCByZW1vdmVDb25zb2xlIGZyb20gJ3ZpdGUtcGx1Z2luLXJlbW92ZS1jb25zb2xlJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIG1pbGxpb24udml0ZSh7IGF1dG86IHRydWUgfSksXG4gICAgcmVhY3QoKSxcbiAgICByZW1vdmVDb25zb2xlKCksXG4gICAgVml0ZVBXQSh7XG4gICAgICAvLyBQV0EgY29uZmlndXJhdGlvblxuICAgIH0pXG4gIF0sXG4gIHNlcnZlcjoge1xuICAgIGNvbXByZXNzOiB0cnVlLFxuICB9LFxuICBidWlsZDoge1xuICAgIGJyb3RsaVNpemU6IGZhbHNlLFxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTYwMCxcbiAgICBtaW5pZnk6ICd0ZXJzZXInLFxuICAgIHRlcnNlck9wdGlvbnM6IHtcbiAgICAgIGNvbXByZXNzOiB7XG4gICAgICAgIGRyb3BfY29uc29sZTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgdmVuZG9yOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbScsICdyZWFjdC1yb3V0ZXItZG9tJywgJ2V1aXNlbGVjdCddLCBcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2UyxTQUFTLG9CQUFvQjtBQUMxVSxPQUFPLFdBQVc7QUFDbEIsT0FBTyxhQUFhO0FBQ3BCLFNBQVMsZUFBZTtBQUN4QixPQUFPLG1CQUFtQjtBQUUxQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxRQUFRLEtBQUssRUFBRSxNQUFNLEtBQUssQ0FBQztBQUFBLElBQzNCLE1BQU07QUFBQSxJQUNOLGNBQWM7QUFBQSxJQUNkLFFBQVE7QUFBQTtBQUFBLElBRVIsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLFVBQVU7QUFBQSxFQUNaO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxZQUFZO0FBQUEsSUFDWix1QkFBdUI7QUFBQSxJQUN2QixRQUFRO0FBQUEsSUFDUixlQUFlO0FBQUEsTUFDYixVQUFVO0FBQUEsUUFDUixjQUFjO0FBQUEsTUFDaEI7QUFBQSxJQUNGO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixjQUFjO0FBQUEsVUFDWixRQUFRLENBQUMsU0FBUyxhQUFhLG9CQUFvQixXQUFXO0FBQUEsUUFDaEU7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
