import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/motion";
import { gallery, doctor } from "@/content/practice";
import { useReveal } from "@/hooks/useReveal";
import { SectionHeader } from "./ui/Section";
import { cn } from "@/utils/cn";

export function ClinicGallery() {
  const scope = useReveal<HTMLElement>();
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Desktop + motion allowed: pin and translate horizontally, driven by scroll.
      mm.add(`${MQ.desktop} and ${MQ.motion}`, () => {
        const t = track.current!;
        const getDistance = () => t.scrollWidth - window.innerWidth;
        gsap.to(t, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin.current,
            start: "top top",
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        // Gentle counter-parallax on each image
        gsap.utils.toArray<HTMLElement>("[data-g-img]", t).forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -6 },
            {
              xPercent: 6,
              ease: "none",
              scrollTrigger: { trigger: pin.current, start: "top top", end: () => `+=${getDistance()}`, scrub: true },
            }
          );
        });
      });
    },
    { scope }
  );

  return (
    <section ref={scope} id="clinic" aria-labelledby="clinic-heading" className="overflow-x-clip bg-paper py-24 md:py-32 lg:pb-0 lg:pt-40">
      <div className="container-x">
        <SectionHeader
          index="04"
          eyebrow="The clinic"
          headline={<span id="clinic-heading">A quiet building on a quiet street.</span>}
          copy={`${doctor.practiceName} occupies two floors of a townhouse in ${doctor.location}. Designed to feel less like a hospital and more like somewhere you'd choose to spend an hour.`}
        />
      </div>

      {/* Desktop pinned horizontal gallery / mobile native scroll */}
      <div ref={pin} className="mt-14 lg:mt-0 lg:flex lg:h-screen lg:items-center">
        <div
          ref={track}
          data-cursor="Drag"
          className={cn(
            "no-scrollbar flex gap-4 overflow-x-auto px-[var(--gutter)] pb-4 snap-x snap-mandatory",
            "lg:snap-none lg:overflow-visible lg:gap-6 lg:pb-0 lg:pl-[calc(var(--gutter)+25%)] lg:pr-[var(--gutter)]"
          )}
          tabIndex={0}
          aria-label="Clinic photographs, scroll horizontally"
        >
          {gallery.map((g, i) => (
            <figure
              key={g.caption}
              className={cn(
                "shrink-0 snap-start",
                g.ratio.includes("3/4") ? "w-[70vw] sm:w-[40vw] lg:w-[26vw]" : g.ratio.includes("square") ? "w-[70vw] sm:w-[44vw] lg:w-[30vw]" : "w-[84vw] sm:w-[60vw] lg:w-[42vw]",
                i % 2 === 1 && "lg:mt-24"
              )}
            >
              <div className={cn("overflow-hidden bg-paper-2", g.ratio)} data-mask>
                <img
                  data-g-img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-[112%] max-w-none object-cover will-change-transform"
                />
              </div>
              <figcaption className="mt-3 flex justify-between text-meta text-muted">
                <span>{g.caption}</span>
                <span>{String(i + 1).padStart(2, "0")}</span>
              </figcaption>
            </figure>
          ))}
          {/* End-card */}
          <div className="flex w-[70vw] shrink-0 snap-start flex-col justify-end sm:w-[40vw] lg:w-[24vw]">
            <p className="font-display text-[clamp(1.75rem,1.4rem+1.4vw,2.75rem)] leading-[1.05] tracking-[-0.01em] text-ink">
              Visit in person, or start with a video call.
            </p>
            <a href="/appointments" className="link-draw mt-6 self-start text-label text-teal">
              Book an appointment
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
