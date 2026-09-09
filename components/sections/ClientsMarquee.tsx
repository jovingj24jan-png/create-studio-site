"use client";

import Image from "next/image";
import { clients } from "@/data/site";
import Marquee from "@/components/ui/Marquee";
import { RevealWords } from "@/components/ui/Reveal";

export default function ClientsMarquee({
  heading = "Names that shaped the work you just scrolled",
  compact = false,
}: {
  heading?: string;
  compact?: boolean;
}) {
  return (
    <section className={compact ? "section-sm" : "section"} aria-label="Clients and partners">
      <div className="shell">
        <RevealWords
          as="h2"
          text={heading}
          className="t-h2 mx-auto max-w-[18ch] text-center"
        />
      </div>

      <div className="mt-12 space-y-4 md:mt-16">
        {[0, 1].map((row) => (
          <div key={row} className="rule-t rule-b py-6">
            <Marquee
              duration={row === 0 ? 38 : 48}
              direction={row === 0 ? "left" : "right"}
              copies={3}
              pauseOnHover
            >
              {clients.map((c) => (
                <span
                  key={`${row}-${c}`}
                  className="flex shrink-0 items-center px-7 md:px-12"
                  style={{ color: "var(--muted)" }}
                >
                  <Image
                    src={`/img/client-${c}.svg`}
                    alt={c}
                    width={200}
                    height={44}
                    className="h-8 w-auto opacity-55 transition-opacity duration-300 hover:opacity-100 md:h-10"
                  />
                </span>
              ))}
            </Marquee>
          </div>
        ))}
      </div>
    </section>
  );
}
