"use client";
import { motion, Variants } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useState } from "react";

const dishes = [
  {
    id: 1,
    name: "HERITAGE ROAST CHICKEN",
    notes: "Rosemary, Garlic, Lemon Butter",
    price: "£18",
    image: "/images/dish_roast_chicken_1783066899369.png"
  },
  {
    id: 2,
    name: "AROMATIC BIRYANI RICE",
    notes: "Saffron, Cardamom, Slow-Cooked Lamb",
    price: "£16",
    image: "/images/dish_biryani_1783066949423.png"
  },
  {
    id: 3,
    name: "GOURMET STREET TACOS",
    notes: "Chipotle, Lime, Fresh Salsa",
    price: "£14",
    image: "/images/dish_tacos_1783066965250.png"
  },
  {
    id: 4,
    name: "TRUFFLE MAC & CHEESE",
    notes: "Black Truffle, Aged Cheddar",
    price: "£15",
    // Reusing biryani image as placeholder since I only generated 3
    image: "/images/hero_chef_plating_1783066890118.png"
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function SignatureDishes() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="bg-brand-dark py-24 px-6 md:px-12 text-brand-white" id="menu">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-heading text-5xl md:text-6xl tracking-widest uppercase"
          >
            OUR SIGNATURE<br />DISHES
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 md:mt-0"
          >
            <Link href="#full-menu" className="text-brand-accent font-medium tracking-widest text-sm hover:text-white transition-colors flex items-center gap-2">
              VIEW FULL MENU <span className="text-lg">→</span>
            </Link>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {dishes.map((dish) => (
            <motion.div 
              key={dish.id} 
              variants={itemVariants}
              className="group relative cursor-pointer"
              onMouseEnter={() => setHoveredId(dish.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-[#1a1a1a]">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill sizes="100vw"
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                />
                
                {/* Overlay & Quick View Button */}
                <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${hoveredId === dish.id ? 'opacity-100' : 'opacity-0'}`}>
                  <button className="bg-white text-brand-dark px-8 py-3 tracking-widest font-bold text-xs uppercase hover:bg-brand-accent hover:text-white hover:border-brand-accent transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-xl rounded-sm">
                    ADD TO CART
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="font-heading text-xl tracking-wider mb-2">{dish.name}</h3>
                  <p className="font-sans text-brand-gray text-xs tracking-wide leading-relaxed">{dish.notes}</p>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <span className="font-sans font-medium text-sm">{dish.price}</span>
                  <button className="text-brand-gray hover:text-brand-accent transition-colors">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
