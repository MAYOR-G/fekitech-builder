"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

const services = [
  {
    number: "01",
    title: "CUSTOM TATTOOS",
    description: "From striking black and grey realism to bold neo-traditional. We work with you to design a unique piece that fits your body perfectly.",
  },
  {
    number: "02",
    title: "EXPERT PIERCING",
    description: "Professional body piercing using only implant-grade titanium and gold jewelry. Safe, sterile, and perfectly placed.",
  },
  {
    number: "03",
    title: "LASER REMOVAL",
    description: "Advanced laser technology for fading or complete removal. Make room for new art with our safe, effective treatments.",
  },
  {
    number: "04",
    title: "AFTERCARE & JEWELRY",
    description: "Premium aftercare products and a curated selection of high-end body jewelry from the world's best manufacturers.",
  }
];

export default function ServicesPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemsRef.current,
        {
          y: 60,
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
            start: "top 75%",
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
      className="w-full bg-[#0A0A0A] py-24 md:py-32 relative z-10"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-[1px] bg-[#C9A84C]" />
              <span className="text-[#C9A84C] font-semibold tracking-[0.2em] text-xs uppercase">
                Our Expertise
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-white tracking-tight">
              SERVICES
            </h2>
          </div>
          <button className="group flex items-center gap-4">
            <span className="text-white font-bold tracking-widest text-xs uppercase group-hover:text-[#C9A84C] transition-colors duration-300">
              View All Services
            </span>
            <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#C9A84C] group-hover:bg-[#C9A84C] transition-all duration-300">
              <ArrowRight className="w-4 h-4 text-white group-hover:text-[#141414] -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {services.map((service, idx) => (
            <div 
              key={idx}
              ref={(el) => {
                itemsRef.current[idx] = el;
              }}
              className="group relative flex flex-col pt-8 border-t border-white/10 hover:border-[#C9A84C]/50 transition-colors duration-500 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="font-display text-2xl md:text-3xl tracking-wide text-white group-hover:text-[#C9A84C] transition-colors duration-500">
                  {service.title}
                </h3>
                <span className="font-display text-xl text-white/20 group-hover:text-[#C9A84C]/50 transition-colors duration-500">
                  {service.number}
                </span>
              </div>
              <p className="text-[#F5F5F5]/70 text-sm md:text-base leading-relaxed max-w-[90%]">
                {service.description}
              </p>
              
              <div className="absolute top-0 left-0 w-0 h-[1px] bg-[#C9A84C] group-hover:w-full transition-all duration-700 ease-[0.76,0,0.24,1]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
