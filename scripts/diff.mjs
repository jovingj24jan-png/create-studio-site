/**
 * Numeric fidelity diff: measures the same features on reference and local.
 *   node scripts/diff.mjs <refUrl> <locUrl> <width>
 */
import puppeteer from "puppeteer-core";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const [, , REF, LOC, W = "1440"] = process.argv;

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars"],
});

async function measure(url) {
  const page = await browser.newPage();
  await page.setViewport({ width: +W, height: 900 });
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90000 });
  await new Promise((r) => setTimeout(r, 5000));
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.9;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 70));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });

  const out = await page.evaluate(() => {
    const px = (v) => Math.round(parseFloat(v) * 10) / 10;
    const g = (el) => {
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        txt: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 34),
        fs: px(s.fontSize),
        fw: s.fontWeight,
        ls: px(s.letterSpacing) || 0,
        lh: s.lineHeight === "normal" ? "n" : px(s.lineHeight),
        col: s.color,
        ff: s.fontFamily.split(",")[0].replace(/["']/g, ""),
        w: Math.round(r.width),
        h: Math.round(r.height),
        x: Math.round(r.left),
        y: Math.round(r.top + window.scrollY),
      };
    };

    // full-bleed bands: top offset, height, background
    const bands = [];
    document.querySelectorAll("body *").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width < window.innerWidth * 0.97 || r.height < 300) return;
      if (!el.children.length) return;
      const s = getComputedStyle(el);
      bands.push({
        y: Math.round(r.top + window.scrollY),
        h: Math.round(r.height),
        bg: s.backgroundColor,
        tag: el.tagName.toLowerCase(),
      });
    });
    const uniq = [];
    bands.sort((a, b) => a.y - b.y).forEach((b) => {
      if (!uniq.length || b.y - uniq[uniq.length - 1].y > 120) uniq.push(b);
    });

    // biggest text nodes = the editorial anchors
    const big = [];
    document.querySelectorAll("h1,h2,h3,h4,p,span,a,li,button").forEach((el) => {
      if (el.querySelector("h1,h2,h3,h4,p,a,li,button")) return;
      const t = (el.textContent || "").trim();
      if (t.length < 2) return;
      const r = el.getBoundingClientRect();
      if (r.width < 10 || r.height < 8) return;
      const fs = parseFloat(getComputedStyle(el).fontSize);
      if (fs < 26) return;
      big.push(g(el));
    });
    big.sort((a, b) => a.y - b.y);
    const seen = new Set();
    const bigU = big.filter((b) => {
      const k = `${b.fs}|${b.txt}`;
      return seen.has(k) ? false : seen.add(k);
    });

    // pill buttons
    const btns = [];
    document.querySelectorAll("a,button").forEach((el) => {
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      if (parseFloat(s.borderRadius) < 20 || r.height < 32 || r.height > 90) return;
      const t = (el.textContent || "").trim().slice(0, 20);
      if (!t) return;
      btns.push({ t, h: Math.round(r.height), w: Math.round(r.width), bg: s.backgroundColor, col: s.color, fs: px(s.fontSize), pad: px(s.paddingLeft) });
    });
    const bs = new Set();
    const btnU = btns.filter((b) => (bs.has(b.t) ? false : bs.add(b.t)));

    // images: box ratios
    const imgs = [...document.querySelectorAll("img")]
      .map((i) => {
        const r = i.getBoundingClientRect();
        return { w: Math.round(r.width), h: Math.round(r.height), ar: r.height ? +(r.width / r.height).toFixed(2) : 0, y: Math.round(r.top + window.scrollY) };
      })
      .filter((i) => i.w > 60 && i.h > 60)
      .sort((a, b) => a.y - b.y);

    return {
      pageH: document.body.scrollHeight,
      bodyBg: getComputedStyle(document.body).backgroundColor,
      bands: uniq.slice(0, 22),
      big: bigU.slice(0, 26),
      btns: btnU.slice(0, 10),
      imgs: imgs.slice(0, 22),
      navH: (() => {
        const h = document.querySelector("header") || document.querySelector("nav");
        return h ? Math.round(h.getBoundingClientRect().height) : 0;
      })(),
    };
  });
  await page.close();
  return out;
}

const a = await measure(REF);
const b = await measure(LOC);
await browser.close();

const P = (o) => JSON.stringify(o);
console.log(`PAGE  ref=${a.pageH}  loc=${b.pageH}   bodyBg ref=${a.bodyBg} loc=${b.bodyBg}  navH ref=${a.navH} loc=${b.navH}`);
console.log("\n--- BANDS (y / height / bg) ---");
const n = Math.max(a.bands.length, b.bands.length);
for (let i = 0; i < n; i++) {
  const x = a.bands[i], y = b.bands[i];
  console.log(
    `${String(i).padStart(2)} REF ${x ? `y=${String(x.y).padStart(6)} h=${String(x.h).padStart(5)} ${x.bg}` : "-".padEnd(34)}  |  LOC ${y ? `y=${String(y.y).padStart(6)} h=${String(y.h).padStart(5)} ${y.bg}` : "-"}`
  );
}
console.log("\n--- BIG TYPE (ref) ---");
a.big.forEach((t) => console.log(`  ${String(t.fs).padStart(6)} ${String(t.fw).padStart(4)} ls=${String(t.ls).padStart(6)} lh=${String(t.lh).padStart(5)} x=${String(t.x).padStart(4)} ${t.col.padEnd(20)} ${JSON.stringify(t.txt)}`));
console.log("\n--- BIG TYPE (loc) ---");
b.big.forEach((t) => console.log(`  ${String(t.fs).padStart(6)} ${String(t.fw).padStart(4)} ls=${String(t.ls).padStart(6)} lh=${String(t.lh).padStart(5)} x=${String(t.x).padStart(4)} ${t.col.padEnd(20)} ${JSON.stringify(t.txt)}`));
console.log("\n--- BUTTONS ref ---"); a.btns.forEach((x) => console.log("  " + P(x)));
console.log("--- BUTTONS loc ---"); b.btns.forEach((x) => console.log("  " + P(x)));
console.log("\n--- IMG ratios ref ---", a.imgs.map((i) => `${i.w}x${i.h}(${i.ar})`).join(" "));
console.log("--- IMG ratios loc ---", b.imgs.map((i) => `${i.w}x${i.h}(${i.ar})`).join(" "));
