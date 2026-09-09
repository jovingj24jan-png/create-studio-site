"use client";

import Link from "next/link";
import { studioProcess } from "@/data/site";
import Reveal, { RevealWords } from "@/components/ui/Reveal";
import { Arrow, Eyebrow } from "@/components/ui/Bits";

/** Studio-page process: numbered steps in a sticky two-column layout. */
export default function HowWeWork() {
  return (
    <section className="section" aria-labelledby="hww-heading">
      <div className="shell">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-[calc(var(--nav-h)+32px)]">
              <Eyebrow>How we work</Eyebrow>
              <RevealWords
                as="h2"
                id="hww-heading"
                text="How a project runs"
                className="t-h2 mt-5"
              />
              <Reveal delay={100}>
                <p className="t-body mt-6 max-w-[36ch]" style={{ color: "var(--muted)" }}>
                  Every project moves through the same four stages, with design, engineering and
                  communication kept in step.
                </p>
                <Link href="/work" className="btn btn-outline mt-8">
                  <span>Explore case studies</span>
                  <Arrow />
                </Link>
              </Reveal>
            </div>
          </div>

          <ol className="md:col-span-7 md:col-start-6">
            {studioProcess.map((s, i) => (
              <Reveal as="li" key={s.no} delay={i * 90} className="rule-t py-8 md:py-10">
                <div className="flex items-baseline justify-between gap-6">
                  <h3 className="t-h3 max-w-[16ch]">{s.title}</h3>
                  <span className="label num shrink-0" style={{ color: "var(--accent)" }}>
                    {s.no}
                  </span>
                </div>
                <p className="t-body mt-4 max-w-[52ch]" style={{ color: "var(--muted)" }}>
                  {s.copy}
                </p>
              </Reveal>
            ))}
            <li className="rule-t" />
          </ol>
        </div>
      </div>
    </section>
  );
}
