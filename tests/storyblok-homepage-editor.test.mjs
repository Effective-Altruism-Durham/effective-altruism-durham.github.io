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

test("empty Storyblok repeatable fields suppress hardcoded fallback items", async () => {
  for (const path of [files.hero, files.cta, files.cardGrid, files.socialLinks, files.contact]) {
    const content = await source(path);
    assert.doesNotMatch(content, /\w+\.length\s*>\s*0/, `${path} must render the slot even when the CMS array is empty`);
  }
});

test("documented homepage schema fields are consumed by renderers", async () => {
  const hero = await source(files.hero);
  assert.match(hero, /blok\.background_style/);
  assert.match(hero, /blok\.divider_style/);
  assert.match(hero, /blok\.anchor_id/);

  const video = await source("src/storyblok/RichTextVideoSection.astro");
  assert.match(video, /blok\.layout/);

  const cardGrid = await source(files.cardGrid);
  assert.match(cardGrid, /blok\.intro/);
  assert.match(cardGrid, /blok\.columns/);

  const textCard = await source(files.textCard);
  assert.match(textCard, /blok\.link/);

  const socialLinks = await source(files.socialLinks);
  assert.match(socialLinks, /blok\.heading/);

  const contact = await source(files.contact);
  assert.match(contact, /blok\.first_name_label/);
  assert.match(contact, /blok\.submit_label/);
});
