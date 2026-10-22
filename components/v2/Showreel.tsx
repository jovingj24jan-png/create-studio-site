"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type MotionValue } from "framer-motion";
import VideoBg from "./VideoBg";
import { media } from "./media";
import { CUE, EASE_OUT_EXPO, SPRING_POP } from "./motion";

function ControlGlyph({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full text-white"
      style={{ background: "rgba(255,255,255,.14)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.preventDefault()}
    >
      {children}
    </button>
  );
}

/**
 * Showreel module: a labelled rule whose accent fill tracks hero scroll, the
 * reel card itself, and a full-screen expansion driven by a shared layoutId.
 */
export default function Showreel({ ruleProgress }: { ruleProgress?: MotionValue<number> }) {
  const reduced = useReducedMotion();
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <motion.div
      className="w-full"
      style={{ maxWidth: 548 }}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: CUE.showreel, ease: EASE_OUT_EXPO }}
    >
      <div className="mb-3 flex items-center gap-4">
        <span className="v2-mono v2-meta-sm shrink-0 text-white">Showreel</span>
        <span className="v2-reel-rule flex-1">
          <motion.span style={ruleProgress ? { scaleX: ruleProgress } : { scaleX: 0 }} />
        </span>
        <span className="v2-mono v2-meta-sm shrink-0" style={{ color: "rgba(255,255,255,.75)" }}>
          \\2026
        </span>
      </div>

      {!open && (
        <motion.button
          type="button"
          layoutId="v2-reel"
          onClick={() => setOpen(true)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          aria-label="Play the showreel"
          className="relative block w-full overflow-hidden"
          style={{ aspectRatio: "548 / 321", borderRadius: 8 }}
          animate={{ scale: hover && !reduced ? 1.02 : 1 }}
          transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
        >
          <VideoBg clip={media.showreel} />

          <AnimatePresence>
            {hover && (
              <motion.span
                className="absolute inset-0 flex items-center justify-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <ControlGlyph label="Rewind">&#9664;&#9664;</ControlGlyph>
                <ControlGlyph label="Pause">&#10074;&#10074;</ControlGlyph>
                <ControlGlyph label="Forward">&#9654;&#9654;</ControlGlyph>
              </motion.span>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {hover && (
              <motion.span
                className="absolute bottom-4 left-4 text-white"
                style={{ fontFamily: "var(--font-sans), sans-serif", fontSize: 16 }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25 }}
              >
                Showreel 2025
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      )}

      <p className="v2-mono v2-meta-sm mt-2 flex items-center gap-2" style={{ color: "rgba(255,255,255,.75)" }}>
        <span aria-hidden style={{ color: "var(--v2-accent)" }}>
          &#9678;
        </span>
        Best digital campaign, Wobbly Awards
      </p>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center"
            initial={{ background: "rgba(20,20,20,0)" }}
            animate={{ background: "rgba(20,20,20,.9)" }}
            exit={{ background: "rgba(20,20,20,0)" }}
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Showreel"
          >
            <motion.div
              layoutId="v2-reel"
              className="relative overflow-hidden"
              style={{ width: "92vw", aspectRatio: "548 / 321", borderRadius: 8 }}
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src={media.showreel.src}
                autoPlay
                loop
                playsInline
                controls
              />
            </motion.div>
            <motion.button
              type="button"
              className="v2-mono v2-meta-sm absolute right-6 top-6 text-white"
              onClick={() => setOpen(false)}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", ...SPRING_POP }}
            >
              Close
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
