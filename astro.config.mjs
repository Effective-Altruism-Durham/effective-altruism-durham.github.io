// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';
import { storyblok } from '@storyblok/astro';
import { loadEnv } from 'vite';

const env = loadEnv('', process.cwd(), 'STORYBLOK');
const { STORYBLOK_DELIVERY_API_TOKEN } = loadEnv(
  import.meta.env.MODE,
  process.cwd(),
  '',
);

// https://astro.build/config
export default defineConfig({
  site: 'https://www.eadurham.org',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    sitemap(),
    storyblok({
      accessToken: env.STORYBLOK_DELIVERY_API_TOKEN,
      apiOptions: {
        region: 'eu',
      },
    }),
  ],
  adapter: netlify(),
  output: 'server',
});