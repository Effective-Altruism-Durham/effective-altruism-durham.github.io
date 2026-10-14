// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// unicode-range values copied from @fontsource-variable/*/index.css.
const SUBSETS = {
  latin: 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD',
  'latin-ext': 'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF',
};

/** @typedef {{ src: [string], weight: string, style: 'normal', unicodeRange: [string] }} Variant */

/**
 * One @font-face per subset x weight, all pointing at the package's variable (wght) woff2,
 * the same layout Google Fonts serves.
 * @param {string} slug @param {string[]} weights
 */
function fontsourceVariants(slug, weights) {
  return /** @type {[Variant, ...Variant[]]} */ (
    Object.entries(SUBSETS).flatMap(([subset, range]) =>
      weights.map((weight) => /** @type {Variant} */ ({
        src: [`@fontsource-variable/${slug}/files/${slug}-${subset}-wght-normal.woff2`],
        weight,
        style: 'normal',
        unicodeRange: [range],
      })),
    )
  );
}

// https://astro.build/config
// Pure static site: GitHub Pages serves the built `dist/` directly.
export default defineConfig({
  site: 'https://www.eadurham.org',
  integrations: [sitemap()],
  // Astro 7 defaults to 'jsx', which drops the newline between text and a following inline
  // element (e.g. "reasoning to\n<a>…" rendered as "reasoning to…" with no space). `true` is
  // Astro 6's lossless minification, so the markup renders exactly as written.
  compressHTML: true,
  // Prefetch every internal link on hover/focus (or tap) so page-to-page navigation feels
  // instant. External links are never prefetched.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  // Self-hosted via Astro's Fonts API, fed from the @fontsource-variable packages (the same
  // woff2 files Google Fonts serves), so there is no third-party font request on page load.
  // Weights match the old Google Fonts link exactly (Raleway 400/600/700, Roboto Slab
  // 400/700), declared as single weights so e.g. `font-weight: 600` on Roboto Slab still
  // snaps to 700 as before.
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Raleway',
      cssVariable: '--font-raleway',
      fallbacks: ['Arial', 'sans-serif'],
      options: { variants: fontsourceVariants('raleway', ['400', '600', '700']) },
    },
    {
      provider: fontProviders.local(),
      name: 'Roboto Slab',
      cssVariable: '--font-roboto-slab',
      fallbacks: ['Georgia', 'serif'],
      options: { variants: fontsourceVariants('roboto-slab', ['400', '700']) },
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
