import Link from "next/link";
import { Arrow } from "@/components/ui/Bits";

export default function NotFound() {
  return (
    <section className="section flex min-h-[70vh] items-center pt-[calc(var(--nav-h)+40px)]">
      <div className="shell">
        <span className="label">Error / 404</span>
        <h1 className="t-h2 mt-5 max-w-[12ch]">
          This page slipped <span style={{ color: "var(--accent)" }}>off the grid.</span>
        </h1>
        <p className="t-lead mt-6 max-w-[42ch]" style={{ color: "var(--muted)" }}>
          The link is broken or the page has moved. Everything else is still where you left it.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-dark btn-lg">
            <span>Back home</span>
            <Arrow />
          </Link>
          <Link href="/work" className="btn btn-outline btn-lg">
            <span>See the work</span>
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
