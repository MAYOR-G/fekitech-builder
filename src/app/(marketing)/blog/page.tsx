"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";

import { motion } from "motion/react";

import { categories, posts } from "@/lib/data/posts";

const ease = [0.25, 0.46, 0.45, 0.94] as const;


export default function BlogPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="pt-20 pb-12 px-6 text-center">
        <div className="max-w-[600px] mx-auto">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="text-[clamp(32px,5vw,52px)] font-semibold text-ft-ink tracking-[-0.01em] leading-[1.1] mb-5">
            Blog & Resources
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1, ease }} className="text-ft-body text-lg">
            Tips, guides, and insights to help you build and grow online.
          </motion.p>
        </div>
      </section>

      {/* Categories */}
      <div className="px-6 mb-10">
        <div className="max-w-[1280px] mx-auto flex flex-wrap gap-2 justify-center">
          {categories.map((cat, i) => (
            <button key={cat} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${i === 0 ? "text-white" : "bg-ft-border-light text-ft-body hover:bg-ft-border"}`} style={i === 0 ? { background: "var(--gradient-brand)" } : {}}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Post */}
      <section className="px-6 mb-16">
        <div className="max-w-[1280px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease }} className="flex flex-col lg:flex-row gap-8 rounded-3xl overflow-hidden" style={{ boxShadow: "var(--shadow-card)" }}>
            <TemplateImage src={posts[0].img} alt={posts[0].title} className="w-full lg:w-1/2 aspect-[16/10] object-cover" loading="lazy" />
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-ft-primary mb-3">{posts[0].category}</span>
              <h2 className="text-2xl md:text-3xl font-semibold text-ft-ink leading-tight mb-3">{posts[0].title}</h2>
              <p className="text-ft-body leading-relaxed mb-4">{posts[0].excerpt}</p>
              <span className="text-ft-muted text-xs">{posts[0].date}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 pb-28">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(1).map((post, i) => (
            <motion.article key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08, ease }} className="group cursor-pointer rounded-3xl overflow-hidden" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="overflow-hidden"><TemplateImage src={post.img} alt={post.title} className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" /></div>
              <div className="p-6">
                <span className="text-xs font-semibold uppercase tracking-[0.1em] text-ft-primary">{post.category}</span>
                <h3 className="font-semibold text-ft-ink mt-2 mb-2 group-hover:text-ft-primary transition-colors">{post.title}</h3>
                <p className="text-ft-body text-sm leading-relaxed mb-3">{post.excerpt}</p>
                <span className="text-ft-muted text-xs">{post.date}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
