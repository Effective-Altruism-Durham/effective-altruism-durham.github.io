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

## Editing content (Pages CMS)

Committee members on the Contact Us page are edited in [Pages CMS](https://app.pagescms.org),
linked from "Admin" in the site footer. No coding or GitHub knowledge is needed:

1. Once, a repo admin signs in to https://app.pagescms.org with GitHub and installs the
   Pages CMS GitHub app on this repository when prompted. Then, for each editor, they open
   the site in Pages CMS and invite the editor by email under **Collaborators**.
2. The editor signs in at https://app.pagescms.org with that email (Pages CMS sends a
   one-time code), opens **Committee**, and edits, adds or removes people.
3. Saving publishes the change; the site redeploys in a couple of minutes.

The editable fields are defined in `.pages.yml`.
