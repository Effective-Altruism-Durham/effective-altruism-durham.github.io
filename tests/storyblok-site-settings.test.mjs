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

test("site settings surfaces expose visual editor boundaries", async () => {
  const header = await readFile(new URL("../src/components/SiteHeader.astro", import.meta.url), "utf8");
  const footer = await readFile(new URL("../src/components/SiteFooter.astro", import.meta.url), "utf8");
  assert.match(header, /storyblokEditable/);
  assert.match(header, /item\.blok/);
  assert.match(footer, /storyblokEditable/);
  assert.match(footer, /link\.blok/);
});
