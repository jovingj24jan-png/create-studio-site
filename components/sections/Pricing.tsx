"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { plans } from "@/data/site";
import Reveal, { RevealWords } from "@/components/ui/Reveal";
import { ArrowRight, Eyebrow, Plus } from "@/components/ui/Bits";

/**
 * Plans as an accordion — the open plan shows its full card, the rest collapse
 * to a titled row with a "+" affordance, the way the reference behaves.
 */
export default function Pricing() {
  const [open, setOpen] = useState(0);

  return (
    <section id="pricing" className="section scroll-mt-24" aria-labelledby="pricing-heading">
      <div className="shell">
        <div className="grid gap-8 pb-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <Eyebrow>Pricing</Eyebrow>
            <RevealWords
              as="h2"
              id="pricing-heading"
              text="Three ways to start working together"
              className="t-h2 mt-6 max-w-[16ch]"
            />
          </div>
          <Reveal className="md:col-span-4 md:col-start-9 md:self-end">
            <p className="t-body" style={{ color: "var(--deep)" }}>
              Each plan sets out scope, features and cost up front, so you can decide with the whole
              picture in view.
            </p>
          </Reveal>
        </div>

        <div className="space-y-3">
          {plans.map((p, i) => {
            const isOpen = open === i;
            return (
              <Reveal
                as="article"
                key={p.no}
                delay={i * 80}
                className="overflow-hidden"
                style={{
                  background: isOpen ? "var(--white)" : "var(--mist)",
                  borderRadius: 18,
                  border: "1px solid var(--line)",
                }}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`plan-${i}`}
                    className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left md:px-10 md:py-8"
                  >
                    <span className="flex items-center gap-5">
                      <span aria-hidden className="ticks hidden h-8 w-6 shrink-0 md:block" />
                      <span>
                        <span className="t-h4 block">{p.tier}</span>
                        <span className="t-mono-sm mt-1 block" style={{ color: "var(--accent)" }}>
                          {p.name}
                        </span>
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="relative block h-4 w-4 shrink-0 transition-transform duration-500"
                      style={{
                        transform: isOpen ? "rotate(135deg)" : "none",
                        transitionTimingFunction: "cubic-bezier(.22,1,.36,1)",
                      }}
                    >
                      <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current" />
                      <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current" />
                    </span>
                  </button>
                </h3>

                <div id={`plan-${i}`} className={`acc-body ${isOpen ? "acc-open" : ""}`}>
                  <div>
                    <div className="grid grid-cols-12 gap-y-8 px-6 pb-8 md:gap-x-8 md:px-10 md:pb-10">
                      {/* price + summary */}
                      <div className="col-span-12 md:col-span-4">
                        <div className="flex flex-wrap items-end gap-x-3">
                          <span className="t-h3 num">{p.price}</span>
                          <span className="t-mono-sm pb-1" style={{ color: "var(--muted)" }}>
                            {p.unit}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center gap-3">
                          <span className="t-small line-through" style={{ color: "var(--muted)" }}>
                            was {p.was}
                          </span>
                          <span
                            className="t-mono-sm rounded-full px-2 py-[2px]"
                            style={{ background: "var(--accent)", color: "#fff" }}
                          >
                            {p.save}
                          </span>
                        </div>
                        <p className="t-small mt-6 max-w-[34ch] italic" style={{ color: "var(--deep)" }}>
                          {p.copy}
                        </p>
                        <span aria-hidden className="ticks mt-6 block" />
                      </div>

                      {/* features */}
                      <ul className="col-span-12 md:col-span-4">
                        {p.features.map((f) => (
                          <li key={f} className="flex items-start gap-3 py-[7px]">
                            <Plus className="mt-[6px] shrink-0" size={9} />
                            <span className="t-small">{f}</span>
                          </li>
                        ))}
                      </ul>

                      {/* cta + notes */}
                      <div className="col-span-12 md:col-span-3 md:col-start-10">
                        <Link href="/contact" className="btn btn-accent btn-lg w-full">
                          <span>Get started</span>
                          <ArrowRight />
                        </Link>
                        <p className="t-small mt-4 flex items-center gap-2" style={{ color: "var(--deep)" }}>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
                            <path d="M7 4v3.2l2 1.2" stroke="currentColor" strokeWidth="1.2" />
                          </svg>
                          Timeline <strong className="font-medium">{p.timeline}</strong>
                        </p>
                        <ul className="mt-6 space-y-2">
                          {p.notes.map((n) => (
                            <li key={n} className="t-small flex gap-2" style={{ color: "var(--muted)" }}>
                              <span style={{ color: "var(--accent)" }}>—</span>
                              {n}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* ask an expert */}
        <Reveal className="mt-20 grid grid-cols-12 items-center gap-y-8 md:gap-x-8">
          <h3 className="t-h2 col-span-12 md:col-span-4" style={{ color: "var(--muted)" }}>
            Ask our expert
          </h3>
          <p className="t-body col-span-12 max-w-[32ch] md:col-span-3" style={{ color: "var(--deep)" }}>
            Schedule a quick call and we will walk you through the plans.
          </p>
          <div
            className="col-span-12 md:col-span-4 md:col-start-9"
            style={{ borderLeft: "1px solid var(--line)", paddingLeft: 24 }}
          >
            <div className="flex items-center gap-4">
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
                <Image src="/img/person-nora-pemberton.svg" alt="" fill sizes="56px" className="object-cover" />
              </span>
              <div>
                <p className="t-body-m">Nora Pemberton</p>
                <p className="t-small" style={{ color: "var(--muted)" }}>
                  Project Operations Manager
                </p>
              </div>
            </div>
            <Link href="/contact" className="btn btn-accent mt-6">
              <span>Book a call</span>
              <ArrowRight />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
