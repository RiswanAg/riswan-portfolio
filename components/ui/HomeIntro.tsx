"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function HomeIntro() {
  const [active, setActive] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!active || reduceMotion) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [active, reduceMotion]);

  if (reduceMotion) return null;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[80] flex items-center justify-center overflow-hidden bg-black"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          <div className="absolute inset-0 bg-grid opacity-80" />
          <motion.div
            className="absolute h-56 w-56 rounded-full bg-[#DF2531]/20 blur-3xl"
            initial={{ scale: 0.65, opacity: 0 }}
            animate={{ scale: [0.65, 1, 0.45], opacity: [0, 1, 0] }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          />

          <motion.div
            className="fixed left-[calc(50%-6.75rem)] top-[calc(50%-1.25rem)]"
            initial={{ x: 0, y: 0, scale: 1 }}
            animate={{
              x: "calc(-50vw + min(50vw, 36rem) + 1.5rem)",
              y: "calc(-50vh + 1rem)",
              scale: 0.5,
            }}
            transition={{
              delay: 0.7,
              duration: 1.05,
              ease: [0.16, 1, 0.3, 1],
            }}
            onAnimationComplete={() => setActive(false)}
          >
            <motion.span
              className="absolute left-0 top-0 whitespace-nowrap bg-gradient-to-r from-[#FFFFFF] via-[#DF2531] to-[#7A1018] bg-clip-text text-3xl font-black tracking-[0.18em] text-transparent sm:text-5xl"
              initial={{ opacity: 1, filter: "blur(0px)" }}
              animate={{ opacity: [1, 1, 0], filter: ["blur(0px)", "blur(0px)", "blur(8px)"] }}
              transition={{
                delay: 0.35,
                duration: 1.2,
                times: [0, 0.58, 1],
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              RISWAN HAMUA
            </motion.span>
            <motion.span
              className="absolute left-0 top-0 bg-gradient-to-r from-[#DF2531] to-[#FFFFFF] bg-clip-text text-[2.5rem] font-black tracking-tight text-transparent"
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: [0, 0, 1], filter: ["blur(8px)", "blur(8px)", "blur(0px)"] }}
              transition={{
                delay: 0.35,
                duration: 1.2,
                times: [0, 0.55, 1],
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              RH
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
