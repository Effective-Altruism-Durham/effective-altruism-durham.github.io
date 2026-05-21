import { useStoryblokApi } from "@storyblok/astro";
import { renderRichText } from "@storyblok/astro";
import { resolveStoryblokUrl } from "../storyblok/storyblok-utils";

export async function getStoryblokSiteSettings() {
  if (!import.meta.env.STORYBLOK_DELIVERY_API_TOKEN) return undefined;

  try {
    const storyblokApi = useStoryblokApi();
    const { data } = await storyblokApi.get("cdn/stories/site-settings", {
      version: import.meta.env.DEV ? "draft" : "published",
    });
    const content = data.story?.content;
    if (!content) return undefined;

    return {
      siteName: content.site_name || "Effective Altruism Durham",
      logo: content.logo?.filename || undefined,
      navigation: Array.isArray(content.navigation)
        ? content.navigation.map((item: any) => ({
            label: item.label || "",
            url: resolveStoryblokUrl(item.link),
          })).filter((item: any) => item.label && item.url)
        : undefined,
      footerHtml: content.footer_text ? renderRichText(content.footer_text) : undefined,
      footerLinks: Array.isArray(content.footer_links)
        ? content.footer_links.map((item: any) => ({
            label: item.label || "",
            url: resolveStoryblokUrl(item.link),
          })).filter((item: any) => item.label && item.url)
        : undefined,
    };
  } catch (error) {
    console.warn("Storyblok site settings unavailable; rendering static header/footer.", error);
    return undefined;
  }
}
