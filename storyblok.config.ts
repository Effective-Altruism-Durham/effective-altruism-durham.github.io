import { defineConfig } from "storyblok/config";

export default defineConfig({
  region: process.env.STORYBLOK_REGION ?? "eu",
  space: process.env.STORYBLOK_SPACE_ID,
  path: ".storyblok",
  modules: {
    components: {
      pull: {
        separateFiles: true,
      },
      push: {
        dryRun: process.env.STORYBLOK_DRY_RUN === "true",
      },
    },
  },
});
