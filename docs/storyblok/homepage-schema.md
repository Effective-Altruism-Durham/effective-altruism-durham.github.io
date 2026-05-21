# Homepage Storyblok Schema

This file is the source-of-truth for the Storyblok components used by the Astro homepage. Field names must match the names here exactly because the Astro renderers read these names from `blok`.

## Components Reference

### Content Type: `page`
Fields:
- `body` (Blocks): Allow `hero_section`, `rich_text_video_section`, `cta_section`, `card_grid_section`, `social_links_section`, `contact_section`
- `meta_title` (Text): Used for document title
- `meta_description` (Textarea): Used for meta description

### Nestable Block: `hero_section`
Fields:
- `headline` (Text)
- `body` (Richtext)
- `buttons` (Blocks): Restrict to `button_link`; allow 0-3 items
- `background_style` (Single-option): `white`, `cream`, `teal`, `purple`
- `divider_style` (Single-option): `top_notch`, `bottom_wave`, `none`
- `anchor_id` (Text): Optional section id without `#`

### Nestable Block: `button_link`
Fields:
- `label` (Text)
- `link` (Link)
- `style` (Single-option): `primary`, `secondary`, `text`

### Nestable Block: `rich_text_video_section`
Fields:
- `heading` (Text)
- `body` (Richtext)
- `video_url` (Text): YouTube embed URL
- `layout` (Single-option): `text_left`, `text_right`, `stacked`
- `background_style` (Single-option): `teal`, `white`, `cream`, `purple`
- `anchor_id` (Text): Optional section id without `#`

### Nestable Block: `cta_section`
Fields:
- `heading` (Text)
- `body` (Richtext)
- `buttons` (Blocks): Restrict to `button_link`; allow 0-2 items
- `background_style` (Single-option): `cream`, `white`, `teal`, `purple`
- `anchor_id` (Text): Optional section id without `#`

### Nestable Block: `card_grid_section`
Fields:
- `heading` (Text)
- `intro` (Richtext): Optional intro above cards
- `cards` (Blocks): Restrict to `text_card`; allow 0-6 items
- `columns` (Single-option): `2`, `3`, `4`
- `background_style` (Single-option): `teal`, `white`, `cream`, `purple`
- `anchor_id` (Text): Optional section id without `#`

### Nestable Block: `text_card`
Fields:
- `label` (Text)
- `text` (Richtext)
- `link` (Link)

### Nestable Block: `social_links_section`
Fields:
- `heading` (Text)
- `links` (Blocks): Restrict to `social_link`; allow 1-6 items
- `background_style` (Single-option): `white`, `cream`, `teal`, `purple`
- `anchor_id` (Text): Optional section id without `#`

### Nestable Block: `social_link`
Fields:
- `label` (Text)
- `link` (Link)
- `icon` (Single-option): `instagram`, `email`, `facebook`, `linkedin`, `website`

### Nestable Block: `contact_section`
Fields:
- `heading` (Text)
- `body` (Richtext)
- `buttons` (Blocks): Restrict to `button_link`; allow 0-3 items
- `background_style` (Single-option): `white`, `cream`, `teal`, `purple`
- `anchor_id` (Text): Optional section id without `#`

### Content Type: `site_settings`
Fields:
- `logo` (Asset): Optional logo override
- `site_name` (Text): Header accessible label
- `navigation` (Blocks): Restrict to `nav_link`
- `footer_text` (Richtext): Footer copy
- `footer_links` (Blocks): Restrict to `nav_link`

### Nestable Block: `nav_link`
Fields:
- `label` (Text)
- `link` (Link)
