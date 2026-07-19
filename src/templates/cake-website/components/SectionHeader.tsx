"use client";
import { cn } from "../lib/utils";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
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
        "mx-auto max-w-3xl",
        align === "center" && "text-center",
        className
      )}
    >
      <p className="mb-4 text-[0.68rem] font-bold uppercase tracking-[0.3em] text-rose/90">
        {eyebrow}
      </p>
      <h2 className="font-display text-4xl font-normal leading-[1.05] tracking-tight text-ganache sm:text-5xl lg:text-[4rem]">
        {title}
      </h2>
      <p className="mt-6 text-base leading-[1.8] tracking-wide text-[#2D2D2D] sm:text-[1.05rem]">
        {description}
      </p>
    </div>
  );
}
