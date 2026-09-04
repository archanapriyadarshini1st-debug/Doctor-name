import { useId, useState } from "react";
import { faqs } from "@/content/practice";
import { useReveal } from "@/hooks/useReveal";
import { SectionHeader } from "./ui/Section";
import { cn } from "@/utils/cn";

export function FAQ() {
  const scope = useReveal<HTMLElement>();
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();

  return (
    <section ref={scope} id="faq" aria-labelledby="faq-heading" className="border-t border-line bg-surface py-24 md:py-32 lg:py-40">
      <div className="container-x">
        <SectionHeader
          index="05"
          eyebrow="Common questions"
          headline={<span id="faq-heading">Before you visit.</span>}
        />
        <div className="mt-14 grid grid-cols-12 gap-x-6 lg:mt-20">
          <ul role="list" className="col-span-12 border-t border-line-2 lg:col-span-8 lg:col-start-5" data-reveal>
            {faqs.map((f, i) => {
              const isOpen = open === i;
              const btnId = `${uid}-q-${i}`;
              const panelId = `${uid}-a-${i}`;
              return (
                <li key={f.q} className="border-b border-line-2">
                  <h3>
                    <button
                      id={btnId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                    >
                      <span className={cn("font-display text-[clamp(1.375rem,1.2rem+0.8vw,1.875rem)] leading-tight tracking-[-0.01em] transition-colors duration-300", isOpen ? "text-ink" : "text-ink-2 group-hover:text-ink")}>
                        {f.q}
                      </span>
                      <span
                        aria-hidden
                        className={cn(
                          "mt-1 grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-[var(--ease-out-expo)]",
                          isOpen ? "rotate-45 border-teal bg-teal text-paper" : "border-line-2 text-muted group-hover:border-ink group-hover:text-ink"
                        )}
                      >
                        <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M8 3v10M3 8h10" strokeLinecap="round" />
                        </svg>
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-600 ease-[var(--ease-out-expo)]",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-[60ch] pb-7 text-body text-muted">{f.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
