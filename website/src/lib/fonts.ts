import localFont from "next/font/local";

/**
 * Self-hosted variable fonts.
 *
 * Loaded from the repository with `next/font/local`, so the browser makes no
 * request to Google Fonts or any other third-party host at runtime. Two families
 * and two weight axes only, per the performance budget (NFR-P03).
 *
 * `display: "swap"` keeps text readable during font load; the fallback metrics
 * below limit the layout shift when the web font arrives.
 */

export const displayFont = localFont({
  src: [
    {
      path: "../fonts/PlusJakartaSans-Variable-latin.woff2",
      weight: "600 800",
      style: "normal",
    },
    {
      path: "../fonts/PlusJakartaSans-Variable-latin-ext.woff2",
      weight: "600 800",
      style: "normal",
    },
  ],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
  adjustFontFallback: "Arial",
  preload: true,
});

export const bodyFont = localFont({
  src: [
    {
      path: "../fonts/NunitoSans-Variable-latin.woff2",
      weight: "400 700",
      style: "normal",
    },
    {
      path: "../fonts/NunitoSans-Variable-latin-ext.woff2",
      weight: "400 700",
      style: "normal",
    },
  ],
  variable: "--font-nunito-sans",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
  adjustFontFallback: "Arial",
  preload: true,
});
