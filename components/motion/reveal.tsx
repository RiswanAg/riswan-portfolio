"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Viewport-triggered entrance. `initial={false}` means the server HTML is
 * fully visible (no blank content before hydration, no LCP penalty); the
 * keyframes only play once the element scrolls into view.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "article" | "section";
  style?: CSSProperties;
}) {
  const reduce = useReducedMotion();
  const Component = motion[as];
  return (
    <Component
      className={cn(className)}
      style={style}
      initial={false}
      whileInView={reduce ? undefined : { opacity: [0, 1], y: [24, 0] }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </Component>
  );
}
