/**
 * Resolves a root-relative asset path (e.g. "/assets/images/x.webp")
 * against the app's configured base path (import.meta.env.BASE_URL).
 * Without this, images break when the app is deployed under a
 * subpath such as GitHub Pages' /anahita/.
 */
export function assetUrl(path: string): string {
  if (!path) return path;
  const base = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  return `${base}${path.replace(/^\/+/, "")}`;
}
