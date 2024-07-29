import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import { defineConfig, passthroughImageService } from "astro/config";
import remarkMermaid from "remark-mermaidjs";

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
    remarkPlugins: [remarkMermaid],
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
