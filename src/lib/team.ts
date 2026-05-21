import { requestWithMetadata } from "@tinacms/astro";

export interface TeamMemberData {
  __typename: "TeamMember";
  id: string;
  order: number;
  name: string;
  roles: string;
  email: string;
  bio: string;
  image: string;
  _sys: {
    filename: string;
    basename: string;
    path: string;
    relativePath: string;
    extension: string;
    breadcrumbs: string[];
    hasReferences: boolean;
  };
  _content_source?: {
    queryId: string;
    path: Array<string | number>;
  };
}

export interface TeamData {
  __typename: "Team";
  title: string;
  people: TeamMemberData[];
  _content_source?: {
    queryId: string;
    path: Array<string | number>;
  };
}

type TeamMemberJson = Omit<
  TeamMemberData,
  "__typename" | "id" | "_sys" | "_content_source"
>;

const teamMemberModules = import.meta.glob("../../content/team-members/*.json", {
  eager: true,
});

const TEAM_MEMBER_QUERY = `
  query teamMember($relativePath: String!) {
    teamMember(relativePath: $relativePath) {
      __typename
      order
      name
      roles
      email
      image
      bio
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
  }
`;

export async function getTeam(): Promise<{ data: TeamData }> {
  const people = await Promise.all(
    Object.entries(teamMemberModules).map(([path, entry]) => {
      const person = toTeamMember(
        path,
        (entry as { default: TeamMemberJson }).default
      );
      return getTeamMember(person);
    })
  );

  return {
    data: {
      __typename: "Team",
      title: "Contact Us",
      people: people.sort((a, b) => a.order - b.order),
    },
  };
}

async function getTeamMember(person: TeamMemberData): Promise<TeamMemberData> {
  const result = await requestWithMetadata({
    data: {
      teamMember: person,
    },
    query: TEAM_MEMBER_QUERY,
    variables: {
      relativePath: person._sys.relativePath,
    },
  });

  return result.data.teamMember;
}

function toTeamMember(path: string, member: TeamMemberJson): TeamMemberData {
  const relativePath = path.split("/content/team-members/")[1] ?? path;
  const filename = relativePath.replace(/\.json$/, "");

  return {
    __typename: "TeamMember",
    id: `team-members/${relativePath}`,
    ...member,
    _sys: {
      filename,
      basename: filename,
      path: `team-members/${relativePath}`,
      relativePath,
      extension: ".json",
      breadcrumbs: [relativePath],
      hasReferences: false,
    },
  };
}
