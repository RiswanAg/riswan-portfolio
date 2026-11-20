"use client";

/**
 * Aceternity UI "Flip Words", by Manu Arora.
 * 21st.dev: https://21st.dev/aceternity/flip-words
 * Adapted: motion/react, the first word is server-rendered (no empty slot
 * before hydration), screen readers get the full list once, and reduced
 * motion keeps the first word static.
 */
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export function FlipWords({
  words,
  interval = 2800,
  className,
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || words.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [reduce, words.length, interval]);

  return (
    <span className={cn("relative inline-grid", className)}>
      <span className="sr-only">{words.join(", ")}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          aria-hidden
          className="col-start-1 row-start-1 inline-block whitespace-nowrap"
          initial={{ opacity: 0, y: "0.6em", filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: "-0.6em", filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
