# Notes

- Last snapshot of reference site in ./reference_site/
- tools: pnpm, astro, tailwind, storyblok cms, netlify

storyblok todo:
import { defineConfig } from 'astro/config';
import { storyblok } from '@storyblok/astro';
import { loadEnv } from 'vite';
const env = loadEnv('', process.cwd(), 'STORYBLOK');
const { STORYBLOK_DELIVERY_API_TOKEN } = loadEnv(
  import.meta.env.MODE,
  process.cwd(),
  '',
);

export default defineConfig({
  integrations: [
    storyblok({
      accessToken: env.STORYBLOK_DELIVERY_API_TOKEN,
      apiOptions: {
        region: 'eu',
      },
    }),
  ],
  output: 'server',
});