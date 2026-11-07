import { getCollection } from "astro:content";

export const DEFAULT_TEAM_IMAGE = "/assets/contact-us/ead_white_square.png";

export interface TeamMember {
  order: number;
  name: string;
  roles: string;
  email?: string;
  bio: string;
  image: string;
  alumni: boolean;
  years?: string;
  now?: string;
  link?: string;
}

/** Everyone in display order, with the default photo filled in. */
async function getPeople(): Promise<TeamMember[]> {
  const entries = await getCollection("team");
  return entries
    .map(({ data }) => ({ ...data, image: data.image || DEFAULT_TEAM_IMAGE }))
    .sort((a, b) => a.order - b.order);
}

/** Current committee members in display order. */
export async function getTeam(): Promise<TeamMember[]> {
  return (await getPeople()).filter((person) => !person.alumni);
}

/** Past committee members in display order. */
export async function getAlumni(): Promise<TeamMember[]> {
  return (await getPeople()).filter((person) => person.alumni);
}
