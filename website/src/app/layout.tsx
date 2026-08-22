import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SkipLink } from "@/components/site/SkipLink";
import { isProduction, site, siteUrl } from "@/config/site";
import { bodyFont, displayFont } from "@/lib/fonts";
import { websiteJsonLd } from "@/lib/seo";
import "./globals.css";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.legalNameWorking} | Education & Skills`,
    template: `%s | ${site.legalNameWorking}`,
  },
  description: site.description,
  applicationName: site.legalNameWorking,
  /* Staging builds are excluded from search in full. */
  robots: isProduction
    ? undefined
    : { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#FCFAED",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={site.htmlLang} className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className={styles.body}>
        <SkipLink />
        <SiteHeader />
        {/* tabIndex -1 makes the skip-link target focusable without adding it to
            the tab order. */}
        <main id="main" tabIndex={-1} className={styles.main}>
          {children}
        </main>
        <SiteFooter />
        <script
          type="application/ld+json"
          // Static, build-time JSON built from configuration values only — it
          // contains no user input and no unverified corporate fact.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
      </body>
    </html>
  );
}
