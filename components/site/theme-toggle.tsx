"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Both icons are rendered and CSS picks one from the `.dark` class, so the
 * server markup always matches and nothing flashes. Uses a View Transition
 * cross-fade where the browser supports it and motion is allowed.
 */
export function ThemeToggle({ className }: { className?: string }) {
  function toggle() {
    const apply = () => {
      const dark = !document.documentElement.classList.contains("dark");
      document.documentElement.classList.toggle("dark", dark);
      try {
        localStorage.setItem("theme", dark ? "dark" : "light");
      } catch {
        /* The theme still works without storage. */
      }
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && "startViewTransition" in document) {
      document.startViewTransition(apply);
    } else {
      apply();
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark theme"
      title="Switch theme"
      className={cn(
        "relative grid h-10 w-10 place-items-center rounded-full text-dim transition-colors hover:bg-surface-2 hover:text-ink",
        className,
      )}
    >
      <Moon size={18} className="transition-transform duration-500 dark:hidden" aria-hidden />
      <Sun size={18} className="hidden transition-transform duration-500 dark:block" aria-hidden />
    </button>
  );
}
