"use client";

import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/data/site";
import { useInView } from "@/components/ui/Reveal";

/**
 * Dark rounded editorial card: image fills the card, author and date sit on the
 * top edge, headline overlays beneath them. Used on the home teaser and the
 * whispers index at two sizes.
 */
export default function WhisperCard({
  post,
  size = "sm",
  index = 0,
}: {
  post: Post;
  size?: "lg" | "sm";
  index?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.12);
  const lg = size === "lg";

  return (
    <article
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(28px)",
        transition: `opacity .9s ${index * 80}ms cubic-bezier(.22,1,.36,1), transform .9s ${index * 80}ms cubic-bezier(.22,1,.36,1)`,
      }}
    >
      <Link
        href="/whispers"
        className={`group img-mask relative block w-full overflow-hidden ${inView ? "img-in" : ""}`}
        style={{
          borderRadius: 16,
          background: "var(--ink)",
          aspectRatio: lg ? "16 / 9" : "4 / 3",
        }}
      >
        <Image
          src={post.image}
          alt=""
          fill
          sizes={lg ? "(max-width: 809px) 100vw, 92vw" : "(max-width: 809px) 100vw, 46vw"}
          className="img-zoom object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.05]"
        />
        <span
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(5,6,9,.7) 0%, rgba(5,6,9,.1) 55%, rgba(5,6,9,.5) 100%)" }}
        />

        <div className={`relative flex h-full flex-col ${lg ? "p-6 md:p-8" : "p-5 md:p-6"}`}>
          <div className="flex items-start justify-between gap-4">
            <span className="block" style={{ borderLeft: "1px solid rgba(255,255,255,.5)", paddingLeft: 12 }}>
              <span className="t-small block text-white">{post.author}</span>
              <span className="t-small block" style={{ color: "rgba(255,255,255,.65)" }}>
                {post.authorRole}
              </span>
            </span>
            <span className="t-small num shrink-0" style={{ color: "rgba(255,255,255,.8)" }}>
              {post.date}
            </span>
          </div>

          <h3
            className={`${lg ? "t-h3" : "t-h4"} mt-6 max-w-[18ch] text-white transition-colors duration-300 group-hover:text-[var(--accent)]`}
          >
            {post.title}
          </h3>
        </div>
      </Link>
    </article>
  );
}
