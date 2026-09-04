/**
 * PAGE TRANSITIONS + ROUTE-AWARE LINKS
 *
 * One ink curtain (same surface as the hero curtain) wipes over the page,
 * the route swaps underneath it, the window is reset to the top, and the
 * curtain lifts. Reduced motion: the route simply swaps.
 */
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";
import { useHref, useLocation, useNavigate } from "react-router-dom";
import { gsap, ScrollTrigger, E, reducedMotion } from "@/lib/motion";
import { doctor } from "@/content/practice";
import { cn } from "@/utils/cn";

type Go = (to: string) => void;
const TransitionContext = createContext<Go>(() => {});

export const useTransitionNav = () => useContext(TransitionContext);

/** Internal route = starts with "/" (hash-only anchors are left to the browser). */
export const isRoutePath = (href?: string): href is string => typeof href === "string" && href.startsWith("/");

export function isPlainLeftClick(e: MouseEvent<HTMLAnchorElement>) {
  return e.button === 0 && !e.metaKey && !e.altKey && !e.ctrlKey && !e.shiftKey && !e.currentTarget.target;
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const curtain = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const busy = useRef(false);

  // GSAP owns the curtain transform from the first paint (no inline CSS
  // transform, which GSAP would otherwise read as a pixel offset).
  useLayoutEffect(() => {
    if (curtain.current) gsap.set(curtain.current, { yPercent: 100, y: 0, autoAlpha: 1 });
  }, []);

  const go = useCallback<Go>(
    (to) => {
      const current = `${location.pathname}${location.hash}`;
      if (to === current || busy.current) return;

      if (reducedMotion() || !curtain.current) {
        navigate(to);
        return;
      }

      busy.current = true;
      const c = curtain.current;
      const l = label.current;
      gsap
        .timeline({
          defaults: { ease: E.inOut },
          onComplete: () => {
            gsap.set(c, { yPercent: 100 });
            busy.current = false;
          },
        })
        .set(c, { yPercent: 100, y: 0, pointerEvents: "auto" })
        .to(c, { yPercent: 0, duration: 0.7 })
        .fromTo(l, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: E.out }, 0.35)
        .add(() => {
          navigate(to);
        })
        // Give React a frame to commit the new route and the ScrollManager to reset scroll.
        .to({}, { duration: 0.12 })
        .to(l, { autoAlpha: 0, y: -8, duration: 0.35, ease: E.soft })
        .to(c, { yPercent: -100, duration: 0.9, ease: E.inOut }, "<0.05")
        .set(c, { pointerEvents: "none" });
    },
    [navigate, location.pathname, location.hash]
  );

  return (
    <TransitionContext.Provider value={go}>
      {children}
      <div
        ref={curtain}
        aria-hidden
        className="pointer-events-none invisible fixed inset-0 z-[95] grid place-items-center bg-ink"
      >
        <span ref={label} className="font-display text-[1.75rem] leading-none tracking-[-0.01em] text-paper opacity-0">
          {doctor.shortName}
        </span>
      </div>
    </TransitionContext.Provider>
  );
}

/**
 * Anchor that routes through the curtain transition.
 * Renders a real hash-router href so it degrades to a normal link.
 */
type RouteLinkProps = { to: string; children: ReactNode; className?: string } & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
>;

export const RouteLink = forwardRef<HTMLAnchorElement, RouteLinkProps>(({ to, children, className, onClick, ...rest }, ref) => {
  const href = useHref(to);
  const go = useTransitionNav();
  return (
    <a
      ref={ref}
      href={href}
      className={cn(className)}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || !isPlainLeftClick(e)) return;
        e.preventDefault();
        go(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
});
RouteLink.displayName = "RouteLink";

/**
 * Resets scroll on route change (instantly, under the curtain), honours
 * in-page hashes, refreshes ScrollTrigger once the new page has painted.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        // Two frames: let masks/reveals mount before measuring.
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            const top = el.getBoundingClientRect().top + window.scrollY - 72;
            window.scrollTo({ top, behavior: "instant" as ScrollBehavior });
          })
        );
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}

/** Sets the document title per page. */
export function usePageTitle(title?: string) {
  useEffect(() => {
    const base = `${doctor.name} — ${doctor.title}, Marylebone`;
    document.title = title ? `${title} · ${doctor.name}` : base;
  }, [title]);
}
