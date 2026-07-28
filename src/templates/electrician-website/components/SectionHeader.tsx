"use client";
import { cn } from "../lib/utils";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
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
          "mb-4 text-xs font-black uppercase tracking-[0.2em]",
          light ? "text-spark-electric-safety" : "text-spark-electric-cobalt"
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "font-spark-electric-display text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-5xl lg:text-[3.45rem]",
          light ? "text-white" : "text-spark-electric-navy"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-5 text-base leading-8 sm:text-lg",
            light ? "text-white/70" : "text-spark-electric-steel/72"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
