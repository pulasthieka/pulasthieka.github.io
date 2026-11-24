import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Open http(s) links in articles in a new tab.
const externalLinks = () => (tree) => {
  (function walk(node) {
    if (node.tagName === 'a' && /^https?:/.test(node.properties?.href)) {
      node.properties.target = '_blank';
      node.properties.rel = 'noopener';
    }
    node.children?.forEach(walk);
  })(tree);
};

export default defineConfig({
  site: 'https://www.pulasthi.dev',
  integrations: [sitemap()],
  redirects: {
    '/lab': '/blog/',
    '/lab/ml-notation-atlas': '/blog/2026/ml-notation-atlas/',
  },
  markdown: {
    rehypePlugins: [externalLinks],
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      wrap: false,
    },
  },
});
