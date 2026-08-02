import type { Project } from "@/lib/data";

/** Mono tech pill — chrome, sits on card surfaces. */
export function TechBadge({ children }: { children: string }) {
  return (
    <span className="rounded-md border border-line bg-veil px-2.5 py-0.5 font-mono text-[11px] tracking-wide text-dim">
      {children}
    </span>
  );
}

// Status badge is used in two contexts — floating over dark project artwork AND
// on light/dark card surfaces in the detail panel — so it carries its own dark
// translucent chip and keeps fixed neon accents that read on either background,
// independent of the active theme.
const STATUS_STYLES: Record<
  Project["status"]["tone"],
  { dot: string; text: string }
> = {
  live: { dot: "bg-[#8ECAE6]", text: "text-[#8ECAE6]" },
  done: { dot: "bg-white", text: "text-white" },
  proto: { dot: "bg-[#FFB703]", text: "text-[#FFB703]" },
};

/** Status badge with a pulsing dot (pulses only for in-development items). */
export function StatusBadge({ status }: { status: Project["status"] }) {
  const s = STATUS_STYLES[status.tone];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] ${s.text}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        {status.tone === "live" && (
          <span
            className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${s.dot} pulse-soft`}
          />
        )}
        <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${s.dot}`} />
      </span>
      {status.label}
    </span>
  );
}
