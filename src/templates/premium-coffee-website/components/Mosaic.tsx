"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { useTemplateData } from '../TemplateContext';
import { motion } from 'motion/react';


export default function Mosaic() {
  const siteContent = useTemplateData();

  return (
    <section className="bg-brand-black">
      <div className="flex flex-col md:flex-row w-full h-[60vh] md:h-[80vh]">
        <motion.a 
          href="#"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="group relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden block"
        >
          <TemplateImage src={siteContent?.mosaic?.storyImg} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Our Story" />
          <div className="absolute inset-0 bg-brand-black/40 group-hover:bg-brand-black/20 transition-colors duration-500" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-4xl md:text-6xl font-heading uppercase tracking-widest text-transparent text-stroke group-hover:text-brand-cream transition-colors duration-500">Our Story</h2>
          </div>
        </motion.a>

        <motion.a 
          href="#"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="group relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden block"
        >
          <TemplateImage src={siteContent?.mosaic?.subImg} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Subscriptions" />
          <div className="absolute inset-0 bg-brand-black/40 group-hover:bg-brand-black/20 transition-colors duration-500" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-4xl md:text-6xl font-heading uppercase tracking-widest text-transparent text-stroke group-hover:text-brand-cream transition-colors duration-500">Subscriptions</h2>
          </div>
        </motion.a>
      </div>
    </section>
  );
}
