"use client";

import { useEffect, useState } from "react";

/** Live studio clock, fixed to Los Angeles, ticking every second. */
export default function Clock() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "America/Los_Angeles",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="v2-mono v2-meta-sm" style={{ color: "rgba(255,255,255,.75)" }}>
      <p>Our time</p>
      <p suppressHydrationWarning style={{ fontVariantNumeric: "tabular-nums" }}>
        {time}
      </p>
      <p>UTC&minus;8 Los Angeles</p>
    </div>
  );
}
