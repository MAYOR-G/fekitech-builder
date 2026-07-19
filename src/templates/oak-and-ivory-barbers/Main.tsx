"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { ArrowRight, MapPin, Scissors, Droplets } from 'lucide-react';
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
    tl.fromTo('.hero-text span', 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power4.out', delay: 0.2 }
    );
    tl.fromTo('.hero-img',
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: 'power3.out' },
      "-=0.8"
    );

    // Reveal animations on scroll
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

    // Parallax Images
    gsap.utils.toArray<HTMLElement>('.parallax-img').forEach((img) => {
      gsap.to(img, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: img.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    // Scrubbing Text Reveal
    const scrubText = document.querySelector('.scrub-text');
    if (scrubText) {
      gsap.fromTo(scrubText,
        { backgroundPositionX: "100%" },
        {
          backgroundPositionX: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: scrubText,
            start: "top 80%",
            end: "center center",
            scrub: 1,
          }
        }
      );
    }

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const [activeService, setActiveService] = useState(0);

  const services = [
    { title: "The Signature Cut", price: "$65", desc: "Precision scissor and clipper work tailored to your bone structure.", icon: <Scissors className="w-6 h-6" />, img: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=800&auto=format&fit=crop" },
    { title: "Executive Shave", price: "$55", desc: "Hot towel, straight razor, and botanical aftershave balm.", icon: <Droplets className="w-6 h-6" />, img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop" },
    { title: "Beard Sculpting", price: "$45", desc: "Detailed shaping, lining, and conditioning treatment.", icon: <Scissors className="w-6 h-6" />, img: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop" },
    { title: "The Full Detail", price: "$110", desc: "Complete haircut, beard grooming, and facial massage.", icon: <Droplets className="w-6 h-6" />, img: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=800&auto=format&fit=crop" }
  ];

  const lookbookImages = [
    "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1593062096033-9a26b09da705?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1567894340315-735d7c361db0?q=80&w=600&auto=format&fit=crop"
  ];

  return (
    <main ref={containerRef} className="relative w-full">
      {/* Floating Glass Nav */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl">
        <div className="bg-brand-surface/80 backdrop-blur-md border border-brand-text/10 rounded-full px-6 py-4 flex items-center justify-between shadow-lg">
          <div className="font-serif font-bold text-xl tracking-wide">O&I</div>
          <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest font-medium">
            <a href="#about" className="hover:text-brand-accent transition-colors">Philosophy</a>
            <a href="#services" className="hover:text-brand-accent transition-colors">Services</a>
            <a href="#lookbook" className="hover:text-brand-accent transition-colors">Lookbook</a>
          </div>
          <a href="#book" className="text-sm uppercase tracking-widest font-bold border-b border-brand-text pb-1 hover:text-brand-accent hover:border-brand-accent transition-all">{content.hero.button}</a>
        </div>
      </nav>

      {/* Hero - Artistic Asymmetry */}
      <section className="relative min-h-[90vh] pt-32 pb-20 px-6 md:px-12 flex flex-col justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 z-10 relative">
            <h1 className="text-6xl md:text-8xl xl:text-9xl text-balance tracking-tighter leading-[0.9]">
              <div className="overflow-hidden"><span className="inline-block hero-text">{content.hero.title}</span></div>
              <div className="overflow-hidden flex items-center gap-4">
                <span className="inline-block hero-text italic text-brand-accent">{content.hero.subtitle}</span>
                <div className="hero-img hidden md:block w-32 h-20 rounded-full overflow-hidden shrink-0 mt-4">
                  <TemplateImage src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=400&auto=format&fit=crop" alt="Razor" className="w-full h-full object-cover" />
                </div>
              </div>
            </h1>
            <p className="mt-8 text-lg md:text-xl max-w-md text-brand-text/80 font-medium reveal-up">
              {content.about.text}
            </p>
            <div className="mt-12 reveal-up">
              <a href="#book" className="inline-flex items-center gap-3 bg-brand-text text-brand-bg px-8 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-brand-accent transition-colors group">
                {content.hero.button}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative h-[60vh] lg:h-[80vh] w-full rounded-2xl overflow-hidden hero-img mt-12 lg:mt-0">
            <TemplateImage 
              src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1200&auto=format&fit=crop" 
              alt="Barber Shop Interior" 
              className="w-full h-[120%] object-cover parallax-img -top-[10%]"
            />
            <div className="absolute inset-0 border border-brand-text/10 rounded-2xl mix-blend-overlay"></div>
          </div>
        </div>
      </section>

      {/* Philosophy - GSAP Scrubbing Reveal */}
      <section id="about" className="py-32 px-6 md:px-12 bg-brand-text text-brand-bg">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-brand-accent text-sm uppercase tracking-widest mb-12 reveal-up">{content.about.title}</h2>
          <p 
            className="text-4xl md:text-6xl lg:text-7xl font-serif leading-tight scrub-text"
            style={{
              backgroundImage: 'linear-gradient(to right, var(--color-brand-bg) 50%, rgba(255,255,255,0.1) 50%)',
              backgroundSize: '200% 100%',
              backgroundPositionX: '100%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}
          >
            {content.about.text}
          </p>
        </div>
      </section>

      {/* Services - Horizontal Accordion */}
      <section id="services" className="py-32 px-6 md:px-12 bg-brand-bg">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 reveal-up">
            <div>
              <h2 className="text-brand-accent text-sm uppercase tracking-widest mb-4">The Menu</h2>
              <h3 className="text-5xl md:text-7xl font-serif">Curated Services</h3>
            </div>
            <p className="max-w-xs mt-6 md:mt-0 text-brand-text/70">Expertise honed over decades, delivered in 45 minutes.</p>
          </div>

          <div className="flex flex-col lg:flex-row h-auto lg:h-[600px] gap-4 w-full">
            {services.map((svc, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveService(idx)}
                className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-in-out flex flex-col justify-end p-8 ${
                  activeService === idx ? 'lg:flex-[3] text-white shadow-xl' : 'lg:flex-[1] text-brand-text hover:bg-brand-text/5'
                }`}
              >
                {activeService === idx && (
                  <div className="absolute inset-0 z-0">
                    <TemplateImage src={svc.img} alt={svc.title} className="w-full h-full object-cover opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  </div>
                )}
                
                <div className={`relative z-10 absolute top-8 left-8 p-3 rounded-full ${activeService === idx ? 'bg-brand-accent text-white' : 'bg-brand-text/5 text-brand-text'}`}>
                  {svc.icon}
                </div>
                
                <div className={`relative z-10 mt-24 transition-opacity duration-500 delay-100 ${activeService === idx ? 'opacity-100' : 'opacity-0 lg:opacity-100'}`}>
                  <div className="flex justify-between items-end">
                    <h4 className={`text-2xl md:text-3xl font-serif ${activeService === idx ? 'block' : 'lg:hidden xl:block'}`}>{svc.title}</h4>
                    <span className="text-xl font-medium">{svc.price}</span>
                  </div>
                  <div className={`mt-4 grid transition-all duration-500 ${activeService === idx ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <p className="overflow-hidden text-white/80">{svc.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lookbook - Gapless Bento */}
      <section id="lookbook" className="py-24 bg-brand-surface">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          <h2 className="text-5xl md:text-7xl font-serif text-center mb-16 reveal-up">The Canvas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 grid-flow-dense gap-4 auto-rows-[250px]">
            <div className="md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden group">
              <TemplateImage src={lookbookImages[0]} alt="Barber tools" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            </div>
            <div className="md:col-span-1 md:row-span-1 rounded-2xl overflow-hidden group">
              <TemplateImage src={lookbookImages[1]} alt="Barbering detail" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            </div>
            <div className="md:col-span-1 md:row-span-2 rounded-2xl overflow-hidden group">
              <TemplateImage src={lookbookImages[2]} alt="Barber studio" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            </div>
            <div className="md:col-span-1 md:row-span-1 rounded-2xl overflow-hidden group bg-brand-accent p-8 flex items-center justify-center text-center">
              <h3 className="text-2xl font-serif text-white">Precision is not a detail.<br/>It&apos;s everything.</h3>
            </div>
            <div className="md:col-span-2 md:row-span-1 rounded-2xl overflow-hidden group">
              <TemplateImage src={lookbookImages[3]} alt="Haircut result" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            </div>
            <div className="md:col-span-2 md:row-span-1 rounded-2xl overflow-hidden group">
              <TemplateImage src={lookbookImages[4]} alt="Fading technique" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <footer id="book" className="bg-brand-text text-brand-bg pt-32 pb-12 px-6 md:px-12 border-t border-brand-accent/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            <div>
              <h2 className="text-5xl md:text-8xl font-serif mb-8 leading-none reveal-up">Claim Your<br/><span className="text-brand-accent italic">Time.</span></h2>
              <p className="text-brand-bg/70 text-lg max-w-sm mb-12 reveal-up">Join the ranks of men who demand the best. Appointments are highly limited.</p>
              <a href="#" className="inline-flex items-center gap-3 bg-brand-bg text-brand-text px-10 py-5 rounded-full text-sm uppercase tracking-widest hover:bg-brand-accent hover:text-white transition-colors group reveal-up">
                {content.hero.button}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            <div className="bg-brand-bg/5 p-12 rounded-3xl reveal-up border border-brand-bg/10">
              <div className="flex items-start gap-4 mb-8">
                <MapPin className="w-6 h-6 text-brand-accent shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-xl mb-2">Oak & Ivory Studio</h4>
                  <p className="text-brand-bg/70">124 Heritage Avenue<br/>Historic District, NY 10012</p>
                </div>
              </div>
              <div className="space-y-4 text-brand-bg/70 border-t border-brand-bg/10 pt-8 mt-8">
                <div className="flex justify-between"><span>Tue - Fri</span><span>9am - 8pm</span></div>
                <div className="flex justify-between"><span>Saturday</span><span>9am - 6pm</span></div>
                <div className="flex justify-between text-brand-accent"><span>Sunday & Monday</span><span>Closed</span></div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-brand-bg/10 text-sm font-medium tracking-wider text-brand-bg/50">
            <span>&copy; {new Date().getFullYear()} Oak & Ivory. All Rights Reserved.</span>
            <div className="flex gap-8 mt-4 md:mt-0">
              <a href="#" className="hover:text-brand-accent transition-colors uppercase">Instagram</a>
              <a href="#" className="hover:text-brand-accent transition-colors uppercase">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
