"use client";

import Link from "next/link";
import { testimonials } from "@/data/site";
import Marquee from "@/components/ui/Marquee";
import Reveal, { RevealWords } from "@/components/ui/Reveal";
import { Arrow, Eyebrow } from "@/components/ui/Bits";

function Card({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <figure
      className="mx-3 flex w-[300px] shrink-0 flex-col justify-between p-6 sm:w-[380px] md:mx-4 md:w-[440px] md:p-7"
      style={{ background: "var(--mist)" }}
    >
      <blockquote className="t-body" style={{ color: "var(--ink)" }}>
        “{t.quote}”
      </blockquote>
      <figcaption className="rule-t mt-6 flex items-end justify-between gap-4 pt-4">
        <div>
          <p className="t-small font-medium">{t.name}</p>
          <p className="label mt-1">{t.role}</p>
        </div>
        <p className="label" style={{ color: "var(--accent)" }}>
          {t.company}
        </p>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  const spotlight = testimonials[0];
  const rest = testimonials.slice(1);
  const half = Math.ceil(rest.length / 2);

  return (
    <section className="section" aria-labelledby="testimonials-heading">
      <div className="shell">
        <div className="rule-b grid gap-8 pb-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <Eyebrow>What our clients say</Eyebrow>
            <RevealWords
              as="h2"
              id="testimonials-heading"
              text="Long partnerships, work that holds"
              className="t-h2 mt-5 max-w-[14ch]"
            />
          </div>
          <Reveal className="md:col-span-5 md:col-start-8 md:self-end">
            <p className="t-lead" style={{ color: "var(--muted)" }}>
              From kickoff to launch, brands trust us to stay close, adapt fast and deliver without
              drama.
            </p>
            <Link href="/contact" className="btn btn-outline mt-6">
              <span>Write a review</span>
              <Arrow />
            </Link>
          </Reveal>
        </div>

        {/* spotlight */}
        <Reveal className="grid gap-8 pt-12 md:grid-cols-12">
          <p className="label md:col-span-2">Spotlight</p>
          <figure className="md:col-span-10">
            <blockquote className="t-h3 max-w-[30ch]">“{spotlight.quote}”</blockquote>
            <figcaption className="rule-t mt-8 flex flex-wrap items-center justify-between gap-4 pt-4">
              <div>
                <p className="t-h4">{spotlight.name}</p>
                <p className="label mt-1">
                  {spotlight.role} · {spotlight.company}
                </p>
              </div>
              <p className="label">{spotlight.date}</p>
            </figcaption>
          </figure>
        </Reveal>
      </div>

      {/* rolling wall of reviews */}
      <div className="mt-14 space-y-4 md:mt-20 md:space-y-5">
        <Marquee duration={52} copies={2} pauseOnHover>
          {rest.slice(0, half).map((t) => (
            <Card key={t.name} t={t} />
          ))}
        </Marquee>
        <Marquee duration={62} direction="right" copies={2} pauseOnHover>
          {rest.slice(half).map((t) => (
            <Card key={t.name} t={t} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
