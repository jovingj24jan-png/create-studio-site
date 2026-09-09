"use client";

import Image from "next/image";
import Reveal, { RevealLines, RevealWords } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Bits";

export default function StudioIntro() {
  return (
    <>
      <section className="pt-[calc(var(--nav-h)+40px)]" aria-labelledby="studio-title">
        <div className="shell">
          <RevealLines
            as="h1"
            id="studio-title"
            className="t-h2"
            stagger={110}
            lines={[
              "we listen.",
              "we shape.",
              <span key="c" style={{ color: "var(--accent)" }}>
                we build.
              </span>,
            ]}
          />
        </div>
      </section>

      <section className="section-sm" aria-label="Studio introduction">
        <div className="shell">
          <div className="rule-t grid gap-8 pt-10 md:grid-cols-12">
            <div className="md:col-span-3">
              <Eyebrow>The studio</Eyebrow>
            </div>
            <div className="md:col-span-9">
              <RevealWords
                as="p"
                className="t-h2 max-w-[24ch]"
                text="We take half-formed ideas from ambitious teams and turn them into things people use."
              />
              <Reveal delay={120}>
                <p className="t-lead mt-8 max-w-[54ch]" style={{ color: "var(--muted)" }}>
                  Every project here is personal. It gets shaped by real conversations and considered
                  decisions, on the belief that the best work comes out of collaboration rather than
                  hierarchy.
                </p>
              </Reveal>
            </div>
          </div>

          <Reveal className="img-mask relative mt-14 aspect-[16/9] w-full overflow-hidden md:aspect-[21/9]">
            <Image
              src="/img/studio-a.svg"
              alt="The studio at work"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </Reveal>

          <div className="rule-b grid gap-8 py-10 md:grid-cols-12">
            <p className="t-h3 md:col-span-7 max-w-[26ch]">
              Create® designs, builds and launches digital products that pair clarity with character.
            </p>
            <div className="md:col-span-4 md:col-start-9">
              <p className="label">We are</p>
              <p className="t-body mt-3" style={{ color: "var(--muted)" }}>
                A group of designers, engineers and strategists who enjoy the process about as much as
                the finished thing.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
