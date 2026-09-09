/**
 * Image verification: confirms every <img> on every route actually decodes,
 * and reports its box, aspect ratio, object-fit/position and radius.
 *   node scripts/imgcheck.mjs [baseUrl]
 */
import puppeteer from "puppeteer-core";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = process.argv[2] || "http://localhost:3001";
const routes = ["/", "/work", "/studio", "/contact", "/whispers"];
const widths = [1440, 768, 390];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars"],
});

let broken = 0;
const allSrc = new Set();

for (const w of widths) {
  for (const route of routes) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: 900 });
    await page.goto(BASE + route, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 45));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 400));
      // wait for every <img> to finish loading (lazy ones included)
      await Promise.all(
        [...document.querySelectorAll("img")].map((i) =>
          i.complete
            ? Promise.resolve()
            : new Promise((res) => {
                const done = () => res();
                i.addEventListener("load", done, { once: true });
                i.addEventListener("error", done, { once: true });
                setTimeout(done, 6000);
              })
        )
      );
      await new Promise((r) => setTimeout(r, 250));
    });

    const data = await page.evaluate(() =>
      [...document.querySelectorAll("img")].map((i) => {
        const s = getComputedStyle(i);
        const r = i.getBoundingClientRect();
        return {
          src: (i.currentSrc || i.src).split("/").pop().split("?")[0],
          ok: i.complete ? i.naturalWidth > 0 : true,
          pending: !i.complete,
          nw: i.naturalWidth,
          w: Math.round(r.width),
          h: Math.round(r.height),
          ar: r.height ? +(r.width / r.height).toFixed(2) : 0,
          fit: s.objectFit,
          pos: s.objectPosition,
          rad: s.borderRadius,
          alt: i.getAttribute("alt"),
        };
      })
    );

    const bad = data.filter((d) => !d.ok);
    const zero = data.filter((d) => d.ok && (d.w < 4 || d.h < 4));
    data.forEach((d) => allSrc.add(d.src));
    broken += bad.length;

    console.log(
      `${bad.length ? "FAIL" : "ok  "} ${String(w).padStart(4)} ${route.padEnd(10)} imgs=${String(data.length).padStart(2)} distinct=${new Set(data.map((d) => d.src)).size}` +
        (bad.length ? `\n      BROKEN: ${bad.map((b) => b.src).join(", ")}` : "") +
        (zero.length ? `\n      ZERO-BOX: ${zero.map((b) => b.src).join(", ")}` : "")
    );

    if (w === 1440 && route === "/") {
      console.log("      home slots:");
      data.forEach((d) =>
        console.log(`        ${d.src.padEnd(26)} ${String(d.w).padStart(4)}x${String(d.h).padStart(4)} ar=${String(d.ar).padStart(5)} fit=${d.fit} pos=${d.pos} r=${d.rad}`)
      );
    }
    await page.close();
  }
}

await browser.close();
console.log(`\ndistinct assets rendered: ${allSrc.size}`);
console.log(broken ? `${broken} broken images` : "all images decoded");
process.exit(broken ? 1 : 0);
