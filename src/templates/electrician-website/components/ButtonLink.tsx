"use client";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../lib/utils";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark" | "yellow";
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
      "bg-spark-electric-cobalt text-white shadow-blue hover:-translate-y-0.5 hover:bg-[#0057df]",
    secondary:
      "border border-spark-electric-cobalt/18 bg-white text-spark-electric-ink shadow-card hover:-translate-y-0.5 hover:border-spark-electric-cobalt/38 hover:text-spark-electric-cobalt",
    dark:
      "bg-spark-electric-navy text-white shadow-deep hover:-translate-y-0.5 hover:bg-spark-electric-midnight",
    yellow:
      "bg-spark-electric-safety text-spark-electric-navy shadow-card hover:-translate-y-0.5 hover:bg-[#ffe36d]",
  };

  return (
    <a
      href={href}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 text-[15px] font-extrabold transition duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-spark-electric-cobalt/25",
        styles[variant],
        className
      )}
    >
      {children}
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}
