"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { projects, workCategories } from "@/data/site";
import Reveal, { RevealWords, useInView } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Bits";

/**
 * Split project card: a white text panel on the left (client mark, accent rule,
 * title, brief) beside a half-width image, matching the reference's index.
 */
function ProjectCard({ p, index }: { p: (typeof projects)[number]; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.12);

  return (
    <article
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(30px)",
        transition: `opacity .9s ${index * 70}ms cubic-bezier(.22,1,.36,1), transform .9s ${index * 70}ms cubic-bezier(.22,1,.36,1)`,
      }}
    >
      <Link
        href="/work"
        className="group grid overflow-hidden md:grid-cols-2"
        style={{ borderRadius: 16, background: "var(--white)", border: "1px solid var(--line)" }}
        aria-label={`${p.title} — ${p.subtitle}`}
      >
        {/* text panel */}
        <div className="flex flex-col justify-between p-7 md:p-12">
          <div>
            <Image
              src={`/img/client-${p.client.toLowerCase()}.svg`}
              alt={p.client}
              width={200}
              height={44}
              className="h-7 w-auto"
              style={{ color: "var(--ink)" }}
            />
            <span aria-hidden className="mt-5 block h-[2px] w-16" style={{ background: "var(--accent)" }} />
            <span aria-hidden className="block h-px w-full" style={{ background: "var(--line)" }} />

            <h2 className="t-h3 mt-8 transition-colors duration-300 group-hover:text-[var(--accent)]">
              {p.title}
            </h2>
            <p className="t-mono-sm mt-3" style={{ color: "var(--muted)" }}>
              {p.subtitle}
            </p>
            <p className="t-body mt-6 max-w-[36ch]" style={{ color: "var(--deep)" }}>
              {p.brief}
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <span className="t-mono-sm num" style={{ color: "var(--muted)" }}>
              {p.date}
            </span>
            <span className="btn btn-outline btn-sm">
              <span>View case</span>
              <ArrowRight size={15} />
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {p.categories.map((c) => (
              <span
                key={c}
                className="t-mono-sm rounded-full border px-3 py-1"
                style={{ borderColor: "var(--line)", color: "var(--muted)" }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* image half */}
        <div className={`img-mask relative min-h-[280px] md:min-h-[520px] ${inView ? "img-in" : ""}`}>
          <Image
            src={p.image}
            alt=""
            fill
            sizes="(max-width: 809px) 100vw, 46vw"
            className="img-zoom object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.05]"
          />
          <span
            className="t-mono-sm absolute right-6 top-6"
            style={{ color: "rgba(255,255,255,.9)" }}
          >
            YR/ <span className="num">{p.year}</span>
          </span>
        </div>
      </Link>
    </article>
  );
}

export default function WorkIndex() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("Category");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const okCat = cat === "Category" || p.categories.includes(cat);
      const okQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q);
      return okCat && okQ;
    });
  }, [query, cat]);

  return (
    <>
      {/* oversized page title */}
      <section className="pt-[calc(var(--nav-h)+40px)]" aria-labelledby="work-title">
        <div className="shell">
          <RevealWords
            as="h1"
            id="work-title"
            text="selected work"
            className="t-pagetitle"
            stagger={70}
          />
        </div>
      </section>

      {/* intro + controls */}
      <section className="pt-10" aria-label="Filter projects">
        <div className="shell">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-6">
              <Reveal>
                <p className="t-h4 max-w-[26ch]">
                  Alongside the result, you can see the process that produced it.
                </p>
                <p className="t-body mt-5 max-w-[46ch]" style={{ color: "var(--muted)" }}>
                  Every project started as a problem worth solving and ended with something
                  measurable. Here is how the complicated ones turned into clear solutions.
                </p>
              </Reveal>
            </div>

            <Reveal className="md:col-span-5 md:col-start-8 md:self-end">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex items-center gap-3" style={{ borderBottom: "1px solid var(--rule)" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden style={{ color: "var(--accent)" }}>
                    <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M11 11l4 4" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                  <label htmlFor="work-q" className="sr-only">
                    Search projects
                  </label>
                  <input
                    id="work-q"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Project name"
                    className="t-body w-full bg-transparent py-3 outline-none"
                  />
                </div>

                <div className="relative" style={{ borderBottom: "1px solid var(--rule)" }}>
                  <label htmlFor="work-cat" className="sr-only">
                    Filter by category
                  </label>
                  <select
                    id="work-cat"
                    value={cat}
                    onChange={(e) => setCat(e.target.value)}
                    className="t-body w-full appearance-none bg-transparent py-3 pr-8 outline-none"
                  >
                    {workCategories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden
                    className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2"
                    style={{ color: "var(--accent)" }}
                  >
                    <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </div>
              </div>
            </Reveal>
          </div>

          <div aria-hidden className="ticks mt-14" style={{ height: 92 }} />
        </div>
      </section>

      {/* cards */}
      <section className="section-sm" aria-label="Projects">
        <div className="shell">
          {list.length === 0 ? (
            <p className="t-lead py-20 text-center" style={{ color: "var(--muted)" }}>
              No projects match that search yet.
            </p>
          ) : (
            <div className="space-y-6">
              {list.map((p, i) => (
                <ProjectCard key={p.slug} p={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
