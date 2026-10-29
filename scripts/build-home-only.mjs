// Builds the published edition of the site: the homepage, the Work, Studio,
// Whispers and Contact pages the header opens, the three case studies and the
// seven Whisper articles, with only the files they use, read from a git ref
// (never the working tree). Any link to a page outside that set points at the
// matching section of the homepage instead.
//   node scripts/build-home-only.mjs <ref> <outDir>
// The output is published as the `home-only` branch; see docs/home-only.md.
import {execFileSync} from "child_process";
import fs from "fs";
import path from "path";

const [ref = "original-homepage-2026-10-23", out] = process.argv.slice(2);
if (!out) throw Error("usage: build-home-only.mjs <ref> <outDir>");
const git = (...a) => execFileSync("git", a, {maxBuffer: 1 << 30});
const sha = git("rev-parse", "--short", ref + "^{commit}").toString().trim();
const tracked = new Set(git("ls-tree", "-r", "--name-only", ref).toString().split("\n").filter(Boolean));

// Anything that looks like a path to a tracked asset counts as used: src,
// srcset, poster, data-src, CSS url() and the strings the page's own scripts
// build markup from. Text assets are scanned in turn for what they pull in.
const ASSET = /(?:[\w%@.-]+\/)*[\w%@.-]+\.(?:jpe?g|png|webp|avif|gif|svg|mp4|webm|woff2?|ttf|otf|js|css|json|ico)\b/gi;
const PAGES = ["index.html", "work.html", "studio.html", "whispers.html", "contact.html",
  "work/aurelis-beach.html", "work/blackwell-motors.html", "work/aspen877.html",
  ...git("ls-tree", "--name-only", ref, "whispers/").toString().split("\n").filter(f => f.endsWith(".html"))];
const used = new Set(PAGES), queue = [...PAGES];
while (queue.length) {
  const file = queue.shift(), dir = path.posix.dirname(file);
  if (!/\.(html|css|svg|js)$/.test(file) || file.endsWith(".min.js")) continue;
  for (const m of git("show", `${ref}:${file}`).toString().matchAll(ASSET)) {
    for (const p of [m[0], path.posix.join(dir, m[0])].map(decodeURIComponent)) {
      if (tracked.has(p) && !used.has(p)) { used.add(p); queue.push(p); }
    }
  }
}
used.add(".nojekyll");

const SECTIONS = {"work.html": "#work", "studio.html": "#studio", "whispers.html": "#whispers", "contact.html": "#site-foot"};
const pages = {};
for (const page of PAGES) {
  const dir = path.posix.dirname(page);
  let html = git("show", `${ref}:${page}`).toString();
  html = html.replace(/href="([^"#:?]+\.html)(#[^"]*)?"/g, (all, url) => {
    const target = path.posix.normalize(path.posix.join(dir, url));
    if (PAGES.includes(target)) return all;
    if (!SECTIONS[target]) throw Error(`${page} links to unknown page ${url}`);
    return `href="${dir === "." ? "" : path.posix.relative(dir, "index.html")}${SECTIONS[target]}"`;
  });
  html = html.replace(/<!doctype html>/i, `<!doctype html>\n<!-- home-only edition, built from create-studio-site@${sha} by scripts/build-home-only.mjs -->`);
  // whatever still names an .html file must be one of the published pages
  for (const m of html.matchAll(/(?:href|src)=["']([^"'#:?]+\.html)/g)) {
    if (!PAGES.includes(path.posix.normalize(path.posix.join(dir, m[1])))) throw Error(`${page}: link to unpublished ${m[1]}`);
  }
  for (const m of html.matchAll(/case:"([^"]+\.html)"/g)) if (!PAGES.includes(m[1])) throw Error(`case link to unpublished ${m[1]}`);
  pages[page] = html;
}

fs.rmSync(out, {recursive: true, force: true});
for (const f of used) {
  const dest = path.join(out, f);
  fs.mkdirSync(path.dirname(dest), {recursive: true});
  fs.writeFileSync(dest, pages[f] !== undefined ? pages[f] : tracked.has(f) ? git("show", `${ref}:${f}`) : "");
}
console.log(`home-only edition of ${sha}: ${used.size} files -> ${out}`);
