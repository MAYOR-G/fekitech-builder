"use client";

import { motion } from "motion/react";
import { BookOpen, LayoutTemplate, Mail, MessageCircle } from "lucide-react";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const helpCategories = [
  { icon: BookOpen, title: "Getting Started", desc: "Create an account, choose a template, and make your first project." },
  { icon: LayoutTemplate, title: "Template previews", desc: "Choose, preview, and customize the content supported by a template." },
  { icon: MessageCircle, title: "Editing and versions", desc: "Save changes, upload images, create versions, and restore a draft." },
  { icon: Mail, title: "Publishing and domains", desc: "Publish to a subdomain or verify a plan-supported custom domain." },
];

export default function SupportPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="pt-20 pb-16 px-6 text-center bg-ft-surface-cool">
        <div className="max-w-[600px] mx-auto">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="text-[clamp(32px,5vw,52px)] font-semibold text-ft-ink tracking-[-0.01em] leading-[1.1] mb-5">
            How can we help?
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15, ease }} className="mx-auto max-w-md text-ft-body">
            Start with the topics below or contact the support mailbox for account-specific help.
          </motion.p>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-20 px-6">
        <div className="max-w-[960px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {helpCategories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1, ease }} className="bg-white rounded-3xl p-8 flex items-start gap-5" style={{ boxShadow: "var(--shadow-card)" }}>
                <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center flex-shrink-0"><Icon className="w-5 h-5 text-white" /></div>
                <div>
                  <h3 className="font-semibold text-ft-ink mb-1">{cat.title}</h3>
                  <p className="text-ft-body text-sm leading-relaxed">{cat.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-ft-surface-cool px-6">
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="text-2xl font-semibold text-ft-ink mb-4">Still need help?</h2>
          <p className="text-ft-body mb-8">Email support with your account address and project name. Do not include passwords or secret keys.</p>
          <a href="mailto:support@fekitech.com" className="btn-gradient text-sm !py-3 !px-8 inline-flex items-center justify-center gap-2"><Mail className="w-4 h-4" /> Email support</a>
        </div>
      </section>
    </div>
  );
}
