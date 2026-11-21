"use client";

import type { RefObject } from "react";
import { useScroll, useTransform, type UseScrollOptions } from "motion/react";

/**
 * Scroll progress (0 → 1) of a section, for scroll-linked choreography.
 *
 * Motion 14.10 hands simple `useTransform(scrollYProgress, [..], [..])`
 * chains to the browser's native ViewTimeline, but maps offsets such as
 * ["start start", "end end"] onto exit-crossing ranges that span the whole
 * element. Fades then run out of step with the JS-driven transforms (the hero
 * never fully darkened). Passing the value through a function transform keeps
 * every derived value on Motion's own, correct, scroll tracking.
 */
export function useSectionProgress(
  target: RefObject<HTMLElement | null>,
  offset: UseScrollOptions["offset"] = ["start start", "end end"],
) {
  const { scrollYProgress } = useScroll({ target, offset });
  return useTransform(scrollYProgress, (value) => value);
}
