"use client";
import { cn } from "../lib/utils";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className,
}: SectionHeaderProps) {
  const light = tone === "light";

  return (
    <div
      className={cn(
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        className
      )}
    >
      <p
        className={cn(
          "mb-4 text-xs font-black uppercase tracking-[0.24em]",
          light ? "text-champagne" : "text-rose"
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "font-display text-4xl font-semibold leading-[1.02] text-plum sm:text-5xl lg:text-[3.45rem]",
          light && "text-pearl"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-5 text-base leading-8 sm:text-lg",
            light ? "text-pearl/72" : "text-mink/72"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
