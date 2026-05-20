# Exact Reference Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the EA Durham Astro header, footer, and homepage so they visually match the local Wix reference homepage while preserving the modern Astro, Tailwind v4, pnpm, Netlify, and future Storyblok-ready backend direction.

**Architecture:** Keep the implementation small and page-focused: shared site chrome in `src/layouts/Layout.astro`, dropdown behavior in `src/components/NavigationDropdown.astro`, global tokens in `src/styles/global.css`, and homepage content in structured constants in `src/pages/index.astro`. Do not copy Wix runtime markup; reproduce the visible result with semantic Astro and Tailwind classes.

**Tech Stack:** Astro 6, Tailwind CSS v4, pnpm 11.1.3, Netlify forms, future Storyblok content migration.

---

## File Structure Map

- Modify `src/styles/global.css`: define the reference-style design tokens and global element defaults.
- Modify `src/components/NavigationDropdown.astro`: simplify dropdowns to match the reference header.
- Modify `src/layouts/Layout.astro`: replace the current modern sticky/glass shell with a reference-style header, plain mobile nav, main slot, and plain legal footer.
- Modify `src/pages/index.astro`: replace the modern landing page with a structured exact-reference homepage.
- Do not edit `src/pages/causes.astro` or `src/pages/contact-us.astro` in this milestone.
- Do not stage unrelated dirty files already present in the worktree.

## Reference Content Snapshot

Use this visible homepage text extracted from `reference_site/index.html`:

```text
We aspire to do the most good we can
We represent the Effective Altruism movement in Durham University. By reasoning carefully and considering evidence, we can maximise our positive impact on the world.
We empower students who want to make a change through our programmes, events, and community.
Get involved
Join the mailing list
What is Effective Altruism?
Effective Altruism is a framework for applying evidence-based reasoning to the world's most pressing problems. It's also a practical community sharing diverse views on which problems to prioritise and how to tackle them.
Arete Fellowship
An 8-week seminar programme aimed to introduce you to ideas from various disciplines for making a positive impact on the world.
Learn more
What we do
IDEA FELLOWSHIP
An 8-week continuation from the Arete Fellowship. Dive deeper into problems that you find interesting!
SPEAKER EVENTS
We regularly invite external guest speakers in to talk about a wide range of topics!
CAREER PLANNING
Explore career path, network with professionals, and feel prepared to pursue an impactful career!
Contact us
First name
Last name
Email
Subject
Message
Submit
Thank you for submitting!
```

Use this footer text exactly where practical:

```text
Effective Altruism Durham is a Durham SU student group whose details are: Durham Students’ Union (also known as Durham SU or DSU) is a charity registered in England and Wales (1145400) and a company limited by guarantee (07689815), and its principal address is Dunelm House, New Elvet, DURHAM, County Durham, DH1 3AN.
```

### Task 1: Baseline Inspection And Guardrails

**Files:**
- Read: `reference_site/index.html`
- Read: `src/layouts/Layout.astro`
- Read: `src/components/NavigationDropdown.astro`
- Read: `src/pages/index.astro`
- Read: `src/styles/global.css`

- [ ] **Step 1: Confirm worktree state before editing**

Run:

```bash
git status --short
```

Expected: Existing unrelated changes may be present. Record them mentally and do not stage them. The plan-owned files are only `src/styles/global.css`, `src/components/NavigationDropdown.astro`, `src/layouts/Layout.astro`, and `src/pages/index.astro`.

- [ ] **Step 2: Re-extract the reference homepage visible text**

Run:

```bash
perl -0pe 's/<script\b[^>]*>.*?<\/script>//gis; s/<style\b[^>]*>.*?<\/style>//gis; s/<[^>]+>/\n/g; s/&nbsp;/ /g; s/&amp;/\&/g; s/&#39;/'"'"'/g; s/&quot;/"/g; s/\n[ \t]+/\n/g; s/[ \t]+\n/\n/g; s/\n{2,}/\n/g' reference_site/index.html | sed -n '1,180p'
```

Expected: Output includes the reference header labels, homepage section text, contact form labels, and footer text shown in the reference snapshot above.

- [ ] **Step 3: Inspect current implementation files**

Run:

```bash
sed -n '1,260p' src/layouts/Layout.astro
sed -n '1,220p' src/components/NavigationDropdown.astro
sed -n '1,340p' src/pages/index.astro
sed -n '1,180p' src/styles/global.css
```

Expected: Current files show the modern landing-page implementation that will be replaced in later tasks.

### Task 2: Reference-Style Global Tokens

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Replace `src/styles/global.css` with reference-style tokens**

Use `apply_patch` to replace the file with:

```css
@import "tailwindcss";

@theme {
  --color-ea-cream: #f4efe9;
  --color-ea-beige: #f4efe9;
  --color-ea-white: #ffffff;
  --color-ea-dark-teal: #054d5a;
  --color-ea-active-teal: #0c869b;
  --color-ea-text-primary: #1f2a2d;
  --color-ea-text-secondary: #404040;
  --font-ea-heading: "Roboto Slab", Georgia, serif;
  --font-ea-body: "Raleway", Arial, sans-serif;
}

html,
body {
  min-height: 100%;
  margin: 0;
  padding: 0;
  background: var(--color-ea-cream);
  color: var(--color-ea-text-primary);
  font-family: var(--font-ea-body);
}

html {
  scroll-behavior: smooth;
}

body {
  width: 100%;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
textarea {
  font: inherit;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  color: var(--color-ea-dark-teal);
  font-family: var(--font-ea-heading);
}
```

Expected: New files can use `ea-cream`, while the existing `ea-beige` alias keeps untouched pages compiling until their separate styling pass.

- [ ] **Step 2: Run a fast style token sanity check**

Run:

```bash
rg -n "gradient|blur-3xl|rounded-3xl|animate-ping|animate-pulse" src/styles/global.css src/layouts/Layout.astro src/components/NavigationDropdown.astro src/pages/index.astro
```

Expected: Matches may still exist in the files not yet updated. `src/styles/global.css` should have no matches.

- [ ] **Step 3: Commit global token changes only**

Run:

```bash
rtk git add src/styles/global.css
rtk git commit -m "style: reset global tokens to reference palette"
```

Expected: Commit succeeds. Unrelated dirty files remain unstaged.

### Task 3: Reference-Style Dropdown Component

**Files:**
- Modify: `src/components/NavigationDropdown.astro`

- [ ] **Step 1: Replace `NavigationDropdown.astro` with a plain dropdown**

Use `apply_patch` to replace the file with:

```astro
---
interface NavItem {
  label: string;
  href: string;
}

interface Props {
  title: string;
  href: string;
  items: NavItem[];
}

const { title, href, items } = Astro.props;
---

<div class="relative group">
  <a
    href={href}
    class="inline-flex items-center gap-1 py-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-ea-dark-teal transition-colors hover:text-ea-active-teal focus:text-ea-active-teal focus:outline-none"
  >
    <span>{title}</span>
    <span aria-hidden="true" class="text-[10px] leading-none">▾</span>
  </a>

  <div
    class="absolute left-0 top-full z-40 hidden min-w-64 border border-ea-dark-teal/20 bg-ea-cream py-2 shadow-sm group-hover:block group-focus-within:block"
  >
    {
      items.map((item) => (
        <a
          href={item.href}
          class="block px-4 py-2 text-sm font-medium text-ea-dark-teal transition-colors hover:bg-ea-dark-teal hover:text-white focus:bg-ea-dark-teal focus:text-white focus:outline-none"
        >
          {item.label}
        </a>
      ))
    }
  </div>
</div>
```

Expected: Dropdowns are flat, cream-backed, and keyboard-visible via `focus-within`.

- [ ] **Step 2: Check old modern dropdown classes are gone**

Run:

```bash
rg -n "backdrop|rounded-xl|translate-y|opacity-0|invisible|shadow-xl|rotate-180" src/components/NavigationDropdown.astro
```

Expected: No output.

- [ ] **Step 3: Commit dropdown changes only**

Run:

```bash
rtk git add src/components/NavigationDropdown.astro
rtk git commit -m "style: simplify navigation dropdowns"
```

Expected: Commit succeeds. Unrelated dirty files remain unstaged.

### Task 4: Reference-Style Header And Footer

**Files:**
- Modify: `src/layouts/Layout.astro`

- [ ] **Step 1: Replace `Layout.astro` with the reference-style shell**

Use `apply_patch` to replace the file with:

```astro
---
import '../styles/global.css';
import NavigationDropdown from '../components/NavigationDropdown.astro';

interface Props {
  title: string;
}

const { title } = Astro.props;

const programmesItems = [
  { label: 'Arete Fellowship', href: '/programmes#arete' },
  { label: 'IDEA Fellowship', href: '/programmes#idea' },
];

const opportunitiesItems = [
  { label: 'Free 1-1 Careers Advice: 80,000 Hours', href: '/opportunities#careers-advice' },
  { label: 'Current Opportunities', href: '/opportunities#current-opportunities' },
];

const causesItems = [
  { label: 'AI Safety', href: '/causes#ai-safety' },
  { label: 'Animal Advocacy', href: '/causes#animal-advocacy' },
  { label: 'Biosecurity', href: '/causes#biosecurity' },
];

const legalText = 'Effective Altruism Durham is a Durham SU student group whose details are: Durham Students’ Union (also known as Durham SU or DSU) is a charity registered in England and Wales (1145400) and a company limited by guarantee (07689815), and its principal address is Dunelm House, New Elvet, DURHAM, County Durham, DH1 3AN.';
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="generator" content={Astro.generator} />
    <title>{title} | EA Durham</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&family=Roboto+Slab:wght@400;600;700&display=swap" rel="stylesheet" />
  </head>
  <body class="min-h-screen bg-ea-cream font-ea-body text-ea-text-primary">
    <header class="border-b border-ea-dark-teal/15 bg-ea-cream">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <a href="/" class="text-ea-dark-teal transition-colors hover:text-ea-active-teal focus:text-ea-active-teal focus:outline-none">
          <span class="block font-ea-heading text-[22px] font-bold leading-[1.05] tracking-tight">Effective</span>
          <span class="block font-ea-heading text-[22px] font-bold leading-[1.05] tracking-tight">Altruism Durham</span>
        </a>

        <nav class="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          <NavigationDropdown title="Programmes" href="/programmes" items={programmesItems} />
          <NavigationDropdown title="Opportunities" href="/opportunities" items={opportunitiesItems} />
          <NavigationDropdown title="Causes" href="/causes" items={causesItems} />
          <a href="/events" class="py-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-ea-dark-teal transition-colors hover:text-ea-active-teal focus:text-ea-active-teal focus:outline-none">Events</a>
          <a href="/contact-us" class="py-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-ea-dark-teal transition-colors hover:text-ea-active-teal focus:text-ea-active-teal focus:outline-none">Contact Us</a>
        </nav>

        <button
          id="mobile-menu-button"
          type="button"
          class="md:hidden border border-ea-dark-teal/30 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-ea-dark-teal"
          aria-controls="mobile-menu"
          aria-expanded="false"
        >
          More
        </button>
      </div>

      <nav id="mobile-menu" class="hidden border-t border-ea-dark-teal/15 bg-ea-cream px-5 py-4 md:hidden" aria-label="Mobile navigation">
        <div class="mx-auto grid max-w-6xl gap-3 text-sm font-semibold uppercase tracking-[0.12em] text-ea-dark-teal">
          <a href="/programmes">Programmes</a>
          <a href="/programmes#arete" class="pl-4 text-xs normal-case tracking-normal">Arete Fellowship</a>
          <a href="/programmes#idea" class="pl-4 text-xs normal-case tracking-normal">IDEA Fellowship</a>
          <a href="/opportunities">Opportunities</a>
          <a href="/opportunities#careers-advice" class="pl-4 text-xs normal-case tracking-normal">Free 1-1 Careers Advice: 80,000 Hours</a>
          <a href="/opportunities#current-opportunities" class="pl-4 text-xs normal-case tracking-normal">Current Opportunities</a>
          <a href="/causes">Causes</a>
          <a href="/causes#ai-safety" class="pl-4 text-xs normal-case tracking-normal">AI Safety</a>
          <a href="/causes#animal-advocacy" class="pl-4 text-xs normal-case tracking-normal">Animal Advocacy</a>
          <a href="/causes#biosecurity" class="pl-4 text-xs normal-case tracking-normal">Biosecurity</a>
          <a href="/events">Events</a>
          <a href="/contact-us">Contact Us</a>
        </div>
      </nav>
    </header>

    <main>
      <slot />
    </main>

    <footer class="bg-ea-dark-teal px-5 py-10 text-white sm:px-8">
      <div class="mx-auto max-w-6xl">
        <p class="max-w-5xl text-sm leading-7">{legalText}</p>
      </div>
    </footer>

    <script is:inline>
      const menuButton = document.getElementById('mobile-menu-button');
      const mobileMenu = document.getElementById('mobile-menu');

      menuButton?.addEventListener('click', () => {
        const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', String(!isOpen));
        mobileMenu?.classList.toggle('hidden', isOpen);
      });
    </script>
  </body>
</html>
```

Expected: Header/footer no longer use blurred sticky styling, rounded controls, logo image, or large multi-column footer.

- [ ] **Step 2: Check shell no longer uses modern visual effects**

Run:

```bash
rg -n "sticky|backdrop|rounded-xl|rounded-lg|shadow-xl|shadow-sm|bg-ea-beige|blur|grid-cols-1 md:grid-cols-2|Quick Navigation" src/layouts/Layout.astro
```

Expected: No output.

- [ ] **Step 3: Build after shell replacement**

Run:

```bash
pnpm run build
```

Expected: Build completes successfully. If it fails because Storyblok environment variables are required, capture the exact error and do not claim success.

- [ ] **Step 4: Commit shell changes only**

Run:

```bash
rtk git add src/layouts/Layout.astro
rtk git commit -m "style: recreate reference site shell"
```

Expected: Commit succeeds. Unrelated dirty files remain unstaged.

### Task 5: Exact-Reference Homepage Content And Layout

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Replace `index.astro` with structured reference content**

Use `apply_patch` to replace the file with:

```astro
---
import Layout from '../layouts/Layout.astro';

const homepageHero = {
  title: 'We aspire to do the most good we can',
  paragraphs: [
    'We represent the Effective Altruism movement in Durham University. By reasoning carefully and considering evidence, we can maximise our positive impact on the world.',
    'We empower students who want to make a change through our programmes, events, and community.',
  ],
  actions: [
    { label: 'Get involved', href: '/opportunities' },
    {
      label: 'Join the mailing list',
      href: 'https://outlook.office365.com/owa/effectivealtruismdurham@durhamuniversity.onmicrosoft.com/groupsubscription.ashx?action=join&source=MSExchange/LokiServer&guid=d19d28fc-165b-4f90-ae3c-7cc8ec3697c6',
    },
  ],
};

const arete = {
  title: 'Arete Fellowship',
  body: 'An 8-week seminar programme aimed to introduce you to ideas from various disciplines for making a positive impact on the world.',
  href: '/programmes#arete',
};

const activityItems = [
  {
    title: 'IDEA FELLOWSHIP',
    body: 'An 8-week continuation from the Arete Fellowship. Dive deeper into problems that you find interesting!',
  },
  {
    title: 'SPEAKER EVENTS',
    body: 'We regularly invite external guest speakers in to talk about a wide range of topics!',
  },
  {
    title: 'CAREER PLANNING',
    body: 'Explore career path, network with professionals, and feel prepared to pursue an impactful career!',
  },
];
---

<Layout title="HOME">
  <section class="px-5 py-16 sm:px-8 sm:py-24">
    <div class="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
      <div>
        <h1 class="max-w-2xl text-5xl font-bold leading-[1.08] text-ea-dark-teal sm:text-6xl">
          {homepageHero.title}
        </h1>
      </div>
      <div class="space-y-6 text-lg leading-8 text-ea-text-secondary">
        {homepageHero.paragraphs.map((paragraph) => <p>{paragraph}</p>)}
        <div class="flex flex-wrap gap-4 pt-2">
          {homepageHero.actions.map((action) => (
            <a
              href={action.href}
              class="border border-ea-dark-teal px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-ea-dark-teal transition-colors hover:bg-ea-dark-teal hover:text-white focus:bg-ea-dark-teal focus:text-white focus:outline-none"
            >
              {action.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  </section>

  <section class="border-y border-ea-dark-teal/15 bg-white px-5 py-16 sm:px-8">
    <div class="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-start">
      <h2 class="text-4xl font-bold leading-tight text-ea-dark-teal sm:text-5xl">
        What is<br />Effective<br />Altruism?
      </h2>
      <p class="max-w-3xl text-lg leading-8 text-ea-text-secondary">
        <strong class="font-semibold text-ea-dark-teal">Effective Altruism</strong> is a framework for applying evidence-based reasoning to <strong class="font-semibold text-ea-dark-teal">the world's most pressing problems</strong>. It's also a practical community sharing diverse views on which problems to prioritise and how to tackle them.
      </p>
    </div>
  </section>

  <section class="px-5 py-16 sm:px-8">
    <div class="mx-auto max-w-6xl border-y border-ea-dark-teal/20 py-12">
      <div class="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
        <h2 class="text-4xl font-bold text-ea-dark-teal">{arete.title}</h2>
        <div class="space-y-6">
          <p class="text-lg leading-8 text-ea-text-secondary">{arete.body}</p>
          <a
            href={arete.href}
            class="inline-block border border-ea-dark-teal px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-ea-dark-teal transition-colors hover:bg-ea-dark-teal hover:text-white focus:bg-ea-dark-teal focus:text-white focus:outline-none"
          >
            Learn more
          </a>
        </div>
      </div>
    </div>
  </section>

  <section class="bg-white px-5 py-16 sm:px-8">
    <div class="mx-auto max-w-6xl">
      <h2 class="mb-10 text-4xl font-bold text-ea-dark-teal">What we do</h2>
      <div class="grid gap-8 md:grid-cols-3">
        {activityItems.map((item) => (
          <article class="border-t-2 border-ea-dark-teal pt-6">
            <h3 class="mb-5 text-2xl font-bold leading-tight text-ea-dark-teal">{item.title}</h3>
            <p class="text-base leading-7 text-ea-text-secondary">{item.body}</p>
          </article>
        ))}
      </div>
    </div>
  </section>

  <section id="contact" class="px-5 py-16 sm:px-8">
    <div class="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.7fr_1.3fr]">
      <h2 class="text-4xl font-bold text-ea-dark-teal">Contact us</h2>

      <form name="contact" method="POST" data-netlify="true" action="/success" class="grid gap-5">
        <input type="hidden" name="form-name" value="contact" />

        <div class="grid gap-5 sm:grid-cols-2">
          <label class="grid gap-2 text-sm font-semibold text-ea-dark-teal">
            <span>First name</span>
            <input name="firstName" type="text" required class="border border-ea-dark-teal/30 bg-white px-4 py-3 text-ea-text-primary outline-none focus:border-ea-dark-teal" />
          </label>
          <label class="grid gap-2 text-sm font-semibold text-ea-dark-teal">
            <span>Last name</span>
            <input name="lastName" type="text" required class="border border-ea-dark-teal/30 bg-white px-4 py-3 text-ea-text-primary outline-none focus:border-ea-dark-teal" />
          </label>
        </div>

        <label class="grid gap-2 text-sm font-semibold text-ea-dark-teal">
          <span>Email</span>
          <input name="email" type="email" required class="border border-ea-dark-teal/30 bg-white px-4 py-3 text-ea-text-primary outline-none focus:border-ea-dark-teal" />
        </label>

        <label class="grid gap-2 text-sm font-semibold text-ea-dark-teal">
          <span>Subject</span>
          <input name="subject" type="text" required class="border border-ea-dark-teal/30 bg-white px-4 py-3 text-ea-text-primary outline-none focus:border-ea-dark-teal" />
        </label>

        <label class="grid gap-2 text-sm font-semibold text-ea-dark-teal">
          <span>Message</span>
          <textarea name="message" rows="5" required class="border border-ea-dark-teal/30 bg-white px-4 py-3 text-ea-text-primary outline-none focus:border-ea-dark-teal"></textarea>
        </label>

        <button type="submit" class="justify-self-start border border-ea-dark-teal bg-ea-dark-teal px-8 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-ea-active-teal focus:bg-ea-active-teal focus:outline-none">
          Submit
        </button>
      </form>
    </div>
  </section>
</Layout>
```

Expected: The homepage section order and visible copy match the reference snapshot. The design is flat, cream/white/teal, and no longer uses the modern landing-page sections.

- [ ] **Step 2: Verify removed modern homepage elements**

Run:

```bash
rg -n "gradient|blur|badge|animate|rounded-2xl|rounded-3xl|shadow|Video Thumbnail|Watch Introductory|Core Framework|Flagship Programme|Our Activities|Connect With Us" src/pages/index.astro
```

Expected: No output.

- [ ] **Step 3: Verify reference text is present**

Run:

```bash
rg -n "We aspire to do the most good we can|We represent the Effective Altruism movement|Join the mailing list|What is Effective Altruism\\?|Arete Fellowship|IDEA FELLOWSHIP|SPEAKER EVENTS|CAREER PLANNING|Contact us" src/pages/index.astro
```

Expected: Output contains each phrase.

- [ ] **Step 4: Build after homepage replacement**

Run:

```bash
pnpm run build
```

Expected: Build completes successfully. If it fails because Storyblok environment variables are required, capture the exact error and do not claim success.

- [ ] **Step 5: Commit homepage changes only**

Run:

```bash
rtk git add src/pages/index.astro
rtk git commit -m "style: recreate reference homepage"
```

Expected: Commit succeeds. Unrelated dirty files remain unstaged.

### Task 6: Cross-Page Shell Compatibility

**Files:**
- Verify: `src/pages/causes.astro`
- Verify: `src/pages/contact-us.astro`
- Verify: `src/pages/programmes.astro`
- Verify: `src/pages/opportunities.astro`
- Verify: `src/pages/events.astro`

- [ ] **Step 1: Search for removed token usage outside touched files**

Run:

```bash
rg -n "ea-beige" src
```

Expected: Output may show existing non-homepage pages still using `ea-beige`. This is acceptable because Task 2 preserved the `ea-beige` compatibility alias.

- [ ] **Step 2: Run full production build**

Run:

```bash
pnpm run build
```

Expected: Build completes successfully. If it fails because a required Storyblok token is missing, capture the exact error and document that verification is blocked by environment configuration.

- [ ] **Step 3: Confirm package-manager hygiene**

Run:

```bash
find . -maxdepth 2 -name package-lock.json -o -name yarn.lock -o -name bun.lock -o -name bun.lockb
```

Expected: No output.

### Task 7: Final Visual Review Checklist

**Files:**
- Verify: `src/layouts/Layout.astro`
- Verify: `src/components/NavigationDropdown.astro`
- Verify: `src/pages/index.astro`

- [ ] **Step 1: Start the Astro dev server**

Run:

```bash
pnpm run dev
```

Expected: Dev server starts on `http://localhost:4321/` or another available Astro port.

- [ ] **Step 2: Compare homepage content against the reference export**

Open:

```text
http://localhost:4321/
reference_site/index.html
```

Expected:

- Header looks like the reference header rather than the old Astro glass header.
- Footer is the plain legal footer rather than the old multi-column marketing footer.
- Homepage section order matches the reference.
- Reference homepage copy appears in the Astro page.
- Current modern hero, video card, decorative grid, icon-card treatment, and dark fellowship callout are gone.

- [ ] **Step 3: Check dependent routes still render**

Open:

```text
http://localhost:4321/causes
http://localhost:4321/contact-us
```

Expected: Both pages render with the new shared header/footer. Their page layouts are not rebuilt in this milestone.

- [ ] **Step 4: Stop the dev server**

Stop the running `pnpm run dev` process with `Ctrl-C`.

Expected: No long-running dev server remains after review.

### Task 8: Final Status And Staging Check

**Files:**
- Verify: Git status

- [ ] **Step 1: Confirm only intended implementation files were committed**

Run:

```bash
git status --short
```

Expected: The only remaining dirty files are unrelated pre-existing files, if any. The implementation commits should cover only:

- `src/styles/global.css`
- `src/components/NavigationDropdown.astro`
- `src/layouts/Layout.astro`
- `src/pages/index.astro`

- [ ] **Step 2: Summarize verification evidence**

Report:

```text
Build: pnpm run build -> pass or blocked with exact error
Visual review: / compared against reference_site/index.html -> pass or remaining differences listed
Dependent routes: /causes and /contact-us render -> pass or exact issue listed
Package hygiene: no package-lock/yarn/bun lockfiles -> pass
```

Expected: The user gets concrete evidence and any residual visual differences are named directly.
