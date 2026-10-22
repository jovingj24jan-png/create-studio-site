"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import VideoBg from "./VideoBg";
import { media } from "./media";
import { EASE_OUT_EXPO } from "./motion";

const PHRASE = "let's create";

/**
 * Stage B: the word-pair sits between the background clip and a cutout of the
 * subject, so the type passes behind them, and lights up orange wherever the
 * cursor is.
 *
 * While no alpha cutout exists (media.subject === null) the top layer is a
 * softly masked copy of the hero clip, which keeps the depth effect readable
 * until real footage is dropped in.
 */
export default function HeroStageB() {
  const reduced = useReducedMotion();
  const wrap = useRef<HTMLDivElement | null>(null);
  const inView = useInView(wrap, { amount: 0.6, once: true });

  // cursor-tracked spotlight, eased toward the pointer rather than snapped
  useEffect(() => {
    const el = wrap.current;
    if (!el || reduced) return;

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    let raf = 0;
    let x = 0.5;
    let y = 0.6;
    let tx = 0.5;
    let ty = 0.6;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width;
      ty = (e.clientY - r.top) / r.height;
    };

    const start = performance.now();
    const loop = (t: number) => {
      // no pointer to follow, so sweep the light across on a 6s loop
      if (coarse) {
        const p = ((t - start) % 6000) / 6000;
        tx = p;
        ty = 0.6;
      }
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el.style.setProperty("--v2-x", `${x * 100}%`);
      el.style.setProperty("--v2-y", `${y * 100}%`);
      raf = requestAnimationFrame(loop);
    };

    if (!coarse) window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const subject = media.subject;

  return (
    <div ref={wrap} className="relative h-[100svh] w-full overflow-hidden">
      {/* the type, sandwiched between the backdrop and the subject */}
      <div
        className="absolute inset-x-0 flex justify-center"
        style={{ bottom: "18%", paddingInline: "var(--v2-gutter)", zIndex: 1 }}
      >
        <span className="v2-mask block w-full text-center">
          <motion.span
            className="relative inline-block"
            initial={reduced ? { opacity: 0 } : { y: "60%" }}
            animate={inView ? { y: "0%", opacity: 1 } : undefined}
            transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
          >
            <span className="v2-display v2-letscreate v2-emboss whitespace-nowrap">{PHRASE}</span>
            {/* identical copy, painted only where the spotlight falls */}
            <span
              aria-hidden
              className="v2-spotlight v2-display v2-letscreate whitespace-nowrap"
              style={{ display: "grid", placeItems: "center" }}
            >
              {PHRASE}
            </span>
          </motion.span>
        </span>
      </div>

      {/* subject layer: real cutout when supplied, soft-masked copy until then */}
      <div className="pointer-events-none absolute inset-0" style={{ zIndex: 2 }}>
        {subject ? (
          <VideoBg clip={subject} />
        ) : (
          <VideoBg
            clip={media.hero}
            objectPosition="center 65%"
            style={{
              WebkitMaskImage:
                "radial-gradient(ellipse 34% 62% at 50% 46%, #000 55%, transparent 78%)",
              maskImage: "radial-gradient(ellipse 34% 62% at 50% 46%, #000 55%, transparent 78%)",
            }}
          />
        )}
      </div>

      {/* the dark canvas ends on a curve rather than a hard edge */}
      <svg
        className="absolute inset-x-0 bottom-0 w-full"
        style={{ height: 120, zIndex: 3 }}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0,120 L0,74 C220,18 430,2 720,2 C1010,2 1220,18 1440,74 L1440,120 Z"
          fill="var(--v2-off)"
        />
      </svg>
    </div>
  );
}
