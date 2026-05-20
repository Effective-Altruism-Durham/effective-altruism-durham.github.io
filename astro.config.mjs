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
        home_hero: 'storyblok/HomeHero',
        home_what_is_ea: 'storyblok/HomeWhatIsEa',
        home_arete_fellowship: 'storyblok/HomeAreteFellowship',
        home_what_we_do: 'storyblok/HomeWhatWeDo',
        home_programme_card: 'storyblok/HomeProgrammeCard',
        home_social_links: 'storyblok/HomeSocialLinks',
        home_contact: 'storyblok/HomeContact',
        teaser: 'storyblok/Teaser',
        grid: 'storyblok/Grid',
        feature: 'storyblok/Feature',
			},
    }),
  ],
  adapter: NETLIFY ? netlify() : vercel(),
  output: 'server',
});
