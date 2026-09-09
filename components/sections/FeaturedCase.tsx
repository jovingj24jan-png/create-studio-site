"use client";

import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/site";
import Reveal, { RevealImage, RevealWords } from "@/components/ui/Reveal";
import { Arrow, Eyebrow } from "@/components/ui/Bits";

/** Full-bleed featured case study — the visual anchor between process and pricing. */
export default function FeaturedCase() {
  const p = projects[1];

  return (
    <section
      className="section relative"
      style={{ background: "var(--ink)", color: "#fff" }}
      aria-labelledby="case-heading"
    >
      <div className="shell">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-6">
            <Eyebrow invert>Case study</Eyebrow>
            <RevealWords
              as="h2"
              id="case-heading"
              text="One project, start to finish"
              className="t-h2 mt-5 max-w-[11ch]"
            />
          </div>
          <Reveal className="md:col-span-5 md:col-start-8 md:self-end">
            <p className="t-lead" style={{ color: "rgba(255,255,255,0.6)" }}>
              Step inside one project. From the first brief to launch day, this is what makes the way
              we work different.
            </p>
          </Reveal>
        </div>
      </div>

      <RevealImage className="relative mt-12 aspect-[16/9] w-full overflow-hidden md:mt-16 md:aspect-[21/9]">
        <Image
          src={p.wide}
          alt={`${p.title} — ${p.subtitle}`}
          fill
          sizes="100vw"
          className="img-zoom object-cover"
        />
        <span
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(5,6,9,0.15), rgba(5,6,9,0.7))" }}
        />
        <div className="shell absolute inset-x-0 bottom-0 pb-8">
          <p className="label" style={{ color: "rgba(255,255,255,0.6)" }}>
            Featured project
          </p>
          <p className="t-h2 mt-2">{p.title}</p>
        </div>
      </RevealImage>

      <div className="shell">
        <div className="mt-10 grid gap-8 md:grid-cols-12">
          <dl className="md:col-span-7 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              ["Scope", "Brand · Web · Motion"],
              ["Duration", "11 weeks"],
              ["Team", "5 people"],
              ["Year", p.year],
            ].map(([k, v]) => (
              <Reveal key={k} as="div" className="pt-4" >
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.16)", paddingTop: 16 }}>
                  <dt className="label" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {k}
                  </dt>
                  <dd className="t-small mt-2">{v}</dd>
                </div>
              </Reveal>
            ))}
          </dl>

          <Reveal className="md:col-span-4 md:col-start-9 md:self-end">
            <p className="t-body" style={{ color: "rgba(255,255,255,0.6)" }}>
              A real engagement where strategy, design and delivery lined up exactly the way we run
              projects today.
            </p>
            <Link href="/work" className="btn btn-light btn-lg mt-6">
              <span>Explore case studies</span>
              <Arrow />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
