/**
 * Wires a folder of YOUR images into index.html.
 *
 *   node scripts/use-photos.mjs <folder>
 *
 * Put files in <folder> named after the slot (any image extension):
 *   hero, statement, showreel, cta, footer-chip, studio-b, studio-c,
 *   project-solvanne, project-harrowgate, project-verge,
 *   project-harrowgate-wide,
 *   service-identity, service-strategy, service-design,
 *   service-ai, service-seo, service-development,
 *   whisper-1 … whisper-5,
 *   person-ivar-solheim, person-priya-raghavan, person-camille-okonkwo,
 *   person-dan-whitfield, person-nora-pemberton, person-esme-duarte,
 *   client-sundermark … client-ostara
 *
 * Anything you don't supply keeps its current asset, so you can migrate
 * a few slots at a time. Crops/ratios are already set in the CSS.
 */
import { readdirSync, readFileSync, writeFileSync, copyFileSync, mkdirSync } from "node:fs";
import { basename, extname, join } from "node:path";

const src = process.argv[2];
if (!src) { console.error("usage: node scripts/use-photos.mjs <folder>"); process.exit(1); }

const OUT = "public/img";
mkdirSync(OUT, { recursive: true });

let html = readFileSync("index.html", "utf8");
const files = readdirSync(src).filter(f => /\.(jpe?g|png|webp|avif|gif|svg)$/i.test(f));
if (!files.length) { console.error("no images found in " + src); process.exit(1); }

let swapped = 0;
const report = [];

for (const f of files) {
  const slot = basename(f, extname(f)).toLowerCase();
  const ext = extname(f).toLowerCase();
  const dest = `${slot}${ext}`;
  const oldRefs = new RegExp(`public/img/${slot}\.(svg|jpe?g|png|webp|avif)`, "g");
  if (!oldRefs.test(html)) { report.push(`  skip  ${f}  (no slot named "${slot}")`); continue; }
  copyFileSync(join(src, f), join(OUT, dest));
  html = html.replace(new RegExp(`public/img/${slot}\.(svg|jpe?g|png|webp|avif)`, "g"), `public/img/${dest}`);
  swapped++;
  report.push(`  use   ${f}  ->  ${slot}`);
}

// dynamic families are built in JS from a slug + fixed extension; keep those in step
writeFileSync("index.html", html);
console.log(report.join("\n"));
console.log(`\n${swapped} slot(s) wired. Open index.html to check.`);
