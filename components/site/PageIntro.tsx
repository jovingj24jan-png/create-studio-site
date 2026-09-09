"use client";

import { useEffect, useState } from "react";

/**
 * Route entrance: a full-bleed panel wipes upward once, then the page content
 * fades in beneath it. Skipped entirely under prefers-reduced-motion (CSS).
 */
export default function PageIntro({ children }: { children: React.ReactNode }) {
  const [wiped, setWiped] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setWiped(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {!wiped && <div className="wipe" aria-hidden />}
      <div className="page-enter">{children}</div>
    </>
  );
}
