"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { footerLinks, footerNav, site, socials } from "@/data/site";
import { ArrowRight } from "@/components/ui/Bits";
import Reveal from "@/components/ui/Reveal";

/** Newsletter: underlined field plus a wide accent pill. */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setState("error");
      return;
    }
    // Prototype only — no data leaves the browser.
    setState("done");
  };

  return (
    <div className="grid gap-10 md:grid-cols-12 md:gap-8">
      <div className="md:col-span-5">
        <h2 className="t-h3">Something worth reading.</h2>
        <p className="t-body mt-4 max-w-[34ch]" style={{ color: "var(--deep)" }}>
          Occasional notes on what we are building, reading and shipping.{" "}
          <span style={{ color: "var(--accent)" }}>*</span>
        </p>

        <form onSubmit={submit} noValidate className="mt-8 max-w-[440px]">
          <label htmlFor="nl-email" className="sr-only">
            Email address
          </label>
          <input
            id="nl-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (state !== "idle") setState("idle");
            }}
            className="t-body w-full bg-transparent py-3 outline-none"
            style={{ borderBottom: `1px solid ${state === "error" ? "var(--accent)" : "var(--rule)"}` }}
            aria-invalid={state === "error"}
            aria-describedby="nl-msg"
          />
          <button
            type="submit"
            className="btn btn-accent btn-lg mt-6 w-full"
            style={state === "done" ? { opacity: 0.55 } : undefined}
          >
            <span>{state === "done" ? "You're in" : "Join our newsletter"}</span>
            <ArrowRight />
          </button>
          <p id="nl-msg" className="t-small mt-4" role="status" style={{ color: "var(--deep)" }}>
            {state === "error" ? (
              "Enter a valid email address."
            ) : state === "done" ? (
              "Thanks — prototype only, nothing was sent."
            ) : (
              <>
                By submitting, you agree to our{" "}
                <Link href="/contact" className="ulink" style={{ color: "var(--accent)" }}>
                  Terms &amp; Service.
                </Link>
              </>
            )}
          </p>
          <p className="t-small mt-2" style={{ color: "var(--muted)" }}>
            <span style={{ color: "var(--accent)" }}>*</span> No spam, just occasional updates.
          </p>
        </form>
      </div>

      <div className="md:col-span-3 md:col-start-7">
        <ul className="space-y-3">
          {footerNav.map((l) => (
            <li key={l.label}>
              <Link href={l.href} className="t-mono ulink" style={{ color: "var(--deep)" }}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="md:col-span-3">
        <ul className="space-y-3">
          {footerLinks.map((l) => (
            <li key={l.label}>
              <Link href={l.href} className="t-mono ulink" style={{ color: "var(--deep)" }}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="t-body mt-12" style={{ color: "var(--deep)" }}>
          Follow us on socials
        </p>
        <div className="mt-3 flex flex-wrap gap-5">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              className="t-mono ulink"
              style={{ color: "var(--accent)" }}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer style={{ background: "var(--paper)", color: "var(--ink)" }}>
      <div className="shell py-16 md:py-24">
        <Newsletter />
      </div>

      <div aria-hidden className="ticks" />

      <div style={{ background: "var(--mist)" }}>
        <div className="shell py-16 md:py-20">
          <div className="grid gap-12 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-5">
              <span aria-hidden className="mb-6 block h-px w-full max-w-[560px]" style={{ background: "var(--rule)" }} />
              <p className="t-body max-w-[30ch]" style={{ color: "var(--deep)" }}>
                {site.tagline}
              </p>

              <Reveal className="mt-6">
                <p className="t-wordmark">
                  <span style={{ color: "var(--accent)" }}>Create</span>
                  <span style={{ color: "var(--muted)" }}>\Studio</span>
                </p>
              </Reveal>

              <div className="mt-6 flex items-start gap-4">
                <span className="relative h-10 w-20 shrink-0 overflow-hidden rounded-full">
                  <Image src="/img/footer-chip.svg" alt="" fill sizes="80px" className="object-cover" />
                </span>
                <p className="t-small max-w-[40ch]" style={{ color: "var(--deep)" }}>
                  {site.blurb}
                </p>
              </div>

              <p className="t-small mt-6" style={{ color: "var(--muted)" }}>
                © 2026 Create Studio — All work, all rights.
              </p>

              <span aria-hidden className="mt-8 block h-px w-full max-w-[560px]" style={{ background: "var(--rule)" }} />
              <p className="t-small mt-4" style={{ color: "var(--muted)" }}>
                Front-end prototype · original artwork
              </p>
            </div>

            <div className="md:col-span-3 md:col-start-7">
              <p className="t-mono-sm" style={{ color: "var(--deep)" }}>
                Offline
              </p>
              <span aria-hidden className="my-4 block h-px w-full" style={{ background: "var(--rule)" }} />
              <address className="t-body not-italic" style={{ color: "var(--deep)" }}>
                {site.addressA.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>

              <p className="t-mono-sm mt-14" style={{ color: "var(--deep)" }}>
                Phone
              </p>
              <span aria-hidden className="my-4 block h-px w-full" style={{ background: "var(--rule)" }} />
              <a
                href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
                className="t-h4 num whitespace-nowrap"
                style={{ color: "var(--muted)" }}
              >
                {site.phone}
              </a>
            </div>

            <div className="md:col-span-3">
              <p className="t-mono-sm" style={{ color: "var(--deep)" }}>
                Online
              </p>
              <span aria-hidden className="my-4 block h-px w-full" style={{ background: "var(--rule)" }} />
              <a href={`mailto:${site.email}`} className="t-body ulink" style={{ color: "var(--accent)" }}>
                {site.email}
              </a>

              <p className="t-mono-sm mt-14" style={{ color: "var(--deep)" }}>
                Studio
              </p>
              <span aria-hidden className="my-4 block h-px w-full" style={{ background: "var(--rule)" }} />
              <address className="t-body not-italic" style={{ color: "var(--deep)" }}>
                {site.addressB.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
