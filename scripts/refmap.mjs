import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const DIR = "Create® — Design Studio_files";
const html = readFileSync("Create® — Design Studio.html", "utf8");

/* natural dimensions straight from file headers (no decode needed) */
function dims(p) {
  const b = readFileSync(p);
  if (b.slice(1, 4).toString() === "PNG") return [b.readUInt32BE(16), b.readUInt32BE(20)];
  if (b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i < b.length) {
      if (b[i] !== 0xff) { i++; continue; }
      const m = b[i + 1];
      if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m))
        return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)];
      i += 2 + b.readUInt16BE(i + 2);
    }
  }
  return [0, 0];
}

const files = new Set(readdirSync(DIR));
const seen = new Map();
for (const m of html.matchAll(/<img[^>]*>/g)) {
  const tag = m[0];
  const src = /src="([^"]+)"/.exec(tag);
  if (!src) continue;
  const f = decodeURIComponent(src[1].split("/").pop().split("?")[0])
    .replace(/&amp;/g, "&");
  if (!files.has(f) || seen.has(f)) continue;
  const alt = (/alt="([^"]*)"/.exec(tag) || [, ""])[1].replace(/&amp;/g, "&");
  const sizes = (/sizes="([^"]*)"/.exec(tag) || [, ""])[1];
  seen.set(f, { alt, sizes, pos: m.index });
}

const rows = [];
for (const [f, v] of seen) {
  if (/\.svg$/i.test(f)) { rows.push({ f, ...v, w: 0, h: 0, kind: "svg" }); continue; }
  const p = join(DIR, f);
  const [w, h] = dims(p);
  rows.push({ f, ...v, w, h, ar: h ? +(w / h).toFixed(2) : 0, kb: Math.round(statSync(p).size / 1024), kind: "photo" });
}
rows.sort((a, b) => a.pos - b.pos);

console.log("=== REFERENCE PHOTO SLOTS (from saved HTML) ===");
rows.filter(r => r.kind === "photo").forEach(r =>
  console.log(`${String(r.w).padStart(4)}x${String(r.h).padStart(4)} ar=${String(r.ar).padStart(5)} ${String(r.kb).padStart(5)}K | ${r.alt.slice(0, 62) || "(no alt)"}`)
);
console.log(`\nphotos: ${rows.filter(r => r.kind === "photo").length}   svg/logo: ${rows.filter(r => r.kind === "svg").length}`);

/* what my page currently uses */
const mine = readFileSync("index.html", "utf8");
const slots = [...new Set([...mine.matchAll(/public\/img\/([a-z0-9-]+)\.svg/g)].map(m => m[1]))];
const dyn = [...new Set([...mine.matchAll(/public\/img\/([a-z-]+)-'\s*\+/g)].map(m => m[1]))];
console.log("\n=== MY index.html SLOTS ===");
console.log("static:", slots.join(", "));
console.log("dynamic families:", dyn.join(", ") || "(built from data arrays: project-, client-, service-, whisper-, person-)");
