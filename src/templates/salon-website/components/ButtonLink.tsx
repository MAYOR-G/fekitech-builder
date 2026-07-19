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
      "bg-plum text-pearl shadow-plum hover:-translate-y-0.5 hover:bg-grape",
    secondary:
      "border border-plum/12 bg-pearl text-plum shadow-card hover:-translate-y-0.5 hover:border-rose/38",
    light:
      "border border-white/24 bg-white/12 text-white shadow-insetLine hover:-translate-y-0.5 hover:bg-white/18",
  };

  return (
    <a
      href={href}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-extrabold transition duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-rose/28",
        styles[variant],
        className
      )}
    >
      {children}
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}
