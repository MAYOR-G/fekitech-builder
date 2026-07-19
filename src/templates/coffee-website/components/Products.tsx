"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import React from 'react';
import { motion } from 'motion/react';
import { useTemplateData } from '../TemplateContext';


const Products = () => {
  const siteContent = useTemplateData();
  return (
    <section className="py-24 bg-coffee-cream">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <motion.h2 
            className="font-serif text-4xl md:text-5xl text-coffee-dark mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Take Us Home
          </motion.h2>
          <motion.p 
            className="font-sans font-light text-coffee-dark/80 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Bring the Coffee Crafted experience to your kitchen.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {siteContent.products.map((product, index) => (
            <motion.div 
              key={index}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="relative aspect-square overflow-hidden mb-6 bg-coffee-light">
                <TemplateImage 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-coffee-dark/0 group-hover:bg-coffee-dark/10 transition-colors duration-500" />
              </div>
              <div className="text-center">
                <h3 className="font-serif text-xl text-coffee-dark mb-2">{product.name}</h3>
                <p className="font-sans text-coffee-terracotta">{product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Products;
