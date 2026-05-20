# EA Durham Site Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recreate and modernize the legacy Wix-built EA Durham website into a blazing-fast, static Astro site, keeping its exact typography, color scheme, content, and layout, while migrating the Wix contact form to a native Netlify form.

**Architecture:** A static Astro setup utilizing custom Tailwind CSS v4 variables mapping the exact hex-colors of the reference site, a global unified layout component with responsive navigation dropdowns, and individual static page routes that cleanly divide copy and structure.

**Tech Stack:** Astro, Tailwind CSS v4, Google Fonts, Netlify Forms.

---

### File Structure Map
* **Assets**:
  * Staged in `public/assets/` (e.g. `public/assets/home/`, `public/assets/contact-us/`, etc.)
* **Components**:
  * Create `src/components/NavigationDropdown.astro` (Dropdown hover menu)
* **Layouts**:
  * Modify `src/layouts/Layout.astro` (Header with logo, responsive mobile hamburger, footer)
* **Pages**:
  * Modify `src/pages/index.astro` (Tagline hero, video container, features, Netlify contact form)
  * Create `src/pages/programmes.astro` (Arete & IDEA Fellowships)
  * Create `src/pages/opportunities.astro` (Careers & Opportunities)
  * Create `src/pages/causes.astro` (AI Safety, Animal Advocacy, Biosecurity)
  * Create `src/pages/events.astro` (Timeline and activities list)
  * Create `src/pages/contact-us.astro` (Team profile cards repeater)

---

### Task 1: Stage Static Assets

**Files:**
* Modify: `.gitignore` (ensure assets are tracked)
* Copy directories from `reference_site/assets/` to `public/assets/`

- [ ] **Step 1: Verify asset copy target directories exist**
  Run: `mkdir -p public/assets`
  Expected: Success

- [ ] **Step 2: Copy image assets from reference_site**
  Run: `cp -R reference_site/assets/ public/assets/`
  Expected: Success, all image assets copied to `public/assets/`

- [ ] **Step 3: Staging and Git Commit**
  Run:
  ```bash
  git add public/assets
  git commit -m "chore: stage all static image assets for migration"
  ```
  Expected: Commit succeeds

---

### Task 2: Layout & Global Design Tokens Setup

**Files:**
* Modify: `src/styles/global.css`
* Modify: `src/layouts/Layout.astro`

- [ ] **Step 1: Set up global Tailwind v4 variables and custom styles**
  Replace contents of `src/styles/global.css` with:
  ```css
  @import "tailwindcss";

  @theme {
    --color-ea-beige: #f4efe9;
    --color-ea-dark-teal: #054d5a;
    --color-ea-active-teal: #0c869b;
    --color-ea-text-primary: #1a1a1a;
    --color-ea-text-secondary: #404040;
    --font-ea-heading: "Roboto Slab", serif;
    --font-ea-body: "Raleway", sans-serif;
  }

  html,
  body {
    background-color: var(--color-ea-beige);
    color: var(--color-ea-text-primary);
    font-family: var(--font-ea-body);
    margin: 0;
    padding: 0;
    min-height: 100%;
    width: 100%;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-ea-heading);
    color: var(--color-ea-dark-teal);
  }
  ```

- [ ] **Step 2: Recreate `Layout.astro` template with loaded Google Fonts**
  Modify `src/layouts/Layout.astro`:
  ```astro
  ---
  import '../styles/global.css';
  interface Props {
    title: string;
  }
  const { title } = Astro.props;
  ---

  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <meta name="generator" content={Astro.generator} />
      <title>{title} | EA Durham</title>
      
      <!-- Loaded Google Fonts: Roboto Slab for Headings and Raleway for UI/Body -->
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700&family=Roboto+Slab:wght@400;600;700&family=Libre+Baskerville:ital@0;1&display=swap" rel="stylesheet">
    </head>
    <body class="bg-ea-beige font-ea-body text-ea-text-primary flex flex-col min-h-screen">
      <!-- Layout wrapper will contain slot -->
      <slot />
    </body>
  </html>
  ```

- [ ] **Step 3: Run Astro Check**
  Run: `pnpm run build`
  Expected: Successful compilation

- [ ] **Step 4: Commit Layout changes**
  Run:
  ```bash
  git add src/styles/global.css src/layouts/Layout.astro
  git commit -m "style: configure global design tokens, fonts, and baseline Layout component"
  ```
  Expected: Successful commit

---

### Task 3: Global Header and Dropdown Components

**Files:**
* Create: `src/components/NavigationDropdown.astro`
* Modify: `src/layouts/Layout.astro` (Insert navigation and footer markup)

- [ ] **Step 1: Create Dropdown component**
  Write code to `src/components/NavigationDropdown.astro`:
  ```astro
  ---
  interface Item {
    label: string;
    href: string;
  }
  interface Props {
    label: string;
    href: string;
    items: Item[];
  }
  const { label, href, items } = Astro.props;
  ---

  <div class="relative group">
    <a href={href} class="flex items-center gap-1 font-bold text-ea-dark-teal hover:text-ea-active-teal uppercase transition-colors tracking-wide py-2">
      {label}
      <svg class="w-4 h-4 text-ea-dark-teal group-hover:text-ea-active-teal transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </a>
    
    <div class="absolute left-0 top-full hidden group-hover:block bg-ea-beige border border-ea-dark-teal/10 rounded-md shadow-lg min-w-[200px] z-50 py-2 mt-0 transition-all">
      {items.map((item) => (
        <a href={item.href} class="block px-4 py-2 text-sm text-ea-text-primary hover:bg-ea-active-teal hover:text-white transition-colors font-semibold">
          {item.label}
        </a>
      ))}
    </div>
  </div>
  ```

- [ ] **Step 2: Update `Layout.astro` with persistent Navigation Header and SU Footer**
  Modify `src/layouts/Layout.astro`:
  ```astro
  ---
  import '../styles/global.css';
  import NavigationDropdown from '../components/NavigationDropdown.astro';

  interface Props {
    title: string;
  }
  const { title } = Astro.props;

  const programmesItems = [
    { label: "Overview", href: "/programmes" },
    { label: "Arete Fellowship", href: "https://www.eadurham.org/arete-fellowship" },
    { label: "IDEA Fellowship", href: "https://www.eadurham.org/idea-fellowship" }
  ];

  const opportunitiesItems = [
    { label: "Overview", href: "/opportunities" },
    { label: "Free 1-1 Careers Advice", href: "https://www.eadurham.org/free-careers-advice" },
    { label: "Current Opportunities", href: "https://www.eadurham.org/current-opportunities" }
  ];

  const causesItems = [
    { label: "Overview", href: "/causes" },
    { label: "AI Safety", href: "https://www.eadurham.org/ai-safety" },
    { label: "Animal Advocacy", href: "https://www.eadurham.org/animal-advocacy" },
    { label: "Biosecurity", href: "https://www.eadurham.org/biosecurity" }
  ];
  ---

  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <meta name="generator" content={Astro.generator} />
      <title>{title} | EA Durham</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700&family=Roboto+Slab:wght@400;600;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
    </head>
    <body class="bg-ea-beige font-ea-body text-ea-text-primary flex flex-col min-h-screen">
      
      <!-- STICKY HEADER -->
      <header class="sticky top-0 bg-ea-beige/95 border-b border-ea-dark-teal/10 z-40 backdrop-blur-md">
        <div class="max-w-[980px] mx-auto px-6 py-4 flex items-center justify-between">
          
          <!-- Logo & Brand Title -->
          <a href="/" class="flex items-center gap-3">
            <img src="/assets/contact-us/ead_white_square.png" alt="EA Durham Logo" class="w-12 h-12 object-cover border border-ea-dark-teal/20 rounded-md" />
            <h1 class="text-xl font-bold tracking-tight text-ea-dark-teal m-0 hover:text-ea-active-teal transition-colors">
              Effective Altruism Durham
            </h1>
          </a>
          
          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center gap-6">
            <NavigationDropdown label="Programmes" href="/programmes" items={programmesItems} />
            <NavigationDropdown label="Opportunities" href="/opportunities" items={opportunitiesItems} />
            <NavigationDropdown label="Causes" href="/causes" items={causesItems} />
            <a href="/events" class="font-bold text-ea-dark-teal hover:text-ea-active-teal uppercase tracking-wide transition-colors">Events</a>
            <a href="/contact-us" class="font-bold text-ea-dark-teal hover:text-ea-active-teal uppercase tracking-wide transition-colors">Contact Us</a>
          </nav>

          <!-- Mobile Hamburger Toggle (Implemented natively for fast click) -->
          <button id="menuBtn" class="md:hidden text-ea-dark-teal p-2 focus:outline-none" aria-label="Toggle Menu">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        <!-- Mobile Navigation Menu -->
        <div id="mobileMenu" class="hidden md:hidden bg-ea-beige border-b border-ea-dark-teal/10 px-6 py-4 flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <span class="text-xs font-bold text-ea-active-teal uppercase tracking-wider">Programmes</span>
            {programmesItems.map(item => <a href={item.href} class="pl-3 font-semibold text-ea-text-primary text-sm">{item.label}</a>)}
          </div>
          <div class="flex flex-col gap-2">
            <span class="text-xs font-bold text-ea-active-teal uppercase tracking-wider">Opportunities</span>
            {opportunitiesItems.map(item => <a href={item.href} class="pl-3 font-semibold text-ea-text-primary text-sm">{item.label}</a>)}
          </div>
          <div class="flex flex-col gap-2">
            <span class="text-xs font-bold text-ea-active-teal uppercase tracking-wider">Causes</span>
            {causesItems.map(item => <a href={item.href} class="pl-3 font-semibold text-ea-text-primary text-sm">{item.label}</a>)}
          </div>
          <a href="/events" class="font-bold text-ea-dark-teal text-sm">EVENTS</a>
          <a href="/contact-us" class="font-bold text-ea-dark-teal text-sm">CONTACT US</a>
        </div>
      </header>

      <!-- MAIN PAGE CONTENT SLOT -->
      <main class="flex-grow max-w-[980px] w-full mx-auto px-6 py-8">
        <slot />
      </main>

      <!-- PERSISTENT FOOTER -->
      <footer class="bg-ea-dark-teal text-white py-10 mt-auto border-t border-ea-dark-teal/20">
        <div class="max-w-[980px] mx-auto px-6 text-xs leading-relaxed opacity-90 text-center font-semibold">
          Effective Altruism Durham is a Durham SU student group whose details are: Durham Students’ Union (also known as Durham SU or DSU) is a charity registered in England and Wales (1145400) and a company limited by guarantee (07689815), and its principal address is Dunelm House, New Elvet, DURHAM, County Durham, DH1 3AN.
        </div>
      </footer>

      <!-- Hamburger toggle Script -->
      <script>
        const menuBtn = document.getElementById('menuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        if (menuBtn && mobileMenu) {
          menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
          });
        }
      </script>
    </body>
  </html>
  ```

- [ ] **Step 3: Run Astro build verification**
  Run: `pnpm run build`
  Expected: Successful compilation

- [ ] **Step 4: Commit navigation and footer layout changes**
  Run:
  ```bash
  git add src/components/NavigationDropdown.astro src/layouts/Layout.astro
  git commit -m "feat: implement responsive Header Navigation with dropdown menus and persistent Footer"
  ```
  Expected: Success

---

### Task 4: Home Page & Netlify Form

**Files:**
* Modify: `src/pages/index.astro`

- [ ] **Step 1: Replace default welcome page with EA Durham Home layout and Netlify Form**
  Write code to `src/pages/index.astro`:
  ```astro
  ---
  import Layout from '../layouts/Layout.astro';
  ---

  <Layout title="HOME">
    <!-- SECTION 1: HERO STATEMENT -->
    <section class="py-16 text-center border-b border-ea-dark-teal/10">
      <h2 class="text-4xl md:text-5xl font-extrabold text-ea-dark-teal leading-tight max-w-[800px] mx-auto font-ea-heading">
        We aspire to do the most good we can
      </h2>
    </section>

    <!-- SECTION 2: WHAT IS EFFECTIVE ALTRUISM -->
    <section class="py-16 border-b border-ea-dark-teal/10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div>
        <h3 class="text-2xl font-bold text-ea-dark-teal mb-6 font-ea-heading">What is Effective Altruism?</h3>
        <!-- Mimics Wix video player mockup with clean preview container -->
        <div class="aspect-video bg-neutral-900 flex items-center justify-center rounded-lg shadow-md overflow-hidden relative group">
          <img src="/assets/causes/67772eaaa8174950975992b1e23d8c02.jpg" alt="EA Video Thumbnail" class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform" />
          <a href="https://www.youtube.com/watch?v=Diuv3XZQXyc" target="_blank" rel="noopener" class="z-10 bg-ea-active-teal hover:bg-ea-dark-teal text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110">
            <svg class="w-8 h-8 fill-current ml-1" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </a>
        </div>
      </div>
      <div class="flex flex-col gap-6 justify-center">
        <p class="text-lg leading-relaxed text-ea-text-secondary font-semibold">
          <a href="https://www.effectivealtruism.org/" target="_blank" rel="noreferrer noopener" class="text-ea-active-teal hover:underline font-bold">Effective Altruism</a> is a framework for applying evidence-based reasoning to <a href="https://80000hours.org/problem-profiles/" target="_blank" rel="noreferrer noopener" class="text-ea-active-teal hover:underline font-bold">the world's most pressing problems</a>. It's also a practical community sharing diverse views on which problems to prioritise and how to tackle them.
        </p>
      </div>
    </section>

    <!-- SECTION 3: CORE FELLOWSHIP GRID -->
    <section class="py-16 border-b border-ea-dark-teal/10 text-center">
      <h2 class="text-3xl font-extrabold text-ea-dark-teal mb-4 font-ea-heading">Arete Fellowship</h2>
      <p class="text-md text-ea-text-secondary max-w-[600px] mx-auto leading-relaxed font-semibold mb-8">
        An 8-week seminar programme aimed to introduce you to ideas from various disciplines for making a positive impact on the world.
      </p>
      <a href="https://www.eadurham.org/arete-fellowship" class="inline-block bg-ea-active-teal hover:bg-ea-dark-teal text-white font-bold px-8 py-3 rounded-md transition-colors shadow-sm">
        Learn more
      </a>
    </section>

    <!-- SECTION 4: WHAT WE DO -->
    <section class="py-16 border-b border-ea-dark-teal/10 text-center">
      <h2 class="text-3xl font-extrabold text-ea-dark-teal mb-12 font-ea-heading">What we do</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white p-8 rounded-lg shadow-sm border border-ea-dark-teal/10 text-center flex flex-col items-center">
          <h4 class="text-xl font-bold text-ea-dark-teal mb-4 uppercase tracking-wider">Seminars</h4>
          <div class="w-12 h-1 bg-ea-active-teal mb-4"></div>
          <p class="text-sm text-ea-text-secondary leading-relaxed font-semibold">
            Engage in structured reading groups discussing existential risk, moral philosophy, and cost-effective charity.
          </p>
        </div>
        <div class="bg-white p-8 rounded-lg shadow-sm border border-ea-dark-teal/10 text-center flex flex-col items-center">
          <h4 class="text-xl font-bold text-ea-dark-teal mb-4 uppercase tracking-wider">Careers</h4>
          <div class="w-12 h-1 bg-ea-active-teal mb-4"></div>
          <p class="text-sm text-ea-text-secondary leading-relaxed font-semibold">
            Explore high-impact career paths, network with professionals, and feel prepared to pursue an impactful career!
          </p>
        </div>
        <div class="bg-white p-8 rounded-lg shadow-sm border border-ea-dark-teal/10 text-center flex flex-col items-center">
          <h4 class="text-xl font-bold text-ea-dark-teal mb-4 uppercase tracking-wider">Community</h4>
          <div class="w-12 h-1 bg-ea-active-teal mb-4"></div>
          <p class="text-sm text-ea-text-secondary leading-relaxed font-semibold">
            Connect with a vibrant group of motivated students working to improve global wellbeing.
          </p>
        </div>
      </div>
    </section>

    <!-- SECTION 5: CONTACT US NETLIFY FORM -->
    <section class="py-16 max-w-[600px] mx-auto">
      <h2 class="text-3xl font-extrabold text-ea-dark-teal text-center mb-8 font-ea-heading">Contact us</h2>
      
      <!-- Native HTML Netlify-compatible form -->
      <form name="contact" method="POST" data-netlify="true" action="/success" class="flex flex-col gap-6 bg-white p-8 rounded-lg shadow-sm border border-ea-dark-teal/10">
        <!-- Hidden input identifying the form for Netlify parser -->
        <input type="hidden" name="form-name" value="contact" />
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <label for="first_name" class="text-xs font-bold text-ea-dark-teal uppercase">First name</label>
            <input type="text" id="first_name" name="first-name" required placeholder="Will" class="border border-ea-dark-teal/20 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-ea-active-teal font-semibold text-ea-text-primary" />
          </div>
          <div class="flex flex-col gap-2">
            <label for="last_name" class="text-xs font-bold text-ea-dark-teal uppercase">Last name</label>
            <input type="text" id="last_name" name="last-name" required placeholder="MacAskill" class="border border-ea-dark-teal/20 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-ea-active-teal font-semibold text-ea-text-primary" />
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label for="email" class="text-xs font-bold text-ea-dark-teal uppercase">Email</label>
          <input type="email" id="email" name="email" required placeholder="william@example.com" class="border border-ea-dark-teal/20 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-ea-active-teal font-semibold text-ea-text-primary" />
        </div>

        <div class="flex flex-col gap-2">
          <label for="subject" class="text-xs font-bold text-ea-dark-teal uppercase">Subject</label>
          <input type="text" id="subject" name="subject" required placeholder="Question about fellowships..." class="border border-ea-dark-teal/20 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-ea-active-teal font-semibold text-ea-text-primary" />
        </div>

        <div class="flex flex-col gap-2">
          <label for="message" class="text-xs font-bold text-ea-dark-teal uppercase">Message</label>
          <textarea id="message" name="message" required rows="5" placeholder="Write your message here..." class="border border-ea-dark-teal/20 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-ea-active-teal font-semibold text-ea-text-primary"></textarea>
        </div>

        <button type="submit" class="bg-ea-active-teal hover:bg-ea-dark-teal text-white font-bold py-3 px-6 rounded transition-colors shadow-sm mt-2">
          Submit
        </button>
      </form>
    </section>
  </Layout>
  ```

- [ ] **Step 2: Create a dummy form success page**
  Create `src/pages/success.astro`:
  ```astro
  ---
  import Layout from '../layouts/Layout.astro';
  ---

  <Layout title="Thank you!">
    <div class="py-20 text-center">
      <h2 class="text-3xl font-extrabold text-ea-dark-teal mb-4 font-ea-heading">Thank you for submitting!</h2>
      <p class="text-md text-ea-text-secondary leading-relaxed font-semibold mb-8">
        We have received your message and will get back to you as soon as possible.
      </p>
      <a href="/" class="inline-block bg-ea-active-teal hover:bg-ea-dark-teal text-white font-bold px-6 py-2 rounded transition-colors">
        Go Back Home
      </a>
    </div>
  </Layout>
  ```

- [ ] **Step 3: Verify local page compiles successfully**
  Run: `pnpm run build`
  Expected: Successful compilation

- [ ] **Step 4: Commit Home page changes**
  Run:
  ```bash
  git add src/pages/index.astro src/pages/success.astro
  git commit -m "feat: implement main Home Page route and native Netlify Contact Form"
  ```
  Expected: Commit succeeds

---

### Task 5: Programmes Page

**Files:**
* Create: `src/pages/programmes.astro`

- [ ] **Step 1: Write programmes.astro layout and fellowship descriptions**
  Write to `src/pages/programmes.astro`:
  ```astro
  ---
  import Layout from '../layouts/Layout.astro';
  ---

  <Layout title="PROGRAMMES">
    <div class="py-12 border-b border-ea-dark-teal/10">
      <h2 class="text-3xl md:text-4xl font-extrabold text-ea-dark-teal mb-4 font-ea-heading text-center">Programmes</h2>
      <p class="text-md text-ea-text-secondary leading-relaxed font-semibold text-center max-w-[700px] mx-auto">
        Learn how you can use your time, careers, and resources to do the most good. We run two main fellowship cohorts each term.
      </p>
    </div>

    <!-- ARETE FELLOWSHIP -->
    <div class="py-16 border-b border-ea-dark-teal/10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div>
        <span class="text-xs font-bold text-ea-active-teal uppercase tracking-wider">Seminars</span>
        <h3 class="text-2xl font-extrabold text-ea-dark-teal mt-2 mb-4 font-ea-heading">Arete Fellowship</h3>
        <p class="text-md leading-relaxed text-ea-text-secondary font-semibold mb-6">
          The Arete Fellowship is an 8-week seminar programme exploring the foundational questions of effective altruism. Together with a cohort of peers, you will examine moral philosophy, global health, animal suffering, biosecurity, and long-term priority areas.
        </p>
        <a href="https://www.eadurham.org/arete-fellowship" class="inline-block bg-ea-active-teal hover:bg-ea-dark-teal text-white font-bold px-6 py-2.5 rounded transition-colors">
          Learn more
        </a>
      </div>
      <div>
        <img src="/assets/programmes/ead_white_square.png" alt="Arete Fellowship" class="w-full max-h-[300px] object-cover rounded-lg shadow-sm border border-ea-dark-teal/10" />
      </div>
    </div>

    <!-- IDEA FELLOWSHIP -->
    <div class="py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div class="order-2 md:order-1">
        <img src="/assets/programmes/ead_white_square(1).png" alt="IDEA Fellowship" class="w-full max-h-[300px] object-cover rounded-lg shadow-sm border border-ea-dark-teal/10" />
      </div>
      <div class="order-1 md:order-2">
        <span class="text-xs font-bold text-ea-active-teal uppercase tracking-wider">Career Planning</span>
        <h3 class="text-2xl font-extrabold text-ea-dark-teal mt-2 mb-4 font-ea-heading">IDEA Fellowship</h3>
        <p class="text-md leading-relaxed text-ea-text-secondary font-semibold mb-6">
          Focus on practical application. The IDEA Fellowship is centered around strategic planning, helping you evaluate your strengths, research high-impact career profiles, and formulate concrete steps to achieve an outstanding, impactful career.
        </p>
        <a href="https://www.eadurham.org/idea-fellowship" class="inline-block bg-ea-active-teal hover:bg-ea-dark-teal text-white font-bold px-6 py-2.5 rounded transition-colors">
          Learn more
        </a>
      </div>
    </div>
  </Layout>
  ```

- [ ] **Step 2: Verify page build**
  Run: `pnpm run build`
  Expected: Successful compilation

- [ ] **Step 3: Commit Programmes page**
  Run:
  ```bash
  git add src/pages/programmes.astro
  git commit -m "feat: add Programmes page route with Arete and IDEA fellowship descriptions"
  ```
  Expected: Success

---

### Task 6: Opportunities Page

**Files:**
* Create: `src/pages/opportunities.astro`

- [ ] **Step 1: Write opportunities.astro static list**
  Write to `src/pages/opportunities.astro`:
  ```astro
  ---
  import Layout from '../layouts/Layout.astro';
  ---

  <Layout title="OPPORTUNITIES">
    <div class="py-12 border-b border-ea-dark-teal/10">
      <h2 class="text-3xl md:text-4xl font-extrabold text-ea-dark-teal mb-4 font-ea-heading text-center">Opportunities</h2>
      <p class="text-md text-ea-text-secondary leading-relaxed font-semibold text-center max-w-[700px] mx-auto">
        Resources, guidance, and active opportunities to launch your high-impact career.
      </p>
    </div>

    <div class="py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
      <!-- OPPORTUNITY CARD 1 -->
      <div class="bg-white p-8 rounded-lg shadow-sm border border-ea-dark-teal/10 flex flex-col justify-between">
        <div>
          <span class="text-xs font-bold text-ea-active-teal uppercase tracking-wider">Careers Guidance</span>
          <h3 class="text-2xl font-bold text-ea-dark-teal mt-2 mb-4 font-ea-heading">Free 1-1 Careers Advice</h3>
          <p class="text-sm text-ea-text-secondary leading-relaxed font-semibold mb-6">
            Get personalized advisory support through 80,000 Hours. Discuss your goals, potential career trajectories, and secure access to high-impact job networks.
          </p>
        </div>
        <div>
          <a href="https://www.eadurham.org/free-careers-advice" class="inline-block bg-ea-active-teal hover:bg-ea-dark-teal text-white font-bold px-6 py-2.5 rounded transition-colors w-full text-center">
            Register for Advice
          </a>
        </div>
      </div>

      <!-- OPPORTUNITY CARD 2 -->
      <div class="bg-white p-8 rounded-lg shadow-sm border border-ea-dark-teal/10 flex flex-col justify-between">
        <div>
          <span class="text-xs font-bold text-ea-active-teal uppercase tracking-wider">Active Paths</span>
          <h3 class="text-2xl font-bold text-ea-dark-teal mt-2 mb-4 font-ea-heading">Current Opportunities</h3>
          <p class="text-sm text-ea-text-secondary leading-relaxed font-semibold mb-6">
            Explore current vacancies, internships, research scholarships, and funding programs specifically selected for high-impact candidates.
          </p>
        </div>
        <div>
          <a href="https://www.eadurham.org/current-opportunities" class="inline-block bg-ea-active-teal hover:bg-ea-dark-teal text-white font-bold px-6 py-2.5 rounded transition-colors w-full text-center">
            View Current Board
          </a>
        </div>
      </div>
    </div>
  </Layout>
  ```

- [ ] **Step 2: Verify page build**
  Run: `pnpm run build`
  Expected: Successful compilation

- [ ] **Step 3: Commit Opportunities page**
  Run:
  ```bash
  git add src/pages/opportunities.astro
  git commit -m "feat: add Opportunities page with links to careers advice and vacancies"
  ```
  Expected: Success

---

### Task 7: Causes Page

**Files:**
* Create: `src/pages/causes.astro`

- [ ] **Step 1: Write causes.astro grid and descriptions**
  Write to `src/pages/causes.astro`:
  ```astro
  ---
  import Layout from '../layouts/Layout.astro';
  ---

  <Layout title="CAUSES">
    <div class="py-12 border-b border-ea-dark-teal/10">
      <h2 class="text-3xl md:text-4xl font-extrabold text-ea-dark-teal mb-4 font-ea-heading text-center">Causes</h2>
      <p class="text-md text-ea-text-secondary leading-relaxed font-semibold text-center max-w-[700px] mx-auto">
        Effective Altruism focuses research on areas that are neglected, high-scale, and highly solvable. Here are the core cause areas we focus on.
      </p>
    </div>

    <div class="py-16 flex flex-col gap-16">
      
      <!-- CAUSE 1: AI SAFETY -->
      <div class="bg-white rounded-lg shadow-sm border border-ea-dark-teal/10 overflow-hidden grid grid-cols-1 md:grid-cols-3">
        <div class="md:col-span-1 h-full min-h-[200px] relative">
          <img src="/assets/causes/67772eaaa8174950975992b1e23d8c02.jpg" alt="AI Safety Circuit" class="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div class="md:col-span-2 p-8 flex flex-col justify-between">
          <div>
            <h3 class="text-2xl font-extrabold text-ea-dark-teal mb-4 font-ea-heading">AI Safety</h3>
            <p class="text-sm text-ea-text-secondary leading-relaxed font-semibold">
              The development of artificial general intelligence (AGI) could be one of the most transformative milestones in human history. Ensuring these systems are safe, aligned, and secure represents one of the most pressing research priorities of our time.
            </p>
          </div>
          <div class="mt-6">
            <a href="https://www.eadurham.org/ai-safety" class="text-ea-active-teal font-bold hover:underline">Read more details &rarr;</a>
          </div>
        </div>
      </div>

      <!-- CAUSE 2: ANIMAL ADVOCACY -->
      <div class="bg-white rounded-lg shadow-sm border border-ea-dark-teal/10 overflow-hidden grid grid-cols-1 md:grid-cols-3">
        <div class="md:col-span-1 h-full min-h-[200px] relative">
          <img src="/assets/causes/Cow.jpg" alt="Animal Advocacy" class="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div class="md:col-span-2 p-8 flex flex-col justify-between">
          <div>
            <h3 class="text-2xl font-extrabold text-ea-dark-teal mb-4 font-ea-heading">Animal Advocacy</h3>
            <p class="text-sm text-ea-text-secondary leading-relaxed font-semibold">
              Hundreds of billions of animals suffer intensely in factory farms. Supporting research, legislative policy, alternative proteins, and corporate welfare commitments stands out as a highly cost-effective path to reduce systemic suffering.
            </p>
          </div>
          <div class="mt-6">
            <a href="https://www.eadurham.org/animal-advocacy" class="text-ea-active-teal font-bold hover:underline">Read more details &rarr;</a>
          </div>
        </div>
      </div>

      <!-- CAUSE 3: BIOSECURITY -->
      <div class="bg-white rounded-lg shadow-sm border border-ea-dark-teal/10 overflow-hidden grid grid-cols-1 md:grid-cols-3">
        <div class="md:col-span-1 h-full min-h-[200px] relative">
          <!-- Fallback layout uses home/causes visual element cleanly -->
          <img src="/assets/causes/67772eaaa8174950975992b1e23d8c02.jpg" alt="Biosecurity" class="absolute inset-0 w-full h-full object-cover filter sepia" />
        </div>
        <div class="md:col-span-2 p-8 flex flex-col justify-between">
          <div>
            <h3 class="text-2xl font-extrabold text-ea-dark-teal mb-4 font-ea-heading">Biosecurity & Pandemics</h3>
            <p class="text-sm text-ea-text-secondary leading-relaxed font-semibold">
              Preparing for natural or synthetic biological risks. Designing vaccine platforms, sterilization technology, and global biological early-warning systems represents an immensely leveraged path to safeguard our future.
            </p>
          </div>
          <div class="mt-6">
            <a href="https://www.eadurham.org/biosecurity" class="text-ea-active-teal font-bold hover:underline">Read more details &rarr;</a>
          </div>
        </div>
      </div>

    </div>
  </Layout>
  ```

- [ ] **Step 2: Verify page build**
  Run: `pnpm run build`
  Expected: Successful compilation

- [ ] **Step 3: Commit Causes page**
  Run:
  ```bash
  git add src/pages/causes.astro
  git commit -m "feat: add Causes page with AGI safety, animal welfare, and biosecurity segments"
  ```
  Expected: Success

---

### Task 8: Events Page

**Files:**
* Create: `src/pages/events.astro`

- [ ] **Step 1: Write events.astro timeline**
  Write to `src/pages/events.astro`:
  ```astro
  ---
  import Layout from '../layouts/Layout.astro';

  const events = [
    {
      date: "Oct 2026",
      title: "Arete Fellowship Seminars Begin",
      description: "Weekly seminar sessions start across Durham colleges. Dive deep into cost-effective priorities, systemic reforms, and global charity evaluations.",
      type: "Academic"
    },
    {
      date: "Nov 2026",
      title: "Global Risks Speaker Night",
      description: "Guest lecture on extreme pandemics, bio-containment strategies, and policy options with international biosecurity researchers.",
      type: "Guest Lecture"
    },
    {
      date: "Dec 2026",
      title: "Fellowship Celebration & Social",
      description: "End of term networking drinks and group dinner. Celebrate fellowship achievements and discuss future career plans with the senior committee.",
      type: "Social"
    }
  ];
  ---

  <Layout title="EVENTS">
    <div class="py-12 border-b border-ea-dark-teal/10">
      <h2 class="text-3xl md:text-4xl font-extrabold text-ea-dark-teal mb-4 font-ea-heading text-center">Events</h2>
      <p class="text-md text-ea-text-secondary leading-relaxed font-semibold text-center max-w-[700px] mx-auto">
        Join our discussions, guest speaker nights, and regular networking sessions.
      </p>
    </div>

    <!-- TIMELINE CONTAINER -->
    <div class="py-16 max-w-[700px] mx-auto">
      <div class="relative border-l border-ea-dark-teal/20 pl-8 ml-4 flex flex-col gap-12">
        {events.map((event) => (
          <div class="relative">
            <!-- Bullet node -->
            <div class="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-ea-beige border-2 border-ea-active-teal flex items-center justify-center">
              <div class="w-2.5 h-2.5 rounded-full bg-ea-active-teal"></div>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-sm border border-ea-dark-teal/10">
              <span class="text-xs font-bold text-ea-active-teal uppercase tracking-wider">{event.date} &bull; {event.type}</span>
              <h3 class="text-xl font-bold text-ea-dark-teal mt-2 mb-3 font-ea-heading">{event.title}</h3>
              <p class="text-sm text-ea-text-secondary leading-relaxed font-semibold">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Layout>
  ```

- [ ] **Step 2: Verify page build**
  Run: `pnpm run build`
  Expected: Successful compilation

- [ ] **Step 3: Commit Events page**
  Run:
  ```bash
  git add src/pages/events.astro
  git commit -m "feat: add Events page route with timeline layout of society activities"
  ```
  Expected: Success

---

### Task 9: Contact Us & Executive Repeater

**Files:**
* Create: `src/pages/contact-us.astro`

- [ ] **Step 1: Write contact-us.astro team list**
  Write to `src/pages/contact-us.astro`:
  ```astro
  ---
  import Layout from '../layouts/Layout.astro';

  const team = [
    {
      name: "Amir Kenevissi",
      role: "Co-lead",
      email: "amir.kenevissi@durham.ac.uk",
      bio: "Hey! I'm Amir, one of the co-leads at EA Durham. I'm currently in my second year of studying Philosophy as an undergraduate, and I'm interested in global health as a cause area. Feel free to reach out if you have any questions about EA!",
      img: "/assets/contact-us/ead_white_square.png"
    },
    {
      name: "Amber Young",
      role: "1-1 Advisor, Vice President, Social Secretary",
      email: "amber.l.young@durham.ac.uk",
      bio: "My name is Amber and I’m a third year from Sydney, Australia studying PPE. This year, I’m Vice President and Social Sec for EA Durham - as well as having facilitated both the Arete and IDEA fellowships for the past year and a bit. I’m most interested in Global Health and Development, and would like to move into the development NGO sector at some point later in my career.",
      img: "/assets/contact-us/ead_white_square(1).png"
    },
    {
      name: "Josh Loan-Clarke",
      role: "Co-lead, 1-1 Advisor",
      email: "joshua.loan-clarke@durham.ac.uk",
      bio: "Hey! I’m Josh, current final year NatSci student doing Physics and Philosophy, and co-lead of EA Durham. I think EA has the highest concentration of cool people out of any group I've been involved with. I'm interested in basically everything across the EA spectrum. Outside EA you’ll find me playing Dodgeball (it's a real sport, promise!), singing acapella, or (sometimes) doing my degree. :-)",
      img: "/assets/contact-us/ead_white_square(2).png"
    },
    {
      name: "Arthur Field",
      role: "Opportunities Lead",
      email: "arthur.field@durham.ac.uk",
      bio: "I’m Arthur, Natural Sciences Student at Durham studying Physics and Philosophy! I enjoy running, and really don’t want to be convinced of longtermism! Come to me for any advice on where to look for career or upskilling opportunities!",
      img: "/assets/contact-us/ead_white_square(3).png"
    }
  ];
  ---

  <Layout title="CONTACT US">
    <div class="py-12 border-b border-ea-dark-teal/10">
      <h2 class="text-3xl md:text-4xl font-extrabold text-ea-dark-teal mb-4 font-ea-heading text-center">Contact Us</h2>
      <p class="text-md text-ea-text-secondary leading-relaxed font-semibold text-center max-w-[700px] mx-auto">
        Meet our executive committee and careers advisory team.
      </p>
    </div>

    <!-- TEAM CARDS GRID -->
    <div class="py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
      {team.map((member) => (
        <div class="bg-white p-6 rounded-lg shadow-sm border border-ea-dark-teal/10 flex flex-col md:flex-row gap-6 items-start">
          <img src={member.img} alt={member.name} class="w-24 h-24 object-cover border border-ea-dark-teal/20 rounded-md shrink-0 mx-auto md:mx-0" />
          <div class="flex-grow flex flex-col justify-between min-h-[96px] text-center md:text-left">
            <div>
              <h3 class="text-xl font-bold text-ea-dark-teal font-ea-heading m-0">{member.name}</h3>
              <span class="text-xs font-bold text-ea-active-teal uppercase tracking-wider block mt-1">{member.role}</span>
              <p class="text-xs leading-relaxed text-ea-text-secondary font-semibold mt-3">
                {member.bio}
              </p>
            </div>
            <div class="mt-4 pt-3 border-t border-ea-dark-teal/5 flex justify-center md:justify-start">
              <a href={`mailto:${member.email}`} class="text-xs font-bold text-ea-active-teal hover:underline flex items-center gap-1">
                <svg class="w-4 h-4 text-ea-active-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {member.email}
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </Layout>
  ```

- [ ] **Step 2: Verify page build**
  Run: `pnpm run build`
  Expected: Successful compilation

- [ ] **Step 3: Commit Contact Us page**
  Run:
  ```bash
  git add src/pages/contact-us.astro
  git commit -m "feat: add Contact Us page with team profiles and circular biography cards"
  ```
  Expected: Success

---

### Task 10: End-to-End Build and Verification

**Files:**
* Modify: `astro.config.mjs` (Confirm final integrations)

- [ ] **Step 1: Check sitemap configuration in astro.config.mjs**
  Ensure site metadata is added to `astro.config.mjs`:
  ```javascript
  import { defineConfig } from 'astro/config';
  import tailwindcss from '@tailwindcss/vite';
  import sitemap from '@astrojs/sitemap';

  export default defineConfig({
    site: 'https://www.eadurham.org',
    vite: {
      plugins: [tailwindcss()]
    },
    integrations: [sitemap()]
  });
  ```

- [ ] **Step 2: Run clean Astro Production build**
  Run: `pnpm run build`
  Expected: Success, static pages generated cleanly in `dist/` with a valid `sitemap-0.xml` sitemap index.

- [ ] **Step 3: Commit config updates**
  Run:
  ```bash
  git add astro.config.mjs
  git commit -m "build: finalize astro config, site url, and generate clean sitemap index"
  ```
  Expected: Commit succeeds
