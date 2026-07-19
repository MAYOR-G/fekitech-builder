"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useState } from "react";

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="gradient-bg relative z-50 flex w-full items-center justify-center px-12 py-2.5 text-white"
         style={{ minHeight: "40px" }}>
      <div className="flex-1 flex justify-center items-center gap-3 text-center">
        <span className="text-xs font-semibold tracking-[0.02em]">
          Explore templates and customize your website before choosing a publishing plan.
        </span>
        <Link
          href="/pricing"
          className="text-xs font-bold uppercase tracking-[0.05em] underline underline-offset-2 hover:opacity-80 transition-opacity whitespace-nowrap"
        >
          View plans →
        </Link>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 flex min-h-9 min-w-9 items-center justify-center rounded-lg text-white/75 transition-colors hover:bg-white/10 hover:text-white sm:right-4"
        aria-label="Close announcement"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
