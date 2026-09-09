"use client";

import type { ReactNode } from "react";

/**
 * Seamless CSS marquee. The children are duplicated so the track can
 * translate a full -100% and loop without a visible seam.
 */
export default function Marquee({
  children,
  duration = 30,
  direction = "left",
  pauseOnHover = false,
  className = "",
  copies = 2,
}: {
  children: ReactNode;
  duration?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
  copies?: number;
}) {
  return (
    <div
      className={`marquee ${className}`}
      data-dir={direction}
      style={
        {
          "--mq-dur": `${duration}s`,
        } as React.CSSProperties
      }
      onMouseEnter={
        pauseOnHover
          ? (e) =>
              e.currentTarget
                .querySelectorAll<HTMLElement>(".marquee-track")
                .forEach((t) => (t.style.animationPlayState = "paused"))
          : undefined
      }
      onMouseLeave={
        pauseOnHover
          ? (e) =>
              e.currentTarget
                .querySelectorAll<HTMLElement>(".marquee-track")
                .forEach((t) => (t.style.animationPlayState = "running"))
          : undefined
      }
      aria-hidden={false}
    >
      {Array.from({ length: copies }).map((_, i) => (
        <div className="marquee-track" key={i} aria-hidden={i > 0}>
          {children}
        </div>
      ))}
    </div>
  );
}
