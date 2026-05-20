# Design Document: EA Durham Website Migration (Wix to Astro)

This document outlines the design and architectural specifications for migrating the Effective Altruism Durham website from its legacy Wix implementation to a modern, static, performance-optimized Astro website with Tailwind CSS v4.

---

## 1. Architectural & Technical Overview

### Tech Stack
* **Framework**: Astro (Basics template)
* **Styling**: Tailwind CSS v4 (flat theme, zero gradients)
* **Hosting**: Prepared for Netlify
* **Form Handling**: Replaced Wix Form with a standard Netlify-compatible HTML Form (`data-netlify="true"`)
* **Content Management**: Static markdown/frontmatter and local data arrays first (ready for future Storyblok CMS integration)

---

## 2. Design Tokens & Aesthetic Identity

We are using a **faithfully modernized hybrid** approach—preserving the exact layout, copywriting, and color palette of the original EA Durham site, but eliminating absolute layouts and Wix's redundant styling tags.

### Colors
* **Primary Background / Beige Accent**: `#f4efe9` (RGB: `244, 239, 233`) — Warm, academic, and friendly.
* **Deep Scholar Teal (Primary Dark)**: `#054d5a` (RGB: `5, 77, 90`) — Headers, footers, and key titles.
* **Active Brand Teal (Link/Button Accent)**: `#0c869b` (RGB: `12, 134, 155`) — Navigation hover states, active links, and buttons.
* **Stark White Panels**: `#ffffff` (RGB: `255, 255, 255`) — Cards and light containers.
* **Primary Text**: `#1a1a1a` / `#404040` (RGB: `64, 64, 64`) — Slate/charcoal body copy.

### Typography
We will pair Google Fonts loaded via standard `<link>` tags in the layout `<head>`:
* **Headings / Logo**: **Roboto Slab** (Sturdy, serif/slab style, elegant and scholarly).
* **Body, Navigation, & Small Accents**: **Raleway** (Geometric, clean, highly-legible sans-serif).
* **Quotes / Features**: **Libre Baskerville** (Elegant serif).

---

## 3. Core Component & Layout System

### Global Layout (`src/layouts/Layout.astro`)
A persistent container wrapping every page of the site:
* **Header Navigation**:
  * Brand logo (`ead_white_square.png` in `public/assets/` or `src/assets/`) and title text **Effective Altruism Durham** aligned left.
  * Desktop Navigation links on the right with custom CSS dropdown menus for multi-level paths (Programmes, Opportunities, Causes).
  * Lightweight mobile Hamburger Menu toggle to slide/fade a vertical menu on mobile screens (Beige background).
* **Footer**:
  * Background in `#054d5a` (Deep Scholar Teal).
  * Official student group registration disclaimer text in white Raleway font.

### Core Pages (`src/pages/`)
1. **`index.astro` (Home)**:
   * Hero banner: Tagline "We aspire to do the most good we can".
   * Video section: Replicating the "What is Effective Altruism" video container.
   * Features: Fellowship overview, "What we do" grid (Arete, IDEA).
   * Form: Netlify Form styled at the bottom of the home page.
2. **`programmes.astro` (Programmes)**:
   * Overview of the Arete and IDEA fellowships, replicating original copy and illustrations.
3. **`opportunities.astro` (Opportunities)**:
   * Focus on 1-1 career guides and currently available internships/paths.
4. **`causes.astro` (Causes)**:
   * A clean showcase of primary cause areas: *AI Safety*, *Animal Advocacy*, and *Biosecurity & Pandemics*.
5. **`events.astro` (Events)**:
   * A structured, easy-to-read list/timeline of scheduled activities and society meetings.
6. **`contact-us.astro` (Contact Us)**:
   * Recreates the executive committee and advisory profiles card repeater (Amir, Josh, Amber, Arthur, etc.) with biography blurbs and identical white-bordered circular/square photos.

---

## 4. Netlify Form Integration Details

The "Contact Us" form on the home page will be rewritten from Wix's proprietary form renderer to a pure HTML Form styled beautifully with Tailwind.
* **Markup Attributes**:
  * `<form name="contact" method="POST" data-netlify="true" action="/success">`
  * Includes a hidden input field for form identity detection by Netlify bots:
    `<input type="hidden" name="form-name" value="contact" />`
  * Form fields: `first-name` (text), `last-name` (text), `email` (email), `subject` (text), `message` (textarea).
  * Styled with deep teal borders, beige inputs, and clean Raleway labels.

---

## 5. Verification Plan

* **Visual Review**: Open pages in browser locally at `localhost:4321` and verify they align with the original screenshots/assets of `reference_site`.
* **Responsive Check**: Test menu behaviors and layouts on mobile/tablet viewports using Chrome/Safari inspector.
* **Build Validation**: Execute `pnpm run build` locally to verify zero compilation errors and clean sitemap generation.
