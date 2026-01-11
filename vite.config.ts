import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  server: {
    port: 5000,
    allowedHosts: [
      "afraid-bats-shave.loca.lt",
      // 'host.docker.internal' for Docker environments
    ],
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Kangaroo Kick",
        short_name: "Kangaroo",
        theme_color: "#00bcd4",
        background_color: "#e0f7fa",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "https://placehold.co/192x192/png?text=🦘",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "https://placehold.co/512x512/png?text=🦘",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "https://placehold.co/192x192/png?text=🌴",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "https://placehold.co/512x512/png?text=🌴",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "https://placehold.co/192x192/png?text=🐨",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "https://placehold.co/512x512/png?text=🐨",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
