"use client";
import { motion } from "motion/react";
import Image from "next/image";
import { Check } from "lucide-react";

const features = [
  "Cooked fresh to order for maximum flavor",
  "Locally sourced from trusted UK farmers",
  "Eco-friendly, compostable packaging",
  "Customizable delivery schedule"
];

export default function Delivery() {
  return (
    <section className="bg-brand-light py-24 md:py-32 px-6 md:px-12 text-brand-dark overflow-hidden">
      <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center gap-16">
        
        {/* Left: Image */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2"
        >
          <div className="relative aspect-square md:aspect-[4/5] w-full max-w-md mx-auto">
            <Image
              src="/images/dish_roast_chicken_1783066899369.png"
              alt="Takeaway meal box"
              fill sizes="100vw"
              className="object-cover shadow-2xl"
            />
          </div>
        </motion.div>

        {/* Right: Text */}
        <div className="w-full md:w-1/2 flex flex-col items-start">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-heading text-5xl md:text-6xl tracking-tighter uppercase mb-6"
          >
            FROM OUR KITCHEN<br />TO YOUR TABLE
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-brand-dark/80 text-base md:text-lg mb-8 max-w-md"
          >
            Order our weekly family feast boxes or monthly meal kits and never run out of great food at home.
          </motion.p>
          
          <div className="space-y-4 mb-10">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + (idx * 0.1) }}
                className="flex items-center gap-3"
              >
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-accent flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="font-sans text-sm font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
          
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.9 }}
            animate={{ scale: [1, 1.02, 1] }}
            // We use a custom infinite transition on the button using a separate animation property if we want pulse
            className="bg-brand-dark text-white px-8 py-4 font-medium tracking-widest text-sm hover:bg-brand-accent transition-colors duration-300 uppercase"
          >
            EXPLORE DELIVERY
          </motion.button>
        </div>
        
      </div>
    </section>
  );
}
