"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Riswan Hamua, home"
      className={cn("text-lg font-semibold tracking-tight text-ink", className)}
    >
      RH<span className="text-amber">.</span>
    </Link>
  );
}

/** Highlights the nav link of the section currently in the middle of the viewport. */
function useActiveSection(ids: string[], enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!enabled) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [ids, enabled]);
  return active;
}

const SECTION_IDS = NAV_LINKS.map((link) => link.id);

export function SiteNav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const active = useActiveSection(SECTION_IDS, onHome);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLink.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const button = menuButton.current;
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      button?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={cn(
          "mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 rounded-full border px-4 transition-[background-color,border-color,box-shadow] duration-300 sm:px-5",
          scrolled || open || !onHome
            ? "border-line bg-veil shadow-soft backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = onHome && active === link.id;
            return (
              <a
                key={link.id}
                href={link.href ?? `/#${link.id}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  isActive ? "text-ink" : "text-dim hover:text-ink",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-surface-2"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {link.label}
              </a>
            );
          })}
        </nav>
        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <InteractiveHoverButton href="/#contact" variant="ink" className="hidden min-h-10 px-5 sm:inline-flex">
            Let’s talk
          </InteractiveHoverButton>
          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center rounded-full text-ink transition-colors hover:bg-surface-2 lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              aria-hidden
              onClick={() => setOpen(false)}
              className="fixed inset-0 -z-10 bg-canvas/70 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.nav
              key="menu"
              id="mobile-menu"
              aria-label="Mobile"
              className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl border border-line bg-surface p-2 shadow-soft lg:hidden"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              {[...NAV_LINKS, { id: "contact", label: "Let’s talk", href: undefined }].map((link, index) => (
                <motion.a
                  key={link.id}
                  ref={index === 0 ? firstLink : undefined}
                  href={link.href ?? `/#${link.id}`}
                  onClick={() => setOpen(false)}
                  className="flex min-h-13 items-center justify-between rounded-2xl px-4 text-lg font-medium text-ink hover:bg-surface-2"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * index + 0.05 }}
                >
                  {link.label}
                  <ArrowUpRight size={18} className="text-dim" />
                </motion.a>
              ))}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
