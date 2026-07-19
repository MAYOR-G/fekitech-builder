"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { ChevronRight } from 'lucide-react';
import { useTemplateData } from "./TemplateContext";
import './index.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const content = useTemplateData();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Hero Animations
    const tl = gsap.timeline();
    tl.fromTo('.hero-title', 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.2 }
    );
    tl.fromTo('.hero-subtitle',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      "-=0.8"
    );

    // Pinned Layout Animation
    const pinnedSection = document.querySelector('.pinned-section');
    const rightContent = document.querySelector('.scroll-content');
    
    if (pinnedSection && rightContent) {
      ScrollTrigger.create({
        trigger: pinnedSection,
        start: 'top top',
        end: () => `+=${rightContent.scrollHeight - window.innerHeight}`,
        pin: '.left-pin',
        pinSpacing: false,
      });
    }

    // Card Stacking Physics
    // NOTE: previously used pin: true + pinSpacing: false which caused overlap
    // inside the editor canvas (overflow-y-auto) and broken stacking on mobile.
    // The scale/opacity scrub provides the stacking effect without pinning.
    const cards = gsap.utils.toArray<HTMLElement>('.stack-card');
    cards.forEach((card, i) => {
      gsap.to(card, {
        scale: 1 - (cards.length - i) * 0.05,
        opacity: 0.5,
        scrollTrigger: {
          trigger: card,
          start: 'top 20%',
          end: 'bottom top',
          scrub: true,
        }
      });
    });

    // Reveal animations
    gsap.utils.toArray<HTMLElement>('.reveal-up').forEach((elem) => {
      gsap.fromTo(elem, 
        { y: 50, opacity: 0 },
        {
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: elem,
            start: 'top 85%',
          }
        }
      );
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const services = [
    { name: "The Standard Cut", desc: "Precision scissor or clipper work.", price: "$45" },
    { name: "Zero Fade", desc: "Skin tight precision fade.", price: "$55" },
    { name: "Beard Trim", desc: "Sculpted beard with razor line up.", price: "$30" },
    { name: "The Works", desc: "Haircut, beard, and hot towel finish.", price: "$80" }
  ];

  return (
    <main ref={containerRef} className="relative w-full bg-brand-bg text-brand-text selection:bg-brand-accent selection:text-white">
      {/* Minimal Split Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference border-b border-white/10">
        <div className="w-full px-6 py-4 flex items-center justify-between">
          <div className="font-black text-2xl tracking-tighter text-white">BLACKWOOD</div>
          <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest text-white">
            <a href="#services" className="hover:text-brand-accent transition-colors">SERVICES</a>
            <a href="#pricing" className="hover:text-brand-accent transition-colors">PRICING</a>
          </div>
          <a href="#book" className="text-xs font-bold tracking-widest bg-white text-black px-6 py-2 hover:bg-brand-accent hover:text-white transition-colors uppercase">{content.hero.button}</a>
        </div>
      </nav>

      {/* Cinematic Center Hero */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <TemplateImage 
            src="https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?q=80&w=2000&auto=format&fit=crop" 
            alt="Dark Barber Studio" 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/60 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,var(--color-brand-bg)_100%)]"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl w-full flex flex-col items-center mt-20">
          <div className="overflow-hidden mb-6">
            <h1 className="hero-title text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.85] text-balance text-white">
              {content.hero.title}
            </h1>
          </div>
          <p className="hero-subtitle text-lg md:text-2xl text-brand-text/70 font-medium max-w-2xl mx-auto uppercase tracking-widest">
            {content.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Infinite Marquee */}
      <div className="w-full border-y border-brand-text/10 py-4 overflow-hidden bg-brand-surface relative z-10 flex">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center mx-8">
              <span className="text-sm font-bold tracking-widest uppercase text-brand-text/50">Flawless Fades</span>
              <span className="mx-8 text-brand-accent">/</span>
              <span className="text-sm font-bold tracking-widest uppercase text-brand-text/50">Straight Razor</span>
              <span className="mx-8 text-brand-accent">/</span>
              <span className="text-sm font-bold tracking-widest uppercase text-brand-text/50">Master Barbers</span>
              <span className="mx-8 text-brand-accent">/</span>
            </div>
          ))}
        </div>
      </div>

      {/* GSAP Pinned Split Layout */}
      <section id="services" className="pinned-section relative w-full bg-brand-bg">
        <div className="flex flex-col lg:flex-row w-full max-w-[1600px] mx-auto relative">
          
          {/* Left Pinned Area */}
          <div className="left-pin w-full lg:w-1/2 h-screen flex flex-col justify-center px-6 md:px-16 border-r border-brand-text/10">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] uppercase">
              The<br/><span className="text-brand-accent">Menu</span>
            </h2>
            <p className="mt-8 text-brand-text/70 max-w-md text-lg font-medium">
              {content.about.text}
            </p>
            <div className="mt-12 hidden lg:block">
              <TemplateImage src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop" alt="Barber Tools" className="w-full max-w-[400px] h-[300px] object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700" />
            </div>
          </div>

          {/* Right Scrolling Content */}
          <div className="scroll-content w-full lg:w-1/2 py-24 lg:py-48 px-6 md:px-16 flex flex-col gap-8">
            {services.map((svc, idx) => (
              <div key={idx} className="group cursor-pointer border-b border-brand-text/10 pb-8 hover:border-brand-accent transition-colors">
                <div className="flex justify-between items-end mb-4">
                  <h3 className="text-3xl md:text-4xl font-bold tracking-tight group-hover:text-brand-accent transition-colors">{svc.name}</h3>
                  <span className="text-xl font-medium text-brand-text/70">{svc.price}</span>
                </div>
                <p className="text-brand-text/50">{svc.desc}</p>
              </div>
            ))}
            
            <div className="mt-24 w-full h-[600px]">
              <TemplateImage src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1200&auto=format&fit=crop" alt="Lounge Interior" className="w-full h-full object-cover grayscale opacity-80" />
            </div>
          </div>
        </div>
      </section>

      {/* Lookbook Gallery */}
      <section id="lookbook" className="py-32 px-6 md:px-16 bg-brand-bg border-t border-brand-text/10 relative z-10">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 reveal-up">
            <div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-2">The <span className="text-brand-accent">Lookbook</span></h2>
              <p className="text-brand-text/70 uppercase tracking-widest font-bold">Our Masterpieces</p>
            </div>
            <a href="#book" className="hidden md:inline-flex items-center gap-2 text-brand-text hover:text-brand-accent transition-colors uppercase tracking-widest font-bold text-sm">
              View All <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1567894340315-735d7c361db0?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1593062096033-9a26b09da705?q=80&w=800&auto=format&fit=crop"
            ].map((img, i) => (
              <div key={i} className="group relative aspect-[4/5] overflow-hidden rounded-none reveal-up" style={{ transitionDelay: `${i * 0.1}s` }}>
                <TemplateImage src={img} alt={`Lookbook ${i + 1}`} className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" />
                <div className="absolute inset-0 border border-brand-text/10 mix-blend-overlay"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing - Card Stacking Physics */}
      <section id="pricing" className="py-32 px-6 bg-brand-surface relative z-10 border-t border-brand-text/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 reveal-up">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6">VIP Tiers</h2>
            <p className="text-brand-text/70 uppercase tracking-widest font-bold">Memberships & Packages</p>
          </div>

          <div className="relative w-full max-w-3xl mx-auto flex flex-col gap-12 pb-32">
            {[
              { title: "The Regular", price: "$45", features: ["Classic Haircut", "Straight Razor Neck Shave", "Hot Towel"] },
              { title: "The Executive", price: "$80", features: ["Precision Fade or Cut", "Full Beard Sculpting", "Blackwood Wash & Style", "Complimentary Drink"], highlight: true },
              { title: "The Syndicate", price: "$120", features: ["Premium Cut & Beard", "Charcoal Face Mask", "Scalp Massage", "Priority Booking"] }
            ].map((tier, idx) => (
              <div key={idx} className={`stack-card w-full p-8 md:p-12 rounded-none border ${tier.highlight ? 'border-brand-accent bg-brand-bg' : 'border-brand-text/20 bg-brand-bg'} flex flex-col md:flex-row justify-between items-center gap-8`}>
                <div>
                  {tier.highlight && <span className="bg-brand-accent text-white text-xs font-bold uppercase tracking-widest px-3 py-1 mb-4 inline-block">Most Popular</span>}
                  <h3 className="text-3xl md:text-4xl font-black uppercase mb-2">{tier.title}</h3>
                  <div className="text-brand-text/50 uppercase tracking-widest font-bold text-sm mb-6 md:mb-0">
                    {tier.features.join(' • ')}
                  </div>
                </div>
                <div className="flex flex-col items-end shrink-0">
                  <span className="text-4xl md:text-5xl font-black text-brand-accent mb-4">{tier.price}</span>
                  <button className="bg-white text-black hover:bg-brand-accent hover:text-white transition-colors px-8 py-3 uppercase tracking-widest font-bold text-sm">
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <footer id="book" className="bg-brand-bg pt-32 pb-12 px-6 md:px-12 border-t border-brand-text/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-32 reveal-up">
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
              {content.about.title}
            </h2>
            <p className="text-brand-text/70 uppercase tracking-widest font-bold mb-12 max-w-xl">
              {content.about.text}
            </p>
            <a href="#" className="inline-flex items-center gap-4 bg-brand-accent text-white px-12 py-6 text-sm uppercase tracking-widest font-black hover:bg-white hover:text-black transition-colors group">
              {content.hero.button}
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-brand-text/10 text-xs font-bold tracking-widest uppercase text-brand-text/50">
            <span>&copy; {new Date().getFullYear()} Blackwood Grooming.</span>
            <div className="flex gap-8 mt-4 md:mt-0">
              <a href="#" className="hover:text-brand-accent transition-colors">Instagram</a>
              <a href="#" className="hover:text-brand-accent transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
