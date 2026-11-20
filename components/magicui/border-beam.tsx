"use client";

/**
 * Magic UI "Border Beam", by Dillion Verma (MIT).
 * 21st.dev: https://21st.dev/magicui/border-beam
 * Adapted: motion/react, palette colours, hidden for reduced motion.
 * The parent needs `position: relative` and a border radius.
 */
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export function BorderBeam({
  size = 90,
  duration = 8,
  delay = 0,
  className,
  reverse = false,
}: {
  size?: number;
  duration?: number;
  delay?: number;
  className?: string;
  reverse?: boolean;
}) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
    >
      <motion.div
        className={cn(
          "absolute aspect-square bg-gradient-to-l from-amber via-accent to-transparent",
          className,
        )}
        style={{ width: size, offsetPath: `rect(0 auto auto 0 round ${size}px)` }}
        initial={{ offsetDistance: reverse ? "100%" : "0%" }}
        animate={{ offsetDistance: reverse ? ["100%", "0%"] : ["0%", "100%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration, delay: -delay }}
      />
    </div>
  );
}
