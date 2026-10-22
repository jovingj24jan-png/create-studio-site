"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\°";

/**
 * Character scramble that resolves left to right.
 *
 * Each frame every unresolved character takes a random glyph; the resolve
 * front advances across the string over `duration`, so the word settles from
 * its first letter outward. Runs on a fixed 30ms tick.
 */
export function useScramble(text: string, duration = 350, tick = 30) {
  const reduced = useReducedMotion();
  const [output, setOutput] = useState(text);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => setOutput(text), [text]);

  const stop = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  }, []);

  const start = useCallback(() => {
    if (reduced) return;
    stop();
    const started = performance.now();
    timer.current = setInterval(() => {
      const p = Math.min(1, (performance.now() - started) / duration);
      const settled = Math.floor(p * text.length);
      setOutput(
        text
          .split("")
          .map((ch, i) => {
            if (i < settled || ch === " ") return ch;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );
      if (p >= 1) {
        setOutput(text);
        stop();
      }
    }, tick);
  }, [text, duration, tick, reduced, stop]);

  useEffect(() => stop, [stop]);

  return { output, start, stop };
}
