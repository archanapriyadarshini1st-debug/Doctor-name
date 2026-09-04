import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

export function Eyebrow({
  children,
  className,
  dark,
  ...rest
}: { children: ReactNode; className?: string; dark?: boolean } & HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-eyebrow flex items-center gap-3", dark ? "text-paper/60" : "text-muted", className)} {...rest}>
      <span aria-hidden className={cn("inline-block h-px w-6", dark ? "bg-paper/40" : "bg-teal")} />
      {children}
    </p>
  );
}

/**
 * Editorial section header: eyebrow + numeral on the left rail, headline on the right.
 * Keeps every section on the same 12-column rhythm.
 */
export function SectionHeader({
  index,
  eyebrow,
  headline,
  copy,
  dark,
  className,
}: {
  index: string;
  eyebrow: string;
  headline: ReactNode;
  copy?: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-12 gap-x-6 gap-y-8", className)}>
      <div className="col-span-12 flex items-start justify-between lg:col-span-3 lg:block">
        <Eyebrow dark={dark} data-reveal>{eyebrow}</Eyebrow>
        <span
          data-reveal
          className={cn("text-meta lg:mt-6 lg:block", dark ? "text-paper/40" : "text-muted-2")}
        >
          ({index})
        </span>
      </div>
      <div className="col-span-12 lg:col-span-8 lg:col-start-5">
        <h2 data-reveal className={cn("text-h2 text-balance max-w-[16ch]", dark ? "text-paper" : "text-ink")}>
          {headline}
        </h2>
        {copy && (
          <p data-reveal className={cn("text-lead mt-6 max-w-[52ch]", dark ? "text-paper/70" : "text-muted")}>
            {copy}
          </p>
        )}
      </div>
    </div>
  );
}
