"use client";

import Image from "next/image";
import Link from "next/link";
import { studioStats } from "@/data/site";
import Counter from "@/components/ui/Counter";
import Reveal, { RevealWords } from "@/components/ui/Reveal";
import { Arrow, Eyebrow } from "@/components/ui/Bits";

export default function Achievements() {
  return (
    <section
      className="section"
      style={{ background: "var(--ink)", color: "#fff" }}
      aria-labelledby="achv-heading"
    >
      <div className="shell">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-6">
            <Eyebrow invert>Achievements</Eyebrow>
            <RevealWords
              as="h2"
              id="achv-heading"
              text="Where the last nine years went"
              className="t-h2 mt-5 max-w-[12ch]"
            />
          </div>
          <Reveal className="md:col-span-5 md:col-start-8 md:self-end">
            <p className="t-body" style={{ color: "rgba(255,255,255,0.6)" }}>
              Since launch we have worked with brands and startups across design, technology and
              strategy — moving from independent projects to larger programmes, with a lean process and
              measurable goals throughout.
            </p>
          </Reveal>
        </div>

        <Reveal className="img-mask relative mt-12 aspect-[16/9] w-full overflow-hidden md:mt-16 md:aspect-[21/9]">
          <Image
            src="/img/process.svg"
            alt="Showreel still"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <span
            aria-hidden
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(5,6,9,0.1), rgba(5,6,9,0.6))" }}
          />
          <span className="btn btn-light absolute bottom-6 left-6">
            <span>Watch showreel 2025</span>
            <Arrow />
          </span>
        </Reveal>

        <dl className="mt-14 grid gap-x-8 sm:grid-cols-3">
          {studioStats.map((s, i) => (
            <Reveal as="div" key={s.index} delay={i * 90} className="py-6">
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.16)", paddingTop: 20 }}>
                <dd
                  className="num font-medium leading-[0.9em] tracking-[-0.06em]"
                  style={{ fontSize: "calc(var(--rfs) * 4.6)" }}
                >
                  <Counter value={s.value} suffix={s.suffix} duration={2000} />
                </dd>
                <dt className="label mt-5 block" style={{ color: "rgba(255,255,255,0.75)" }}>
                  {s.label}
                </dt>
                <span className="label mt-2 block" style={{ color: "var(--accent)" }}>
                  {s.index}
                </span>
              </div>
            </Reveal>
          ))}
        </dl>

        <Reveal className="mt-10">
          <Link href="/work" className="btn btn-light btn-lg">
            <span>See the work</span>
            <Arrow />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
