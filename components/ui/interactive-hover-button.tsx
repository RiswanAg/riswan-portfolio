"use client";

/**
 * Magic UI Interactive Hover Button, by Dillion Verma (MIT).
 * Listed on 21st.dev: https://preview.21st.dev/@dillionverma/components/interactive-hover-button
 * Source: https://magicui.design/r/interactive-hover-button.json
 * Adapted: Next.js links, three palette variants, one accessible label
 * (the hover copy is aria-hidden), focus gets the same feedback as hover,
 * and reduced motion keeps the resting label.
 */
import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "amber" | "outline" | "ink";

const VARIANTS: Record<Variant, { base: string; dot: string; hover: string }> = {
  amber: {
    base: "border-amber bg-amber text-on-accent",
    dot: "bg-on-accent",
    hover: "text-amber",
  },
  outline: {
    base: "border-line-2 bg-surface/60 text-ink backdrop-blur",
    dot: "bg-accent",
    hover: "text-on-accent",
  },
  ink: {
    base: "border-ink bg-ink text-canvas",
    dot: "bg-amber",
    hover: "text-on-accent",
  },
};

type Common = { children: ReactNode; variant?: Variant; className?: string };
type LinkProps = Common & Omit<ComponentProps<"a">, "className" | "children"> & { href: string };
type ButtonProps = Common & Omit<ComponentProps<"button">, "className" | "children"> & { href?: never };

export function InteractiveHoverButton(props: LinkProps | ButtonProps) {
  const { children, className, variant = "outline", ...rest } = props;
  const v = VARIANTS[variant];
  const content = (
    <>
      <span className="flex items-center justify-center gap-2.5">
        <span
          aria-hidden
          className={cn(
            "h-2 w-2 shrink-0 rounded-full transition-transform duration-500 ease-out group-hover:scale-[60] group-focus-visible:scale-[60] motion-reduce:group-hover:scale-100",
            v.dot,
          )}
        />
        <span className="inline-block transition-all duration-300 group-hover:translate-x-10 group-hover:opacity-0 group-focus-visible:translate-x-10 group-focus-visible:opacity-0 motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:opacity-100">
          {children}
        </span>
      </span>
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 z-10 flex translate-x-10 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:hidden",
          v.hover,
        )}
      >
        <span>{children}</span>
        <ArrowRight size={16} />
      </span>
    </>
  );
  const classes = cn(
    "group relative inline-flex min-h-12 w-max cursor-pointer items-center justify-center overflow-hidden rounded-full border px-6 text-sm font-semibold transition-transform active:scale-[0.97]",
    v.base,
    className,
  );

  if ("href" in props && props.href !== undefined) {
    const linkProps = rest as Omit<LinkProps, keyof Common>;
    const isHashOrFile = /^(#|\/#)/.test(linkProps.href) || "download" in linkProps;
    return isHashOrFile ? (
      <a {...linkProps} className={classes}>
        {content}
      </a>
    ) : (
      <Link {...linkProps} prefetch={false} className={classes}>
        {content}
      </Link>
    );
  }
  const buttonProps = rest as Omit<ButtonProps, keyof Common>;
  return (
    <button type="button" {...buttonProps} className={classes}>
      {content}
    </button>
  );
}
