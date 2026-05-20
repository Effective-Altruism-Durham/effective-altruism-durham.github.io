# Causes Page Implementation Plan

**Goal:** Create a premium "Causes" page in the Astro setup featuring the three core Effective Altruism cause areas: AI Safety, Animal Advocacy, and Biosecurity & Pandemics, with a clean layout, solid borders, and structured frontmatter.

**Architecture:** A standalone Astro page (`src/pages/causes.astro`) leveraging the existing `Layout.astro` component. Content is modeled as a structured array of JavaScript objects in the frontmatter to facilitate future integration with a Headless CMS like Storyblok.

**Tech Stack:** Astro, HTML5, Vanilla CSS / Tailwind CSS, Git.

---

### Task 1: Create Causes Page

**Files:**
- Create: `src/pages/causes.astro`

- [ ] **Step 1: Check existing causes images**
  Verify the three required images exist in the `public/assets/causes/` folder:
  - `67772eaaa8174950975992b1e23d8c02.jpg` (AI Safety)
  - `Cow.jpg` (Animal Advocacy)
  - `Vaccine Production Line.jpg` (Biosecurity & Pandemics)

- [ ] **Step 2: Create the Astro page with structured data frontmatter**
  Write the causes data array in `src/pages/causes.astro` and render the page using `Layout.astro` matching the global design guidelines with solid borders and premium layouts with absolutely NO gradients or glowing effects.
  Ensure card elements have `id` attributes matching `ai-safety`, `animal-advocacy`, and `biosecurity` to handle navbar anchors correctly.

- [ ] **Step 3: Run the project build**
  Verify that the site builds successfully without compilation errors.
  Run command: `rtk pnpm run build`

- [ ] **Step 4: Commit the new page**
  Add the causes file to git and make the feature commit.
  Run commands:
  ```bash
  rtk git add src/pages/causes.astro
  rtk git commit -m "feat: add Causes page with AGI safety, animal welfare, and biosecurity segments"
  ```

- [ ] **Step 5: Verify the git status**
  Confirm the workspace is clean and the commit has been successfully created.
  Run command: `rtk git status`
