import { useRef } from "react";
import { gsap, useGSAP, MQ, E } from "@/lib/motion";
import { trust, doctor } from "@/content/practice";
import { useReveal } from "@/hooks/useReveal";

export function TrustStrip() {
  const scope = useReveal<HTMLElement>();
  const nums = useRef<HTMLSpanElement[]>([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        nums.current.forEach((el) => {
          const target = Number(el.dataset.value);
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target,
            duration: 1.6,
            ease: E.outExpo,
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
            onUpdate: () => (el.textContent = Math.round(obj.v).toString()),
          });
        });
      });
      mm.add(MQ.reduced, () => {
        nums.current.forEach((el) => (el.textContent = el.dataset.value ?? ""));
      });
    },
    { scope }
  );

  return (
    <section ref={scope} aria-label="Practice at a glance" className="border-y border-line bg-surface">
      <div className="container-x grid grid-cols-12 gap-x-6 py-12 md:py-16">
        <p data-reveal className="text-eyebrow col-span-12 mb-10 text-muted lg:col-span-3 lg:mb-0">
          At a glance
        </p>
        <dl data-reveal-group className="col-span-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:col-span-9 lg:grid-cols-4">
          {trust.map((t, i) => (
            <div key={t.label} data-reveal className="flex flex-col gap-3 border-l border-line pl-5">
              <dd className="order-1 font-display text-[clamp(2.75rem,2rem+3vw,4.5rem)] leading-none tracking-[-0.02em] text-ink">
                <span
                  ref={(el) => {
                    if (el) nums.current[i] = el;
                  }}
                  data-value={t.value}
                >
                  0
                </span>
                {t.suffix && <span className="ml-1 text-[0.45em] text-muted">{t.suffix}</span>}
              </dd>
              <dt className="order-2 text-body text-muted">
                {t.label}
                {t.note && <span className="sr-only"> (to be verified)</span>}
              </dt>
            </div>
          ))}
        </dl>
        <p data-reveal className="text-meta col-span-12 mt-10 text-muted-2 lg:col-start-4 lg:col-span-9">
          {doctor.registration} · Fully insured private practice · Recognised by major UK insurers
        </p>
      </div>
    </section>
  );
}
