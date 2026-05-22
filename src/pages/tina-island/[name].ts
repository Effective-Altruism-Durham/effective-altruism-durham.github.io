import type { APIRoute } from "astro";
import { experimental_createIslandRoute } from "@tinacms/astro/experimental";
import { islands } from "../../lib/islands";

export const prerender = true;

export function getStaticPaths() {
  return Object.keys(islands).map(name => ({
    params: { name }
  }));
}

export const ALL: APIRoute = experimental_createIslandRoute(islands);
