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
  Menu,
  MoveUpRight,
  Music2,
  Pin,
  Scissors,
  Send,
  Sparkles,
  X,
} from "lucide-react";

import { useTemplateData } from "../TemplateContext";
const filters = ["All", "French", "Nail Art", "Extensions", "Bridal", "Seasonal"];
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
    const onScroll = () => setScrolled(window.scrollY > 42);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 h-[72px] w-full transition-all duration-300 ${
        scrolled || open
          ? "bg-white/95 text-charcoal shadow-[0_10px_40px_rgba(44,44,44,0.08)] backdrop-blur-xl"
          : "bg-transparent text-white"
      }`}
    >
      <div className="section-shell flex h-full items-center justify-between">
        <a
          href="#top"
          className="font-display text-[25px] font-light tracking-[0.08em]"
          aria-label="POLISHED home"
        >
          POLISHED
        </a>
        <nav className="hidden items-center gap-10 lg:flex" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a
              key={link}
              href={link === "Book" ? "#book" : `#${link.toLowerCase()}`}
              className="group relative text-[12px] font-semibold uppercase tracking-[0.12em]"
            >
              {link}
              <span className="absolute -bottom-2 left-0 h-px w-0 bg-rose-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a className="pill bg-berry text-white shadow-[0_14px_32px_rgba(155,75,107,0.25)]" href="#book">
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
            className="fixed inset-0 top-[72px] bg-charcoal text-white lg:hidden"
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
                  className="font-display text-5xl font-light"
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
    <section id="top" className="relative min-h-screen overflow-hidden bg-charcoal text-white">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1.08 }}
        transition={{ opacity: { duration: 0.5 }, scale: { duration: 12, ease: "easeOut" } }}
      >
        <Image
          src={heroImage}
          alt="Glossy sculptural nail art photographed against a dark editorial background"
          fill
          priority
          sizes="100vw"
          className="image-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.4),rgba(0,0,0,0.72))]" />
      <div className="section-shell relative z-10 flex min-h-screen items-center pt-[72px]">
        <div className="max-w-[760px]">
          <motion.p
            className="mb-7 text-[12px] font-semibold uppercase tracking-[0.16em] text-rose-gold"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.45 }}
          >
            POLISHED
          </motion.p>
          <h1 className="font-display text-[clamp(4.8rem,13vw,10rem)] font-light leading-[0.78] tracking-normal">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 46 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52, duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
            >
              {titleStart}
            </motion.span>
            <motion.span
              className="block italic text-rose-gold"
              initial={{ opacity: 0, y: 46 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.64, duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
            >
              {titleEnd}
            </motion.span>
          </h1>
          <motion.p
            className="mt-8 max-w-[520px] text-lg leading-8 text-white/80"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            {hero.subtitle}
          </motion.p>
          <motion.div
            className="mt-9 flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.45 }}
          >
            <a className="pill bg-berry text-white shadow-[0_18px_42px_rgba(155,75,107,0.32)]" href="#work">
              View Portfolio
            </a>
            <a className="pill border border-white/70 text-white hover:bg-white hover:text-charcoal" href="#book">
              {hero.button}
            </a>
          </motion.div>
        </div>
      </div>
      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-rose-gold"
        aria-label="Scroll to atelier introduction"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.5, duration: 0.4 }, y: { repeat: Infinity, duration: 1.8 } }}
      >
        <span className="h-12 w-px bg-rose-gold" />
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
      <div className="section-shell grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <div className="relative min-h-[520px] overflow-hidden">
            <Image
              src={studioImage}
              alt="Bright nail atelier workspace with clean surfaces and organized beauty tools"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
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
          <div className="mt-10 flex items-center gap-5">
            <span className="h-px w-20 bg-rose-gold" />
            <span className="font-display text-3xl italic text-rose-gold">Polished</span>
          </div>
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
    <section id="work" className="bg-ivory py-24 md:py-36">
      <div className="section-shell">
        <Reveal className="text-center">
          <p className="label">The Portfolio</p>
          <h2 className="headline mt-5">Designed to Be Admired.</h2>
        </Reveal>
        <div className="mt-10 flex flex-wrap justify-center gap-3" role="tablist" aria-label="Portfolio filters">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.1em] transition ${
                filter === item ? "text-berry" : "text-charcoal/55 hover:text-berry"
              }`}
              role="tab"
              aria-selected={filter === item}
            >
              <span className="relative">
                {item}
                <span className={`absolute -bottom-2 left-0 h-px bg-berry transition-all ${filter === item ? "w-full" : "w-0"}`} />
              </span>
            </button>
          ))}
        </div>
        <motion.div layout className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.button
                layout
                key={item.title}
                onClick={() => setActive(index)}
                className={`group relative min-h-[440px] overflow-hidden bg-charcoal text-white ${
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
                  className="image-cover transition duration-500 group-hover:scale-[1.04]"
                />
                <span className="absolute inset-0 bg-berry/0 transition duration-300 group-hover:bg-berry/20" />
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
            className="fixed inset-0 z-[80] grid place-items-center bg-charcoal/95 p-5"
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
          <div className="mt-12 divide-y divide-charcoal/10">
            {services.map((service, index) => (
              <motion.button
                key={service.name}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                className="grid w-full gap-3 py-6 text-left transition duration-300 hover:bg-blush/40 sm:grid-cols-[1fr_auto] sm:px-4"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
              >
                <span className="transition duration-300 hover:translate-x-1">
                  <span className="font-display block text-[28px] leading-none text-charcoal">{service.name}</span>
                  <span className="mt-2 block text-sm text-muted">{service.description}</span>
                </span>
                <span className="self-center text-sm font-bold text-berry">{service.price}</span>
              </motion.button>
            ))}
          </div>
        </div>
        <Reveal delay={0.16} className="lg:sticky lg:top-28 lg:h-fit">
          <div className="relative min-h-[620px] overflow-hidden bg-charcoal">
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
                  alt={`${services[active].name} nail service example`}
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
    ["01", "Consult", "We discuss your vision, lifestyle, and nail health."],
    ["02", "Create", "Every stroke is deliberate. Every detail, intentional."],
    ["03", "Admire", "Walk out with nails that turn heads and start conversations."],
  ];

  return (
    <section className="bg-ivory py-24 md:py-36">
      <div className="section-shell">
        <Reveal className="max-w-[620px]">
          <p className="label">The Experience</p>
          <h2 className="headline mt-5">How It Works.</h2>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map(([number, title, text], index) => (
            <Reveal key={title} delay={index * 0.1}>
              <article className="border-t border-rose-gold bg-white px-7 py-9">
                <p className="font-display text-[72px] font-light leading-none text-rose-gold/55">{number}</p>
                <h3 className="font-display mt-7 text-[30px] leading-none text-charcoal">{title}</h3>
                <p className="mt-4 text-[15px] leading-7 text-muted">{text}</p>
              </article>
            </Reveal>
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
    <section className="bg-charcoal py-24 text-white md:py-36">
      <div className="section-shell text-center">
        <Reveal>
          <h2 className="font-display text-[clamp(42px,6vw,64px)] font-light leading-none">What Clients Say.</h2>
        </Reveal>
        <div className="relative mx-auto mt-14 max-w-[880px]">
          <span className="font-display text-[120px] leading-none text-berry">“</span>
          <AnimatePresence mode="wait">
            <motion.figure
              key={testimonials[active].name}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45 }}
            >
              <blockquote className="font-display text-[clamp(30px,5vw,46px)] italic leading-tight text-white">
                {testimonials[active].quote}
              </blockquote>
              <figcaption className="mt-8">
                <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-rose-gold">
                  {testimonials[active].name}
                </p>
                <p className="mt-2 text-sm text-white/55">{testimonials[active].service}</p>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20"
              onClick={() => setActive((active - 1 + testimonials.length) % testimonials.length)}
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={18} />
            </button>
            {testimonials.map((item, index) => (
              <button
                key={item.name}
                className={`h-2 rounded-full transition-all ${active === index ? "w-8 bg-rose-gold" : "w-2 bg-white/30"}`}
                onClick={() => setActive(index)}
                aria-label={`Show testimonial ${index + 1}`}
              />
            ))}
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20"
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

function InstagramFeed() {
  const { instagramImages } = useTemplateData();

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="section-shell">
        <Reveal className="text-center">
          <p className="label">Follow The Art</p>
          <h2 className="headline mt-5">@polished.atelier</h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {instagramImages.map((src, index) => (
            <Reveal key={src} delay={index * 0.04}>
              <a
                href="#book"
                className="group relative block aspect-square overflow-hidden bg-charcoal"
                aria-label={`Open social nail art image ${index + 1}`}
              >
                <Image
                  src={src}
                  alt={`POLISHED social nail art post ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 16vw"
                  className="image-cover transition duration-500 group-hover:scale-[1.05]"
                />
                <span className="absolute inset-0 grid place-items-center bg-berry/0 transition duration-300 group-hover:bg-berry/25">
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
    <section id="book" className="relative overflow-hidden bg-berry py-24 text-center text-white md:py-32">
      <div className="absolute inset-0 animate-[ctaShift_9s_ease-in-out_infinite] bg-[radial-gradient(circle_at_35%_20%,rgba(201,161,156,0.32),transparent_34%),linear-gradient(120deg,#9B4B6B,#78364f)]" />
      <Reveal className="section-shell relative z-10">
        <h2 className="font-display text-[clamp(46px,7vw,76px)] font-light leading-none">Your Next Set Awaits.</h2>
        <p className="mx-auto mt-6 max-w-[460px] text-lg text-white/90">Appointments fill fast. Book yours today.</p>
        <a className="pill mt-9 bg-white px-8 text-charcoal shadow-[0_18px_50px_rgba(44,44,44,0.22)]" href="mailto:hello@polished-atelier.com">
          Book Your Slot
          <MoveUpRight size={16} />
        </a>
      </Reveal>
      <style jsx global>{`
        @keyframes ctaShift {
          0%,
          100% {
            filter: hue-rotate(0deg) brightness(1);
          }
          50% {
            filter: hue-rotate(-8deg) brightness(0.94);
          }
        }
      `}</style>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-charcoal py-16 text-white">
      <div className="section-shell">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <p className="font-display text-4xl font-light tracking-[0.08em]">POLISHED</p>
            <p className="mt-4 text-white/55">Nails as art.</p>
            <div className="mt-8 flex gap-4 text-rose-gold">
              <AtSign aria-label="Instagram" />
              <Music2 aria-label="TikTok" />
              <Sparkles aria-label="Pinterest" />
            </div>
          </div>
          <nav className="grid grid-cols-2 gap-4 text-sm text-white/70" aria-label="Footer navigation">
            {["Portfolio", "Services", "About", "Book", "Contact", "Privacy"].map((item) => (
              <a key={item} href={item === "Book" ? "#book" : "#top"} className="transition hover:text-rose-gold">
                {item}
              </a>
            ))}
          </nav>
          <div className="space-y-4 text-sm leading-7 text-white/65">
            <p className="flex gap-3"><Pin className="mt-1 shrink-0 text-rose-gold" size={16} />123 Atelier Lane, London, EC2A 4BQ</p>
            <p className="flex gap-3"><Send className="mt-1 shrink-0 text-rose-gold" size={16} />hello@polished-atelier.com<br />+44 20 7946 0958</p>
            <p className="flex gap-3"><Scissors className="mt-1 shrink-0 text-rose-gold" size={16} />Mon-Sat: 10am-8pm | Sun: 11am-5pm</p>
          </div>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-5 border-t border-white/10 pt-8 text-sm text-white/45 sm:flex-row">
          <p>© 2026 Polished Atelier. All rights reserved.</p>
          <a href="#top" className="text-rose-gold transition hover:text-white">Back to top ↑</a>
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
        <Testimonials />
        <InstagramFeed />
        <BookingCTA />
      </main>
      <Footer />
    </>
  );
}
