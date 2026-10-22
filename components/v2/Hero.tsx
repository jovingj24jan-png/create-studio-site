"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import HeroStageA from "./HeroStageA";
import HeroStageB from "./HeroStageB";
import VideoBg from "./VideoBg";
import { media } from "./media";
import { CUE, EASE_HERO, SPRING_SOFT } from "./motion";

const SCRIM =
  "linear-gradient(180deg, rgba(20,20,20,.55) 0%, rgba(20,20,20,.15) 40%, rgba(20,20,20,.75) 100%)";

/**
 * Two viewports on one dark canvas. The background clip is sticky across both,
 * so the parallax that drifts it down through Stage A leaves the subject
 * framed lower by the time Stage B arrives.
 */
export default function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // the first viewport of scroll is the first half of a two-viewport section
  const rawVidY = useTransform(scrollYProgress, [0, 0.5], ["0%", "12%"]);
  const rawVidScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.08]);
  const rawMarkY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);
  const rawMarkOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.25]);
  const rawContentY = useTransform(scrollYProgress, [0, 0.5], [0, -40]);
  const rawContentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const rawRule = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  // nothing is pixel-locked to the wheel
  const vidY = useSpring(rawVidY, SPRING_SOFT);
  const vidScale = useSpring(rawVidScale, SPRING_SOFT);
  const markY = useSpring(rawMarkY, SPRING_SOFT);
  const markOpacity = useSpring(rawMarkOpacity, SPRING_SOFT);
  const contentY = useSpring(rawContentY, SPRING_SOFT);
  const contentOpacity = useSpring(rawContentOpacity, SPRING_SOFT);
  const rule = useSpring(rawRule, SPRING_SOFT);

  // reduced motion keeps the fades but drops every transform
  const flatY = useMotionValue(0);
  const flatScale = useMotionValue(1);
  const one = useMotionValue(1);

  return (
    <section
      ref={ref}
      className="relative"
      style={{ background: "var(--v2-ink)" }}
      aria-label="Introduction"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={
            reduced
              ? { y: flatY, scale: flatScale }
              : { y: vidY, scale: vidScale, willChange: "transform" }
          }
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: CUE.video, ease: EASE_HERO }}
        >
          <VideoBg clip={media.hero} />
        </motion.div>
        <div className="absolute inset-0" style={{ background: SCRIM }} aria-hidden />
      </div>

      <div className="relative" style={{ marginTop: "-100svh" }}>
        <HeroStageA
          contentY={reduced ? flatY : contentY}
          contentOpacity={reduced ? one : contentOpacity}
          markY={reduced ? flatY : markY}
          markOpacity={reduced ? one : markOpacity}
          ruleProgress={reduced ? one : rule}
        />
        <HeroStageB />
      </div>
    </section>
  );
}
