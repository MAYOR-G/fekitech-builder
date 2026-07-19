import Link from "next/link";
import { LogoMark } from "@/components/ui/LogoMark";
import { GradientButton } from "@/components/ui/GradientButton";

const productLinks = [
  { href: "/templates", label: "Templates" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
];

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/support", label: "Contact" },
];

export default function Footer() {
  return (
    <footer id="site-footer" className="relative bg-white text-ft-ink">
      {/* Gradient Top Line */}
      <div className="w-full h-px gradient-bg" />

      <div className="mx-auto max-w-[1280px] px-6 pb-10 pt-16 sm:pt-20">
        <div className="mb-14 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Col 1 — Brand */}
          <div className="space-y-5">
            <Link href="/" className="group flex w-fit items-center gap-2.5 rounded-xl" aria-label="FekiTech Builder home">
              <LogoMark />
              <span className="text-lg font-bold tracking-tight text-ft-ink">
                FekiTech <span className="font-medium text-ft-muted">Builder</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-6 text-ft-body">
              Choose a template, customize your content, and publish a professional website without writing code.
            </p>
          </div>

          {/* Col 2 — Product */}
          <div>
            <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.14em] text-ft-muted">
              Product
            </h4>
            <ul className="space-y-3.5">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-8 items-center text-sm text-ft-body transition-colors hover:text-ft-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Company */}
          <div>
            <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.14em] text-ft-muted">
              Company
            </h4>
            <ul className="space-y-3.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-8 items-center text-sm text-ft-body transition-colors hover:text-ft-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Start Building */}
          <div>
            <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.14em] text-ft-muted">
              Start Building
            </h4>
            <p className="mb-6 text-sm leading-6 text-ft-body">
              Explore and customize for free. Choose a paid plan when you are ready to publish.
            </p>
            <GradientButton href="/signup" className="text-sm !py-2.5 !px-6 inline-flex items-center gap-2">
              Start building →
            </GradientButton>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-ft-border-light pt-8 text-xs text-ft-muted md:flex-row">
          <p>© {new Date().getFullYear()} FekiTech Builder. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-ft-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-ft-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
