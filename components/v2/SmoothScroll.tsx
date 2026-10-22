"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";

/**
 * Lenis smooth scroll, scoped to this route.
 *
 * Lenis drives the real scroll position rather than transforming a wrapper, so
 * Framer Motion's useScroll and IntersectionObserver both keep working
 * untouched. Left off on coarse pointers, where native momentum is better.
 */
export default function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const coarse = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 900;
    if (coarse) return;

    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 1 });
    let frame = requestAnimationFrame(function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduced]);

  return null;
}
