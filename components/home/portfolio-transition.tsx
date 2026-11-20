"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Scene change between the dark and light halves of the page: a giant
 * "PORTFOLIO" sweeps across while the navy backdrop fades out to the
 * site canvas (light grey in light theme), contour lines carrying through.
 * Purely decorative, so it is hidden from assistive tech.
 */
export function PortfolioTransition() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });

  const x = useTransform(scrollYProgress, [0, 1], ["55%", "-62%"]);
  const dark = useTransform(scrollYProgress, [0.45, 0.8], [1, 0]);
  const lightWord = useTransform(scrollYProgress, [0.45, 0.8], [0, 1]);

  if (reduce) return null;

  return (
    <div ref={ref} aria-hidden className="relative h-[170vh]">
      {/* the nav stays in its dark style while the backdrop is still navy */}
      <span data-nav="dark" className="pointer-events-none absolute inset-x-0 top-0 h-[62%]" />
      <div className="sticky top-0 h-svh overflow-hidden bg-canvas">
        <div className="contours absolute inset-0" />
        <motion.div className="dark absolute inset-0 bg-canvas" style={{ opacity: dark }}>
          <div className="contours absolute inset-0" />
        </motion.div>
        <motion.p
          className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap text-[30vw] font-black uppercase leading-none tracking-tight lg:text-[24vw]"
          style={{ x }}
        >
          <span className="text-white">Portfolio</span>
          <motion.span className="absolute inset-0 text-ink" style={{ opacity: lightWord }}>
            Portfolio
          </motion.span>
        </motion.p>
      </div>
    </div>
  );
}
