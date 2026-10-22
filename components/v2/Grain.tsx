"use client";

import { motion } from "framer-motion";
import { CUE } from "./motion";

/**
 * Film grain. The noise is an inline feTurbulence data URI rather than a
 * bitmap, so it costs nothing to load and stays local.
 */
const NOISE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">
       <filter id="n">
         <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>
         <feColorMatrix type="saturate" values="0"/>
       </filter>
       <rect width="180" height="180" filter="url(#n)"/>
     </svg>`
  );

export default function Grain() {
  return (
    <motion.div
      aria-hidden
      className="v2-grain"
      style={{ backgroundImage: `url("${NOISE}")` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.06 }}
      transition={{ duration: 0.6, delay: CUE.video }}
    />
  );
}
