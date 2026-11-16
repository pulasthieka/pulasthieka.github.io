import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.pulasthi.dev',
  integrations: [sitemap()],
  redirects: {
    '/lab': '/blog/',
    '/lab/ml-notation-atlas': '/blog/2026/ml-notation-atlas/',
  },
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      wrap: false,
    },
  },
});
