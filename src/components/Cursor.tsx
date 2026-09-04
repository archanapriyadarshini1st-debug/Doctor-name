import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { gsap, useGSAP } from "@/lib/motion";

/**
 * Desktop-only cursor enhancement. Never replaces semantics; the native
 * cursor is hidden only on fine pointers, and everything stays usable
 * without it. Labels come from [data-cursor="View|Drag|Book|Explore"].
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const ok =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(ok);
    if (ok) document.documentElement.classList.add("cursor-active");
    return () => document.documentElement.classList.remove("cursor-active");
  }, []);

  useGSAP(
    () => {
      if (!enabled || !dot.current || !ring.current) return;
      const xDot = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3.out" });
      const yDot = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3.out" });
      const xRing = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3.out" });
      const yRing = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3.out" });

      let current: string | null = null;

      const apply = (next: string | null) => {
        current = next;
        if (next === null) {
          gsap.to(ring.current, { width: 32, height: 32, backgroundColor: "rgba(22,25,29,0)", borderColor: "rgba(22,25,29,0.5)", duration: 0.35 });
          gsap.to(dot.current, { scale: 1, duration: 0.25 });
          gsap.to(label.current, { autoAlpha: 0, duration: 0.2 });
        } else if (next === "") {
          gsap.to(ring.current, { width: 52, height: 52, backgroundColor: "rgba(22,25,29,0)", borderColor: "rgba(22,25,29,0.5)", duration: 0.35 });
          gsap.to(dot.current, { scale: 0.5, duration: 0.25 });
          gsap.to(label.current, { autoAlpha: 0, duration: 0.2 });
        } else {
          if (label.current) label.current.textContent = next;
          gsap.to(ring.current, { width: 88, height: 88, backgroundColor: "rgba(22,25,29,0.94)", borderColor: "rgba(22,25,29,0)", duration: 0.45, ease: "power3.out" });
          gsap.to(dot.current, { scale: 0, duration: 0.25 });
          gsap.to(label.current, { autoAlpha: 1, duration: 0.3, delay: 0.1 });
        }
      };
      const onMove = (e: PointerEvent) => {
        xDot(e.clientX); yDot(e.clientY);
        xRing(e.clientX); yRing(e.clientY);
        const target = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor], a, button, summary, input, textarea, select");
        const next = target?.dataset.cursor ?? (target ? "" : null);
        if (next === current) return;
        apply(next);
      };
      // Route changed under a hovered element: fall back to the idle state.
      const onRoute = () => apply(null);
      window.addEventListener("app:route", onRoute);
      const onLeave = () => gsap.to([dot.current, ring.current], { autoAlpha: 0, duration: 0.3 });
      const onEnter = () => gsap.to([dot.current, ring.current], { autoAlpha: 1, duration: 0.3 });
      const onFirst = () => { gsap.to("[data-cursor-root]", { autoAlpha: 1, duration: 0.3 }); window.removeEventListener("pointermove", onFirst); };
      window.addEventListener("pointermove", onFirst, { passive: true });

      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("mouseleave", onLeave);
      document.documentElement.addEventListener("mouseenter", onEnter);
      return () => {
        window.removeEventListener("app:route", onRoute);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointermove", onFirst);
        document.documentElement.removeEventListener("mouseleave", onLeave);
        document.documentElement.removeEventListener("mouseenter", onEnter);
      };
    },
    { dependencies: [enabled] }
  );

  useEffect(() => {
    window.dispatchEvent(new Event("app:route"));
  }, [pathname]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] hidden opacity-0 lg:block" data-cursor-root>
      <div
        ref={ring}
        className="absolute left-0 top-0 grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-ink/50 will-change-transform"
      >
        <span
          ref={label}
          className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.12em] text-paper opacity-0"
        />
      </div>
      <div
        ref={dot}
        className="absolute left-0 top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink will-change-transform"
      />
    </div>
  );
}
