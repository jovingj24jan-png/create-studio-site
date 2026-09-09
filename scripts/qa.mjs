/**
 * Responsive QA sweep. Drives the locally installed Chrome against the running
 * dev/prod server and reports horizontal overflow, console errors, broken
 * images and failed requests at every target breakpoint.
 *
 *   node scripts/qa.mjs [--shots]
 */
import puppeteer from "puppeteer-core";
import { mkdirSync, appendFileSync, writeFileSync } from "node:fs";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = process.env.BASE || "http://localhost:3000";
const SHOTS = process.argv.includes("--shots");
const SHOT_DIR = "qa-shots";

const routes = ["/", "/work", "/studio", "/contact", "/whispers"];
const widths = [1440, 1280, 1024, 768, 430, 390, 375, 360];

if (SHOTS) mkdirSync(SHOT_DIR, { recursive: true });

const LOG = "qa-report.txt";
writeFileSync(LOG, "");
const say = (line) => { console.log(line); appendFileSync(LOG, line + "\n"); };

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--hide-scrollbars"],
});

let failures = 0;

for (const route of routes) {
  for (const width of widths) {
    const page = await browser.newPage();
    const errors = [];
    const netFails = [];

    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text().slice(0, 160));
    });
    page.on("pageerror", (e) => errors.push(`PAGEERROR ${String(e).slice(0, 160)}`));
    page.on("requestfailed", (r) => netFails.push(`${r.url().slice(-60)} ${r.failure()?.errorText}`));
    page.on("response", (r) => {
      if (r.status() >= 400) netFails.push(`${r.status()} ${r.url().slice(-60)}`);
    });

    await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
    await page.goto(BASE + route, { waitUntil: "domcontentloaded", timeout: 60000 });
    await new Promise((r) => setTimeout(r, 350));

    // scroll the whole page so IntersectionObserver reveals fire and lazy images load
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 30));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 150));
    });

    const report = await page.evaluate(() => {
      const de = document.documentElement;
      const overflow = de.scrollWidth - de.clientWidth;

      // find the widest offenders when the page overflows
      const offenders = [];
      if (overflow > 1) {
        const vw = de.clientWidth;
        document.querySelectorAll("*").forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.width === 0) return;
          if (r.right > vw + 2 || r.left < -2) {
            const cs = getComputedStyle(el);
            // ignore intentionally clipped marquee tracks
            let p = el.parentElement;
            let clipped = false;
            while (p && p !== document.body && p !== document.documentElement) {
              const pcs = getComputedStyle(p);
              if (pcs.overflowX === "hidden" || pcs.overflow === "hidden") { clipped = true; break; }
              p = p.parentElement;
            }
            if (clipped) return;
            offenders.push(
              `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 45)} right=${Math.round(r.right)} pos=${cs.position}`
            );
          }
        });
      }

      const brokenImgs = [...document.querySelectorAll("img")]
        .filter((i) => i.complete && i.naturalWidth === 0)
        .map((i) => i.getAttribute("src"));

      const noAlt = [...document.querySelectorAll("img")].filter((i) => !i.hasAttribute("alt")).length;

      const links = [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href"));
      const emptyLinks = links.filter((h) => !h || h === "#").length;

      return {
        overflow,
        offenders: offenders.slice(0, 6),
        brokenImgs: brokenImgs.slice(0, 6),
        noAlt,
        emptyLinks,
        height: document.body.scrollHeight,
        sections: document.querySelectorAll("section").length,
      };
    });

    const bad =
      report.overflow > 1 ||
      errors.length ||
      report.brokenImgs.length ||
      netFails.length ||
      report.emptyLinks;
    if (bad) failures++;

    say(
      `${bad ? "FAIL" : "ok  "} ${route.padEnd(10)} ${String(width).padStart(4)}  ` +
        `ovf=${report.overflow} sect=${report.sections} h=${report.height}` +
        (report.offenders.length ? `\n      offenders: ${report.offenders.join(" | ")}` : "") +
        (report.brokenImgs.length ? `\n      brokenImgs: ${report.brokenImgs.join(", ")}` : "") +
        (report.emptyLinks ? `\n      emptyLinks: ${report.emptyLinks}` : "") +
        (errors.length ? `\n      console: ${errors.slice(0, 3).join(" | ")}` : "") +
        (netFails.length ? `\n      net: ${netFails.slice(0, 3).join(" | ")}` : "")
    );

    if (SHOTS && (width === 1440 || width === 390)) {
      const name = `${route.replace(/\//g, "_") || "_home"}-${width}.png`;
      await page.screenshot({ path: `${SHOT_DIR}/${name}`, fullPage: false });
    }

    await page.close();
  }
}

await browser.close();
console.log(failures ? `\n${failures} failing combinations` : "\nall combinations clean");
process.exit(failures ? 1 : 0);
