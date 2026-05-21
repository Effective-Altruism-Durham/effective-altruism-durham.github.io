// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';
import { loadEnv } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import vercel from '@astrojs/vercel';


const env = loadEnv(import.meta.env.MODE, process.cwd(), '');
const {
	NETLIFY,
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
  ],
  adapter: NETLIFY ? netlify() : vercel(),
  output: 'server',
});