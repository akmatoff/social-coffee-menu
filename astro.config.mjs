// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";
import react from "@astrojs/react";
import AstroPWA from "@vite-pwa/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    react(),
    AstroPWA({
      registerType: "autoUpdate",
      includeAssets: [
        "background-image.png",
        "favicon.png",
        "hero-background.png",
        "social-coffee-logo.png",
      ],
      manifest: {
        name: "Social Coffee",
        short_name: "SocialCoffee",
        start_url: "/",
        display: "standalone",
        background_color: "#144433",
        theme_color: "#ffffff",
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern:
              /^https:\/\/api.socialcoffee.kg\/api\/(menu-items|menu-categories)/,
            handler: "NetworkFirst",
            options: {
              cacheName: "menu-items-cache",
              expiration: {
                maxAgeSeconds: 60 * 60 * 24,
              },
            },
          },
        ],
      },
    }),
  ],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
