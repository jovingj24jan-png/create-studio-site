"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site, socials } from "@/data/site";
import { Logo, RollLink, StudioClock } from "@/components/ui/Bits";

/**
 * Fixed dark nav bar: logotype left, primary links grouped to its right,
 * contact pinned far right. Hides on scroll-down, returns on scroll-up.
 */
export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 260 && y > last);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const primary = nav.filter((n) => n.label !== "CONTACT");

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[120] transition-transform duration-500"
        style={{
          transform: hidden && !open ? "translateY(-102%)" : "translateY(0)",
          transitionTimingFunction: "cubic-bezier(.22,1,.36,1)",
          background: "var(--coal)",
        }}
      >
        <div className="shell flex items-center" style={{ height: "var(--nav-h)" }}>
          <Link href="/" aria-label="Create — home" className="shrink-0">
            <Logo />
          </Link>

          <nav className="ml-[8%] hidden items-center gap-7 md:flex lg:ml-[14%]" aria-label="Primary">
            {primary.map((item) => {
              const active = pathname === item.href;
              return (
                <span key={item.href} className="relative">
                  <RollLink
                    href={item.href}
                    label={item.label}
                    count={item.count}
                    className={active ? "text-white" : "text-white/80 hover:text-white"}
                  />
                  {active && (
                    <span
                      aria-hidden
                      className="absolute -bottom-[6px] left-0 h-px w-full"
                      style={{ background: "var(--accent)" }}
                    />
                  )}
                </span>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-4">
            <Link
              href="/contact"
              className="t-mono hidden text-white/85 transition-colors hover:text-[var(--accent)] md:inline-flex"
            >
              <span className="roll">
                <span>CONTACT</span>
                <span aria-hidden>CONTACT</span>
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative z-[130] -mr-2 flex h-11 w-11 items-center justify-center md:hidden"
            >
              <span className="relative block h-3 w-6">
                <span
                  className="absolute left-0 block h-px w-6 bg-white transition-all duration-500"
                  style={{
                    top: open ? "6px" : "0px",
                    transform: open ? "rotate(45deg)" : "none",
                    transitionTimingFunction: "cubic-bezier(.22,1,.36,1)",
                  }}
                />
                <span
                  className="absolute left-0 block h-px w-6 bg-white transition-all duration-500"
                  style={{
                    top: open ? "6px" : "12px",
                    transform: open ? "rotate(-45deg)" : "none",
                    transitionTimingFunction: "cubic-bezier(.22,1,.36,1)",
                  }}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* mobile overlay */}
      <div
        className="fixed inset-0 z-[110] md:hidden"
        style={{
          background: "var(--coal)",
          clipPath: open ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
          transition: "clip-path .7s cubic-bezier(.76,0,.24,1)",
          pointerEvents: open ? "auto" : "none",
        }}
        aria-hidden={!open}
      >
        <div className="shell flex h-full flex-col justify-between pb-10" style={{ paddingTop: "calc(var(--nav-h) + 28px)" }}>
          <nav className="flex flex-col" aria-label="Mobile">
            {[{ label: "HOME", href: "/" }, ...nav].map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="t-h3 flex items-baseline justify-between py-4 text-white"
                style={{
                  borderBottom: "1px solid rgba(255,255,255,.12)",
                  opacity: open ? 1 : 0,
                  transform: open ? "none" : "translateY(24px)",
                  transition: `opacity .6s ${160 + i * 70}ms cubic-bezier(.22,1,.36,1), transform .6s ${160 + i * 70}ms cubic-bezier(.22,1,.36,1)`,
                }}
              >
                <span>{item.label}</span>
                <span className="label num" style={{ color: "rgba(255,255,255,.4)" }}>
                  0{i + 1}
                </span>
              </Link>
            ))}
          </nav>

          <div style={{ opacity: open ? 1 : 0, transition: "opacity .6s .5s ease" }}>
            <div className="mb-6 flex flex-wrap gap-x-5 gap-y-2">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer noopener" className="t-mono ulink text-white/60">
                  {s.label}
                </a>
              ))}
            </div>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="label" style={{ color: "rgba(255,255,255,.4)" }}>
                  Our time
                </p>
                <p className="t-mono mt-1 text-white">
                  <StudioClock /> · {site.timezone}
                </p>
              </div>
              <a href={`mailto:${site.email}`} className="t-mono ulink text-white">
                {site.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
