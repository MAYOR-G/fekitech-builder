"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { useTemplateData } from '../TemplateContext';
import { motion } from 'motion/react';


export default function Products() {
  const siteContent = useTemplateData();

  return (
    <section className="py-32 px-6 bg-brand-charcoal">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <h2 className="text-5xl md:text-7xl">Our Coffees</h2>
          <a href="#" className="text-brand-accent uppercase tracking-widest font-bold mt-6 md:mt-0 hover:text-white transition-colors">Shop All Collection →</a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {siteContent.products.map((product, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-brand-black">
                <TemplateImage 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 border border-brand-cream/10 group-hover:border-brand-accent/50 transition-colors duration-500 m-4" />
              </div>
              <h3 className="text-2xl mb-2">{product.name}</h3>
              <p className="text-brand-cream/60 text-sm uppercase tracking-wider mb-4">{product.notes}</p>
              <div className="flex justify-between items-center">
                <span className="font-body text-lg">{product.price}</span>
                <span className="text-brand-accent text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">Add to Cart</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
