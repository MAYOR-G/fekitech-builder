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
      "bg-halcyon-table-ember text-halcyon-table-coal shadow-halcyon-table-ember hover:-translate-y-0.5 hover:bg-[#ffb35c]",
    outline:
      "border border-halcyon-table-cream/18 bg-halcyon-table-cream/[0.06] text-halcyon-table-cream hover:-translate-y-0.5 hover:border-halcyon-table-ember/50 hover:bg-halcyon-table-cream/[0.1]",
    dark:
      "bg-halcyon-table-coal text-halcyon-table-cream shadow-card hover:-translate-y-0.5 hover:bg-halcyon-table-graphite",
    light:
      "border border-halcyon-table-coal/12 bg-halcyon-table-bone text-halcyon-table-coal shadow-card hover:-translate-y-0.5 hover:bg-halcyon-table-cream",
  };

  return (
    <a
      href={href}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-extrabold transition duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-halcyon-table-ember/30",
        styles[variant],
        className
      )}
    >
      {children}
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}
