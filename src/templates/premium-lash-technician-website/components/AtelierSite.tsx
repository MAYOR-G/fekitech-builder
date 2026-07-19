"use client";
import Image from "next/image";
import { readTemplateTextGroup } from "@/lib/template-data";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Lenis from "lenis";
import {
  ArrowLeft,
  ArrowRight,
  AtSign,
  ChevronDown,
  Eye,
  Menu,
  MoveUpRight,
  Music2,
  Pin,
  Send,
  Sparkles,
  Wand2,
  X,
} from "lucide-react";
import type { transformations as lashTransformations } from "../lib/content";

import { useTemplateData } from "../TemplateContext";
const filters = ["All", "Classic", "Hybrid", "Volume", "Mega Volume", "Lash Lift", "Brow"];
const navLinks = ["Work", "Services", "About", "Book"];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.22 }}
      variants={fadeUp}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector<HTMLElement>("#top");
      const trigger = hero ? hero.offsetHeight - 16 : 80;
      setScrolled(window.scrollY > trigger);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 h-[76px] w-full transition-all duration-300 ${
        scrolled || open
          ? "bg-white text-charcoal shadow-[0_2px_10px_rgba(0,0,0,0.04)]"
          : "bg-transparent text-white"
      }`}
    >
      <div className="section-shell flex h-full items-center justify-between">
        <a
          href="#top"
          className="font-display text-[26px] font-normal tracking-[0.08em]"
          aria-label="LASHED home"
        >
          LASHED
        </a>
        <nav className="hidden items-center gap-10 lg:flex" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a
              key={link}
              href={link === "Book" ? "#book" : `#${link.toLowerCase()}`}
              className="group relative text-[12px] font-semibold uppercase tracking-[0.12em]"
            >
              {link}
              <span className="absolute -bottom-2 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a className="pill bg-mauve text-white shadow-[0_14px_32px_rgba(212,165,165,0.26)]" href="#book">
            Book Now
          </a>
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-current/25 lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 top-[76px] bg-plum text-white lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex h-full flex-col items-center justify-center gap-9">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={link === "Book" ? "#book" : `#${link.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="font-display text-5xl font-normal"
                >
                  {link}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const content = useTemplateData();
  const { heroImage } = content;
  const hero = readTemplateTextGroup(content, "hero");
  const titleWords = hero.title.split(/\s+/);
  const titleStart = titleWords.slice(0, -1).join(" ") || hero.title;
  const titleEnd = titleWords.length > 1 ? titleWords.at(-1) : "";

  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-plum text-white">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1.06 }}
          transition={{ opacity: { duration: 0.5 }, scale: { duration: 12, ease: "easeOut" } }}
      >
        <Image
          src={heroImage}
          alt="Close-up eye with flawless lash extensions on a dark editorial background"
          fill
          priority
          loading="eager"
          sizes="100vw"
          className="image-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(20,20,20,0.68),transparent_56%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(17,17,17,0.36),transparent_54%)]" />
      <div className="section-shell relative z-10 flex min-h-screen items-center pt-[76px]">
        <div className="max-w-[720px]">
          <motion.p
            className="mb-7 text-[12px] font-semibold uppercase tracking-[0.16em] text-mauve"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.45 }}
          >
            LASHED
          </motion.p>
          <h1 className="font-display text-[clamp(4.2rem,11vw,8.6rem)] font-normal leading-[0.86] tracking-normal">
            {[titleStart].map((word, index) => (
              <motion.span
                key={word}
                className="block"
                initial={{ opacity: 0, y: 46 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.52 + index * 0.15, duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            ))}
            <motion.span
              className="block italic text-mauve"
              initial={{ opacity: 0, y: 46 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.82, duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
            >
              {titleEnd}
            </motion.span>
          </h1>
          <motion.p
            className="mt-8 max-w-[520px] text-lg leading-8 text-white/88"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.02, duration: 0.5 }}
          >
            {hero.subtitle}
          </motion.p>
          <motion.div
            className="mt-9 flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.18, duration: 0.45 }}
          >
            <a className="pill bg-mauve text-white shadow-[0_18px_42px_rgba(212,165,165,0.34)]" href="#book">
              {hero.button}
            </a>
            <a className="pill border border-white/55 text-white hover:border-mauve hover:bg-white/10" href="#work">
              View Portfolio
            </a>
          </motion.div>
        </div>
      </div>
      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-mauve"
        aria-label="Scroll to atelier introduction"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.5, duration: 0.4 }, y: { repeat: Infinity, duration: 1.8 } }}
      >
        <span className="h-12 w-px bg-mauve" />
        <ChevronDown size={20} />
      </motion.a>
    </section>
  );
}

function Intro() {
  const content = useTemplateData();
  const { studioImage } = content;
  const about = readTemplateTextGroup(content, "about");

  return (
    <section id="about" className="bg-white py-24 md:py-36">
      <div className="section-shell grid items-center gap-14 lg:grid-cols-[1fr_1fr]">
        <Reveal>
          <div className="relative min-h-[520px] overflow-hidden">
            <Image
              src={studioImage}
              alt="Lash artist working with precision in a serene studio"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="image-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="label">The Atelier</p>
          <h2 className="headline mt-5">{about.title}</h2>
          <p className="body-copy mt-7">
            {about.text}
          </p>
          <a href="#artist" className="group mt-10 inline-flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.12em] text-mauve">
            Meet The Artist
            <MoveUpRight className="transition group-hover:translate-x-1" size={16} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Portfolio() {
  const { portfolioItems } = useTemplateData();

  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState<number | null>(null);
  const filtered = useMemo(
    () => portfolioItems.filter((item) => filter === "All" || item.category === filter),
    [filter, portfolioItems],
  );

  return (
    <section id="work" className="bg-white py-24 md:py-36">
      <div className="section-shell">
        <Reveal className="text-center">
          <p className="label">The Portfolio</p>
          <h2 className="headline mt-5">Designed to Be Noticed.</h2>
        </Reveal>
        <div className="mt-10 flex flex-wrap justify-center gap-3" role="tablist" aria-label="Portfolio filters">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.1em] transition ${
                filter === item ? "text-mauve" : "text-charcoal/55 hover:text-mauve"
              }`}
              role="tab"
              aria-selected={filter === item}
            >
              <span className="relative">
                {item}
                <span className={`absolute -bottom-2 left-0 h-px bg-mauve transition-all ${filter === item ? "w-full" : "w-0"}`} />
              </span>
            </button>
          ))}
        </div>
        <motion.div layout className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.button
                layout
                key={item.title}
                onClick={() => setActive(index)}
                className={`group relative min-h-[420px] overflow-hidden bg-plum text-white ${
                  item.featured ? "lg:col-span-2" : ""
                }`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                aria-label={`Open ${item.title} gallery image`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="image-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute inset-0 bg-charcoal/0 transition duration-300 group-hover:bg-charcoal/20" />
                <span className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
                  <span className="border border-white/70 px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.12em]">
                    {item.title}
                  </span>
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <AnimatePresence>
        {active !== null && filtered[active] && (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center bg-plum/95 p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
          >
            <button
              className="absolute right-6 top-6 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-charcoal"
              onClick={() => setActive(null)}
              aria-label="Close gallery image"
            >
              <X size={20} />
            </button>
            <div className="relative h-[82vh] w-[min(920px,92vw)] max-w-[920px] overflow-hidden">
              <Image src={filtered[active].src} alt={filtered[active].alt} fill sizes="92vw" className="image-cover" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Services() {
  const { services } = useTemplateData();

  const [active, setActive] = useState(0);

  return (
    <section id="services" className="bg-white py-24 md:py-36">
      <div className="section-shell grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal>
            <p className="label">The Menu</p>
            <h2 className="headline mt-5">What We Do.</h2>
          </Reveal>
          <div className="mt-12 divide-y divide-line">
            {services.map((service, index) => (
              <motion.button
                key={service.name}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                className="group grid w-full gap-3 py-6 text-left transition duration-300 hover:bg-[#FAFAFA] sm:grid-cols-[1fr_auto] sm:px-4"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
              >
                <span className="transition duration-300 hover:translate-x-1">
                  <span className="font-display block text-[27px] leading-none text-charcoal">{service.name}</span>
                  <span className="mt-2 block text-sm text-muted">{service.description}</span>
                </span>
                <span className="self-center text-sm font-bold text-charcoal transition-colors group-hover:text-mauve">{service.price}</span>
              </motion.button>
            ))}
          </div>
          <a className="pill mt-10 bg-mauve text-white shadow-[0_16px_42px_rgba(212,165,165,0.28)]" href="#book">
            Book This Service
          </a>
        </div>
        <Reveal delay={0.16} className="lg:sticky lg:top-28 lg:h-fit">
          <div className="relative min-h-[620px] overflow-hidden bg-plum">
            <AnimatePresence mode="wait">
              <motion.div
                key={services[active].image}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
              >
                <Image
                  src={services[active].image}
                  alt={`${services[active].name} lash and brow service example`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="image-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    ["01", "Consult", "We map your eye shape and discuss your dream look."],
    ["02", "Create", "Every lash is placed with surgical precision."],
    ["03", "Admire", "Walk out with a gaze that stops conversations."],
  ];

  return (
    <section className="bg-white py-24 md:py-36">
      <div className="section-shell">
        <Reveal className="max-w-[620px]">
          <p className="label">The Experience</p>
          <h2 className="headline mt-5">How It Works.</h2>
        </Reveal>
        <div className="relative mt-14 grid gap-5 md:grid-cols-3">
          <span className="absolute left-0 right-0 top-[68px] hidden h-px bg-line md:block" aria-hidden="true" />
          {steps.map(([number, title, text], index) => (
            <Reveal key={title} delay={index * 0.1}>
              <article className="relative border border-line bg-white px-7 py-9 shadow-[0_16px_50px_rgba(17,17,17,0.04)]">
                <span className="mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white text-mauve">
                  {index === 0 ? <Send size={20} /> : index === 1 ? <Wand2 size={20} /> : <Sparkles size={20} />}
                </span>
                <p className="font-display absolute right-7 top-6 text-[82px] font-normal leading-none text-mauve/18">{number}</p>
                <h3 className="font-display mt-7 text-[30px] leading-none text-charcoal">{title}</h3>
                <p className="mt-4 text-[16px] leading-7 text-charcoal">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TransformationCard({
  item,
  index,
}: {
  item: (typeof lashTransformations)[number];
  index: number;
}) {
  const [position, setPosition] = useState(index === 1 ? 64 : 56);

  return (
    <Reveal delay={index * 0.1}>
      <article className="group">
        <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
          <Image
            src={item.before}
            alt={`${item.alt} before`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="image-cover grayscale"
          />
          <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
            <Image
              src={item.after}
              alt={`${item.alt} after`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="image-cover contrast-110 saturate-110"
            />
          </div>
          <span className="absolute left-4 top-4 bg-charcoal/70 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur">
            Before
          </span>
          <span className="absolute right-4 top-4 bg-mauve/90 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur">
            After
          </span>
          <span className="absolute bottom-0 top-0 w-px bg-white" style={{ left: `${position}%` }} />
          <span
            className="absolute top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-mauve bg-mauve text-white shadow-[0_10px_28px_rgba(212,165,165,0.38)]"
            style={{ left: `${position}%` }}
            aria-hidden="true"
          >
            <ArrowLeft size={15} />
            <ArrowRight size={15} className="-mt-[15px] ml-[14px]" />
          </span>
          <input
            type="range"
            min="18"
            max="82"
            value={position}
            onChange={(event) => setPosition(Number(event.target.value))}
            className="absolute inset-x-5 bottom-5 z-10 accent-mauve"
            aria-label={`Compare before and after ${item.title}`}
          />
        </div>
        <h3 className="font-display mt-5 text-2xl font-semibold text-charcoal">{item.title}</h3>
      </article>
    </Reveal>
  );
}

function Transformations() {
  const { transformations } = useTemplateData();

  return (
    <section className="bg-white py-24 text-charcoal md:py-36">
      <div className="section-shell">
        <Reveal className="max-w-[680px]">
          <p className="label">Transformations</p>
          <h2 className="headline mt-5">The LASHED Effect.</h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {transformations.map((item, index) => (
            <TransformationCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const { testimonials } = useTemplateData();

  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % testimonials.length),
      6000,
    );
    return () => window.clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="relative overflow-hidden bg-white py-24 text-charcoal md:py-36">
      <div className="section-shell relative z-10 text-center">
        <Reveal>
          <p className="label">Client Notes</p>
          <h2 className="headline mx-auto mt-5">What Clients Say.</h2>
        </Reveal>
        <div className="relative mx-auto mt-14 max-w-[860px]">
          <span className="font-display text-[116px] leading-none text-mauve">“</span>
          <AnimatePresence mode="wait">
            <motion.figure
              key={testimonials[active].name}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45 }}
            >
              <blockquote className="font-display text-[clamp(28px,4.2vw,42px)] italic leading-tight text-charcoal">
                {testimonials[active].quote}
              </blockquote>
              <figcaption className="mt-8">
                <span className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-blush text-sm font-bold text-charcoal">
                  {testimonials[active].name.slice(0, 1)}
                </span>
                <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-charcoal">
                  {testimonials[active].name}
                </p>
                <p className="mt-2 text-sm text-muted">{testimonials[active].service}</p>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-charcoal transition hover:border-mauve hover:text-mauve"
              onClick={() => setActive((active - 1 + testimonials.length) % testimonials.length)}
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={18} />
            </button>
            {testimonials.map((item, index) => (
              <button
                key={item.name}
                className={`h-2 rounded-full transition-all ${active === index ? "w-8 bg-mauve" : "w-2 bg-line"}`}
                onClick={() => setActive(index)}
                aria-label={`Show testimonial ${index + 1}`}
              />
            ))}
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-charcoal transition hover:border-mauve hover:text-mauve"
              onClick={() => setActive((active + 1) % testimonials.length)}
              aria-label="Next testimonial"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const { pricing } = useTemplateData();

  return (
    <section className="bg-white py-24 md:py-36">
      <div className="section-shell">
        <Reveal className="text-center">
          <p className="label">Investment</p>
          <h2 className="headline mt-5">Your Gaze, Your Way.</h2>
        </Reveal>
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {pricing.map((tier, index) => (
            <Reveal key={tier.name} delay={index * 0.1}>
              <article
                className={`group relative flex h-full flex-col rounded-md border p-8 transition duration-300 hover:-translate-y-1.5 hover:border-mauve hover:shadow-[0_30px_86px_rgba(17,17,17,0.10)] ${
                  tier.badge
                    ? "border-line border-t-[3px] border-t-mauve bg-white shadow-[0_24px_80px_rgba(212,165,165,0.16)]"
                    : "border-line bg-white shadow-[0_16px_55px_rgba(17,17,17,0.04)]"
                }`}
              >
                {tier.badge && (
                  <span className="absolute right-6 top-6 rounded-sm bg-mauve px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                    {tier.badge}
                  </span>
                )}
                <h3 className="font-display text-[30px] text-charcoal">{tier.name}</h3>
                <p className="mt-7 text-[32px] font-bold text-mauve">{tier.price}</p>
                <p className="mt-2 text-sm text-muted">{tier.duration}</p>
                <span className="my-8 block h-px w-full bg-line" />
                <ul className="flex-1 space-y-3 text-[15px] text-charcoal">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Eye size={15} className="text-mauve" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a className="pill mt-9 bg-mauve text-white hover:bg-gold" href="#book">
                  Book This Set
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Artist() {
  const { artistImage } = useTemplateData();

  return (
    <section id="artist" className="bg-white py-24 md:py-36">
      <div className="section-shell grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
        <Reveal>
          <div className="relative min-h-[580px] overflow-hidden bg-plum">
            <Image
              src={artistImage}
              alt="Lash artist detail with precise lash and brow work"
              fill
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="image-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/35 to-transparent" />
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="label">The Artist</p>
          <h2 className="headline mt-5">The Hands Behind the Gaze.</h2>
          <div className="mt-9 border-l border-mauve pl-7">
            <h3 className="font-display text-[32px] leading-none text-charcoal">Maya Chen</h3>
            <p className="mt-3 text-[12px] font-bold uppercase tracking-[0.12em] text-mauve">
              Founder & Lead Lash Artist
            </p>
          </div>
          <p className="body-copy mt-8">
            With over 8 years of experience and a passion for precision, Maya designs bespoke lash sets that enhance every eye shape.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {["Certified Lash Technician", "Volume Certified", "Brow Lamination Specialist"].map((item) => (
              <span key={item} className="rounded-full border border-line bg-white px-4 py-3 text-[12px] font-semibold text-charcoal">
                {item}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function InstagramFeed() {
  const { instagramImages } = useTemplateData();

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="section-shell">
        <Reveal className="text-center">
          <p className="label">Follow The Art</p>
          <h2 className="headline mt-5">@lashed.atelier</h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {instagramImages.map((src, index) => (
            <Reveal key={`${src}-${index}`} delay={index * 0.04}>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="group relative block aspect-square overflow-hidden bg-plum"
                aria-label={`Open LASHED social lash work image ${index + 1}`}
              >
                <Image
                  src={src}
                  alt={`LASHED close-up lash and brow work post ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 16vw"
                  className="image-cover transition duration-500 group-hover:scale-[1.05]"
                />
                <span className="absolute inset-0 grid place-items-center bg-charcoal/0 transition duration-300 group-hover:bg-charcoal/20">
                  <AtSign className="scale-75 text-white opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookingCTA() {
  return (
    <section id="book" className="relative overflow-hidden bg-plum py-24 text-center text-white md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_20%,rgba(212,165,165,0.18),transparent_34%)]" />
      <Reveal className="section-shell relative z-10">
        <h2 className="font-display text-[clamp(46px,7vw,76px)] font-normal leading-none">Your Best Gaze Awaits.</h2>
        <p className="mx-auto mt-6 max-w-[460px] text-lg text-white/90">Appointments fill fast. Secure yours today.</p>
        <a className="pill mt-9 bg-mauve px-8 text-white shadow-[0_18px_50px_rgba(212,165,165,0.24)]" href="mailto:hello@lashed-atelier.com">
          Book Your Appointment
          <MoveUpRight size={16} />
        </a>
        <a href="mailto:hello@lashed-atelier.com?subject=Gift%20Card" className="mx-auto mt-7 flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-[0.1em] text-white/90 hover:text-white">
          Purchase A Gift Card
          <MoveUpRight size={15} />
        </a>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line bg-white py-16 text-charcoal">
      <div className="section-shell">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <p className="font-display text-4xl font-normal tracking-[0.08em]">LASHED</p>
            <p className="mt-4 text-muted">Define your gaze.</p>
            <div className="mt-8 flex gap-4 text-mauve">
              <AtSign aria-label="Instagram" />
              <Music2 aria-label="TikTok" />
            </div>
          </div>
          <nav className="grid grid-cols-2 gap-4 text-sm text-muted" aria-label="Footer navigation">
            {["Portfolio", "Services", "About", "Book", "Contact", "Privacy"].map((item) => (
              <a key={item} href={item === "Book" ? "#book" : "#top"} className="transition hover:text-mauve">
                {item}
              </a>
            ))}
          </nav>
          <div className="space-y-4 text-sm leading-7 text-muted">
            <p className="flex gap-3"><Pin className="mt-1 shrink-0 text-mauve" size={16} />123 Beauty Lane, London, W1B 2AG</p>
            <p className="flex gap-3"><Send className="mt-1 shrink-0 text-mauve" size={16} />hello@lashed-atelier.com<br />+44 20 7123 4567</p>
            <p className="flex gap-3"><Wand2 className="mt-1 shrink-0 text-mauve" size={16} />Tue-Sat: 10am-8pm | Sun-Mon: Closed</p>
          </div>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-5 border-t border-line pt-8 text-sm text-muted sm:flex-row">
          <p>© 2026 Lashed Atelier. All rights reserved.</p>
          <a href="#top" className="text-mauve transition hover:text-charcoal">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}

export default function AtelierSite() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const lenis = new Lenis({ lerp: 0.08, duration: 1.1 });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <Portfolio />
        <Services />
        <Process />
        <Transformations />
        <Testimonials />
        <Pricing />
        <Artist />
        <InstagramFeed />
        <BookingCTA />
      </main>
      <Footer />
    </>
  );
}
