"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CUE } from "./motion";

/**
 * Counts to `value` once, on load only. The suffix lands at the end rather
 * than riding along with the digits.
 */
export default function CountUp({
  value,
  suffix = "+",
  duration = 1.4,
  delay = CUE.stat,
  className = "",
}: {
  value: number;
  suffix?: string;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [n, setN] = useState(reduced ? value : 0);
  const [done, setDone] = useState(reduced);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (reduced) return;
    let start = 0;
    const kick = window.setTimeout(() => {
      const tick = (t: number) => {
        if (!start) start = t;
        const p = Math.min(1, (t - start) / (duration * 1000));
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf.current = requestAnimationFrame(tick);
        else setDone(true);
      };
      raf.current = requestAnimationFrame(tick);
    }, delay * 1000);

    return () => {
      window.clearTimeout(kick);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [reduced, value, duration, delay]);

  return (
    <span className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      <span aria-hidden>{n}</span>
      <motion.span
        aria-hidden
        initial={{ opacity: reduced ? 1 : 0 }}
        animate={{ opacity: done ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      >
        {suffix}
      </motion.span>
      <span className="sr-only">{`${value}${suffix}`}</span>
    </span>
  );
}
