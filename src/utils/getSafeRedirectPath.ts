/**
 * Returns a same-origin, relative path that is safe to navigate to after login.
 * Anything that could leave the site (absolute URLs, protocol-relative "//host",
 * backslash tricks, "javascript:" etc.) falls back to `fallback`.
 */
const getSafeRedirectPath = (raw: string | null | undefined, fallback: string) => {
  if (!raw) return fallback;

  let candidate = raw;
  try {
    candidate = decodeURIComponent(raw);
  } catch {
    return fallback;
  }

  // Must be a root-relative path, never "//host" or "/\host", and no control chars.
  if (
    !candidate.startsWith("/") ||
    candidate.startsWith("//") ||
    candidate.includes("\\") ||
    /[\u0000-\u001F\u007F]/.test(candidate)
  ) {
    return fallback;
  }

  if (typeof window === "undefined") return candidate;

  try {
    const url = new URL(candidate, window.location.origin);
    if (url.origin !== window.location.origin) return fallback;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
};

export default getSafeRedirectPath;
