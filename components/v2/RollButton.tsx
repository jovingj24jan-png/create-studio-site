"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

/**
 * Button whose label rolls up and is replaced by an identical copy, with a
 * 12px dot standing in for the cursor while it is hovered.
 */
export default function RollButton({
  label,
  href,
  variant = "outline",
  className = "",
}: {
  label: string;
  href: string;
  variant?: "outline" | "solid";
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [dot, setDot] = useState<{ x: number; y: number } | null>(null);

  return (
    <>
      <Link
        href={href}
        className={`v2-btn v2-mono v2-meta ${
          variant === "solid" ? "v2-btn-solid" : "v2-btn-outline"
        } ${reduced ? "" : "v2-dot-cursor"} ${className}`}
        onMouseMove={(e) => !reduced && setDot({ x: e.clientX, y: e.clientY })}
        onMouseLeave={() => setDot(null)}
      >
        <span className="v2-roll" aria-hidden>
          <span>{label}</span>
          <span>{label}</span>
        </span>
        <span className="sr-only">{label}</span>
      </Link>

      <AnimatePresence>
        {dot && (
          <motion.span
            aria-hidden
            className="pointer-events-none fixed z-[60] rounded-full"
            style={{
              width: 12,
              height: 12,
              background: "var(--v2-accent)",
              left: dot.x - 6,
              top: dot.y - 6,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
