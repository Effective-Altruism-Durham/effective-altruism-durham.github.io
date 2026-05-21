@/Users/Subspace_Explorer/.codex/RTK.md

# EA Durham Site Notes

## Tooling

- Stack: pnpm, Astro, Tailwind CSS, Tina CMS, and Netlify.
- Use pnpm for every package-manager command in this workspace.
- Do not use npm, yarn, or bun to install dependencies or run scripts.
- Keep `pnpm-lock.yaml` as the only package-manager lockfile. The repo also ignores other lockfiles.
- The project declares `packageManager: pnpm@11.1.3` and requires Node `>=22.12.0`.
- Corepack is optional; the project convention is simply pnpm.

## Commands

- `pnpm install` installs dependencies.
- `pnpm run dev` starts the Astro dev server.
- `pnpm run build` is the main production verification command.
- `pnpm run preview` previews the built site.
- `pnpm astro ...` runs Astro CLI commands through the repo package manager.

## Project Shape

- This is an Astro 6 site using Tailwind CSS v4 through `@tailwindcss/vite`.
- `astro.config.mjs` sets `site: 'https://www.eadurham.org'`, uses the Netlify adapter, and builds with `output: 'server'`.
- Routes live in `src/pages/*.astro`; shared page chrome is in `src/layouts/Layout.astro`; reusable UI is in `src/components/`.
- Global styling and Tailwind theme utilities live in `src/styles/global.css`.
- Static assets live in `public/`. Many `public/assets/*` files are migrated legacy site assets, so do not delete whole asset directories unless the consuming pages have been checked.

## Editing Guidance

- Prefer small Astro components and Tailwind utility classes over large custom CSS blocks.
- Keep navigation changes in sync between the desktop dropdowns and mobile drawer in `src/layouts/Layout.astro`.
- Use root-relative links for site routes, matching the existing `/programmes`, `/opportunities`, `/causes`, `/events`, and `/contact-us` pattern.
- Before calling work complete, run `pnpm run build` unless the change is documentation-only.

## Wix Reference Migration Notes

- The exported Wix pages are fixed-width, visually positioned layouts. When porting another page, first inspect the reference page at a wide viewport and at 50% browser zoom, then map major sections to a centered `980px` canvas before tuning responsive behavior.
- Use Playwright/browser screenshots for visual work. Compare against `reference_site/*.html` through a local static server if direct `file://` access is blocked.
- Tailwind v4 layers matter: keep global resets in `@layer base` in `src/styles/global.css`. Unlayered heading, anchor, or paragraph resets after `@import "tailwindcss"` can override Tailwind utilities such as `mb-*`, `text-white`, and spacing classes.
- The homepage reference match succeeded by using small, page-specific Astro components for each section, with Tailwind for ordinary styling and a few inline numeric values where Wix-style exact positioning was needed.
- For header/logo work, use the actual `public/favicon.svg` mark directly for the header icon rather than nesting it inside another white circle; the SVG already contains the white circular background.
- Keep desktop navigation and mobile navigation in sync. The Wix reference is not mobile-friendly, so Astro pages should add a small-screen burger menu while preserving the desktop reference layout.
- Many Wix dividers are SVG shapes, not simple borders. Reuse the extracted divider SVG/path when matching top notches or sloped section transitions.
