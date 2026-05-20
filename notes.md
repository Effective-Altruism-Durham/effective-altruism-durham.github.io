# Notes

- Start w/ https://claude.ai/chat/67dcdec7-b8b6-4702-9bec-68c7880a2c2a
- Last snapshot of reference site in ./reference_site/
- tools: pnpm, astro, tailwind, storyblok cms, netlify

**storyblok todo:**
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


## possible extensions
- replace events page with luma calendar or instagram embed