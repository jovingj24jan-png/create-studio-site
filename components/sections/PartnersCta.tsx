"use client";

import Link from "next/link";
import Reveal, { RevealWords } from "@/components/ui/Reveal";
import { Arrow, Eyebrow } from "@/components/ui/Bits";

/** "Be our next partner" band used on the Studio page between clients and awards. */
export default function PartnersCta() {
  return (
    <section className="section-sm" aria-labelledby="partners-heading">
      <div className="shell">
        <div className="rule-t grid gap-8 pt-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <Eyebrow>Clients &amp; partners</Eyebrow>
            <RevealWords
              as="h2"
              id="partners-heading"
              text="You could be next"
              className="t-h2 mt-5 max-w-[12ch]"
            />
          </div>
          <Reveal className="md:col-span-5 md:col-start-8 md:self-end">
            <p className="t-lead" style={{ color: "var(--muted)" }}>
              We are open to new ideas, conversations and collaborations. Tell us what you have in mind
              and we will tell you whether we can help.
            </p>
            <Link href="/contact" className="btn btn-dark btn-lg mt-6">
              <span>Book an intro call</span>
              <Arrow />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
