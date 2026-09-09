"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

export function useInView<T extends HTMLElement>(threshold = 0.15, once = true) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            if (once) io.unobserve(e.target);
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once]);

  return { ref, inView };
}

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  threshold?: number;
  style?: React.CSSProperties;
};

/** Fade + rise on scroll into view. */
export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  threshold = 0.12,
  style,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>(threshold);
  return (
    <Tag
      ref={ref as never}
      className={`rv ${inView ? "rv-in" : ""} ${className}`}
      style={{ ...style, transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/** Line-by-line mask reveal for editorial headings. */
export function RevealLines({
  lines,
  className = "",
  lineClassName = "",
  stagger = 90,
  as: Tag = "h2",
  id,
}: {
  lines: (string | ReactNode)[];
  className?: string;
  lineClassName?: string;
  stagger?: number;
  as?: ElementType;
  id?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  return (
    <Tag ref={ref as never} className={className} id={id}>
      {lines.map((l, i) => (
        <span
          key={i}
          className={`line-mask ${inView ? "line-in" : ""} ${lineClassName}`}
        >
          <span style={{ transitionDelay: `${i * stagger}ms` }}>{l}</span>
        </span>
      ))}
    </Tag>
  );
}

/** Word-by-word mask reveal — wraps naturally, unlike a single line. */
export function RevealWords({
  text,
  className = "",
  stagger = 34,
  as: Tag = "h2",
  id,
}: {
  text: string;
  className?: string;
  stagger?: number;
  as?: ElementType;
  id?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  const words = text.split(" ");
  return (
    <Tag ref={ref as never} className={className} id={id}>
      {words.map((w, i) => (
        <span
          key={i}
          className={`line-mask ${inView ? "line-in" : ""}`}
          style={{ display: "inline-block", verticalAlign: "top" }}
        >
          <span style={{ transitionDelay: `${i * stagger}ms` }}>
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/** Scale-down image reveal. */
export function RevealImage({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);
  return (
    <div ref={ref} className={`img-mask ${inView ? "img-in" : ""} ${className}`}>
      {children}
    </div>
  );
}
