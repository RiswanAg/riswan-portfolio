import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function Eyebrow({ index, children, className }: { index?: string; children: ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-accent-strong", className)}>
      {index && <span className="text-dim">{index}</span>}
      <span aria-hidden className="h-px w-8 bg-current opacity-50" />
      {children}
    </p>
  );
}

export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={cn("mb-12 flex flex-col gap-6 sm:mb-16 md:flex-row md:items-end md:justify-between", className)}>
      <div className="max-w-3xl">
        <Eyebrow index={index}>{eyebrow}</Eyebrow>
        <h2 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
          {title}
        </h2>
        {description && <p className="mt-5 max-w-2xl text-base leading-relaxed text-dim sm:text-lg">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>{children}</div>;
}
