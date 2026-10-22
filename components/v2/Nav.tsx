"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useScramble } from "./ScrambleText";
import { EASE_OUT_EXPO, SPRING_POP, STAGGER } from "./motion";

const LINKS = [
  { label: "WORK", href: "/work", count: 6 },
  { label: "STUDIO", href: "/studio", count: 3 },
  { label: "WHISPERS", href: "/whispers", count: 7 },
];

/** Nav item: scrambles its label and pops its counter on hover. */
function NavLink({
  label,
  href,
  count,
  onClick,
}: {
  label: string;
  href: string;
  count?: number;
  onClick?: () => void;
}) {
  const { output, start, stop } = useScramble(label);
  const [hot, setHot] = useState(false);

  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={() => {
        setHot(true);
        start();
      }}
      onMouseLeave={() => {
        setHot(false);
        stop();
      }}
      className="v2-mono v2-nav-link relative inline-flex items-start transition-colors duration-300"
      style={{ color: hot ? "var(--v2-accent)" : "var(--v2-off)" }}
    >
      {/* reserve the label's width so scrambling never nudges the row */}
      <span className="relative inline-grid">
        <span className="invisible col-start-1 row-start-1">{label}</span>
        <span className="col-start-1 row-start-1 whitespace-pre">{output}</span>
      </span>
      {count != null && (
        <motion.sup
          className="v2-mono v2-sup"
          style={{
            color: hot ? "var(--v2-accent)" : "var(--v2-grey-600)",
            display: "inline-block",
            transform: "translate(2px, -8px)",
          }}
          animate={{ scale: hot ? [1, 1.25, 1] : 1 }}
          transition={{ type: "spring", ...SPRING_POP }}
        >
          {count}
        </motion.sup>
      )}
    </Link>
  );
}

export default function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    // only start hiding once past the hero's first fold
    if (y > 80 && y > prev) setHidden(true);
    else if (y < prev) setHidden(false);
  });

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-40"
        style={{ height: "var(--v2-nav-h)", background: "var(--v2-ink)" }}
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
      >
        <nav
          className="flex h-full items-center justify-between px-5 md:px-7"
          aria-label="Primary"
        >
          <Link href="/v2" aria-label="Create Studio — home" className="flex items-center">
            <svg width="92" height="24" viewBox="0 0 92 24" fill="none" aria-hidden>
              <text
                x="0"
                y="18"
                fontFamily="var(--font-sans), system-ui, sans-serif"
                fontSize="20"
                fontWeight="700"
                letterSpacing="-1.1"
                fill="var(--v2-accent)"
              >
                create
              </text>
              <text x="74" y="10" fontSize="8" fontWeight="600" fill="var(--v2-accent)">
                ®
              </text>
            </svg>
          </Link>

          <div className="hidden items-center gap-7 lg:flex lg:pl-[88px]" style={{ marginRight: "auto", marginLeft: 88 }}>
            {LINKS.map((l) => (
              <NavLink key={l.label} {...l} />
            ))}
          </div>

          <div className="hidden lg:block">
            <NavLink label="CONTACT" href="/contact" />
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="v2-menu"
            className="v2-mono v2-nav-link lg:hidden"
            style={{ color: open ? "var(--v2-accent)" : "var(--v2-off)" }}
          >
            {open ? "CLOSE" : "MENU"}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="v2-menu"
            className="fixed inset-0 z-30 flex flex-col justify-center gap-6 px-5 lg:hidden"
            style={{ background: "var(--v2-ink)" }}
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          >
            {[...LINKS, { label: "CONTACT", href: "/contact", count: undefined }].map((l, i) => (
              <motion.div
                key={l.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * STAGGER.nav, duration: 0.5, ease: EASE_OUT_EXPO }}
              >
                <span className="v2-display v2-headline">
                  <NavLink {...l} onClick={() => setOpen(false)} />
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
