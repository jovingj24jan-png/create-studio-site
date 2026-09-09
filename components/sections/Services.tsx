"use client";

import Image from "next/image";
import { services, type Service } from "@/data/site";
import Reveal, { useInView } from "@/components/ui/Reveal";
import { Plus } from "@/components/ui/Bits";

/**
 * One block per discipline: kicker + index across a hairline, an oversized
 * title, then a small case thumbnail and description on the left with the
 * capability list on the right.
 */
function ServiceBlock({ s, i }: { s: Service; i: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  return (
    <article ref={ref} className="pt-14 md:pt-24">
      {/* kicker row */}
      <div className="flex items-end justify-between gap-6">
        <span className="t-mono-sm shrink-0" style={{ color: "var(--deep)" }}>
          {s.kicker}
        </span>
        <span aria-hidden className="ticks mx-4 hidden flex-1 md:block" />
        <span
          className="t-h5 shrink-0 num"
          style={{ color: "var(--rule)", fontWeight: 400 }}
        >
          /{s.no}
        </span>
      </div>

      {/* accent tick + hairline */}
      <div className="relative mt-2">
        <span className="block h-px w-full" style={{ background: "var(--line)" }} />
        <span
          aria-hidden
          className="absolute left-0 top-0 block h-[2px] transition-[width] duration-[1.2s] ease-out"
          style={{ background: "var(--accent)", width: inView ? "26px" : "0px" }}
        />
      </div>

      {/* title */}
      <h3 className="mt-8 md:mt-12">
        <span className={`line-mask ${inView ? "line-in" : ""}`}>
          <span className="t-service block">{s.title}</span>
        </span>
      </h3>

      {/* body */}
      <div className="mt-8 grid grid-cols-12 gap-y-8 md:mt-14 md:gap-x-8">
        <div className="col-span-12 md:col-span-4">
          <div className={`img-mask relative w-full max-w-[290px] overflow-hidden ${inView ? "img-in" : ""}`}
            style={{ aspectRatio: "290 / 160" }}>
            <Image
              src={s.image}
              alt=""
              fill
              sizes="(max-width: 809px) 100vw, 290px"
              className="img-zoom object-cover"
            />
          </div>
          <p className="t-body mt-6 max-w-[34ch]" style={{ color: "var(--deep)" }}>
            {s.copy}
          </p>
        </div>

        <ul className="col-span-12 md:col-span-5 md:col-start-7">
          {s.points.map((p, k) => (
            <li
              key={p}
              className="flex items-start gap-4 py-3"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(14px)",
                transition: `opacity .7s ${k * 80}ms cubic-bezier(.22,1,.36,1), transform .7s ${k * 80}ms cubic-bezier(.22,1,.36,1)`,
              }}
            >
              <Plus className="mt-[7px] shrink-0" style={{ color: "var(--accent)" }} />
              <span className="t-body">{p}</span>
            </li>
          ))}
          <li aria-hidden className="ticks mt-6" />
        </ul>
      </div>
    </article>
  );
}

export default function Services() {
  return (
    <section className="section" aria-labelledby="services-heading" style={{ background: "var(--paper)" }}>
      <div className="shell">
        <Reveal>
          <h2 id="services-heading" className="t-section-word">
            services
          </h2>
          <p className="t-lead mt-6 max-w-[36ch]" style={{ color: "var(--deep)" }}>
            What we do best, and what your next project needs most.
          </p>
        </Reveal>

        {services.map((s, i) => (
          <ServiceBlock key={s.no} s={s} i={i} />
        ))}
      </div>
    </section>
  );
}
