// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.eadurham.org',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()],
  adapter: netlify()
});