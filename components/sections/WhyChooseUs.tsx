"use client";

import Image from "next/image";
import { whyStats } from "@/data/site";
import Counter from "@/components/ui/Counter";
import Reveal, { RevealLines, RevealWords } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Bits";

function Stars() {
  return (
    <span className="flex items-center gap-1" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 13 13" fill="none">
          <path
            d="M6.5 0.5l1.6 3.9 4.2.3-3.2 2.7 1 4.1-3.6-2.3-3.6 2.3 1-4.1L.7 4.7l4.2-.3z"
            fill="var(--accent)"
          />
        </svg>
      ))}
    </span>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="section" aria-labelledby="why-heading">
      <div className="shell">
        <div className="rule-b grid gap-8 pb-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <Eyebrow>Why choose us</Eyebrow>
            <RevealWords
              as="h2"
              id="why-heading"
              text="Built to keep projects moving"
              className="t-h2 mt-5 max-w-[13ch]"
            />
          </div>
          <Reveal className="md:col-span-5 md:col-start-8 md:self-end">
            <p className="t-lead" style={{ color: "var(--muted)" }}>
              <span style={{ color: "var(--accent)" }}>——&nbsp;</span>
              A clear process, short review cycles and a clean launch. Fewer steps means fewer places
              for a project to stall.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-10 pt-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <RevealLines
              as="p"
              lines={["we listen.", "we shape.", "we build."]}
              className="t-h2"
              stagger={110}
            />
            <Reveal delay={200} className="mt-8">
              <p className="t-h3 max-w-[16ch]" style={{ color: "var(--muted)" }}>
                Ideas <span style={{ color: "var(--ink)" }}>that start with you</span>
              </p>
            </Reveal>

            <Reveal delay={280} className="rule-t mt-10 flex items-center gap-4 pt-6">
              <Stars />
              <p className="t-small">
                <strong className="font-medium">5 / 5</strong>{" "}
                <span style={{ color: "var(--muted)" }}>(98 reviews)</span>
              </p>
            </Reveal>
            <Reveal delay={340}>
              <p className="t-small mt-3" style={{ color: "var(--muted)" }}>
                Based on feedback from 120+ brands we have worked with.
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <Reveal className="img-mask relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/img/studio-b.svg"
                alt="Two designers reviewing work at a studio desk"
                fill
                sizes="(max-width: 809px) 100vw, 48vw"
                className="object-cover"
              />
            </Reveal>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 lg:grid-cols-3">
              {whyStats.map((s, i) => (
                <Reveal as="div" key={s.label} delay={i * 70} className="rule-t py-5">
                  <dd className="t-h3 num">
                    <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
                  </dd>
                  <dt className="label mt-2">{s.label}</dt>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
