"use client";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../lib/utils";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light";
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
      "bg-charcoal text-ivory shadow-soft hover:-translate-y-0.5 hover:bg-[#1d1814] hover:shadow-card",
    secondary:
      "border border-charcoal/15 bg-white/55 text-charcoal shadow-insetGlow hover:-translate-y-0.5 hover:border-bronze/35 hover:bg-white",
    light:
      "border border-white/25 bg-white/12 text-white shadow-insetGlow hover:-translate-y-0.5 hover:bg-white/18",
  };

  return (
    <a
      href={href}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-bold transition duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-bronze/25",
        styles[variant],
        className
      )}
    >
      {children}
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}
