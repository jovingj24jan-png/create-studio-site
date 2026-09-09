"use client";

import Link from "next/link";
import { posts } from "@/data/site";
import Reveal, { RevealWords } from "@/components/ui/Reveal";
import WhisperCard from "@/components/ui/WhisperCard";
import { ArrowRight, Eyebrow } from "@/components/ui/Bits";

export default function WhispersPreview() {
  const [lead, ...rest] = posts.slice(0, 5);

  return (
    <section className="section" aria-labelledby="whispers-heading">
      <div className="shell">
        <div className="grid gap-8 pb-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <Eyebrow>Whispers</Eyebrow>
            <RevealWords
              as="h2"
              id="whispers-heading"
              text="Half-formed thoughts, written down"
              className="t-h2 mt-6 max-w-[15ch]"
            />
          </div>
          <Reveal className="md:col-span-4 md:col-start-9 md:self-end">
            <p className="t-body" style={{ color: "var(--deep)" }}>
              Launches, design explorations and team experiments — where ideas take shape before they
              become projects.
            </p>
          </Reveal>
        </div>

        <div className="space-y-5">
          <WhisperCard post={lead} size="lg" />
          <div className="grid gap-5 sm:grid-cols-2">
            {rest.map((p, i) => (
              <WhisperCard key={p.slug} post={p} index={i} />
            ))}
          </div>
        </div>

        <Reveal className="mt-12 flex justify-center">
          <Link href="/whispers" className="btn btn-dark btn-lg">
            <span>More whispers</span>
            <sup className="num" style={{ color: "var(--accent)" }}>
              {posts.length}
            </sup>
            <ArrowRight />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
