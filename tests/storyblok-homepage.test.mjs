import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const cardGridSource = await readFile(
  new URL("../src/storyblok/CardGridSection.astro", import.meta.url),
  "utf8",
);
const textCardSource = await readFile(
  new URL("../src/storyblok/TextCard.astro", import.meta.url),
  "utf8",
);

test("card grid renders nested Storyblok card blocks for visual editing", () => {
  assert.match(cardGridSource, /StoryblokComponent/);
  assert.match(cardGridSource, /blok\.cards/);
  assert.match(cardGridSource, /Array\.isArray\(blok\.cards\)/);
});

test("text cards expose their own Storyblok editable boundary", () => {
  assert.match(textCardSource, /storyblokEditable/);
  assert.match(textCardSource, /storyblokEditable\(blok\)/);
});
