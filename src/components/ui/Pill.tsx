import { cn } from "@/lib/utils";
import React from "react";

interface PillProps {
  className?: string;
  children: React.ReactNode;
}

export function Pill({ className, children }: PillProps) {
  return (
    <div
      className={cn(
        "rounded-full border border-white/80 bg-white/70 px-4 py-2 text-xs font-semibold text-ft-primary shadow-[0_10px_28px_rgba(49,70,211,0.08)] backdrop-blur",
        className
      )}
    >
      {children}
    </div>
  );
}
