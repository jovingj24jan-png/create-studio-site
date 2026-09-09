"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { posts } from "@/data/site";
import Reveal, { RevealWords } from "@/components/ui/Reveal";
import WhisperCard from "@/components/ui/WhisperCard";
import { ArrowRight, Plus } from "@/components/ui/Bits";

const topics = ["All", "Studio projects", "Design and process", "Ideas and insight"];

export default function WhispersIndex() {
  const [topic, setTopic] = useState("All");
  const [lead, ...rest] = posts;

  // topics map onto thirds of the archive; "All" shows everything
  const list = useMemo(() => {
    if (topic === "All") return rest;
    const i = topics.indexOf(topic) - 1;
    return rest.filter((_, k) => k % 3 === i);
  }, [topic, rest]);

  return (
    <>
      <section className="pt-[calc(var(--nav-h)+56px)]" aria-labelledby="whispers-title">
        <div className="shell">
          <RevealWords as="h1" id="whispers-title" text="whispers" className="t-h2" />

          <div className="grid gap-8 pb-10 pt-8 md:grid-cols-12">
            <p className="t-lead md:col-span-5" style={{ color: "var(--deep)" }}>
              Notes on creativity, strategy and making things actually work.
            </p>
            <ul className="md:col-span-6 md:col-start-7">
              {[
                "Studio projects and case studies",
                "Notes on design and process",
                "Ideas, insight and inspiration",
              ].map((t) => (
                <li key={t} className="rule-t flex items-center gap-4 py-4">
                  <Plus className="shrink-0" style={{ color: "var(--accent)" }} />
                  <span className="t-body">{t}</span>
                </li>
              ))}
              <li className="rule-t" />
            </ul>
          </div>
        </div>
      </section>

      {/* featured */}
      <section className="section-sm" aria-label="Latest whisper">
        <div className="shell">
          <WhisperCard post={lead} size="lg" />
        </div>
      </section>

      {/* archive */}
      <section className="section-sm" aria-label="All whispers">
        <div className="shell">
          <div className="rule-b flex flex-wrap items-center justify-between gap-4 pb-6">
            <h2 className="t-h4">Everything we have written down.</h2>
            <div className="flex flex-wrap gap-2">
              {topics.map((t) => {
                const active = topic === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTopic(t)}
                    aria-pressed={active}
                    className="t-mono-sm min-h-[40px] rounded-full border px-4 transition-colors duration-300"
                    style={{
                      borderColor: active ? "var(--ink)" : "var(--line)",
                      background: active ? "var(--ink)" : "transparent",
                      color: active ? "#fff" : "var(--muted)",
                    }}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          {list.length === 0 ? (
            <p className="t-lead py-16 text-center" style={{ color: "var(--muted)" }}>
              Nothing filed under “{topic}” yet.
            </p>
          ) : (
            <div className="grid gap-5 pt-10 sm:grid-cols-2">
              {list.map((p, i) => (
                <WhisperCard key={p.slug} post={p} index={i} />
              ))}
            </div>
          )}

          <Reveal className="mt-14 flex justify-center">
            <Link href="/contact" className="btn btn-dark btn-lg">
              <span>Suggest a topic</span>
              <ArrowRight />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
