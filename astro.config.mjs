// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import netlify from '@astrojs/netlify';

import mdx from '@astrojs/mdx';

import tina from '@tinacms/astro/integration';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  site: 'https://www.eadurham.org',
  integrations: [sitemap(), mdx(), tina()],
  adapter: netlify(),
  output: 'server'
});
