"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { partnershipCtaEnabled } from "@/config/cta";
import { cta } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { primaryNav } from "./navigation";
import { Wordmark } from "./Wordmark";
import styles from "./SiteHeader.module.css";

/** True for the exact route and for any descendant of a section route. */
function isCurrent(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const items = primaryNav();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const closeMenu = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const openMenu = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    // showModal() supplies focus containment, Escape handling, background
    // inertness and focus restoration natively — no hand-rolled focus trap.
    dialog.showModal();
    setOpen(true);
  }, []);

  /* Keep React state in step with native close (Escape, backdrop, form method). */
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      setOpen(false);
      // Native dialog restores focus to the opener in modern browsers; this
      // makes the restoration explicit and reliable across engines.
      triggerRef.current?.focus();
    };

    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, []);

  /* Prevent the page behind the panel from scrolling while it is open. */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  /* A route change must not leave the panel open. */
  useEffect(() => {
    if (dialogRef.current?.open) {
      dialogRef.current.close();
    }
  }, [pathname]);

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Wordmark />

        <nav className={styles.desktopNav} aria-label="Main">
          <ul className={styles.navList}>
            {items.map((item) => {
              const current = isCurrent(pathname, item.href);
              return (
                <li key={item.href} className={styles.navItem}>
                  <Link
                    href={item.href}
                    className={styles.navLink}
                    aria-current={current ? "page" : undefined}
                    onClick={() =>
                      trackEvent("nav_click", { source: "header", destination: item.href })
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/*
          The header CTA appears only when the enquiry route is operational
          (project-controls.md §3). Until then the header carries navigation
          alone rather than an action that cannot yet be honoured.
        */}
        {partnershipCtaEnabled() ? (
          <ButtonLink href={cta.partnership.href} className={styles.headerCta}>
            {cta.partnership.label}
          </ButtonLink>
        ) : null}

        <button
          ref={triggerRef}
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-controls="main-menu"
          onClick={openMenu}
        >
          <span className={styles.toggleBars} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          Menu
        </button>
      </Container>

      <dialog
        id="main-menu"
        ref={dialogRef}
        className={styles.panel}
        aria-label="Main menu"
        onCancel={closeMenu}
      >
        <div className={styles.panelInner}>
          <div className={styles.panelHeader}>
            <Wordmark />
            <button type="button" className={styles.close} onClick={closeMenu}>
              Close
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
                <path
                  d="M2 2l10 10M12 2L2 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <p className={styles.panelHelper}>
            Explore our purpose, proposed work, and ways to collaborate.
          </p>

          <nav aria-label="Main">
            <ul className={styles.panelList}>
              {items.map((item) => {
                const current = isCurrent(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={styles.panelLink}
                      aria-current={current ? "page" : undefined}
                      onClick={() => {
                        trackEvent("nav_click", { source: "mobile_menu", destination: item.href });
                        closeMenu();
                      }}
                    >
                      {item.label}
                      {current ? <span className={styles.currentTag}>Current page</span> : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className={styles.panelFooter}>
            {partnershipCtaEnabled() ? (
              <ButtonLink href={cta.partnership.href} block>
                {cta.partnership.label}
              </ButtonLink>
            ) : (
              <ButtonLink href={cta.focusAreas.href} block variant="secondary">
                {cta.focusAreas.label}
              </ButtonLink>
            )}
          </div>
        </div>
      </dialog>
    </header>
  );
}
