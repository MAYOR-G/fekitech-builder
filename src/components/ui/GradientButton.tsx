import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export function GradientButton({ href, className, children, ...props }: GradientButtonProps) {
  if (href) {
    return (
      <Link href={href} className={cn("btn-gradient", className)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cn("btn-gradient", className)} {...props}>
      {children}
    </button>
  );
}
