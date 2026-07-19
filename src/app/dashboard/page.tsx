import Link from "next/link";
import { LayoutTemplate, PlusCircle } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/account/LogoutButton";
import { TestPlanSwitcher } from "@/components/account/TestPlanSwitcher";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getUserPlan, isAuthorizedPlanTester } from "@/lib/subscriptions";
import { LogoMark } from "@/components/ui/LogoMark";

function getPublishedUrl(subdomain: string): string {
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "localhost:3000";
  const protocol = rootDomain.startsWith("localhost") || rootDomain.startsWith("127.0.0.1") ? "http" : "https";
  return `${protocol}://${subdomain}.${rootDomain}`;
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login?redirect=/dashboard");

  const [projects, userPlan, canTestPlans] = await Promise.all([
    prisma.project.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: "desc" },
    }),
    getUserPlan(session.user.id),
    isAuthorizedPlanTester(session.user.id, session.user.email),
  ]);

  return (
    <div className="min-h-screen bg-ft-surface text-ft-ink">
      <header className="border-b border-ft-border bg-white/95 px-4 py-3 backdrop-blur sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <Link href="/" className="flex min-h-11 items-center gap-3 rounded-xl" aria-label="FekiTech Builder home">
            <LogoMark />
            <span><span className="block text-base font-bold tracking-tight text-ft-dark">FekiTech Builder</span><span className="block text-xs font-medium text-ft-body">{userPlan.definition.name} plan</span></span>
          </Link>
          <div className="flex flex-wrap gap-3">
            <Link href="/templates" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-ft-primary px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(24,59,211,0.18)] transition-all hover:-translate-y-0.5 hover:bg-ft-primary-deep">
              <PlusCircle aria-hidden="true" size={18} />
              New website
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main id="main-content" className="mx-auto max-w-6xl p-4 py-8 sm:p-8 sm:py-12">
        {canTestPlans ? <TestPlanSwitcher currentPlan={userPlan.id} /> : null}
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl font-[720] tracking-[-0.035em] sm:text-4xl">My websites</h1>
            <p className="mt-1 text-sm text-ft-body">
              {projects.length} of {userPlan.definition.entitlements.maxProjects} projects used
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article key={project.id} className="group overflow-hidden rounded-2xl border border-ft-border bg-white shadow-[0_10px_30px_rgba(22,31,72,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(22,31,72,0.11)]">
              <div className="relative flex h-40 items-center justify-center bg-[linear-gradient(145deg,#f1f6ff,#f8f5ff)]">
                <LayoutTemplate aria-hidden="true" size={48} className="text-gray-400" />
                {project.isPublished && project.subdomain ? (
                  <a
                    href={getPublishedUrl(project.subdomain)}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute right-2 top-2 rounded-md bg-green-100 px-2 py-1 text-xs font-bold text-green-800 transition-colors hover:bg-green-200"
                  >
                    View published site
                  </a>
                ) : null}
              </div>
              <div className="border-t border-ft-border-light p-5">
                <h2 className="mb-1 truncate text-lg font-bold">{project.name}</h2>
                <p className="mb-4 text-sm text-ft-body">Last edited {project.updatedAt.toLocaleDateString()}</p>
                <Link href={`/editor/${project.id}`} className="block min-h-11 rounded-xl bg-ft-surface-alt px-4 py-2.5 text-center font-semibold text-ft-ink transition-colors hover:bg-ft-primary hover:text-white">
                  Edit website
                </Link>
              </div>
            </article>
          ))}

          <Link href="/templates" className="flex min-h-72 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-ft-border bg-white p-6 text-ft-body transition-all hover:-translate-y-1 hover:border-ft-primary hover:bg-ft-surface-cool hover:text-ft-primary">
            <PlusCircle aria-hidden="true" size={48} className="mb-4" />
            <span className="font-medium">Create a website</span>
            {projects.length === 0 ? <span className="mt-2 text-center text-sm text-ft-body">Choose a template to start your first project.</span> : null}
          </Link>
        </div>
      </main>
    </div>
  );
}
