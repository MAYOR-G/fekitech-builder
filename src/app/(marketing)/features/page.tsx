"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { getAllTemplates } from "@/registry";
import HeroVideo from "@/components/landing/HeroVideo";

import Link from "next/link";
import { motion } from "motion/react";
import {
  BarChart3,
  CalendarDays,
  CreditCard,
  Globe2,
  HandCoins,
  LayoutTemplate,
  LockKeyhole,
  Mail,
  PackageCheck,
  Paintbrush,
  Search,
  Settings2,
  Smartphone,
  Store,
  Tags,
} from "lucide-react";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const featuredTemplateIds = [
  "barber-website",
  "premium-coffee-website",
  "gym-website",
  "second-furniture-website",
] as const;

const easyCards = [
  { icon: LayoutTemplate, title: "Website builder", body: "Start from a polished layout and edit sections visually." },
  { icon: Paintbrush, title: "Structured customization", body: "Adjust the content, colors, images, and sections supported by your template." },
  { icon: Settings2, title: "Reliable autosave", body: "See saving and failure states while the editor keeps your latest draft." },
  { icon: Globe2, title: "No coding required", body: "Publish a business-ready site without touching technical setup." },
  { icon: Smartphone, title: "Responsive previews", body: "Review the template on desktop, tablet, and mobile-sized canvases." },
  { icon: Search, title: "Version restoration", body: "Create named snapshots and restore an earlier draft when needed." },
];

const sellingFeatures = [
  {
    title: "Choose the right starting point",
    body: "Search the catalog, preview a template, and confirm that your plan includes it before creating a project.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=900&auto=format&fit=crop",
    tint: "bg-[#FFEACD]",
    icon: Store,
  },
  {
    title: "Keep projects separated",
    body: "Open, edit, preview, publish, and delete only projects owned by the signed-in account.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=900&auto=format&fit=crop",
    tint: "bg-[#F8D7F1]",
    icon: Tags,
  },
  {
    title: "Exercise every plan limit",
    body: "Authorized test administrators can switch plans without creating fake payment records.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=900&auto=format&fit=crop",
    tint: "bg-[#FFE89E]",
    icon: CreditCard,
  },
  {
    title: "Upload safer images",
    body: "Plan-supported uploads are decoded, resized, re-encoded, and stored in account-scoped paths.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=900&auto=format&fit=crop",
    tint: "bg-[#BFE8FA]",
    icon: PackageCheck,
  },
  {
    title: "Return to an earlier draft",
    body: "Create versions before major edits and restore one without silently replacing the live website.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=900&auto=format&fit=crop",
    tint: "bg-[#FFE0CC]",
    icon: HandCoins,
  },
  {
    title: "Preview before publishing",
    body: "Save the current draft and review its rendered result before it becomes a public snapshot.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=900&auto=format&fit=crop",
    tint: "bg-[#E4D4FF]",
    icon: BarChart3,
  },
  {
    title: "Publish an immutable snapshot",
    body: "New draft edits stay private until you deliberately publish another version.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=900&auto=format&fit=crop",
    tint: "bg-[#BFD26E]",
    icon: Globe2,
  },
  {
    title: "Verify your custom domain",
    body: "Eligible plans can prove DNS ownership before a domain is routed to a published project.",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=900&auto=format&fit=crop",
    tint: "bg-[#CFF4E4]",
    icon: LockKeyhole,
  },
];

const platformCards = [
  { icon: Store, title: "Verified domains", body: "Connect a plan-supported domain after proving DNS ownership." },
  { icon: LayoutTemplate, title: "Template catalog", body: "Preview templates and use the designs included in your plan." },
  { icon: Mail, title: "Structured editing", body: "Change the text, images, colors, and sections exposed by a template." },
  { icon: CalendarDays, title: "Responsive templates", body: "Preview layouts across desktop, tablet, and mobile sizes." },
  { icon: Search, title: "Draft previews", body: "Review current saved content before creating a published snapshot." },
  { icon: PackageCheck, title: "Version history", body: "Create named versions and restore an earlier draft." },
  { icon: BarChart3, title: "Plan quotas", body: "See and test project, publishing, upload, and version limits." },
  { icon: LockKeyhole, title: "Tenant isolation", body: "Owner-scoped projects and assets stay separate from other accounts." },
];



function BrowserPreview({
  image,
  className = "",
}: {
  image: string;
  className?: string;
}) {
  return (
    <div className={`website-frame rounded-[18px] bg-white ${className}`}>
      <div className="browser-bar">
        <div className="browser-dot" />
        <div className="browser-dot" />
        <div className="browser-dot" />
        <div className="ml-3 h-3 flex-1 rounded-full bg-ft-border-light" />
      </div>
      <TemplateImage src={image} alt="Website preview" className="h-full w-full object-cover" loading="lazy" />
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  body,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="mx-auto mb-14 max-w-[760px] text-center">
      {eyebrow ? (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-ft-muted">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-[clamp(30px,4.4vw,54px)] font-[760] leading-[1.04] text-ft-ink text-balance">
        {title}
      </h2>
      {body ? <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-ft-body">{body}</p> : null}
    </div>
  );
}

export default function FeaturesPage() {
  const templates = featuredTemplateIds.flatMap((templateId) => {
    const templateCatalog = getAllTemplates();
    const template = templateCatalog.find((item) => item.id === templateId);
    return template
      ? [
          {
            id: template.id,
            name: template.name,
            image: template.image,
          },
        ]
      : [];
  });

  return (
    <div className="min-h-screen bg-white text-ft-ink">
      <section className="relative overflow-hidden bg-ft-sky px-6 pb-24 pt-24 md:pt-32">
        <div className="mx-auto max-w-[1180px] text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease }}
            className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-ft-primary"
          >
            Features
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05, ease }}
            className="mx-auto max-w-[760px] text-[clamp(34px,5vw,62px)] font-[760] leading-[1.04] text-balance"
          >
            Everything you need to shape, preview, and publish a polished website
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.14, ease }}
            className="relative mx-auto mt-12 h-[300px] max-w-[760px] md:h-[390px]"
          >
            <BrowserPreview
              image="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=900&auto=format&fit=crop"
              className="absolute left-1/2 top-5 z-10 h-[260px] w-[72%] -translate-x-1/2 md:h-[330px]"
            />
            <BrowserPreview
              image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=700&auto=format&fit=crop"
              className="absolute left-0 top-24 z-20 h-[210px] w-[34%] rotate-[-2deg] md:h-[270px]"
            />
            <div className="absolute right-2 top-20 z-20 w-[34%] rounded-[18px] bg-white p-4 text-left shadow-[0_20px_50px_rgba(17,24,39,0.16)]">
              <p className="text-xs font-bold text-ft-primary">Professional tools</p>
              <p className="mt-2 text-sm font-semibold leading-snug">Customize, preview, publish, and manage your site in one workspace.</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-ft-sky-soft p-3 text-xs font-semibold">Mobile ready</div>
                <div className="rounded-xl bg-ft-surface-mint p-3 text-xs font-semibold">Saved drafts</div>
              </div>
            </div>
            <div className="absolute bottom-2 left-[52%] z-30 rounded-2xl bg-white px-5 py-3 text-left shadow-[0_20px_45px_rgba(17,24,39,0.14)]">
              <p className="text-2xl font-[760] text-ft-primary">Saved</p>
              <p className="text-xs font-semibold text-ft-body">your latest draft is secure</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-24">
        <SectionTitle
          title="Build a polished website without a technical handoff"
          body="Pick a template, customize the details, preview the page, and publish when everything feels right."
        />
        <div className="mx-auto grid max-w-[920px] items-center gap-8 md:grid-cols-[0.92fr_1.08fr]">
          <div className="website-frame rounded-[22px] bg-white">
            <div className="browser-bar">
              <div className="browser-dot" />
              <div className="browser-dot" />
              <div className="browser-dot" />
              <div className="ml-3 h-3 flex-1 rounded-full bg-ft-border-light" />
            </div>
            <div className="grid min-h-[320px] grid-cols-[0.78fr_1.22fr] bg-ft-sky-soft p-5">
              <div className="rounded-2xl bg-white p-4 shadow-[0_10px_24px_rgba(17,24,39,0.08)]">
                <div className="mb-4 h-4 w-24 rounded-full bg-ft-primary/15" />
                <div className="space-y-2">
                  <div className="h-10 rounded-xl bg-ft-sky" />
                  <div className="h-10 rounded-xl bg-ft-border-light" />
                  <div className="h-10 rounded-xl bg-ft-border-light" />
                </div>
              </div>
              <TemplateImage
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=900&auto=format&fit=crop"
                alt="Website builder preview"
                className="h-full w-full rounded-2xl object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <TemplateImage
            src="https://images.unsplash.com/photo-1551836022-4c4c79ecde51?q=80&w=900&auto=format&fit=crop"
            alt="Business owner working on a website"
            className="min-h-[320px] rounded-[24px] object-cover shadow-[0_18px_48px_rgba(17,24,39,0.12)]"
            loading="lazy"
          />
        </div>
      </section>

      <section className="bg-ft-sky-soft px-6 py-24">
        <SectionTitle eyebrow="Easy to use" title="Build your website in a number of clicks, even if you have never published before." />
        <div className="mx-auto grid max-w-[980px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {easyCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.04, ease }}
                className="rounded-[10px] bg-white p-6 shadow-[0_10px_28px_rgba(17,24,39,0.04)]"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-ft-sky text-ft-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-[730] text-ft-ink">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ft-body">{card.body}</p>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="overflow-hidden bg-ft-primary px-6 py-20 text-white">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 className="max-w-md text-[clamp(28px,4vw,48px)] font-[760] leading-[1.04] text-balance">
                Professional-looking niche templates
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-6 text-white/76">
                Find templates that fit businesses, services, stores, portfolios, and creators.
              </p>
            </div>
            <Link href="/templates" className="btn-ghost w-fit !py-3 !px-6 text-sm">
              Browse templates
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {templates.map((tpl, i) => (
              <motion.div
                key={tpl.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
                className="group relative flex flex-col gap-4"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/10 bg-ft-surface-cool shadow-lg transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl">
                  <TemplateImage src={tpl.image} alt={`${tpl.name} template preview`} width={900} height={1200} sizes="(max-width: 639px) 84vw, (max-width: 1023px) 48vw, 25vw" className="relative z-10 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
                  
                  <div className="absolute inset-0 z-20 bg-ft-ink/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
                  
                  <div className="absolute bottom-4 left-4 right-4 z-30 flex translate-y-[150%] rounded-xl bg-white/95 p-2 shadow-xl backdrop-blur-md transition-transform duration-300 ease-out group-hover:translate-y-0">
                    <Link href={`/preview/${tpl.id}`} className="flex-1 rounded-lg bg-ft-primary px-3 py-2.5 text-center text-sm font-semibold text-white shadow-md transition-all hover:bg-ft-primary-deep">
                      Preview Template
                    </Link>
                  </div>
                </div>
                
                <div className="px-1">
                  <h3 className="text-base font-semibold text-white group-hover:text-white/90 transition-colors">{tpl.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <SectionTitle
          title="A dependable workflow from template to published site"
          body="Work through each stage with plan limits and ownership checks enforced by the server."
        />
        <div className="mx-auto flex max-w-[1040px] flex-col gap-16 md:gap-20">
          {sellingFeatures.map((feature, index) => {
            const Icon = feature.icon;
            const reversed = index % 2 === 1;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease }}
                className={`grid items-center gap-8 md:grid-cols-2 ${reversed ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                <div>
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-ft-dark text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-[clamp(24px,3vw,36px)] font-[760] leading-[1.06] text-ft-ink">
                    {feature.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-ft-body">{feature.body}</p>
                  <Link href="/templates" className="mt-6 inline-flex rounded-full bg-ft-dark px-5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5">
                    Get started
                  </Link>
                </div>
                <div className={`${feature.tint} rounded-[18px] p-5 md:p-8`}>
                  <BrowserPreview image={feature.image} className="aspect-[1.24]" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="bg-ft-sky-soft px-6 py-24">
        <SectionTitle eyebrow="Platform controls" title="The safeguards behind the builder" />
        <div className="mx-auto grid max-w-[980px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {platformCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.42, delay: index * 0.03, ease }}
                className="rounded-[8px] bg-white p-5 shadow-[0_10px_24px_rgba(17,24,39,0.04)]"
              >
                <Icon className="mb-4 h-5 w-5 text-ft-primary" />
                <h3 className="text-sm font-[730]">{card.title}</h3>
                <p className="mt-2 text-xs leading-5 text-ft-body">{card.body}</p>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="overflow-hidden px-6 py-24">
        <SectionTitle title="A strong starting point for many kinds of business" body="Choose from clean templates and customize the supported content and design controls yourself." />
        <div className="mx-auto mt-10 w-full overflow-hidden rounded-3xl">
          <HeroVideo />
        </div>
      </section>

      <section className="bg-[#FFF0DE] px-6 py-20">
        <div className="mx-auto grid max-w-[980px] items-center gap-10 md:grid-cols-[0.82fr_1.18fr]">
          <div>
            <h2 className="text-[clamp(28px,4vw,46px)] font-[760] leading-[1.04] text-balance">
              Doubting your site-building skills? Don&apos;t.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-ft-body">
              Start with a template and change only what you need. If an account or publishing step fails, contact support with the project name.
            </p>
            <Link href="/support" className="mt-6 inline-flex rounded-full bg-ft-dark px-5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5">
              Contact us
            </Link>
          </div>
          <div className="relative">
            <TemplateImage
              src="https://images.unsplash.com/photo-1551836022-4c4c79ecde51?q=80&w=900&auto=format&fit=crop"
              alt="Business owner building a website"
              className="h-[320px] w-full rounded-[24px] object-cover"
              loading="lazy"
            />
            <div className="absolute -left-6 top-10 rounded-2xl bg-white px-4 py-3 text-xs font-bold shadow-[0_18px_44px_rgba(17,24,39,0.14)]">
              Your site can look polished.
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ft-dark px-6 py-24 text-center text-white">
        <h2 className="mx-auto max-w-[760px] text-[clamp(34px,5vw,62px)] font-[760] leading-[1.02] text-balance">
          Choose a FekiTech template and start shaping your website today.
        </h2>
        <Link href="/templates" className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-ft-ink transition hover:-translate-y-0.5">
          Start building
        </Link>
        <BrowserPreview
          image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop"
          className="mx-auto mt-12 aspect-[16/9] max-w-[620px] rounded-[20px]"
        />
      </section>
    </div>
  );
}
