/**
 * Builds every image asset the site uses.
 *
 * The reference runs on licensed stock photography that cannot be
 * redistributed. Each slot below is therefore mapped to an ORIGINAL scene
 * rendered to the same subject as the reference frame it stands in for, at the
 * same aspect ratio and tonal key — see scripts/scenes.mjs.
 *
 * The reference subject is noted per slot so the two can be compared directly,
 * and so a licensed photo can later be dropped in over any file without
 * touching component code.
 *
 *   node scripts/gen-assets.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  poolVilla, conceptCar, roadBike, glassTower, keyboard, dataScreen,
  spheres, visor, hoodFigure, deskPair, fabricFlat, bloomPortrait,
  bubbleField, headshot, clientMark, glyphs,
} from "./scenes.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out = resolve(root, "public/img");
mkdirSync(out, { recursive: true });

const made = [];
const emit = (name, svg) => {
  writeFileSync(resolve(out, name), svg.replace(/\n\s*/g, ""), "utf8");
  made.push(name);
};

/* ───────────────────────────────────────────── hero + statement backdrops */
// ref: portrait with a bloom of flowers over the eyes, dark studio ground
emit("hero.svg", bloomPortrait({ seed: "hero", w: 1600, h: 1100 }));
// ref: high-key macro bubbles behind the big statement lines
emit("statement.svg", bubbleField({ seed: "statement", w: 1600, h: 1000 }));
// ref: small circular crop of the hero portrait beside the footer blurb
emit("footer-chip.svg", bloomPortrait({ seed: "footer-chip", w: 400, h: 400 }));

/* ─────────────────────────────────────────────────────── project imagery */
const projectScenes = {
  solvanne: (s, w, h) => poolVilla({ seed: s, w, h }),              // beachfront villa + infinity pool
  harrowgate: (s, w, h) => conceptCar({ seed: s, w, h }),           // black concept car
  verge: (s, w, h) => roadBike({ seed: s, w, h }),                  // road bike, orange accents
  plinth: (s, w, h) => glassTower({ seed: s, w, h, dark: true }),   // glass building from below
  atelier: (s, w, h) => fabricFlat({ seed: s, w, h }),              // fashion / fabric flatlay
  sundermark: (s, w, h) => keyboard({ seed: s, w, h, dark: true }), // product close-up
};
for (const [slug, fn] of Object.entries(projectScenes)) {
  emit(`project-${slug}.svg`, fn(`p-${slug}`, 1920, 1200));
  emit(`project-${slug}-wide.svg`, fn(`pw-${slug}`, 1920, 820));
}

/* ────────────────────────────────────────────────── service thumbnails */
// displayed at 290x160 on the reference
const serviceScenes = {
  identity: (s) => keyboard({ seed: s, w: 870, h: 480, dark: true }),     // device close-up
  strategy: (s) => glassTower({ seed: s, w: 870, h: 480, dark: false }),  // architecture, light
  design: (s) => spheres({ seed: s, w: 870, h: 480 }),                    // geometric product set
  ai: (s) => visor({ seed: s, w: 870, h: 480 }),                          // futuristic visor
  seo: (s) => dataScreen({ seed: s, w: 870, h: 480 }),                    // analytics charts
  development: (s) => keyboard({ seed: s, w: 870, h: 480, dark: false }), // mechanical keyboard
};
for (const [k, fn] of Object.entries(serviceScenes)) emit(`service-${k}.svg`, fn(`s-${k}`));

/* ────────────────────────────────────────────── editorial / studio slots */
emit("studio-a.svg", deskPair({ seed: "studio-a", w: 1600, h: 1000 }));
emit("studio-b.svg", deskPair({ seed: "studio-b", w: 1400, h: 1050 }));
emit("studio-c.svg", glassTower({ seed: "studio-c", w: 1400, h: 900, dark: false }));
emit("process.svg", conceptCar({ seed: "process", w: 1600, h: 900 }));
emit("showreel.svg", spheres({ seed: "showreel", w: 1200, h: 700 }));
emit("cta.svg", bloomPortrait({ seed: "cta", w: 1400, h: 950, petal: "#3f6fbd" }));

/* ──────────────────────────────────────────────────── whispers imagery */
// one distinct subject per article, mirroring the reference's card set
const whispers = [
  (s) => hoodFigure({ seed: s, w: 1400, h: 1000 }),             // 1 product design / AI
  (s) => fabricFlat({ seed: s, w: 1400, h: 1000 }),             // 2 fashion identities
  (s) => glassTower({ seed: s, w: 1400, h: 1000, dark: true }), // 3 architecture
  (s) => roadBike({ seed: s, w: 1400, h: 1000 }),               // 4 e-mobility
  (s) => conceptCar({ seed: s, w: 1400, h: 1000 }),             // 5 automotive
  (s) => dataScreen({ seed: s, w: 1400, h: 1000 }),             // 6 designing trust
  (s) => poolVilla({ seed: s, w: 1400, h: 1000 }),              // 7 hospitality
];
whispers.forEach((fn, i) => emit(`whisper-${i + 1}.svg`, fn(`w-${i + 1}`)));

/* ─────────────────────────────────────────────────────── team portraits */
const people = [
  "ivar-solheim", "priya-raghavan", "camille-okonkwo", "dan-whitfield",
  "jonas-ferreira", "rea-lindqvist", "yara-haddad", "tomas-kovac",
  "nora-pemberton", "esme-duarte",
];
people.forEach((slug) => emit(`person-${slug}.svg`, headshot(`ppl-${slug}`)));

/* ────────────────────────────────────────────────────────── client marks */
const clients = ["Sundermark", "Plinth", "Vantar", "Weldon", "Harrowgate", "Solvanne", "Atelier", "Halden", "Kestrel", "Ostara"];
clients.forEach((c, i) => emit(`client-${c.toLowerCase()}.svg`, clientMark(c, glyphs[i % glyphs.length])));

/* ─────────────────────────────────────────────────────────────── grain */
emit(
  "grain.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="160" height="160" filter="url(#n)" opacity="0.3"/></svg>`
);

console.log(`wrote ${made.length} assets to ${out}`);
