"use client";

import { motion, useReducedMotion, type MotionValue } from "framer-motion";
import CountUp from "./CountUp";
import LogoRotator from "./LogoRotator";
import RollButton from "./RollButton";
import Showreel from "./Showreel";
import Clock from "./Clock";
import { CUE, EASE_OUT_EXPO, STAGGER } from "./motion";

const HEADLINE = [
  ["Digital", "experiences", "that"],
  ["connect,", "scale", "and"],
  ["perform."],
];

/** Marker label: fades in on a short mono flicker. */
function Marker({ children, delay = CUE.markers }: { children: string; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.span
      className="v2-mono v2-marker block text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: reduced ? 1 : [0, 1, 0.3, 1] }}
      transition={{ duration: 0.4, delay, times: [0, 0.4, 0.7, 1] }}
    >
      {children}
    </motion.span>
  );
}

/** Headline word: rises out of its own mask, unblurring as it lands. */
function Word({ word, index, accentTail }: { word: string; index: number; accentTail?: boolean }) {
  const reduced = useReducedMotion();
  return (
    <span className="v2-mask inline-block align-top">
      <motion.span
        className="inline-block"
        initial={reduced ? { opacity: 0 } : { y: "110%", opacity: 0, filter: "blur(10px)" }}
        animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
        transition={{
          duration: 0.9,
          delay: CUE.headline + index * STAGGER.word,
          ease: EASE_OUT_EXPO,
        }}
      >
        {accentTail ? (
          <>
            {word.slice(0, -1)}
            <span style={{ color: "var(--v2-accent)" }}>{word.slice(-1)}</span>
          </>
        ) : (
          word
        )}
        &nbsp;
      </motion.span>
    </span>
  );
}

export default function HeroStageA({
  contentY,
  contentOpacity,
  markY,
  markOpacity,
  ruleProgress,
}: {
  contentY: MotionValue<number>;
  contentOpacity: MotionValue<number>;
  markY: MotionValue<number>;
  markOpacity: MotionValue<number>;
  ruleProgress: MotionValue<number>;
}) {
  const reduced = useReducedMotion();
  let w = 0;

  return (
    <div className="relative h-[100svh] w-full overflow-hidden">
      <div
        className="absolute inset-0 flex flex-col justify-between"
        style={{ padding: "var(--v2-gutter)" }}
      >
        {/* ------------------------------------------------ top band */}
        <motion.div
          className="flex flex-col gap-10 pt-[50px] md:flex-row md:items-start md:justify-between md:gap-8"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <div className="max-w-[540px]">
            <div className="mb-8">
              <Marker>{"// 00.01°"}</Marker>
            </div>
            <h1 className="v2-display v2-headline">
              {HEADLINE.map((line, li) => (
                <span key={li} className="block">
                  {line.map((word) => {
                    const i = w++;
                    return (
                      <Word
                        key={word + i}
                        word={word}
                        index={i}
                        accentTail={word === "perform."}
                      />
                    );
                  })}
                </span>
              ))}
            </h1>
          </div>

          <div className="shrink-0 md:text-right">
            <p className="v2-display v2-stat" style={{ color: "var(--v2-accent)" }}>
              <CountUp value={120} />
            </p>
            <motion.div
              className="mt-2"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: CUE.stat + 0.2 }}
            >
              <p className="v2-mono v2-meta text-white">Quietly making noise for</p>
              <p className="v2-mono v2-meta text-white">Brands worldwide</p>
            </motion.div>
            <div className="mt-4 flex md:justify-end">
              <LogoRotator height={30} />
            </div>
          </div>
        </motion.div>

        {/* --------------------------------------- centre wordmark band */}
        <motion.div style={{ y: markY, opacity: markOpacity }} className="w-full">
          <div className="mb-6">
            <Marker delay={CUE.markers + 0.1}>{"// 00.02°"}</Marker>
          </div>
          <p className="v2-display v2-wordmark whitespace-nowrap">
            {[
              { t: "Create", c: "var(--v2-accent)", d: 0 },
              { t: "\\", c: "var(--v2-white)", d: 2 },
              { t: "Studio", c: "var(--v2-white)", d: 1 },
            ].map(({ t, c, d }) => (
              <span key={t} className="v2-mask inline-block align-top">
                <motion.span
                  className="inline-block"
                  style={{ color: c }}
                  initial={reduced ? { opacity: 0 } : { y: "100%", scale: 1.06 }}
                  animate={{ y: "0%", scale: 1, opacity: 1 }}
                  transition={{
                    duration: 1.1,
                    delay: CUE.wordmark + d * STAGGER.wordmark,
                    ease: EASE_OUT_EXPO,
                  }}
                >
                  {t}
                </motion.span>
              </span>
            ))}
          </p>
        </motion.div>

        {/* --------------------------------------------- bottom band */}
        <motion.div
          className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <div className="max-w-[560px]">
            {[
              "A design studio trusted by startups and",
              "leading brands.",
              "We create stories people remember.",
            ].map((line, i) => (
              <motion.p
                key={line}
                className="v2-mono v2-meta text-white"
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: CUE.paragraph + i * STAGGER.line,
                  ease: EASE_OUT_EXPO,
                }}
              >
                {line}
              </motion.p>
            ))}

            <div className="mt-6 flex flex-col gap-6 sm:flex-row">
              {[
                { label: "See work", href: "/work", variant: "outline" as const },
                { label: "Let's chat", href: "/contact", variant: "solid" as const },
              ].map((b, i) => (
                <motion.div
                  key={b.label}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: CUE.buttons + i * 0.1, ease: EASE_OUT_EXPO }}
                  className="w-full sm:w-auto"
                >
                  <RollButton {...b} className="w-full sm:w-auto" />
                </motion.div>
              ))}
            </div>

            <div className="mt-8">
              <Clock />
            </div>
          </div>

          <div className="w-full lg:w-auto lg:shrink-0">
            <Showreel ruleProgress={ruleProgress} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
