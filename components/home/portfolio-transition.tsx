"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useTransform } from "motion/react";
import { useSectionProgress } from "@/components/motion/use-section-progress";

/**
 * Scene change between the dark and light halves of the page: a giant
 * "PORTFOLIO" sweeps across. The page backdrop (PageBackdrop) watches this
 * element and dissolves its navy layer into the theme's scene meanwhile.
 * Purely decorative, so it is hidden from assistive tech.
 */
export function PortfolioTransition() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const scrollYProgress = useSectionProgress(ref, ["start end", "end end"]);

  const x = useTransform(scrollYProgress, [0, 1], ["55%", "-62%"]);
  const lightWord = useTransform(scrollYProgress, [0.45, 0.8], [0, 1]);
  const wordY = useTransform(scrollYProgress, [0, 1], ["6vh", "-6vh"]);

  if (reduce) return null;

  return (
    <div ref={ref} id="portfolio-sweep" aria-hidden className="relative h-[170vh]">
      {/* the nav stays in its dark style while the backdrop is still navy */}
      <span data-nav="dark" className="pointer-events-none absolute inset-x-0 top-0 h-[62%]" />
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.p
          className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap text-[30vw] font-black uppercase leading-none tracking-tight lg:text-[24vw]"
          style={{ x, y: wordY }}
        >
          <span className="text-white [text-shadow:0_20px_80px_rgb(33_158_188/0.35)]">Portfolio</span>
          <motion.span className="absolute inset-0 text-ink" style={{ opacity: lightWord }}>
            Portfolio
          </motion.span>
        </motion.p>
      </div>
    </div>
  );
}
