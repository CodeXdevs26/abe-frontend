/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV !== "production";

const toOrigin = (url?: string) => {
  try {
    return url ? new URL(url).origin : "";
  } catch {
    return "";
  }
};
const apiOrigin = toOrigin(process.env.NEXT_PUBLIC_API_BASE_URL);

// ---------------------------------------------------------------------------
// Remote images allowed through the Next image optimizer.
// Uploads are stored in the backend's S3 bucket (eu-north-1). Override with a
// comma-separated IMAGE_REMOTE_HOSTS env var, e.g.
//   IMAGE_REMOTE_HOSTS=my-bucket.s3.eu-north-1.amazonaws.com,cdn.example.com
// ---------------------------------------------------------------------------
const imageHosts = (
  process.env.IMAGE_REMOTE_HOSTS ||
  "**.s3.eu-north-1.amazonaws.com,lh3.googleusercontent.com"
)
  .split(",")
  .map((h) => h.trim())
  .filter(Boolean);

const remotePatterns: { protocol: "http" | "https"; hostname: string }[] =
  imageHosts.map((hostname) => ({ protocol: "https", hostname }));

// Also allow images served by the API host itself (http only for localhost dev).
if (apiOrigin) {
  const api = new URL(apiOrigin);
  remotePatterns.push({
    protocol: api.protocol.replace(":", "") as "http" | "https",
    hostname: api.hostname,
  });
}

// ---------------------------------------------------------------------------
// Content Security Policy
// - ENFORCED: directives that cannot break the app (no plugins, no <base>
//   hijacking, no clickjacking).
// - REPORT-ONLY: the full script/connect allow-list. Watch the browser console
//   in production for violations, then move it into the enforced header.
// ---------------------------------------------------------------------------
const enforcedCsp = [
  "object-src 'none'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
].join("; ");

const reportOnlyCsp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://maps.googleapis.com https://maps.gstatic.com`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https:" + (isDev ? " http:" : ""),
  "font-src 'self' data: https://fonts.gstatic.com",
  `connect-src 'self' ${apiOrigin} https://maps.googleapis.com https://*.googleapis.com${isDev ? " ws: http://localhost:*" : ""}`.trim(),
  "frame-src 'self' https://www.google.com https://js.stripe.com https://checkout.stripe.com",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: enforcedCsp },
  { key: "Content-Security-Policy-Report-Only", value: reportOnlyCsp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), payment=(), geolocation=(self)",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000",
  },
];

const nextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns,
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
