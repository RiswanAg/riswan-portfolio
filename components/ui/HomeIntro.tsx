"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useLayoutEffect, useState } from "react";

const SESSION_KEY = "rh-intro-seen";

// Shared easing — a soft cinematic ease-out ("expo-out"-like).
const EASE = [0.16, 1, 0.3, 1] as const;

// Line-mask reveal: each word rises from behind an overflow-hidden clip.
const line = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 0.9, ease: EASE, delay: 0.25 + i * 0.12 },
  }),
};

export function HomeIntro() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(true);

  // Skip synchronously (before paint) if already shown this session, so
  // returning visitors never see a black flash. Mark as seen on first play.
  useLayoutEffect(() => {
    if (reduceMotion) {
      setActive(false);
      return;
    }
    if (typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY)) {
      setActive(false);
    } else {
      sessionStorage.setItem(SESSION_KEY, "1");
    }
  }, [reduceMotion]);

  // Lock scroll while the stage is up.
  useEffect(() => {
    if (!active) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [active]);

  if (reduceMotion) return null;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center overflow-hidden bg-black"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.7, ease: [0.7, 0, 0.3, 1] },
          }}
        >
          {/* faint mesh + breathing red glow */}
          <div className="absolute inset-0 bg-grid opacity-60" />
          <motion.div
            className="absolute h-72 w-72 rounded-full bg-[#2EE6C6]/20 blur-3xl"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1.15, opacity: 1 }}
            transition={{ duration: 1.6, ease: EASE }}
          />

          {/* eyebrow */}
          <motion.p
            className="relative mb-5 font-mono text-[10px] uppercase tracking-[0.6em] text-[#2EE6C6] sm:text-xs"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          >
            Portfolio
          </motion.p>

          {/* name — line-by-line mask reveal */}
          <div className="relative flex flex-col items-center leading-[0.95]">
            {["RISWAN", "HAMUA"].map((word, i) => (
              <span key={word} className="overflow-hidden py-0.5">
                <motion.span
                  custom={i}
                  variants={line}
                  initial="hidden"
                  animate="show"
                  className={`block bg-gradient-to-r bg-clip-text text-5xl font-black tracking-tight text-transparent sm:text-7xl lg:text-8xl ${
                    i === 0
                      ? "from-white via-[#2EE6C6] to-[#7C5CFF]"
                      : "from-[#7C5CFF] via-[#2EE6C6] to-white"
                  }`}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </div>

          {/* underline draw */}
          <motion.span
            className="relative mt-6 block h-[2px] w-40 origin-left rounded-full bg-gradient-to-r from-[#2EE6C6] to-transparent sm:w-56"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.85 }}
            onAnimationComplete={() => {
              // Hold briefly after everything has settled, then lift the stage.
              window.setTimeout(() => setActive(false), 550);
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
