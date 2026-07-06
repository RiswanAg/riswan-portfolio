"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MorphingTextProps {
  texts: string[];
  className?: string;
  textClassName?: string;
  interval?: number;
}

/**
 * Crossfade role-cycler, not MagicUI's original SVG "goo" morph — that
 * version drives a feColorMatrix threshold filter under a CSS blur to melt
 * one word into the next, which WebKit renders inconsistently (soft/hazy
 * edges, extra per-frame cost on iOS). Blur+opacity reads almost the same
 * and matches the AnimatePresence pattern already used in
 * Journey/PortfolioShowcase/HomeIntro.
 */
export function MorphingText({ texts, className, textClassName, interval = 2200 }: MorphingTextProps) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || texts.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % texts.length), interval);
    return () => clearInterval(id);
  }, [texts.length, interval, reduceMotion]);

  return (
    <span className={cn("relative block h-[1.6em] w-full", className)}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={texts[index]}
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, filter: "blur(6px)", y: 8 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0, filter: "blur(6px)", y: -8 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className={cn("absolute inset-x-0 top-0 block whitespace-nowrap", textClassName)}
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
