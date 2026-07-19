"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    title: "Proactive Tax Strategy",
    description: "We actively structure your business and personal assets to legally minimize tax liabilities long before deadlines arrive, preserving your wealth efficiently.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Corporate Advisory",
    description: "Virtual CFO services, advanced cash flow forecasting, and M&A support. We provide the financial leadership required to scale your enterprise.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Private Wealth & Estates",
    description: "Comprehensive personal tax planning, estate structuring, and wealth preservation strategies tailored for high-net-worth individuals and families.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Cloud Accounting",
    description: "Real-time data at your fingertips. We manage your books on premium cloud platforms, ensuring flawless, instant financial visibility and compliance.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  }
];

export default function Services() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Transform scroll progress into horizontal movement
  // We have 4 cards. We want to slide them left.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section id="expertise" ref={targetRef} className="relative h-[300vh] bg-white text-charcoal">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden py-24">
        
        <div className="max-w-7xl mx-auto px-6 w-full mb-12 shrink-0">
          <div className="text-gold-600 text-xs uppercase tracking-widest font-bold mb-4">
            Our Services
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-serif text-4xl md:text-5xl text-forest-900">
              Expertise & Advisory
            </h2>
            <p className="text-charcoal/70 font-light text-lg max-w-md leading-relaxed">
              We replace the traditional, reactive accountant with a proactive financial partnership. 
            </p>
          </div>
        </div>

        {/* Horizontal scroll container */}
        <div className="w-full flex-grow relative overflow-hidden flex items-center">
          <motion.div style={{ x }} className="flex gap-8 px-6 md:px-12 xl:px-[calc((100vw-80rem)/2+1.5rem)] pb-12 w-max">
            {services.map((service, index) => (
              <div 
                key={index}
                className="w-[85vw] md:w-[35rem] shrink-0 group flex flex-col bg-offwhite hover:shadow-2xl transition-all duration-500 border border-charcoal/5 overflow-hidden h-[500px]"
              >
                <div className="h-56 overflow-hidden relative shrink-0">
                  <TemplateImage 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-forest-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                <div className="p-8 md:p-10 flex flex-col flex-grow">
                  <div className="text-gold-600 text-xs uppercase tracking-widest font-bold mb-4">0{index + 1}</div>
                  <h3 className="font-serif text-3xl text-forest-900 mb-4">{service.title}</h3>
                  <p className="text-charcoal/70 font-light leading-relaxed mb-8 flex-grow">
                    {service.description}
                  </p>
                  <div className="flex items-center text-forest-900 font-medium text-sm tracking-wide uppercase group-hover:text-gold-600 transition-colors mt-auto">
                    Learn More <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
