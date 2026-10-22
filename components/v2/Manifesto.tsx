"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import VideoBg from "./VideoBg";
import { media } from "./media";
import { EASE_OUT_EXPO, SPRING_SOFT, STAGGER } from "./motion";

const LINES = ["we listen", "we imagine", "we create", "beautiful things"];
const ACCENT_LINE = 2;

const REVEAL = 1.0;

export default function Manifesto() {
  const reduced = useReducedMotion();
  const section = useRef<HTMLElement | null>(null);
  const block = useRef<HTMLDivElement | null>(null);
  // hold until the block is well into view, then run the lines
  const inView = useInView(block, { amount: 0.25, once: true });

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start end", "end start"],
  });

  const rawBgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const rawScale = useTransform(scrollYProgress, [0.15, 0.85], [0.96, 1.04]);
  const rawY = useTransform(scrollYProgress, [0.15, 0.85], [-30, 30]);
  // the block clears out over the last fifth of the range
  const rawOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);
  const rawBlur = useTransform(scrollYProgress, [0.8, 1], [0, 6]);

  const bgScale = useSpring(rawBgScale, SPRING_SOFT);
  const scale = useSpring(rawScale, SPRING_SOFT);
  const y = useSpring(rawY, SPRING_SOFT);
  const filter = useTransform(rawBlur, (b) => `blur(${b}px)`);

  const one = useMotionValue(1);

  return (
    <section
      ref={section}
      className="relative overflow-hidden"
      style={{ background: "var(--v2-off)", minHeight: "140svh" }}
      aria-label="Manifesto"
    >
      <motion.div
        className="absolute inset-0"
        style={reduced ? { scale: one } : { scale: bgScale, willChange: "transform" }}
      >
        <VideoBg
          clip={media.manifesto}
          style={{ filter: "saturate(.25)", opacity: 0.9 }}
        />
      </motion.div>

      <div className="relative" style={{ minHeight: "140svh" }}>
        {/* holds still while the water keeps moving behind it */}
        <div className="sticky" style={{ top: "50%", transform: "translateY(-50%)" }}>
          <motion.div
            ref={block}
            className="v2-shell"
            style={
              reduced
                ? { opacity: one }
                : { scale, y, opacity: rawOpacity, filter, willChange: "transform, opacity" }
            }
          >
            <div
              className="mx-auto text-center"
              style={{ paddingBlock: 160 }}
            >
              {LINES.map((line, i) => {
                const accent = i === ACCENT_LINE;
                return (
                  <span key={line} className="v2-mask">
                    <motion.span
                      className="v2-display v2-manifesto block"
                      initial={reduced ? { color: "#000" } : { y: "100%", color: "#000" }}
                      animate={
                        inView
                          ? {
                              y: "0%",
                              color: accent ? "var(--v2-accent)" : "#000",
                            }
                          : undefined
                      }
                      transition={{
                        y: { duration: REVEAL, delay: i * STAGGER.line * 1.25, ease: EASE_OUT_EXPO },
                        // colour waits until this line has finished arriving
                        color: {
                          duration: 0.6,
                          delay: accent ? i * STAGGER.line * 1.25 + REVEAL + 0.25 : 0,
                        },
                      }}
                    >
                      {line}
                    </motion.span>
                  </span>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
