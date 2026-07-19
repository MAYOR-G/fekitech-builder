"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";

import { motion } from "motion/react";
import Link from "next/link";

export default function TemplateOnboarding() {
  return (
    <section className="py-24 bg-white relative overflow-hidden border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 leading-[1.1]">
              Start with a designer template, make it your own.
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Choose a professionally designed starting point, then update the content, colors, images, and settings exposed by that template.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "A growing catalog of business templates",
                "Mobile-responsive by default",
                "Customizable to match your brand"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/templates" className="btn-primary min-h-12 px-8 text-center">
                Explore Templates
              </Link>
              <Link href="/support" className="btn-secondary min-h-12 px-8 text-center">
                Get a Custom Build
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 w-full"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-gray-50 aspect-[4/3] flex items-center justify-center group">
               <TemplateImage src="https://images.unsplash.com/photo-1542744094-24638ea0b3b5?q=80&w=2000&auto=format&fit=crop" alt="Editor interface" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent flex flex-col justify-end p-8">
                  <div className="bg-white/95 backdrop-blur-sm p-5 rounded-xl max-w-sm shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                     <p className="font-bold text-gray-900 text-lg">Intuitive Customization</p>
                     <p className="text-sm text-gray-600 mt-2 leading-relaxed">Edit the content and design controls supported by your chosen template. No coding required.</p>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
