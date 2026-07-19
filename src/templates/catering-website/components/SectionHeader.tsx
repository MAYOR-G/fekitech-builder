"use client";
import { cn } from "../lib/utils";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  dark?: boolean;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  dark = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        align === "center" ? "mx-auto max-w-4xl text-center" : "max-w-3xl",
        className
      )}
    >
      <p
        className={cn(
          "mb-6 text-xs font-bold uppercase tracking-[0.25em]",
          dark ? "text-gold" : "text-gold"
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "font-display text-5xl font-medium leading-[1.04] tracking-[-0.01em] sm:text-6xl",
          dark ? "text-ivory" : "text-charcoal"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-6 text-base leading-[1.75] sm:text-lg",
            align === "center" && "mx-auto max-w-2xl",
            dark ? "text-cream/80" : "text-ink"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
