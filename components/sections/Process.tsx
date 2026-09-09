"use client";

import Image from "next/image";
import Link from "next/link";
import { processSteps } from "@/data/site";
import Reveal, { RevealWords } from "@/components/ui/Reveal";
import { Arrow, Eyebrow } from "@/components/ui/Bits";

export default function Process() {
  return (
    <section className="section" aria-labelledby="process-heading">
      <div className="shell">
        <div className="rule-b grid gap-8 pb-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <Eyebrow>How we work</Eyebrow>
            <RevealWords
              as="h2"
              id="process-heading"
              text="Four stages, no guesswork"
              className="t-h2 mt-5 max-w-[12ch]"
            />
          </div>
          <Reveal className="md:col-span-5 md:col-start-8 md:self-end">
            <p className="t-lead" style={{ color: "var(--muted)" }}>
              <span style={{ color: "var(--accent)" }}>——&nbsp;</span>
              Four stages, each with a decision at the end of it. No stage starts before the previous
              one is signed off.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          {/* left rail: intro + contact card */}
          <div className="md:col-span-4">
            <Reveal>
              <h3 className="t-h3 max-w-[18ch]">
                One team across strategy, design and build.
              </h3>
              <p className="t-body mt-5 max-w-[38ch]" style={{ color: "var(--muted)" }}>
                Strategy, design, content and engineering sit in one team, so you have a single
                partner across every stage of growth.
              </p>
            </Reveal>

            <Reveal delay={120} className="rule-t mt-10 pt-6">
              <div className="flex items-center gap-4">
                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src="/img/person-nora-pemberton.svg"
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </span>
                <div>
                  <p className="t-small font-medium">Chat with our operations lead</p>
                  <p className="label mt-1">Nora Pemberton · 24h response</p>
                </div>
              </div>
              <Link href="/contact" className="btn btn-outline mt-6 w-full">
                <span>Book a call</span>
                <Arrow />
              </Link>
            </Reveal>
          </div>

          {/* steps */}
          <ol className="md:col-span-8">
            {processSteps.map((s, i) => (
              <Reveal
                as="li"
                key={s.no}
                delay={i * 90}
                className="group rule-t grid gap-3 py-7 md:grid-cols-12 md:gap-6 md:py-9"
              >
                <span className="label num md:col-span-2" style={{ color: "var(--accent)" }}>
                  {s.no}
                </span>
                <h4 className="t-h3 md:col-span-4 uppercase">{s.title}</h4>
                <p className="t-body md:col-span-6" style={{ color: "var(--muted)" }}>
                  {s.copy}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
