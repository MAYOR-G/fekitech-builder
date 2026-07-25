import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function CustomOrder() {
  const { feature, process, packages, colors } = useTemplateData();

  return (
    <section className="text-white py-32 rounded-t-[3rem] overflow-hidden" style={{ backgroundColor: colors.text }} id="process">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Feature Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="rounded-[2rem] overflow-hidden aspect-[4/3] lg:order-2"
          >
            <img src={feature.image} alt={feature.imageAlt} className="w-full h-full object-cover" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:order-1"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] block mb-6" style={{ color: colors.secondary }}>
              {feature.note}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight font-medium">
              {feature.title}
            </h2>
            <p className="text-white/70 text-lg font-light leading-relaxed mb-10 max-w-lg">
              {feature.description}
            </p>
            <a
              href={feature.buttonHref}
              className="inline-block px-10 py-4 text-white text-[12px] font-medium uppercase tracking-[0.15em] transition-colors rounded-full"
              style={{ backgroundColor: colors.primary }}
              onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
            >
              {feature.buttonLabel}
            </a>
          </motion.div>
        </div>

      </div>

      {/* Process Section - Full Width Banner */}
      <div className="relative w-full py-32 mb-32 overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=2000&auto=format&fit=crop" 
            alt="Making a cake" 
            className="w-full h-full object-cover opacity-40 scale-105" 
          />
          <div className="absolute inset-0" style={{ backgroundColor: `${colors.text}B3` }} />
        </div>
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 w-full">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl mb-4 font-medium text-white">{process.title}</h2>
            <p className="text-white/80 font-light text-lg">{process.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-[28px] left-[12%] right-[12%] h-[1px]" style={{ backgroundColor: `${colors.primary}80` }} />
            
            {process.steps.map((step: any, index: number) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center font-serif text-2xl font-semibold mb-6 shadow-md text-white"
                  style={{ backgroundColor: colors.primary }}
                >
                  {index + 1}
                </div>
                <h3 className="font-serif text-2xl mb-3 text-white">{step.title}</h3>
                <p className="text-white/80 font-light text-sm max-w-[250px]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        {/* Packages Section */}
        <div id="packages">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl mb-4 font-medium">{packages.title}</h2>
            <p className="text-white/70 font-light text-lg">{packages.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.items.map((pkg: any, idx: number) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="rounded-[2rem] p-10 flex flex-col h-full shadow-lg"
                style={{ 
                  backgroundColor: idx === 1 ? colors.secondary : 'rgba(255,255,255,0.05)',
                  color: idx === 1 ? colors.text : 'white'
                }}
              >
                <span 
                  className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block"
                  style={{ color: idx === 1 ? colors.text : colors.secondary }}
                >
                  {pkg.note}
                </span>
                <h3 className="font-serif text-3xl mb-2">{pkg.name}</h3>
                <div className="font-serif text-2xl mb-6 opacity-90">{pkg.price}</div>
                <p className="font-light mb-8 flex-grow" style={{ color: idx === 1 ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.7)' }}>
                  {pkg.description}
                </p>
                
                <ul className="space-y-4 mb-10">
                  {pkg.features.map((f: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <span className="mt-1 text-[10px]" style={{ color: idx === 1 ? colors.text : colors.secondary }}>✦</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                
                <a
                  href={pkg.buttonHref}
                  className="mt-auto block text-center px-6 py-4 rounded-full text-[11px] font-bold uppercase tracking-widest transition-colors"
                  style={{
                    backgroundColor: idx === 1 ? colors.text : 'transparent',
                    color: idx === 1 ? 'white' : 'white',
                    border: idx === 1 ? 'none' : `1px solid ${colors.secondary}50`
                  }}
                  onMouseOver={(e) => {
                    if (idx !== 1) e.currentTarget.style.borderColor = colors.secondary;
                  }}
                  onMouseOut={(e) => {
                    if (idx !== 1) e.currentTarget.style.borderColor = `${colors.secondary}50`;
                  }}
                >
                  {pkg.buttonLabel}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
