"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { rotatorLogos } from "./media";
import { EASE_OUT_EXPO } from "./motion";

/**
 * Cycles the partner marks, one every 2.6s. Outgoing and incoming overlap
 * briefly so the slot never reads as empty.
 */
export default function LogoRotator({ height = 30 }: { height?: number }) {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setI((v) => (v + 1) % rotatorLogos.length), 2600);
    return () => clearInterval(id);
  }, [reduced]);

  const name = rotatorLogos[i];

  return (
    <div className="relative" style={{ height }} aria-label="Selected partners">
      <AnimatePresence mode="sync">
        <motion.img
          key={name}
          src={`/img/client-${name}.svg`}
          alt={name}
          className="absolute right-0 top-0 w-auto"
          style={{ height, filter: "brightness(0) invert(1)" }}
          initial={reduced ? false : { opacity: 0, y: 14, filter: "blur(6px) brightness(0) invert(1)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px) brightness(0) invert(1)" }}
          exit={reduced ? undefined : { opacity: 0, y: -14, filter: "blur(6px) brightness(0) invert(1)" }}
          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
        />
      </AnimatePresence>
    </div>
  );
}
