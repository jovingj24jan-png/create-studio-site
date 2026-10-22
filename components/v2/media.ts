/**
 * Single swap point for every clip on the page.
 *
 * These are placeholders taken from the assets already in the project. To drop
 * in the real footage, change the `src` values here and nothing else:
 *
 *   hero      — portrait subject against near-black, looping
 *   subject   — alpha/cutout version of the same subject, so "let's create"
 *               can sit behind them. While `subject.src` is null, Stage B
 *               falls back to a masked copy of the hero clip.
 *   manifesto — air bubbles rising through water, desaturated
 *   showreel  — the reel itself
 *
 * Posters are rendered as a layer underneath each video rather than via the
 * `poster` attribute, which is unreliable for SVG sources.
 */

export type Clip = {
  src: string;
  poster: string;
  /** intrinsic ratio, used to reserve space so video load causes no shift */
  ratio: number;
};

export const media = {
  hero: {
    src: "/video/story.mp4",
    poster: "/img/hero.svg",
    ratio: 16 / 9,
  } satisfies Clip,

  /** set to a Clip once an alpha cutout exists */
  subject: null as Clip | null,

  manifesto: {
    src: "/video/showreel.mp4",
    poster: "/img/statement.svg",
    ratio: 16 / 9,
  } satisfies Clip,

  showreel: {
    src: "/video/showreel.mp4",
    poster: "/img/showreel.svg",
    ratio: 548 / 321,
  } satisfies Clip,
};

/** Partner marks cycled by the hero's logo rotator. */
export const rotatorLogos = [
  "sundermark",
  "plinth",
  "vantar",
  "weldon",
  "harrowgate",
  "solvanne",
  "atelier",
  "halden",
];
