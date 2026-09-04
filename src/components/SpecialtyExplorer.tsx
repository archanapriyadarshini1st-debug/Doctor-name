import { useId, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { gsap, useGSAP, MQ, E } from "@/lib/motion";
import { specialties } from "@/content/practice";
import { useReveal } from "@/hooks/useReveal";
import { SectionHeader } from "./ui/Section";
import { cn } from "@/utils/cn";

export function SpecialtyExplorer() {
  const scope = useReveal<HTMLElement>();
  // Deep links (/specialties#preventive) open the matching row.
  const { hash } = useLocation();
  const initial = Math.max(0, specialties.findIndex((s) => `#${s.id}` === hash));
  const [active, setActive] = useState(initial);
  const [expanded, setExpanded] = useState<number | null>(initial);
  const imgWrap = useRef<HTMLDivElement>(null);
  const prev = useRef(initial);
  const baseId = useId();

  // Desktop image crossfade + slight zoom when the active row changes
  useGSAP(
    () => {
      if (!imgWrap.current || prev.current === active) return;
      const imgs = imgWrap.current.querySelectorAll<HTMLElement>("[data-spec-img]");
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
    <section ref={scope} id="specialties" aria-labelledby="specialties-heading" className="bg-surface py-24 md:py-32 lg:py-40 border-t border-line">
      <div className="container-x">
        <SectionHeader
          index="02"
          eyebrow="Areas of focus"
          headline={
            <span id="specialties-heading">
              Four things done <em className="serif-italic text-teal">properly</em>, rather than everything adequately.
            </span>
          }
          copy="Dr. Navarro's practice is deliberately focused. Where a case falls outside these areas, she will say so and refer you on."
        />

        {/* ---------- Desktop: interactive rows + sticky image ---------- */}
        <div className="mt-16 hidden grid-cols-12 gap-x-6 lg:grid lg:mt-24">
          <div className="col-span-7">
            <ul role="list" className="border-t border-line-2" data-reveal>
              {specialties.map((s, i) => {
                const isActive = i === active;
                return (
                  <li key={s.id} id={s.id} className="scroll-mt-24 border-b border-line-2">
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      aria-expanded={isActive}
                      aria-controls={`${baseId}-panel-${i}`}
                      data-cursor="Explore"
                      className={cn(
                        "group grid w-full grid-cols-[4rem_1fr_auto] items-baseline gap-x-6 py-7 text-left transition-colors duration-500",
                        isActive ? "text-ink" : "text-muted hover:text-ink"
                      )}
                    >
                      <span className="text-meta text-muted-2">{s.index}</span>
                      <span className="text-h3 leading-none">{s.title}</span>
                      <span
                        aria-hidden
                        className={cn(
                          "grid size-9 place-items-center rounded-full border transition-all duration-500 ease-[var(--ease-out-expo)]",
                          isActive ? "border-teal bg-teal text-paper rotate-0" : "border-line-2 text-muted -rotate-45"
                        )}
                      >
                        <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </button>
                    <div
                      id={`${baseId}-panel-${i}`}
                      role="region"
                      aria-label={s.title}
                      className={cn(
                        "grid transition-[grid-template-rows,opacity] duration-700 ease-[var(--ease-out-expo)]",
                        isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="grid grid-cols-[4rem_1fr] gap-x-6 pb-8">
                          <span />
                          <div className="grid grid-cols-12 gap-x-6">
                            <p className="col-span-7 text-body text-muted">{s.body}</p>
                            <ul className="col-span-5 space-y-2 border-l border-line pl-5">
                              {s.points.map((p) => (
                                <li key={p} className="text-label text-ink-2">
                                  {p}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="col-span-4 col-start-9">
            <div className="sticky top-[calc(var(--nav-h)+2rem)]">
              <div ref={imgWrap} className="relative aspect-[4/5] overflow-hidden bg-paper-2" data-mask>
                {specialties.map((s, i) => (
                  <img
                    key={s.id}
                    data-spec-img
                    src={s.image}
                    alt={s.imageAlt}
                    loading="lazy"
                    decoding="async"
                    width={1050}
                    height={1400}
                    className="absolute inset-0 h-full w-full object-cover will-change-transform"
                    style={{ clipPath: i === initial ? "inset(0 0 0 0)" : "inset(0 0 100% 0)", zIndex: i === initial ? 2 : 1 }}
                  />
                ))}
              </div>
              <p className="mt-4 flex justify-between text-meta text-muted" aria-live="polite">
                <span>{specialties[active].index} — {specialties[active].title}</span>
                <span>{specialties[active].short}</span>
              </p>
            </div>
          </div>
        </div>

        {/* ---------- Mobile / tablet: expandable list with inline image ---------- */}
        <ul role="list" className="mt-14 border-t border-line-2 lg:hidden" data-reveal>
          {specialties.map((s, i) => {
            const isOpen = expanded === i;
            return (
              <li key={s.id} className="border-b border-line-2">
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`${baseId}-m-${i}`}
                  className="grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 py-5 text-left"
                >
                  <span className="text-meta text-muted-2">{s.index}</span>
                  <span className="text-h3 text-ink">{s.title}</span>
                  <span
                    aria-hidden
                    className={cn(
                      "grid size-10 place-items-center rounded-full border border-line-2 text-ink transition-transform duration-500 ease-[var(--ease-out-expo)]",
                      isOpen && "rotate-45 bg-ink text-paper border-ink"
                    )}
                  >
                    <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M8 3v10M3 8h10" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <div
                  id={`${baseId}-m-${i}`}
                  className={cn(
                    "grid transition-[grid-template-rows] duration-600 ease-[var(--ease-out-expo)]",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-6 pb-8 pl-[3.5rem] sm:grid-cols-[1fr_11rem]">
                      <div>
                        <p className="text-body text-muted">{s.body}</p>
                        <ul className="mt-5 space-y-2 border-l border-line pl-4">
                          {s.points.map((p) => (
                            <li key={p} className="text-label text-ink-2">
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="aspect-[4/5] w-full overflow-hidden bg-paper-2 sm:w-44">
                        <img src={s.image} alt={s.imageAlt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
