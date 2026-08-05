"use client";
import React, { useState, useEffect } from "react";
import "./index.css";
import editableData from "./editable.json";
import { Check, X, ArrowRight, Menu } from "lucide-react";

export default function ModularsTemplate() {
  const data = editableData as any;
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (!data.hero.backgroundImages || data.hero.backgroundImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImage((prev: number) => (prev + 1) % data.hero.backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [data.hero.backgroundImages]);

  const CSS_VARS = {
    "--color-background": data.theme.background,
    "--color-text": data.theme.text,
    "--color-accent": data.theme.accent,
    "--font-heading": `"${data.theme.fontHeading}"`,
    "--font-body": `"${data.theme.fontBody}"`,
  } as React.CSSProperties;

  return (
    <div data-template-id="modulars" className="min-h-screen relative" style={CSS_VARS}>
      
      {/* HEADER */}
      <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 md:py-6 text-white border-b border-white/20">
        <div className="font-bold text-2xl tracking-tight">{data.header.logoText}</div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {data.header.nav.map((link: any, idx: number) => (
            <a key={idx} href={link.href} className="hover:opacity-70 transition-opacity">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
            <button className="bg-white text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-white/90 transition-colors">
            {data.header.ctaText}
            </button>
        </div>
        <button className="md:hidden">
            <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* HERO SECTION */}
      <section className="relative w-full min-h-screen flex flex-col justify-center pb-24">
        {data.hero.backgroundImages?.map((img: string, idx: number) => (
          <div 
            key={idx}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${currentImage === idx ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundImage: `url('${img}')` }}
          />
        ))}
        {/* If fallback to single image */}
        {!data.hero.backgroundImages && data.hero.backgroundImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${data.hero.backgroundImage}')` }}
          />
        )}
        <div className="absolute inset-0 hero-bg-overlay" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 text-white pt-24 flex flex-col items-center text-center">
          <div className="max-w-3xl flex flex-col items-center">
            <p className="pre-title mb-6 whitespace-pre-line">{data.hero.preTitle}</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl leading-tight mb-4">
              {data.hero.title}
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-2xl opacity-90 leading-relaxed font-light mx-auto">
                {data.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact" className="bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-white/90 transition-colors flex items-center justify-center gap-2">
                {data.hero.primaryButton} <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#about" className="px-8 py-4 rounded-full font-medium border-2 border-white bg-black/20 backdrop-blur-sm hover:bg-white/20 transition-colors flex items-center justify-center">
                {data.hero.secondaryButton}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 md:py-32 px-6 md:px-12 bg-white text-black">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          <div>
            <h2 className="text-3xl md:text-5xl mb-6">{data.about.title}</h2>
            <p className="text-lg opacity-80 mb-12 max-w-lg leading-relaxed">
              {data.about.description}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-black/10">
              {data.about.stats.map((stat: any, idx: number) => (
                <div key={idx}>
                  <div className="text-3xl font-light mb-2">{stat.value}</div>
                  <div className="text-sm font-medium opacity-60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-lg overflow-hidden bg-black/5">
                <img src={data.about.image} alt="About Modulars" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
                <p className="pre-title mb-4" style={{color: data.theme.accent}}>{data.services.preTitle}</p>
                <h2 className="text-3xl md:text-5xl mb-6">{data.services.title}</h2>
                <p className="text-lg opacity-70 leading-relaxed">{data.services.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {data.services.items.map((item: any, idx: number) => (
                    <div key={idx} className="group">
                        <div className="aspect-[3/4] rounded-lg overflow-hidden mb-6 bg-black/5">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                        <p className="text-sm opacity-70 leading-relaxed">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* PROJECTS COLLAGE */}
      <section id="work" className="py-24 md:py-32 px-6 md:px-12 bg-white text-black">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
              <p className="pre-title mb-4" style={{color: data.theme.accent}}>{data.projects.preTitle}</p>
              <h2 className="text-3xl md:text-5xl mb-6">{data.projects.title}</h2>
              <p className="text-lg opacity-70 leading-relaxed">{data.projects.description}</p>
          </div>
          
          <div className="masonry-grid">
              {data.projects.images.map((img: string, idx: number) => (
                  <img key={idx} src={img} alt={`Project ${idx+1}`} className="w-full rounded-lg" />
              ))}
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section id="process" className="py-24 md:py-32 px-6 md:px-12 text-white" style={{backgroundColor: data.theme.text}}>
        <div className="max-w-7xl mx-auto">
            <div className="mb-16 md:mb-24">
                <p className="pre-title mb-4" style={{color: data.theme.accent}}>{data.process.preTitle}</p>
                <h2 className="text-3xl md:text-5xl mb-6 max-w-2xl">{data.process.title}</h2>
                <p className="text-lg opacity-70 leading-relaxed max-w-xl">{data.process.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/20 pt-16">
                {data.process.steps.map((step: any, idx: number) => (
                    <div key={idx}>
                        <div className="text-4xl font-light mb-6 opacity-50">{step.number}</div>
                        <h3 className="text-2xl mb-4">{step.title}</h3>
                        <p className="opacity-70 leading-relaxed">{step.description}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
         <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
            <p className="pre-title mb-4" style={{color: data.theme.accent}}>{data.testimonials.preTitle}</p>
            <h2 className="text-3xl md:text-5xl mb-6">{data.testimonials.title}</h2>
            <p className="text-lg opacity-70 leading-relaxed">{data.testimonials.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.testimonials.items.map((item: any, idx: number) => (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-black/5">
                    <p className="text-lg italic leading-relaxed mb-8">"{item.quote}"</p>
                    <div>
                        <div className="font-medium">{item.author}</div>
                        <div className="text-sm opacity-60">{item.project}</div>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* COMPARISON SECTION */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-black/10">
         <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
            <p className="pre-title mb-4" style={{color: data.theme.accent}}>{data.comparison.preTitle}</p>
            <h2 className="text-3xl md:text-5xl mb-6">{data.comparison.title}</h2>
            <p className="text-lg opacity-70 leading-relaxed">{data.comparison.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            {/* Traditional */}
            <div className="bg-white p-8 md:p-12 rounded-2xl border border-black/10">
                <h3 className="text-2xl mb-8 pb-8 border-b border-black/10">{data.comparison.traditional.title}</h3>
                <ul className="space-y-6">
                    {data.comparison.traditional.points.map((point: any, idx: number) => (
                        <li key={idx} className="flex items-start gap-4 opacity-70">
                            <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                            <span>{point}</span>
                        </li>
                    ))}
                </ul>
            </div>
            
            {/* Modulars */}
            <div className="p-8 md:p-12 rounded-2xl text-white" style={{backgroundColor: data.theme.accent}}>
                <h3 className="text-2xl mb-8 pb-8 border-b border-white/20">{data.comparison.modulars.title}</h3>
                <ul className="space-y-6">
                    {data.comparison.modulars.points.map((point: any, idx: number) => (
                        <li key={idx} className="flex items-start gap-4">
                            <Check className="w-5 h-5 text-white shrink-0 mt-0.5" />
                            <span>{point}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
                <p className="pre-title mb-4" style={{color: data.theme.accent}}>{data.faq.preTitle}</p>
                <h2 className="text-3xl md:text-5xl mb-6">{data.faq.title}</h2>
            </div>
            <div className="space-y-4">
                {data.faq.items.map((item: any, idx: number) => (
                    <details key={idx} className="faq-details group border-b border-black/10 pb-4">
                        <summary className="font-medium text-lg flex justify-between items-center outline-none">
                            {item.question}
                            <span className="text-2xl group-open:rotate-45 transition-transform duration-300 font-light">+</span>
                        </summary>
                        <p className="mt-4 opacity-70 leading-relaxed pr-8">
                            {item.answer}
                        </p>
                    </details>
                ))}
            </div>
        </div>
      </section>

      {/* CONTACT / CTA SECTION */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
                <h2 className="text-4xl md:text-6xl mb-6">{data.contact.title}</h2>
                <p className="text-lg opacity-70 mb-12 max-w-md leading-relaxed">{data.contact.description}</p>
                
                <form className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2 opacity-70">Name</label>
                            <input type="text" className="w-full bg-white border border-black/10 rounded-lg px-4 py-3 outline-none focus:border-black/30 transition-colors" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 opacity-70">Email</label>
                            <input type="email" className="w-full bg-white border border-black/10 rounded-lg px-4 py-3 outline-none focus:border-black/30 transition-colors" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2 opacity-70">Project Type</label>
                            <select className="w-full bg-white border border-black/10 rounded-lg px-4 py-3 outline-none focus:border-black/30 transition-colors appearance-none">
                                <option>Full Home Renovation</option>
                                <option>Kitchen Remodeling</option>
                                <option>Bathroom Redesign</option>
                                <option>Commercial Upgrades</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 opacity-70">Estimated Budget</label>
                            <select className="w-full bg-white border border-black/10 rounded-lg px-4 py-3 outline-none focus:border-black/30 transition-colors appearance-none">
                                <option>Under $10k</option>
                                <option>$10k - $25k</option>
                                <option>$25k - $50k</option>
                                <option>$50k - $100k</option>
                                <option>$100k - $250k</option>
                                <option>$250k+</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2 opacity-70">Message</label>
                        <textarea rows={4} className="w-full bg-white border border-black/10 rounded-lg px-4 py-3 outline-none focus:border-black/30 transition-colors resize-none"></textarea>
                    </div>
                    <button type="submit" className="w-full text-white px-8 py-4 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2" style={{backgroundColor: data.theme.text}}>
                        Send Inquiry <ArrowRight className="w-4 h-4" />
                    </button>
                </form>
            </div>
            <div className="relative hidden lg:block">
                <div className="aspect-[4/5] rounded-lg overflow-hidden bg-black/5">
                    <img src={data.contact.image} alt="Contact" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-black/10 py-16 px-6 md:px-12 text-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1">
                <div className="font-bold text-2xl tracking-tight mb-4">{data.footer.logoText}</div>
                <p className="opacity-60 max-w-xs">{data.footer.description}</p>
            </div>
            <div>
                <h4 className="font-medium mb-4">Company</h4>
                <ul className="space-y-3 opacity-60">
                    {data.footer.links.map((link: any, idx: number) => (
                        <li key={idx}><a href={link.href} className="hover:text-black transition-colors">{link.label}</a></li>
                    ))}
                </ul>
            </div>
            <div>
                <h4 className="font-medium mb-4">Services</h4>
                <ul className="space-y-3 opacity-60">
                    {data.footer.services.map((service: string, idx: number) => (
                        <li key={idx}>{service}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h4 className="font-medium mb-4">Contact</h4>
                <ul className="space-y-3 opacity-60">
                    {data.footer.contact.map((item: string, idx: number) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4 opacity-50">
            <div>{data.footer.copyright}</div>
            <div className="flex gap-6">
                <a href="#" className="hover:text-black">Privacy Policy</a>
                <a href="#" className="hover:text-black">Terms of Service</a>
            </div>
        </div>
      </footer>
    </div>
  );
}
