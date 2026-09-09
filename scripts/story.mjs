import puppeteer from "puppeteer-core";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
const W = Number(process.argv[2] || 1440);
const b = await puppeteer.launch({ executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe", headless:"new", args:["--no-sandbox","--hide-scrollbars","--allow-file-access-from-files"] });
const p = await b.newPage();
await p.setViewport({ width: W, height: 900 });
await p.goto(pathToFileURL(resolve("index.html")).href, { waitUntil:"load" });
await new Promise(r=>setTimeout(r,800));

const geo = await p.evaluate(() => {
  const s = document.getElementById("story-section");
  const st = s.querySelector(".story-sticky");
  return { top: s.offsetTop, h: s.offsetHeight, vh: innerHeight,
           stickyH: st.getBoundingClientRect().height,
           stickyPos: getComputedStyle(st).position,
           bg: getComputedStyle(s).backgroundColor };
});

async function at(progress) {
  const y = geo.top + (geo.h - geo.vh) * progress;
  await p.evaluate(v => window.scrollTo(0, v), y);
  await new Promise(r=>setTimeout(r,260));
  return p.evaluate(() => [...document.querySelectorAll(".story-line")].map(l => ({
    t: l.textContent.trim().replace(/\s+/g," "),
    o: +getComputedStyle(l).opacity,
    blur: /blur\(([\d.]+)px\)/.exec(l.style.filter)?.[1] ?? "-",
    inView: l.getBoundingClientRect().top < innerHeight && l.getBoundingClientRect().bottom > 0
  })));
}

console.log(`section: top=${geo.top} height=${geo.h} (${(geo.h/geo.vh).toFixed(1)}x viewport)  sticky=${geo.stickyPos} ${Math.round(geo.stickyH)}px  bg=${geo.bg}`);
for (const q of [0, 0.15, 0.35, 0.55, 0.75, 0.95]) {
  const r = await at(q);
  console.log(`p=${q.toFixed(2)}  ` + r.map(x=>`${x.t.padEnd(9)} o=${x.o.toFixed(2)} b=${String(x.blur).padStart(4)}`).join(" | "));
}

// bubbles animating?
const bub = await p.evaluate(() => {
  const els = [...document.querySelectorAll(".story-bubble")];
  return els.map(e => { const c = getComputedStyle(e);
    return { name: c.animationName, dur: c.animationDuration, state: c.animationPlayState, dir: c.animationDirection }; });
});
const uniq = new Set(bub.map(x=>x.name));
console.log(`bubbles: ${bub.length}  distinct anims: ${uniq.size}  all running: ${bub.every(x=>x.state==="running")}  durations: ${[...new Set(bub.map(x=>x.dur))].join(",")}`);

// bubble actually moves over time?
const m1 = await p.evaluate(()=>document.querySelector(".story-bubble-1").getBoundingClientRect().left);
await new Promise(r=>setTimeout(r,1400));
const m2 = await p.evaluate(()=>document.querySelector(".story-bubble-1").getBoundingClientRect().left);
console.log(`bubble-1 moved: ${Math.abs(m2-m1).toFixed(2)}px over 1.4s`);

await b.close();
