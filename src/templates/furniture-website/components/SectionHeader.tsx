"use client";
import { cn } from "../lib/utils";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  theme = "light",
  className,
}: SectionHeaderProps) {
  const isDark = theme === "dark";
  
  return (
    <div
      className={cn(
        "mx-auto max-w-3xl",
        align === "center" && "flex flex-col items-center text-center",
        className
      )}
    >
      <p className="mb-4 font-mono text-[11px] font-extrabold uppercase tracking-[0.15em] text-amber">
        {eyebrow}
      </p>
      <h2 className={cn(
        "font-display text-[40px] font-semibold leading-[1.1] sm:text-5xl lg:text-[56px] lg:leading-[1.05]",
        isDark ? "text-white" : "text-charcoal"
      )}>
        {title}
      </h2>
      <p className={cn(
        "mt-6 font-sans text-[16px] leading-[1.7]",
        isDark ? "text-white/80" : "text-slate",
        align === "center" && "max-w-2xl"
      )}>
        {description}
      </p>
    </div>
  );
}
