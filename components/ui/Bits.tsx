"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";

/**
 * Studio wordmark — an original lowercase logotype drawn as text with a
 * registered mark, sized to sit on the fixed nav bar.
 */
export function Logo({ color = "var(--accent)", className = "" }: { color?: string; className?: string }) {
  return (
    <span
      className={`inline-flex items-start ${className}`}
      style={{
        color,
        fontWeight: 800,
        fontSize: "calc(var(--mono) * 1.75)",
        letterSpacing: "-0.055em",
        lineHeight: 1,
      }}
    >
      create
      <sup style={{ fontSize: "0.36em", fontWeight: 600, marginTop: "0.25em" }}>®</sup>
    </span>
  );
}

/** Small mono section index, e.g. "// 00.01°" */
export function Marker({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`label ${className}`}>{children}</span>;
}

/** Uppercase eyebrow with a leading accent dot. */
export function Eyebrow({ children, invert = false }: { children: ReactNode; invert?: boolean }) {
  return (
    <span
      className="t-mono-sm inline-flex items-center gap-2"
      style={{ color: invert ? "rgba(255,255,255,0.65)" : "var(--muted)" }}
    >
      <span aria-hidden className="inline-block h-[5px] w-[5px] rounded-full" style={{ background: "var(--accent)" }} />
      {children}
    </span>
  );
}

/** Straight arrow used inside pill buttons (matches the reference's glyph). */
export function ArrowRight({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden className={className}>
      <path d="M3 10h13M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

/** Diagonal arrow used on cards and inline links. */
export function Arrow({ size = 12, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden className={className}>
      <path d="M2 10L10 2M10 2H3.5M10 2V8.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function Plus({
  className = "",
  size = 11,
  style,
}: {
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 11 11" fill="none" aria-hidden className={className} style={style}>
      <path d="M5.5 0V11M0 5.5H11" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

/** Live studio clock, fixed to the Los Angeles timezone like the reference. */
export function StudioClock({ withSeconds = false, className = "" }: { withSeconds?: boolean; className?: string }) {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      ...(withSeconds ? { second: "2-digit" } : {}),
      hour12: true,
      timeZone: "America/Los_Angeles",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, withSeconds ? 1000 : 15000);
    return () => clearInterval(id);
  }, [withSeconds]);
  return (
    <span className={`num ${className}`} suppressHydrationWarning>
      {time}
    </span>
  );
}

type Variant = "accent" | "light" | "dark" | "outline" | "outline-light";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  className?: string;
  arrow?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
};

export function Button({
  children,
  href,
  variant = "accent",
  size = "md",
  className = "",
  arrow = true,
  onClick,
  type = "button",
  disabled,
  ariaLabel,
}: ButtonProps) {
  const cls = `btn btn-${variant} ${size === "lg" ? "btn-lg" : size === "sm" ? "btn-sm" : ""} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <ArrowRight />}
    </>
  );
  if (href) {
    const external = /^(https?:|mailto:|tel:)/.test(href);
    if (external) {
      return (
        <a className={cls} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer noopener" aria-label={ariaLabel}>
          {inner}
        </a>
      );
    }
    return (
      <Link className={cls} href={href} aria-label={ariaLabel}>
        {inner}
      </Link>
    );
  }
  return (
    <button className={cls} onClick={onClick} type={type} disabled={disabled} aria-label={ariaLabel}>
      {inner}
    </button>
  );
}

/** Nav-style link whose label rolls up into the accent colour on hover. */
export function RollLink({
  href,
  label,
  count,
  className = "",
  onClick,
}: {
  href: string;
  label: string;
  count?: number;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link href={href} className={`t-mono inline-flex items-start ${className}`} onClick={onClick}>
      <span className="roll">
        <span>{label}</span>
        <span aria-hidden>{label}</span>
      </span>
      {count != null && (
        <sup
          className="num ml-[2px] inline-flex h-[15px] min-w-[15px] items-center justify-center rounded-[3px] px-[3px] text-[10px] leading-none"
          style={{ background: "rgba(255,255,255,.16)", color: "#fff", letterSpacing: 0 }}
        >
          {count}
        </sup>
      )}
    </Link>
  );
}
