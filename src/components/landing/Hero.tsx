"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { GradientButton } from "@/components/ui/GradientButton";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const pills = [
  "Cleaning",
  "Automotive",
  "Consulting",
  "E-commerce Store",
  "Beauty Salon",
  "Pet Grooming",
];

export default function Hero() {
  return (
    <section
      className="texture-wash relative flex flex-col items-center justify-center overflow-hidden px-5 pt-[140px] pb-12"
      style={{
        background:
          "radial-gradient(120% 100% at 50% 0%, rgba(250, 250, 255, 1) 0%, rgba(246, 248, 255, 0.8) 50%, rgba(255, 255, 255, 1) 100%)",
      }}
    >
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-ft-primary via-ft-berry to-ft-primary opacity-80" />
      
      {/* Refined ambient glows */}
      <div className="absolute left-1/2 top-0 h-[400px] w-[min(1000px,100vw)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(0,185,235,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute left-1/2 top-20 h-[300px] w-[min(800px,80vw)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(161,0,255,0.06),transparent_50%)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[960px] mx-auto text-center flex flex-col items-center">

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="max-w-[940px] text-balance text-[clamp(48px,8vw,96px)] font-[800] leading-[0.98] tracking-[-0.04em] text-transparent bg-clip-text bg-gradient-to-b from-ft-ink to-ft-ink/80"
        >
          Build a website that is ready for business
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="mt-8 max-w-[680px] text-pretty text-[1.125rem] leading-[1.6] text-ft-body/90 sm:text-[1.25rem]"
        >
          Choose a template, customize it to match your business, and publish without writing code.
        </motion.p>

        {/* Input + Button */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="mt-10 w-full max-w-[800px]"
        >
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <GradientButton href="/signup" className="group min-h-[56px] w-full !px-8 text-base font-semibold sm:w-auto shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)] transition-all">
              Start building
              <ArrowRight className="inline-block ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </GradientButton>
            <Link href="/templates" className="inline-flex items-center justify-center min-h-[56px] w-full px-8 text-base font-semibold bg-white border border-black/10 rounded-[999px] text-ft-ink shadow-sm hover:bg-gray-50 hover:border-black/20 transition-all sm:w-auto">
              Explore templates
            </Link>
          </div>
          
          <div className="mt-5 flex items-center justify-center gap-1.5 text-sm text-ft-body/80 font-medium">
            <CheckCircle2 className="w-4 h-4 text-ft-primary/70" />
            <span>Browse and customize for free. An active paid plan is required to publish.</span>
          </div>

          {/* Category Pills */}
          <div className="mt-12 flex flex-col items-center">
            <span className="text-xs font-semibold tracking-wider text-ft-body/50 uppercase mb-4">Popular Categories</span>
            <div className="flex flex-wrap justify-center gap-3">
              {pills.map((pill) => (
                <Link
                  key={pill}
                  href="/templates"
                  className="group relative px-5 py-2.5 rounded-full bg-white/40 border border-white/60 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:border-ft-primary/30 hover:shadow-[0_8px_24px_rgba(49,70,211,0.12)] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-ft-primary/0 via-ft-primary/5 to-ft-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                  <span className="relative z-10 text-sm font-semibold text-ft-body group-hover:text-ft-primary transition-colors">
                    {pill}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
