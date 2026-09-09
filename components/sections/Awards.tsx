"use client";

import Link from "next/link";
import { awards } from "@/data/site";
import Reveal, { RevealWords } from "@/components/ui/Reveal";
import { Arrow, Eyebrow } from "@/components/ui/Bits";

export default function Awards() {
  return (
    <section className="section" aria-labelledby="awards-heading">
      <div className="shell">
        <div className="rule-b grid gap-8 pb-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <Eyebrow>Awards</Eyebrow>
            <RevealWords
              as="h2"
              id="awards-heading"
              text="Occasionally someone notices"
              className="t-h2 mt-5 max-w-[13ch]"
            />
          </div>
          <Reveal className="md:col-span-5 md:col-start-8 md:self-end">
            <p className="t-lead" style={{ color: "var(--muted)" }}>
              We care most about projects that perform in the real world. Occasionally the right people
              notice too.
            </p>
          </Reveal>
        </div>

        <Reveal className="rule-b flex flex-wrap items-center justify-between gap-6 py-8">
          <p className="t-h3 max-w-[22ch]">
            Named Creative Agency of the Year 2025 by the Signal Awards®
          </p>
          <Link href="/whispers" className="btn btn-outline">
            <span>Read about it</span>
            <Arrow />
          </Link>
        </Reveal>

        <div className="label hidden grid-cols-12 gap-6 py-5 md:grid">
          <span className="col-span-3">Award</span>
          <span className="col-span-5">Recognition</span>
          <span className="col-span-3">Category</span>
          <span className="col-span-1 text-right">Year</span>
        </div>

        <ul>
          {awards.map((a, i) => (
            <Reveal
              as="li"
              key={a.name}
              delay={i * 60}
              className="rule-t grid grid-cols-12 gap-3 py-6 md:gap-6"
            >
              <h3 className="t-h4 col-span-8 md:col-span-3">{a.name}</h3>
              <span className="label num col-span-4 text-right md:hidden">{a.year}</span>
              <p className="t-small col-span-12 md:col-span-5" style={{ color: "var(--muted)" }}>
                {a.copy}
              </p>
              <span className="label col-span-12 md:col-span-3">{a.category}</span>
              <span className="label num col-span-1 hidden text-right md:block">{a.year}</span>
            </Reveal>
          ))}
          <li className="rule-t" />
        </ul>
      </div>
    </section>
  );
}
