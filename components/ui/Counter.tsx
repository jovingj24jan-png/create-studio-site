"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "./Reveal";

/**
 * Odometer-style counter. Counts to `value` when scrolled into view,
 * honouring prefers-reduced-motion by snapping straight to the end value.
 */
export default function Counter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 1800,
  className = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const [n, setN] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(value);
      return;
    }
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 4);
      setN(value * eased);
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={`num ${className}`}>
      {prefix}
      {n.toFixed(decimals)}
      {suffix}
    </span>
  );
}
