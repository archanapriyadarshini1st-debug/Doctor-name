import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes, type ReactNode } from "react";
import { useHref } from "react-router-dom";
import { cn } from "@/utils/cn";
import { isPlainLeftClick, isRoutePath, useTransitionNav } from "@/lib/transition";

type Variant = "primary" | "secondary" | "ghost" | "inverse";
type Size = "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-3 rounded-full font-sans text-[0.9375rem] font-medium tracking-[-0.005em] " +
  "transition-[transform,background-color,color,border-color,box-shadow] duration-300 ease-[var(--ease-out-expo)] " +
  "active:scale-[0.985] active:duration-100 select-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-paper hover:bg-teal shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]",
  secondary:
    "bg-transparent text-ink border border-line-2 hover:border-ink hover:bg-elevated",
  ghost: "bg-transparent text-ink hover:text-teal px-0",
  inverse: "bg-paper text-ink hover:bg-white",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5",
  lg: "h-13 px-7 text-base",
};

function Arrow() {
  return (
    <span
      aria-hidden
      className="relative grid size-[1.125rem] place-items-center overflow-hidden"
    >
      <svg
        viewBox="0 0 16 16"
        className="absolute size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-[150%] group-hover:-translate-y-[150%]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M3 13 13 3M5 3h8v8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg
        viewBox="0 0 16 16"
        className="absolute size-4 -translate-x-[150%] translate-y-[150%] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0 group-hover:translate-y-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M3 13 13 3M5 3h8v8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

type Common = {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  children: ReactNode;
  className?: string;
};

type ButtonProps = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AnchorProps = Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps | AnchorProps>(
  ({ variant = "primary", size = "md", arrow = false, children, className, ...rest }, ref) => {
    const classes = cn(base, variants[variant], variant !== "ghost" && sizes[size], className);
    // Internal routes ("/about") get a real hash-router href and the curtain transition.
    const rawHref = "href" in rest ? rest.href : undefined;
    const routed = isRoutePath(rawHref);
    const routeHref = useHref(routed ? rawHref : "/");
    const go = useTransitionNav();
    const content = (
      <>
        <span className="swap">
          <span>{children}</span>
          <span aria-hidden>{children}</span>
        </span>
        {arrow && <Arrow />}
      </>
    );
    if ("href" in rest && rest.href !== undefined) {
      const { href, onClick, ...anchorRest } = rest as AnchorProps;
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          href={routed ? routeHref : href}
          onClick={(e) => {
            onClick?.(e);
            if (!routed || e.defaultPrevented || !isPlainLeftClick(e)) return;
            e.preventDefault();
            go(href);
          }}
          {...anchorRest}
        >
          {content}
        </a>
      );
    }
    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} className={classes} {...(rest as ButtonProps)}>
        {content}
      </button>
    );
  }
);
Button.displayName = "Button";
