"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

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

/**
 * The four stops of the home page. Labels come from NAV_LINKS when an entry
 * exists for the section, so copy edits in lib/data.ts still apply.
 */
const STOPS = [
  { id: "hero", fallback: "Home" },
  { id: "about-home", fallback: "About" },
  { id: "portfolio-showcase", fallback: "Portfolio" },
  { id: "contact", fallback: "Contact" },
].map((stop) => ({
  id: stop.id,
  label: NAV_LINKS.find((link) => link.id === stop.id)?.label ?? stop.fallback,
}));

/**
 * Reads the page on every scroll frame:
 * - `active`: the last stop whose section top has passed 35% of the viewport.
 * - `overDark`: whether the bar sits over an element marked `data-nav="dark"`
 *   (the cinematic dark half). The header then takes the `.dark` class so
 *   every token inside it flips, whatever the site theme is.
 */
function useScrollState(enabled: boolean) {
  const [state, setState] = useState({ active: "hero", overDark: true });
  const { scrollY } = useScroll();

  const read = () => {
    const line = window.innerHeight * 0.35;
    let active = STOPS[0].id;
    for (const stop of STOPS) {
      const element = document.getElementById(stop.id);
      if (element && element.getBoundingClientRect().top <= line) active = stop.id;
    }
    const probe = 36;
    const overDark = [...document.querySelectorAll<HTMLElement>('[data-nav="dark"]')].some((element) => {
      const box = element.getBoundingClientRect();
      return box.top <= probe && box.bottom >= probe;
    });
    setState((prev) => (prev.active === active && prev.overDark === overDark ? prev : { active, overDark }));
  };

  useMotionValueEvent(scrollY, "change", () => enabled && read());
  useEffect(() => {
    if (!enabled) return;
    const frame = requestAnimationFrame(read);
    return () => cancelAnimationFrame(frame);
  }, [enabled]);

  return { active: state.active, overDark: enabled && state.overDark };
}

export function SiteNav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const { active, overDark } = useScrollState(onHome);
  const reduce = useReducedMotion();

  return (
    <header className={cn("pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:pt-5", overDark && "dark")}>
      <nav
        aria-label="Main"
        className={cn(
          "pointer-events-auto flex items-center gap-0.5 rounded-full border p-1 transition-[background-color,border-color,box-shadow] duration-300",
          overDark
            ? "border-white/10 bg-canvas/35 backdrop-blur-md"
            : "border-line bg-veil shadow-soft backdrop-blur-xl",
        )}
      >
        {STOPS.map((stop) => {
          const isActive = onHome && active === stop.id;
          return (
            <a
              key={stop.id}
              href={`/#${stop.id}`}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "relative rounded-full px-3 py-2 text-[13px] font-semibold transition-colors sm:px-4 sm:text-sm",
                isActive ? "text-on-accent" : "text-dim hover:text-ink",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-accent shadow-[0_6px_20px_-6px_var(--accent)]"
                  transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative">{stop.label}</span>
            </a>
          );
        })}
        <span aria-hidden className="mx-0.5 h-5 w-px bg-line-2" />
        <ThemeToggle />
      </nav>
    </header>
  );
}
