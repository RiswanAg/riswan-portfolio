import type { Project } from "@/lib/data";

/** Mono tech pill. */
export function TechBadge({ children }: { children: string }) {
  return (
    <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[11px] tracking-wide text-slate-300">
      {children}
    </span>
  );
}

const STATUS_STYLES: Record<
  Project["status"]["tone"],
  { ring: string; dot: string; text: string }
> = {
  live: {
    ring: "border-[#4988C4]/40 bg-[#4988C4]/10",
    dot: "bg-[#4988C4]",
    text: "text-[#BDE8F5]",
  },
  done: {
    ring: "border-[#BDE8F5]/30 bg-[#BDE8F5]/10",
    dot: "bg-[#BDE8F5]",
    text: "text-[#BDE8F5]",
  },
  proto: {
    ring: "border-[#1C4D8D]/50 bg-[#1C4D8D]/20",
    dot: "bg-[#1C4D8D]",
    text: "text-[#4988C4]",
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
