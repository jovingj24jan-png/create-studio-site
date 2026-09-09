"use client";

import { performance } from "@/data/site";
import Counter from "@/components/ui/Counter";
import Reveal, { RevealWords } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Bits";

export default function Performance() {
  return (
    <section
      className="section"
      style={{ background: "var(--ink)", color: "#fff" }}
      aria-labelledby="perf-heading"
    >
      <div className="shell">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-6">
            <Eyebrow invert>Performance</Eyebrow>
            <RevealWords
              as="h2"
              id="perf-heading"
              text="Numbers we are happy to show"
              className="t-h2 mt-5 max-w-[12ch]"
            />
          </div>
          <Reveal className="md:col-span-5 md:col-start-8 md:self-end">
            <p className="t-lead" style={{ color: "rgba(255,255,255,0.6)" }}>
              <span style={{ color: "var(--accent)" }}>——&nbsp;</span>
              From first launches to long collaborations, we are trusted to deliver on time and at the
              quality agreed.
            </p>
          </Reveal>
        </div>

        <dl className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {performance.map((s, i) => (
            <Reveal
              key={s.index}
              delay={i * 90}
              className="flex flex-col justify-between py-8 lg:py-10"
              as="div"
            >
              <div
                className="pb-8"
                style={{ borderTop: "1px solid rgba(255,255,255,0.16)", paddingTop: "20px" }}
              >
                <dd
                  className="num font-medium leading-[0.9em] tracking-[-0.06em]"
                  style={{ fontSize: "calc(var(--rfs) * 5)" }}
                >
                  <Counter value={s.value} suffix={s.suffix} duration={2000} />
                </dd>
                <dt
                  className="label mt-5 block uppercase"
                  style={{ color: "rgba(255,255,255,0.75)" }}
                >
                  {s.label}
                </dt>
                <span className="label mt-2 block" style={{ color: "var(--accent)" }}>
                  {s.index}
                </span>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
