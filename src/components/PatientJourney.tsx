import { useRef } from "react";
import { gsap, useGSAP, MQ, E } from "@/lib/motion";
import { journey } from "@/content/practice";
import { useReveal } from "@/hooks/useReveal";
import { SectionHeader } from "./ui/Section";

export function PatientJourney() {
  const scope = useReveal<HTMLElement>();
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const steps = gsap.utils.toArray<HTMLElement>("[data-step]", track.current);

        // Desktop: horizontal progress line scrubbed by scroll; each step "lights up" as the line reaches it.
        gsap.fromTo(
          "[data-progress]",
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            transformOrigin: "left center",
            scrollTrigger: { trigger: track.current, start: "top 70%", end: "bottom 45%", scrub: 0.6 },
          }
        );
        // Mobile: vertical line
        gsap.fromTo(
          "[data-progress-y]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: { trigger: track.current, start: "top 70%", end: "bottom 60%", scrub: 0.6 },
          }
        );

        steps.forEach((step) => {
          const dot = step.querySelector("[data-dot]");
          const num = step.querySelector("[data-num]");
          gsap
            .timeline({ scrollTrigger: { trigger: step, start: "top 72%", once: true } })
            .fromTo(step, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: E.out })
            .to(dot, { backgroundColor: "#12605c", scale: 1, borderColor: "#12605c", duration: 0.4, ease: E.out }, 0.2)
            .to(num, { color: "#12605c", duration: 0.4 }, 0.2);
        });
      });
      mm.add(MQ.reduced, () => {
        gsap.set(["[data-progress]", "[data-progress-y]", "[data-step]"], { clearProps: "all", autoAlpha: 1 });
      });
    },
    { scope }
  );

  return (
    <section ref={scope} id="journey" aria-labelledby="journey-heading" className="bg-paper py-24 md:py-32 lg:py-40">
      <div className="container-x">
        <SectionHeader
          index="03"
          eyebrow="Your visit"
          headline={<span id="journey-heading">What happens, and in what order.</span>}
          copy="No surprises. From the first phone call to follow-up, you should always know what comes next."
        />

        <div ref={track} className="relative mt-16 lg:mt-24">
          {/* Desktop horizontal line */}
          <div aria-hidden className="absolute left-0 right-0 top-[1.3rem] hidden h-px bg-line-2 lg:block">
            <div data-progress className="h-full w-full origin-left bg-teal" />
          </div>
          {/* Mobile vertical line */}
          <div aria-hidden className="absolute bottom-0 left-[0.6rem] top-2 w-px bg-line-2 lg:hidden">
            <div data-progress-y className="h-full w-full origin-top bg-teal" />
          </div>

          <ol className="grid gap-y-12 lg:grid-cols-4 lg:gap-x-6">
            {journey.map((j) => (
              <li key={j.step} data-step className="relative pl-10 lg:pl-0 lg:pr-10">
                <span
                  data-dot
                  aria-hidden
                  className="absolute left-0 top-1.5 block size-5 scale-90 rounded-full border border-line-2 bg-paper lg:relative lg:top-0 lg:mb-8 lg:size-[2.6rem]"
                />
                <span data-num className="text-meta text-muted-2">
                  {j.step}
                </span>
                <h3 className="mt-2 font-display text-[clamp(1.75rem,1.4rem+1.2vw,2.5rem)] leading-none tracking-[-0.01em] text-ink">
                  {j.title}
                </h3>
                <p className="mt-4 max-w-[34ch] text-body text-muted">{j.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
