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
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <p
        className={cn(
          "text-xs font-bold uppercase tracking-[0.24em]",
          tone === "light" ? "text-mint" : "text-ocean"
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-4 font-display text-4xl font-semibold leading-[1.02] sm:text-5xl",
          tone === "light" ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-5 text-base leading-8 sm:text-lg",
            tone === "light" ? "text-white/72" : "text-graphite/72"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
