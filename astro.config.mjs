// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // for SSR or use "static" if only building static site
  output: "server",
  build: {
    minify: false, // Disable CSS minification
  },
  adapter: vercel(),
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
    css: {
      // Disable LightningCSS optimization so it stops warning about @property
      lightningcss: {
        drafts: {
          customProperties: true, // enable @property support
        },
      },
    },
  },
});
