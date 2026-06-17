"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";

/**
 * Image with a graceful fallback. The `fallback` node is rendered behind the
 * image (absolute, fills parent). If the optimized image fails to load
 * (e.g. the asset hasn't been generated yet) the <img> is removed and the
 * styled placeholder shows through. Parent must be `position: relative`.
 */
export function SmartImage({
  src,
  alt,
  fallback,
  sizes = "100vw",
  eager = false,
  className = "object-cover",
}: {
  src: string;
  alt: string;
  fallback: ReactNode;
  sizes?: string;
  eager?: boolean;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <>
      <div className="absolute inset-0">{fallback}</div>
      {!failed && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          // Next 16: `priority` is deprecated → use loading="eager"
          loading={eager ? "eager" : "lazy"}
          className={className}
          onError={() => setFailed(true)}
        />
      )}
    </>
  );
}
