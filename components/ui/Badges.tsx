import type { Project } from "@/lib/data";

/** Mono tech pill. */
export function TechBadge({ children }: { children: string }) {
  return (
    <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[11px] tracking-wide text-[#A3A3A3]">
      {children}
    </span>
  );
}

const STATUS_STYLES: Record<
  Project["status"]["tone"],
  { ring: string; dot: string; text: string }
> = {
  live: {
    ring: "border-[#DF2531]/40 bg-[#DF2531]/10",
    dot: "bg-[#DF2531]",
    text: "text-[#DF2531]",
  },
  done: {
    ring: "border-white/20 bg-white/5",
    dot: "bg-white",
    text: "text-white",
  },
  proto: {
    ring: "border-[#7A1018]/50 bg-[#7A1018]/20",
    dot: "bg-[#7A1018]",
    text: "text-[#DF2531]",
  },
};

/** Status badge with a pulsing dot (pulses only for in-development items). */
export function StatusBadge({ status }: { status: Project["status"] }) {
  const s = STATUS_STYLES[status.tone];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] ${s.ring} ${s.text}`}
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
