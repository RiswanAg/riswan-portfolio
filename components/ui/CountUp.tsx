"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/**
 * Rolls a numeric value from 0 to its target once it scrolls into view.
 * Preserves any non-numeric prefix/suffix and the target's decimal places
 * (e.g. "3.80" → animates to "3.80", "120+" → "120+"). Fires once; respects
 * prefers-reduced-motion by showing the final value instantly.
 */
export function CountUp({
  value,
  duration = 1.6,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();

  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(\D*)$/);
  const hasMatch = match !== null;
  const prefix = match?.[1] ?? "";
  const target = match ? parseFloat(match[2]) : 0;
  const suffix = match?.[3] ?? "";
  const decimals = match?.[2].includes(".") ? match[2].split(".")[1].length : 0;

  const [display, setDisplay] = useState(() =>
    hasMatch ? `${prefix}${(0).toFixed(decimals)}${suffix}` : value
  );

  useEffect(() => {
    if (!hasMatch) return;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    if (!inView) return;

    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(`${prefix}${v.toFixed(decimals)}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, hasMatch, target, decimals, prefix, suffix, duration, value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
