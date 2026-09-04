import { useRef, type RefObject } from "react";
import { gsap, useGSAP, MQ, D, E, STAGGER, DIST } from "@/lib/motion";

/**
 * Attach to a section root. Every descendant with [data-reveal] rises in
 * when it enters the viewport. Siblings inside a [data-reveal-group]
 * stagger together. Reduced motion: elements simply appear.
 */
export function useReveal<T extends HTMLElement>(): RefObject<T | null> {
  const scope = useRef<T>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add(MQ.reduced, () => {
        gsap.set(root.querySelectorAll("[data-reveal]"), { autoAlpha: 1 });
      });

      mm.add(MQ.motion, () => {
        // Grouped reveals
        root.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
          const items = group.querySelectorAll<HTMLElement>("[data-reveal]");
          if (!items.length) return;
          gsap.fromTo(
            items,
            { autoAlpha: 0, y: DIST.md },
            {
              autoAlpha: 1,
              y: 0,
              duration: D.slow,
              ease: E.out,
              stagger: STAGGER.base,
              clearProps: "transform",
              scrollTrigger: { trigger: group, start: "top 85%", once: true },
            }
          );
        });

        // Individual reveals (not inside a group)
        root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
          if (el.closest("[data-reveal-group]")) return;
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: DIST.md },
            {
              autoAlpha: 1,
              y: 0,
              duration: D.slow,
              ease: E.out,
              clearProps: "transform",
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            }
          );
        });

        // Masked images
        root.querySelectorAll<HTMLElement>("[data-mask]").forEach((el) => {
          const img = el.querySelector("img");
          const tl = gsap.timeline({
            scrollTrigger: { trigger: el, start: "top 80%", once: true },
          });
          tl.fromTo(
            el,
            { clipPath: "inset(0 0 100% 0)" },
            { clipPath: "inset(0 0 0% 0)", duration: D.mask, ease: E.outExpo }
          );
          if (img) tl.fromTo(img, { scale: 1.15 }, { scale: 1, duration: D.mask + 0.4, ease: E.outExpo }, 0);
        });
      });
    },
    { scope }
  );

  return scope;
}
