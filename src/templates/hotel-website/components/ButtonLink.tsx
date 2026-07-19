"use client";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../lib/utils";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light" | "bronze";
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: ButtonLinkProps) {
  const styles = {
    primary:
      "bg-onyx text-alabaster shadow-deep hover:-translate-y-0.5 hover:bg-slate",
    secondary:
      "border border-charcoal/12 bg-pureWhite text-charcoal shadow-card hover:-translate-y-0.5 hover:border-bronze/45",
    light:
      "border border-white/22 bg-white/12 text-white shadow-insetLine hover:-translate-y-0.5 hover:bg-white/18",
    bronze:
      "bg-bronze text-pureWhite shadow-card hover:-translate-y-0.5 hover:bg-bronze/90",
  };

  return (
    <a
      href={href}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-bold transition duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-champagne/28",
        styles[variant],
        className
      )}
    >
      {children}
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}
