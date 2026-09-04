import { useRef } from "react";
import { gsap, useGSAP, SplitText, MQ, D, E, STAGGER } from "@/lib/motion";
import type { PageHeaderContent } from "@/content/pages";
import { RouteLink } from "@/lib/transition";

/**
 * Inner-page opening. Same vocabulary as the hero — eyebrow, masked
 * line-by-line headline, lead, drawn rule, credibility facts — at a
 * shorter height so the page's own content arrives quickly.
 */
export function PageHeader({ content, crumb }: { content: PageHeaderContent; crumb: string }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(MQ.reduced, () => {
        gsap.set(q("[data-ph]"), { autoAlpha: 1 });
      });

      mm.add(MQ.motion, () => {
        gsap.set(q("[data-ph='headline']"), { visibility: "hidden" });
        const split = new SplitText(q("[data-ph-headline]"), {
          type: "lines",
          linesClass: "split-line",
          mask: "lines",
        });

        gsap
          .timeline({ defaults: { ease: E.out }, delay: 0.55 })
          .fromTo(q("[data-ph='crumb']"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: D.base }, 0)
          .fromTo(q("[data-ph='eyebrow']"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: D.base }, 0.1)
          .set(q("[data-ph='headline']"), { visibility: "visible" }, 0.15)
          .fromTo(
            split.lines,
            { yPercent: 110, rotate: 1.5 },
            { yPercent: 0, rotate: 0, duration: 1.2, ease: E.outExpo, stagger: STAGGER.base + 0.02 },
            0.15
          )
          .fromTo(q("[data-ph='copy']"), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: D.base + 0.2 }, 0.6)
          .fromTo(q("[data-ph='rule']"), { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: E.outExpo, transformOrigin: "left" }, 0.8)
          .fromTo(q("[data-ph='fact']"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: D.base, stagger: STAGGER.tight }, 0.95);

        return () => split.revert();
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      aria-labelledby="page-heading"
      className="relative isolate overflow-hidden border-b border-line bg-paper pt-[var(--nav-h)]"
    >
      <div className="container-x grid grid-cols-12 gap-x-6 pb-12 pt-12 md:pt-20 lg:pb-16 lg:pt-28">
        {/* Rail */}
        <div className="col-span-12 flex items-start justify-between lg:col-span-3 lg:block">
          <nav aria-label="Breadcrumb" data-ph="crumb" className="text-meta flex items-center gap-2 text-muted opacity-0">
            <RouteLink to="/" className="link-draw hover:text-ink">
              Home
            </RouteLink>
            <span aria-hidden className="text-muted-2">/</span>
            <span aria-current="page" className="text-ink">
              {crumb}
            </span>
          </nav>
          <span data-ph="crumb" className="text-meta text-muted-2 opacity-0 lg:mt-6 lg:block">
            ({content.index})
          </span>
        </div>

        {/* Headline block */}
        <div className="col-span-12 mt-10 lg:col-span-9 lg:col-start-4 lg:mt-0">
          <p data-ph="eyebrow" className="text-eyebrow flex items-center gap-3 text-muted opacity-0">
            <span aria-hidden className="inline-block h-px w-6 bg-teal" />
            {content.eyebrow}
          </p>
          <h1
            id="page-heading"
            data-ph="headline"
            data-ph-headline
            className="text-h1 mt-8 max-w-[14ch] text-ink [text-wrap:balance]"
          >
            {content.headline[0]} <em className="serif-italic text-teal">{content.headline[1]}</em>
          </h1>
          <p data-ph="copy" className="text-lead mt-8 max-w-[52ch] text-muted opacity-0 md:mt-10">
            {content.copy}
          </p>
        </div>

        {/* Facts */}
        <div className="col-span-12 mt-14 lg:col-span-9 lg:col-start-4 lg:mt-20">
          <div data-ph="rule" aria-hidden className="h-px w-full origin-left bg-line-2" />
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 pt-6 md:grid-cols-4">
            {content.facts.map((f) => (
              <div key={f.label} data-ph="fact" className="opacity-0">
                <dt className="text-eyebrow text-muted-2">{f.label}</dt>
                <dd className="text-label mt-2 break-words text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
