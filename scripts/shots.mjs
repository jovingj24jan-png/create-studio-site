/** Capture viewport screenshots down each route for visual review. */
import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = "http://localhost:3000";
const DIR = "qa-shots";
mkdirSync(DIR, { recursive: true });

const route = process.argv[2] || "/";
const width = Number(process.argv[3] || 1440);
const height = Number(process.argv[4] || 900);
const count = Number(process.argv[5] || 8);
const tag = process.argv[6] || route.replace(/\//g, "_") || "home";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width, height, deviceScaleFactor: 1 });
await page.goto(BASE + route, { waitUntil: "domcontentloaded" });
await new Promise((r) => setTimeout(r, 1600));

const total = await page.evaluate(() => document.body.scrollHeight);
const step = Math.max(1, Math.floor((total - height) / Math.max(1, count - 1)));

for (let i = 0; i < count; i++) {
  const y = i * step;
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await new Promise((r) => setTimeout(r, 900));
  await page.screenshot({ path: `${DIR}/${tag}-${width}-${String(i).padStart(2, "0")}.png` });
}

await browser.close();
console.log(`captured ${count} frames of ${route} @${width} (page height ${total})`);
