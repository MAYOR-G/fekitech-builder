"use client";
import { ArrowUpRight } from "lucide-react";
import {
  useRef,
  type AnchorHTMLAttributes,
  type PointerEvent,
  type ReactNode,
} from "react";
import { cn } from "../lib/utils";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light";
};

const variantStyles = {
  primary:
    "bg-ink text-porcelain shadow-soft hover:bg-[#0b1d20] focus-visible:ring-ocean/25",
  secondary:
    "border border-ink/12 bg-white/72 text-ink shadow-insetGlow hover:border-ocean/30 hover:bg-white focus-visible:ring-ocean/18",
  light:
    "border border-white/46 bg-white/72 text-ink shadow-insetGlow backdrop-blur-xl hover:bg-white focus-visible:ring-white/45",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  onPointerMove,
  onPointerLeave,
  ...props
}: ButtonLinkProps) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  const handlePointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    onPointerMove?.(event);
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.13;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.16;
    node.style.setProperty("--magnet-x", `${x}px`);
    node.style.setProperty("--magnet-y", `${y}px`);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLAnchorElement>) => {
    onPointerLeave?.(event);
    const node = ref.current;
    if (!node) return;
    node.style.setProperty("--magnet-x", "0px");
    node.style.setProperty("--magnet-y", "0px");
  };

  return (
    <a
      ref={ref}
      href={href}
      className={cn(
        "magnetic-link inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-[background-color,border-color,box-shadow,color,transform] duration-300 ease-out focus:outline-none focus-visible:ring-4",
        variantStyles[variant],
        className
      )}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...props}
    >
      {children}
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}
