"use client";

/**
 * Magic UI Interactive Hover Button, by Dillion Verma (MIT).
 * Listed on 21st.dev: https://preview.21st.dev/@dillionverma/components/interactive-hover-button
 * Source: https://magicui.design/r/interactive-hover-button.json
 * Adapted with semantic links, one accessible label and keyboard-focus feedback.
 */
import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type LinkProps = ComponentProps<"a"> & {
  href: string;
  children: ReactNode;
};
type ButtonProps = ComponentProps<"button"> & { href?: never };

export function InteractiveHoverButton(props: LinkProps | ButtonProps) {
  const { children, className, ...rest } = props;
  const content = (
    <>
      <span className="interactive-button-rest">
        <span className="interactive-button-dot" aria-hidden />
        <span>{children}</span>
      </span>
      <span className="interactive-button-hover" aria-hidden>
        <span>{children}</span>
        <ArrowUpRight size={18} />
      </span>
    </>
  );
  const classes = cn("interactive-hover-button group", className);
  if ("href" in props && props.href !== undefined) {
    const linkProps = rest as Omit<LinkProps, "children" | "className">;
    if (typeof linkProps.href === "string" && /^(#|\/#)/.test(linkProps.href)) {
      return (
        <a {...linkProps} className={classes}>
          {content}
        </a>
      );
    }
    return (
      <Link {...linkProps} prefetch={false} className={classes}>
        {content}
      </Link>
    );
  }
  const buttonProps = rest as Omit<ButtonProps, "children" | "className">;
  return (
    <button type="button" {...buttonProps} className={classes}>
      {content}
    </button>
  );
}
