"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, PenTool, ShieldCheck, Clock } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "AWARD-WINNING ARTISTS",
    description: "Internationally recognised, convention-featured talent.",
  },
  {
    icon: PenTool,
    title: "CUSTOM DESIGNS",
    description: "Every piece drawn from scratch, never duplicated.",
  },
  {
    icon: ShieldCheck,
    title: "STERILE STUDIO",
    description: "Hospital-grade hygiene, single-use needles, fully licensed.",
  },
  {
    icon: Clock,
    title: "WALK-INS WELCOME",
    description: "Flash designs available daily, no appointment needed.",
  },
];

export default function TrustBar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemsRef.current,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="w-full bg-[#0A0A0A] border-t border-white/5 relative z-10"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              ref={(el) => {
                itemsRef.current[idx] = el;
              }}
              className="group flex flex-col items-start gap-4 relative"
            >
              <feature.icon className="w-8 h-8 text-[#C9A84C] opacity-80 group-hover:opacity-100 transition-opacity duration-300" strokeWidth={1.5} />
              
              <h3 className="font-display tracking-widest text-lg text-white">
                {feature.title}
              </h3>
              
              <p className="text-sm text-[#6B6B6B] leading-relaxed max-w-[280px]">
                {feature.description}
              </p>

              {/* Animated underline */}
              <div className="absolute -bottom-6 left-0 w-full h-[1px] bg-white/5 overflow-hidden">
                <div className="w-full h-full bg-[#C9A84C] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-700 ease-[0.76,0,0.24,1]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
