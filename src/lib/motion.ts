/**
 * MOTION SYSTEM
 * One vocabulary for the whole site. Components consume these tokens
 * rather than inventing their own durations/eases.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export const D = {
  fast: 0.35,
  base: 0.7,
  slow: 1.1,
  mask: 1.4,
} as const;

export const E = {
  out: "power3.out",
  outExpo: "expo.out",
  inOut: "power3.inOut",
  soft: "power2.out",
} as const;

export const STAGGER = {
  tight: 0.05,
  base: 0.09,
  loose: 0.14,
} as const;

export const DIST = {
  sm: 16,
  md: 32,
  lg: 56,
} as const;

/** Media query keys used with gsap.matchMedia */
export const MQ = {
  motion: "(prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
  desktop: "(min-width: 1024px)",
  mobile: "(max-width: 1023px)",
} as const;

export const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia(MQ.reduced).matches;

/**
 * Standard scroll reveal: elements marked [data-reveal] inside `scope`
 * fade + rise once when they enter the viewport. Optional stagger groups
 * via [data-reveal-group].
 */
export function revealIn(
  targets: gsap.TweenTarget,
  opts: { y?: number; delay?: number; stagger?: number; trigger?: Element | null; start?: string } = {}
) {
  const { y = DIST.md, delay = 0, stagger = STAGGER.base, trigger, start = "top 85%" } = opts;
  return gsap.fromTo(
    targets,
    { autoAlpha: 0, y },
    {
      autoAlpha: 1,
      y: 0,
      duration: D.base + 0.3,
      ease: E.out,
      delay,
      stagger,
      clearProps: "transform",
      scrollTrigger: trigger
        ? { trigger, start, once: true }
        : undefined,
    }
  );
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
