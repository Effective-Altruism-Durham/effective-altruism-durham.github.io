// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';
import { storyblok } from '@storyblok/astro';
import { loadEnv } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import vercel from '@astrojs/vercel';


const env = loadEnv(import.meta.env.MODE, process.cwd(), '');
const {
	NETLIFY,
	STORYBLOK_DELIVERY_API_TOKEN,
	STORYBLOK_API_BASE_URL,
	STORYBLOK_REGION,
} = env;

// https://astro.build/config
export default defineConfig({
  site: 'https://www.eadurham.org',
  devToolbar: {
		enabled: false,
	},

  vite: {
    plugins: [
      tailwindcss(),
      mkcert(),
    ]
  },

  integrations: [
    sitemap(),
    storyblok({
      accessToken: env.STORYBLOK_DELIVERY_API_TOKEN,
      apiOptions: {
        region: 'eu',
      },
      components: {
			},
    }),
  ],
  adapter: NETLIFY ? netlify() : vercel(),
  output: 'server',
});