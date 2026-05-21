import type { IslandRegistry } from "@tinacms/astro/experimental";
import ContactTeam from "../components/ContactTeam.astro";
import { getContactTeam } from "./contact-team";

export const islands: IslandRegistry = {
  "contact-team": {
    fetch: () => getContactTeam(),
    component: ContactTeam,
    wrapper: {
      tag: "div",
      className:
        "mx-auto w-full max-w-[1200px] px-6 pt-[52px] pb-24 sm:px-8 lg:px-0",
    },
    propsFromData: (result) => ({
      data: (result as Awaited<ReturnType<typeof getContactTeam>>).data,
    }),
  },
};
