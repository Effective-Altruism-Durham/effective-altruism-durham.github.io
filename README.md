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
the EA Durham homepage blocks below, `/` falls back to the current static Astro
homepage so the starter blueprint `teaser` block does not blank or replace the
site by accident.

Create a `page` content type with a `body` blocks field. For the homepage body,
use these nestable blocks:

| Storyblok component       | Fields                                                                 |
| :------------------------ | :--------------------------------------------------------------------- |
| `home_hero`               | `headline`, `body` rich text, `primary_label`, `primary_link`, `secondary_label`, `secondary_link` |
| `home_what_is_ea`         | `heading`, `body` rich text, `video_url`                               |
| `home_arete_fellowship`   | `heading`, `body`, `cta_label`, `cta_link`                             |
| `home_what_we_do`         | `heading`, `cards` blocks using `home_programme_card`                  |
| `home_programme_card`     | `label`, `text`                                                        |
| `home_social_links`       | `links` blocks or entries with `label` and `link`                      |
| `home_contact`            | `heading`                                                              |

The blueprint-style `teaser`, `grid`, and `feature` blocks are also registered
for future Storyblok pages. New non-home stories are served by
`src/pages/[...slug].astro`.
