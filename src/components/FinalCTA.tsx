import { useRef } from "react";
import { gsap, useGSAP, SplitText, MQ, E } from "@/lib/motion";
import { contact, doctor } from "@/content/practice";
import { Button } from "./ui/Button";
import { Eyebrow } from "./ui/Section";

export function FinalCTA() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const split = new SplitText(q("[data-cta-headline]"), { type: "lines", linesClass: "split-line", mask: "lines" });
        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: "top 70%", once: true } })
          .fromTo(q("[data-cta='eyebrow']"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: E.out })
          .fromTo(split.lines, { yPercent: 110 }, { yPercent: 0, duration: 1.2, ease: E.outExpo, stagger: 0.1 }, 0.1)
          .fromTo(q("[data-cta='body']"), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: E.out, stagger: 0.1 }, 0.6);
        // Slow background drift for depth
        gsap.to(q("[data-cta-bg]"), {
          yPercent: -18,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        });
        return () => split.revert();
      });
      mm.add(MQ.reduced, () => gsap.set(q("[data-cta]"), { autoAlpha: 1 }));
    },
    { scope: root }
  );

  return (
    <section ref={root} aria-labelledby="cta-heading" className="grain relative isolate overflow-hidden bg-ink text-paper">
      <div
        data-cta-bg
        aria-hidden
        className="pointer-events-none absolute -right-[10%] top-[-20%] -z-10 size-[70vw] max-w-[900px] rounded-full opacity-[0.35]"
        style={{ background: "radial-gradient(closest-side, rgba(18,96,92,0.9), rgba(18,96,92,0) 70%)" }}
      />
      <div className="container-x grid grid-cols-12 gap-x-6 py-28 md:py-36 lg:py-44">
        <div className="col-span-12 lg:col-span-9">
          <Eyebrow dark data-cta="eyebrow" className="opacity-0">
            Begin when you're ready
          </Eyebrow>
          <h2 id="cta-heading" data-cta-headline className="text-h1 mt-10 max-w-[13ch] text-paper [text-wrap:balance]">
            Thoughtful care. <em className="serif-italic text-teal-soft">Backed</em> by experience.
          </h2>
          <p data-cta="body" className="text-lead mt-8 max-w-[44ch] text-paper/70 opacity-0">
            Whether it's a single question or a long-standing condition, the first step is the same: a conversation with {doctor.shortName}.
          </p>
          <div data-cta="body" className="mt-10 flex flex-wrap items-center gap-3 opacity-0">
            <Button href="/appointments" variant="inverse" size="lg" arrow data-cursor="Book">
              Book an appointment
            </Button>
            <Button href={contact.phoneHref} variant="ghost" size="lg" className="text-paper hover:text-teal-soft">
              Contact the clinic
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
