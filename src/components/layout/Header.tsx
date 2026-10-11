"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiMenu, FiPhone, FiX } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { Logo } from "@/components/brand/Logo";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { ButtonLink } from "@/components/ui/Button";
import { addressLines, links, nav, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { BookAppointmentButton } from "@/components/booking/BookAppointmentButton";
import { ButtonRow } from "@/components/ui/ButtonRow";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const reduced = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  /**
   * The sheet stores *which route it was opened on* rather than a boolean.
   * Navigating changes `pathname`, so the comparison goes false on its own and
   * the sheet closes — no effect syncing state to a route change, and no
   * cascading render.
   */
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const menuOpen = openedOn === pathname;
  const setMenuOpen = (open: boolean) => setOpenedOn(open ? pathname : null);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Lock the body and trap Escape while the sheet is open.
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    // Calls the setter directly — `setMenuOpen` is recreated each render and
    // would only churn this effect's dependencies.
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenedOn(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Utility strip — desktop only, carries NAP for consistency */}
      <div className="hidden border-b border-edge bg-surface-2 lg:block">
        <div className="container-page flex h-10 items-center justify-between text-[0.78rem] text-fg-subtle">
          <p>
            {siteConfig.tagline} · {siteConfig.address.locality}, {siteConfig.address.region}
          </p>
          <div className="flex items-center gap-5">
            <a
              href={links.tel}
              className="flex items-center gap-1.5 font-medium text-fg-muted transition-colors hover:text-brand-700"
            >
              <FiPhone aria-hidden="true" className="text-[0.9rem]" />
              {siteConfig.contact.phoneDisplay}
            </a>
            <span aria-hidden="true" className="h-3.5 w-px bg-ink-200" />
            <SocialLinks tone="bare" size="sm" className="gap-3" />
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-500 ease-[var(--ease-out-expo)]",
          scrolled
            ? "border-b border-edge/90 bg-surface-2/85 backdrop-blur-xl supports-[backdrop-filter]:bg-surface-2/72"
            : "border-b border-transparent bg-surface-2",
        )}
      >
        <div
          className={cn(
            "container-page flex items-center justify-between transition-[height] duration-500",
            scrolled ? "h-16 lg:h-18" : "h-18 lg:h-22",
          )}
        >
          <Link href="/" aria-label={`${siteConfig.name} — home`} className="shrink-0">
            <Logo />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const children = "children" in item ? item.children : undefined;
                const active = isActive(item.href);

                return (
                  <li
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => children && setOpenDropdown(item.href)}
                    onMouseLeave={() => children && setOpenDropdown(null)}
                  >
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      aria-expanded={children ? openDropdown === item.href : undefined}
                      className={cn(
                        "group relative flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.92rem] font-medium transition-colors duration-300",
                        active ? "text-brand-700" : "text-fg-muted hover:text-fg",
                      )}
                    >
                      {item.label}
                      {children && (
                        <FiChevronDown
                          aria-hidden="true"
                          className={cn(
                            "text-[0.85rem] transition-transform duration-300",
                            openDropdown === item.href && "rotate-180",
                          )}
                        />
                      )}
                      {/* Underline grows from the centre */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-3.5 bottom-0.5 h-[1.5px] origin-center scale-x-0 rounded-full bg-linear-to-r from-brand-500 to-rose-400 transition-transform duration-400 ease-[var(--ease-out-expo)] group-hover:scale-x-100",
                          active && "scale-x-100",
                        )}
                      />
                    </Link>

                    <AnimatePresence>
                      {children && openDropdown === item.href && (
                        <motion.ul
                          initial={reduced ? undefined : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={reduced ? undefined : { opacity: 0, y: 8 }}
                          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute left-1/2 top-full w-64 -translate-x-1/2 pt-3"
                        >
                          <div className="overflow-hidden rounded-2xl border border-edge bg-surface-2 p-2 shadow-[var(--shadow-lift)]">
                            {children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  className="block rounded-xl px-3.5 py-2.5 text-[0.9rem] font-medium text-fg-muted transition-colors hover:bg-brand-50 hover:text-brand-700"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </div>
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5">
            {/*
              Responsive visibility lives on these wrappers, not on the button.
              The button's own base class list contains `inline-flex`, and
              Tailwind emits `.inline-flex` after `.hidden` in the stylesheet —
              so a `hidden` passed via className would lose the cascade and the
              button would never actually hide.
            */}
            <ButtonRow stack={false} className="gap-2.5">
              <span className="hidden xl:block">
                <ButtonLink
                  href={links.whatsapp()}
                  variant="whatsapp"
                  size="sm"
                  icon={<FaWhatsapp />}
                  magnetic={false}
                  fullWidth
                >
                  WhatsApp
                </ButtonLink>
              </span>
              <span className="hidden sm:block">
                <BookAppointmentButton size="sm" arrow fullWidth>
                  Book Appointment
                </BookAppointmentButton>
              </span>
            </ButtonRow>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="grid size-11 place-items-center rounded-full border border-edge text-fg transition-colors hover:border-brand-300 hover:text-brand-700 lg:hidden"
            >
              <FiMenu aria-hidden="true" className="text-[1.2rem]" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[70] bg-ink-950/45 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={reduced ? { opacity: 0 } : { x: "100%" }}
              animate={reduced ? { opacity: 1 } : { x: 0 }}
              exit={reduced ? { opacity: 0 } : { x: "100%" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 right-0 z-[71] flex w-[min(23rem,92vw)] flex-col bg-surface-2 lg:hidden"
            >
              <div className="flex h-18 shrink-0 items-center justify-between border-b border-edge px-5">
                <Link
                  href="/"
                  aria-label={`${siteConfig.name} — home`}
                  onClick={() => setMenuOpen(false)}
                >
                  <Logo compact />
                </Link>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="grid size-11 place-items-center rounded-full border border-edge text-fg"
                >
                  <FiX aria-hidden="true" className="text-[1.2rem]" />
                </button>
              </div>

              <nav
                aria-label="Mobile"
                data-lenis-prevent
                className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-5 py-6"
              >
                <ul className="space-y-1">
                  {nav.map((item, i) => {
                    const children = "children" in item ? item.children : undefined;
                    return (
                      <motion.li
                        key={item.href}
                        initial={reduced ? undefined : { opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.06 + i * 0.045,
                          duration: 0.45,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        <Link
                          href={item.href}
                          aria-current={isActive(item.href) ? "page" : undefined}
                          className={cn(
                            "flex min-h-13 items-center rounded-xl px-3 text-[1.05rem] font-semibold tracking-tight transition-colors",
                            isActive(item.href)
                              ? "bg-brand-50 text-brand-700"
                              : "text-fg active:bg-surface-3",
                          )}
                        >
                          {item.label}
                        </Link>
                        {children && (
                          <ul className="mb-1 ml-3 border-l border-edge pl-4">
                            {children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  className="flex min-h-11 items-center text-[0.94rem] text-fg-muted transition-colors active:text-brand-700"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </motion.li>
                    );
                  })}
                </ul>

                <div className="mt-7 space-y-2.5 pb-8">
                  <BookAppointmentButton fullWidth size="lg" arrow magnetic={false}>
                    Book Appointment
                  </BookAppointmentButton>
                  <div className="grid grid-cols-2 gap-2.5">
                    <ButtonLink
                      href={links.tel}
                      variant="secondary"
                      icon={<FiPhone />}
                      fullWidth
                      magnetic={false}
                    >
                      Call
                    </ButtonLink>
                    <ButtonLink
                      href={links.whatsapp()}
                      variant="whatsapp"
                      icon={<FaWhatsapp />}
                      fullWidth
                      magnetic={false}
                    >
                      WhatsApp
                    </ButtonLink>
                  </div>
                </div>

                {/*
                  mt-auto pins this block to the foot of the sheet. Without it
                  the nav's spare height collapsed into a blank gap under the
                  social icons on tall phones.
                */}
                <div className="mt-auto border-t border-edge pt-6">
                  <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-fg-subtle">
                    Follow us
                  </p>
                  <SocialLinks />
                  <p className="mt-5 text-[0.78rem] leading-relaxed text-fg-subtle">
                    {addressLines[1]}
                    <br />
                    {siteConfig.address.locality}
                  </p>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
