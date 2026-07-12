"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";

/**
 * Card container with a mouse-tracking radial glow. Renders the card surface
 * itself — pass the usual border/background/padding classes via className.
 * Pure CSS-variable updates on mousemove: no re-renders, no layout work.
 */
export function GlowCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--glow-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--glow-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={`group/glow relative overflow-hidden ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/glow:opacity-100 motion-reduce:hidden"
        style={{
          background:
            "radial-gradient(420px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(46, 230, 198, 0.07), transparent 65%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
