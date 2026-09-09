"use client";

import Image from "next/image";
import Counter from "@/components/ui/Counter";
import Reveal, { RevealImage, RevealWords } from "@/components/ui/Reveal";
import { Arrow, Eyebrow } from "@/components/ui/Bits";
import Link from "next/link";

/** Shared closing CTA that appears above the footer on every route. */
export default function CtaBlock() {
  return (
    <section className="rule-t" aria-labelledby="cta-heading">
      <div className="shell">
        <div className="grid gap-10 py-16 md:grid-cols-12 md:gap-8 md:py-24">
          {/* left: tenure + proof points */}
          <div className="md:col-span-5">
            <Reveal>
              <p className="t-h2 leading-[0.9em]">
                <Counter value={9} duration={1400} /> years
              </p>
            </Reveal>
            <Reveal delay={80}>
              <p className="t-body mt-5 max-w-sm" style={{ color: "var(--muted)" }}>
                Building long partnerships, scaling brands, and shipping work that holds up.
              </p>
            </Reveal>
            <ul className="mt-8 space-y-0">
              {[
                { v: 120, s: "+", l: "projects delivered" },
                { v: 99, s: "%", l: "on-time launches" },
                { v: 84, s: "%", l: "average lift in engagement" },
              ].map((r, i) => (
                <Reveal as="li" key={r.l} delay={i * 70} className="rule-t flex items-baseline gap-4 py-3">
                  <span className="t-h4 num w-[4.5em] shrink-0">
                    <Counter value={r.v} suffix={r.s} />
                  </span>
                  <span className="t-small" style={{ color: "var(--muted)" }}>
                    {r.l}
                  </span>
                </Reveal>
              ))}
              <li className="rule-t py-3">
                <span className="label">2016 — 2025</span>
              </li>
            </ul>
          </div>

          {/* right: headline + quote */}
          <div className="md:col-span-7 md:pl-8">
            <Eyebrow>Next step</Eyebrow>
            <RevealWords
              as="h2"
              text="Let us take on your next project"
              className="t-h2 mt-5"
            />

            <RevealImage className="mt-10 aspect-[16/10] w-full">
              <Image
                src="/img/cta.svg"
                alt="Abstract studio composition"
                width={1400}
                height={950}
                className="img-zoom h-full w-full object-cover"
              />
            </RevealImage>

            <Reveal className="mt-10 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
              <blockquote className="t-lead max-w-md">
                “We listen first, stay transparent, and deliver what we promised. Every project matters
                here.”
                <footer className="label mt-4 not-italic">
                  Ivar Solheim — CEO of Create®
                </footer>
              </blockquote>
              <Link href="/contact" className="btn btn-dark btn-lg" id="cta-heading">
                <span>Book an intro call</span>
                <Arrow />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
