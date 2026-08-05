import React from 'react';
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import editableData from "./editable.json";
import "./index.css";

type CopperTapData = typeof editableData;

export default function TheCopperTap({ data }: { data: TemplateData }) {
  const { content, theme } = mergeTemplateData(editableData, data) as CopperTapData;

  return (
    <div 
      className="the-copper-tap w-full min-h-screen font-body flex flex-col"
      style={{ 
        backgroundColor: theme.colors.primary, 
        color: theme.colors.text,
        fontFamily: theme.fonts.body
      }}
    >
      {/* HEADER */}
      <header className="w-full flex items-center justify-between px-10 py-6 absolute top-0 left-0 z-10" style={{ color: theme.colors.text }}>
        <div className="flex-1 text-xs tracking-widest uppercase">
          <a href="#" className="hover:opacity-70 transition">Book a Table</a>
        </div>
        <div className="text-2xl tracking-widest uppercase" style={{ fontFamily: theme.fonts.heading }}>
          <a href="#" className="hover:opacity-70 transition">{content.header.logo}</a>
        </div>
        <div className="flex-1 flex justify-end">
          <button className="text-sm tracking-wider hover:opacity-70 transition">
            {content.header.loginText}
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section 
        className="w-full flex flex-col items-center justify-center pt-32 pb-24 text-center px-4 relative mt-3"
        style={{ 
          backgroundColor: theme.colors.secondary,
          backgroundImage: content.hero.image ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${content.hero.image})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#E1D0B6' // Ensure text is visible over dark image
        }}
      >
        <h1 
          className="text-5xl md:text-7xl mb-6 tracking-widest mt-12" 
          style={{ fontFamily: theme.fonts.heading }}
        >
          {content.hero.title}
        </h1>
        <p className="text-lg md:text-xl tracking-widest">
          {content.hero.subtitle}
        </p>
      </section>

      {/* WELCOME SECTION */}
      <section className="w-full py-24 flex flex-col items-center text-center px-4" style={{ backgroundColor: theme.colors.lightBackground, color: theme.colors.darkText }}>
        <h3 className="text-xl md:text-2xl mb-8 uppercase tracking-widest" style={{ fontFamily: theme.fonts.heading }}>
          {content.welcome.pretitle}
        </h3>
        <h2 className="text-3xl md:text-5xl max-w-4xl leading-tight mb-8" style={{ fontFamily: theme.fonts.heading }}>
          {content.welcome.title}
        </h2>
        <div className="w-full max-w-lg mb-12">
          <p className="text-base leading-relaxed opacity-90">
            {content.welcome.description}
          </p>
        </div>
        <div className="mb-16">
          <a href="#" className="uppercase tracking-widest text-sm font-bold pb-2 border-b-2" style={{ borderColor: theme.colors.darkText, fontFamily: theme.fonts.heading }}>
            {content.welcome.buttonText}
          </a>
        </div>
        
        {/* Decorative images in welcome section */}
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center w-full max-w-5xl mx-auto px-4 mt-8">
           <img src={content.welcome.image1} alt="Welcome 1" className="w-full md:w-1/2 aspect-square object-cover" />
           <img src={content.welcome.image2} alt="Welcome 2" className="w-full md:w-1/2 aspect-video object-cover" />
        </div>
      </section>

      {/* HAPPY HOUR SECTION */}
      <section className="w-full flex flex-col md:flex-row items-center" style={{ backgroundColor: theme.colors.primary }}>
        <div className="w-full md:w-1/2 flex flex-col items-center text-center py-32 px-4">
          <h3 className="text-xl md:text-2xl mb-8 tracking-widest" style={{ fontFamily: theme.fonts.heading }}>
            {content.happyHour.pretitle}
          </h3>
          <h2 className="text-4xl md:text-6xl mb-12 tracking-widest" style={{ fontFamily: theme.fonts.heading }}>
            {content.happyHour.title}
          </h2>
          <p className="text-lg mb-2">{content.happyHour.time}</p>
          <p className="text-lg">{content.happyHour.days}</p>
        </div>
        <div className="w-full md:w-1/2 h-full min-h-[400px]">
           {/* @ts-expect-error - happyHour image is added in editable json */}
           {content.happyHour.image && (
              // @ts-expect-error
              <img src={content.happyHour.image} alt="Happy Hour" className="w-full h-full object-cover min-h-[400px]" />
           )}
        </div>
      </section>

      {/* SPECIAL SECTION */}
      <section className="w-full flex flex-col md:flex-row items-center" style={{ backgroundColor: theme.colors.primary }}>
        <div className="w-full md:w-1/2 flex justify-center py-24 px-12">
           {/* Placeholder for special image */}
           {content.special.image ? (
             <img src={content.special.image} alt="Special" className="w-full max-w-md aspect-[3/4] object-cover" />
           ) : (
             <div className="w-full max-w-md aspect-[3/4]" style={{ backgroundColor: theme.colors.secondary }}></div>
           )}
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start text-left py-24 px-12 lg:px-24">
          <h3 className="text-xl md:text-2xl mb-6 tracking-widest" style={{ fontFamily: theme.fonts.heading }}>
            {content.special.pretitle}
          </h3>
          <h2 className="text-3xl md:text-5xl mb-8 leading-tight" style={{ fontFamily: theme.fonts.heading }}>
            {content.special.title}
          </h2>
          <p className="text-base leading-relaxed mb-12 max-w-md opacity-90">
            {content.special.description}
          </p>
          <a href="#" className="uppercase tracking-widest text-sm font-bold pb-2 border-b-2" style={{ borderColor: theme.colors.text, fontFamily: theme.fonts.heading }}>
            {content.special.buttonText}
          </a>
        </div>
      </section>

      {/* MOMENTS SECTION */}
      <section className="w-full py-24 px-4 flex flex-col items-center" style={{ backgroundColor: theme.colors.primary }}>
        <h2 className="text-3xl md:text-4xl mb-16 tracking-widest" style={{ fontFamily: theme.fonts.heading }}>
          {content.moments.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-6xl">
          {/* Images for moments */}
          {content.moments.images.map((img, idx) => (
             <img key={idx} src={img} alt={`Moment ${idx + 1}`} className="w-full aspect-square object-cover" />
          ))}
        </div>
      </section>

      {/* EVENTS SECTION */}
      <section className="w-full py-32 flex flex-col items-center px-4" style={{ backgroundColor: theme.colors.lightBackground, color: theme.colors.darkText }}>
        <h2 className="text-3xl md:text-5xl mb-24 tracking-widest text-center" style={{ fontFamily: theme.fonts.heading }}>
          {content.events.title}
        </h2>
        <div className="w-full max-w-4xl flex flex-col border-t border-b border-[#20241A] divide-y divide-[#20241A]">
          {content.events.list.map((event, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center justify-between py-12">
              <div className="flex flex-col md:flex-row items-center gap-12 text-center md:text-left mb-6 md:mb-0">
                <span className="text-lg" style={{ fontFamily: theme.fonts.heading }}>{event.date}</span>
                <div>
                  <h4 className="text-2xl md:text-3xl mb-2" style={{ fontFamily: theme.fonts.heading }}>{event.title}</h4>
                  <p className="text-base opacity-70">{event.location}</p>
                </div>
              </div>
              <a href="#" className="uppercase tracking-widest text-sm font-bold pb-1 border-b-2" style={{ borderColor: theme.colors.darkText, fontFamily: theme.fonts.heading }}>
                {event.buttonText}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* RESERVATION SECTION */}
      <section className="w-full py-32 flex flex-col items-center text-center px-4" style={{ backgroundColor: theme.colors.accent }}>
        <h2 className="text-4xl md:text-5xl mb-8 tracking-widest" style={{ fontFamily: theme.fonts.heading }}>
          {content.reservation.title}
        </h2>
        <p className="text-base max-w-xl mx-auto opacity-90 mb-12">
          {content.reservation.description}
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center w-full max-w-3xl">
          <input type="number" placeholder="Party Size" className="px-4 py-3 bg-transparent border border-opacity-50 text-center w-full md:w-auto" style={{ borderColor: theme.colors.text }} />
          <input type="date" className="px-4 py-3 bg-transparent border border-opacity-50 text-center w-full md:w-auto" style={{ borderColor: theme.colors.text }} />
          <input type="time" className="px-4 py-3 bg-transparent border border-opacity-50 text-center w-full md:w-auto" style={{ borderColor: theme.colors.text }} />
          <button className="px-8 py-3 bg-transparent border w-full md:w-auto uppercase tracking-widest" style={{ borderColor: theme.colors.text, fontFamily: theme.fonts.heading }}>
            {content.reservation.buttonText}
          </button>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="w-full flex flex-col pt-32 pb-12 px-4 md:px-24" style={{ backgroundColor: theme.colors.primary }}>
        <div className="flex flex-col md:flex-row justify-between w-full mb-24">
          <div className="w-full md:w-1/3 mb-12 md:mb-0">
            <h2 className="text-4xl md:text-5xl tracking-widest whitespace-pre-line leading-tight" style={{ fontFamily: theme.fonts.heading }}>
              {content.footer.title}
            </h2>
          </div>
          
          <div className="w-full md:w-2/3 flex flex-col sm:flex-row justify-end gap-12 md:gap-24">
            <div className="flex flex-col">
              <h4 className="text-xl mb-6 tracking-widest" style={{ fontFamily: theme.fonts.heading }}>{content.footer.addressTitle}</h4>
              <p className="text-base whitespace-pre-line opacity-90">{content.footer.address}</p>
            </div>
            
            <div className="flex flex-col">
              <h4 className="text-xl mb-6 tracking-widest" style={{ fontFamily: theme.fonts.heading }}>{content.footer.hoursTitle}</h4>
              <p className="text-base whitespace-pre-line opacity-90 mb-10">{content.footer.hours}</p>
              
              <a href={`mailto:${content.footer.email}`} className="text-base mb-2 hover:opacity-70 transition">{content.footer.email}</a>
              <p className="text-base mb-10">{content.footer.phone}</p>
              
              <div className="flex flex-col gap-2">
                {content.footer.socials.map((social, idx) => (
                  <a key={idx} href={social.link} className="text-base hover:opacity-70 transition">{social.label}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full border-t pt-12 flex flex-col md:flex-row justify-between items-center gap-6" style={{ borderColor: 'rgba(225, 208, 182, 0.3)' }}>
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-1/2">
             <p className="text-sm tracking-widest mr-4" style={{ fontFamily: theme.fonts.heading }}>{content.footer.subscribeText}</p>
             <div className="flex w-full max-w-xs border-b pb-1" style={{ borderColor: theme.colors.text }}>
                <input type="email" placeholder="Email Address" className="bg-transparent border-none outline-none flex-1 text-sm placeholder:opacity-50" style={{ color: theme.colors.text }} />
                <button className="uppercase text-xs font-bold tracking-widest" style={{ fontFamily: theme.fonts.heading }}>Submit</button>
             </div>
          </div>
          <div className="text-xs opacity-70 w-full md:w-1/2 text-center md:text-right">
            <p>{content.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
