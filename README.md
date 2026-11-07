# EA Durham website

The website for Effective Altruism Durham, live at
https://effective-altruism-durham.github.io/.

- **Changing the committee list** (names, roles, emails, bios, photos): use Pages CMS, below. No coding needed.
- **Events:** the Events page shows the society's Instagram feed (through a Common Ninja widget), so posting on Instagram is enough.
- **Changing anything else** (page text, programmes, images): edit the files in `src/pages/` and `src/components/` on GitHub, or ask someone comfortable with code. Every change to `main` goes live automatically.

## Editing the committee (Pages CMS)

**To make a change**

1. Click **Admin** at the bottom of any page on the site, or go to https://app.pagescms.org.
2. Sign in with your email (you'll be sent a 6-digit code) or with GitHub.
3. Open **Committee**, then edit, add or delete a person and click **Save**.
4. The site updates by itself within a few minutes.

Roles are separated by commas. People with a lower display order appear first. Square photos work best.

When someone leaves the committee, tick **Past member** instead of deleting them. They move to a "See alumni" list under the committee, which shows their roles but not their email or bio. You can add their years on the committee, what they do now, and a LinkedIn link.

**To give someone access**

- **To edit only:** someone who already has GitHub access opens the site in Pages CMS, goes to **Collaborators**, and invites the person by email. They don't need a GitHub account.
- **Anyone with write or admin access to this repository on GitHub** can sign in to Pages CMS with GitHub straight away and invite others.

## Handing over to a new maintainer

Do this before you leave, or nobody will be able to add editors:

1. Add the new maintainer to the [Effective-Altruism-Durham](https://github.com/Effective-Altruism-Durham) GitHub organisation, with write or admin access to this repository. That also gives them Pages CMS.
2. Make sure at least one current committee member is an **owner** of the organisation.
3. Point them at this README.

Don't move this repository to a different GitHub account or organisation: Pages CMS deletes every email invite when a repository is transferred, so editors would need inviting again. Renaming it is fine, but update the Admin link in `src/components/SiteFooter.astro` to the new name.

## What runs by itself

- **Publishing:** every change to `main` (including Pages CMS saves) is built and published to GitHub Pages by `.github/workflows/deploy.yml`. Check the **Actions** tab if a change doesn't appear.
- **Checks:** every pull request is type-checked and built by `.github/workflows/ci.yml`. A red check blocks merging.
- **Updates:** Dependabot opens weekly pull requests for dependency updates. Minor and patch updates merge themselves once the checks pass. Major updates (for example a new Astro version) wait for someone to review them.

## For developers

This is an [Astro](https://astro.build) site with Tailwind CSS, built as plain static files. Use pnpm (not npm, yarn or bun) with Node 24 or newer.

| Command | Action |
| :--- | :--- |
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start a local dev server at `localhost:4321` |
| `pnpm check` | Type-check |
| `pnpm build` | Build the production site to `./dist/` |
| `pnpm preview` | Preview the production build locally |

- `src/pages/`: one file per page. `src/components/`: shared sections. `src/styles/global.css`: colours, fonts and shared styles.
- `content/team-members/`: one JSON file per committee member, edited by Pages CMS (`.pages.yml`) and checked at build time by `src/content.config.ts`.
- Page images live in `src/assets/` and are optimised automatically; CMS uploads go in `public/uploads/`.
- `AGENTS.md` has the detailed conventions and gotchas (also used by AI coding assistants).
