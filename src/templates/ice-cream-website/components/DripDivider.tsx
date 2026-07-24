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
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none" 
        className="w-full h-12 md:h-20 lg:h-28 block"
        style={{ fill: color }}
      >
        <path d="M0,0 V30 C40,30 50,90 80,90 C110,90 120,30 160,30 C200,30 210,110 240,110 C270,110 280,40 320,40 C350,40 360,70 390,70 C420,70 430,20 470,20 C510,20 520,100 550,100 C580,100 590,30 630,30 C670,30 680,80 710,80 C740,80 750,40 790,40 C830,40 840,120 870,120 C900,120 910,20 950,20 C990,20 1000,80 1030,80 C1060,80 1070,30 1110,30 C1140,30 1150,60 1180,60 C1190,60 1195,45 1200,30 V0 Z"></path>
      </svg>
    </div>
  );
}
