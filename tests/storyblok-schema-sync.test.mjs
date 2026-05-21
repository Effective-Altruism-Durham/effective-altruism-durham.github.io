import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { storyblokComponents } from "../storyblok/schema/homepage-components.mjs";

test("Storyblok schema includes the homepage editor components", () => {
  const names = storyblokComponents.map((component) => component.name);
  assert.deepEqual(
    names.toSorted(),
    [
      "button_link",
      "card_grid_section",
      "contact_section",
      "cta_section",
      "hero_section",
      "nav_link",
      "page",
      "rich_text_video_section",
      "site_settings",
      "social_link",
      "social_links_section",
      "text_card",
    ].toSorted(),
  );
});

test("root and nested component flags match Storyblok usage", () => {
  const byName = new Map(storyblokComponents.map((component) => [component.name, component]));
  assert.equal(byName.get("page").is_root, true);
  assert.equal(byName.get("site_settings").is_root, true);
  assert.equal(byName.get("hero_section").is_nestable, true);
  assert.equal(byName.get("button_link").is_nestable, true);
});

test("sync script reads management env vars and supports dry-run", async () => {
  const script = await readFile(new URL("../scripts/sync-storyblok-schema.mjs", import.meta.url), "utf8");
  assert.match(script, /STORYBLOK_SPACE_ID/);
  assert.match(script, /STORYBLOK_PERSONAL_ACCESS_TOKEN/);
  assert.match(script, /--dry-run/);
});

test("Storyblok CLI config is env-driven", async () => {
  const config = await readFile(new URL("../storyblok.config.ts", import.meta.url), "utf8");
  assert.match(config, /STORYBLOK_SPACE_ID/);
  assert.match(config, /STORYBLOK_REGION/);
});
