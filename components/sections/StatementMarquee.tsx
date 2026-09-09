"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView } from "@/components/ui/Reveal";

const lines = ["we listen", "we shape", "we build"];

/**
 * Full-bleed statement panel: a high-key macro texture behind three masked
 * lines, the last in the accent colour. The backdrop drifts slowly on scroll.
 */
export default function StatementMarquee() {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);
  const wrap = useRef<HTMLDivElement | null>(null);
  const [shift, setShift] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const el = wrap.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const progress = (window.innerHeight - r.top) / (window.innerHeight + r.height);
        setShift((Math.min(1, Math.max(0, progress)) - 0.5) * 12);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={wrap}
      className="relative flex min-h-[86svh] items-center overflow-hidden"
      aria-label="Studio statement"
    >
      <Image
        src="/img/statement.svg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        style={{ transform: `scale(1.1) translateY(${shift}%)`, transition: "transform .2s linear" }}
      />

      <div ref={ref} className="relative w-full">
        <div className="shell text-center">
          {lines.map((l, i) => (
            <span key={l} className={`line-mask ${inView ? "line-in" : ""}`}>
              <span
                className="t-statement block"
                style={{
                  transitionDelay: `${i * 130}ms`,
                  color: i === lines.length - 1 ? "var(--accent)" : "#000",
                }}
              >
                {l}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
