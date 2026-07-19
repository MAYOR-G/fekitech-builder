"use client";
import { useRef, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "../lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
};

export function Reveal({ children, className, delay = 0, direction = "up" }: RevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const getInitialY = () => {
    if (direction === "up") return 40;
    if (direction === "down") return -40;
    return 0;
  };

  const getInitialX = () => {
    if (direction === "left") return 40;
    if (direction === "right") return -40;
    return 0;
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: getInitialY(), x: getInitialX() }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.8, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
