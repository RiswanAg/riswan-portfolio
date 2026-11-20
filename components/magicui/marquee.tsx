/**
 * Magic UI "Marquee", by Dillion Verma (MIT).
 * 21st.dev: https://21st.dev/magicui/marquee
 * Adapted: CSS-only (server component), pauses on hover and keyboard focus,
 * the duplicate track is hidden from assistive technology, and reduced
 * motion turns it into a normal horizontally scrollable row.
 */
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Marquee({
  children,
  className,
  duration = "45s",
  gap = "1.25rem",
}: {
  children: ReactNode;
  className?: string;
  duration?: string;
  gap?: string;
}) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] motion-reduce:overflow-x-auto motion-reduce:[mask-image:none]",
        className,
      )}
      style={{ ["--duration" as string]: duration, ["--gap" as string]: gap, gap }}
    >
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1 || undefined}
          inert={copy === 1 || undefined}
          className={cn(
            "motion-safe-marquee flex shrink-0 animate-marquee items-stretch group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]",
            copy === 1 && "motion-reduce:hidden",
          )}
          style={{ gap }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
