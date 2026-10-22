"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import type { Clip } from "./media";

/**
 * Full-bleed background clip.
 *
 * The poster is a real layer underneath the video rather than the `poster`
 * attribute (unreliable for SVG sources), and both fill an already-sized box,
 * so nothing shifts when the video finishes loading.
 */
export default function VideoBg({
  clip,
  className = "",
  style,
  objectPosition = "center",
}: {
  clip: Clip;
  className?: string;
  style?: CSSProperties;
  objectPosition?: string;
}) {
  const [ready, setReady] = useState(false);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} style={style} aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={clip.poster}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition }}
      />
      <video
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          objectPosition,
          opacity: ready ? 1 : 0,
          transition: "opacity .6s ease-out",
        }}
        src={clip.src}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        onCanPlay={() => setReady(true)}
      />
    </div>
  );
}
