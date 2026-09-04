import { useRef, useState } from "react";
import { gsap, useGSAP, MQ, E } from "@/lib/motion";
import { sitePages } from "@/content/pages";
import { useReveal } from "@/hooks/useReveal";
import { SectionHeader } from "./ui/Section";
import { RouteLink } from "@/lib/transition";
import { cn } from "@/utils/cn";

/**
 * Home-page index of the site. Each row is a page; hovering a row on
 * desktop crossfades the sticky image, exactly like the specialty explorer.
 */
export function SiteIndex() {
  const scope = useReveal<HTMLElement>();
  const [active, setActive] = useState(0);
  const imgWrap = useRef<HTMLDivElement>(null);
  const prev = useRef(0);

  useGSAP(
    () => {
      if (!imgWrap.current || prev.current === active) return;
      const imgs = imgWrap.current.querySelectorAll<HTMLElement>("[data-index-img]");
      const incoming = imgs[active];
      const outgoing = imgs[prev.current];
      prev.current = active;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.set(incoming, { zIndex: 2 });
        gsap.set(outgoing, { zIndex: 1 });
        gsap.fromTo(
          incoming,
          { clipPath: "inset(0 0 100% 0)", scale: 1.08 },
          { clipPath: "inset(0 0 0% 0)", scale: 1, duration: 0.9, ease: E.outExpo, overwrite: true }
        );
        gsap.to(outgoing, { scale: 1.04, duration: 0.9, ease: E.outExpo, overwrite: true });
      });
      mm.add(MQ.reduced, () => {
        gsap.set(imgs, { clipPath: "inset(0 0 100% 0)", zIndex: 1 });
        gsap.set(incoming, { clipPath: "inset(0 0 0% 0)", zIndex: 2 });
      });
    },
    { dependencies: [active] }
  );

  return (
    <section ref={scope} id="explore" aria-labelledby="explore-heading" className="bg-paper py-24 md:py-32 lg:py-40">
      <div className="container-x">
        <SectionHeader
          index="01"
          eyebrow="Around the practice"
          headline={
            <span id="explore-heading">
              Everything you might want to know, <em className="serif-italic text-teal">each in its own place</em>.
            </span>
          }
          copy="The practice is set out across a handful of short pages. Start wherever your question is."
        />

        <div className="mt-16 grid grid-cols-12 gap-x-6 lg:mt-24">
          <div className="col-span-12 lg:col-span-7">
            <ul role="list" className="border-t border-line-2" data-reveal>
              {sitePages.map((p, i) => {
                const isActive = i === active;
                return (
                  <li key={p.href} className="border-b border-line-2">
                    <RouteLink
                      to={p.href}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      data-cursor="Open"
                      className={cn(
                        "group grid w-full grid-cols-[3rem_1fr_auto] items-baseline gap-x-4 py-6 text-left transition-colors duration-500 sm:grid-cols-[4rem_1fr_auto] sm:gap-x-6 sm:py-7",
                        isActive ? "text-ink" : "text-muted hover:text-ink"
                      )}
                    >
                      <span className="text-meta text-muted-2">{p.index}</span>
                      <span className="min-w-0">
                        <span className="block text-h3 leading-none">{p.title}</span>
                        <span
                          className={cn(
                            "mt-3 block max-w-[46ch] text-body transition-colors duration-500",
                            isActive ? "text-muted" : "text-muted-2"
                          )}
                        >
                          {p.short}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className={cn(
                          "grid size-9 place-items-center self-center rounded-full border transition-all duration-500 ease-[var(--ease-out-expo)]",
                          isActive ? "rotate-0 border-teal bg-teal text-paper" : "-rotate-45 border-line-2 text-muted"
                        )}
                      >
                        <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </RouteLink>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="hidden lg:col-span-4 lg:col-start-9 lg:block">
            <div className="sticky top-[calc(var(--nav-h)+2rem)]">
              <div ref={imgWrap} className="relative aspect-[4/5] overflow-hidden bg-paper-2" data-mask>
                {sitePages.map((p, i) => (
                  <img
                    key={p.href}
                    data-index-img
                    src={p.image}
                    alt={i === active ? p.imageAlt : ""}
                    loading="lazy"
                    decoding="async"
                    width={960}
                    height={1200}
                    className="absolute inset-0 h-full w-full object-cover will-change-transform"
                    style={{ clipPath: i === 0 ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)", zIndex: i === 0 ? 2 : 1 }}
                  />
                ))}
              </div>
              <p className="text-meta mt-4 flex items-baseline justify-between text-muted" aria-live="polite">
                <span>{sitePages[active].title}</span>
                <span>{sitePages[active].index} / 0{sitePages.length}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
