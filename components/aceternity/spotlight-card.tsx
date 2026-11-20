"use client";

/**
 * Pointer-following glow card, after Aceternity UI "Card Spotlight" and the
 * 21st.dev "Spotlight Card" pattern.
 * Adapted: no canvas and no React state; the pointer position is written to
 * CSS variables, so moving the mouse never re-renders. Touch devices simply
 * get the static card.
 */
import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SpotlightCard({
  children,
  className,
  as: Component = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  function track(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
  }
  return (
    <Component
      onPointerMove={track}
      className={cn(
        "group/spot relative overflow-hidden rounded-3xl border border-line bg-surface shadow-soft transition-colors duration-300 hover:border-line-2",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--x, 50%) var(--y, 0%), var(--glow), transparent 65%)",
        }}
      />
      <div className="relative z-[1] h-full">{children}</div>
    </Component>
  );
}
