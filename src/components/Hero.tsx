import { useRef } from "react";
import { gsap, useGSAP, SplitText, ScrollTrigger, MQ, D, E, STAGGER } from "@/lib/motion";
import { doctor, hero } from "@/content/practice";
import { Button } from "./ui/Button";

// The ink curtain belongs to the very first paint only. When the visitor
// returns to the home page via the router, the page transition has already
// covered the swap, so the intro starts from the navigation beat instead.
let introPlayed = false;

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(MQ.reduced, () => {
        gsap.set([q("[data-hero]"), "[data-intro='nav']"], { autoAlpha: 1 });
        gsap.set(q("[data-hero-mask]"), { clipPath: "inset(0 0 0 0)" });
        gsap.set(q("[data-curtain]"), { yPercent: -100 });
      });

      mm.add(MQ.motion, () => {
        // Hidden until lines are masked and ready; avoids any flash before the split.
        gsap.set(q("[data-hero='headline']"), { visibility: "hidden" });
        const split = new SplitText(q("[data-hero-headline]"), {
          type: "lines",
          linesClass: "split-line",
          mask: "lines",
        });

        const tl = gsap.timeline({ defaults: { ease: E.out } });
        const revisit = introPlayed;
        introPlayed = true;

        // 1. Page establishes — curtain lifts (first visit only)
        if (revisit) gsap.set(q("[data-curtain]"), { yPercent: -100 });
        else tl.to(q("[data-curtain]"), { yPercent: -100, duration: 1.1, ease: E.inOut }, 0.15);
        tl
          // 2. Navigation enters
          .fromTo("[data-intro='nav']", { autoAlpha: 0, y: -12 }, { autoAlpha: 1, y: 0, duration: D.base }, 0.7)
          // 3. Eyebrow
          .fromTo(q("[data-hero='eyebrow']"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: D.base }, 0.85)
          // 4. Headline line by line
          .fromTo(
            split.lines,
            { yPercent: 110, rotate: 1.5 },
            { yPercent: 0, rotate: 0, duration: 1.2, ease: E.outExpo, stagger: STAGGER.base + 0.02 },
            0.9
          )
          .set(q("[data-hero='headline']"), { visibility: "visible" }, 0.9)
          // 5. Supporting copy · 6. CTAs
          .fromTo(q("[data-hero='copy']"), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: D.base + 0.2 }, 1.35)
          .fromTo(q("[data-hero='cta']"), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: D.base, stagger: STAGGER.base }, 1.5)
          // 7. Image mask opens
          .fromTo(
            q("[data-hero-mask]"),
            { clipPath: "inset(12% 0 0 0)" },
            { clipPath: "inset(0% 0 0 0)", duration: D.mask, ease: E.outExpo },
            1.0
          )
          .fromTo(q("[data-hero-img]"), { scale: 1.18, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: D.mask + 0.6, ease: E.outExpo }, 1.0)
          // 8. Credibility details
          .fromTo(q("[data-hero='fact']"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: D.base, stagger: STAGGER.tight }, 1.9)
          .fromTo(q("[data-hero='rule']"), { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: E.outExpo, transformOrigin: "left" }, 1.8)
          .fromTo(q("[data-hero='side']"), { autoAlpha: 0 }, { autoAlpha: 1, duration: D.base }, 2.1);

        // 9. Ambient: subtle parallax on scroll
        gsap.to(q("[data-hero-img]"), {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        // Explicit start values: a scrubbed tween must never "remember" the pre-intro hidden state.
        gsap.fromTo(
          q("[data-hero='headline']"),
          { yPercent: 0, opacity: 1 },
          {
            yPercent: -10,
            opacity: 0.4,
            ease: "none",
            immediateRender: false,
            scrollTrigger: { trigger: root.current, start: "40% top", end: "bottom top", scrub: true },
          }
        );

        if (revisit) tl.seek(0.7);

        return () => split.revert();
      });

      ScrollTrigger.refresh();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate min-h-[100svh] overflow-hidden bg-paper pt-[var(--nav-h)]"
    >
      {/* Curtain */}
      <div data-curtain aria-hidden className="pointer-events-none fixed inset-0 z-[90] bg-ink" />

      <div className="container-x relative grid min-h-[calc(100svh-var(--nav-h))] grid-cols-12 gap-x-6 pb-8 pt-10 md:pt-16 lg:pb-12">
        {/* Copy column */}
        <div className="col-span-12 flex flex-col justify-end lg:col-span-7 lg:pr-8 xl:col-span-7">
          <p data-hero="eyebrow" className="text-eyebrow flex items-center gap-3 text-muted">
            <span aria-hidden className="inline-block h-px w-6 bg-teal" />
            {hero.eyebrow}
          </p>

          <h1
            id="hero-heading"
            data-hero="headline"
            data-hero-headline
            className="text-display mt-8 max-w-[10ch] text-ink [text-wrap:balance] md:mt-10"
          >
            {hero.headlineLines[0]} <br className="hidden sm:block" />
            {hero.headlineLines[1]}{" "}
            <em className="serif-italic text-teal">{hero.headlineLines[2]}</em>
          </h1>

          <div className="mt-8 grid grid-cols-12 gap-x-6 md:mt-12">
            <p data-hero="copy" className="text-lead col-span-12 max-w-[44ch] text-muted md:col-span-10 lg:col-span-9">
              {hero.copy}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 md:mt-10">
            <Button data-hero="cta" href="/appointments" size="lg" arrow data-cursor="Book">
              Book an appointment
            </Button>
            <Button data-hero="cta" href="/about" size="lg" variant="secondary">
              Meet {doctor.shortName}
            </Button>
          </div>
        </div>

        {/* Portrait column */}
        <div className="relative col-span-12 mt-12 lg:col-span-5 lg:row-span-2 lg:mt-0">
          <figure className="relative ml-auto w-full max-w-[34rem] lg:absolute lg:inset-y-0 lg:right-0 lg:max-w-none">
            <div
              data-hero-mask
              className="relative aspect-[4/5] overflow-hidden bg-paper-2 lg:aspect-auto lg:h-full"
              style={{ clipPath: "inset(12% 0 0 0)" }}
            >
              <img
                data-hero-img
                src={doctor.portraitHero}
                alt={`${doctor.name}, ${doctor.title}, photographed in the clinic.`}
                width={1120}
                height={1400}
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover object-[50%_35%] opacity-0 will-change-transform"
              />
            </div>
            <figcaption
              data-hero="side"
              className="text-meta absolute -left-2 bottom-6 hidden origin-bottom-left -rotate-90 text-muted lg:block"
            >
              {doctor.name} · {doctor.title}
            </figcaption>
          </figure>
        </div>

        {/* Facts rail */}
        <div className="col-span-12 mt-10 lg:col-span-7 lg:mt-14">
          <div data-hero="rule" className="h-px w-full bg-line-2" />
          <dl className="grid grid-cols-2 gap-x-6 gap-y-6 pt-5 md:grid-cols-4">
            {hero.facts.map((f) => (
              <div key={f.label} data-hero="fact" className="flex flex-col gap-1.5">
                <dt className="text-eyebrow text-muted-2">{f.label}</dt>
                <dd className="text-label text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
