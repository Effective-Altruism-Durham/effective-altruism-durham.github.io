import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Committee members, one JSON file each, edited through Pages CMS (`.pages.yml`).
// The schema is checked at build time, so a malformed CMS edit fails CI instead of
// shipping a broken Contact Us page.
const team = defineCollection({
  loader: glob({ base: "./content/team-members", pattern: "*.json" }),
  schema: z.object({
    order: z.number(),
    name: z.string(),
    roles: z.string(),
    email: z.string(),
    // Public path from Pages CMS, e.g. "/uploads/amber.png".
    image: z.string().optional(),
    bio: z.string(),
  }),
});

export const collections = { team };
