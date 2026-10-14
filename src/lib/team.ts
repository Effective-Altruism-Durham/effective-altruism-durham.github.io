import { getCollection } from "astro:content";

export const DEFAULT_TEAM_IMAGE = "/assets/contact-us/ead_white_square.png";

export interface TeamMember {
  order: number;
  name: string;
  roles: string;
  email: string;
  bio: string;
  image: string;
}

/** Committee members in display order, with the default photo filled in. */
export async function getTeam(): Promise<TeamMember[]> {
  const entries = await getCollection("team");
  return entries
    .map(({ data }) => ({ ...data, image: data.image || DEFAULT_TEAM_IMAGE }))
    .sort((a, b) => a.order - b.order);
}
