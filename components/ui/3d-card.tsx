"use client";

/**
 * Aceternity UI 3D Card Effect, by Manu Arora.
 * Listed on 21st.dev: https://mcp.21st.dev/@manuarora700/components/3d-card-effect
 * Source: https://ui.aceternity.com/registry/3d-card.json
 * Adapted for bounded tilt, reduced motion, touch and current React lint rules.
 */
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const MouseEnterContext = createContext(false);

export function CardContainer({
  children,
  className,
  containerClassName,
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);
  const reduce = useReducedMotion();
  function reset() {
    setEntered(false);
    if (containerRef.current)
      containerRef.current.style.transform = "rotateY(0deg) rotateX(0deg)";
  }
  useEffect(() => {
    if (reduce && containerRef.current)
      containerRef.current.style.transform = "rotateY(0deg) rotateX(0deg)";
  }, [reduce]);
  return (
    <MouseEnterContext.Provider value={entered && !reduce}>
      <div
        className={cn("card-3d-container", containerClassName)}
        style={{ perspective: "1200px" }}
      >
        <div
          ref={containerRef}
          className={cn("card-3d-body", className)}
          style={{ transformStyle: "preserve-3d" }}
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse" && !reduce) setEntered(true);
          }}
          onPointerMove={(event) => {
            if (
              reduce ||
              event.pointerType !== "mouse" ||
              !containerRef.current
            )
              return;
            const { left, top, width, height } =
              containerRef.current.getBoundingClientRect();
            const x = Math.max(
              -6,
              Math.min(6, (event.clientX - left - width / 2) / 55),
            );
            const y = Math.max(
              -6,
              Math.min(6, -(event.clientY - top - height / 2) / 55),
            );
            containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
          }}
          onPointerLeave={reset}
          onPointerCancel={reset}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
}

export function CardBody({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("card-3d-content", className)} {...props}>
      {children}
    </div>
  );
}

export function CardItem({
  children,
  className,
  translateZ = 0,
  ...props
}: HTMLAttributes<HTMLDivElement> & { translateZ?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const entered = useContext(MouseEnterContext);
  useEffect(() => {
    if (ref.current)
      ref.current.style.transform = `translateZ(${entered ? translateZ : 0}px)`;
  }, [entered, translateZ]);
  return (
    <div ref={ref} className={cn("card-3d-item", className)} {...props}>
      {children}
    </div>
  );
}
