import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, useGSAP, MQ, E } from "@/lib/motion";
import { testimonials, IS_SAMPLE_CONTENT } from "@/content/practice";
import { useReveal } from "@/hooks/useReveal";
import { Eyebrow } from "./ui/Section";
import { cn } from "@/utils/cn";

export function Testimonials() {
  const scope = useReveal<HTMLElement>();
  const [index, setIndex] = useState(0);
  const quoteRef = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  const total = testimonials.length;

  const go = useCallback((dir: 1 | -1) => setIndex((i) => (i + dir + total) % total), [total]);

  useGSAP(
    () => {
      if (first.current) {
        first.current = false;
        return;
      }
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          quoteRef.current!.children,
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.8, ease: E.out, stagger: 0.08 }
        );
      });
    },
    { dependencies: [index] }
  );

  // Keyboard support when the region is focused
  useEffect(() => {
    const el = scope.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [go, scope]);

  const t = testimonials[index];

  return (
    <section
      ref={scope}
      aria-labelledby="testimonials-heading"
      className="relative border-y border-line bg-surface py-24 md:py-32 lg:py-40"
    >
      <div className="container-x grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 lg:col-span-3">
          <Eyebrow data-reveal>
            <span id="testimonials-heading">In patients' words</span>
          </Eyebrow>
          <p data-reveal className="text-meta mt-6 text-muted-2">
            ({String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")})
          </p>
        </div>

        <div className="col-span-12 lg:col-span-8 lg:col-start-5" data-reveal>
          <div
            ref={quoteRef}
            role="group"
            aria-roledescription="slide"
            aria-label={`Testimonial ${index + 1} of ${total}`}
            tabIndex={0}
            className="outline-none"
          >
            <blockquote className="text-h2 max-w-[22ch] text-balance text-ink">
              <span aria-hidden className="serif-italic text-teal">“</span>
              {t.quote}
              <span aria-hidden className="serif-italic text-teal">”</span>
            </blockquote>
            <footer className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-1 text-meta text-muted">
              <span className="text-ink">{t.who}</span>
              <span>{t.context}</span>
              {IS_SAMPLE_CONTENT && (
                <span className="text-muted-2">Sample — replace with verified feedback</span>
              )}
            </footer>
          </div>

          <div className="mt-12 flex items-center gap-3">
            {(["prev", "next"] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => go(dir === "next" ? 1 : -1)}
                aria-label={dir === "next" ? "Next testimonial" : "Previous testimonial"}
                className="group grid size-12 place-items-center rounded-full border border-line-2 text-ink transition-[background-color,border-color,color] duration-300 hover:border-ink hover:bg-ink hover:text-paper active:scale-95"
              >
                <svg
                  viewBox="0 0 16 16"
                  className={cn("size-4 transition-transform duration-500 ease-[var(--ease-out-expo)]", dir === "prev" ? "rotate-180 group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5")}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
            <div className="ml-4 flex gap-1.5" aria-hidden>
              {testimonials.map((_, i) => (
                <span
                  key={i}
                  className={cn("h-px transition-all duration-500 ease-[var(--ease-out-expo)]", i === index ? "w-8 bg-teal" : "w-3 bg-line-2")}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
