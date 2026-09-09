"use client";

import Link from "next/link";
import { planTiers } from "@/data/site";
import Reveal, { RevealWords } from "@/components/ui/Reveal";
import { Arrow, Eyebrow } from "@/components/ui/Bits";

export default function PricingTeaser() {
  return (
    <section className="section-sm" aria-labelledby="plans-teaser">
      <div className="shell">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow>Simple pricing</Eyebrow>
            <RevealWords
              as="h2"
              id="plans-teaser"
              text="Pick the shape that fits"
              className="t-h2 mt-5 max-w-[14ch]"
            />
            <Reveal delay={100}>
              <p className="t-body mt-5 max-w-[38ch]" style={{ color: "var(--muted)" }}>
                Pick the tier that matches the stage you are at. Scope, features and cost are agreed
                before anything starts.
              </p>
              <Link href="#pricing" className="btn btn-outline mt-7">
                <span>Explore plans</span>
                <Arrow />
              </Link>
            </Reveal>
          </div>

          <ul className="md:col-span-6 md:col-start-7">
            {planTiers.map((t, i) => (
              <Reveal
                as="li"
                key={t.name}
                delay={i * 80}
                className="group rule-t flex items-baseline justify-between gap-6 py-6"
              >
                <div className="flex items-baseline gap-5">
                  <span className="label num">0{i + 1}</span>
                  <span className="t-h3 transition-colors duration-300 group-hover:text-[var(--accent)]">
                    {t.name}
                  </span>
                </div>
                <span className="t-small text-right" style={{ color: "var(--muted)" }}>
                  {t.copy}
                </span>
              </Reveal>
            ))}
            <li className="rule-t" />
          </ul>
        </div>
      </div>
    </section>
  );
}
