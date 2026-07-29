import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function Hero() {
  const { hero } = useTemplateData();

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#26352e] text-white" id="top">
      <img
        src={hero.image}
        alt={hero.imageAlt}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,31,25,0.78)_0%,rgba(20,31,25,0.5)_44%,rgba(20,31,25,0.08)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#26352e] to-transparent" />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1480px] items-center px-6 pb-20 pt-32 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex max-w-3xl flex-col items-start rounded-[1.75rem] border border-white/18 bg-[#26352e]/38 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:p-8 lg:p-10"
        >
          <span className="mb-7 rounded-full bg-white/88 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-[#344436]">
            {hero.note}
          </span>
          <h1 className="mb-7 max-w-[10ch] font-serif text-5xl leading-[0.96] tracking-[-0.045em] text-white md:text-7xl lg:text-[6.4rem]">
            {hero.title.split(' ').map((word, i) => (
              <span key={i} className={i === 1 || i === 4 ? "italic font-light text-[#f1c49b]" : ""}>
                {word}{' '}
              </span>
            ))}
          </h1>
          <p className="mb-10 max-w-xl text-lg leading-8 text-white/88 md:text-xl">
            {hero.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <a
              href={hero.primaryHref}
              className="px-9 py-4 bg-[#f1c49b] text-[#26352e] text-[12px] uppercase tracking-[0.18em] font-bold hover:bg-white transition-colors"
            >
              {hero.primaryLabel}
            </a>
            {hero.secondaryLabel && (
              <a
                href={hero.secondaryHref}
                className="border-b border-white/50 pb-1 text-[12px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:text-[#f1c49b]"
              >
                {hero.secondaryLabel}
              </a>
            )}
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-6 right-6 z-10 hidden rounded-2xl bg-white px-5 py-4 text-sm font-bold text-[#26352e] shadow-lg md:block">
        {hero.badge}
      </div>
    </section>
  );
}
