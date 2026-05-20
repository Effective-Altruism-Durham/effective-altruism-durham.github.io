# Exact Reference Homepage Design

## Goal

Recreate the EA Durham reference site homepage and shared header/footer as closely as practical in Astro and Tailwind CSS v4. The frontend target is the local `reference_site/index.html`; the modernization target is the implementation stack: Astro, Tailwind v4, pnpm, Netlify, and a content shape that can later move into Storyblok.

This milestone is not a redesign. It replaces the current Astro homepage and shell, which currently look like a new landing page, with an Astro implementation that visually matches the reference site.

## Scope

In scope for the first implementation pass:

- `src/layouts/Layout.astro`: reference-style shared header, navigation, mobile menu, and footer.
- `src/components/NavigationDropdown.astro`: reference-style dropdown behavior and appearance.
- `src/styles/global.css`: shared tokens and any small global rules needed to match the reference.
- `src/pages/index.astro`: exact-reference homepage structure, visible copy, calls to action, contact form, and section order.

Out of scope for the first implementation pass:

- Reworking the improved causes page layout.
- Reworking the improved contact page layout.
- Adding Storyblok fetching or schemas.
- Copying Wix-generated markup, scripts, or absolute-positioned implementation details.

## Reference Source

The visual and content source of truth is the local reference export:

- `reference_site/index.html` for homepage content and section order.
- `reference_site/contact-us.html` and `reference_site/causes.html` only as later style references for other pages.
- `reference_site/assets/` and `public/assets/` for migrated images already available to Astro.

The implementation should reproduce the visible result, not the Wix runtime. Do not copy Wix scripts, generated class names, app payloads, or layout machinery.

## Visual Contract

The recreated Astro site should look like the reference site:

- Warm off-white/cream background.
- Dark teal primary text and footer/header accents.
- Simple uppercase navigation.
- Plain dropdown menus.
- Flat sections with restrained borders and spacing.
- Simple buttons and links.
- Minimal shadows.
- Minimal border radius.
- No gradient headline text.
- No decorative grid backgrounds.
- No blur blobs or glass panels.
- No animated badge/pill elements.
- No modern icon-card redesign on the homepage.

Minor modernization is allowed only when it preserves the reference look while improving maintainability, accessibility, or responsiveness. Font consistency is acceptable; visual novelty is not.

## Header And Footer

The Astro header should recreate the reference header:

- Left-aligned text identity: `Effective Altruism Durham`, matching the reference line break/stacking as closely as practical.
- Desktop nav items:
  - `PROGRAMMES`
  - `OPPORTUNITIES`
  - `CAUSES`
  - `EVENTS`
  - `CONTACT US`
- Dropdowns should contain the same visible child labels as the reference:
  - Programmes: `Arete Fellowship`, `IDEA Fellowship`
  - Opportunities: `Free 1-1 Careers Advice: 80,000 Hours`, `Current Opportunities`
  - Causes: `AI Safety`, `Animal Advocacy`, `Biosecurity`
- Use root-relative Astro routes where local pages exist.
- Keep mobile behavior accessible and responsive, but visually plain and close to the reference menu.

The footer should recreate the reference footer feel:

- Plain legal text block using the Durham SU wording from the reference.
- No new multi-column marketing footer.
- No large modern link groups unless they are visually hidden on desktop or clearly required for mobile usability.

## Homepage Structure

The homepage should follow the reference section order and copy closely:

1. Hero headline: `We aspire to do the most good we can`
2. Intro copy:
   - EA Durham represents the Effective Altruism movement at Durham University.
   - Reasoning carefully and considering evidence helps maximise positive impact.
   - The society empowers students through programmes, events, and community.
3. Calls to action:
   - `Get involved`
   - `Join the mailing list`
4. `What is Effective Altruism?`
   - Copy should closely match the reference wording.
5. `Arete Fellowship`
   - Short reference-style description.
   - `Learn more` link.
6. `What we do`
   - `IDEA FELLOWSHIP`
   - `SPEAKER EVENTS`
   - `CAREER PLANNING`
   - Use reference-style text and layout, not the current icon-card redesign.
7. `Contact us`
   - Keep a simple Netlify-compatible contact form in the homepage position used by the reference.
   - Form fields: first name, last name, email, subject, message, submit.

## Content And Storyblok Readiness

For now, content can live in structured constants in Astro frontmatter. Shape it so it can map to Storyblok later:

- `navGroups`
- `homepageHero`
- `homepageSections`
- `activityItems`
- `contactFormConfig`

Avoid CMS fields that encode the current implementation style, such as gradient settings or animation flags. Storyblok should later own content and block order, while Tailwind/Astro own presentation.

## Accessibility And Responsiveness

The reference site was Wix-rendered and not a good implementation model. The Astro rebuild should preserve the visual result while improving:

- Semantic landmarks: `header`, `nav`, `main`, `footer`, `section`.
- Real links and buttons.
- Keyboard-reachable dropdowns or mobile alternatives.
- Labelled form fields.
- Responsive layout that remains close to the reference at mobile widths.

## Verification

Before claiming implementation complete:

- Run `pnpm run build`.
- Locally compare `/` against `reference_site/index.html` for visible content, section order, header/footer, and overall look.
- Check `/causes` and `/contact-us` still render after shared shell changes.
- Confirm no non-pnpm lockfiles were introduced.

## Open Follow-Up

After this milestone, run a separate pass for non-homepage pages:

- Keep the improved causes and contact layouts.
- Restyle them under the same reference-site visual system.
- Consider restoring the full seven reference causes while preserving the clearer Astro card layout.
