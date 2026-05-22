import type { IslandRegistry } from "@tinacms/astro/experimental";
import Team from "../components/Team.astro";
import { getTeam } from "./team";

export const islands: IslandRegistry = {
  team: {
    fetch: () => getTeam(),
    component: Team,
    wrapper: {
      tag: "div",
      className:
        "mx-auto w-full max-w-[1200px] px-6 pt-[52px] pb-24 sm:px-8 lg:px-0",
    },
    propsFromData: (result) => ({
      data: (result as Awaited<ReturnType<typeof getTeam>>).data,
    }),
  },
};
