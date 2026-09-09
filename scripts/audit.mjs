/**
 * Side-by-side computed-style audit: reference vs local.
 *   node scripts/audit.mjs <url> <width> [out.json]
 * Prints typography, layout, colour and image metrics measured in a real browser.
 */
import puppeteer from "puppeteer-core";
import { writeFileSync } from "node:fs";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const url = process.argv[2];
const width = Number(process.argv[3] || 1440);
const outFile = process.argv[4];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width, height: 900 });
await page.goto(url, { waitUntil: "networkidle2", timeout: 90000 });
await new Promise((r) => setTimeout(r, 2500));

// scroll everything so lazy content mounts
await page.evaluate(async () => {
  const step = window.innerHeight * 0.9;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 90));
  }
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 400));
});

const data = await page.evaluate(() => {
  const px = (v) => Math.round(parseFloat(v) * 100) / 100;
  const cs = (el) => getComputedStyle(el);

  const describe = (el) => {
    const s = cs(el);
    const r = el.getBoundingClientRect();
    return {
      tag: el.tagName.toLowerCase(),
      text: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 60),
      font: s.fontFamily.split(",")[0].replace(/["']/g, ""),
      size: px(s.fontSize),
      weight: s.fontWeight,
      ls: s.letterSpacing,
      lh: s.lineHeight === "normal" ? "normal" : px(s.lineHeight),
      transform: s.textTransform,
      color: s.color,
      w: Math.round(r.width),
    };
  };

  // --- typography samples -------------------------------------------------
  const heads = [];
  document.querySelectorAll("h1,h2,h3,h4,p,a,button,li,span").forEach((el) => {
    const t = (el.textContent || "").trim();
    if (!t || t.length < 2) return;
    const r = el.getBoundingClientRect();
    if (r.width < 8 || r.height < 6) return;
    // leaf-ish nodes only
    if (el.querySelector("h1,h2,h3,h4,p,a,button,li")) return;
    heads.push(describe(el));
  });

  // group by size to find the type scale actually in use
  const scale = {};
  heads.forEach((h) => {
    const k = `${h.size}|${h.weight}|${h.ls}|${h.lh}|${h.font}|${h.transform}`;
    scale[k] = scale[k] || { ...h, count: 0, samples: [] };
    scale[k].count++;
    if (scale[k].samples.length < 2) scale[k].samples.push(h.text);
  });
  const typeScale = Object.values(scale)
    .sort((a, b) => b.size - a.size || b.count - a.count)
    .map((x) => ({
      size: x.size,
      weight: x.weight,
      ls: x.ls,
      lh: x.lh,
      font: x.font,
      tt: x.transform,
      n: x.count,
      eg: x.samples[0],
    }));

  // --- fonts loaded -------------------------------------------------------
  const fonts = [...new Set(heads.map((h) => h.font))];

  // --- section rhythm -----------------------------------------------------
  const sections = [];
  document.querySelectorAll("body *").forEach((el) => {
    const r = el.getBoundingClientRect();
    const s = cs(el);
    if (r.width < window.innerWidth * 0.9) return;
    if (r.height < 200) return;
    if (el.children.length === 0) return;
    sections.push({
      tag: el.tagName.toLowerCase(),
      cls: String(el.className).slice(0, 40),
      h: Math.round(r.height),
      pt: px(s.paddingTop),
      pb: px(s.paddingBottom),
      bg: s.backgroundColor,
      top: Math.round(r.top + window.scrollY),
    });
  });

  // --- widest inner container --------------------------------------------
  let container = null;
  document.querySelectorAll("div,section,main,header,footer").forEach((el) => {
    const r = el.getBoundingClientRect();
    const s = cs(el);
    if (s.maxWidth !== "none" && parseFloat(s.maxWidth) > 600) {
      const v = { maxW: s.maxWidth, pl: px(s.paddingLeft), pr: px(s.paddingRight), w: Math.round(r.width) };
      if (!container || parseFloat(v.maxW) > parseFloat(container.maxW)) container = v;
    }
  });

  // --- images -------------------------------------------------------------
  const imgs = [...document.querySelectorAll("img")]
    .map((i) => {
      const r = i.getBoundingClientRect();
      const s = cs(i);
      const par = i.closest("div,figure,a");
      const pr = par ? par.getBoundingClientRect() : r;
      return {
        w: Math.round(r.width),
        h: Math.round(r.height),
        ratio: r.height ? Math.round((r.width / r.height) * 100) / 100 : 0,
        fit: s.objectFit,
        pos: s.objectPosition,
        radius: s.borderRadius,
        boxRatio: pr.height ? Math.round((pr.width / pr.height) * 100) / 100 : 0,
        alt: (i.getAttribute("alt") || "").slice(0, 55),
        src: (i.currentSrc || i.src).split("/").pop().split("?")[0].slice(0, 40),
      };
    })
    .filter((i) => i.w > 40 && i.h > 40);

  // --- colours in use -----------------------------------------------------
  const colors = {};
  document.querySelectorAll("body *").forEach((el) => {
    const s = cs(el);
    const r = el.getBoundingClientRect();
    if (r.width * r.height < 5000) return;
    const bg = s.backgroundColor;
    if (bg && bg !== "rgba(0, 0, 0, 0)") colors[bg] = (colors[bg] || 0) + 1;
  });

  // --- borders ------------------------------------------------------------
  const borders = {};
  document.querySelectorAll("body *").forEach((el) => {
    const s = cs(el);
    ["borderTop", "borderBottom"].forEach((k) => {
      const w = s[k + "Width"];
      if (parseFloat(w) > 0) {
        const key = `${w} ${s[k + "Color"]}`;
        borders[key] = (borders[key] || 0) + 1;
      }
    });
  });

  return {
    url: location.href,
    vw: window.innerWidth,
    pageHeight: document.body.scrollHeight,
    fonts,
    typeScale: typeScale.slice(0, 22),
    container,
    sections: sections.sort((a, b) => a.top - b.top).slice(0, 40),
    images: imgs.slice(0, 40),
    colors: Object.entries(colors).sort((a, b) => b[1] - a[1]).slice(0, 10),
    borders: Object.entries(borders).sort((a, b) => b[1] - a[1]).slice(0, 8),
  };
});

await browser.close();
if (outFile) writeFileSync(outFile, JSON.stringify(data, null, 2));
console.log(JSON.stringify(data, null, 1));
