import React from 'react';
import { useTemplateData } from '../TemplateContext';
import { motion } from 'framer-motion';

export default function Hero() {
  const data = useTemplateData();

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={data.hero.backgroundImage} 
          alt="Construction Hero" 
          className="w-full h-full object-cover"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-white/60"></div>
      </div>

      {/* Social Sidebar */}
      <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 flex-col space-y-6 z-20 bg-white shadow-xl py-8 px-4 rounded-l-lg border border-gray-100">
        {data.hero.social.map((social: any, idx: number) => (
          <a
            key={idx}
            href={social.href}
            className="text-gray-900 font-semibold text-xs uppercase tracking-widest"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            {social.platform}
          </a>
        ))}
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 w-full z-10 relative">
        <div className="max-w-3xl">
          {/* Faded Background Text */}
          <div className="absolute -left-10 top-10 select-none pointer-events-none hidden md:block opacity-10">
            <h1 className="text-[10rem] font-black font-sans uppercase leading-none"
                style={{ WebkitTextStroke: '2px var(--color-secondary)', color: 'transparent' }}>
              {data.brand.logoText}
            </h1>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold font-serif text-[var(--color-secondary)] uppercase leading-tight mt-12 relative z-10"
          >
            {data.hero.title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-lg text-gray-800 font-medium relative z-10"
          >
            {data.hero.subtitle}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-4 relative z-10"
          >
            <a 
              href={data.navigation.ctaHref}
              className="bg-[var(--color-primary)] text-white px-8 py-4 font-semibold uppercase tracking-wider hover:bg-orange-600 transition-colors inline-flex items-center"
            >
              {data.navigation.ctaLabel}
            </a>
            <a 
              href={data.navigation.contactHref}
              className="bg-[var(--color-secondary)] text-white px-8 py-4 font-semibold uppercase tracking-wider hover:bg-gray-800 transition-colors inline-flex items-center"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
