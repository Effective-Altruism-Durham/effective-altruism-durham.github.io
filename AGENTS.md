# EA Durham Site Notes

## Tooling

- Stack: pnpm, Astro 7, Tailwind CSS v4, Pages CMS, deployed to GitHub Pages.
- Use pnpm for every package-manager command in this workspace.
- Do not use npm, yarn, or bun to install dependencies or run scripts.
- Keep `pnpm-lock.yaml` as the only package-manager lockfile. The repo also ignores other lockfiles.
- The project pins pnpm via `packageManager` in `package.json` and requires Node `>=24`.
- Corepack is optional; the project convention is simply pnpm.

## Commands

- `pnpm install` installs dependencies.
- `pnpm run dev` starts the Astro dev server.
- `pnpm run build` is the production build; `pnpm check` type-checks. CI (`.github/workflows/ci.yml`) runs both on every PR. No credentials are needed.
- Dependabot (`.github/dependabot.yml`) opens one weekly PR for minor/patch npm bumps and one for GitHub Actions. `.github/workflows/dependabot-automerge.yml` queues non-major ones for auto-merge, which waits for the required "Type-check and build" check. Majors are upgraded by hand; Astro and `@types/node` majors are ignored entirely (`@types/node` tracks the Node 24 runtime).
- `pnpm run preview` previews the built site.
- `pnpm astro ...` runs Astro CLI commands through the repo package manager.

## Project Shape

- This is an Astro 7 site using Tailwind CSS v4 through `@tailwindcss/vite`.
- `astro.config.mjs` sets `site: 'https://effective-altruism-durham.github.io'` and builds a pure static site (no adapter). `.github/workflows/deploy.yml` publishes `dist/` to GitHub Pages on every push to `main`.
- Routes live in `src/pages/*.astro`; shared page chrome is in `src/layouts/Layout.astro`; reusable UI is in `src/components/`.
- Global styling and Tailwind theme utilities live in `src/styles/global.css`.
- Page images live in `src/assets/` and are rendered with `<Image>` from `astro:assets`, which resizes them and converts them to WebP at build time. Import new images from there rather than adding them to `public/`.
- `public/` holds files that must keep a fixed URL: the favicon, CMS media uploads (`public/uploads/`) and the default team photo (`public/assets/contact-us/`). Team photos are still optimised: `src/lib/cms-images.ts` maps their public paths to imported images.

## Content (Pages CMS)

- Committee members are the only CMS-managed content: one JSON file per person in `content/team-members/`, loaded by the `team` content collection (`src/content.config.ts`) and `src/lib/team.ts`.
- Non-technical editors use [Pages CMS](https://pagescms.org) at https://app.pagescms.org (the footer "Admin" link). They sign in with GitHub, or by email after someone with GitHub write access invites them under Collaborators. Saves commit straight to `main`, which redeploys the site. README §Editing the website is the editor-facing guide; keep it short and non-technical.
- Pages CMS keeps email invites across a repo rename but deletes them when the repo is transferred to another owner (`lib/github-webhook-installation.ts` in the Pages CMS source). A rename still breaks the footer Admin link, which hardcodes the repo name.
- `.pages.yml` defines the CMS fields and media folder (`public/uploads`, served as `/uploads`). Keep it in sync with the Zod schema in `src/content.config.ts`; a CMS save that breaks the schema fails the build rather than deploying.

## Editing Guidance

- Prefer small Astro components and Tailwind utility classes over large custom CSS blocks.
- Keep navigation changes in sync between the desktop dropdowns and mobile drawer in `src/components/SiteHeader.astro`.
- Use root-relative links for site routes, matching the existing `/programmes`, `/opportunities`, `/causes`, `/events`, and `/contact-us` pattern.
- Before calling work complete, run `pnpm run build` unless the change is documentation-only.

## Layout and Styling

- The site was ported from a fixed-width Wix site. Desktop sections sit on a centred `980px` canvas (`max-w-[980px]`); new sections should match it, then add mobile behaviour.
- Pages are built from small, page-specific section components, with Tailwind for ordinary styling and a few inline numeric values where exact positioning is needed.
- Tailwind v4 layers matter: keep global resets in `@layer base` in `src/styles/global.css`. Unlayered heading, anchor, or paragraph resets after `@import "tailwindcss"` can override Tailwind utilities such as `mb-*`, `text-white`, and spacing classes.
- Use `public/favicon.svg` directly as the header icon; it already contains the white circular background, so don't nest it in another circle.
- Section dividers (top notches, sloped transitions) are SVG shapes, not borders. Reuse the existing divider SVG paths.
- Check visual changes in a browser at desktop and phone widths.

## Performance and Upgrade Notes

- Fonts (Raleway, Roboto Slab) are self-hosted through Astro's Fonts API (`fonts` in `astro.config.mjs`, `<Font>` in `Layout.astro`) from the `@fontsource-variable/*` packages. Do not re-add the Google Fonts link.
- There is no icon font. Icons are inline SVGs; do not re-add the Font Awesome CDN stylesheet for a single icon.
- `src/styles/global.css` imports Tailwind with `source("..")`, so only `src/` is scanned for class names. Classes written outside `src/` will not be generated.
- `compressHTML: true` is set on purpose. Astro 7's default (`'jsx'`) drops the line break between text and a following inline element, which deletes visible spaces (e.g. before a link that starts on the next line).
- Internal links are prefetched on hover (`prefetch` in `astro.config.mjs`). Add `data-astro-prefetch="false"` to links that should not be.
