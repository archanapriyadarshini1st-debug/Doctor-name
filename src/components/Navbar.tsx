import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import { gsap, useGSAP, ScrollTrigger, MQ, D, E } from "@/lib/motion";
import { doctor, nav, contact } from "@/content/practice";
import { Button } from "./ui/Button";
import { RouteLink } from "@/lib/transition";
import { cn } from "@/utils/cn";

export function Navbar() {
  const root = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const active = pathname;

  // New page: bring the bar back into view and close any open menu.
  useEffect(() => {
    setOpen(false);
    const el = root.current;
    // Only touch the transform when the bar is actually tucked away, so the
    // header never becomes a containing block for fixed descendants by default.
    if (el && Number(gsap.getProperty(el, "yPercent")) !== 0) {
      gsap.to(el, { yPercent: 0, duration: D.fast, ease: E.out, overwrite: "auto" });
    }
  }, [pathname]);

  // Hide on scroll down, reveal on scroll up. Solid surface once scrolled.
  useGSAP(
    () => {
      const el = root.current!;
      const show = gsap.quickTo(el, "yPercent", { duration: D.fast + 0.1, ease: E.out });
      ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          const y = self.scroll();
          setScrolled(y > 24);
          if (open) return;
          if (self.direction === 1 && y > 200) show(-100);
          else show(0);
        },
      });
    },
    { scope: root, dependencies: [open] }
  );

  // Mobile menu transition
  useGSAP(
    () => {
      if (!panel.current) return;
      const links = panel.current.querySelectorAll("[data-menu-item]");
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        if (open) {
          gsap.set(panel.current, { display: "flex" });
          gsap.timeline()
            .fromTo(panel.current, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: E.outExpo })
            .fromTo(links, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, ease: E.out, stagger: 0.06 }, 0.2);
        } else {
          gsap.timeline({ onComplete: () => gsap.set(panel.current, { display: "none" }) })
            .to(links, { y: -16, autoAlpha: 0, duration: 0.3, ease: E.soft, stagger: 0.03 })
            .to(panel.current, { clipPath: "inset(0 0 100% 0)", duration: 0.5, ease: E.inOut }, 0.1);
        }
      });
      mm.add(MQ.reduced, () => {
        gsap.set(panel.current, { display: open ? "flex" : "none", clipPath: "none" });
        gsap.set(links, { autoAlpha: 1, y: 0 });
      });
    },
    { dependencies: [open] }
  );

  // Escape closes, lock scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      ref={root}
      data-intro="nav"
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500",
        scrolled && !open ? "bg-paper/85 backdrop-blur-md border-b border-line/70" : "border-b border-transparent"
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <nav aria-label="Primary" className="container-x flex h-[var(--nav-h)] items-center justify-between">
        <RouteLink to="/" className="group flex items-baseline gap-2 text-ink" aria-label={`${doctor.name} — home`}>
          <span className="font-display text-[1.375rem] leading-none tracking-[-0.01em]">{doctor.shortName}</span>
          <span className="text-meta hidden text-muted sm:inline">/ {doctor.title}</span>
        </RouteLink>

        <ul className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <RouteLink
                to={item.href}
                aria-current={active === item.href ? "page" : undefined}
                className={cn(
                  "link-draw text-[0.875rem] tracking-[-0.005em] transition-colors duration-300",
                  active === item.href ? "text-ink" : "text-muted hover:text-ink"
                )}
              >
                {item.label}
              </RouteLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={contact.phoneHref}
            className="link-draw text-meta hidden text-muted hover:text-ink xl:inline"
          >
            {contact.phone}
          </a>
          <Button href="/appointments" size="md" className="hidden sm:inline-flex" data-cursor="Book">
            Book an appointment
          </Button>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="relative grid size-11 place-items-center rounded-full border border-line-2 bg-paper/60 lg:hidden"
          >
            <span
              className={cn(
                "absolute h-px w-5 bg-ink transition-transform duration-500 ease-[var(--ease-out-expo)]",
                open ? "rotate-45" : "-translate-y-[3px]"
              )}
            />
            <span
              className={cn(
                "absolute h-px w-5 bg-ink transition-transform duration-500 ease-[var(--ease-out-expo)]",
                open ? "-rotate-45" : "translate-y-[3px]"
              )}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu panel — portalled so a transformed header never becomes its containing block */}
      {createPortal(
        <div
          id="mobile-menu"
          ref={panel}
          className="fixed inset-0 top-0 z-40 hidden flex-col bg-paper pt-[var(--nav-h)] lg:hidden"
          style={{ display: "none" }}
          aria-hidden={!open}
        >
          <div className="container-x flex flex-1 flex-col justify-between pb-8 pt-6">
            <ul className="flex flex-col">
              {nav.map((item, i) => (
                <li key={item.href} data-menu-item className="border-b border-line">
                  <RouteLink
                    to={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.href ? "page" : undefined}
                    className="flex items-baseline justify-between py-5 text-h3 text-ink"
                  >
                    <span>{item.label}</span>
                    <span className="text-meta text-muted-2">0{i + 1}</span>
                  </RouteLink>
                </li>
              ))}
            </ul>
            <div data-menu-item className="mt-10 flex flex-col gap-6">
              <Button href="/appointments" size="lg" arrow onClick={() => setOpen(false)}>
                Book an appointment
              </Button>
              <div className="flex flex-col gap-1 text-body text-muted">
                <a href={contact.phoneHref} className="link-draw self-start text-ink">
                  {contact.phone}
                </a>
                <a href={`mailto:${contact.email}`} className="link-draw self-start">
                  {contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
