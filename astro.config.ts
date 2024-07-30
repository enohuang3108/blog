import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import { defineConfig, passthroughImageService } from "astro/config";
import { mermaid } from "./src/plugins/mermaid";

// https://astro.build/config
export default defineConfig({
  site: "https://enohuang.com/",
  server: {
    port: 1977,
  },
  integrations: [mdx(), sitemap(), react(), tailwind()],
  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light-default",
        dark: "github-dark-default",
      },
      wrap: true,
    },
    remarkPlugins: [mermaid],
  },
  image: {
    service: passthroughImageService(),
  },
  output: "hybrid",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
