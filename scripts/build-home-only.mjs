// Builds the home-only edition of the site: index.html and only the files it
// uses, read from a git ref (never the working tree), with every link to
// another page pointed at the matching section of the homepage instead.
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
const used = new Set(["index.html"]), queue = ["index.html"];
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

const LINKS = {"work.html": "#work", "studio.html": "#studio", "whispers.html": "#whispers", "contact.html": "#site-foot"};
let html = git("show", `${ref}:index.html`).toString();
for (const [from, to] of Object.entries(LINKS)) html = html.split(`href="${from}"`).join(`href="${to}"`);
// project panels keep their case-study hover disc (as on the reference) but
// point at #work, since the case-study pages are not published
html = html.replace(/case:"work\/[\w-]+\.html"/g, 'case:"#work"');
html = html.replace("<!doctype html>", `<!doctype html>\n<!-- home-only edition, built from create-studio-site@${sha} by scripts/build-home-only.mjs -->`);

const left = html.match(/(?:href|src)=["'](?!https?:|mailto:|tel:|#)[^"']*\.html/g);
if (left) throw Error("links to other pages remain: " + left.join(", "));

fs.rmSync(out, {recursive: true, force: true});
for (const f of used) {
  const dest = path.join(out, f);
  fs.mkdirSync(path.dirname(dest), {recursive: true});
  fs.writeFileSync(dest, f === "index.html" ? html : tracked.has(f) ? git("show", `${ref}:${f}`) : "");
}
console.log(`home-only edition of ${sha}: ${used.size} files -> ${out}`);
