"use client";
import { cn } from "../lib/utils";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        className
      )}
    >
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-bronze">
        {eyebrow}
      </p>
      <h2 className="font-display text-4xl leading-[1.06] text-onyx sm:text-5xl lg:text-[3.45rem]">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-8 text-charcoal/80 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
