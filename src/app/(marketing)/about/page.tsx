import { TemplateImage } from "@/components/templates/TemplateImage";
import Link from "next/link";
import { getAllTemplates } from "@/registry";

const templateCount = getAllTemplates().length;

const stats = [
  {
    value: `${templateCount} templates`,
    body: "A growing collection of complete starting points for service businesses, creators, and local brands.",
    bg: "bg-[#F0DCD5]",
  },
  {
    value: "Draft first",
    body: "Explore templates and test customization before choosing a publishing plan.",
    bg: "bg-ft-sky",
  },
  {
    value: "No code",
    body: "Edit the structured content and design controls provided by each template.",
    bg: "bg-[#E5EACF]",
  },
];

const audiences = ["Small businesses", "Freelancers", "Creators", "Agencies", "Service providers", "Entrepreneurs"];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-ft-ink">
      <section className="bg-ft-sky px-6 pb-28 pt-28 text-center md:pt-40">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-ft-muted">About us</p>
        <h1 className="mx-auto max-w-[760px] text-[clamp(38px,5.8vw,72px)] font-[760] leading-[1.03] text-balance">
          We enable anyone to build their own websites. Easily.
        </h1>
        <p className="mx-auto mt-5 max-w-[560px] text-sm leading-7 text-ft-body">
          FekiTech Builder gives business owners a clear path from template selection to a published website.
        </p>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-[980px] text-center">
          <h2 className="text-[clamp(34px,4.5vw,58px)] font-[760] leading-[1.04]">
            A practical website builder
          </h2>
          <p className="mx-auto mt-4 max-w-[620px] text-sm leading-6 text-ft-body">
            Built to make choosing, customizing, previewing, and publishing a website easier to understand.
          </p>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {stats.map((stat) => (
              <article key={stat.value} className={`${stat.bg} rounded-[16px] p-8 text-left`}>
                <h3 className="text-[clamp(30px,4vw,46px)] font-[760] leading-[1.02]">{stat.value}</h3>
                <p className="mt-8 text-sm leading-6 text-ft-body">{stat.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <TemplateImage
        src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1800&auto=format&fit=crop"
        alt="Team meeting around a bright office table"
        className="h-[360px] w-full object-cover md:h-[520px]"
        loading="lazy"
      />

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-[980px] gap-10 md:grid-cols-[0.45fr_1fr]">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-ft-muted">About us</p>
          <div className="space-y-5 text-sm leading-7 text-ft-body">
            <p>
              We believe website building should be clear and manageable. FekiTech Builder brings templates, structured editing, previews, and publishing into one practical workspace.
            </p>
            <p>
              People without technical experience can start from a complete design and focus on their own content. Every template is built to adapt across mobile, tablet, and desktop screens.
            </p>
          </div>
        </div>
      </section>

      <TemplateImage
        src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1800&auto=format&fit=crop"
        alt="Team standing together outdoors"
        className="h-[360px] w-full object-cover md:h-[520px]"
        loading="lazy"
      />

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-[980px] gap-10 md:grid-cols-[0.45fr_1fr]">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-ft-muted">Our story</p>
          <div className="space-y-5 text-sm leading-7 text-ft-body">
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

      <section className="bg-[#FFF0DE] px-6 py-24">
        <div className="mx-auto grid max-w-[980px] items-center gap-12 md:grid-cols-[1fr_0.95fr]">
          <div>
            <h2 className="text-[clamp(34px,4.4vw,58px)] font-[760] leading-[1.04]">Our Philosophy</h2>
            <p className="mt-4 max-w-md text-lg font-semibold leading-7">
              You don&apos;t have to be tech-savvy or a design pro to create an awesome website.
            </p>
            <p className="mt-4 max-w-lg text-sm leading-7 text-ft-body">
              Start from a considered design and spend your time refining the details that matter to your customers.
            </p>
            <ul className="mt-6 space-y-2 text-sm font-semibold text-ft-ink">
              <li>• Templates you can preview before paying</li>
              <li>• Desktop, tablet, and mobile previews</li>
              <li>• Ready-to-use blocks</li>
            </ul>
          </div>
          <TemplateImage
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop"
            alt="Person working calmly on a laptop"
            className="h-[360px] w-full rounded-[18px] object-cover shadow-[0_22px_58px_rgba(17,24,39,0.12)]"
            loading="lazy"
          />
        </div>
      </section>

      <section className="bg-ft-primary px-6 py-24 text-center text-white">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-white/58">Our vision</p>
        <h2 className="mx-auto max-w-[840px] text-[clamp(34px,5vw,64px)] font-[760] leading-[1.04] text-balance">
          To help any business owner achieve everything they aspire to online.
        </h2>
      </section>

      <section className="px-6 py-20 text-center">
        <h2 className="text-[clamp(30px,4vw,48px)] font-[760]">Built for independent businesses</h2>
        <div className="mx-auto mt-10 flex max-w-[920px] flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {audiences.map((audience) => (
            <span key={audience} className="rounded-full border border-ft-border bg-ft-surface-alt px-5 py-2.5 text-sm font-semibold text-ft-body">
              {audience}
            </span>
          ))}
        </div>
      </section>

      <section className="bg-[#FFF0DE] px-6 py-24">
        <div className="mx-auto grid max-w-[980px] items-center gap-12 md:grid-cols-[0.92fr_1fr]">
          <TemplateImage
            src="https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1000&auto=format&fit=crop"
            alt="Agency partners reviewing website work"
            className="h-[340px] w-full rounded-[20px] object-cover shadow-[0_18px_48px_rgba(17,24,39,0.1)]"
            loading="lazy"
          />
          <div>
            <h2 className="text-[clamp(32px,4.4vw,56px)] font-[760] leading-[1.04]">
              For agencies and white-label partners
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-ft-body">
              Empower your clients with custom websites quickly and from any device, without long technical handoffs.
            </p>
            <Link href="/support" className="mt-7 inline-flex rounded-full bg-ft-dark px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5">
              Learn more
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-ft-dark px-6 py-24 text-center text-white">
        <h2 className="mx-auto max-w-[720px] text-[clamp(38px,5vw,68px)] font-[760] leading-[1.03] text-balance">
          Build your online presence with FekiTech Builder
        </h2>
        <Link href="/templates" className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-ft-ink transition hover:-translate-y-0.5">
          Browse templates
        </Link>
      </section>
    </div>
  );
}
