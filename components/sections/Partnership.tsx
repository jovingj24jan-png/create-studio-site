"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal, { RevealWords } from "@/components/ui/Reveal";
import { Arrow, Eyebrow } from "@/components/ui/Bits";

const pillars = [
  {
    title: "Ongoing support",
    copy: "Fixes, updates and small improvements handled by the people who built the thing.",
  },
  {
    title: "Long-term partnership",
    copy: "Retained time each month, so the roadmap keeps moving without a new kickoff each quarter.",
  },
  {
    title: "Future-ready builds",
    copy: "Documented systems and clean code, so another team could pick it up tomorrow if needed.",
  },
];

export default function Partnership() {
  return (
    <section className="section" aria-labelledby="partner-heading">
      <div className="shell">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <Eyebrow>Built for the long run</Eyebrow>
            <RevealWords
              as="h2"
              id="partner-heading"
              text="Still here after launch day"
              className="t-h2 mt-5 max-w-[11ch]"
            />

            <ul className="mt-10">
              {pillars.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 90} className="rule-t py-6">
                  <div className="flex items-baseline gap-5">
                    <span className="label num" style={{ color: "var(--accent)" }}>
                      /0{i + 1}
                    </span>
                    <div>
                      <h3 className="t-h4">{p.title}</h3>
                      <p className="t-small mt-2 max-w-[42ch]" style={{ color: "var(--muted)" }}>
                        {p.copy}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
              <li className="rule-t" />
            </ul>
          </div>

          {/* availability card */}
          <div className="md:col-span-5 md:col-start-8">
            <Reveal className="relative overflow-hidden" style={undefined}>
              <div
                className="relative flex h-full flex-col justify-between p-7 md:p-9"
                style={{ background: "var(--mist)" }}
              >
                <div>
                  <p className="label">Next availability</p>
                  <p className="t-h3 mt-2">from 14 September</p>
                  <p className="t-body mt-6 max-w-[30ch]" style={{ color: "var(--muted)" }}>
                    A quick intro call, no strings attached. Tell us what you are working on and we
                    will tell you honestly whether we are the right fit.
                  </p>
                </div>

                <div className="mt-10">
                  <div className="img-mask relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src="/img/studio-c.svg"
                      alt=""
                      fill
                      sizes="(max-width: 809px) 100vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                  <Link href="/contact" className="btn btn-dark btn-lg mt-6 w-full">
                    <span>Book now</span>
                    <Arrow />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
