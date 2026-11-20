"use client";

/**
 * Magic UI "Number Ticker", by Dillion Verma (MIT).
 * 21st.dev: https://21st.dev/magicui/number-ticker
 * Adapted: renders the final value on the server (correct without JS),
 * keeps any non-numeric prefix/suffix from the data string ("6/6", "3.80"),
 * writes to the DOM directly instead of re-rendering, and skips the count
 * for reduced motion.
 */
import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

export function NumberTicker({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);

  useEffect(() => {
    if (!inView || reduce || !match || !ref.current) return;
    const [, prefix, number, suffix] = match;
    const decimals = number.split(".")[1]?.length ?? 0;
    const node = ref.current;
    const controls = animate(0, Number(number), {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = `${prefix}${latest.toFixed(decimals)}${suffix}`;
      },
    });
    return () => controls.stop();
    // `match` is derived from `value`; re-running on value change is enough.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {value}
    </span>
  );
}
