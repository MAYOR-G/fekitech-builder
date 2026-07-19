"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { LogoMark } from "@/components/ui/LogoMark";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function FinalCTA() {
  return (
    <section id="start-building" className="relative overflow-hidden bg-[#A100FF] px-5 pt-24 sm:px-6 sm:pt-28">
      <div className="absolute inset-0 opacity-[0.08] texture-wash" />
      <div className="pointer-events-none absolute bottom-[-220px] left-1/2 h-[620px] w-[1050px] -translate-x-1/2 rounded-[999px] bg-[#A54CFF]/30 blur-[110px]" />

      <div className="relative z-10 mx-auto flex max-w-[1240px] flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-6 max-w-[1080px] text-balance text-[clamp(42px,5.6vw,76px)] font-[780] leading-[1.02] tracking-[-0.035em] text-white"
        >
          Start building today. Publish when you are ready.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          className="mb-9 max-w-[680px] text-lg leading-8 text-[#E8DDF7] sm:text-xl"
        >
          Browse templates and customize your draft for free. Choose a paid plan only when you are ready to publish.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
        >
          <Link
            href="/signup"
            className="inline-flex min-h-14 items-center justify-center rounded-full bg-white px-10 py-4 text-base font-bold text-[#2B124F] shadow-[0_14px_34px_rgba(15,5,32,0.22)] transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-0.5 hover:bg-[#FBF8FF] hover:shadow-[0_18px_42px_rgba(15,5,32,0.28)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/35"
          >
            Start building
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.28, ease }}
          aria-hidden="true"
          className="mt-16 w-full max-w-[1040px] overflow-hidden rounded-t-[28px] border border-white/20 bg-[#160929] text-left shadow-[0_-8px_80px_rgba(188,102,255,0.24)] sm:rounded-t-[34px]"
        >
          <div className="px-6 py-6 sm:px-10 sm:py-8 lg:px-14">
            <div className="flex items-center justify-between gap-6 border-b border-white/10 pb-6">
              <div className="flex items-center gap-3">
                <LogoMark className="h-8 w-8" />
                <span className="text-sm font-bold text-white">FekiTech Builder</span>
              </div>
              <div className="hidden items-center gap-8 text-xs font-semibold text-white/65 sm:flex">
                <span>Templates</span>
                <span>Features</span>
                <span>Pricing</span>
              </div>
              <span className="rounded-full bg-white px-5 py-2 text-xs font-bold text-[#2B124F]">
                Start building
              </span>
            </div>

            <div className="grid min-h-[330px] items-center gap-10 py-12 md:grid-cols-[1.2fr_0.8fr] md:py-14">
              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-[#D7A7FF]">
                  Your business, online
                </p>
                <h3 className="max-w-[640px] text-[clamp(34px,4.4vw,58px)] font-[760] leading-[1.02] tracking-[-0.03em] text-white">
                  Get online fast and start reaching your audience.
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 h-24 rounded-[20px] bg-[#9F51E8]/45" />
                <div className="h-24 rounded-[20px] bg-white/12" />
                <div className="h-24 rounded-[20px] bg-[#D7A7FF]/25" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
