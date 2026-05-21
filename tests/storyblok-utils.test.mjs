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
  assert.equal(resolveStoryblokUrl({ linktype: "story", cached_url: "home" }), "/");
  assert.equal(resolveStoryblokUrl({ linktype: "story", cached_url: "/home/" }), "/");
  assert.equal(resolveStoryblokUrl(undefined), "");
});
