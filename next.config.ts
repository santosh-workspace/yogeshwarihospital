import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first, WebP fallback. All imagery is local, so no remotePatterns needed.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 420, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [48, 64, 96, 128, 256, 384],
    // A year — the filenames are content-hashed by the build.
    minimumCacheTTL: 31_536_000,
  },

  // Ships smaller client bundles by tree-shaking barrel imports from these packages.
  experimental: {
    optimizePackageImports: ["react-icons", "framer-motion"],
  },

  poweredByHeader: false,
  compress: true,

  /**
   * Canonical host consolidation: the apex (and any stale host pointing at
   * this deployment) permanently redirects to https://www.yogeshwarisurgical.com,
   * preserving the path. `permanent: true` emits a 308 Permanent Redirect,
   * which Google treats exactly like a 301 for indexing/canonicalization.
   * (Next.js `redirects()` only supports 307/308; a literal 301 would need
   * edge middleware on every request, which costs latency for zero SEO gain.)
   *
   * NOTE: on Vercel this rule only fires if the apex domain is assigned to the
   * project — see the deployment notes in the SEO report. Alternatively set a
   * domain-level 301 in Vercel Dashboard → Domains → yogeshwarisurgical.com →
   * Redirect to www, which makes this rule redundant but harmless (it never
   * matches www, so no loop is possible either way).
   */
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "yogeshwarisurgical.com" }],
        destination: "https://www.yogeshwarisurgical.com/:path*",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
          },
        ],
      },
      {
        // Static assets are immutable — let the CDN and browser hold them.
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
