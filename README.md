# EA Durham Site

This project uses pnpm for dependency management. Do not use npm, yarn, or bun in
this workspace, and do not commit lockfiles from other package managers.

## Project Structure

This is an Astro site. The main project folders are:

```text
/
├── public
├── src
│   ├── components
│   ├── layouts
│   └── pages
└── package.json
```

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`         | Installs dependencies                            |
| `pnpm run dev`         | Starts local dev server at `localhost:4321`      |
| `pnpm run build`       | Builds the production site to `./dist/`          |
| `pnpm run preview`     | Previews the production build locally            |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## Storyblok

The site is wired for Storyblok through `@storyblok/astro`. Add your preview or
delivery token in `.env`:

```sh
STORYBLOK_DELIVERY_API_TOKEN=<YOUR_TOKEN>
```

The homepage fetches the Storyblok story at `home`. Until that story contains
the reusable section blocks below, `/` falls back to the current static Astro
homepage so incomplete Storyblok setup does not blank or replace the site by
accident.

The homepage Storyblok schema is documented in `docs/storyblok/homepage-schema.md`. Keep the Storyblok UI schema and Astro renderers in sync: adding a field in Storyblok has no effect until Astro renders it, and adding a fallback in Astro is not visually editable until the field exists in Storyblok.

New non-home stories are served by `src/pages/[...slug].astro`. Add new
Storyblok components in `src/storyblok/` and register them in
`astro.config.mjs` before using them in Storyblok.
