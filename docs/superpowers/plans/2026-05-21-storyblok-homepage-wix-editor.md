# Storyblok Homepage Wix Editor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the homepage fully writable in Storyblok's Visual Editor while Astro remains responsible for rendering, layout, responsiveness, and build output.

**Architecture:** Treat Storyblok as a page-first visual content model: the `home` story owns ordered homepage sections, each section owns its visible copy/media/buttons, and repeated visible items are nested blocks with their own Visual Editor boundaries. Astro components render a constrained Wix-like design system rather than a freeform pixel canvas, so editors can click, edit, add, remove, and reorder content without breaking the page.

**Tech Stack:** Astro 6, `@storyblok/astro`, Storyblok Visual Editor, Tailwind CSS v4, pnpm, Netlify SSR.

---

## Scope

This plan covers the homepage first. It intentionally does not build a reusable events CMS because the events page will later become an Instagram profile or Google Calendar embed.

“Full Wix feel” means:

- The completed implementation must leave the homepage authorable from Storyblok end-to-end, so the user can move on to other pages without editing homepage source code for routine content changes.
- Editors manage the homepage from the `home` Storyblok story, not from hardcoded Astro defaults.
- Editors can click visible homepage sections/cards/buttons/links in the Visual Editor and change their fields.
- Editors can add, remove, and reorder homepage sections.
- Editors can add, remove, and reorder repeated items such as buttons, text cards, and social links.
- Astro still controls page structure, responsive behavior, typography, color variants, and safe layout constraints.

“Full Wix feel” does not mean arbitrary drag-to-any-pixel layout control. Storyblok can provide visual block editing, not the Wix canvas model.

## Completion Criteria

Plan execution is not complete until all of these are true:

- The Storyblok `home` story can author the full homepage content: hero, explanatory section, CTA/fellowship section, text-card grid, social links, contact section, and section order.
- The Storyblok `site-settings` story can author homepage-visible chrome: header navigation, logo/site name, footer copy, and footer links.
- The static Astro homepage content remains only as a fallback for missing CMS data, not as the normal editing path.
- A non-developer editor can open Storyblok Visual Editor, click each visible homepage section or repeated item, and find editable fields for the visible text/link/media.
- A non-developer editor can add, remove, and reorder sections, buttons, text cards, and social links without code changes.
- `pnpm run build` passes after the Storyblok-backed homepage code is in place.

## File Structure

- Modify `astro.config.mjs`: register all homepage and site-settings Storyblok components.
- Modify `src/pages/index.astro`: make Storyblok the primary homepage source when the `home` story exists; keep static fallback only for missing CMS data.
- Modify `src/pages/[...slug].astro`: keep generic page rendering aligned with the new `page` component.
- Modify `src/storyblok/Page.astro`: render ordered sections and preserve Visual Editor boundaries.
- Modify `src/storyblok/HeroSection.astro`: render editable hero fields and nested button blocks.
- Modify `src/storyblok/RichTextVideoSection.astro`: render editable heading/body/video/variant fields.
- Modify `src/storyblok/CtaSection.astro`: render editable CTA fields and nested button blocks.
- Modify `src/storyblok/CardGridSection.astro`: render editable grid fields and nested `text_card` blocks.
- Modify `src/storyblok/TextCard.astro`: render editable individual text cards.
- Modify `src/storyblok/SocialLinksSection.astro`: render editable section fields and nested `social_link` blocks.
- Modify `src/storyblok/ContactSection.astro`: render editable contact fields and nested button blocks.
- Create `src/storyblok/ButtonLink.astro`: nested button block used by hero, CTA, and contact sections.
- Create `src/storyblok/SocialLink.astro`: nested social link block used by social links.
- Create `src/storyblok/SiteSettings.astro` only if a block renderer is useful; otherwise use typed data fetch helpers.
- Create `src/data/storyblokSiteSettings.ts`: fetch and normalize header/footer settings from a Storyblok singleton story.
- Modify `src/components/SiteHeader.astro`: accept editable nav/logo/social settings as props while preserving current fallback.
- Modify `src/components/SiteFooter.astro`: accept editable footer settings as props while preserving current fallback.
- Create `docs/storyblok/homepage-schema.md`: exact Storyblok component schema for manual setup in the Storyblok UI.
- Create `tests/storyblok-homepage-editor.test.mjs`: source-level regression tests for component registration, nested rendering, and editable boundaries.

## Storyblok Schema

Create or update these components in Storyblok before relying on the Visual Editor. Field names must match exactly because Astro reads these names from `blok`.

### Content Type: `page`

Fields:

| Field | Type | Notes |
|---|---|---|
| `body` | Blocks | Allow `hero_section`, `rich_text_video_section`, `cta_section`, `card_grid_section`, `social_links_section`, `contact_section` |
| `meta_title` | Text | Used for document title |
| `meta_description` | Textarea | Used for meta description |

### Nestable Block: `hero_section`

Fields:

| Field | Type | Notes |
|---|---|---|
| `headline` | Text | Main hero heading |
| `body` | Richtext | Hero body copy |
| `buttons` | Blocks | Restrict to `button_link`; allow 0-3 items |
| `background_style` | Single-option | `white`, `cream`, `teal`, `purple` |
| `divider_style` | Single-option | `top_notch`, `bottom_wave`, `none` |
| `anchor_id` | Text | Optional section id without `#` |

### Nestable Block: `button_link`

Fields:

| Field | Type | Notes |
|---|---|---|
| `label` | Text | Button label |
| `link` | Link | Internal or external link |
| `style` | Single-option | `primary`, `secondary`, `text` |

### Nestable Block: `rich_text_video_section`

Fields:

| Field | Type | Notes |
|---|---|---|
| `heading` | Text | Section heading |
| `body` | Richtext | Section body |
| `video_url` | Text | YouTube embed URL |
| `layout` | Single-option | `text_left`, `text_right`, `stacked` |
| `background_style` | Single-option | `teal`, `white`, `cream`, `purple` |
| `anchor_id` | Text | Optional section id without `#` |

### Nestable Block: `cta_section`

Fields:

| Field | Type | Notes |
|---|---|---|
| `heading` | Text | CTA heading |
| `body` | Richtext | CTA body |
| `buttons` | Blocks | Restrict to `button_link`; allow 0-2 items |
| `background_style` | Single-option | `cream`, `white`, `teal`, `purple` |
| `anchor_id` | Text | Optional section id without `#` |

### Nestable Block: `card_grid_section`

Fields:

| Field | Type | Notes |
|---|---|---|
| `heading` | Text | Grid heading |
| `intro` | Richtext | Optional intro above cards |
| `cards` | Blocks | Restrict to `text_card`; allow 0-6 items |
| `columns` | Single-option | `2`, `3`, `4` |
| `background_style` | Single-option | `teal`, `white`, `cream`, `purple` |
| `anchor_id` | Text | Optional section id without `#` |

### Nestable Block: `text_card`

Fields:

| Field | Type | Notes |
|---|---|---|
| `label` | Text | Card heading |
| `text` | Richtext | Card body |
| `link` | Link | Optional card link |

### Nestable Block: `social_links_section`

Fields:

| Field | Type | Notes |
|---|---|---|
| `heading` | Text | Optional heading |
| `links` | Blocks | Restrict to `social_link`; allow 1-6 items |
| `background_style` | Single-option | `white`, `cream`, `teal`, `purple` |
| `anchor_id` | Text | Optional section id without `#` |

### Nestable Block: `social_link`

Fields:

| Field | Type | Notes |
|---|---|---|
| `label` | Text | Link label such as Instagram |
| `link` | Link | Destination |
| `icon` | Single-option | `instagram`, `email`, `facebook`, `linkedin`, `website` |

### Nestable Block: `contact_section`

Fields:

| Field | Type | Notes |
|---|---|---|
| `heading` | Text | Contact heading |
| `body` | Richtext | Contact copy |
| `buttons` | Blocks | Restrict to `button_link`; allow 0-3 items |
| `background_style` | Single-option | `white`, `cream`, `teal`, `purple` |
| `anchor_id` | Text | Optional section id without `#` |

### Content Type: `site_settings`

Create a singleton story at `site-settings`.

Fields:

| Field | Type | Notes |
|---|---|---|
| `logo` | Asset | Optional logo override |
| `site_name` | Text | Header accessible label |
| `navigation` | Blocks | Restrict to `nav_link` |
| `footer_text` | Richtext | Footer copy |
| `footer_links` | Blocks | Restrict to `nav_link` |

### Nestable Block: `nav_link`

Fields:

| Field | Type | Notes |
|---|---|---|
| `label` | Text | Link label |
| `link` | Link | Internal or external link |

## Task 1: Document The Storyblok Schema Contract

**Files:**

- Create: `docs/storyblok/homepage-schema.md`
- Modify: `README.md`

- [ ] **Step 1: Write the schema document**

Create `docs/storyblok/homepage-schema.md` with the complete schema from the “Storyblok Schema” section of this plan. Include a first paragraph:

```markdown
# Homepage Storyblok Schema

This file is the source-of-truth for the Storyblok components used by the Astro homepage. Field names must match the names here exactly because the Astro renderers read these names from `blok`.
```

- [ ] **Step 2: Update the README Storyblok section**

Replace the existing small component table in `README.md` with a short pointer:

```markdown
The homepage Storyblok schema is documented in `docs/storyblok/homepage-schema.md`. Keep the Storyblok UI schema and Astro renderers in sync: adding a field in Storyblok has no effect until Astro renders it, and adding a fallback in Astro is not visually editable until the field exists in Storyblok.
```

- [ ] **Step 3: Commit**

Run:

```bash
rtk git add docs/storyblok/homepage-schema.md README.md
rtk git commit -m "docs: define homepage storyblok schema"
```

Expected: commit succeeds and only docs are staged.

## Task 2: Add Regression Tests For Visual Editing Contracts

**Files:**

- Create or modify: `tests/storyblok-homepage-editor.test.mjs`

- [ ] **Step 1: Write the failing tests**

Create `tests/storyblok-homepage-editor.test.mjs`:

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const files = {
  config: "astro.config.mjs",
  page: "src/storyblok/Page.astro",
  hero: "src/storyblok/HeroSection.astro",
  cta: "src/storyblok/CtaSection.astro",
  cardGrid: "src/storyblok/CardGridSection.astro",
  textCard: "src/storyblok/TextCard.astro",
  socialLinks: "src/storyblok/SocialLinksSection.astro",
  contact: "src/storyblok/ContactSection.astro",
  buttonLink: "src/storyblok/ButtonLink.astro",
  socialLink: "src/storyblok/SocialLink.astro",
};

async function source(path) {
  return readFile(new URL(`../${path}`, import.meta.url), "utf8");
}

test("all homepage Storyblok blocks are registered", async () => {
  const config = await source(files.config);
  for (const component of [
    "page",
    "hero_section",
    "rich_text_video_section",
    "cta_section",
    "card_grid_section",
    "text_card",
    "button_link",
    "social_links_section",
    "social_link",
    "contact_section",
  ]) {
    assert.match(config, new RegExp(`${component}:`));
  }
});

test("visible Storyblok renderers expose visual editor boundaries", async () => {
  for (const path of [
    files.page,
    files.hero,
    files.cta,
    files.cardGrid,
    files.textCard,
    files.socialLinks,
    files.contact,
    files.buttonLink,
    files.socialLink,
  ]) {
    const content = await source(path);
    assert.match(content, /storyblokEditable\(blok\)/, `${path} must call storyblokEditable(blok)`);
  }
});

test("repeatable visual items render nested Storyblok blocks", async () => {
  for (const path of [files.hero, files.cta, files.cardGrid, files.socialLinks, files.contact]) {
    const content = await source(path);
    assert.match(content, /StoryblokComponent/, `${path} must render nested blocks`);
  }
});
```

- [ ] **Step 2: Run the tests and verify they fail**

Run:

```bash
node --test tests/storyblok-homepage-editor.test.mjs
```

Expected: FAIL because `ButtonLink.astro` and `SocialLink.astro` do not exist, and several sections do not yet render nested blocks.

- [ ] **Step 3: Commit the red tests**

Run:

```bash
rtk git add tests/storyblok-homepage-editor.test.mjs
rtk git commit -m "test: capture homepage visual editing contract"
```

Expected: commit succeeds with the failing test file only.

## Task 3: Add Shared Storyblok Helpers

**Files:**

- Create: `src/storyblok/storyblok-utils.ts`
- Test: `tests/storyblok-utils.test.mjs`

- [ ] **Step 1: Write the failing helper tests**

Create `tests/storyblok-utils.test.mjs`:

```js
import assert from "node:assert/strict";
import test from "node:test";
import {
  normalizeAnchorId,
  resolveBackgroundClass,
  resolveStoryblokUrl,
} from "../src/storyblok/storyblok-utils.ts";

test("normalizes anchor ids for section ids", () => {
  assert.equal(normalizeAnchorId("Get Involved"), "get-involved");
  assert.equal(normalizeAnchorId("#Contact Us!"), "contact-us");
  assert.equal(normalizeAnchorId(""), undefined);
});

test("resolves background style classes", () => {
  assert.equal(resolveBackgroundClass("teal"), "bg-[#0c869b] text-white");
  assert.equal(resolveBackgroundClass("cream"), "bg-[#f4efe9] text-black");
  assert.equal(resolveBackgroundClass("unknown"), "bg-white text-black");
});

test("resolves Storyblok link URLs", () => {
  assert.equal(resolveStoryblokUrl({ linktype: "url", url: "https://example.com" }), "https://example.com");
  assert.equal(resolveStoryblokUrl({ linktype: "story", cached_url: "contact-us" }), "/contact-us");
  assert.equal(resolveStoryblokUrl(undefined), "");
});
```

- [ ] **Step 2: Run and verify failure**

Run:

```bash
node --experimental-strip-types --test tests/storyblok-utils.test.mjs
```

Expected: FAIL because `src/storyblok/storyblok-utils.ts` does not exist.

- [ ] **Step 3: Implement the helpers**

Create `src/storyblok/storyblok-utils.ts`:

```ts
export function normalizeAnchorId(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const normalized = value
    .replace(/^#/, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return normalized || undefined;
}

export function resolveBackgroundClass(value: unknown): string {
  switch (value) {
    case "teal":
      return "bg-[#0c869b] text-white";
    case "purple":
      return "bg-[#68246d] text-white";
    case "cream":
      return "bg-[#f4efe9] text-black";
    case "white":
    default:
      return "bg-white text-black";
  }
}

export function resolveStoryblokUrl(link: any, fallback = ""): string {
  if (!link) return fallback;
  if (link.linktype === "url") return link.url || fallback;
  if (link.linktype === "email") return link.email ? `mailto:${link.email}` : fallback;
  if (link.linktype === "story") {
    const url = link.cached_url || link.story?.full_slug || "";
    return url ? `/${url.replace(/^\/|\/$/g, "")}` : fallback;
  }
  return link.cached_url || link.url || fallback;
}
```

- [ ] **Step 4: Run helper tests**

Run:

```bash
node --experimental-strip-types --test tests/storyblok-utils.test.mjs
```

Expected: PASS.

- [ ] **Step 5: Commit**

Run:

```bash
rtk git add src/storyblok/storyblok-utils.ts tests/storyblok-utils.test.mjs
rtk git commit -m "feat: add storyblok rendering helpers"
```

## Task 4: Convert Buttons To Nested Editable Blocks

**Files:**

- Create: `src/storyblok/ButtonLink.astro`
- Modify: `src/storyblok/HeroSection.astro`
- Modify: `src/storyblok/CtaSection.astro`
- Modify: `src/storyblok/ContactSection.astro`
- Modify: `astro.config.mjs`
- Test: `tests/storyblok-homepage-editor.test.mjs`

- [ ] **Step 1: Create `ButtonLink.astro`**

```astro
---
import { storyblokEditable } from "@storyblok/astro";
import { resolveStoryblokUrl } from "./storyblok-utils";

const { blok } = Astro.props;
const href = resolveStoryblokUrl(blok.link);
const style = blok.style || "primary";
const className = style === "text"
  ? "inline-flex items-center justify-center text-[16px] font-bold underline"
  : "group flex h-[70px] w-full items-center justify-center gap-3 rounded-[5px] px-6 text-center text-[16px] font-bold text-white transition-colors";
const backgroundStyle = style === "secondary" ? "background-color: #054d5a;" : "background-color: #68246d;";
---

{href && blok.label && (
  <a
    {...storyblokEditable(blok)}
    href={href}
    target={href.startsWith("http") ? "_blank" : undefined}
    rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
    class={className}
    style={style === "text" ? undefined : backgroundStyle}
  >
    <span>{blok.label}</span>
    {style !== "text" && (
      <svg viewBox="0 0 60 60" class="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M46.5 28.9L20.6 3c-.6-.6-1.6-.6-2.2 0l-4.8 4.8c-.6.6-.6 1.6 0 2.2l19.8 20-19.9 19.9c-.6.6-.6 1.6 0 2.2l4.8 4.8c.6.6 1.6.6 2.2 0l21-21 4.8-4.8c.8-.6.8-1.6.2-2.2z"></path>
      </svg>
    )}
  </a>
)}
```

- [ ] **Step 2: Register the block**

Add to `astro.config.mjs` Storyblok `components`:

```js
button_link: 'storyblok/ButtonLink',
```

- [ ] **Step 3: Update HeroSection to render nested buttons**

In `src/storyblok/HeroSection.astro`, import `StoryblokComponent`, remove `primary_label`, `primary_link`, `secondary_label`, and `secondary_link` mapping, and render `blok.buttons`:

```astro
---
import { renderRichText, storyblokEditable } from "@storyblok/astro";
import StoryblokComponent from "@storyblok/astro/StoryblokComponent.astro";
import HeroSection from "../components/HeroSection.astro";
import { homepageDefaults } from "../data/homepageDefaults";

const { blok } = Astro.props;
const buttons = Array.isArray(blok.buttons) ? blok.buttons : [];
---

<div {...storyblokEditable(blok)}>
  <HeroSection
    headline={blok.headline || homepageDefaults.hero.headline}
    bodyHtml={blok.body ? renderRichText(blok.body) : homepageDefaults.hero.bodyHtml}
  >
    <Fragment slot="ctas">
      {buttons.map((button) => <StoryblokComponent blok={button} />)}
    </Fragment>
  </HeroSection>
</div>
```

- [ ] **Step 4: Update `src/components/HeroSection.astro` to accept a CTA slot**

Add:

```astro
const hasCtaSlot = Astro.slots.has("ctas");
```

Replace the CTA map with:

```astro
{hasCtaSlot ? <slot name="ctas" /> : ctas.map((cta) => (
  <a
    href={cta.url}
    target={cta.url?.startsWith("http") ? "_blank" : undefined}
    rel={cta.url?.startsWith("http") ? "noreferrer noopener" : undefined}
    class="group flex h-[70px] w-full items-center justify-center gap-3 rounded-[5px] px-6 text-center text-[16px] font-bold text-white transition-colors"
    style="background-color: #68246d;"
  >
    <span>{cta.label}</span>
    <svg viewBox="0 0 60 60" class="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M46.5 28.9L20.6 3c-.6-.6-1.6-.6-2.2 0l-4.8 4.8c-.6.6-.6 1.6 0 2.2l19.8 20-19.9 19.9c-.6.6-.6 1.6 0 2.2l4.8 4.8c.6.6 1.6.6 2.2 0l21-21 4.8-4.8c.8-.6.8-1.6.2-2.2z"></path>
    </svg>
  </a>
))}
```

- [ ] **Step 5: Apply the same nested button pattern to CTA and contact**

In `src/storyblok/CtaSection.astro` and `src/storyblok/ContactSection.astro`, import `StoryblokComponent`, read `const buttons = Array.isArray(blok.buttons) ? blok.buttons : [];`, and pass a named `buttons` slot into the presentational component. If the presentational component does not yet expose a slot, add one while preserving the existing fallback props.

- [ ] **Step 6: Run tests**

Run:

```bash
node --test tests/storyblok-homepage-editor.test.mjs
pnpm run build
```

Expected: visual contract tests pass for registered `button_link`; build completes.

- [ ] **Step 7: Commit**

Run:

```bash
rtk git add astro.config.mjs src/components/HeroSection.astro src/storyblok/ButtonLink.astro src/storyblok/HeroSection.astro src/storyblok/CtaSection.astro src/storyblok/ContactSection.astro tests/storyblok-homepage-editor.test.mjs
rtk git commit -m "feat: make homepage buttons visual blocks"
```

## Task 5: Make Every Homepage Section Field-Editable

**Files:**

- Modify: `src/storyblok/RichTextVideoSection.astro`
- Modify: `src/storyblok/CtaSection.astro`
- Modify: `src/storyblok/CardGridSection.astro`
- Modify: `src/storyblok/TextCard.astro`
- Modify: `src/storyblok/SocialLinksSection.astro`
- Modify: `src/storyblok/ContactSection.astro`
- Modify: presentational components in `src/components/`
- Test: `tests/storyblok-homepage-editor.test.mjs`

- [ ] **Step 1: Replace plain string body fields with rich text rendering**

Use `renderRichText` for all body fields where the schema says Richtext:

```astro
bodyHtml={blok.body ? renderRichText(blok.body) : homepageDefaults.arete.body}
```

If a presentational component currently accepts `body`, add `bodyHtml` as a prop and render:

```astro
<Fragment set:html={bodyHtml} />
```

- [ ] **Step 2: Add editable section variants**

For each section wrapper, read:

```astro
import { normalizeAnchorId, resolveBackgroundClass } from "./storyblok-utils";

const sectionId = normalizeAnchorId(blok.anchor_id);
const backgroundClass = resolveBackgroundClass(blok.background_style);
```

Apply to the top editable wrapper or section:

```astro
<div {...storyblokEditable(blok)} id={sectionId} class={backgroundClass}>
```

- [ ] **Step 3: Preserve presentational fallback**

For every presentational component changed in this task, keep the existing default imports from `homepageDefaults` so the static fallback route still renders when Storyblok is unavailable.

- [ ] **Step 4: Run tests and build**

Run:

```bash
node --experimental-strip-types --test tests/storyblok-utils.test.mjs
node --test tests/storyblok-homepage-editor.test.mjs
pnpm run build
```

Expected: tests pass; build completes.

- [ ] **Step 5: Commit**

Run:

```bash
rtk git add src/components src/storyblok tests/storyblok-homepage-editor.test.mjs
rtk git commit -m "feat: expose homepage section fields to storyblok"
```

## Task 6: Make Social Links Nested Editable Blocks

**Files:**

- Create: `src/storyblok/SocialLink.astro`
- Modify: `src/storyblok/SocialLinksSection.astro`
- Modify: `src/components/SocialLinks.astro`
- Modify: `astro.config.mjs`
- Test: `tests/storyblok-homepage-editor.test.mjs`

- [ ] **Step 1: Create the nested social link renderer**

Create `src/storyblok/SocialLink.astro`:

```astro
---
import { storyblokEditable } from "@storyblok/astro";
import { resolveStoryblokUrl } from "./storyblok-utils";

const { blok } = Astro.props;
const href = resolveStoryblokUrl(blok.link);
---

{href && blok.label && (
  <a
    {...storyblokEditable(blok)}
    href={href}
    target={href.startsWith("http") ? "_blank" : undefined}
    rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
    class="inline-flex items-center justify-center rounded-[5px] px-4 py-3 font-ea-body text-[16px] font-bold underline"
  >
    {blok.label}
  </a>
)}
```

- [ ] **Step 2: Register the block**

Add to `astro.config.mjs` Storyblok `components`:

```js
social_link: 'storyblok/SocialLink',
```

- [ ] **Step 3: Render nested links in `SocialLinksSection.astro`**

Import `StoryblokComponent`, read `const links = Array.isArray(blok.links) ? blok.links : [];`, and render each nested `social_link` through `StoryblokComponent` in a named slot.

- [ ] **Step 4: Add a named slot to `SocialLinks.astro`**

Preserve the existing `links` fallback, but if `Astro.slots.has("links")`, render:

```astro
<slot name="links" />
```

- [ ] **Step 5: Run tests and build**

Run:

```bash
node --test tests/storyblok-homepage-editor.test.mjs
pnpm run build
```

Expected: tests pass; build completes.

- [ ] **Step 6: Commit**

Run:

```bash
rtk git add astro.config.mjs src/components/SocialLinks.astro src/storyblok/SocialLink.astro src/storyblok/SocialLinksSection.astro tests/storyblok-homepage-editor.test.mjs
rtk git commit -m "feat: make social links visual blocks"
```

## Task 7: Make Header And Footer Editable Through Site Settings

**Files:**

- Create: `src/data/storyblokSiteSettings.ts`
- Modify: `src/layouts/Layout.astro`
- Modify: `src/components/SiteHeader.astro`
- Modify: `src/components/SiteFooter.astro`
- Test: `tests/storyblok-site-settings.test.mjs`

- [ ] **Step 1: Write the failing settings tests**

Create `tests/storyblok-site-settings.test.mjs`:

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("site settings fetch helper exists and reads site-settings story", async () => {
  const source = await readFile(new URL("../src/data/storyblokSiteSettings.ts", import.meta.url), "utf8");
  assert.match(source, /site-settings/);
  assert.match(source, /navigation/);
  assert.match(source, /footer_links/);
});

test("layout passes site settings to header and footer", async () => {
  const source = await readFile(new URL("../src/layouts/Layout.astro", import.meta.url), "utf8");
  assert.match(source, /SiteHeader/);
  assert.match(source, /SiteFooter/);
  assert.match(source, /siteSettings/);
});
```

- [ ] **Step 2: Run and verify failure**

Run:

```bash
node --test tests/storyblok-site-settings.test.mjs
```

Expected: FAIL because `src/data/storyblokSiteSettings.ts` does not exist and `Layout.astro` does not pass settings.

- [ ] **Step 3: Create the site settings helper**

Create `src/data/storyblokSiteSettings.ts`:

```ts
import { useStoryblokApi } from "@storyblok/astro";
import { renderRichText } from "@storyblok/astro";
import { resolveStoryblokUrl } from "../storyblok/storyblok-utils";

export async function getStoryblokSiteSettings() {
  if (!import.meta.env.STORYBLOK_DELIVERY_API_TOKEN) return undefined;

  try {
    const storyblokApi = useStoryblokApi();
    const { data } = await storyblokApi.get("cdn/stories/site-settings", {
      version: import.meta.env.DEV ? "draft" : "published",
    });
    const content = data.story?.content;
    if (!content) return undefined;

    return {
      siteName: content.site_name || "Effective Altruism Durham",
      logo: content.logo?.filename || undefined,
      navigation: Array.isArray(content.navigation)
        ? content.navigation.map((item) => ({
            label: item.label || "",
            url: resolveStoryblokUrl(item.link),
          })).filter((item) => item.label && item.url)
        : undefined,
      footerHtml: content.footer_text ? renderRichText(content.footer_text) : undefined,
      footerLinks: Array.isArray(content.footer_links)
        ? content.footer_links.map((item) => ({
            label: item.label || "",
            url: resolveStoryblokUrl(item.link),
          })).filter((item) => item.label && item.url)
        : undefined,
    };
  } catch (error) {
    console.warn("Storyblok site settings unavailable; rendering static header/footer.", error);
    return undefined;
  }
}
```

- [ ] **Step 4: Pass settings through `Layout.astro`**

Import and call `getStoryblokSiteSettings()` in `Layout.astro`, then pass `siteSettings` to `SiteHeader` and `SiteFooter`. Preserve the current default header/footer if settings are unavailable.

- [ ] **Step 5: Update header and footer components**

Add props to `SiteHeader.astro`:

```astro
const { siteSettings } = Astro.props;
const navigation = siteSettings?.navigation ?? defaultNavigation;
const siteName = siteSettings?.siteName ?? "Effective Altruism Durham";
const logo = siteSettings?.logo ?? "/favicon.svg";
```

Add props to `SiteFooter.astro`:

```astro
const { siteSettings } = Astro.props;
const footerHtml = siteSettings?.footerHtml;
const footerLinks = siteSettings?.footerLinks ?? [];
```

- [ ] **Step 6: Run tests and build**

Run:

```bash
node --test tests/storyblok-site-settings.test.mjs
pnpm run build
```

Expected: tests pass; build completes.

- [ ] **Step 7: Commit**

Run:

```bash
rtk git add src/data/storyblokSiteSettings.ts src/layouts/Layout.astro src/components/SiteHeader.astro src/components/SiteFooter.astro tests/storyblok-site-settings.test.mjs
rtk git commit -m "feat: make homepage chrome storyblok-editable"
```

## Task 8: Make Storyblok The Primary Homepage Source

**Files:**

- Modify: `src/pages/index.astro`
- Modify: `src/data/homepageDefaults.ts`
- Test: `tests/storyblok-homepage-editor.test.mjs`

- [ ] **Step 1: Keep fallback only for missing Storyblok content**

In `src/pages/index.astro`, keep the static fallback for local setup without tokens, but remove logic that requires one of the old allowed homepage blocks before rendering Storyblok. Use:

```astro
const shouldRenderStoryblok = storyContent?.component === "page";
```

- [ ] **Step 2: Keep preview permissive**

Keep `allowedComponents` removed from the homepage render:

```astro
<StoryblokComponent blok={storyContent} />
```

The component registry in `astro.config.mjs` and `MissingBlock.astro` should handle unsupported blocks visibly.

- [ ] **Step 3: Move defaults into fallback-only use**

Leave `homepageDefaults` available for static fallback and empty CMS fields, but do not make it the primary content source when the `home` story exists.

- [ ] **Step 4: Run tests and build**

Run:

```bash
node --test tests/storyblok-homepage-editor.test.mjs
pnpm run build
```

Expected: tests pass; build completes.

- [ ] **Step 5: Commit**

Run:

```bash
rtk git add src/pages/index.astro src/data/homepageDefaults.ts tests/storyblok-homepage-editor.test.mjs
rtk git commit -m "feat: make storyblok primary homepage source"
```

## Task 9: Browser-Verify The Visual Editor Flow

**Files:**

- Modify only if browser verification reveals bugs.

- [ ] **Step 1: Start the dev server**

Run:

```bash
pnpm run dev
```

Expected: Astro dev server starts with HTTPS support from `vite-plugin-mkcert`.

- [ ] **Step 2: Configure Storyblok preview URL**

In Storyblok space settings, set the preview URL for the `home` story to the local or deployed preview URL that points at `/`. Use the same scheme and host shown by `pnpm run dev`.

- [ ] **Step 3: Populate the `home` story**

In the `home` story, create this body order:

1. `hero_section`
2. `rich_text_video_section`
3. `cta_section`
4. `card_grid_section`
5. `social_links_section`
6. `contact_section`

Use nested `button_link`, `text_card`, and `social_link` blocks where applicable.

- [ ] **Step 4: Verify editor behaviours**

In Storyblok Visual Editor, confirm:

- Clicking the hero selects `hero_section`.
- Editing `headline` changes the visible hero heading.
- Editing `body` changes the visible hero body.
- Adding, removing, and reordering hero `button_link` blocks updates the visible buttons.
- Clicking each IDEA/SPEAKER/CAREER card selects an individual `text_card`.
- Adding a fourth `text_card` shows another card without code changes.
- Reordering sections in `page.body` reorders the visible homepage.
- Removing all cards leaves an empty card grid instead of showing hardcoded fallback cards.
- Header navigation and footer text come from `site-settings` when that story exists.

- [ ] **Step 5: Stop the dev server**

Stop the dev server with `Ctrl-C`.

## Task 10: Final Verification And Cleanup

**Files:**

- Modify: `README.md`
- Modify: `docs/storyblok/homepage-schema.md`

- [ ] **Step 1: Update docs with final usage notes**

Add this section to `docs/storyblok/homepage-schema.md`:

```markdown
## Editor Usage

Open the `home` story in Storyblok Visual Editor. The page is built from the `body` blocks field. To edit visible content, click a section or nested item in the preview, then edit the fields in the right panel. To change order, reorder blocks in `body` or the nested block field. To add another card/button/link, add another nested block of the allowed type.
```

- [ ] **Step 2: Run full verification**

Run:

```bash
node --experimental-strip-types --test tests/storyblok-utils.test.mjs
node --test tests/storyblok-homepage-editor.test.mjs
node --test tests/storyblok-site-settings.test.mjs
pnpm run build
```

Expected: all tests pass; build completes.

- [ ] **Step 3: Check working tree**

Run:

```bash
git status --short
```

Expected: only intentional files from this plan are modified.

- [ ] **Step 4: Commit final docs**

Run:

```bash
rtk git add README.md docs/storyblok/homepage-schema.md
rtk git commit -m "docs: explain storyblok visual editor workflow"
```

## Self-Review

- Schema coverage: every current homepage section has editable fields; repeated visible items are nested blocks; header/footer content is covered by `site-settings`.
- Visual editing coverage: every visible Storyblok renderer is required to call `storyblokEditable(blok)`.
- Wix-feel coverage: editors can click sections/items, edit fields, add/remove/reorder sections, and add/remove/reorder nested repeated items.
- Homepage-only scope: event modelling is excluded; later events page work can use an embed block or page-specific embed fields.
- Verification coverage: tests cover registration, editable boundaries, nested rendering, helper behaviour, site settings, and the production build.
