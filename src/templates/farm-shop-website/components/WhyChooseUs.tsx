import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";
import { Leaf, Heart, Tractor } from "lucide-react";

export default function WhyChooseUs() {
  const data = useTemplateData();
  const { whyChooseUs } = data;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "leaf": return <Leaf size={32} strokeWidth={1.5} />;
      case "heart": return <Heart size={32} strokeWidth={1.5} />;
      case "farmer": return <Tractor size={32} strokeWidth={1.5} />;
      default: return <Leaf size={32} strokeWidth={1.5} />;
    }
  };

  const cardColors = [
    "bg-[#EAF5E1] text-[#1E201E]",
    "bg-[#2C211B] text-[#FDFBF7]",
    "bg-[#F3EAD3] text-[#1E201E]"
  ];

  return (
    <section className="py-24 px-8 md:px-16 bg-[#FDFBF7] text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto mb-16"
      >
        <span className="text-xs font-bold tracking-[0.2em] text-[#548D4E] uppercase mb-4 block">
          {whyChooseUs?.tagline}
        </span>
        <h2 className="text-4xl md:text-5xl font-serif font-medium text-[#1E201E] leading-tight">
          {whyChooseUs?.headline}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {whyChooseUs?.features?.map((feature: any, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className={`rounded-3xl p-10 flex flex-col items-center text-center ${cardColors[index % cardColors.length]}`}
          >
            <div className="mb-6 opacity-80">
              {getIcon(feature.icon)}
            </div>
            <h3 className="text-2xl font-serif font-medium mb-4">{feature.title}</h3>
            <p className="font-sans text-sm md:text-base opacity-80 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
