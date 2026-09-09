import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/site/PageIntro";
import ContactForm from "@/components/sections/ContactForm";
import CtaBlock from "@/components/sections/CtaBlock";
import Reveal, { RevealWords } from "@/components/ui/Reveal";
import { Arrow, Eyebrow, StudioClock } from "@/components/ui/Bits";
import { site, socials } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a conversation with Create® Design Studio.",
};

export default function ContactPage() {
  return (
    <PageIntro>
      <section className="pt-[calc(var(--nav-h)+40px)]" aria-labelledby="contact-title">
        <div className="shell">
          <Eyebrow>Contact</Eyebrow>
          <RevealWords
            as="h1"
            id="contact-title"
            text="Working out what comes next?"
            className="t-h2 mt-5 max-w-[14ch]"
          />
          <div className="rule-b grid gap-6 pb-12 pt-8 md:grid-cols-12">
            <p className="t-lead md:col-span-6" style={{ color: "var(--muted)" }}>
              Tell us where you are heading and we will tell you how Create® can help you get there.
            </p>
            <div className="md:col-span-4 md:col-start-9 md:text-right">
              <p className="label">Our time</p>
              <p className="t-h3 num mt-2">
                <StudioClock />
              </p>
              <p className="label mt-1">{site.timezone}</p>
            </div>
          </div>
        </div>
      </section>

      {/* direct channels */}
      <section className="section-sm" aria-label="Direct contact details">
        <div className="shell">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { k: "Email", v: site.email, href: `mailto:${site.email}` },
              { k: "Phone", v: site.phone, href: `tel:${site.phone.replace(/[^\d+]/g, "")}` },
              { k: "Studio", v: site.addressA.slice(1).join(", "), href: null },
            ].map((c, i) => (
              <Reveal key={c.k} delay={i * 80} className="rule-t pt-5">
                <p className="label">{c.k}</p>
                {c.href ? (
                  <a href={c.href} className="t-h4 ulink mt-2 inline-block">
                    {c.v}
                  </a>
                ) : (
                  <p className="t-h4 mt-2">{c.v}</p>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactForm />

      {/* social + booking band */}
      <section className="section-sm" aria-label="Other ways to reach us">
        <div className="shell">
          <div className="rule-t flex flex-wrap items-center justify-between gap-6 pt-8">
            <div className="flex flex-wrap items-center gap-5">
              <span className="label">Follow us</span>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="t-mono ulink"
                >
                  {s.label}
                </a>
              ))}
            </div>
            <Link href="/work" className="btn btn-outline">
              <span>See the work first</span>
              <Arrow />
            </Link>
          </div>
        </div>
      </section>

      <CtaBlock />
    </PageIntro>
  );
}
