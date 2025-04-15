import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwind from "tailwindcss";

import { VitePWA } from "vite-plugin-pwa";


const pwaConfig = {
  registerType: "autoUpdate",
  includeAssets: ["logo-color.svg"],
  workbox: {
    globPatterns: ["**/*.{js,css,html,png,jpg,gif,svg,jpeg}"], 
    navigateFallback: "/", 
    navigateFallbackAllowlist: [/^(?!\/__).*/], 
    runtimeCaching: [
      {
        urlPattern: /\.(png|jpg|gif|svg)$/,
        handler: "StaleWhileRevalidate",
      },
    ],
    maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, 
  },
  manifest: {
    name: "ccbme-grh",
    short_name: "ccbme-grh",
    description: "Gestion RH",
    start_url: "/",
    display: "standalone",
    background_color: "#09aef8",
    theme_color: "#09aef8",
    icons: [
      {
        src: "/logo_192.png",
        sizes: "192x192",
        purpose: "any maskable",
      },
      {
        src: "/logo_512.png",
        sizes: "512x512",
        purpose: "maskable any",
      },
    ],
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  basename: "/",
  // plugins: [react()],
  plugins: [react(), VitePWA(pwaConfig), tailwind()],
  define: { "process.env": {} },
   build: {
    outDir: "../deploy-gestion-rh-ccbme/",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // 1 MB
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
