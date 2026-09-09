"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { faqs } from "@/data/site";
import Reveal, { RevealWords } from "@/components/ui/Reveal";
import { Arrow, Eyebrow } from "@/components/ui/Bits";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section" aria-labelledby="faq-heading">
      <div className="shell">
        <div className="rule-b grid gap-8 pb-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <Eyebrow>FAQ</Eyebrow>
            <RevealWords
              as="h2"
              id="faq-heading"
              text="Questions worth answering early"
              className="t-h2 mt-5 max-w-[12ch]"
            />
          </div>
          <Reveal className="md:col-span-5 md:col-start-8 md:self-end">
            <p className="t-lead" style={{ color: "var(--muted)" }}>
              <span style={{ color: "var(--accent)" }}>——&nbsp;</span>
              The questions we get asked most often about working together, answered in one place.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-10 pt-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-8">
            <ul>
              {faqs.map((f, i) => {
                const isOpen = open === i;
                return (
                  <li key={f.q} className="rule-t">
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${i}`}
                        className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors duration-300 hover:text-[var(--accent)]"
                      >
                        <span className="flex items-baseline gap-5">
                          <span className="label num shrink-0">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="t-h4">{f.q}</span>
                        </span>
                        <span
                          aria-hidden
                          className="relative mt-2 block h-3 w-3 shrink-0 transition-transform duration-500 ease-swift"
                          style={{ transform: isOpen ? "rotate(135deg)" : "none" }}
                        >
                          <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-current" />
                          <span className="absolute top-1/2 left-0 h-px w-3 -translate-y-1/2 bg-current" />
                        </span>
                      </button>
                    </h3>
                    <div
                      id={`faq-panel-${i}`}
                      role="region"
                      className={`acc-body ${isOpen ? "acc-open" : ""}`}
                    >
                      <div>
                        <p
                          className="t-body max-w-[58ch] pb-7 md:pl-[calc(2.5rem+20px)]"
                          style={{ color: "var(--muted)" }}
                        >
                          {f.a}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
              <li className="rule-t" />
            </ul>
          </div>

          <Reveal className="md:col-span-4">
            <div className="p-7 md:p-8" style={{ background: "var(--mist)" }}>
              <p className="t-h4 max-w-[18ch]">Still have questions?</p>
              <p className="t-small mt-3" style={{ color: "var(--muted)" }}>
                Book a short chat and we will walk you through how we work, with no pitch attached.
              </p>
              <div className="mt-7 flex items-center gap-3">
                <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src="/img/person-esme-duarte.svg"
                    alt=""
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </span>
                <div>
                  <p className="t-small font-medium">Esme Duarte</p>
                  <p className="label mt-[2px]">Project Manager</p>
                </div>
              </div>
              <Link href="/contact" className="btn btn-dark mt-7 w-full">
                <span>Ask a question</span>
                <Arrow />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
