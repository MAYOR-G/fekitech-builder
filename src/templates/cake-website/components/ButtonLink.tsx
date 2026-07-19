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
      "bg-ganache text-cream shadow-soft hover:-translate-y-0.5 hover:bg-chocolate hover:shadow-card",
    secondary:
      "border border-chocolate/15 bg-white/76 text-chocolate shadow-insetLine hover:-translate-y-0.5 hover:border-rose/35 hover:bg-white",
    light:
      "border border-white/25 bg-white/12 text-white shadow-insetLine hover:-translate-y-0.5 hover:bg-white/20",
  };

  return (
    <a
      href={href}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-extrabold transition duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-rose/25",
        styles[variant],
        className
      )}
    >
      {children}
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}
