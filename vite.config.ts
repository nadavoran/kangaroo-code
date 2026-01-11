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
      includeAssets: ["kangaroo.svg"],
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      manifest: {
        name: "Kangaroo Code - Learn Programming",
        short_name: "Kangaroo Code",
        description:
          "An educational game teaching children programming concepts through interactive kangaroo adventures",
        theme_color: "#00bcd4",
        background_color: "#e0f7fa",
        display: "standalone",
        orientation: "any",
        scope: "/",
        start_url: "/",
        categories: ["education", "games", "kids"],
        lang: "en-US",
        icons: [
          {
            src: "/kangaroo.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
          {
            src: "https://placehold.co/192x192/e0f7fa/00bcd4/png?text=🦘",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "https://placehold.co/512x512/e0f7fa/00bcd4/png?text=🦘",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "https://placehold.co/192x192/e0f7fa/00bcd4/png?text=🦘",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "https://placehold.co/512x512/e0f7fa/00bcd4/png?text=🦘",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        screenshots: [
          {
            src: "https://placehold.co/540x720/e0f7fa/333333/png?text=Kangaroo+Code+Game",
            sizes: "540x720",
            type: "image/png",
            form_factor: "narrow",
          },
          {
            src: "https://placehold.co/1024x768/e0f7fa/333333/png?text=Kangaroo+Code+Desktop",
            sizes: "1024x768",
            type: "image/png",
            form_factor: "wide",
          },
        ],
      },
    }),
  ],
});
