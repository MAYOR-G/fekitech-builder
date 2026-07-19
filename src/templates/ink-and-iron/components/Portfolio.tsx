"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Using the generated images for the portfolio
const portfolioItems = [
  { src: "/images/tattoo_sample_1_1783070771588.png", title: "Black & Grey Skull", style: "Realism" },
  { src: "/images/tattoo_sample_2_1783070780082.png", title: "Neo-Trad Tiger", style: "Color" },
  { src: "/images/tattoo_sample_3_1783070788098.png", title: "Geometric Backpiece", style: "Blackwork" },
  { src: "/images/tattoo_sample_4_1783070797647.png", title: "Fine Line Floral", style: "Minimalist" },
  { src: "/images/tattoo_sample_5_1783070809116.png", title: "Irezumi Sleeve", style: "Japanese" },
  { src: "/images/tattoo_sample_6_1783070818660.png", title: "Wolf Portrait", style: "Realism" },
];

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Fade up gallery items
      gsap.fromTo(
        itemsRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 80%",
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
      className="w-full bg-[#141414] py-24 md:py-32 relative z-10"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-[1px] bg-[#C9A84C]" />
            <span className="text-[#C9A84C] font-semibold tracking-[0.2em] text-xs uppercase">
              Our Work
            </span>
            <span className="w-12 h-[1px] bg-[#C9A84C]" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-7xl leading-[1.1] text-white tracking-tight uppercase">
            Featured <span className="text-[#8B2635]">Ink</span>
          </h2>
        </div>

        <div 
          ref={galleryRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {portfolioItems.map((item, idx) => (
            <div 
              key={idx}
              ref={(el) => {
                itemsRef.current[idx] = el;
              }}
              className="group relative aspect-[4/5] overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/10 transition-colors duration-700" />
              
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover object-center scale-100 group-hover:scale-110 transition-transform duration-1000 ease-[0.25,0.46,0.45,0.94]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              
              {/* Overlay Content */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                <p className="text-[#C9A84C] font-semibold tracking-[0.2em] text-xs uppercase mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {item.style}
                </p>
                <h3 className="font-display text-2xl text-white tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <button className="group relative bg-transparent border border-white/20 text-white px-10 py-5 font-bold tracking-widest text-xs uppercase overflow-hidden hover:border-white/50 transition-colors">
            <span className="relative z-10 group-hover:text-[#141414] transition-colors duration-300">
              View Full Gallery
            </span>
            <div className="absolute inset-0 h-full w-full bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.76,0,0.24,1]" />
          </button>
        </div>

      </div>
    </section>
  );
}
