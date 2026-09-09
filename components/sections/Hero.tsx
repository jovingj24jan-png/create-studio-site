"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Counter from "@/components/ui/Counter";
import { ArrowRight, StudioClock } from "@/components/ui/Bits";
import { site } from "@/data/site";

/** Mount-triggered fade/rise, used instead of scroll reveals above the fold. */
function Stage({
  children,
  delay = 0,
  className = "",
  y = 24,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setOn(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div
      className={className}
      style={{
        opacity: on ? 1 : 0,
        transform: on ? "none" : `translateY(${y}px)`,
        transition: "opacity 1s cubic-bezier(.22,1,.36,1), transform 1s cubic-bezier(.22,1,.36,1)",
      }}
    >
      {children}
    </div>
  );
}

/** Word masked behind its own line box, rising on a stagger. */
function Word({ children, delay }: { children: React.ReactNode; delay: number }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setOn(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <span className="line-mask" style={{ display: "inline-block", verticalAlign: "top" }}>
      <span
        style={{
          transform: on ? "translateY(0)" : "translateY(110%)",
          transition: "transform 1.05s cubic-bezier(.22,1,.36,1)",
        }}
      >
        {children}&nbsp;
      </span>
    </span>
  );
}

/** Left-rail section marker: a short rule followed by the index. */
function Rail({ index, delay = 0 }: { index: string; delay?: number }) {
  return (
    <Stage delay={delay} y={0} className="flex items-center gap-3 whitespace-nowrap">
      <span aria-hidden className="block h-px w-6 shrink-0 md:w-9" style={{ background: "rgba(255,255,255,.45)" }} />
      <span className="t-mono-sm" style={{ color: "rgba(255,255,255,.65)" }}>
        {index}
      </span>
    </Stage>
  );
}

export default function Hero() {
  const words = site.tagline.split(" ");

  return (
    <section
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
      style={{ background: "var(--ink)", color: "#fff" }}
      aria-label="Introduction"
    >
      {/* full-bleed backdrop */}
      <div className="absolute inset-0">
        <Image
          src="/img/hero.svg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          style={{ animation: "heroIn 2.4s cubic-bezier(.22,1,.36,1) both" }}
        />
        <span
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,6,9,.72) 0%, rgba(5,6,9,.25) 30%, rgba(5,6,9,.35) 70%, rgba(5,6,9,.85) 100%)",
          }}
        />
      </div>

      <div
        className="relative flex flex-1 flex-col justify-between"
        style={{
          paddingTop: "calc(var(--nav-h) + clamp(28px, 5vh, 70px))",
          paddingBottom: "clamp(28px, 5vh, 64px)",
        }}
      >
        {/* ---------------------------------------------------- 00.01 */}
        <div className="shell">
          <div className="grid grid-cols-12 items-start gap-y-6">
            <div className="col-span-12 md:col-span-2 lg:col-span-1">
              <Rail index="// 00.01°" delay={200} />
            </div>

            <h1 className="col-span-12 mt-3 md:col-span-7 md:mt-0 lg:col-span-6 lg:col-start-3 lg:pl-[33px]">
              <span className="t-h4 block max-w-[17ch]">
                {words.map((w, i) => (
                  <Word key={i} delay={320 + i * 70}>
                    {i === words.length - 1 ? (
                      <>
                        {w.replace(/\.$/, "")}
                        <span style={{ color: "var(--accent)" }}>.</span>
                      </>
                    ) : (
                      w
                    )}
                  </Word>
                ))}
              </span>
            </h1>

            <Stage delay={780} className="col-span-12 md:col-span-3 md:text-right lg:col-start-10">
              <p className="t-h4 num" style={{ color: "var(--accent)", fontWeight: 700 }}>
                <Counter value={120} suffix="+" duration={2200} />
              </p>
              <p className="t-mono-sm mt-1 md:ml-auto md:max-w-[24ch]" style={{ color: "rgba(255,255,255,.8)" }}>
                Working quietly with brands in eleven countries
              </p>
            </Stage>
          </div>
        </div>

        {/* ---------------------------------------------------- 00.02 */}
        <div className="shell my-8 md:my-0">
          <div className="grid grid-cols-12 items-center gap-y-4">
            <div className="col-span-12 md:col-span-2 lg:col-span-1">
              <Rail index="// 00.02°" delay={860} />
            </div>
            <Stage delay={940} className="col-span-12 md:col-span-10 lg:col-span-11 lg:pl-[7px]">
              <p className="t-wordmark">
                <span style={{ color: "var(--accent)" }}>Create</span>
                <span style={{ color: "#f2f2f2" }}>\Studio</span>
              </p>
            </Stage>
          </div>
        </div>

        {/* ------------------------------------------- 00.03 + showreel */}
        <div className="shell">
          <div className="grid grid-cols-12 items-end gap-y-8">
            <div className="col-span-12 md:col-span-2 lg:col-span-1">
              <Rail index="// 00.03°" delay={1020} />
            </div>

            <div className="col-span-12 md:col-span-5 lg:col-span-5 lg:col-start-2">
              <Stage delay={1080}>
                <p className="t-mono max-w-[34ch]" style={{ color: "#fff" }}>
                  A design studio working with founders and established teams. We make the things people
                  remember using.
                </p>
              </Stage>

              <Stage delay={1140} className="mt-6">
                <span aria-hidden className="mb-3 block h-px w-8" style={{ background: "rgba(255,255,255,.4)" }} />
                <p className="t-mono-sm" style={{ color: "rgba(255,255,255,.85)" }}>
                  Our time <StudioClock withSeconds />
                </p>
                <p className="t-mono-sm" style={{ color: "rgba(255,255,255,.85)" }}>
                  {site.timezone}
                </p>
              </Stage>

              <Stage delay={1200} className="mt-7 flex flex-wrap gap-3">
                <Link href="/work" className="btn btn-accent">
                  <span>See work</span>
                  <ArrowRight />
                </Link>
                <Link href="/contact" className="btn btn-light">
                  <span>Let&apos;s chat</span>
                  <ArrowRight />
                </Link>
              </Stage>
            </div>

            {/* showreel card */}
            <Stage delay={1280} className="col-span-12 md:col-span-4 md:col-start-9">
              <div className="mb-3 flex items-center gap-3">
                <span className="t-mono-sm shrink-0" style={{ color: "rgba(255,255,255,.85)" }}>
                  Showreel
                </span>
                <span aria-hidden className="h-px flex-1" style={{ background: "rgba(255,255,255,.3)" }} />
                <span className="t-mono-sm shrink-0" style={{ color: "rgba(255,255,255,.85)" }}>
                  \\2026
                </span>
              </div>

              <button
                type="button"
                className="group img-mask img-in relative block aspect-[16/9] w-full overflow-hidden"
                aria-label="Play the showreel (prototype)"
              >
                <Image
                  src="/img/showreel.svg"
                  alt="Showreel still"
                  fill
                  sizes="(max-width: 809px) 100vw, 30vw"
                  className="img-zoom object-cover transition-transform duration-[1.4s] group-hover:scale-[1.06]"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "rgba(5,6,9,.35)" }}
                >
                  <span
                    className="t-mono-sm flex h-16 w-16 items-center justify-center rounded-full"
                    style={{ background: "#fff", color: "var(--ink)" }}
                  >
                    Play
                  </span>
                </span>
              </button>

              <p className="t-mono-sm mt-3 flex items-center gap-2" style={{ color: "rgba(255,255,255,.85)" }}>
                <span aria-hidden style={{ color: "var(--accent)" }}>
                  &#10022;
                </span>
                Best digital campaign, Signal Awards
              </p>
            </Stage>
          </div>
        </div>
      </div>

      <style>{`@keyframes heroIn{from{transform:scale(1.12);opacity:.4}to{transform:scale(1);opacity:1}}`}</style>
    </section>
  );
}
