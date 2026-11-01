import { defineConfig } from 'astro/config';

export default defineConfig({
  // Update to the Cloudflare Pages URL once the project is created.
  site: 'https://port-of-centralia-demo.pages.dev',
  build: {
    // Inline CSS so nothing blocks first paint.
    inlineStylesheets: 'always',
  },
});
