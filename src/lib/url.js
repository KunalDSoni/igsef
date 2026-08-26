// Prefixes an internal path with the site's base path (empty in dev, "/igsef"
// in production - see astro.config.mjs). Leaves external URLs, mailto:, and
// bare anchors untouched. Use this on every hardcoded internal href/src so
// links keep working when the site moves off the /igsef subpath.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function url(path) {
  if (!path || /^([a-z][a-z0-9+.-]*:|#)/i.test(path)) return path;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
