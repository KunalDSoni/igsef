"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { features } from "@/config/features";
import { settings } from "@/content/settings";
import { identityFields } from "@/content/disclosures";
import { site, routes } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { footerNav } from "./navigation";
import { Wordmark } from "./Wordmark";
import styles from "./SiteFooter.module.css";

/**
 * The footer also carries the full navigation, which makes every route
 * reachable if the mobile menu's JavaScript fails to load.
 */
export function SiteFooter() {
  const pathname = usePathname();
  const groups = footerNav();
  const verifiedIdentity = identityFields.filter((f) => f.value !== null);

  return (
    <footer className={`${styles.footer} on-dark`}>
      <Container>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Wordmark onDark />
            <p className={styles.brandLine}>{site.brandLine}</p>
            <p className={styles.brandBody}>
              A newly established Indian foundation working towards practical education,
              future-ready skills, stronger institutions, and collaboration between learning and the
              world of work.
            </p>
          </div>

          {groups.map((group) => (
            <div key={group.heading}>
              <h2 className={styles.groupHeading}>{group.heading}</h2>
              <ul className={styles.groupList}>
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={styles.groupLink}
                      aria-current={pathname === item.href ? "page" : undefined}
                      onClick={() =>
                        trackEvent("nav_click", { source: "footer", destination: item.href })
                      }
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.identity}>
          <div>
            <h2 className={styles.identityHeading}>Legal identity</h2>
            {features.corporateDisclosures && verifiedIdentity.length > 0 ? (
              <dl className={styles.identityList}>
                {verifiedIdentity.map((field) => (
                  <div key={field.label} className={styles.identityRow}>
                    <dt className={styles.identityTerm}>{field.label}:</dt>
                    <dd className={styles.identityValue}>{field.value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              /*
               * Blocked variant. The registered name, registration number,
               * incorporation date and registered office are not published until
               * they have been checked against authoritative documents. Stating
               * that plainly is more useful to a visitor than an empty block.
               */
              <p className={styles.identityBody}>
                Our registered legal identity details are being verified against authoritative
                incorporation records and are not published on this website yet. They will appear
                here and on our corporate disclosures page once each item has been checked and
                approved.
              </p>
            )}
          </div>

          <div>
            <h2 className={styles.identityHeading}>Corrections and access</h2>
            <p className={styles.identityBody}>
              Information on this website is reviewed periodically. To report an error or request an
              accessible format, use the{" "}
              <Link
                href={routes.contact}
                className={styles.groupLink}
                style={{ minHeight: "auto" }}
              >
                enquiry form
              </Link>{" "}
              and select the relevant enquiry type.
            </p>
            {settings.publicEmail ? (
              <p className={styles.identityBody}>
                Email:{" "}
                <a href={`mailto:${settings.publicEmail}`} className={styles.groupLink}>
                  {settings.publicEmail}
                </a>
              </p>
            ) : null}
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © {site.establishedYear} {site.legalNameWorking}. All rights reserved.
          </p>
          <p>
            Website content is reviewed periodically. Statuses shown are current at review date.
          </p>
        </div>
      </Container>
    </footer>
  );
}
