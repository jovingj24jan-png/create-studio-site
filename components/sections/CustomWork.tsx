"use client";

import { RevealLines } from "@/components/ui/Reveal";

/** Large editorial statement set between the "why" block and pricing. */
export default function CustomWork() {
  return (
    <section className="rule-t rule-b py-20 md:py-32" aria-label="Studio statement">
      <div className="shell">
        <RevealLines
          as="p"
          className="t-h2 max-w-[16ch]"
          stagger={110}
          lines={[
            "No templates,",
            "no leftovers.",
            <span key="a" style={{ color: "var(--muted)" }}>
              Built for you
            </span>,
            <span key="b" style={{ color: "var(--accent)" }}>
              from the first sketch.
            </span>,
          ]}
        />
      </div>
    </section>
  );
}
