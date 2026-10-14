/**
 * Pages CMS stores media as public paths (e.g. "/uploads/amber.png"), which Astro can't optimise
 * on their own. Importing the same files through Vite turns them into ImageMetadata, so
 * <Image> can resize them and convert them to WebP at build time.
 *
 * A path missing from this map (e.g. a file outside these folders) is returned unchanged and
 * rendered as a plain <img>.
 */
const modules = import.meta.glob<{ default: ImageMetadata }>(
  [
    "/public/uploads/*.{png,jpg,jpeg,webp,avif,gif}",
    "/public/assets/contact-us/*.{png,jpg,jpeg,webp,avif,gif}",
  ],
  { eager: true },
);

const byPublicPath = new Map(
  Object.entries(modules).map(([file, mod]) => [file.replace(/^\/public/, ""), mod.default]),
);

export function resolveCmsImage(path: string): ImageMetadata | string {
  return byPublicPath.get(path) ?? path;
}
