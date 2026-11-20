"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Copy, X } from "lucide-react";

type State = "idle" | "copied" | "failed";

export function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<State>("idle");

  useEffect(() => {
    if (state === "idle") return;
    const id = window.setTimeout(() => setState("idle"), 2200);
    return () => window.clearTimeout(id);
  }, [state]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
  }

  const label = state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : "Copy email";
  const Icon = state === "copied" ? Check : state === "failed" ? X : Copy;

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex min-h-13 items-center gap-2 rounded-full border border-canvas/25 px-5 text-sm font-semibold transition-colors hover:bg-canvas/10 dark:border-line-2 dark:hover:bg-surface-2"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={state}
          className="inline-flex items-center gap-2"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15 }}
        >
          <Icon size={16} aria-hidden />
          {label}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only" aria-live="polite">
        {state === "copied" ? "Email address copied" : state === "failed" ? "Could not copy the email address" : ""}
      </span>
    </button>
  );
}
