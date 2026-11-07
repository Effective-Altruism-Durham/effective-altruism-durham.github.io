import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Committee members and alumni, one JSON file each, edited through Pages CMS (`.pages.yml`).
// The schema is checked at build time, so a malformed CMS edit fails CI instead of
// shipping a broken Contact Us page. Optional text fields may be saved as "" by the CMS.
const team = defineCollection({
  loader: glob({ base: "./content/team-members", pattern: "*.json" }),
  schema: z.object({
    order: z.number(),
    name: z.string(),
    roles: z.string(),
    // Optional because alumni's university addresses stop working.
    email: z.string().optional(),
    // Public path from Pages CMS, e.g. "/uploads/amber.png".
    image: z.string().optional(),
    bio: z.string(),
    // Past members move to the "See alumni" section instead of the committee grid.
    alumni: z.boolean().default(false),
    years: z.string().optional(),
    now: z.string().optional(),
    link: z.string().optional(),
  }),
});

export const collections = { team };
