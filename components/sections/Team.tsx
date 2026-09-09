"use client";

import Image from "next/image";
import Link from "next/link";
import type { Person } from "@/data/site";
import { team } from "@/data/site";
import Reveal, { RevealWords } from "@/components/ui/Reveal";
import { Arrow, Eyebrow } from "@/components/ui/Bits";

export function PersonCard({ p, index }: { p: Person; index: number }) {
  return (
    <Reveal as="article" delay={index * 80} className="group">
      <div className="img-mask relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={`/img/person-${p.slug}.svg`}
          alt={`${p.name}, ${p.role}`}
          fill
          sizes="(max-width: 809px) 50vw, 24vw"
          className="object-cover transition-transform duration-[1.2s] ease-swift group-hover:scale-[1.05]"
        />
        {p.kpi && (
          <div
            className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-500 ease-swift group-hover:translate-y-0"
            style={{ background: "rgba(5,6,9,0.86)", color: "#fff" }}
          >
            <p className="label" style={{ color: "var(--accent)" }}>
              //KPI
            </p>
            <p className="t-h4 num mt-1">{p.kpi}</p>
            <p className="t-small mt-1" style={{ color: "rgba(255,255,255,0.65)" }}>
              {p.kpiCopy}
            </p>
          </div>
        )}
      </div>
      <div className="rule-t mt-4 flex items-start justify-between gap-3 pt-3">
        <div>
          <h3 className="t-h4">{p.name}</h3>
          <p className="label mt-1">{p.role}</p>
        </div>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`${p.name} on LinkedIn`}
          className="mt-1 transition-colors duration-300 hover:text-[var(--accent)]"
        >
          <Arrow />
        </a>
      </div>
    </Reveal>
  );
}

export default function Team({ people = team }: { people?: Person[] }) {
  return (
    <section className="section" aria-labelledby="team-heading">
      <div className="shell">
        <div className="rule-b grid gap-8 pb-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <Eyebrow>The team</Eyebrow>
            <RevealWords
              as="h2"
              id="team-heading"
              text="Light in the room, serious on the work"
              className="t-h2 mt-5 max-w-[13ch]"
            />
          </div>
          <Reveal className="md:col-span-5 md:col-start-8 md:self-end">
            <p className="t-lead" style={{ color: "var(--muted)" }}>
              <span style={{ color: "var(--accent)" }}>——&nbsp;</span>
              Sharp strategy and bold ideas without the boardroom stiffness. Professional where it
              counts, human where it matters.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-x-5 gap-y-10 pt-12 lg:grid-cols-4">
          {people.map((p, i) => (
            <PersonCard key={p.slug} p={p} index={i} />
          ))}
        </div>

        <Reveal className="rule-t mt-14 grid gap-6 pt-8 md:grid-cols-12">
          <h3 className="t-h3 md:col-span-6 max-w-[20ch]">
            Our leads stay on from first kickoff to final delivery.
          </h3>
          <p className="t-body md:col-span-3" style={{ color: "var(--muted)" }}>
            Every milestone checked, every detail reviewed, every client kept in the loop. That is how
            projects land sharp and on time.
          </p>
          <div className="md:col-span-3 md:flex md:justify-end">
            <Link href="/studio" className="btn btn-outline">
              <span>Meet the team</span>
              <Arrow />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
