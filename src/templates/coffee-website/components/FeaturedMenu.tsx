"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import React from 'react';
import { motion } from 'motion/react';
import { useTemplateData } from '../TemplateContext';


const FeaturedMenu = () => {
  const siteContent = useTemplateData();
  return (
    <section id="menu" className="py-24 bg-artisan-coffee-coffee-cream">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <motion.h2 
            className="font-artisan-coffee-serif text-4xl md:text-5xl text-artisan-coffee-coffee-dark mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Curated Menu
          </motion.h2>
          <motion.div 
            className="h-px w-24 bg-artisan-coffee-coffee-terracotta mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Drinks Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-artisan-coffee-sans text-2xl font-light text-artisan-coffee-coffee-dark mb-8 border-b border-artisan-coffee-coffee-brown/20 pb-4">Classic & Signature</h3>
            <div className="space-y-8 mb-12">
              {siteContent.menu.drinks.map((drink, index) => (
                <div key={index} className="group relative">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-artisan-coffee-serif text-xl text-artisan-coffee-coffee-dark group-hover:text-artisan-coffee-coffee-terracotta transition-colors">{drink.name}</h4>
                    <div className="flex-1 border-b border-dotted border-artisan-coffee-coffee-brown/30 mx-4 relative top-[-6px]" />
                    <span className="font-artisan-coffee-sans text-artisan-coffee-coffee-dark/80">{drink.price}</span>
                  </div>
                  <p className="font-light text-sm text-artisan-coffee-coffee-dark/60">{drink.description}</p>
                </div>
              ))}
            </div>

            <div className="relative aspect-[16/9] overflow-hidden shadow-lg hidden lg:block">
              <TemplateImage 
                src={siteContent?.menu?.drinksImage} 
                alt="Signature Coffee" 
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-1000"
              />
            </div>
          </motion.div>

          {/* Food Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="font-artisan-coffee-sans text-2xl font-light text-artisan-coffee-coffee-dark mb-8 border-b border-artisan-coffee-coffee-brown/20 pb-4">Bakery & Bites</h3>
            <div className="space-y-8 mb-12">
              {siteContent.menu.food.map((item, index) => (
                <div key={index} className="group relative">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-artisan-coffee-serif text-xl text-artisan-coffee-coffee-dark group-hover:text-artisan-coffee-coffee-terracotta transition-colors">{item.name}</h4>
                    <div className="flex-1 border-b border-dotted border-artisan-coffee-coffee-brown/30 mx-4 relative top-[-6px]" />
                    <span className="font-artisan-coffee-sans text-artisan-coffee-coffee-dark/80">{item.price}</span>
                  </div>
                  <p className="font-light text-sm text-artisan-coffee-coffee-dark/60">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="relative aspect-[16/9] overflow-hidden shadow-lg">
              <TemplateImage 
                src={siteContent?.menu?.foodImage} 
                alt="Fresh pastries" 
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-1000"
              />
            </div>
          </motion.div>

        </div>
        
        <div className="mt-16 text-center">
          <motion.button 
            className="border border-artisan-coffee-coffee-dark text-artisan-coffee-coffee-dark px-8 py-3 rounded-none font-medium hover:bg-artisan-coffee-coffee-dark hover:text-artisan-coffee-coffee-light transition-colors uppercase tracking-widest text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Full Menu
          </motion.button>
        </div>

      </div>
    </section>
  );
};

export default FeaturedMenu;
