import React from "react";

export default function DripDivider({ 
  color = "#ffffff", 
  bgColor = "transparent",
  direction = "down" 
}: { 
  color?: string; 
  bgColor?: string;
  direction?: "up" | "down" 
}) {
  return (
    <div 
      className={`w-full leading-none z-10 relative ${direction === "down" ? "-mt-[1px] -mb-[1px]" : "-mb-[1px] -mt-[1px]"}`}
      style={{
        transform: direction === "up" ? "rotate(180deg)" : "none",
        backgroundColor: bgColor,
      }}
    >
      <svg 
        viewBox="0 0 1200 40" 
        preserveAspectRatio="none" 
        className="w-full h-8 md:h-12 block"
        style={{ fill: color }}
      >
        <path d="M0,20 Q30,40 60,20 T120,20 T180,20 T240,20 T300,20 T360,20 T420,20 T480,20 T540,20 T600,20 T660,20 T720,20 T780,20 T840,20 T900,20 T960,20 T1020,20 T1080,20 T1140,20 T1200,20 V0 H0 Z"></path>
      </svg>
    </div>
  );
}
