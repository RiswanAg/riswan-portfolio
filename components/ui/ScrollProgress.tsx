"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin violet→aqua bar pinned to the top of the page that fills as the user
 * scrolls. Uses the native scroll progress (0→1) smoothed by a spring.
 * Transform-only, so it's cheap; framer disables the spring under
 * prefers-reduced-motion.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-[#7C5CFF] via-[#2EE6C6] to-[#2EE6C6]"
    />
  );
}
