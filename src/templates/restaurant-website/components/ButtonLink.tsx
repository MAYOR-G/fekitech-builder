"use client";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../lib/utils";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "amber" | "outline" | "dark" | "light";
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "amber",
  className,
}: ButtonLinkProps) {
  const styles = {
    amber:
      "bg-ember text-coal shadow-ember hover:-translate-y-0.5 hover:bg-[#ffb35c]",
    outline:
      "border border-cream/18 bg-cream/[0.06] text-cream hover:-translate-y-0.5 hover:border-ember/50 hover:bg-cream/[0.1]",
    dark:
      "bg-coal text-cream shadow-card hover:-translate-y-0.5 hover:bg-graphite",
    light:
      "border border-coal/12 bg-bone text-coal shadow-card hover:-translate-y-0.5 hover:bg-cream",
  };

  return (
    <a
      href={href}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-extrabold transition duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-ember/30",
        styles[variant],
        className
      )}
    >
      {children}
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}
