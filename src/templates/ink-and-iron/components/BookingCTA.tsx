"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function BookingCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(textRef.current, {
        backgroundPosition: "200% center",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="w-full relative py-32 md:py-48 flex items-center justify-center overflow-hidden bg-[#141414] border-t border-b border-white/5 z-10"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/tattoo_sample_3_1783070788098.png"
          alt="Abstract geometric backpiece"
          fill
          className="object-cover object-center opacity-10"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#141414] via-transparent to-[#141414]" />
      </div>

      <div className="relative z-10 max-w-[1000px] mx-auto px-6 text-center flex flex-col items-center">
        <h2 
          ref={textRef}
          className="font-display text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight uppercase bg-clip-text text-transparent bg-[linear-gradient(to_right,#FFFFFF_0%,#FFFFFF_45%,#8B2635_50%,#FFFFFF_55%,#FFFFFF_100%)] bg-[length:200%_auto] mb-8"
        >
          READY FOR NEW INK?
        </h2>
        <p className="text-[#F5F5F5]/70 text-base md:text-lg max-w-xl mx-auto mb-12">
          Consultations are free. Our artists are ready to turn your vision into a permanent masterpiece. Walk-ins available daily.
        </p>
        
        <button className="group relative w-full sm:w-auto bg-[#C9A84C] text-[#141414] px-12 py-5 font-bold tracking-widest text-sm uppercase overflow-hidden">
          <span className="relative z-10 group-hover:text-white transition-colors duration-300">
            Secure Your Spot
          </span>
          <div className="absolute inset-0 h-full w-full bg-[#8B2635] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.76,0,0.24,1]" />
        </button>
      </div>
    </section>
  );
}
