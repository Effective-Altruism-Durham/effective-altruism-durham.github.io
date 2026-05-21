export interface StoryblokLink {
  linktype?: string;
  url?: string;
  cached_url?: string;
  email?: string;
  story?: {
    full_slug?: string;
  };
}

export function normalizeAnchorId(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const normalized = value
    .replace(/^#/, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return normalized || undefined;
}

export function resolveBackgroundClass(value: unknown): string {
  switch (value) {
    case "teal":
      return "bg-[#0c869b] text-white";
    case "purple":
      return "bg-[#68246d] text-white";
    case "cream":
      return "bg-[#f4efe9] text-black";
    case "white":
    default:
      return "bg-white text-black";
  }
}

export function resolveStoryblokUrl(link: StoryblokLink | null | undefined, fallback = ""): string {
  if (!link) return fallback;
  if (link.linktype === "url") return link.url || fallback;
  if (link.linktype === "email") return link.email ? `mailto:${link.email}` : fallback;
  if (link.linktype === "story") {
    const url = link.cached_url || link.story?.full_slug || "";
    if (!url) return fallback;
    const cleaned = url.replace(/^\/|\/$/g, "");
    return cleaned === "home" ? "/" : `/${cleaned}`;
  }
  return link.cached_url || link.url || fallback;
}
