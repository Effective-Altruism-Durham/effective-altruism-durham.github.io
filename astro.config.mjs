// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';
import { storyblok } from '@storyblok/astro';
import { loadEnv } from 'vite';
import mkcert from 'vite-plugin-mkcert';


const env = loadEnv(import.meta.env.MODE, process.cwd(), '');
const {
	STORYBLOK_DELIVERY_API_TOKEN,
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
      accessToken: STORYBLOK_DELIVERY_API_TOKEN,
      apiOptions: {
        region: STORYBLOK_REGION || 'eu',
      },
      components: {
        page: 'storyblok/Page',
        hero_section: 'storyblok/HeroSection',
        rich_text_video_section: 'storyblok/RichTextVideoSection',
        cta_section: 'storyblok/CtaSection',
        card_grid_section: 'storyblok/CardGridSection',
        text_card: 'storyblok/TextCard',
        social_links_section: 'storyblok/SocialLinksSection',
        contact_section: 'storyblok/ContactSection',
			},
    }),
  ],
  adapter: netlify(),
  output: 'server',
});
