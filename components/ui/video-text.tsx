"use client";

import React, { ElementType, ReactNode, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export interface VideoTextProps {
  /**
   * The video source URL
   */
  src: string;
  /**
   * Additional className for the container
   */
  className?: string;
  /**
   * Whether to autoplay the video
   */
  autoPlay?: boolean;
  /**
   * Whether to mute the video
   */
  muted?: boolean;
  /**
   * Whether to loop the video
   */
  loop?: boolean;
  /**
   * Whether to preload the video
   */
  preload?: "auto" | "metadata" | "none";
  /**
   * The content to display (will have the video "inside" it)
   */
  children: ReactNode;
  /**
   * Font size for the text mask (in viewport width units)
   * @default 10
   */
  fontSize?: string | number;
  /**
   * Font weight for the text mask
   * @default "bold"
   */
  fontWeight?: string | number;
  /**
   * Text anchor for the text mask
   * @default "middle"
   */
  textAnchor?: string;
  /**
   * Dominant baseline for the text mask
   * @default "middle"
   */
  dominantBaseline?: string;
  /**
   * Font family for the text mask
   * @default "sans-serif"
   */
  fontFamily?: string;
  /**
   * The element type to render for the text
   * @default "div"
   */
  as?: ElementType;
}

export function VideoText({
  src,
  children,
  className = "",
  autoPlay = true,
  muted = true,
  loop = true,
  preload = "auto",
  fontSize = 20,
  fontWeight = "bold",
  textAnchor = "middle",
  dominantBaseline = "middle",
  fontFamily = "sans-serif",
  as: Component = "div",
}: VideoTextProps) {
  const [svgMask, setSvgMask] = useState("");
  const content = React.Children.toArray(children).join("");

  useEffect(() => {
    // The mask SVG is rendered as a standalone data-URI resource, isolated from
    // the page's CSS cascade — var(...) tokens (e.g. var(--font-heading)) don't
    // resolve there. Resolve them here via a probe element so the mask actually
    // matches the font used elsewhere on the page, instead of silently falling
    // back to the browser default.
    const resolveFontFamily = (family: string) => {
      if (!family.includes("var(")) return family;
      const probe = document.createElement("span");
      probe.style.position = "absolute";
      probe.style.visibility = "hidden";
      probe.style.fontFamily = family;
      document.body.appendChild(probe);
      const resolved = getComputedStyle(probe).fontFamily;
      document.body.removeChild(probe);
      return resolved || family;
    };

    const updateSvgMask = () => {
      const responsiveFontSize =
        typeof fontSize === "number" ? `${fontSize}vw` : fontSize;
      const resolvedFontFamily = resolveFontFamily(fontFamily);
      const newSvgMask = `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'><text x='50%' y='50%' font-size='${responsiveFontSize}' font-weight='${fontWeight}' text-anchor='${textAnchor}' dominant-baseline='${dominantBaseline}' font-family='${resolvedFontFamily}'>${content}</text></svg>`;
      setSvgMask(newSvgMask);
    };

    updateSvgMask();
    window.addEventListener("resize", updateSvgMask);
    return () => window.removeEventListener("resize", updateSvgMask);
  }, [content, fontSize, fontWeight, textAnchor, dominantBaseline, fontFamily]);

  const dataUrlMask = `url("data:image/svg+xml,${encodeURIComponent(svgMask)}")`;

  return (
    <Component className={cn(`relative size-full`, className)}>
      {/* Create a container that masks the video to only show within text */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          maskImage: dataUrlMask,
          WebkitMaskImage: dataUrlMask,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      >
        <video
          className="h-full w-full object-cover"
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          preload={preload}
          playsInline
        >
          <source src={src} />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Add a backup text element for SEO/accessibility */}
      <span className="sr-only">{content}</span>
    </Component>
  );
}
