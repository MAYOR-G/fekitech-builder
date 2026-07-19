"use client";

import { motion } from "motion/react";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const steps = [
  {
    title: "Pick the right website builder.",
    description:
      "Choose a secure, reliable platform like Yola where you can design, host, and manage your site in one place.",
  },
  {
    title: "Clarify your goal.",
    description:
      "Decide what your website should achieve — showcase services, sell products, collect leads, or build credibility.",
  },
  {
    title: "Outline your pages.",
    description:
      "Plan a simple structure (Home, About, Services, Contact, Store, etc.) to keep your content focused and easy to navigate.",
  },
  {
    title: "Choose how to start.",
    description:
      "Use professionally designed templates or let the AI website builder generate a personalized site for you.",
  },
  {
    title: "Add your content.",
    description:
      "Insert your text, images, and key information so visitors quickly understand who you are and what you offer.",
  },
  {
    title: "Customize the design.",
    description:
      "Adjust colors, fonts, layouts, and visuals with the drag-and-drop editor to match your brand style.",
  },
  {
    title: "Optimize for SEO.",
    description:
      "Use built-in SEO tools to set titles, descriptions, and keywords that help your site rank in search engines.",
  },
  {
    title: "Connect your domain.",
    description:
      "Register a custom domain name to make your website look professional and trustworthy.",
  },
  {
    title: "Check mobile and speed.",
    description:
      "Preview your site on different devices to ensure it loads fast and looks great everywhere.",
  },
  {
    title: "Publish and promote.",
    description:
      "Go live and use marketing tools, social media, and analytics to drive traffic and grow your online presence.",
  },
] as const;

export default function Steps() {
  return (
    <section className="rounded-t-[48px] bg-ft-sky-soft px-5 py-24 sm:rounded-t-[64px] sm:px-6 md:py-32 lg:rounded-t-[80px] lg:py-36">
      <div className="mx-auto grid max-w-[1600px] gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.45fr)] lg:items-start lg:gap-20 xl:gap-28">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="max-w-[620px] lg:sticky lg:top-28"
        >
          <h2 className="text-balance text-[clamp(42px,5vw,72px)] font-[800] leading-[1.01] tracking-[-0.035em] text-ft-ink">
            How to create a website for free
          </h2>
          <p className="mt-7 max-w-[560px] text-lg leading-8 text-ft-body sm:text-xl">
            A practical 10-step guide to getting your business online with a free website builder.
          </p>
        </motion.header>

        <ol className="space-y-3 sm:space-y-4">
          {steps.map((step, index) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: Math.min(index * 0.03, 0.15), ease }}
              className="grid min-h-[136px] grid-cols-[64px_minmax(0,1fr)] items-center gap-5 rounded-[24px] bg-white px-6 py-7 shadow-[0_16px_42px_rgba(40,70,92,0.06)] sm:min-h-[148px] sm:grid-cols-[82px_minmax(0,1fr)] sm:gap-7 sm:px-9 sm:py-8"
            >
              <span
                aria-hidden="true"
                className="self-start pt-0.5 text-[52px] font-[700] leading-none tracking-[-0.05em] text-ft-muted/70 sm:text-[64px]"
              >
                {index + 1}.
              </span>
              <p className="text-[17px] leading-7 text-ft-ink sm:text-xl sm:leading-8">
                <strong className="font-[750]">{step.title}</strong>{" "}
                {step.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
