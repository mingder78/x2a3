// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // for SSR or use "static" if only building static site
  output: "server",

  adapter: vercel(),
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
  },
});
