export function resolveStoryblokLink(link, fallback = "") {
  const url = link?.url || link?.cached_url || link?.story?.url || fallback;

  if (!url || url.startsWith("/") || url.startsWith("#") || /^[a-z]+:/i.test(url)) {
    return url;
  }

  return `/${url}`;
}
