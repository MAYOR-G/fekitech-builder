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
  const isLight = tone === "light";

  return (
    <div
      className={cn(
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        className
      )}
    >
      <p
        className={cn(
          "mb-4 text-xs font-extrabold uppercase tracking-[0.22em]",
          isLight ? "text-ember" : "text-flame"
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "font-display text-4xl font-semibold leading-[1.02] sm:text-5xl lg:text-[3.5rem]",
          isLight ? "text-cream" : "text-coal"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-5 text-base leading-8 sm:text-lg",
            isLight ? "text-cream/68" : "text-graphite/72"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
