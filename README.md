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

## Editing the website (Pages CMS)

The committee on the Contact Us page is edited in Pages CMS. No coding is needed.

**To make a change**

1. Click **Admin** at the bottom of any page on the site, or go to https://app.pagescms.org.
2. Sign in with your email (you'll be sent a 6-digit code) or with GitHub.
3. Open **Committee**, then edit, add or delete a person and click **Save**.
4. The site updates by itself within a few minutes.

Roles are separated by commas. People with a lower display order appear first. Square photos work best.

**To give someone access**

- **To edit only:** someone who already has GitHub access opens the site in Pages CMS, goes to **Collaborators**, and invites the person by email. They don't need a GitHub account.
- **To take over running the site:** add the person to the [Effective-Altruism-Durham](https://github.com/Effective-Altruism-Durham) GitHub organisation with write access to this repository. They can then sign in to Pages CMS with GitHub and invite editors themselves. Only GitHub users can invite people, so always keep at least one current committee member in the organisation.

Don't rename this repository. Pages CMS links invites to the repository's name, so after a rename every editor has to be invited again, and the Admin link in `src/components/SiteFooter.astro` must be updated.
