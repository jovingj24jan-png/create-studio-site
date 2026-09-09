/**
 * Targeted probe: measures named elements by their text content.
 *   node scripts/probe.mjs <url> <width>
 */
import puppeteer from "puppeteer-core";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const url = process.argv[2];
const width = Number(process.argv[3] || 1440);

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width, height: 900 });
await page.goto(url, { waitUntil: "networkidle2", timeout: 90000 });
await new Promise((r) => setTimeout(r, 2500));
await page.evaluate(async () => {
  const step = window.innerHeight * 0.9;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 80));
  }
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 300));
});

const out = await page.evaluate(() => {
  const px = (v) => Math.round(parseFloat(v) * 100) / 100;
  const res = {};

  // 1. real H1 / biggest heading in the first screen
  const h1 = document.querySelector("h1");
  if (h1) {
    const s = getComputedStyle(h1);
    const r = h1.getBoundingClientRect();
    res.h1 = {
      text: h1.textContent.trim().slice(0, 70),
      size: px(s.fontSize),
      weight: s.fontWeight,
      ls: s.letterSpacing,
      lh: s.lineHeight,
      w: Math.round(r.width),
      family: s.fontFamily.split(",")[0],
    };
  }

  // 2. hairline dividers: thin full-width elements drawn as backgrounds
  const rules = {};
  document.querySelectorAll("body *").forEach((el) => {
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    if (r.height > 0 && r.height <= 2.5 && r.width > 200) {
      const bg = s.backgroundColor;
      const key = `h=${Math.round(r.height * 10) / 10} bg=${bg}`;
      rules[key] = (rules[key] || 0) + 1;
    }
  });
  res.hairlines = Object.entries(rules).sort((a, b) => b[1] - a[1]).slice(0, 8);

  // 3. nav bar
  const nav = document.querySelector("nav") || document.querySelector("header");
  if (nav) {
    const r = nav.getBoundingClientRect();
    const s = getComputedStyle(nav);
    res.nav = { h: Math.round(r.height), top: Math.round(r.top), pos: s.position, bg: s.backgroundColor };
  }
  // nav links
  const navLink = [...document.querySelectorAll("a")].find((a) =>
    /^work$/i.test(a.textContent.trim())
  );
  if (navLink) {
    const s = getComputedStyle(navLink);
    res.navLink = {
      size: px(s.fontSize),
      weight: s.fontWeight,
      ls: s.letterSpacing,
      family: s.fontFamily.split(",")[0].replace(/"/g, ""),
      tt: s.textTransform,
      color: s.color,
    };
  }

  // 4. pill buttons
  const btns = [];
  document.querySelectorAll("a,button,div").forEach((el) => {
    const s = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const br = parseFloat(s.borderRadius);
    if (br > 20 && r.height > 30 && r.height < 90 && r.width > 60 && r.width < 420) {
      const t = el.textContent.trim().replace(/\s+/g, " ").slice(0, 26);
      if (!t) return;
      btns.push({
        t,
        h: Math.round(r.height),
        w: Math.round(r.width),
        radius: s.borderRadius,
        bg: s.backgroundColor,
        color: s.color,
        px: px(s.paddingLeft),
        fs: px(s.fontSize),
        fw: s.fontWeight,
        ff: s.fontFamily.split(",")[0].replace(/"/g, ""),
        ls: s.letterSpacing,
        tt: s.textTransform,
        border: s.borderWidth + " " + s.borderColor,
      });
    }
  });
  const seen = new Set();
  res.buttons = btns.filter((b) => (seen.has(b.t) ? false : seen.add(b.t))).slice(0, 10);

  // 5. small mono labels
  const mono = [...document.querySelectorAll("*")]
    .filter((el) => {
      const s = getComputedStyle(el);
      return /Fragment/.test(s.fontFamily) && el.children.length === 0 && el.textContent.trim();
    })
    .slice(0, 8)
    .map((el) => {
      const s = getComputedStyle(el);
      return {
        t: el.textContent.trim().slice(0, 26),
        size: px(s.fontSize),
        weight: s.fontWeight,
        ls: s.letterSpacing,
        lh: s.lineHeight,
        tt: s.textTransform,
        color: s.color,
      };
    });
  res.mono = mono;

  // 6. body + html background
  res.bodyBg = getComputedStyle(document.body).backgroundColor;
  res.htmlBg = getComputedStyle(document.documentElement).backgroundColor;

  // 7. vertical rhythm: top offsets of large blocks
  const blocks = [];
  document.querySelectorAll("body > div *, main *").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width >= window.innerWidth * 0.95 && r.height > 400) {
      const s = getComputedStyle(el);
      blocks.push({
        cls: String(el.className).slice(0, 34),
        top: Math.round(r.top + window.scrollY),
        h: Math.round(r.height),
        pt: px(s.paddingTop),
        pb: px(s.paddingBottom),
        bg: s.backgroundColor,
      });
    }
  });
  const uniq = [];
  blocks.sort((a, b) => a.top - b.top).forEach((b) => {
    if (!uniq.length || Math.abs(uniq[uniq.length - 1].top - b.top) > 60) uniq.push(b);
  });
  res.blocks = uniq.slice(0, 30);

  // 8. sticky elements
  res.sticky = [...document.querySelectorAll("body *")]
    .filter((el) => ["sticky", "-webkit-sticky"].includes(getComputedStyle(el).position))
    .slice(0, 10)
    .map((el) => ({
      cls: String(el.className).slice(0, 30),
      top: getComputedStyle(el).top,
      h: Math.round(el.getBoundingClientRect().height),
      txt: el.textContent.trim().slice(0, 30),
    }));

  return res;
});

await browser.close();
console.log(JSON.stringify(out, null, 1));
