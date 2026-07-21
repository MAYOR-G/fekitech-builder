import { TemplateImage } from "@/components/templates/TemplateImage";
import Link from "next/link";
import { getAllTemplates } from "@/registry";

const stats = [
  {
    value: "Premium templates",
    body: "A growing collection of complete starting points for service businesses, creators, and local brands.",
    bg: "bg-ft-sky",
  },
  {
    value: "Draft first",
    body: "Explore templates and test customization before choosing a publishing plan.",
    bg: "bg-[#F3F4F6]",
  },
  {
    value: "No code",
    body: "Edit the structured content and design controls provided by each template.",
    bg: "bg-[#FFF0DE]",
  },
];

const audiences = ["Small businesses", "Freelancers", "Creators", "Agencies", "Service providers", "Entrepreneurs"];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-ft-ink">
      <section className="bg-ft-surface-cool px-6 pb-28 pt-28 text-center md:pt-40 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-ft-primary/10 blur-[100px] rounded-full pointer-events-none" />
        <p className="mb-6 text-sm font-bold uppercase tracking-[0.2em] text-ft-primary relative z-10">About us</p>
        <h1 className="mx-auto max-w-[800px] text-[clamp(42px,6vw,72px)] font-[760] leading-[1.05] tracking-tight text-balance relative z-10">
          We enable anyone to build their own websites. Easily.
        </h1>
        <p className="mx-auto mt-6 max-w-[600px] text-lg leading-relaxed text-ft-body sm:text-xl relative z-10">
          FekiTech Builder gives business owners a clear path from template selection to a published website.
        </p>
      </section>

      <section className="px-6 py-28 relative">
        <div className="mx-auto max-w-[980px] text-center">
          <h2 className="text-[clamp(36px,5vw,58px)] font-[760] leading-[1.04] tracking-tight">
            A practical website builder
          </h2>
          <p className="mx-auto mt-5 max-w-[620px] text-lg leading-relaxed text-ft-body sm:text-xl">
            Built to make choosing, customizing, previewing, and publishing a website easier to understand.
          </p>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {stats.map((stat) => (
              <article key={stat.value} className={`${stat.bg} rounded-3xl p-10 text-left transition-transform duration-300 hover:-translate-y-1`}>
                <h3 className="text-[clamp(28px,3vw,36px)] font-[760] leading-[1.1] tracking-tight">{stat.value}</h3>
                <p className="mt-6 text-base leading-relaxed text-ft-body/90 sm:text-lg">{stat.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <TemplateImage
        src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop"
        alt="Premium modern workspace"
        className="h-[400px] w-full object-cover md:h-[600px]"
        loading="lazy"
      />

      <section className="px-6 py-28 bg-white">
        <div className="mx-auto grid max-w-[1080px] gap-12 md:grid-cols-[0.45fr_1fr] items-start">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-ft-primary mt-2">What we do</p>
          <div className="space-y-6 text-lg leading-relaxed text-ft-body sm:text-xl sm:leading-[1.8]">
            <p>
              We believe website building should be clear and manageable. FekiTech Builder brings templates, structured editing, previews, and publishing into one practical workspace.
            </p>
            <p>
              People without technical experience can start from a complete design and focus on their own content. Every template is built to adapt beautifully across mobile, tablet, and desktop screens.
            </p>
          </div>
        </div>
      </section>

      <TemplateImage
        src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2000&auto=format&fit=crop"
        alt="Creative team collaborating in a modern office"
        className="h-[400px] w-full object-cover md:h-[600px]"
        loading="lazy"
      />

      <section className="px-6 py-28 bg-ft-surface-cool/30">
        <div className="mx-auto grid max-w-[1080px] gap-12 md:grid-cols-[0.45fr_1fr] items-start">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-ft-primary mt-2">Our story</p>
          <div className="space-y-6 text-lg leading-relaxed text-ft-body sm:text-xl sm:leading-[1.8]">
            <p>
              FekiTech Builder began with a simple idea: business owners should be able to choose a strong template, preview it, adjust the content, and publish without feeling overwhelmed by technical details.
            </p>
            <p>
              The platform is built for small teams, independent professionals, and local sellers who need a polished website without waiting months to launch.
            </p>
            <p>
              Today, FekiTech Builder helps people move from idea to online presence with clean templates, practical tools, and optional help from our team.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#FFF0DE] px-6 py-32">
        <div className="mx-auto grid max-w-[1100px] items-center gap-16 md:grid-cols-[1fr_0.95fr]">
          <div className="space-y-6">
            <h2 className="text-[clamp(40px,5vw,64px)] font-[760] leading-[1.05] tracking-tight">Our Philosophy</h2>
            <p className="max-w-md text-xl font-medium leading-relaxed text-ft-ink">
              You don&apos;t have to be tech-savvy or a design pro to create an awesome website.
            </p>
            <p className="max-w-lg text-lg leading-relaxed text-ft-body">
              Start from a considered design and spend your time refining the details that matter to your customers.
            </p>
            <ul className="mt-8 space-y-4 text-lg font-medium text-ft-ink">
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-ft-primary" /> Templates you can preview before paying</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-ft-primary" /> Desktop, tablet, and mobile previews</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-ft-primary" /> Ready-to-use blocks</li>
            </ul>
          </div>
          <TemplateImage
            src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=1200&auto=format&fit=crop"
            alt="Designer working on digital layouts"
            className="h-[460px] w-full rounded-3xl object-cover shadow-[0_30px_60px_-15px_rgba(17,24,39,0.15)] transition-transform duration-500 hover:scale-[1.02]"
            loading="lazy"
          />
        </div>
      </section>

      <section className="bg-ft-primary px-6 py-32 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-ft-primary-deep to-ft-primary opacity-50" />
        <div className="relative z-10">
          <p className="mb-6 text-sm font-bold uppercase tracking-[0.2em] text-white/70">Our vision</p>
          <h2 className="mx-auto max-w-[900px] text-[clamp(42px,6vw,72px)] font-[760] leading-[1.05] tracking-tight text-balance">
            To help any business owner achieve everything they aspire to online.
          </h2>
        </div>
      </section>

      <section className="px-6 py-28 text-center bg-white">
        <h2 className="text-[clamp(34px,5vw,52px)] font-[760] tracking-tight">Built for independent businesses</h2>
        <div className="mx-auto mt-12 flex max-w-[920px] flex-wrap items-center justify-center gap-x-6 gap-y-6">
          {audiences.map((audience) => (
            <span key={audience} className="rounded-full border border-ft-border/60 bg-ft-surface-cool px-6 py-3 text-base font-medium text-ft-ink shadow-sm hover:shadow-md transition-shadow">
              {audience}
            </span>
          ))}
        </div>
      </section>

      <section className="bg-ft-sky/30 px-6 py-32">
        <div className="mx-auto grid max-w-[1100px] items-center gap-16 md:grid-cols-[0.92fr_1fr]">
          <TemplateImage
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
            alt="Agency partners collaborating on a project"
            className="h-[420px] w-full rounded-3xl object-cover shadow-[0_24px_50px_-12px_rgba(17,24,39,0.12)] transition-transform duration-500 hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="space-y-6">
            <h2 className="text-[clamp(38px,5vw,60px)] font-[760] leading-[1.05] tracking-tight">
              For agencies and white-label partners
            </h2>
            <p className="max-w-lg text-lg leading-relaxed text-ft-body sm:text-xl">
              Empower your clients with custom websites quickly and from any device, without long technical handoffs.
            </p>
            <Link href="/support" className="mt-4 inline-flex items-center justify-center rounded-xl bg-ft-ink px-8 py-4 text-base font-bold text-white transition-all hover:-translate-y-1 hover:shadow-xl">
              Learn more
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-ft-ink px-6 py-32 text-center text-white">
        <h2 className="mx-auto max-w-[800px] text-[clamp(42px,6vw,72px)] font-[760] leading-[1.05] tracking-tight text-balance">
          Build your online presence with FekiTech Builder
        </h2>
        <Link href="/templates" className="mt-10 inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-bold text-ft-ink transition-all hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(255,255,255,0.2)]">
          Browse templates
        </Link>
      </section>
    </div>
  );
}
