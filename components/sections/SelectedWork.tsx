"use client";

import Image from "next/image";
import Link from "next/link";
import { projects, type Project } from "@/data/site";
import { useInView } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Bits";

/**
 * One full-bleed dark panel per project: client mark and stack top-left,
 * year top-right, title and discipline centred over the case image.
 * Panels stack so each pins briefly before the next slides over it.
 */
function ProjectPanel({ p, index }: { p: Project; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <article
      className="sticky top-0 h-[100svh] w-full"
      style={{ zIndex: index + 1 }}
    >
      <Link
        href="/work"
        className="group relative block h-full w-full overflow-hidden"
        style={{ background: "var(--ink)" }}
        aria-label={`${p.title} — ${p.subtitle}`}
      >
        <div ref={ref} className={`img-mask absolute inset-0 ${inView ? "img-in" : ""}`}>
          <Image
            src={p.image}
            alt=""
            fill
            sizes="100vw"
            className="img-zoom object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.05]"
          />
        </div>
        <span
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,6,9,.7) 0%, rgba(5,6,9,.15) 35%, rgba(5,6,9,.3) 65%, rgba(5,6,9,.8) 100%)",
          }}
        />

        <div
          className="shell relative flex h-full flex-col justify-between"
          style={{ paddingTop: "calc(var(--nav-h) + 28px)", paddingBottom: "clamp(28px,5vh,64px)" }}
        >
          {/* top row: client mark + stack | year */}
          <div className="flex items-start justify-between gap-6">
            <div>
              <span className="flex items-center gap-3 text-white">
                <Image
                  src={`/img/client-${p.client.toLowerCase()}.svg`}
                  alt={p.client}
                  width={200}
                  height={44}
                  className="h-7 w-auto md:h-8"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </span>
              <ul className="mt-6 hidden md:block">
                {p.stack.map((s) => (
                  <li key={s} className="t-mono-sm" style={{ color: "rgba(255,255,255,.8)" }}>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <p className="t-mono-sm shrink-0" style={{ color: "rgba(255,255,255,.85)" }}>
              YR/ <span className="num">{p.year}</span>
            </p>
          </div>

          {/* centre: title + discipline */}
          <div className="pointer-events-none text-center">
            <span className={`line-mask ${inView ? "line-in" : ""}`}>
              <span className="t-project block text-white">{p.title}</span>
            </span>
            <p className="t-mono mt-3" style={{ color: "rgba(255,255,255,.9)" }}>
              {p.subtitle}
            </p>
          </div>

          {/* bottom: hint + tick rule */}
          <div className="flex items-end justify-between gap-6">
            <span className="t-mono-sm hidden md:block" style={{ color: "rgba(255,255,255,.55)" }}>
              /0{index + 1}
            </span>
            <span className="btn btn-light btn-sm translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <span>View case</span>
              <ArrowRight size={16} />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default function SelectedWork() {
  const featured = projects.slice(0, 3);

  return (
    <section aria-label="Selected work">
      <div className="relative">
        {featured.map((p, i) => (
          <ProjectPanel key={p.slug} p={p} index={i} />
        ))}
      </div>

      {/* closing row, matching the reference's "more projects" strip */}
      <div className="relative z-[10]" style={{ background: "var(--paper)" }}>
        <div className="shell">
          <div className="flex flex-wrap items-center justify-between gap-6 py-12 md:py-16">
            <p className="t-mono-sm">2017—2025</p>
            <Link href="/work" className="btn btn-dark btn-lg">
              <span>More projects</span>
              <sup className="num" style={{ color: "var(--accent)" }}>
                {projects.length}
              </sup>
              <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
