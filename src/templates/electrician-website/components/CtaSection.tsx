"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { motion } from "motion/react";
import { PhoneCall } from "lucide-react";
import { ButtonLink } from "./ButtonLink";

import { useTemplateData } from "../TemplateContext";
export function CtaSection() {
  const { brand } = useTemplateData();

  return (
    <section id="contact" className="relative py-32 sm:py-48 overflow-hidden bg-navy">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <TemplateImage 
          src="/images/electrician_cta_1781688605540.png" 
          alt="Electrician testing circuit"
          className="w-full h-full object-cover grayscale-[20%]"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="relative z-10 mx-auto max-w-5xl px-5 text-center lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <span className="inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md mb-6">
            Ready to dispatch
          </span>
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Need an electrician right now?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-white">
            Whether it&apos;s an emergency outage, a tripping breaker, or a planned panel upgrade, our licensed team is ready to deploy.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row w-full sm:w-auto">
            <ButtonLink href={`tel:${brand.emergencyPhone.replace(/\D/g, '')}`} variant="yellow" className="w-full sm:w-auto text-base h-16 px-10 shadow-xl shadow-amber/20 hover:-translate-y-1 transition-transform">
              <PhoneCall className="mr-3 h-6 w-6" />
              Call {brand.emergencyPhone}
            </ButtonLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
