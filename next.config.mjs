import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const isDev = process.env.NODE_ENV !== "production";
const isPreview = process.env.VERCEL_ENV === "preview";

// Le site ne charge aucune ressource tierce : tout est servi depuis la même origine.
// 'unsafe-inline' reste nécessaire pour les scripts d'amorçage de Next.js et le JSON-LD ;
// la CSP limite néanmoins les origines autorisées et interdit l'intégration dans une iframe.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}${isPreview ? " https://vercel.live" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  `connect-src 'self'${isPreview ? " https://vercel.live wss://ws-us3.pusher.com" : ""}`,
  `frame-src https://www.openstreetmap.org${isPreview ? " https://vercel.live" : ""}`,
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  ...(isDev ? [] : ["upgrade-insecure-requests"])
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" }
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: new URL(".", import.meta.url).pathname,
  poweredByHeader: false,
  // Métadonnées (titre, description, canonique) toujours rendues dans le <head>, sans streaming :
  // les robots d'indexation et des moteurs IA qui n'exécutent pas JavaScript les lisent ainsi sur toutes les pages.
  htmlLimitedBots: /.*/,
  images: {
    formats: ["image/avif", "image/webp"]
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Espaces privés et pages personnelles : jamais indexés.
      ...["admin", "espace-client/reinitialisation", "devis/signature"].map((area) => ({
        source: `/:locale(fr|en|ar)/${area}/:path*`,
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]
      })),
      { source: "/api/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex" }] }
    ];
  },
  async redirects() {
    // Domaine principal : https://www.vit-global.tech (canonique). Le domaine nu y est redirigé définitivement.
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "vit-global.tech" }],
        destination: "https://www.vit-global.tech/:path*",
        permanent: true
      }
    ];
  }
};

export default withNextIntl(nextConfig);
