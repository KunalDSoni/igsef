import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Lets a second build live beside the default one, which the end-to-end suite
   * uses to run a demo-mode server (mocked enquiry adapter) alongside the real
   * default-state server without the two overwriting each other's output.
   */
  distDir: process.env.NEXT_DIST_DIR ?? ".next",

  /** Fail the build rather than ship type errors. Linting runs as its own
      script (`npm run lint`) and in `npm run verify`. */
  typescript: { ignoreBuildErrors: false },

  /** Trim the `x-powered-by` header; it advertises the stack for no benefit. */
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          /* Defence in depth. The platform may add its own; these are the ones
             the application can guarantee regardless of where it is hosted. */
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
      {
        /* The enquiry endpoint must never be cached by a proxy or the browser. */
        source: "/api/:path*",
        headers: [{ key: "Cache-Control", value: "no-store, max-age=0" }],
      },
    ];
  },
};

export default nextConfig;
