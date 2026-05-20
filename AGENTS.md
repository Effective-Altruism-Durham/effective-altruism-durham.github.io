@/Users/Subspace_Explorer/.codex/RTK.md

# EA Durham Site Notes

## Tooling

- Stack: pnpm, Astro, Tailwind CSS, Storyblok CMS, and Netlify.
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
- Storyblok is wired through `@storyblok/astro` with the EU API region. Builds that touch Storyblok-backed behavior may need `STORYBLOK_DELIVERY_API_TOKEN` in the environment.
- Routes live in `src/pages/*.astro`; shared page chrome is in `src/layouts/Layout.astro`; reusable UI is in `src/components/`.
- Global styling and Tailwind theme utilities live in `src/styles/global.css`.
- Static assets live in `public/`. Many `public/assets/*` files are migrated legacy site assets, so do not delete whole asset directories unless the consuming pages have been checked.

## Editing Guidance

- Prefer small Astro components and Tailwind utility classes over large custom CSS blocks.
- Keep navigation changes in sync between the desktop dropdowns and mobile drawer in `src/layouts/Layout.astro`.
- Use root-relative links for site routes, matching the existing `/programmes`, `/opportunities`, `/causes`, `/events`, and `/contact-us` pattern.
- Before calling work complete, run `pnpm run build` unless the change is documentation-only.
