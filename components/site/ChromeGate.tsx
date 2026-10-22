"use client";

import { usePathname } from "next/navigation";

/** Routes that bring their own chrome and must not get the site header/footer. */
const STANDALONE = ["/v2"];

export default function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (STANDALONE.some((p) => pathname === p || pathname?.startsWith(`${p}/`))) return null;
  return <>{children}</>;
}
