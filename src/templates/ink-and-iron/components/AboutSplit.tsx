"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function AboutSplit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Image Parallax
      gsap.to(imageRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: imageContainerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Text Reveal
      const texts = gsap.utils.toArray(".reveal-text");
      gsap.fromTo(
        texts,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textContainerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
      
      // Line expand
      gsap.fromTo(
        ".reveal-line",
        { scaleX: 0 },
        { 
          scaleX: 1, 
          duration: 1.5, 
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: textContainerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          }
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
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left: Image with Parallax */}
          <div 
            ref={imageContainerRef}
            className="w-full lg:w-1/2 aspect-[4/5] md:aspect-square lg:aspect-[4/5] relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-colors duration-700" />
            <Image
              ref={imageRef}
              src="/images/studio.png"
              alt="Ink and Iron Studio Interior"
              fill
              className="object-cover object-center scale-110"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Corner Accents */}
            <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-[#C9A84C]/50 z-20" />
            <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-[#C9A84C]/50 z-20" />
          </div>

          {/* Right: Text Content */}
          <div ref={textContainerRef} className="w-full lg:w-1/2 flex flex-col justify-center">
            
            <div className="flex items-center gap-4 mb-8 overflow-hidden">
              <span className="w-12 h-[1px] bg-[#C9A84C] origin-left reveal-line" />
              <span className="text-[#C9A84C] font-semibold tracking-[0.2em] text-xs uppercase reveal-text">
                The Studio
              </span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-white mb-8 tracking-tight">
              <span className="block overflow-hidden pb-2">
                <span className="block reveal-text">WHERE REBELLION</span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span className="block reveal-text text-[#8B2635]">MEETS REFINEMENT.</span>
              </span>
            </h2>

            <div className="space-y-6 text-[#F5F5F5]/70 text-sm md:text-base leading-relaxed mb-12 max-w-lg">
              <p className="reveal-text">
                Located in the underground heart of London, Ink & Iron is more than a tattoo parlor—it&apos;s a sanctuary for the bold. We believe that true art demands commitment, and our artists are dedicated to executing every piece with unyielding precision.
              </p>
              <p className="reveal-text">
                From intricate blackwork and geometric patterns to vibrant neo-traditional and hyper-realism, our award-winning resident artists transform skin into lifelong masterpieces.
              </p>
            </div>

            <div className="overflow-hidden">
              <button className="group flex items-center gap-4 reveal-text">
                <span className="text-white font-bold tracking-widest text-xs uppercase group-hover:text-[#C9A84C] transition-colors duration-300">
                  Discover Our Story
                </span>
                <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#C9A84C] group-hover:bg-[#C9A84C] transition-all duration-300">
                  <ArrowRight className="w-4 h-4 text-white group-hover:text-[#141414] -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
