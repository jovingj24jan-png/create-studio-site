/** Shared motion constants. Nothing in this build hard-codes its own easing. */

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;
export const EASE_HERO = [0.22, 1, 0.36, 1] as const;

/** every scroll-linked value passes through this so nothing is wheel-locked */
export const SPRING_SOFT = { stiffness: 90, damping: 25 } as const;
/** badges and other small pops */
export const SPRING_POP = { stiffness: 400, damping: 18 } as const;

export const DUR = {
  reveal: 1.0,
  revealLong: 1.1,
  hover: 0.4,
} as const;

export const STAGGER = {
  word: 0.055,
  line: 0.08,
  wordmark: 0.09,
  nav: 0.05,
} as const;

/** Entrance choreography for the hero, in seconds from page load. */
export const CUE = {
  video: 0,
  headline: 0.25,
  markers: 0.35,
  stat: 0.55,
  wordmark: 0.7,
  paragraph: 1.1,
  buttons: 1.25,
  showreel: 1.4,
} as const;
