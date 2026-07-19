"use client";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../lib/utils";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light" | "gold";
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
      "bg-charcoal text-cream shadow-soft hover:-translate-y-0.5 hover:bg-ink hover:shadow-lift",
    secondary:
      "border border-oat bg-transparent text-charcoal shadow-insetLine hover:-translate-y-0.5 hover:border-gold hover:bg-white",
    light:
      "border border-white/24 bg-white/12 text-white shadow-insetLine hover:-translate-y-0.5 hover:bg-white/20",
    gold:
      "bg-gold text-charcoal shadow-gold hover:-translate-y-0.5 hover:bg-[#B8954F]",
  };

  return (
    <a
      href={href}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-6 text-[15px] font-extrabold transition duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-gold/25",
        styles[variant],
        className
      )}
    >
      {children}
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}
